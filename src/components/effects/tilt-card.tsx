import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * 3D 倾斜卡片：鼠标悬停时轻微立体旋转 + 高光跟随
 * 包装任意内容，保留原本的 className
 */
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

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), {
    stiffness: 180,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), {
    stiffness: 180,
    damping: 20,
  })
  const glareX = useTransform(mx, [0, 1], [0, 100])
  const glareY = useTransform(my, [0, 1], [0, 100])

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const onMouseLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      className={cn("group relative will-change-transform", className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 [transform:translateZ(40px)] group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(360px circle at ${x}% ${y}%, oklch(0.8 0.12 260 / 0.14), transparent 65%)`
            ),
          }}
        />
      )}
    </motion.div>
  )
}
