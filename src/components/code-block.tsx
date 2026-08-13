export function CodeBlock({ lang, text }: { lang: string; text: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-[oklch(0.04_0.004_280)]">
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {lang}
        </span>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-[13px] leading-relaxed text-sky-300/90">
          {text}
        </code>
      </pre>
    </div>
  )
}
