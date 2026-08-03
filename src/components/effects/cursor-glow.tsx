import { useEffect, useRef, useState } from "react"

/**
 * 全局鼠标光晕：一个柔和渐变光斑平滑跟随光标
 * 仅对鼠标设备启用（移动端无意义）
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    if (!fine) return
    setEnabled(true)

    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 3
    let tx = x
    let ty = y

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const tick = () => {
      x += (tx - x) * 0.08
      y += (ty - y) * 0.08
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div
        ref={ref}
        className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full opacity-60 mix-blend-screen transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.14 260 / 0.12), transparent 60%)",
        }}
      />
    </div>
  )
}
