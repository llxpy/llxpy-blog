import { LEARN_PROJECTS } from "@/data/learn"

export function ProjectsTab() {
  return (
    <div>
      {/* Header */}
      <div className="mb-5 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
        <h3 className="font-display text-sm font-semibold">
          7 个核心项目
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            · 从入门到高级，跟着做一遍才算真的会
          </span>
        </h3>
        <p className="mt-2 text-xs text-muted-foreground">
          每个项目都包含
          <strong className="text-foreground"> 目标 / 技术栈 / 完整步骤 / 踩坑清单</strong>
          。建议从 P1 开始，先跑通，再理解，最后改造成自己的。
        </p>
      </div>

      {/* Project cards */}
      <div className="space-y-4">
        {LEARN_PROJECTS.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden rounded-2xl border border-border/60 bg-card/60"
          >
            {/* Project header */}
            <div className="border-b border-border/40 bg-gradient-to-r from-emerald-500/[0.04] to-transparent p-5">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base font-bold">{p.name}</h4>
                <span className="rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                  {p.level}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {p.subtitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-primary/20 bg-primary/[0.06] px-2 py-0.5 text-[11px] text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Project body */}
            <div className="space-y-5 p-5">
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
                <h5 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  实施步骤
                </h5>
                <div className="space-y-3">
                  {p.steps.map((st, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold">{st.title}</p>
                      <div
                        className="mt-1 text-[13px] leading-relaxed text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html: st.content || st.text || "",
                        }}
                      />
                    </div>
                  ))}
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
          </div>
        ))}
      </div>
    </div>
  )
}
