export interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
  name: string | null
  bio: string | null
  location: string | null
  blog: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  license: { spdx_id: string } | null
  fork: boolean
  size: number
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string
}

export const GITHUB_USERNAME = "llxpy"

/**
 * 本地头像兜底：avatars.githubusercontent.com 在国内网络被 DNS 污染，
 * 远程头像加载失败时回退到随站点分发的本地文件
 */
export const AVATAR_FALLBACK_SRC = `${import.meta.env.BASE_URL}avatar.jpg`

/** 静态兜底用户数据（API 不可用时使用） */
const FALLBACK_USER: GitHubUser = {
  login: "llxpy",
  avatar_url: "https://avatars.githubusercontent.com/u/142802518?v=4",
  html_url: "https://github.com/llxpy",
  name: null,
  bio: null,
  location: null,
  blog: "",
  public_repos: 10,
  followers: 2,
  following: 3,
  created_at: "2023-08-21T12:06:41Z",
  updated_at: "2026-08-04T12:29:08Z",
}

/** 静态兜底仓库数据（API 不可用时使用） */
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1299978527,
    name: "MoLock",
    full_name: "llxpy/MoLock",
    html_url: "https://github.com/llxpy/MoLock",
    description:
      "墨家「经说双链」—— 中文大模型语义约束推理架构，让 AI 用中文推理不跑偏",
    language: "Python",
    stargazers_count: 2,
    forks_count: 0,
    topics: ["agent", "ai", "chinese-nlp", "hallucination", "llm", "prompt-engineering", "skills"],
    license: { spdx_id: "MIT" },
    fork: false,
    size: 605,
    created_at: "2026-07-14T03:46:31Z",
    updated_at: "2026-08-09T11:37:33Z",
    pushed_at: "2026-08-09T11:37:00Z",
    homepage: "",
  },
  {
    id: 1311883902,
    name: "CBSS",
    full_name: "llxpy/CBSS",
    html_url: "https://github.com/llxpy/CBSS",
    description:
      "CBSS-先广泛探索，再缩小范围。 从人类所有知识出发，最终汇聚成你独特的认知图景。",
    language: "Java",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    license: null,
    fork: false,
    size: 153,
    created_at: "2026-07-25T10:20:35Z",
    updated_at: "2026-08-08T03:48:43Z",
    pushed_at: "2026-07-26T07:23:19Z",
    homepage: "",
  },
  {
    id: 1328754812,
    name: "Baim",
    full_name: "llxpy/Baim",
    html_url: "https://github.com/llxpy/Baim",
    description: "Baim",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    license: null,
    fork: false,
    size: 37,
    created_at: "2026-08-09T11:56:27Z",
    updated_at: "2026-08-09T12:38:33Z",
    pushed_at: "2026-08-09T12:38:15Z",
    homepage: "",
  },
  {
    id: 1306371645,
    name: "TJ",
    full_name: "llxpy/TJ",
    html_url: "https://github.com/llxpy/TJ",
    description: "一个带自有 CKG 知识图谱的白盒推理引擎（目前正在测试迭代中）",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    license: { spdx_id: "NOASSERTION" },
    fork: false,
    size: 135,
    created_at: "2026-07-20T08:10:03Z",
    updated_at: "2026-07-20T08:14:28Z",
    pushed_at: "2026-07-20T08:45:29Z",
    homepage: "",
  },
  {
    id: 1306194974,
    name: "Auralis",
    full_name: "llxpy/Auralis",
    html_url: "https://github.com/llxpy/Auralis",
    description: "Auralis 双耳听觉校准室",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    license: null,
    fork: false,
    size: 312,
    created_at: "2026-07-20T03:54:40Z",
    updated_at: "2026-07-20T03:56:26Z",
    pushed_at: "2026-07-20T03:56:17Z",
    homepage: "",
  },
  {
    id: 1302498296,
    name: "DPB-WS",
    full_name: "llxpy/DPB-WS",
    html_url: "https://github.com/llxpy/DPB-WS",
    description: "DPB-WS是一个专注Agent处理问题的规范",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    license: { spdx_id: "MIT" },
    fork: false,
    size: 32,
    created_at: "2026-07-16T07:59:35Z",
    updated_at: "2026-07-16T08:18:31Z",
    pushed_at: "2026-07-16T08:01:38Z",
    homepage: "",
  },
  {
    id: 1258302693,
    name: "BeeHive",
    full_name: "llxpy/BeeHive",
    html_url: "https://github.com/llxpy/BeeHive",
    description:
      "能力越大，责任越大。请负责任地使用 BeeHive。 \"像蜂群一样协作，像守卫一样警惕，像蜂后一样智慧。\"",
    language: null,
    stargazers_count: 0,
    forks_count: 0,
    topics: ["ai-agent", "autonomous-agent", "coding-assistant", "multi-agent", "process-isolation"],
    license: null,
    fork: false,
    size: 238,
    created_at: "2026-06-03T13:02:02Z",
    updated_at: "2026-06-21T01:20:37Z",
    pushed_at: "2026-06-21T01:20:33Z",
    homepage: "",
  },
  {
    id: 1257997012,
    name: "AntNest",
    full_name: "llxpy/AntNest",
    html_url: "https://github.com/llxpy/AntNest",
    description:
      "AntNest  是一个采用蚁后 / 工蚁架构（或者蜂后/工蜂）的 AI 编程助手。你可以把它想象成一个蚁群：  - 蚁后（本体）：只负责思考、规划、决策。蚁后从不亲自执行任何命令。 - 工蚁（复制体）：蚁后需要干活时，会生成一只工蚁——也就是把自身代码复制一份，派到隔离的临时目录里执行命令。工蚁干完活就把结果交回来，然后被立即杀死（杀功臣我有的是手段QVQ--其实是删掉了）。",
    language: "Python",
    stargazers_count: 2,
    forks_count: 0,
    topics: ["ai-agents", "autonomous-agent", "coding-assistant", "multi-agent", "process-isolation"],
    license: { spdx_id: "MIT" },
    fork: false,
    size: 168,
    created_at: "2026-06-03T07:28:17Z",
    updated_at: "2026-08-10T02:01:26Z",
    pushed_at: "2026-08-10T01:59:32Z",
    homepage: "",
  },
  {
    id: 681927405,
    name: "llxpy-blog",
    full_name: "llxpy/llxpy-blog",
    html_url: "https://github.com/llxpy/llxpy-blog",
    description: "blog",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["config", "github-config"],
    license: null,
    fork: false,
    size: 149,
    created_at: "2023-08-23T04:18:02Z",
    updated_at: "2026-08-08T00:50:50Z",
    pushed_at: "2026-08-08T00:50:46Z",
    homepage: "https://github.com/llxpy",
  },
  {
    id: 681164221,
    name: "jobscope",
    full_name: "llxpy/jobscope",
    html_url: "https://github.com/llxpy/jobscope",
    description:
      "JobScope · 求职信息核对 —— 输入公司名，聚合涉诉、被执行、经营异常、网络提及等公开来源，产出带可信度分级与来源凭据的核对报告。只陈述事实，不下结论——也是防编造数据管线的工程样例。",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["python", "fastapi", "vue", "agent", "job-search", "fact-checking"],
    license: null,
    fork: false,
    size: 58,
    created_at: "2023-08-21T12:09:11Z",
    updated_at: "2026-08-04T12:51:40Z",
    pushed_at: "2026-08-04T12:31:22Z",
    homepage: "",
  },
]

