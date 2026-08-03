import { Link } from "react-router-dom"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { POSTS } from "@/data/posts"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Stagger, StaggerItem, Reveal } from "@/components/motion"
import { TiltCard } from "@/components/effects/tilt-card"

export function BlogPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-32">
      <Reveal>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
          / writings
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          文章<span className="text-primary">.</span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          关于 AI Agent、中文大模型推理与工程实践的思考笔记。
        </p>
      </Reveal>

      {/* 精选大卡片 */}
      {POSTS.find((p) => p.featured) && (
        <Reveal delay={0.1}>
          <Link to={`/blog/${POSTS[0].slug}`} className="group mt-12 block">
            <TiltCard max={4}>
              <Card className="glow-border relative overflow-hidden">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:bg-primary/20" />
              <CardContent className="relative flex flex-col gap-5 p-8 sm:p-10">
                <div className="flex items-center gap-3">
                  <Badge variant="glow">置顶 · {POSTS[0].project}</Badge>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(POSTS[0].date).toLocaleDateString("zh-CN")}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {POSTS[0].readingTime} 分钟
                  </span>
                </div>
                <h2 className="font-display max-w-2xl text-2xl font-bold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
                  {POSTS[0].title}
                </h2>
                <p className="max-w-2xl leading-relaxed text-muted-foreground">
                  {POSTS[0].excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {POSTS[0].tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <span className="mt-2 flex items-center gap-1.5 text-sm font-medium text-primary">
                  阅读全文
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </CardContent>
            </Card>
            </TiltCard>
          </Link>
        </Reveal>
      )}

      {/* 文章列表 */}
      <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
        {POSTS.slice(1).map((post) => (
          <StaggerItem key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="group block h-full">
              <TiltCard max={5} className="h-full">
                <Card className="flex h-full flex-col">
                <CardContent className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="default">{post.project}</Badge>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readingTime} 分钟
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString("zh-CN")}</span>
                    <span className="flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      阅读全文 <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
              </TiltCard>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
