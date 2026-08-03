# llxpy · 暗面笔记

> 在暗面里构建的每一行，都值得被记录。

基于 GitHub 数据的开发者个人博客：项目作品集 + 技术文章 + 个人理念，月之暗面式暗色设计。

## ✨ 特性

- 🌌 **月之暗面式暗色设计** — 极光渐变光效、玻璃拟态、噪点网格
- 🎨 **shadcn/ui 组件体系** — Radix UI + Tailwind CSS v4，可维护、可扩展
- 📊 **GitHub 数据实时集成** — 仓库、Star、头像自动同步，30 分钟缓存 + 静态兜底
- ✨ **微交互特效** — Canvas 浮动粒子、双层自定义光标、3D 倾斜卡片、数字滚动、逐字标题
- 📱 **跨端适配** — 移动端自动降级（粒子减量、禁用悬停特效），`prefers-reduced-motion` 支持
- 📝 **内置技术文章** — MoLock 双链推理、AntNest 蚁后工蚁、BeeHive 蜂群协作等

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
│   └── effects/     # 特效组件（粒子/光标/倾斜卡片/数字滚动/逐字标题）
├── pages/           # 页面（首页/项目/文章/文章详情/关于/404）
├── data/            # 博客文章数据
├── lib/             # GitHub API 与工具函数
└── context/         # 全局 GitHub 数据上下文
```

## ☁️ 部署

静态站点，任意静态托管均可：

- **Vercel**（推荐）：导入 GitHub 仓库自动识别 Vite，SPA 路由自动回退
- **Netlify / Cloudflare Pages**：构建命令 `npm run build`，输出目录 `dist`，需配置 SPA fallback
- **阿里云 OSS**：上传 `dist/`，开启静态网站托管，404 页设为 `index.html`

## 📄 License

MIT
