import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * 逐字浮现标题：每个字符依次上浮显现
 * 支持传入渐变 className 使文字呈现渐变效果
 */
export function SplitTitle({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string
  className?: string
  delay?: number
  as?: "span" | "h1" | "h2" | "h3" | "p"
}) {
  const words = text.split(" ")
  let charIndex = 0

  return (
    <Tag className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex whitespace-pre">
          {word.split("").map((char, ci) => {
            const index = charIndex++
            return (
              <motion.span
                key={ci}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: delay + index * 0.045,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
