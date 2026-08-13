import { Link, useSearchParams } from "react-router-dom"
import { ArrowRight, BookMarked, Calendar, Clock, FolderOpen } from "lucide-react"
import {
  NOTE_CATEGORIES,
  NOTES,
  type NoteCategoryId,
} from "@/data/notes"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal, Stagger, StaggerItem } from "@/components/motion"
import { TiltCard } from "@/components/effects/tilt-card"

function parseCategory(raw: string | null): NoteCategoryId | "all" {
  if (!raw) return "all"
  return NOTE_CATEGORIES.some((c) => c.id === raw)
    ? (raw as NoteCategoryId)
    : "all"
}

export function NotesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const active = parseCategory(searchParams.get("cat"))

  const visible =
    active === "all" ? NOTES : NOTES.filter((n) => n.category === active)

  const selectCategory = (value: string) => {
    const id = parseCategory(value)
    setSearchParams(id === "all" ? {} : { cat: id }, { replace: true })
  }

  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-32">
      <Reveal>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
          / notes
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          笔记<span className="text-primary">.</span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          学习路线上的沉淀：黑马程序员课程笔记与技术知识总结，按分类整理，持续更新。
        </p>
      </Reveal>

      {/* 分类筛选 */}
      <Reveal delay={0.1}>
        <div className="mt-10 overflow-x-auto pb-1">
          <Tabs value={active} onValueChange={selectCategory}>
            <TabsList className="h-auto flex-wrap justify-start gap-1 rounded-xl p-1.5">
              <TabsTrigger value="all" className="gap-2">
                全部
                <span className="rounded-md bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] text-primary">
                  {NOTES.length}
                </span>
              </TabsTrigger>
              {NOTE_CATEGORIES.map((cat) => {
                const count = NOTES.filter((n) => n.category === cat.id).length
                return (
                  <TabsTrigger key={cat.id} value={cat.id} className="gap-2">
                    {cat.label}
                    <span className="rounded-md bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] text-primary">
                      {count}
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </div>
      </Reveal>

      {/* 当前分类说明 */}
      <Reveal delay={0.15}>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground/80">
          <FolderOpen className="h-4 w-4 text-primary/70" />
          {active === "all"
            ? "全部笔记 · " + NOTES.length + " 篇"
            : NOTE_CATEGORIES.find((c) => c.id === active)?.desc}
        </p>
      </Reveal>

      {/* 笔记列表 */}
      {visible.length > 0 ? (
        <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((note, i) => (
            <StaggerItem key={note.slug} delay={i * 0.09}>
              <Link to={`/notes/${note.slug}`} className="group block h-full">
                <TiltCard max={5} className="h-full">
                  <Card className="flex h-full flex-col">
                    <CardContent className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex items-center justify-between gap-3">
                        <Badge variant="default">
                          {NOTE_CATEGORIES.find((c) => c.id === note.category)?.label}
                        </Badge>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {note.readingTime} 分钟
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                        {note.title}
                      </h3>
                      <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {note.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {note.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {new Date(note.date).toLocaleDateString("zh-CN")}
                        </span>
                        <span className="flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          阅读笔记 <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-xl border border-dashed border-border/60 py-20 text-center">
          <BookMarked className="h-8 w-8 text-muted-foreground/50" />
          <div>
            <p className="font-display text-lg font-semibold">这个分类还没有笔记</p>
            <p className="mt-1 text-sm text-muted-foreground">
              学习笔记整理中，敬请期待。
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
