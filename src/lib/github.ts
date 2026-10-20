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
  public_repos: 13,
  followers: 4,
  following: 3,
  created_at: "2023-08-21T12:06:41Z",
  updated_at: "2026-10-07T07:13:08Z",
}

/**
 * 静态兜底仓库数据（API 不可用时使用）
 * 顺序与 GitHub 默认 updated 排序一致；无描述仓库的文案提炼自各自 README
 */
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1426446284,
    name: "plankernel",
    full_name: "llxpy/plankernel",
    html_url: "https://github.com/llxpy/plankernel",
    description:
      "盘枢 Panhub KBEngine —— 纯本地、可离线、可审计的 Windows 目录级 RAG 中台。目录即工作区，SQLite FTS5 双路中文检索 + Merkle 完整性链，单文件 exe 交付并支持 MCP 接入。",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["rag", "local-first", "sqlite", "fts5", "mcp", "knowledge-base"],
    license: null,
    fork: false,
    size: 296,
    created_at: "2026-10-20T03:19:30Z",
    updated_at: "2026-10-20T11:36:38Z",
    pushed_at: "2026-10-20T11:36:33Z",
    homepage: "",
  },
  {
    id: 1257997012,
    name: "AntNest",
    full_name: "llxpy/AntNest",
    html_url: "https://github.com/llxpy/AntNest",
    description:
      "蚁后 / 工蚁架构的 AI 编程助手：蚁后只负责思考、规划与决策，工蚁复制自身到隔离临时目录执行命令，交回结果后立即销毁。",
    language: "Python",
    stargazers_count: 40,
    forks_count: 0,
    topics: ["ai-agents", "autonomous-agent", "coding-assistant", "multi-agent", "process-isolation"],
    license: { spdx_id: "MIT" },
    fork: false,
    size: 23223,
    created_at: "2026-06-03T07:28:17Z",
    updated_at: "2026-10-14T14:29:43Z",
    pushed_at: "2026-10-14T14:28:58Z",
    homepage: "",
  },
  {
    id: 1361316706,
    name: "codeposter",
    full_name: "llxpy/codeposter",
    html_url: "https://github.com/llxpy/codeposter",
    description:
      "把代码片段渲染成 macOS 风格的精美分享图：40+ 语言语法高亮、6 套主题、12 种渐变背景，浏览器本地渲染，一键导出 3 倍高清 PNG，代码不上传。",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["code-screenshot", "syntax-highlighting", "html2canvas", "developer-tools", "github-pages"],
    license: { spdx_id: "MIT" },
    fork: false,
    size: 891,
    created_at: "2026-09-08T11:49:36Z",
    updated_at: "2026-09-08T12:54:32Z",
    pushed_at: "2026-09-08T12:53:32Z",
    homepage: "https://llxpy.github.io/codeposter/",
  },
  {
    id: 1360804082,
    name: "microservice-manager",
    full_name: "llxpy/microservice-manager",
    html_url: "https://github.com/llxpy/microservice-manager",
    description:
      "单文件零依赖的 Windows 微服务管理面板：Go + Vue3，常驻内存约 50MB。自动发现 jar、分组启停、崩溃守护、xterm.js 实时日志与 CPU/内存监控曲线。",
    language: "Go",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["go", "vue3", "microservice", "process-manager", "windows"],
    license: null,
    fork: false,
    size: 30698,
    created_at: "2026-09-08T01:27:56Z",
    updated_at: "2026-09-08T11:50:46Z",
    pushed_at: "2026-09-08T11:48:36Z",
    homepage: "",
  },
  {
    id: 681927405,
    name: "llxpy-blog",
    full_name: "llxpy/llxpy-blog",
    html_url: "https://github.com/llxpy/llxpy-blog",
    description:
      "基于 GitHub 数据的开发者个人博客：项目作品集 + 技术文章 + 个人理念，月之暗面式暗色设计，内置学习路线与知识库。",
    language: "TypeScript",
    stargazers_count: 1,
    forks_count: 0,
    topics: ["blog", "react", "vite", "tailwindcss", "github-api"],
    license: null,
    fork: false,
    size: 336,
    created_at: "2023-08-23T04:18:02Z",
    updated_at: "2026-09-05T01:30:19Z",
    pushed_at: "2026-09-05T01:30:16Z",
    homepage: "https://github.com/llxpy",
  },
  {
    id: 1354477502,
    name: "AgentBook",
    full_name: "llxpy/AgentBook",
    html_url: "https://github.com/llxpy/AgentBook",
    description:
      "用自然语言控制一台 Linux 的运维 Agent：9 类白名单工具与命令护栏，灾难性操作直接拒绝、高危操作需确认，支持真流式对话、状态仪表盘与 Docker 一键部署。",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["ai-agent", "linux", "ops", "self-hosted", "llm", "devops"],
    license: null,
    fork: false,
    size: 185,
    created_at: "2026-09-02T07:41:02Z",
    updated_at: "2026-09-02T09:56:28Z",
    pushed_at: "2026-09-02T09:58:11Z",
    homepage: "",
  },
  {
    id: 1258302693,
    name: "BeeHive",
    full_name: "llxpy/BeeHive",
    html_url: "https://github.com/llxpy/BeeHive",
    description:
      "像蜂群一样协作，像守卫一样警惕，像蜂后一样智慧——面向 Autonomous Agent 的多智能体协作规范，能力必须绑定责任边界与审计日志。",
    language: "Go",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["ai-agent", "autonomous-agent", "coding-assistant", "multi-agent", "process-isolation"],
    license: null,
    fork: false,
    size: 5058,
    created_at: "2026-06-03T13:02:02Z",
    updated_at: "2026-08-30T20:54:45Z",
    pushed_at: "2026-08-30T20:54:38Z",
    homepage: "",
  },
  {
    id: 1340751398,
    name: "ai-interview",
    full_name: "llxpy/ai-interview",
    html_url: "https://github.com/llxpy/ai-interview",
    description:
      "AI 面试宝典：18,095 道真实 Java 后端面试题，覆盖 19 个技术分类，支持分类浏览、随机刷题、收藏与掌握进度追踪，移动端友好。",
    language: "Python",
    stargazers_count: 1,
    forks_count: 0,
    topics: ["interview", "java", "question-bank", "react", "github-pages"],
    license: null,
    fork: false,
    size: 4599,
    created_at: "2026-08-20T13:47:55Z",
    updated_at: "2026-08-30T00:12:44Z",
    pushed_at: "2026-08-21T04:59:16Z",
    homepage: "https://llxpy.github.io/ai-interview/",
  },
  {
    id: 681164221,
    name: "jobscope",
    full_name: "llxpy/jobscope",
    html_url: "https://github.com/llxpy/jobscope",
    description:
      "投递之前，把目标公司公开可见的信息核对一遍——涉诉、被执行、经营异常、网络提及。每条结论附来源与原文，只陈述事实，不下结论。",
    language: "Python",
    stargazers_count: 1,
    forks_count: 0,
    topics: ["python", "fastapi", "vue", "agent", "job-search", "fact-checking"],
    license: null,
    fork: false,
    size: 58,
    created_at: "2023-08-21T12:09:11Z",
    updated_at: "2026-08-30T00:12:22Z",
    pushed_at: "2026-08-04T12:31:22Z",
    homepage: "",
  },
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
      "CBSS —— 先广泛探索，再缩小范围。从人类所有知识出发，最终汇聚成你独特的认知图景。",
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
    id: 1306371645,
    name: "TJ",
    full_name: "llxpy/TJ",
    html_url: "https://github.com/llxpy/TJ",
    description: "一个带自有 CKG 知识图谱的白盒推理引擎（目前正在测试迭代中）",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["reasoning", "knowledge-graph", "white-box", "ckg"],
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
    description:
      "Auralis 双耳听觉校准室：基于 Web Audio API 在浏览器里完成声学测量、校准与可视化。",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["web-audio", "audio", "calibration", "javascript"],
    license: null,
    fork: false,
    size: 312,
    created_at: "2026-07-20T03:54:40Z",
    updated_at: "2026-07-20T03:56:26Z",
    pushed_at: "2026-07-20T03:56:17Z",
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
      .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))

    writeCache({ user, repos })
    return { user, repos, source: "api" }
  } catch {
    return { user: FALLBACK_USER, repos: FALLBACK_REPOS, source: "fallback" }
  }
}
