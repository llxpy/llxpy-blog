import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * 月之暗面风格极光背景：
 * 多个模糊色斑缓慢浮动 + 细网格 + 噪点
 */
export function AuroraBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* 网格 */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

      {/* 极光色斑 */}
      <div
        className={cn(
          "absolute -top-[20%] left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full blur-[120px] transition-opacity duration-1000",
          "bg-[oklch(0.55_0.16_260/0.22)]",
          mounted ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "animate-float absolute top-[15%] -left-[10%] h-[40vh] w-[35vw] rounded-full bg-[oklch(0.6_0.15_310/0.12)] blur-[100px] transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "animate-float absolute top-[30%] -right-[8%] h-[45vh] w-[38vw] rounded-full bg-[oklch(0.5_0.14_210/0.14)] blur-[110px] transition-opacity duration-1000 [animation-delay:2s]",
          mounted ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "absolute bottom-[-25%] left-[20%] h-[50vh] w-[60vw] rounded-full bg-[oklch(0.55_0.13_280/0.1)] blur-[130px] transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0"
        )}
      />

      {/* 噪点 */}
      <div className="bg-noise absolute inset-0 opacity-60" />

      {/* 渐隐遮罩，保证文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
    </div>
  )
}
