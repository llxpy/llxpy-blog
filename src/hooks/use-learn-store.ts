import { useCallback, useSyncExternalStore } from "react"

const STORAGE_KEY = "wb_ai_fullstack_v1"

export interface LearnTask {
  id: string
  title: string
  stageId: number
  dueDate: string
  done: boolean
  createdAt: number
}

export interface CheckinRecord {
  hours: number
  items: number
  at: number
}

interface LearnState {
  completedStages: number[]
  currentStage: number
  knownPoints: Record<string, string[]>
  tasks: LearnTask[]
  checkins: Record<string, CheckinRecord>
  totalHours: number
  lastVisit: string | null
  streak: number
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function yesterdayStr() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

function tid() {
  return "t_" + Math.random().toString(36).slice(2, 9)
}

function loadState(): LearnState {
  const defaultState: LearnState = {
    completedStages: [],
    currentStage: 1,
    knownPoints: {},
    tasks: [],
    checkins: {},
    totalHours: 0,
    lastVisit: null,
    streak: 0,
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      Object.assign(defaultState, parsed)
    }
  } catch {
    // ignore
  }
  if (defaultState.tasks.length === 0) {
    defaultState.tasks = [
      {
        id: tid(),
        title: '读《Linux 是什么》一节',
        stageId: 1,
        dueDate: todayStr(),
        done: false,
        createdAt: Date.now(),
      },
      {
        id: tid(),
        title: "安装 VirtualBox + Rocky Linux",
        stageId: 1,
        dueDate: todayStr(),
        done: false,
        createdAt: Date.now(),
      },
      {
        id: tid(),
        title: '跟着做"Hello World" 终端命令',
        stageId: 1,
        dueDate: yesterdayStr(),
        done: false,
        createdAt: Date.now(),
      },
    ]
  }
  return defaultState
}

function computeStreak(checkins: Record<string, CheckinRecord>, lastVisit: string | null): number {
  const today = todayStr()
  const ys = yesterdayStr()
  let streak = 0
  if (checkins[today]) {
    if (lastVisit === ys) streak = 1
    else if (lastVisit !== today) streak = 1
  }
  return streak
}

// Shared mutable state for external store pattern
let state = loadState()
let listeners: Array<() => void> = []

function saveAndNotify() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
  state.streak = computeStreak(state.checkins, state.lastVisit)
  for (const l of listeners) l()
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener]
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function getSnapshot() {
  return state
}

export function useLearnStore() {
  const s = useSyncExternalStore(subscribe, getSnapshot)

  const toggleComplete = useCallback((id: number) => {
    const idx = state.completedStages.indexOf(id)
    if (idx >= 0) state.completedStages.splice(idx, 1)
    else state.completedStages.push(id)
    if (state.completedStages.length > 0) {
      const maxDone = Math.max(...state.completedStages)
      state.currentStage = Math.min(maxDone + 1, 15)
    }
    state.lastVisit = todayStr()
    saveAndNotify()
  }, [])

  const setCurrentStage = useCallback((id: number) => {
    state.currentStage = id
    saveAndNotify()
  }, [])

  const toggleKnown = useCallback((catId: string, itemId: string) => {
    if (!state.knownPoints[catId]) state.knownPoints[catId] = []
    const arr = state.knownPoints[catId]
    const idx = arr.indexOf(itemId)
    if (idx < 0) arr.push(itemId)
    else arr.splice(idx, 1)
    saveAndNotify()
  }, [])

  const toggleTask = useCallback((id: string) => {
    const t = state.tasks.find((x) => x.id === id)
    if (t) {
      t.done = !t.done
      if (t.done && t.dueDate < todayStr()) t.dueDate = todayStr()
      saveAndNotify()
    }
  }, [])

  const addTask = useCallback((title: string, stageId: number) => {
    state.tasks.unshift({
      id: tid(),
      title,
      stageId,
      dueDate: todayStr(),
      done: false,
      createdAt: Date.now(),
    })
    saveAndNotify()
  }, [])

  const deleteTask = useCallback((id: string) => {
    state.tasks = state.tasks.filter((t) => t.id !== id)
    saveAndNotify()
  }, [])

  const saveCheckin = useCallback((hours: number, items: number) => {
    const today = todayStr()
    const old = state.checkins[today]
    if (old) state.totalHours = Math.max(0, state.totalHours - old.hours + hours)
    else state.totalHours += hours
    state.checkins[today] = { hours, items, at: Date.now() }
    state.lastVisit = today
    saveAndNotify()
  }, [])

  const editCheckin = useCallback((date: string, hours: number) => {
    const old = state.checkins[date]
    if (old) state.totalHours = Math.max(0, state.totalHours - old.hours + hours)
    else state.totalHours += hours
    state.checkins[date] = { hours, items: 0, at: Date.now() }
    saveAndNotify()
  }, [])

  const deleteCheckin = useCallback((date: string) => {
    const old = state.checkins[date]
    if (old) state.totalHours = Math.max(0, state.totalHours - (old.hours || 0))
    delete state.checkins[date]
    saveAndNotify()
  }, [])

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `ai-fullstack-${todayStr()}.json`
    a.click()
  }, [])

  const importData = useCallback((json: string) => {
    const data = JSON.parse(json)
    Object.assign(state, data)
    saveAndNotify()
  }, [])

  const totalKnown = Object.values(s.knownPoints).reduce(
    (a, b) => a + b.length,
    0
  )

  return {
    state: s,
    totalKnown,
    toggleComplete,
    setCurrentStage,
    toggleKnown,
    toggleTask,
    addTask,
    deleteTask,
    saveCheckin,
    editCheckin,
    deleteCheckin,
    exportData,
    importData,
    todayStr,
  }
}
