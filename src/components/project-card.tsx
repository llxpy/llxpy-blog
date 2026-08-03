import { BookMarked, ExternalLink, GitFork, Star } from "lucide-react"
import type { GitHubRepo } from "@/lib/github"
import { cleanDescription } from "@/lib/github"
import { languageColor } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ProjectCard({
  repo,
  className,
}: {
  repo: GitHubRepo
  className?: string
}) {
  const langColor = languageColor(repo.language)
  const isProfile = repo.name === "llxpy"

  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        className
      )}
    >
      {/* 顶部渐变线 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <CardContent className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: langColor, boxShadow: `0 0 12px ${langColor}66` }}
            />
            <h3 className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
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

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {cleanDescription(repo.description) || "一个正在暗面中孕育的项目。"}
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
