import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
  { to: "/", label: "首页" },
  { to: "/projects", label: "项目" },
  { to: "/blog", label: "文章" },
  { to: "/about", label: "关于" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-border/50 shadow-[0_8px_32px_oklch(0_0_0/0.4)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 via-indigo-400 to-purple-400 text-sm font-bold text-black transition-transform duration-300 group-hover:rotate-6">
            L
          </span>
          <span className="font-display text-base font-semibold tracking-tight">
            llxpy<span className="text-primary">.</span>dev
          </span>
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-[1px] h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Button asChild size="sm" className="ml-3">
            <a href="https://github.com/llxpy" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Button>
        </nav>

        {/* 移动端菜单按钮 */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="菜单"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* 移动端下拉 */}
      <div
        className={cn(
          "glass overflow-hidden border-b border-border/50 transition-all duration-300 md:hidden",
          open ? "max-h-72 opacity-100" : "max-h-0 border-b-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="https://github.com/llxpy"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-primary/15 px-4 py-2.5 text-center text-sm font-medium text-primary"
          >
            GitHub →
          </a>
        </nav>
      </div>
    </header>
  )
}
