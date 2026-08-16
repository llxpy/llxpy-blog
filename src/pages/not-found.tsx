import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, FolderGit2, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

type LineTone = "muted" | "output" | "error" | "accent"

const LINES: { text: string; tone?: LineTone }[] = [
  { text: "$ cd llxpy.dev && ls" },
  { text: "index.html   projects/   blog/   about/", tone: "output" },
  { text: "$ cat 404.html" },
  { text: "ERROR 404 — 这个页面在妄想里迷路了", tone: "error" },
  {
    text: "你访问的路径不存在。它可能被删除、移动，或从未存在过。",
    tone: "output",
  },
  { text: "建议操作：", tone: "muted" },
  {
    text: "  [1] 返回首页    [2] 探索项目    [3] 阅读文章    [4] 访问 GitHub",
    tone: "accent",
  },
]

const TONE_CLASS: Record<LineTone, string> = {
  muted: "text-muted-foreground",
  output: "text-sky-300/80",
  error: "text-red-400/90",
  accent: "text-primary",
}

export function NotFoundPage() {
  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-6 py-24">
      {/* 背景：超大渐变 404 装饰 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="text-gradient font-display select-none text-[24vw] font-bold leading-none opacity-[0.07]">
          404
        </span>
      </div>

      {/* 终端窗口 */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="glow-border glass relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl"
      >
        {/* 标题栏 */}
        <div className="flex items-center gap-2 border-b border-border/50 px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          <span className="ml-3 truncate font-mono text-xs text-muted-foreground">
            llxpy@dark:~$ /404
          </span>
        </div>

        {/* 终端内容：逐行浮现 */}
        <div className="space-y-2.5 px-6 py-7 font-mono text-[13px] leading-relaxed sm:text-sm">
          {LINES.map((line, i) => {
            const isPrompt = line.text.startsWith("$ ")
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.22, duration: 0.35 }}
                className={TONE_CLASS[line.tone ?? "muted"]}
              >
                {isPrompt ? (
                  <>
                    <span className="font-semibold text-primary">$</span>
                    {line.text.slice(1)}
                  </>
                ) : (
                  line.text
                )}
                {i === LINES.length - 1 && (
                  <span className="animate-blink ml-1.5 inline-block h-4 w-2 translate-y-[3px] bg-primary" />
                )}
              </motion.p>
            )
          })}
        </div>

        {/* 操作区 */}
        <div className="flex flex-wrap items-center gap-3 border-t border-border/50 px-6 py-5">
          <Button asChild size="sm">
            <Link to="/">
              <ArrowLeft className="h-3.5 w-3.5" />
              返回首页
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/projects">
              <FolderGit2 className="h-3.5 w-3.5" />
              探索项目
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/blog">
              <BookOpen className="h-3.5 w-3.5" />
              阅读文章
            </Link>
          </Button>
          <Button asChild size="sm" variant="ghost" className="ml-auto text-muted-foreground">
            <a href="https://github.com/llxpy" target="_blank" rel="noreferrer">
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
