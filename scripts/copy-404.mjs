// GitHub Pages SPA fallback：将 index.html 复制为 404.html
// 访问不存在的路径（如 /projects）时，Pages 会返回 404.html 且保留 URL，
// React Router 据此渲染正确页面
import { copyFileSync, existsSync } from "node:fs"

if (existsSync("dist/index.html")) {
  copyFileSync("dist/index.html", "dist/404.html")
  console.log("✓ dist/404.html created (SPA fallback for GitHub Pages)")
} else {
  console.warn("⚠ dist/index.html not found, skip 404 fallback")
}
