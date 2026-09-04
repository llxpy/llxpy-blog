import { useRef, type ReactNode, type MouseEvent } from "react"
import { cn } from "@/lib/utils"

export function TiltCard({
  children,
  className,
  max = 7,
  glare = true,
}: {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (0.5 - y) * max * 2
    const rotateY = (x - 0.5) * max * 2
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

    if (glare) {
      const glareEl = el.querySelector<HTMLElement>(":scope > .tilt-glare")
      if (glareEl) {
        glareEl.style.background = `radial-gradient(360px circle at ${x * 100}% ${y * 100}%, oklch(0.8 0.12 260 / 0.14), transparent 65%)`
      }
    }
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)"
    if (glare) {
      const glareEl = el.querySelector<HTMLElement>(":scope > .tilt-glare")
      if (glareEl) glareEl.style.background = "transparent"
    }
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.3s ease-out" }}
      className={cn("group relative", className)}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className="tilt-glare pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </div>
  )
}
