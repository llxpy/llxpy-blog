import { useEffect, useRef, type ReactNode } from "react"

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) {
      el.style.opacity = "1"
      el.style.transform = "none"
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay * 1000}ms`
          el.classList.add("reveal-visible")
          observer.disconnect()
        }
      },
      { rootMargin: "-80px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={{ transform: `translateY(${y}px)` }}
    >
      {children}
    </div>
  )
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}

export function StaggerItem({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) {
      el.style.opacity = "1"
      el.style.transform = "none"
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay * 1000}ms`
          el.classList.add("reveal-visible")
          observer.disconnect()
        }
      },
      { rootMargin: "-60px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={{ transform: "translateY(24px)" }}
    >
      {children}
    </div>
  )
}
