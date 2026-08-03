import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  // Vercel 部署在根路径；GitHub Pages 项目页在 /llxpy-blog/ 子路径
  base: process.env.VERCEL ? "/" : "/llxpy-blog/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
