import { useMemo, useState } from "react"
import { Search, Star } from "lucide-react"
import { useGitHub } from "@/context/github-context"
import { ProjectCard } from "@/components/project-card"
import { Stagger, StaggerItem, Reveal } from "@/components/motion"
import { TiltCard } from "@/components/effects/tilt-card"
import { CountUp } from "@/components/effects/count-up"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ProjectsPage() {
  const { repos, loading } = useGitHub()
  const [query, setQuery] = useState("")
  const [lang, setLang] = useState<string | null>(null)

  const languages = useMemo(() => {
    const set = new Set<string>()
    repos.forEach((r) => r.language && set.add(r.language))
    return Array.from(set).sort()
  }, [repos])

  const filtered = useMemo(() => {
    let list = repos.filter((r) => r.name !== "llxpy")
    if (lang) list = list.filter((r) => r.language === lang)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.language?.toLowerCase().includes(q)
      )
    }
    return list
  }, [repos, query, lang])

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)

  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-32">
      {/* 页头 */}
      <Reveal>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
          / projects
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          项目<span className="text-primary">.</span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          在暗面里构建的实验、引擎与工具——全部开源，欢迎探索。
        </p>
      </Reveal>

      {/* 统计 */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-5 py-3 backdrop-blur transition-colors hover:border-primary/30">
            <span className="font-display text-2xl font-bold">
              <CountUp value={repos.length} />
            </span>
            <span className="text-xs text-muted-foreground">公开项目</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-5 py-3 backdrop-blur transition-colors hover:border-primary/30">
            <span className="flex items-center gap-2 font-display text-2xl font-bold">
              <Star className="h-4 w-4 text-yellow-400" />
              <CountUp value={totalStars} />
            </span>
            <span className="text-xs text-muted-foreground">累计 Star</span>
          </div>
        </div>
      </Reveal>

      {/* 筛选栏 */}
      <Reveal delay={0.15}>
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索项目或描述…"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              key="all"
              variant={lang === null ? "default" : "outline"}
              size="sm"
              className="h-8"
              onClick={() => {
                setLang(null)
                setQuery("")
              }}
            >
              全部
            </Button>
            {languages.map((l) => (
              <Button
                key={l}
                variant={lang === l ? "default" : "outline"}
                size="sm"
                className="h-8"
                onClick={() => {
                  setLang(lang === l ? null : l)
                  setQuery("")
                }}
              >
                {l}
              </Button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 项目网格 */}
      {loading ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={cn("h-52 animate-pulse rounded-xl border border-border/50 bg-muted/40")}
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            {query.trim()
              ? `没有匹配「${query.trim()}」的项目——试试清空搜索词或切换分类`
              : "没有匹配的项目。"}
          </p>
        </div>
      ) : (
        <Stagger className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((repo, i) => (
            <StaggerItem key={repo.id} delay={i * 0.09}>
              <TiltCard className="h-full">
                <ProjectCard repo={repo} />
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      {/* 语言标签说明 */}
      <Reveal delay={0.2}>
        <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-border/50 pt-8 text-xs text-muted-foreground">
          <span className="mr-1">标签：</span>
          {["AI Agent", "中文NLP", "推理引擎", "多智能体", "音频", "规范"].map(
            (tag) => (
              <Badge key={tag} variant="outline" className="cursor-pointer transition-colors hover:border-primary/50 hover:text-primary">
                {tag}
              </Badge>
            )
          )}
        </div>
      </Reveal>
    </div>
  )
}
