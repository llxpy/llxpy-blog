import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { LEARN_PROJECTS } from "@/data/learn"

export function ProjectsTab() {
  const [openSteps, setOpenSteps] = useState<Record<string, Set<number>>>({})
  const [openBody, setOpenBody] = useState<Set<string>>(new Set())

  const toggleStep = (pid: string, idx: number) => {
    setOpenSteps((prev) => {
      const set = new Set(prev[pid] || [])
      if (set.has(idx)) set.delete(idx)
      else set.add(idx)
      return { ...prev, [pid]: set }
    })
  }

  const toggleAll = (pid: string, n: number) => {
    setOpenSteps((prev) => {
      const set = new Set(prev[pid] || [])
      const all = set.size === n
      return {
        ...prev,
        [pid]: all ? new Set() : new Set(Array.from({ length: n }, (_, i) => i)),
      }
    })
  }

  const toggleBody = (pid: string) => {
    setOpenBody((prev) => {
      const next = new Set(prev)
      if (next.has(pid)) next.delete(pid)
      else next.add(pid)
      return next
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-5 rounded-2xl border border-border/60 bg-card/60 p-5">
        <h3 className="font-display text-sm font-semibold">
          7 个核心项目
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            · 从入门到高级，跟着做一遍才算真的会
          </span>
        </h3>
        <p className="mt-2 text-xs text-muted-foreground">
          每个项目都包含
          <strong className="text-foreground">
            {" "}
            目标 / 技术栈 / 完整步骤 / 踩坑清单
          </strong>
          。点击标题收起展开，步骤表格点按单条即可查看。
        </p>
      </div>

      {/* Project cards */}
      <div className="space-y-4">
        {LEARN_PROJECTS.map((p) => {
          const bodyOpen = openBody.has(p.id)
          const stepOpenCount = openSteps[p.id]?.size || 0
          return (
            <div
              key={p.id}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card/60"
            >
              {/* Project header */}
              <button
                onClick={() => toggleBody(p.id)}
                className="flex w-full items-start gap-3 border-b border-border/40 bg-gradient-to-r from-emerald-500/[0.04] to-transparent p-5 text-left transition-colors hover:from-emerald-500/[0.07]"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-bold">{p.name}</h4>
                    <span className="rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                      {p.level}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {p.subtitle}
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                    bodyOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Project body */}
              {bodyOpen && (
                <div className="space-y-5 p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-primary/20 bg-primary/[0.06] px-2 py-0.5 text-[11px] text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Goal */}
                  <div>
                    <h5 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      项目目标
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {p.overview}
                    </p>
                  </div>

                  {/* Steps */}
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h5 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        实施步骤 · {stepOpenCount}/{p.steps.length}
                      </h5>
                      <button
                        onClick={() => toggleAll(p.id, p.steps.length)}
                        className="rounded-lg border border-border/60 bg-card/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      >
                        {stepOpenCount === p.steps.length ? "全部收起" : "展开全部"}
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {p.steps.map((st, i) => {
                        const open = openSteps[p.id]?.has(i)
                        return (
                          <div
                            key={i}
                            className={cn(
                              "overflow-hidden rounded-xl border transition-colors",
                              open
                                ? "border-primary/25 bg-card/80"
                                : "border-border/40 bg-card/40"
                            )}
                          >
                            <button
                              onClick={() => toggleStep(p.id, i)}
                              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left"
                            >
                              <ChevronDown
                                className={cn(
                                  "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                                  open && "rotate-180"
                                )}
                              />
                              <span className="text-[13px] font-medium">
                                <span className="mr-1.5 text-muted-foreground">
                                  {i + 1}.
                                </span>
                                {st.title}
                              </span>
                            </button>
                            {open && (
                              <div className="border-t border-border/40 px-4 py-3">
                                <div
                                  className="text-[13px] leading-relaxed text-muted-foreground"
                                  dangerouslySetInnerHTML={{
                                    __html: st.content || st.text || "",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Pitfalls */}
                  <div>
                    <h5 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      常见踩坑
                    </h5>
                    <ul className="list-inside list-disc space-y-1 text-[13px] text-muted-foreground">
                      {p.pitfalls.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}