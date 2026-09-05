import { useCallback, useSyncExternalStore } from "react"

const LEARN_KEY_PREFIX = "wb_learn_v1_"
const PROFILES_KEY = "wb_profiles_v1"

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

export interface Profile {
  id: string
  name: string
  color: string
  createdAt: number
}

interface ProfileStore {
  activeId: string | null
  profiles: Profile[]
}

export const PROFILE_COLORS = [
  "from-cyan-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-pink-500",
  "from-violet-400 to-purple-500",
]

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

function pid() {
  return "p" + Math.random().toString(36).slice(2, 10)
}

function defaultTasks(): LearnTask[] {
  return [
    {
      id: tid(),
      title: "读《Linux 是什么》一节",
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
      title: "跟着做\"Hello World\" 终端命令",
      stageId: 1,
      dueDate: yesterdayStr(),
      done: false,
      createdAt: Date.now(),
    },
  ]
}

function defaultState(): LearnState {
  return {
    completedStages: [],
    currentStage: 1,
    knownPoints: {},
    tasks: [],
    checkins: {},
    totalHours: 0,
    lastVisit: null,
    streak: 0,
  }
}

function loadProfiles(): ProfileStore {
  const def: ProfileStore = { activeId: null, profiles: [] }
  try {
    const raw = localStorage.getItem(PROFILES_KEY)
    if (raw) Object.assign(def, JSON.parse(raw))
    if (!Array.isArray(def.profiles)) def.profiles = []
  } catch {
    // ignore
  }
  return def
}

function saveProfiles(ps: ProfileStore) {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(ps))
  } catch {
    // ignore
  }
}

function stateKey(id: string) {
  return LEARN_KEY_PREFIX + id
}

function loadState(id: string): LearnState {
  const s = defaultState()
  try {
    const raw = localStorage.getItem(stateKey(id))
    if (raw) Object.assign(s, JSON.parse(raw))
  } catch {
    // ignore
  }
  if (!Array.isArray(s.tasks)) s.tasks = []
  if (s.tasks.length === 0) s.tasks = defaultTasks()
  return s
}

function computeStreak(
  checkins: Record<string, CheckinRecord>,
  lastVisit: string | null
): number {
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
let profileStore = loadProfiles()
let state: LearnState = defaultState()
let listeners: Array<() => void> = []
let initialized = false

function ensureProfile() {
  const valid = profileStore.profiles.some((p) => p.id === profileStore.activeId)
  if (!valid) {
    const p: Profile = {
      id: pid(),
      name: "新同学",
      color: PROFILE_COLORS[Math.floor(Math.random() * PROFILE_COLORS.length)],
      createdAt: Date.now(),
    }
    profileStore.profiles.push(p)
    profileStore.activeId = p.id
    saveProfiles(profileStore)
  }
}

function init() {
  if (initialized) return
  initialized = true
  ensureProfile()
  state = loadState(profileStore.activeId!)
}

function saveAndNotify() {
  if (profileStore.activeId) {
    try {
      localStorage.setItem(stateKey(profileStore.activeId), JSON.stringify(state))
    } catch {
      // ignore
    }
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
  init()
  const s = useSyncExternalStore(subscribe, getSnapshot)

  const switchProfile = useCallback((id: string) => {
    if (id === profileStore.activeId) return
    if (!profileStore.profiles.some((p) => p.id === id)) return
    profileStore.activeId = id
    saveProfiles(profileStore)
    state = loadState(id)
    saveAndNotify()
  }, [])

  const createProfile = useCallback((name: string) => {
    const p: Profile = {
      id: pid(),
      name: name.trim() ? name.trim() : "新同学",
      color: PROFILE_COLORS[profileStore.profiles.length % PROFILE_COLORS.length],
      createdAt: Date.now(),
    }
    profileStore.profiles.push(p)
    profileStore.activeId = p.id
    saveProfiles(profileStore)
    state = loadState(p.id)
    saveAndNotify()
  }, [])

  const renameProfile = useCallback((id: string, name: string) => {
    const p = profileStore.profiles.find((x) => x.id === id)
    if (p && name.trim()) {
      p.name = name.trim()
      saveProfiles(profileStore)
      saveAndNotify()
    }
  }, [])

  const deleteProfile = useCallback((id: string) => {
    if (profileStore.profiles.length <= 1) return
    profileStore.profiles = profileStore.profiles.filter((p) => p.id !== id)
    try {
      localStorage.removeItem(stateKey(id))
    } catch {
      // ignore
    }
    if (profileStore.activeId === id) {
      const next = profileStore.profiles[0]
      profileStore.activeId = next.id
      state = loadState(next.id)
    }
    saveProfiles(profileStore)
    saveAndNotify()
  }, [])

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
    const safeName = (activeProfile?.name || "learn").replace(/[^\w\u4e00-\u9fa5]/g, "_")
    a.download = `${safeName}-learning-${todayStr()}.json`
    a.click()
  }, [])

  const importData = useCallback((json: string) => {
    const data = JSON.parse(json)
    Object.assign(state, data)
    saveAndNotify()
  }, [])

  const activeProfile =
    profileStore.profiles.find((p) => p.id === profileStore.activeId) ?? null
  const totalKnown = Object.values(s.knownPoints).reduce(
    (a, b) => a + b.length,
    0
  )

  return {
    state: s,
    totalKnown,
    activeProfile,
    profiles: profileStore.profiles,
    createProfile,
    switchProfile,
    renameProfile,
    deleteProfile,
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