import { BookMarked, ExternalLink, GitFork, Star } from "lucide-react"
import type { GitHubRepo } from "@/lib/github"
import { cleanDescription } from "@/lib/github"
import { cn, languageColor, repoAccent } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function ProjectCard({
  repo,
  className,
}: {
  repo: GitHubRepo
  className?: string
}) {
  // 每个项目一个专属强调色（按名称 hash），让卡片一眼可辨
  const accent = repoAccent(repo.name)
  const langColor = languageColor(repo.language)
  const isProfile = repo.name === "llxpy"

  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        "hover:border-[var(--repo-accent-soft)] hover:shadow-[0_0_44px_var(--repo-accent-glow)]",
        className
      )}
      style={
        {
          "--repo-accent": accent.main,
          "--repo-accent-soft": accent.soft,
          "--repo-accent-glow": accent.glow,
        } as React.CSSProperties
      }
    >
      {/* 顶部渐变线（项目专属色） */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--repo-accent-soft)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <CardContent className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: accent.main,
                boxShadow: `0 0 12px ${accent.soft}`,
              }}
            />
            <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-[var(--repo-accent)]">
              {repo.name}
            </h3>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`打开 ${repo.name}`}
            className="text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 hover:text-primary"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground/80">
          {cleanDescription(repo.description) || "一个正在孕育中的小妄想。"}
        </p>

        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 4).map((topic) => (
              <Badge key={topic} variant="outline" className="font-mono text-[10px]">
                {topic}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: langColor }}
              />
              {repo.language}
            </span>
          )}
          {!isProfile && (
            <>
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" />
                {repo.forks_count}
              </span>
            </>
          )}
          {repo.license?.spdx_id === "MIT" && (
            <span className="flex items-center gap-1">
              <BookMarked className="h-3.5 w-3.5" />
              MIT
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
