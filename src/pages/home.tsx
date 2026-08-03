import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Github,
  GitCommit,
  MapPin,
  Mouse,
  Sparkles,
} from "lucide-react"
import { useGitHub } from "@/context/github-context"
import { AVATAR_FALLBACK_SRC } from "@/lib/github"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProjectCard } from "@/components/project-card"
import { Reveal, Stagger, StaggerItem } from "@/components/motion"
import { SplitTitle } from "@/components/effects/split-title"
import { TiltCard } from "@/components/effects/tilt-card"
import { getFeaturedPosts } from "@/data/posts"

const TECH_STACK = [
  "Python", "Java", "JavaScript", "TypeScript",
  "LLM", "RAG", "知识图谱", "多智能体",
  "Prompt 工程", "Web Audio", "进程隔离", "白盒推理",
]

const TIMELINE = [
  {
    date: "2026-07-31",
    title: "MoLock 更新",
    desc: "墨家「经说双链」语义约束推理架构持续迭代",
    repo: "MoLock",
  },
  {
    date: "2026-07-25",
    title: "CBSS 开源",
    desc: "Java 新项目发布",
    repo: "CBSS",
  },
  {
    date: "2026-07-20",
    title: "TJ 与 Auralis",
    desc: "CKG 白盒推理引擎与双耳听觉校准室同步推进",
    repo: "TJ / Auralis",
  },
  {
    date: "2026-07-16",
    title: "DPB-WS 发布",
    desc: "专注 Agent 处理问题的规范",
    repo: "DPB-WS",
  },
  {
    date: "2026-06-21",
    title: "BeeHive 更新",
    desc: "多智能体协作与责任规范完善",
    repo: "BeeHive",
  },
  {
    date: "2026-06-03",
    title: "AntNest 开源",
    desc: "蚁后/工蚁架构的 AI 编程助手",
    repo: "AntNest",
  },
]

