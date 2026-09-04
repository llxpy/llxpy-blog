import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { KB_CATEGORIES } from "@/data/learn"
import type { useLearnStore } from "@/hooks/use-learn-store"

export function KnowledgeTab({
  store,
}: {
  store: ReturnType<typeof useLearnStore>
}) {
  const { state } = store
  const [openCats, setOpenCats] = useState<Set<string>>(new Set())
  const totalItems = KB_CATEGORIES.reduce((a, c) => a + c.items.length, 0)

  const toggleCat = (id: string) => {
    setOpenCats((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const expandAll = () => setOpenCats(new Set(KB_CATEGORIES.map((c) => c.id)))
  const collapseAll = () => setOpenCats(new Set())

  return (
    <div>
      {/* Header */}
      <div className="mb-5 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-sm font-semibold">
            学习知识库
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              · {KB_CATEGORIES.length} 大类 · {totalItems} 个核心知识点
            </span>
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              已掌握:
              <strong className="ml-1 text-emerald-400">
                {store.totalKnown}
              </strong>{" "}
              / {totalItems}
            </span>
            <button
              onClick={expandAll}
              className="rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground"
            >
              全部展开
            </button>
            <button
              onClick={collapseAll}
              className="rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground"
            >
              全部折叠
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {KB_CATEGORIES.map((cat) => {
          const known = state.knownPoints[cat.id] || []
          const open = openCats.has(cat.id)
          return (
            <div
              key={cat.id}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card/60"
            >
              <button
                onClick={() => toggleCat(cat.id)}
                className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-white/[0.02] sm:p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-base">
                  {cat.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{cat.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {cat.items.length} 个知识点 · 已掌握{" "}
                    <strong className="text-emerald-400">{known.length}</strong>
                  </p>
                </div>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    open && "rotate-90"
                  )}
                />
              </button>

              {open && (
                <div className="space-y-2.5 border-t border-border/40 px-5 py-4">
                  {cat.items.map((item) => {
                    const isKnown = known.includes(item.id)
                    return (
                      <div
                        key={item.id}
                        className="rounded-xl border border-border/40 bg-card/40 p-4"
                      >
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold">{item.title}</p>
                          <span className="shrink-0 rounded bg-primary/12 px-2 py-0.5 text-[10px] font-medium text-primary">
                            {item.tag}
                          </span>
                        </div>
                        <div
                          className="prose-dark text-[13px] leading-relaxed text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                        <div className="mt-3 flex items-center gap-2 border-t border-dashed border-border/40 pt-3">
                          <input
                            type="checkbox"
                            checked={isKnown}
                            onChange={() =>
                              store.toggleKnown(cat.id, item.id)
                            }
                            className="h-3.5 w-3.5 accent-emerald-400"
                          />
                          <label className="cursor-pointer text-xs text-muted-foreground select-none">
                            {isKnown
                              ? "✓ 已掌握，继续下一条"
                              : "我已掌握这个知识点"}
                          </label>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
