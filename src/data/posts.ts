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
  return POSTS.filter((p) => p.featured)
}
