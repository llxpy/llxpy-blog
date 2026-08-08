import { Link } from "react-router-dom"
import {
  ArrowUpRight,
  BrainCircuit,
  Compass,
  GitBranch,
  Layers,
  Quote,
  ShieldCheck,
} from "lucide-react"
import { useGitHub } from "@/context/github-context"
import { AVATAR_FALLBACK_SRC } from "@/lib/github"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal, Stagger, StaggerItem } from "@/components/motion"
import { TiltCard } from "@/components/effects/tilt-card"
import { CountUp } from "@/components/effects/count-up"
import { Separator } from "@/components/ui/separator"
import { timeAgo } from "@/lib/utils"

const PHILOSOPHY = [
  {
    icon: BrainCircuit,
    title: "让推理可见",
    desc: "黑盒给答案，白盒给证据。TJ 的每一步推理都摊开在知识图谱上，可追溯、可干预、可修正。",
  },
  {
    icon: ShieldCheck,
    title: "让执行可控",
    desc: "AntNest 的蚁后从不弄脏手，BeeHive 的能力必须绑定责任。安全是架构属性，不是事后补丁。",
  },
  {
    icon: GitBranch,
    title: "让中文不失真",
    desc: "MoLock 用「经说双链」把中文语义锁进推理过程，让 AI 用中文思考不漂移、不跑偏。",
  },
  {
    icon: Layers,
    title: "让过程有规范",
    desc: "DPB-WS 把工程师的方法论编译成 Agent 的流程规范，让输出从灵光一现变成工程成果。",
  },
]

const FOCUS = [
  "中文大模型推理与反幻觉",
  "多智能体协作架构",
  "Agent 安全与进程隔离",
  "白盒推理引擎与知识图谱",
  "Prompt 工程与技能编排",
  "Web 音频与创意工具",
]

const PRINCIPLES = [
  "能力越大，责任越大 —— 任何能力必须绑定责任边界",
  "蚁后思考，工蚁执行 —— 职责分离是安全的基石",
  "经说双链 —— 语义约束比语义劝说更可靠",
  "白盒优先 —— 不可解释的推理不该用于高风险场景",
]

export function AboutPage() {
  const { user, repos, loading } = useGitHub()
  const lastPush = repos.length
    ? [...repos].sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))[0].pushed_at
    : null

  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-32">
      {/* 页头 */}
      <Reveal>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
          / about
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          关于<span className="text-primary">.</span>
        </h1>
      </Reveal>

      {/* 个人卡片 */}
      <Reveal delay={0.1}>
        <Card className="glow-border mt-12 overflow-hidden">
          <CardContent className="flex flex-col gap-8 p-8 sm:p-10 md:flex-row md:items-center">
            <div className="relative shrink-0">
              <div className="glow-border rounded-full p-[3px]">
                <Avatar className="h-32 w-32 rounded-full">
                  <AvatarImage
                    src={user?.avatar_url}
                    alt="llxpy"
                    className="rounded-full"
                    onError={(e) => {
                      const img = e.currentTarget
                      if (!img.src.endsWith("avatar.jpg")) img.src = AVATAR_FALLBACK_SRC
                    }}
                  />
                  <AvatarFallback className="rounded-full bg-gradient-to-br from-cyan-400 via-indigo-400 to-purple-400 text-4xl font-bold text-black">
                    L
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full border-4 border-card bg-emerald-400" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  {user?.name || "llxpy"}
                </h2>
                <Badge variant="glow">独立开发者 · AI Agent 研究者</Badge>
              </div>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                黑马程序员学员出身，偏爱在「暗面」里构建不循常理的系统：
                让 AI 用中文推理不跑偏的语义约束架构、蚁后/工蚁分离的 Agent
                安全模型、摊开在知识图谱上的白盒推理引擎。
                相信架构即安全、语义即约束、流程即工程。
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {FOCUS.map((f) => (
                  <Badge key={f} variant="outline">
                    {f}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      {/* 数据统计 */}
      <Reveal delay={0.15}>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "公开项目", value: loading ? 0 : repos.length, suffix: "" },
            { label: "关注者", value: user?.followers ?? 0, suffix: "" },
            { label: "正在关注", value: user?.following ?? 0, suffix: "" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border/60 bg-card/40 px-5 py-4 text-center backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_32px_oklch(0.7_0.14_250/0.12)]"
            >
              <p className="font-display text-2xl font-bold">
                <CountUp value={stat.value} />
                {stat.suffix}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
          <div className="rounded-xl border border-border/60 bg-card/40 px-5 py-4 text-center backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_32px_oklch(0.7_0.14_250/0.12)]">
            <p className="font-display text-2xl font-bold">
              {lastPush ? timeAgo(lastPush) : "—"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">最近提交</p>
          </div>
        </div>
      </Reveal>

      {/* 理念 */}
      <div className="mt-24">
        <Reveal>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
            / philosophy
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            构建理念
          </h2>
        </Reveal>

        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
          {PHILOSOPHY.map((item, i) => (
            <StaggerItem key={item.title} delay={i * 0.09}>
              <TiltCard max={6} className="h-full">
                <Card className="group h-full">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_24px_oklch(0.7_0.14_250/0.25)]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* 原则 + 名言 */}
      <div className="mt-24 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Reveal>
            <div className="flex items-center gap-3">
              <Compass className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-bold tracking-tight">
                四条原则
              </h2>
            </div>
            <div className="mt-8 space-y-4">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="group flex items-start gap-4 rounded-xl border border-border/50 bg-card/30 p-5 backdrop-blur transition-colors hover:border-primary/30">
                    <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 font-mono text-sm font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1.5 text-sm leading-relaxed text-foreground/80">
                      {p}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-2">
          <Reveal delay={0.15}>
            <Card className="glow-border relative h-full overflow-hidden">
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <CardContent className="relative flex h-full flex-col justify-center gap-6 p-8">
                <Quote className="h-8 w-8 text-primary/50" />
                <p className="font-display text-xl font-medium leading-relaxed text-foreground/90">
                  “在暗面里构建，不是躲藏，
                  <br />
                  而是让光更清楚地照进代码。”
                </p>
                <Separator className="w-24 bg-primary/40" />
                <div>
                  <p className="font-display text-sm font-semibold">llxpy</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    builder · thinker · tinkerer
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href="https://github.com/llxpy" target="_blank" rel="noreferrer">
                      GitHub 主页
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/projects">看看项目</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
