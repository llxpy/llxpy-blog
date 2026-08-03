import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { getPost } from "@/data/posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/motion"
import { Separator } from "@/components/ui/separator"

function CodeBlock({ lang, text }: { lang: string; text: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-[oklch(0.04_0.004_280)]">
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {lang}
        </span>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-[13px] leading-relaxed text-sky-300/90">
          {text}
        </code>
      </pre>
    </div>
  )
}

export function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

  if (!post) return <Navigate to="/blog" replace />

  return (
    <div className="relative mx-auto max-w-3xl px-6 pb-28 pt-32">
      <Reveal>
        <Button asChild variant="ghost" size="sm" className="mb-10 -ml-3 text-muted-foreground">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4" />
            返回文章列表
          </Link>
        </Button>

        <div className="flex flex-wrap items-center gap-3">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="glow">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {post.readingTime} 分钟阅读
          </span>
          {post.project && (
            <Badge variant="outline">{post.project}</Badge>
          )}
        </div>
      </Reveal>

      <Separator className="my-10" />

      <Reveal delay={0.1}>
        <p className="mb-12 border-l-2 border-primary/60 pl-5 text-lg leading-relaxed text-foreground/85">
          {post.excerpt}
        </p>

        <article className="space-y-10">
          {post.content.map((section, i) => (
            <section key={i} className="space-y-5">
              <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, j) => (
                <p key={j} className="leading-8 text-foreground/80">
                  {p}
                </p>
              ))}
              {section.code && (
                <CodeBlock lang={section.code.lang} text={section.code.text} />
              )}
              {section.list && (
                <ul className="space-y-3 rounded-xl border border-border/50 bg-card/40 p-6">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/75">
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
            </section>
          ))}
        </article>
      </Reveal>

      <Separator className="my-12" />

      <Reveal delay={0.1}>
        <Card className="glow-border">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <h3 className="font-display text-lg font-semibold">觉得有意思？</h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              关注项目仓库，或继续阅读其它文章。
            </p>
            <div className="flex gap-3">
              <Button asChild variant="outline" size="sm">
                <Link to="/blog">更多文章</Link>
              </Button>
              <Button asChild size="sm">
                <a href="https://github.com/llxpy" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  )
}
