import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import {
  fetchGitHubProfile,
  type GitHubRepo,
  type GitHubUser,
} from "@/lib/github"

interface GitHubData {
  user: GitHubUser | null
  repos: GitHubRepo[]
  loading: boolean
  source: "api" | "cache" | "fallback" | null
}

const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes

const GitHubContext = createContext<GitHubData>({
  user: null,
  repos: [],
  loading: true,
  source: null,
})

export function GitHubProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<GitHubData>({
    user: null,
    repos: [],
    loading: true,
    source: null,
  })
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchGitHubProfile().then((result) => {
      if (cancelled) return
      setData({
        user: result.user,
        repos: result.repos,
        loading: false,
        source: result.source,
      })
    })

    // Background refresh every 5 minutes (silent, no loading state)
    timerRef.current = setInterval(() => {
      fetchGitHubProfile().then((result) => {
        if (cancelled) return
        setData({
          user: result.user,
          repos: result.repos,
          loading: false,
          source: result.source,
        })
      })
    }, REFRESH_INTERVAL)

    return () => {
      cancelled = true
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <GitHubContext.Provider value={data}>{children}</GitHubContext.Provider>
  )
}

export function useGitHub() {
  return useContext(GitHubContext)
}
