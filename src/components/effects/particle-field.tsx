import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  hue: number
  alpha: number
  phase: number
  speed: number
}

const COLORS = [
  210, // 青
  260, // 蓝
  310, // 紫
]

/**
 * 浮动粒子场：
 * - 青/蓝/紫微光粒子缓慢漂移，正弦扰动
 * - 粒子靠近鼠标时被轻微推开（120px 影响半径）
 * - 移动端 / prefers-reduced-motion 自动降级
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isCoarse = window.matchMedia("(pointer: coarse)").matches

    let raf = 0
    let particles: Particle[] = []
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles()
    }

    const initParticles = () => {
      // 桌面 70 颗，移动端 32 颗
      const count = isCoarse ? 32 : Math.min(70, Math.floor(width / 22))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: 1 + Math.random() * 1.6,
        hue: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0.15 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
      }))
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        // 正弦扰动
        const wobble = Math.sin(time * 0.0006 * p.speed + p.phase) * 0.12
        p.x += p.vx + wobble
        p.y += p.vy

        // 鼠标排斥
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist2 = dx * dx + dy * dy
        const influence = 120 * 120
        if (dist2 < influence && dist2 > 0.01) {
          const dist = Math.sqrt(dist2)
          const force = ((influence - dist2) / influence) * 0.6
          p.x += (dx / dist) * force
          p.y += (dy / dist) * force
        }

        // 边界回弹
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        // 呼吸透明度
        const breathe =
          p.alpha * (0.75 + 0.25 * Math.sin(time * 0.0012 * p.speed + p.phase))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `oklch(0.75 0.12 ${p.hue} / ${breathe})`
        ctx.fill()

        // 微光
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `oklch(0.75 0.12 ${p.hue} / ${breathe * 0.18})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)

    if (reduced) {
      // 静态渲染一帧，不运行动画
      draw(0)
      cancelAnimationFrame(raf)
    } else {
      window.addEventListener("mousemove", onMove, { passive: true })
      window.addEventListener("mouseleave", onLeave)
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  )
}
