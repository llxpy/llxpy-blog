import { motion, useScroll, useSpring } from "framer-motion"

/** 顶部滚动进度条：青蓝紫渐变细线 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, oklch(0.8 0.12 210), oklch(0.7 0.15 260), oklch(0.65 0.16 310))",
        boxShadow: "0 0 12px oklch(0.7 0.14 260 / 0.5)",
      }}
    />
  )
}
