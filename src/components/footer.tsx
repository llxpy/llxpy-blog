import { Link } from "react-router-dom"
import { Github, Mail, Rss } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const CONTACT_EMAIL = "3042652889@qq.com"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 via-indigo-400 to-purple-400 text-sm font-bold text-black">
                L
              </span>
              <span className="font-display text-base font-semibold">
                llxpy<span className="text-primary">.</span>dev
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              中文大模型语义推理 · 多智能体架构 · 白盒引擎 —— 记录在暗面里构建的每一行。
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex gap-3">
              {[
                {
                  href: "https://github.com/llxpy",
                  icon: Github,
                  label: "GitHub",
                },
                {
                  href: `mailto:${CONTACT_EMAIL}`,
                  icon: Mail,
                  label: "邮件",
                },
                { href: "/blog", icon: Rss, label: "RSS" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:shadow-[0_0_16px_oklch(0.7_0.14_250/0.2)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <nav className="flex gap-5 text-sm text-muted-foreground">
              <Link className="transition-colors hover:text-foreground" to="/projects">
                项目
              </Link>
              <Link className="transition-colors hover:text-foreground" to="/notes">
                笔记
              </Link>
              <Link className="transition-colors hover:text-foreground" to="/blog">
                文章
              </Link>
              <Link className="transition-colors hover:text-foreground" to="/about">
                关于
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground/70 sm:flex-row">
          <p>© {new Date().getFullYear()} llxpy · 用 React 与星辰构建</p>
          <p className="font-mono">
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse-slow rounded-full bg-emerald-400" />
            status: building in the dark
          </p>
        </div>
      </div>
    </footer>
  )
}