export function HomePage() {
  const { user, repos, loading } = useGitHub()
  const featuredPosts = getFeaturedPosts()
  const topRepos = repos.filter((r) => r.name !== "llxpy").slice(0, 4)

  return (
    <div className="relative">
      {/* ============ HERO ============ */}
      <section className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-6 pt-16 text-center">
        {/* 状态标签 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="glow" className="mb-8 px-4 py-1.5">
            <Sparkles className="h-3 w-3" />
            building in the dark · 在暗面构建
          </Badge>
        </motion.div>

        {/* 头像 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="group relative mb-8"
        >
          <div className="glow-border relative rounded-full p-[3px] transition-transform duration-500 group-hover:scale-105">
            <Avatar className="h-24 w-24 rounded-full">
              <AvatarImage
                src={user?.avatar_url}
                alt="llxpy"
                className="rounded-full"
                onError={(e) => {
                  const img = e.currentTarget
                  if (!img.src.endsWith("avatar.jpg")) img.src = AVATAR_FALLBACK_SRC
                }}
              />
              <AvatarFallback className="rounded-full bg-gradient-to-br from-cyan-400 via-indigo-400 to-purple-400 text-3xl font-bold text-black">
                L
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-4 border-background bg-emerald-400" />
          </div>
          {/* 悬停光环 */}
          <div className="absolute -inset-4 -z-10 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.14_260/0.25),transparent_65%)] opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
        </motion.div>

        {/* 主标题：逐字浮现 */}
        <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          <SplitTitle text="llxpy" className="text-gradient" delay={0.25} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          独立开发者 · AI Agent 研究者
          <br className="sm:hidden" />
          中文大模型语义推理 · 多智能体架构 · 白盒引擎
          <motion.span
            aria-hidden
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: 1.5 }}
            className="ml-1 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-primary/80"
          />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground/80"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {user?.location || "Web 深处"}
          </span>
          <span className="flex items-center gap-1.5">
            <Github className="h-3.5 w-3.5" />
            {user?.public_repos ?? 8} 个公开项目
          </span>
          <span className="flex items-center gap-1.5">
            <GitCommit className="h-3.5 w-3.5" />
            自 2023 持续构建
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild size="lg">
            <Link to="/projects" className="group">
              探索项目
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/blog">
              <BookOpen />
              阅读文章
            </Link>
          </Button>
        </motion.div>

        {/* 滚动提示：发光鼠标 + SCROLL 文字 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="relative flex flex-col items-center gap-2.5"
          >
            <span className="absolute -inset-5 rounded-full bg-primary/15 blur-2xl animate-pulse-slow" />
            <Mouse className="relative h-6 w-6 text-primary/90 [animation:mouseWheel_1.6s_ease-in-out_infinite]" />
            <span className="relative font-mono text-[10px] font-medium tracking-[0.35em] text-primary/70">
              SCROLL
            </span>
            <span className="relative h-8 w-px bg-gradient-to-b from-primary/70 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============ 精选项目 ============ */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
                / featured-projects
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                精选项目
              </h2>
            </div>
            <Link
              to="/projects"
              className="group hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary sm:flex"
            >
              全部项目
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-xl border border-border/50 bg-muted/40"
              />
            ))}
          </div>
        ) : (
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {topRepos.map((repo) => (
              <StaggerItem key={repo.id}>
                <TiltCard>
                  <ProjectCard repo={repo} />
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>

      {/* ============ 技术栈跑马灯 ============ */}
      <section className="relative border-y border-border/40 py-10">
        <Reveal>
          <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            /* 技术栈与方向 */
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
            <div className="animate-marquee flex w-max gap-10">
              {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                <span
                  key={i}
                  className="flex items-center gap-10 whitespace-nowrap font-display text-xl font-medium text-muted-foreground/60 transition-colors hover:text-primary"
                >
                  {tech}
                  <span className="text-primary/40">✦</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ 最新文章 ============ */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
                / latest-writings
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                最新文章
              </h2>
            </div>
            <Link
              to="/blog"
              className="group hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary sm:flex"
            >
              全部文章
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <Stagger className="grid gap-6 md:grid-cols-3">
          {featuredPosts.slice(0, 3).map((post) => (
            <StaggerItem key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <TiltCard max={5} className="h-full">
                  <Card className="flex h-full flex-col">
                  <CardContent className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-center gap-2">
                      <Badge variant="glow">{post.project}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.readingTime} 分钟阅读
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
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
      </section>

      {/* ============ 动态时间线 ============ */}
      <section className="relative mx-auto max-w-6xl px-6 pb-28">
        <Reveal>
          <div className="mb-12">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
              / changelog
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              构建时间线
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative ml-3 border-l border-border/60 pl-8">
            {TIMELINE.map((item, i) => (
              <div key={i} className="group relative pb-10 last:pb-0">
                <span className="absolute -left-[37px] top-1.5 flex h-4 w-4 items-center justify-center">
                  <span className="absolute h-4 w-4 rounded-full bg-primary/20 transition-all duration-300 group-hover:bg-primary/40" />
                  <span className="relative h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_oklch(0.75_0.12_260/0.6)]" />
                </span>
                <div className="relative overflow-hidden rounded-xl border border-transparent px-4 py-3 -mx-4 transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/[0.04]">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {item.date}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {item.repo}
                      </Badge>
                    </div>
                    <h3 className="font-display text-base font-semibold transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Separator className="mt-4" />

        {/* 底部 CTA */}
        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              想看看代码里的暗面？
            </h3>
            <p className="max-w-md text-sm text-muted-foreground">
              所有项目都在 GitHub 上开源，欢迎 star、fork 与交流。
            </p>
            <Button asChild variant="outline" size="lg" className="mt-2">
              <a href="https://github.com/llxpy" target="_blank" rel="noreferrer">
                <Github />
                访问 GitHub 主页
              </a>
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
