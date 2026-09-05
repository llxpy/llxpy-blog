import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
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
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const totalItems = KB_CATEGORIES.reduce((a, c) => a + c.items.length, 0)

  const toggleCat = (id: string) => {
    setOpenCats((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const expandAllItems = () => {
    const all = new Set<string>()
    KB_CATEGORIES.forEach((c) => c.items.forEach((i) => all.add(i.id)))
    setOpenItems(all)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-5 rounded-2xl border border-border/60 bg-card/60 p-5">
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
              onClick={expandAllItems}
              className="rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground"
            >
              展开全部
            </button>
            <button
              onClick={() => setOpenItems(new Set())}
              className="rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground"
            >
              收起全部
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
                <div className="space-y-1.5 border-t border-border/40 p-2.5 sm:p-3">
                  {cat.items.map((item) => {
                    const isKnown = known.includes(item.id)
                    const isOpen = openItems.has(item.id)
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "overflow-hidden rounded-xl border transition-colors",
                          isOpen
                            ? "border-primary/25 bg-card/80"
                            : "border-border/40 bg-card/40 hover:border-border/70"
                        )}
                      >
                        {/* item 头部（始终轻量渲染） */}
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left"
                        >
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                              isOpen && "rotate-180"
                            )}
                          />
                          <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                            {item.title}
                          </span>
                          <span className="shrink-0 rounded bg-primary/12 px-2 py-0.5 text-[10px] font-medium text-primary">
                            {item.tag}
                          </span>
                          <span
                            className={cn(
                              "h-1.5 w-1.5 shrink-0 rounded-full",
                              isKnown ? "bg-emerald-400" : "bg-border"
                            )}
                          />
                        </button>
                        {/* 内容（点开才渲染 DOM） */}
                        {isOpen && (
                          <div className="border-t border-border/40 px-4 py-3">
                            <div
                              className="text-[13px] leading-relaxed text-muted-foreground"
                              dangerouslySetInnerHTML={{ __html: item.content }}
                            />
                            <div className="mt-3 flex items-center gap-2 border-t border-dashed border-border/40 pt-3">
                              <input
                                type="checkbox"
                                checked={isKnown}
                                onChange={() => store.toggleKnown(cat.id, item.id)}
                                className="h-3.5 w-3.5 accent-emerald-400"
                              />
                              <label className="cursor-pointer text-xs text-muted-foreground select-none">
                                {isKnown
                                  ? "✓ 已掌握，继续下一条"
                                  : "我已掌握这个知识点"}
                              </label>
                            </div>
                          </div>
                        )}
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