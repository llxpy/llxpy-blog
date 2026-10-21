export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  readingTime: number
  featured?: boolean
  project?: string
  content: {
    heading: string
    paragraphs: string[]
    code?: { lang: string; text: string }
    list?: string[]
    quote?: string
  }[]
}

export const POSTS: Post[] = [
  {
    slug: "panhub-local-rag-engine",
    title: "盘枢 Panhub：把 RAG 绑在目录上，让知识库可以整体搬走",
    excerpt:
      "大多数 RAG 让你把文件上传到服务器；盘枢反过来，把索引写进你的目录。纯本地、可离线、可审计，换台机器或放上 NAS 都能原样运行。",
    date: "2026-10-20",
    tags: ["RAG", "本地优先", "SQLite", "MCP"],
    readingTime: 10,
    featured: true,
    project: "plankernel",
    content: [
      {
        heading: "目录即工作区",
        paragraphs: [
          "盘枢不是「上传文件再检索」的套壳工具。指定一个目录作为工作区后，它在目录下创建隐藏的 .kbengine/ 信任锚点，把配置、切片、FTS5 索引、融合分数、Merkle 完整性链和运行时锁全部收进去。",
          "这意味着最小备份单元就是原始文档目录加 .kbengine/ 整体：整个目录可以复制、迁移、放 NAS、挂到另一台机器，行为不变。",
        ],
        list: [
          "零云端依赖：原始文档与切片默认不出机，联网只发生在显式配置的 LLM 端点",
          "零 GPU 依赖：不下载 embedding 模型，检索由 SQLite FTS5 原生 BM25 承担",
          "可自证完整：Merkle 哈希链 + AES-256-GCM 状态封装，篡改可定位到首个坏记录",
          "单文件交付：Panhub.exe 双击启动本地原生窗口，无需安装 Python",
        ],
        quote: "目录即工作区，索引是目录的可再生副产物。",
      },
      {
        heading: "双路召回，失败也能用",
        paragraphs: [
          "入库和查询两侧都走 jieba 的 cut_for_search 分词，中文查询被拆成词后拼成 FTS5 MATCH。检索时先走原始 query，再由 LLM 生成 3–8 个连接词走第二路，两路 BM25 分数归一化后用 score 或 RRF 融合。",
          "LLM 是整条链路里唯一可能的外部依赖。端点不可达、超时、返回非 2xx、JSON 解析失败或预算不足，都会降级为单路 BM25，检索结果仍然完整可用，调试面板只标记 degraded，不弹错误。",
        ],
        code: {
          lang: "sql",
          text: "CREATE TABLE retrieval_score (\n  query_run_id TEXT NOT NULL,\n  chunk_id     INTEGER NOT NULL,\n  route        TEXT NOT NULL,        -- original / pivot / fused\n  rank         INTEGER NOT NULL,\n  raw_score    REAL NOT NULL,\n  norm_score   REAL NOT NULL DEFAULT 0,\n  fused        REAL GENERATED ALWAYS AS (\n      CASE route WHEN 'fused' THEN norm_score ELSE 0 END\n  ) STORED,\n  PRIMARY KEY (query_run_id, route, chunk_id)\n) WITHOUT ROWID;",
        },
      },
      {
        heading: "完整性不是口号，是链",
        paragraphs: [
          "每个工作区有两套数据库：main.db 存业务，integrity.db 存 Merkle 链，校验与查询互不阻塞。链记录覆盖文档扫描、切片批次与元数据变更，校验时从 seq=1 逐条重算哈希、验证 GCM tag、检查 prev_hash 连续性。",
          "校验失败或锚点不一致时，工作区进入 Tampered 状态：只读浏览仍可用，写索引与导出被禁用。Normal / Detached / Tampered 三态通过前端徽标实时显示。",
        ],
        list: [
          "Normal：全功能",
          "Detached：NAS 或网络盘不可达时只读检索，禁止写索引",
          "Tampered：链校验失败后只读浏览，禁止导出与写入",
        ],
      },
      {
        heading: "给 Agent 留一个接口",
        paragraphs: [
          "盘枢内置 MCP 服务端，同时支持 Streamable HTTP 和 stdio。Claude Desktop、Cursor 或自研 Agent 可以直接调用检索、索引、完整性校验等 10 个工具，与 UI 共用同一个工作区注册表和锁。",
          "交付形态也很克制：pywebview + Edge WebView2 打开原生窗口，后端绑定随机 loopback 端口；也可以 Panhub.exe server 跑无界面后端，或 Panhub.exe mcp 供 Agent 以子进程拉起。",
        ],
        quote: "知识库应该跟着目录走，而不是跟着某家云走。",
      },
    ],
  },
  {
    slug: "codeposter-code-to-image",
    title: "CodePoster：把代码变成一张能发出去的图",
    excerpt:
      "代码直接粘进推文或幻灯片往往很难看。CodePoster 用一个纯前端页面，把代码渲染成 macOS 窗口卡片，一键导出 3 倍高清 PNG，代码不离开浏览器。",
    date: "2026-09-08",
    tags: ["开发工具", "语法高亮", "GitHub Pages", "JavaScript"],
    readingTime: 5,
    project: "codeposter",
    content: [
      {
        heading: "为什么需要它",
        paragraphs: [
          "写推文、发博客、做技术分享时，直接粘贴代码块观感往往不佳。CodePoster 把代码渲染成带语法高亮的 macOS 窗口卡片，导出 PNG 后可以直接插进社交媒体、文档或幻灯片。",
          "整个过程没有注册、没有上传：highlight.js 负责高亮，html2canvas 在浏览器里把 DOM 光栅化，代码不会离开你的设备。",
        ],
      },
      {
        heading: "能调的东西比想象中多",
        paragraphs: [
          "语言支持 Python、JavaScript、TypeScript、Go、Rust、Java、C++、CSS、JSON、Bash 等 40 多种；内置 Atom One Dark、GitHub Dark、Monokai、Dracula、Tokyo Night、Solarized Light 六套主题，以及 12 种渐变背景。",
          "窗口本身也拟真：红绿灯按钮、文件名标题栏、圆角与投影都能调节。导出时可选「仅卡片」或「带背景」，倍率固定 3 倍，文件名自动取自窗口标题。",
        ],
        list: [
          "字号 10–24px、圆角、行号、留白、投影独立开关",
          "背景支持一键随机",
          "纯静态单页，无后端、无构建步骤",
          "推送 main 后由 GitHub Actions 自动发布到 Pages",
        ],
        quote: "代码不该只活在编辑器里。",
      },
    ],
  },
  {
    slug: "micro-manager-java-services",
    title: "Micro Manager：用 50MB 替掉 2GB 的本地微服务启动器",
    excerpt:
      "本地跑十个 Java 微服务，不一定非要开 IDE。一个单文件 exe、约 50MB 内存，自动发现 jar、分组启停、崩溃拉起，还带实时日志和监控曲线。",
    date: "2026-09-08",
    tags: ["Go", "微服务", "Windows", "运维工具"],
    readingTime: 7,
    featured: true,
    project: "microservice-manager",
    content: [
      {
        heading: "本地微服务的日常",
        paragraphs: [
          "写完一组 Spring Boot 服务后，日常变成：打开 IDEA，点十次 Run，从十几个标签页里翻日志，猜哪个服务在吃 CPU，改完代码再手动 rebuild。",
          "Micro Manager 把这些动作压进一个浏览器标签页。它本身是 Go 写的单文件程序，前端内嵌，SQLite 也放在里面，常驻内存大约 50MB。",
        ],
        list: [
          "自动发现：指向项目文件夹，Spring Boot jar 与 Python / Node / Go 项目会被识别、命名、分组并探测端口",
          "崩溃守护：进程挂掉后约 5 秒自动拉起",
          "实时日志：浏览器内 xterm.js 终端，同时写入轮转日志文件",
          "监控面板：CPU / 内存 / 线程曲线，actuator 健康检查与端口探测",
          "面板内构建：执行 mvn package 并实时输出，完成后自动重新扫描",
        ],
      },
      {
        heading: "它刻意不做什么",
        paragraphs: [
          "项目 README 把限制写得很直白：Windows 优先，进程树终止与崩溃守护依赖 taskkill；没有鉴权，只适合本机或可信局域网；停止是强制终止，不走优雅关闭钩子；单机运行，没有集群与远程 Agent。",
          "这些限制不妨碍它成为一个顺手的本地工具。托盘常驻、双击即用、退出面板不影响已运行的服务进程，刚好覆盖「我只是想看看它们还活着吗」的场景。",
        ],
        quote: "Stop paying 2GB of RAM just to run a few jars.",
      },
    ],
  },
  {
    slug: "llxpy-blog-github-as-cms",
    title: "暗面笔记：把 GitHub 当成 CMS 的个人博客",
    excerpt:
      "项目、Star、头像直接从 GitHub 读取，30 分钟缓存加静态兜底；月之暗面式的暗色设计，配上粒子、双层光标和 3D 倾斜卡片。",
    date: "2026-09-05",
    tags: ["React", "Vite", "Tailwind", "GitHub API"],
    readingTime: 6,
    project: "llxpy-blog",
    content: [
      {
        heading: "为什么用 GitHub 当数据源",
        paragraphs: [
          "博客的项目页不需要手工维护。页面启动时并行请求用户信息与仓库列表，过滤 fork，按最近推送排序，写入 localStorage 做 30 分钟缓存；API 不可用时回退到内置的静态快照，头像也有本地兜底。",
          "这样新增一个仓库、改一次描述或涨一颗 Star，站点会自动跟上；只有需要额外解读的仓库，才在兜底数据里补一段提炼过的中文介绍。",
        ],
      },
      {
        heading: "视觉与交互",
        paragraphs: [
          "整体是月之暗面式的暗色设计：极光渐变、玻璃拟态、噪点网格。交互层有 Canvas 浮动粒子、双层自定义光标、3D 倾斜卡片、数字滚动和逐字标题。",
          "移动端会自动降级：粒子减量、禁用悬停特效，并尊重 prefers-reduced-motion。学习页则直接跳过重特效，保证长列表滚动流畅。",
        ],
        list: [
          "React 19 + TypeScript + Vite 7",
          "Tailwind CSS v4 + shadcn/ui 风格组件",
          "Framer Motion + React Router 7",
          "GitHub REST API + localStorage 缓存",
        ],
        quote: "在暗面里构建的每一行，都值得被记录。",
      },
    ],
  },
  {
    slug: "agentbook-linux-ops-agent",
    title: "AgentBook：把一台 Linux 变成听得懂人话的运维助手",
    excerpt:
      "在浏览器里用中文下指令，它调工具真的执行、查状态、改包。底层是 9 类白名单工具和命令护栏：灾难性操作直接拒绝，高危操作要你点确认。",
    date: "2026-09-02",
    tags: ["AI Agent", "Linux", "运维", "自托管"],
    readingTime: 9,
    featured: true,
    project: "AgentBook",
    content: [
      {
        heading: "不是聊天玩具",
        paragraphs: [
          "你有一台云服务器、内网 VM 或树莓派，想随时查状态、跑命令、改配置，又不想每次 SSH；或者想把「给 .deb 预置配置后重打包」这种重复动作变成一句话。AgentBook 就是为这些场景做的。",
          "它在一台独立 Linux 上以服务形态运行，Win / Mac 浏览器访问 IP:端口即可看到对话页和状态页。数据留在自己机器上，不依赖第三方云账号。",
        ],
      },
      {
        heading: "工具白名单与命令护栏",
        paragraphs: [
          "Agent 不拼自由 Shell。命令由工具显式构造，进入执行前先经过护栏分类：deny、privileged、ok。删根、格式化、写设备、关机这类灾难性命令直接拒绝；sudo、rm -rf、改系统服务等高危操作必须由用户在前端确认。",
          "工具集覆盖执行命令、读取状态、文件读写、包检查、安装预检、deb/rpm 重打包与回滚。重打包是容器感知的：本机有 dpkg-deb/rpmrebuild 就本机改，没有就自动起 disposable 容器，两者都没有时给出明确中文指引，绝不静默失败。",
        ],
        list: [
          "system_run_cmd：执行命令，带 deny / privileged 分级",
          "system_status：只读系统状态",
          "files_read / files_write：文件读写，关键路径需确认",
          "pkg_inspect / pkg_install_test：查看与预检安装包",
          "pkg_repack_deb / pkg_repack_rpm：基于现有包重打包",
          "pkg_rollback：回滚或重装，L3 确认",
          "所有动作写入 state/audit.log",
        ],
      },
      {
        heading: "部署与体验",
        paragraphs: [
          "想长期用就 sudo ./install.sh，脚本会处理依赖、注册开机自启；有 Docker 就 docker compose up -d --build；只想试五分钟，python3 server.py 即可，未配 Key 会自动进入演示模式。",
          "登录密码首次随机生成并打印到日志。LLM 支持 DeepSeek、OpenAI、Ollama 和自定义 OpenAI 兼容端点，回复是真流式；状态页每 5 秒刷新负载、内存、磁盘、端口、服务与工具链。",
        ],
        quote: "能力可以很大，但执行必须在护栏里。",
      },
    ],
  },
  {
    slug: "ai-interview-question-bank",
    title: "AI 面试宝典：把 18,095 道面经做成可刷的系统",
    excerpt:
      "收藏夹里的面经往往再也不会打开。这个项目把真实 Java 后端面试题整理成 19 个分类，支持随机抽题、键盘快捷键和掌握进度追踪。",
    date: "2026-08-21",
    tags: ["Java", "面试", "React", "GitHub Pages"],
    readingTime: 6,
    project: "ai-interview",
    content: [
      {
        heading: "从面经到题库",
        paragraphs: [
          "题库来自真实面试记录，覆盖 Spring、MySQL、多线程与并发、项目与场景、Java 基础、集合框架、SpringCloud、JVM、消息队列、Elasticsearch、Redis、设计模式、分布式等 19 个分类，共 18,095 道题。",
          "列表模式负责分类浏览、关键词搜索、难度筛选和展开答案；刷题模式随机抽 50 道，用左右方向键切题、空格看答案、Enter 标记掌握。",
        ],
        list: [
          "收藏与已掌握状态写入 localStorage，刷新不丢",
          "手机端提供底部导航、分类抽屉和左右滑动切题",
          "暗色主题与博客使用同一套 oklch 色系",
          "题库是 public/data.json，新增题目只需按格式追加",
        ],
      },
      {
        heading: "一个纯静态的刷题应用",
        paragraphs: [
          "技术栈是 React 19 + TypeScript + Vite 7 + Tailwind CSS v4，动画交给 Framer Motion，图标用 Lucide。构建产物直接交给 GitHub Actions 发布到 Pages，没有后端和数据库。",
          "这类项目的关键不在技术复杂度，而在内容组织：分类、难度、答案结构统一之后，刷题体验才立得住。",
        ],
        quote: "把面经从收藏夹里救出来。",
      },
    ],
  },
  {
    slug: "jobscope-fact-checking-pipeline",
    title: "JobScope：只陈述事实，不下结论的求职核对工具",
    excerpt:
      "投递之前，把目标公司公开可见的信息核对一遍。每条结论都绑定来源 URL、原文摘录与快照哈希，查不到就写「未检索到」，不脑补成零风险。",
    date: "2026-08-04",
    tags: ["FastAPI", "Vue", "防编造", "求职"],
    readingTime: 7,
    project: "jobscope",
    content: [
      {
        heading: "求职功课也能工程化",
        paragraphs: [
          "JobScope 是一个本地运行的求职信息核对工具：输入公司名，聚合涉诉、被执行、经营异常、网络提及等公开来源，产出一份带可信度分级与来源凭据的报告，供个人决策参考。",
          "它同时是一个防编造数据管线的工程样例：在 Agent 场景下，如何用 schema 强制、原文绑定和可信度分级，让每条结论都发得出出处。",
        ],
      },
      {
        heading: "让「无出处」在结构上无法存在",
        paragraphs: [
          "核心机制落在 Pydantic schema 里：Finding 强制携带 source_url、source_domain、raw_excerpt、snapshot_hash、fetched_at 与 confidence，缺证据的结论在序列化阶段就被拒收，而不是靠提示词自觉。",
          "可信度分为三级：官方结构化数据、搜索索引代理、社区提及。社区层风险封顶「中风险」，永不驱动高风险判定；查不到时明确写「未检索到」，绝不脑补成「零差评 / 零风险」。",
        ],
        list: [
          "官方维度：工商司法、劳动争议、监察处罚",
          "搜索维度：公开索引与公众号文章，低可信标注",
          "报告与 API Key 只存本机 SQLite，不上传、不公开",
          "不抓取招聘平台后台行为数据，不存储 UGC 正文",
        ],
        quote: "未检索到 ≠ 无风险。",
      },
    ],
  },
  {
    slug: "cbss-cognitive-boundary-scanning",
    title: "CBSS：先撒网，再收网——给自己的认知画一张边界图",
    excerpt:
      "从 12 个知识门类出发，每个门类先问一道题定位你的知识所在，再让 LLM 动态展开熟悉的分支、标记盲区，最后生成一棵只属于你的知识树。",
    date: "2026-07-25",
    tags: ["知识图谱", "LLM", "认知测评", "Java"],
    readingTime: 8,
    project: "CBSS",
    content: [
      {
        heading: "Discover：从全人类知识开始",
        paragraphs: [
          "CBSS 的默认扫描模式不是让你选一个领域做卷子，而是从 world.yaml 里的 12 个宽泛知识门类出发——数学、物理、计算机、语言、艺术、哲学等，每个门类先问一个快速问题，定位你的知识分布。",
          "你熟悉的地方，LLM 会动态展开子节点继续追问；你不熟悉的地方被标记为盲区并停止深挖。最终每个用户得到一棵不同的知识树，不需要为「编程」「音乐」这类具体领域预先写 YAML。",
        ],
        list: [
          "STABLE：w > 0.8 且 a > 0.8，掌握稳固",
          "FRONTIER：0.4 ≤ w ≤ 0.8，正在生长",
          "BLIND：w < 0.4，盲区",
          "IMPLICIT：w > 0.8 但 a ≤ 0.8，会做但说不清",
        ],
      },
      {
        heading: "答错之后，往下找根因",
        paragraphs: [
          "知识是树而不是平铺列表。每个节点声明 requires 前置依赖，答错时系统沿着依赖向下追踪，找到真正的根因节点；如果缺失的节点不在树里，还可以让 LLM 动态补上。",
          "用户知识按四个层级缓存：无关、核心、中间、盲区，以 JSON 形式持久化，重测时不必从零开始。",
        ],
        quote: "Cast a wide net, then narrow your boundaries.",
      },
      {
        heading: "实现",
        paragraphs: [
          "后端是 Spring Boot 3.2.5 + Java 17，前端 Vue 3 + TypeScript + Pinia + Element Plus，图表用 ECharts，LLM 默认接 DeepSeek。仓库里有 69 个不依赖 LLM 的单元测试，覆盖核心引擎、根因追踪与领域模型。",
        ],
      },
    ],
  },
  {
    slug: "molock-chinese-semantic-constraint",
    title: "MoLock：用「经说双链」给中文大模型装上语义刹车",
    excerpt:
      "为什么大模型一用中文推理就跑偏？MoLock 提出的语义约束架构，把推理过程约束在中文语义的「经说」双链之中，从根源上缓解幻觉。",
    date: "2026-07-31",
    tags: ["LLM", "中文NLP", "推理架构", "反幻觉"],
    readingTime: 9,
    featured: true,
    project: "MoLock",
    content: [
      {
        heading: "问题：中文推理的漂移",
        paragraphs: [
          "大模型在英文推理上表现良好，但一旦切到中文，推理轨迹常常出现「漂移」——概念被同音词带偏、一词多义导致逻辑断裂、引用知识时张冠李戴。这不是语料量的问题，而是推理时的语义锚点不足。",
          "MoLock 借鉴墨家「经说」体例——经（命题）与说（解释）相互印证、双链互锁——构建了一套面向中文的语义约束推理层。模型每一步推理都必须同时绑定「经」（语义命题）与「说」（概念解释），两条链互相校验，跑偏时自动纠回。",
        ],
        list: [
          "经链：把推理目标拆解为不可再分的中文语义命题",
          "说链：为每个命题绑定明确的概念边界与语境解释",
          "双链互锁：每一步推理输出必须通过两条链的一致性校验",
          "纠偏机制：检测到漂移时回退到最近的合法语义节点",
        ],
        quote:
          "让 AI 用中文推理，就像让它在语义的高速公路上行驶——MoLock 提供的不只是护栏，还有导航。",
        code: {
          lang: "python",
          text: "# MoLock 核心：双链互锁校验\nclass MoLock:\n    def reason(self, prompt: str):\n        jing = self.parse_propositions(prompt)   # 经链：语义命题\n        shuo = self.bind_concepts(jing)          # 说链：概念解释\n        return self.constrained_generate(jing, shuo)",
        },
      },
      {
        heading: "双链互锁如何工作",
        paragraphs: [
          "传统方法靠 prompt 约束模型行为，本质是「劝说」；MoLock 在生成侧加了一层结构化的语义约束网络，本质是「锁死」。模型只能在经说双链共同允许的语义空间内展开推理，任何超出边界的输出都会被检测并修正。",
          "实测中，MoLock 在中文推理基准上的概念漂移率显著下降，尤其在与「同音异义」「一词多义」相关的任务上效果最明显——这正是中文特有的推理陷阱。",
        ],
      },
      {
        heading: "后续规划",
        paragraphs: [
          "目前 MoLock 处于早期阶段，接下来计划引入可配置的约束强度、与主流推理框架的适配层，以及面向 Agent 场景的语义安全网。",
        ],
      },
    ],
  },
  {
    slug: "antnest-queen-worker-architecture",
    title: "AntNest：蚁后只思考，工蚁只执行——进程隔离的 Agent 架构",
    excerpt:
      "把 Agent 拆成「思考」与「执行」两个角色：蚁后负责规划和决策，工蚁在隔离目录里执行命令，干完活立刻销毁。这可能是最优雅的 Agent 安全模型。",
    date: "2026-06-17",
    tags: ["AI Agent", "多智能体", "进程隔离", "安全"],
    readingTime: 8,
    featured: true,
    project: "AntNest",
    content: [
      {
        heading: "为什么需要蚁后 / 工蚁架构",
        paragraphs: [
          "主流 Agent 把思考与执行耦合在同一个进程里：模型既能规划，又能直接操作文件、运行命令。这带来了巨大的安全隐患——一次失控的输出，可能直接破坏宿主环境。",
          "AntNest 借鉴蚁群社会结构：蚁后（本体）只负责思考、规划、决策，从不亲自执行任何命令；需要干活时，生成一只工蚁——把自身代码复制一份，派到隔离的临时目录里执行。工蚁干完活交回结果，然后被立即销毁。",
        ],
        quote:
          "蚁后从不弄脏自己的手。杀功臣我有的是手段——其实是删掉了。",
        list: [
          "职责分离：思考与执行彻底解耦，蚁后永不碰文件系统",
          "进程隔离：工蚁在独立临时目录运行，权限严格受限",
          "生命周期管理：任务完成后工蚁立即销毁，不留残余进程",
          "失败隔离：单只工蚁崩溃不影响蚁后与其它工蚁",
        ],
      },
      {
        heading: "隔离带来的安全性",
        paragraphs: [
          "在 AntNest 中，工蚁的每一次操作都发生在隔离沙箱里：它看不到宿主的关键路径，写不了系统级配置，即使被恶意 prompt 劫持，破坏范围也被锁定在临时目录内。任务结束，临时目录连同工蚁一起清理，不留下任何攻击面。",
          "这种「复制-执行-销毁」的模式把 Agent 的风险从「必然信任」变成了「默认不信任」——安全不再是事后补救，而是架构的天然属性。",
        ],
      },
      {
        heading: "与 BeeHive 的关系",
        paragraphs: [
          "AntNest 解决的是单个 Agent 的内部安全；BeeHive 则把视角拉高到多智能体协作层——像蜂群一样协作，像守卫一样警惕，像蜂后一样智慧。两个项目一内一外，构成了完整的 Agent 安全体系。",
        ],
      },
    ],
  },
  {
    slug: "beehive-multi-agent-collaboration",
    title: "BeeHive：像蜂群一样协作，像守卫一样警惕",
    excerpt:
      "多智能体系统最大的风险不是能力不足，而是责任失控。BeeHive 用「能力越大，责任越大」的协作规范，为 Autonomous Agent 建立可审计的协作边界。",
    date: "2026-06-21",
    tags: ["多智能体", "协作规范", "Autonomous Agent"],
    readingTime: 7,
    featured: true,
    project: "BeeHive",
    content: [
      {
        heading: "协作的前提是边界",
        paragraphs: [
          "单 Agent 的问题已经很难，多 Agent 协作则把问题复杂度平方化：谁负责决策？谁负责执行？出错时谁背锅？BeeHive 给出的答案是——每个 Agent 的能力必须与其责任严格绑定。",
          "「能力越大，责任越大」不只是蜘蛛侠的台词，而是 BeeHive 的第一原则：任何 Agent 获得一项新能力的同时，必须声明对应的责任边界与审计日志，否则该能力不予启用。",
        ],
        list: [
          "角色声明：每个 Agent 明确自己的职责域与禁止域",
          "能力-责任绑定：获取能力必须同步声明责任边界",
          "全程审计：所有协作行为留痕，可追溯、可回放",
          "蜂后仲裁：冲突由蜂后级 Agent 按规范裁决",
        ],
        quote:
          "像蜂群一样协作，像守卫一样警惕，像蜂后一样智慧。",
      },
      {
        heading: "从规范到实现",
        paragraphs: [
          "BeeHive 不只是理念文档，它把协作规范落到可执行的配置：Agent 的注册、能力声明、责任审计都在系统层面强制执行。任何越界行为都会触发告警与回滚。",
          "这套规范同样适用于人类团队协作——边界清晰、责任明确、过程可审计，是任何高效系统的共同底层。",
        ],
      },
    ],
  },
  {
    slug: "tj-whitebox-reasoning-engine",
    title: "TJ：白盒推理引擎与 CKG 知识图谱",
    excerpt:
      "黑盒模型输出结果，白盒引擎解释过程。TJ 把推理链条完整摊开在 CKG 知识图谱上，让每一步思考都看得见、查得清、改得动。",
    date: "2026-07-20",
    tags: ["推理引擎", "知识图谱", "白盒", "CKG"],
    readingTime: 6,
    project: "TJ",
    content: [
      {
        heading: "推理不该是黑盒",
        paragraphs: [
          "大模型的推理过程像一块黑箱：输入 prompt，输出结果，中间发生了什么没人知道。当推理被用于医疗、金融、法律等高风险场景时，「不可解释」本身就是风险。",
          "TJ 是一个带自有 CKG（Chinese Knowledge Graph，中文知识图谱）的白盒推理引擎：每一次推理都会在知识图谱上留下完整的路径，用户可以看到模型「经过了哪些知识节点、为什么选这条路」。",
        ],
        list: [
          "CKG 知识图谱：自建的中文领域知识节点网络",
          "路径可追溯：每次推理输出完整的图谱路径",
          "节点可干预：人工修正知识节点即可修正推理结果",
          "测试迭代中：当前处于持续测试与优化阶段",
        ],
        quote: "黑盒给你答案，白盒给你证据。",
      },
      {
        heading: "知识图谱驱动的推理",
        paragraphs: [
          "与传统 RAG 不同，TJ 不只是「检索-拼接」，而是真正在知识图谱上执行路径搜索：推理即图遍历，每一步都对应图谱中的一跳。这让推理过程天然可解释，也让知识更新变得简单——改一个节点，所有相关推理自动更新。",
        ],
      },
    ],
  },
  {
    slug: "dpb-ws-agent-specification",
    title: "DPB-WS：一份写给 Agent 的「问题处理规范」",
    excerpt:
      "Agent 的质量取决于它处理问题的流程是否规范。DPB-WS 把优秀工程师的问题解决方法论，编译成 Agent 可执行的标准化处理流程。",
    date: "2026-07-16",
    tags: ["Agent", "规范", "流程设计", "方法论"],
    readingTime: 5,
    project: "DPB-WS",
    content: [
      {
        heading: "Agent 也需要「套路」",
        paragraphs: [
          "人类工程师面对复杂问题时，会经历定义问题、拆解、调研、假设、验证、复盘的标准流程。但多数 Agent 只会「单刀直入」——直接给出答案，跳过问题定义和假设验证。",
          "DPB-WS 是一套面向 Agent 的问题处理规范（Workflow Specification）：它把工程师的问题解决方法论结构化，让 Agent 按规范流程处理问题，而不是凭感觉发挥。",
        ],
        list: [
          "问题定义：先确认要解决的真问题，而非表面症状",
          "方案拆解：把大问题拆成可独立验证的小步骤",
          "证据驱动：每个结论必须有可追溯的证据链",
          "复盘机制：处理完成后沉淀经验，形成持续改进",
        ],
        quote: "流程不是束缚，是给 Agent 的工程素养。",
      },
      {
        heading: "规范的价值",
        paragraphs: [
          "规范化的处理流程让 Agent 的输出从「不可复现的灵光一现」变成「可复现的工程成果」：同样的输入，无论跑多少次，都能得到一致的、可审计的处理过程。这正是企业级 Agent 落地的关键前提。",
        ],
      },
    ],
  },
  {
    slug: "auralis-binaural-calibration",
    title: "Auralis：双耳听觉校准实验室",
    excerpt:
      "声音的精确感知需要校准。Auralis 是一个双耳听觉校准工具，用 Web Audio API 在浏览器里构建高精度的声学测量与校准环境。",
    date: "2026-07-20",
    tags: ["Web Audio", "声学", "工具", "JavaScript"],
    readingTime: 4,
    project: "Auralis",
    content: [
      {
        heading: "从耳朵到代码",
        paragraphs: [
          "人的双耳对声音的感知存在细微偏差——左右耳灵敏度不同、环境声学特性不同，都会影响听觉体验。Auralis 的目标是在浏览器里实现一套双耳听觉校准流程。",
          "项目基于 Web Audio API 构建，支持声学参数的测量、校准与可视化，为音频应用开发提供一个可用的校准基础。",
        ],
        quote: "听觉是主观的，但校准是客观的。",
      },
      {
        heading: "技术实现",
        paragraphs: [
          "通过 Web Audio API 的 AnalyserNode 与 AudioContext 构建信号链，采集双耳响应数据并进行校准补偿。整个项目运行在浏览器中，无需安装任何原生依赖。",
        ],
      },
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function getFeaturedPosts(): Post[] {
  return POSTS.filter((p) => p.featured).sort((a, b) =>
    b.date.localeCompare(a.date)
  )
}