const CACHE_KEY = "llxpy_github_cache"
const CACHE_TTL = 1000 * 60 * 30 // 30 分钟

/**
 * 清洗 GitHub 原始描述：
 * - 截断包含分隔线的非正式描述（如 AntNest 的 ---- 分隔段）
 * - 修复转义引号（如 BeeHive 的 \"）
 * - 去除多余空白
 */
export function cleanDescription(desc: string | null): string | null {
  if (!desc) return null
  let text = desc
    .replace(/\\"/g, '"')
    .replace(/-{4,}/g, "")
    .replace(/\s+/g, " ")
    .trim()
  // 截断过长描述，保留语义完整的第一段
  if (text.length > 160) {
    const cut = text.slice(0, 160)
    const idx = cut.lastIndexOf("。")
    text = (idx > 0 ? cut.slice(0, idx + 1) : cut) + "……"
  }
  return text
}

interface CachePayload {
  user: GitHubUser
  repos: GitHubRepo[]
  fetchedAt: number
}

function readCache(): CachePayload | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as CachePayload
    if (Date.now() - data.fetchedAt > CACHE_TTL) return null
    return data
  } catch {
    return null
  }
}

function writeCache(payload: Omit<CachePayload, "fetchedAt">) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ...payload, fetchedAt: Date.now() })
    )
  } catch {
    /* ignore */
  }
}

export async function fetchGitHubProfile(): Promise<{
  user: GitHubUser
  repos: GitHubRepo[]
  source: "api" | "cache" | "fallback"
}> {
  const cached = readCache()
  if (cached) return { ...cached, source: "cache" }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
      ),
    ])
    if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error")

    const user = (await userRes.json()) as GitHubUser
    const fallbackRepoMap = new Map(FALLBACK_REPOS.map((r) => [r.name, r]))
    const repos = ((await reposRes.json()) as GitHubRepo[])
      .filter((r) => !r.fork)
      .map((r) => {
        // GitHub 上未填描述/标签的仓库（如 jobscope），用兜底数据补齐
        const fb = fallbackRepoMap.get(r.name)
        return {
          ...r,
          description: r.description ?? fb?.description ?? null,
          topics: r.topics.length > 0 ? r.topics : (fb?.topics ?? []),
        }
      })
      .sort((a, b) => b.stargazers_count - a.stargazers_count)

    writeCache({ user, repos })
    return { user, repos, source: "api" }
  } catch {
    return { user: FALLBACK_USER, repos: FALLBACK_REPOS, source: "fallback" }
  }
}
