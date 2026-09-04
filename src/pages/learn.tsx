// AI 全栈学习工作台 —— 以 iframe 全屏嵌入博客(同源, 不破坏现有 React 逻辑)
// HTML 实物在 public/ai-fullstack-platform.html, 由小台工作台生成
export function LearnPage() {
  return (
    <div className="fixed inset-0 top-16 z-40 bg-[#05080f]">
      <iframe
        src={`${import.meta.env.BASE_URL}ai-fullstack-platform.html`}
        title="AI 全栈学习工作台"
        className="h-full w-full border-0"
      />
    </div>
  )
}
