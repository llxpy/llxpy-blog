import { useState } from "react"
import { cn } from "@/lib/utils"
import { STAGES } from "@/data/learn"
import type { useLearnStore } from "@/hooks/use-learn-store"

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function formatDateLabel(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export function CheckinTab({
  store,
}: {
  store: ReturnType<typeof useLearnStore>
}) {
  const { state } = store
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskStage, setNewTaskStage] = useState(1)
  const [modal, setModal] = useState<{
    date: string
    hours: number
  } | null>(null)

  const today = todayStr()

  // Generate heatmap data (91 days = 13 weeks)
  const days: { date: string; lv: number; info?: { hours: number; items?: number } }[] = []
  for (let i = 90; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    const ci = state.checkins[key]
    let lv = 0
    if (ci) {
      if (ci.hours >= 4) lv = 4
      else if (ci.hours >= 2) lv = 3
      else if (ci.hours >= 1) lv = 2
      else lv = 1
    }
    days.push({ date: key, lv, info: ci })
  }

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return
    store.addTask(newTaskTitle.trim(), newTaskStage)
    setNewTaskTitle("")
  }

  return (
    <div className="space-y-5">
      {/* Heatmap + stats */}
      <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-sm font-semibold">
            每日打卡
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              · 连续 {state.streak} 天 · 累计 {state.totalHours} 小时
            </span>
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setModal({ date: today, hours: 0 })}
              className="rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary hover:bg-primary/20"
            >
              + 今日打卡
            </button>
            <button
              onClick={() => store.exportData()}
              className="rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground"
            >
              导出
            </button>
          </div>
        </div>

        <p className="mb-2 text-[11px] text-muted-foreground">
          近 13 周学习热力图（格子越亮 = 学习时长越长）
        </p>

        {/* Heatmap grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d) => (
            <button
              key={d.date}
              onClick={() => {
                const ci = state.checkins[d.date]
                setModal({ date: d.date, hours: ci?.hours || 0 })
              }}
              className={cn(
                "group relative aspect-square rounded-sm transition-all hover:scale-110 hover:border hover:border-primary/40",
                d.lv === 0 && "bg-white/[0.03]",
                d.lv === 1 && "bg-primary/20 text-muted-foreground",
                d.lv === 2 && "bg-primary/35 text-foreground",
                d.lv === 3 && "bg-primary/55 text-white",
                d.lv === 4 && "bg-primary/80 text-white font-semibold",
                d.date === today && "outline outline-2 outline-primary outline-offset-[-2px]"
              )}
            >
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {d.date}{" "}
                {d.info ? `· ${d.info.hours}h` : ""}
              </span>
              <span className="text-[9px] leading-none">
                {formatDateLabel(d.date)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Task management */}
      <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold">我的学习任务</h3>
          <span className="text-[11px] text-muted-foreground">
            {state.tasks.length} 项 · 已完成{" "}
            {state.tasks.filter((t) => t.done).length}
          </span>
        </div>

        {/* Add task */}
        <div className="mb-4 flex gap-2">
          <input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            placeholder="今天要做什么？例如：看完 Transformer 章节"
            className="min-w-0 flex-1 rounded-lg border border-border/60 bg-card/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
          />
          <select
            value={newTaskStage}
            onChange={(e) => setNewTaskStage(Number(e.target.value))}
            className="rounded-lg border border-border/60 bg-card/60 px-2 py-2 text-sm text-foreground focus:outline-none"
          >
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                阶段 {s.id}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddTask}
            className="shrink-0 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-black transition-all hover:brightness-110"
          >
            + 添加
          </button>
        </div>

        {/* Task list */}
        {state.tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/60 py-10 text-center text-sm text-muted-foreground">
            还没有任务，加一个开始今天的学习
          </div>
        ) : (
          <div className="space-y-2">
            {state.tasks.map((t) => {
              const isOver = t.dueDate && t.dueDate < today
              return (
                <div
                  key={t.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-4 py-3 transition-all",
                    t.done
                      ? "border-emerald-500/20 bg-emerald-500/[0.06] opacity-60"
                      : isOver
                        ? "border-red-500/20 bg-red-500/[0.06]"
                        : "border-border/40 bg-card/40"
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{t.title}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      阶段 {t.stageId || "?"} · {t.dueDate || "无截止"}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => store.toggleTask(t.id)}
                      className={cn(
                        "rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all",
                        t.done
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                      )}
                    >
                      {t.done ? "已完成" : "完成"}
                    </button>
                    <button
                      onClick={() => store.deleteTask(t.id)}
                      className="rounded-lg border border-border/60 px-2 py-1 text-[11px] text-muted-foreground hover:border-red-500/30 hover:text-red-400"
                    >
                      删除
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Checkin modal */}
      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(null)
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-border/60 bg-background p-6 shadow-2xl">
            <h4 className="mb-1 text-base font-bold">
              今日打卡 · {modal.date}
            </h4>
            <p className="mb-4 text-sm text-muted-foreground">
              记录今天的学习时长，坚持就是胜利。
            </p>

            <div className="mb-3">
              <label className="mb-1 block text-[11px] text-muted-foreground">
                学习时长（小时）
              </label>
              <input
                type="number"
                min={0}
                max={24}
                step={0.5}
                value={modal.hours}
                onChange={(e) =>
                  setModal({ ...modal, hours: Number(e.target.value) })
                }
                className="w-full rounded-lg border border-border/60 bg-card/60 px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              {state.checkins[modal.date] && (
                <button
                  onClick={() => {
                    store.deleteCheckin(modal.date)
                    setModal(null)
                  }}
                  className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20"
                >
                  清除
                </button>
              )}
              <button
                onClick={() => setModal(null)}
                className="rounded-lg border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                取消
              </button>
              <button
                onClick={() => {
                  store.saveCheckin(modal.hours, 0)
                  setModal(null)
                }}
                className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-black transition-all hover:brightness-110"
              >
                保存打卡
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
