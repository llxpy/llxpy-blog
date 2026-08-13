import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, Calendar, Clock, ListTree } from "lucide-react"
import { getNote, getNoteCategory } from "@/data/notes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"
import { Reveal } from "@/components/motion"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

/** 去掉 heading 里的「第 N 块：」前缀，徽章/目录单独显示编号 */
function stripBlockPrefix(heading: string): string {
  return heading.replace(/^第\s*\d+\s*块[:：]?\s*/, "")
}

export function NotePage() {
  const { slug } = useParams<{ slug: string }>()
  const note = slug ? getNote(slug) : undefined
  const [activeId, setActiveId] = useState("")

  const sections =
    note?.content.map((sec, i) => ({
      id: `sec-${i}`,
      num: i + 1,
      title: stripBlockPrefix(sec.heading),
    })) ?? []

  useEffect(() => {
    setActiveId(sections[0]?.id ?? "")
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  if (!note) return <Navigate to="/notes" replace />

  const category = getNoteCategory(note.category)

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-32">
      <Reveal>
        <Button asChild variant="ghost" size="sm" className="mb-10 -ml-3 text-muted-foreground">
          <Link to="/notes">
            <ArrowLeft className="h-4 w-4" />
            返回笔记列表
          </Link>
        </Button>

        <div className="flex flex-wrap items-center gap-3">
          {category && (
            <Link to={`/notes?cat=${category.id}`}>
              <Badge variant="glow">{category.label}</Badge>
            </Link>
          )}
          {note.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {note.title}
        </h1>

        <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(note.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {note.readingTime} 分钟阅读 · {sections.length} 个章节
          </span>
        </div>
      </Reveal>

      <Separator className="my-10" />

      <Reveal delay={0.1}>
        <p className="mb-10 max-w-3xl border-l-2 border-primary/60 pl-5 text-lg leading-relaxed text-foreground/85">
          {note.excerpt}
        </p>
      </Reveal>

      {/* 移动端：横向章节条 */}
      <div className="-mx-1 mb-10 overflow-x-auto px-1 pb-1 lg:hidden">
        <div className="flex w-max gap-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => jumpTo(s.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition-colors",
                activeId === s.id
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              {String(s.num).padStart(2, "0")} · {s.title}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
        {/* 桌面端：sticky 目录 */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
              <ListTree className="h-3.5 w-3.5" />
              目录
            </p>
            <ul className="space-y-0.5 border-l border-border/60">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => jumpTo(s.id)}
                    className={cn(
                      "flex w-full items-baseline gap-2 rounded-r-lg border-l-2 px-3 py-1.5 text-left text-sm transition-colors",
                      activeId === s.id
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-transparent text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  >
                    <span className="shrink-0 font-mono text-[10px] text-primary/70">
                      {String(s.num).padStart(2, "0")}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* 正文：每块独立卡片 */}
        <article className="min-w-0 max-w-3xl space-y-8">
          {note.content.map((section, i) => (
            <section
              key={i}
              id={`sec-${i}`}
              className="scroll-mt-28 rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur transition-colors hover:border-primary/25 sm:p-8"
            >
              <h2 className="flex items-center gap-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 font-mono text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {stripBlockPrefix(section.heading)}
              </h2>
              <Separator className="my-5 bg-border/60" />

              <div className="space-y-5">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="leading-8 text-foreground/80">
                    {p}
                  </p>
                ))}
                {section.code &&
                  (Array.isArray(section.code) ? (
                    section.code.map((c, k) => (
                      <CodeBlock key={k} lang={c.lang} text={c.text} />
                    ))
                  ) : (
                    <CodeBlock lang={section.code.lang} text={section.code.text} />
                  ))}
                {section.list && (
                  <ul className="space-y-3 rounded-xl border border-border/50 bg-card/40 p-6">
                    {section.list.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground/75"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] text-primary">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.quote && (
                  <blockquote className="relative overflow-hidden rounded-xl border border-primary/25 bg-primary/5 px-6 py-5">
                    <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-purple-400" />
                    <p className="font-display text-lg font-medium leading-relaxed text-foreground/90">
                      “{section.quote}”
                    </p>
                  </blockquote>
                )}
              </div>
            </section>
          ))}
        </article>
      </div>

      <Separator className="my-12" />

      <Reveal delay={0.1}>
        <Card className="glow-border">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <h3 className="font-display text-lg font-semibold">继续沉淀？</h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              浏览同一分类的其它笔记，或回到全部笔记。
            </p>
            <div className="flex gap-3">
              <Button asChild variant="outline" size="sm">
                <Link to="/notes">全部笔记</Link>
              </Button>
              {category && (
                <Button asChild size="sm">
                  <Link to={`/notes?cat=${category.id}`}>
                    {category.label} 分类
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  )
}
