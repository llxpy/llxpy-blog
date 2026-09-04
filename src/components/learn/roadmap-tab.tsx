import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { STAGES } from "@/data/learn"
import type { useLearnStore } from "@/hooks/use-learn-store"

export function RoadmapTab({
  store,
}: {
  store: ReturnType<typeof useLearnStore>
}) {
  const { state } = store
  const [openId, setOpenId] = useState<number | null>(state.currentStage)

  return (
    <div>
      {/* Stage selector */}
      <div className="mb-5 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-sm font-semibold">
            完整学习路线
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              · 通用 AI 全栈能力路线 · 共 15 阶段
            </span>
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              当前:
              <strong className="ml-1 text-primary">
                阶段 {state.currentStage}
              </strong>
            </span>
            <button
              onClick={() =>
                store.setCurrentStage(Math.min(state.currentStage + 1, 15))
              }
              className="rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground"
            >
              推进下一阶段 →
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                store.setCurrentStage(s.id)
                setOpenId(s.id)
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                s.id === state.currentStage
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-border/60 bg-card/60 text-muted-foreground hover:text-foreground"
              )}
            >
              {s.id}. {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stage cards */}
      <div className="space-y-3">
        {STAGES.map((s) => {
          const done = state.completedStages.includes(s.id)
          const cur = s.id === state.currentStage
          const open = openId === s.id
          return (
            <div
              key={s.id}
              className={cn(
                "overflow-hidden rounded-2xl border transition-all",
                done
                  ? "border-border/40 bg-card/40 opacity-70"
                  : "border-border/60 bg-card/60",
                open && "border-border/80"
              )}
            >
              {/* Head */}
              <button
                onClick={() => setOpenId(open ? null : s.id)}
                className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-white/[0.02] sm:p-5"
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-bold",
                    done
                      ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                      : "border-primary/30 bg-primary/15 text-primary"
                  )}
                >
                  {done ? "✓" : s.id}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{s.name}</span>
                    {cur && (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                        当前阶段
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex gap-3 text-[11px] text-muted-foreground">
                    <span>{s.level}</span>
                    <span>{s.daysLabel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      store.toggleComplete(s.id)
                    }}
                    className={cn(
                      "rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all",
                      done
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                  >
                    {done ? "已完成" : "标记完成"}
                  </button>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      open && "rotate-90"
                    )}
                  />
                </div>
              </button>

              {/* Body */}
              {open && (
                <div className="border-t border-border/40 px-5 py-4">
                  <SectionTitle>核心内容</SectionTitle>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {s.topics.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-primary/20 bg-primary/[0.06] px-2.5 py-1 text-xs text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {s.project && (
                    <>
                      <SectionTitle>核心项目</SectionTitle>
                      <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-3.5">
                        <p className="text-sm font-semibold text-emerald-400">
                          {s.project.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {s.project.desc}
                        </p>
                      </div>
                    </>
                  )}

                  <SectionTitle>胜任岗位</SectionTitle>
                  <div className="flex flex-wrap gap-1.5">
                    {s.jobs.map((j) => (
                      <span
                        key={j}
                        className="rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {j}
                      </span>
                    ))}
                  </div>

                  {cur && (
                    <>
                      <div className="my-4 h-px bg-border/40" />
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold">
                            进入此阶段的建议
                          </p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">
                            先读"知识库"对应章节，然后动手做"项目实战"里的项目，最后回此页打卡完成。
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            const el = document.querySelector(
                              '[data-tab="knowledge"]'
                            )
                            ;(el as HTMLElement)?.click()
                          }}
                          className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-black transition-all hover:brightness-110 hover:-translate-y-0.5"
                        >
                          去看知识库 →
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  )
}
