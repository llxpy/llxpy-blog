import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, [role="button"], [data-slot="button"], [data-cursor]'

/**
 * 自定义光标：中心小圆点（快跟随）+ 外圈圆环（弹性慢跟随）
 * - 悬停可交互元素：圆环放大并显现光晕
 * - 按下：整体收缩
 * - 仅桌面精指针设备启用；启用后隐藏系统光标
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setEnabled(true)
    document.documentElement.classList.add("cursor-none")

    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 3
    let ringX = x
    let ringY = y

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      setHovering(!!target?.closest?.(INTERACTIVE_SELECTOR))
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    const tick = () => {
      ringX += (x - ringX) * 0.16
      ringY += (y - ringY) * 0.16
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver, { passive: true })
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      document.documentElement.classList.remove("cursor-none")
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]">
      {/* 外圈圆环 */}
      <div
        ref={ringRef}
        className={cn(
          "absolute left-0 top-0 flex items-center justify-center transition-[width,height,border-color,background-color,opacity] duration-200 ease-out",
          hovering
            ? "h-14 w-14 border-primary/70 bg-primary/10 shadow-[0_0_24px_oklch(0.7_0.14_250/0.35)]"
            : "h-9 w-9 border-primary/50 bg-transparent",
          pressed && "scale-90"
        )}
        style={{ borderRadius: "9999px", borderWidth: 1.5 }}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full bg-primary transition-all duration-200",
            hovering ? "opacity-0" : "opacity-100"
          )}
        />
      </div>
      {/* 中心小点（快速跟随） */}
      <div
        ref={dotRef}
        className={cn(
          "absolute left-0 top-0 h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 via-indigo-400 to-purple-400 shadow-[0_0_8px_oklch(0.7_0.14_260/0.8)] transition-opacity duration-200",
          hovering && "opacity-0"
        )}
      />
    </div>
  )
}
