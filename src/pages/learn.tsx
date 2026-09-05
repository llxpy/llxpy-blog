import { useState } from "react"
import {
  BookOpen,
  Flame,
  GraduationCap,
  MapPin,
  Package,
  Wrench,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { STAGES } from "@/data/learn"
import { useLearnStore } from "@/hooks/use-learn-store"
import { Reveal } from "@/components/motion"
import { RoadmapTab } from "@/components/learn/roadmap-tab"
import { KnowledgeTab } from "@/components/learn/knowledge-tab"
import { ProjectsTab } from "@/components/learn/projects-tab"
import { CheckinTab } from "@/components/learn/checkin-tab"
import { ProfileSwitcher } from "@/components/learn/profile-switcher"

const TABS = [
  { id: "roadmap" as const, label: "学习路线", icon: MapPin },
  { id: "knowledge" as const, label: "知识库", icon: BookOpen },
  { id: "projects" as const, label: "项目实战", icon: Wrench },
  { id: "checkin" as const, label: "每日打卡", icon: Flame },
]

export type LearnTab = "roadmap" | "knowledge" | "projects" | "checkin"

export function LearnPage() {
  const [tab, setTab] = useState<LearnTab>("roadmap")
  const store = useLearnStore()
  const { state } = store

  const currentStage = STAGES.find((s) => s.id === state.currentStage)
  const totalProgress = Math.round((state.completedStages.length / 15) * 100)
  const today = new Date().toISOString().slice(0, 10)
  const pendingCount = state.tasks.filter(
    (t) => !t.done && (t.dueDate === today || t.dueDate < today || !t.dueDate)
  ).length
  const knownCount = Object.values(state.knownPoints).reduce(
    (a, b) => a + b.length,
    0
  )

  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-32">
      {/* 页头 */}
      <Reveal>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
          / learn
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          学习路线<span className="text-primary">.</span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          通用 AI 全栈工程师培养体系——15 阶段路线、知识库与项目实战。
        </p>
      </Reveal>

      {/* 统计 */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-5 py-3 transition-colors hover:border-primary/30">
            <span className="flex items-center gap-2 font-display text-2xl font-bold">
              <Flame className="h-5 w-5 text-orange-400" />
              {state.streak}
            </span>
            <span className="text-xs text-muted-foreground">连续学习天数</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-5 py-3 transition-colors hover:border-primary/30">
            <span className="flex items-center gap-2 font-display text-2xl font-bold">
              <GraduationCap className="h-5 w-5 text-amber-400" />
              {state.totalHours}
            </span>
            <span className="text-xs text-muted-foreground">累计学习小时</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-5 py-3 transition-colors hover:border-primary/30">
            <span className="flex items-center gap-2 font-display text-2xl font-bold">
              <Package className="h-5 w-5 text-primary" />
              {state.completedStages.length}
              <span className="text-sm text-muted-foreground">/ 15</span>
            </span>
            <span className="text-xs text-muted-foreground">完成阶段</span>
          </div>
        </div>
      </Reveal>

      {/* 今日概览 */}
      <Reveal delay={0.15}>
        <div className="mt-8 rounded-2xl border border-border/60 bg-card/60 p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              今日要处理
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                {currentStage
                  ? `阶段 ${state.currentStage} · ${currentStage.name}`
                  : "未开始"}
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <ProfileSwitcher store={store} />
              <button
                onClick={() => store.exportData()}
                className="rounded-lg border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                导出数据
              </button>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                label: "当前阶段",
                value: state.currentStage,
                suffix: "/ 15",
              },
              { label: "总进度", value: totalProgress, suffix: "%" },
              { label: "今日待办", value: pendingCount, suffix: "项" },
              { label: "已掌握知识点", value: knownCount, suffix: "个" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border/40 bg-card/40 px-4 py-3"
              >
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 font-display text-xl font-bold">
                  {item.value}
                  <small className="ml-0.5 text-xs font-normal text-muted-foreground">
                    {item.suffix}
                  </small>
                </p>
              </div>
            ))}
          </div>
          <TodayTasks store={store} />
        </div>
      </Reveal>

      {/* Tabs */}
      <Reveal delay={0.2}>
        <div className="mb-5 flex gap-1.5 overflow-x-auto rounded-xl border border-border/60 bg-card/60 p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              data-tab={t.id}
              className={cn(
                "flex min-w-[80px] flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                tab === t.id
                  ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_rgba(76,201,240,0.25)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
              )}
            >
              <t.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Tab content */}
      {tab === "roadmap" && <RoadmapTab store={store} />}
      {tab === "knowledge" && <KnowledgeTab store={store} />}
      {tab === "projects" && <ProjectsTab />}
      {tab === "checkin" && <CheckinTab store={store} />}
    </div>
  )
}

function TodayTasks({
  store,
}: {
  store: ReturnType<typeof useLearnStore>
}) {
  const { state } = store
  const today = new Date().toISOString().slice(0, 10)
  const overdue = state.tasks.filter(
    (t) => !t.done && t.dueDate && t.dueDate < today
  )
  const pending = state.tasks.filter(
    (t) =>
      !t.done &&
      !overdue.includes(t) &&
      (t.dueDate === today || t.dueDate < today || !t.dueDate)
  )
  const display = [...overdue, ...pending].slice(0, 5)

  if (display.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/60 py-6 text-center text-sm text-muted-foreground">
        今天没有待办，加一个吧
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {display.map((t) => {
        const isOver = t.dueDate && t.dueDate < today
        return (
          <div
            key={t.id}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 py-3 transition-all",
              t.done
                ? "border-emerald-500/20 bg-emerald-500/[0.06] opacity-60"
                : isOver
                  ? "border-red-500/20 bg-red-500/[0.06]"
                  : "border-border/40 bg-card/40"
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{t.title}</p>
              <p
                className={cn(
                  "mt-0.5 text-[11px]",
                  isOver ? "text-red-400" : "text-muted-foreground"
                )}
              >
                {t.stageId ? `阶段 ${t.stageId} · ` : ""}
                {isOver ? "逾期 · " : ""}
                {t.dueDate || "无截止"}
              </p>
            </div>
            <button
              onClick={() => store.toggleTask(t.id)}
              className={cn(
                "shrink-0 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all",
                t.done
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
              )}
            >
              {t.done ? "已完成" : "完成"}
            </button>
          </div>
        )
      })}
    </div>
  )
}
