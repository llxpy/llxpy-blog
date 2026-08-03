import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function timeAgo(date: string | Date): string {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  )
  const intervals: [number, string][] = [
    [31536000, "年"],
    [2592000, "个月"],
    [604800, "周"],
    [86400, "天"],
    [3600, "小时"],
    [60, "分钟"],
  ]
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs)
    if (count >= 1) return `${count} ${label}前`
  }
  return "刚刚"
}

/** 语言 → 高亮色映射 */
export const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  C: "#555555",
  "C++": "#f34b7d",
  Shell: "#89e051",
  Markdown: "#083fa1",
  Jupyter: "#DA5B0B",
  Vue: "#41b883",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  PHP: "#4F5D95",
  Ruby: "#701516",
}

export function languageColor(lang: string | null): string {
  if (!lang) return "#8b949e"
  return LANGUAGE_COLORS[lang] ?? "#8b949e"
}
