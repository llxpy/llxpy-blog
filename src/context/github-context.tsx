import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { fetchGitHubProfile, type GitHubRepo, type GitHubUser } from "@/lib/github"

interface GitHubData {
  user: GitHubUser | null
  repos: GitHubRepo[]
  loading: boolean
  source: "api" | "cache" | "fallback" | null
}

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
    return () => {
      cancelled = true
    }
  }, [])

  return <GitHubContext.Provider value={data}>{children}</GitHubContext.Provider>
}

export function useGitHub() {
  return useContext(GitHubContext)
}
