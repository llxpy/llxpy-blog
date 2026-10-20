# llxpy · 暗面笔记

> 在暗面里构建的每一行，都值得被记录。

基于 GitHub 数据的开发者个人博客：项目作品集 + 技术文章 + 学习路线 + 个人理念，月之暗面式暗色设计。

## ✨ 特性

- 🌌 **月之暗面式暗色设计** — 极光渐变光效、玻璃拟态、噪点网格
- 🎨 **shadcn/ui 组件体系** — Radix UI + Tailwind CSS v4，可维护、可扩展
- 📊 **GitHub 数据实时集成** — 仓库、Star、头像自动同步，30 分钟缓存 + 静态兜底
- ✨ **微交互特效** — Canvas 浮动粒子、双层自定义光标、3D 倾斜卡片、数字滚动、逐字标题
- 📱 **跨端适配** — 移动端自动降级（粒子减量、禁用悬停特效），`prefers-reduced-motion` 支持
- 📝 **内置技术文章** — MoLock 双链推理、AntNest 蚁后工蚁、BeeHive 蜂群协作等
- 🗺️ **学习路线与知识库** — 五阶段 AI 全栈成长路径、项目实战清单、打卡与多用户档案

## 🧩 开源项目

| 项目 | 简介 | 技术 |
|---|---|---|
| [plankernel](https://github.com/llxpy/plankernel) | 盘枢 Panhub KBEngine：纯本地、可离线、可审计的 Windows 目录级 RAG 中台，FTS5 双路检索 + Merkle 完整性链 + MCP 接入 | Python · SQLite |
| [AntNest](https://github.com/llxpy/AntNest) | 蚁后 / 工蚁架构的 AI 编程助手：蚁后只思考，工蚁在隔离目录执行后立即销毁 | Python |
| [codeposter](https://github.com/llxpy/codeposter) | 把代码片段渲染成 macOS 风格分享图，40+ 语言高亮、一键导出高清 PNG，纯前端零上传 | JavaScript |
| [microservice-manager](https://github.com/llxpy/microservice-manager) | 单文件零依赖的 Windows 微服务管理面板，常驻内存约 50MB，自动发现与崩溃守护 | Go · Vue3 |
| [AgentBook](https://github.com/llxpy/AgentBook) | 用自然语言控制 Linux 的运维 Agent：9 类白名单工具、命令护栏、真流式对话 | Python |
| [ai-interview](https://github.com/llxpy/ai-interview) | AI 面试宝典：18,095 道 Java 后端面试题，支持随机刷题与进度追踪 | React · TypeScript |
| [MoLock](https://github.com/llxpy/MoLock) | 墨家「经说双链」中文语义约束推理架构，让 AI 用中文推理不跑偏 | Python |
| [BeeHive](https://github.com/llxpy/BeeHive) | 像蜂群一样协作的多智能体规范：能力必须绑定责任边界与审计日志 | Go |
| [jobscope](https://github.com/llxpy/jobscope) | 求职信息核对：聚合涉诉、被执行、经营异常等公开数据，每条结论附来源 | Python · Vue |
| [TJ](https://github.com/llxpy/TJ) | 带自有 CKG 知识图谱的白盒推理引擎 | Python |
| [CBSS](https://github.com/llxpy/CBSS) | 先广泛探索，再缩小范围，最终汇聚成个人认知图景 | Java |
| [Auralis](https://github.com/llxpy/Auralis) | 基于 Web Audio API 的双耳听觉校准室 | JavaScript |

更多项目与实时 Star 数见站点 [`/projects`](https://llxpy.github.io/llxpy-blog/projects) 页面。

## 🛠 技术栈

| 层 | 选型 |
|---|---|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 7 |
| 样式 | Tailwind CSS v4（@tailwindcss/vite） |
| 组件 | shadcn/ui 风格（Radix UI + CVA） |
| 动画 | Framer Motion |
| 路由 | React Router 7 |
| 数据 | GitHub REST API + localStorage 缓存 |

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 本地开发（http://localhost:5173）
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

## 📁 项目结构

```
src/
├── components/
│   ├── ui/          # shadcn/ui 风格基础组件（Button/Card/Badge/...）
│   ├── effects/     # 特效组件（粒子/光标/倾斜卡片/数字滚动/逐字标题）
│   └── learn/       # 学习页（路线图/知识库/项目实战/打卡/档案切换）
├── pages/           # 页面（首页/项目/文章/笔记/学习/关于/404）
├── data/            # 文章、笔记与学习路线数据
├── lib/             # GitHub API 与工具函数
├── hooks/           # 学习进度本地存储
└── context/         # 全局 GitHub 数据上下文
```

## ☁️ 部署

静态站点，任意静态托管均可：

- **Vercel**（推荐）：导入 GitHub 仓库自动识别 Vite，SPA 路由自动回退
- **Netlify / Cloudflare Pages**：构建命令 `npm run build`，输出目录 `dist`，需配置 SPA fallback
- **阿里云 OSS**：上传 `dist/`，开启静态网站托管，404 页设为 `index.html`

## 📄 License

MIT
