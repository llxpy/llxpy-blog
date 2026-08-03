import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { GitHubProvider } from "@/context/github-context"
import { AuroraBackground } from "@/components/aurora-background"
import { CursorGlow } from "@/components/effects/cursor-glow"
import { ScrollProgress } from "@/components/effects/scroll-progress"
import { ParticleField } from "@/components/effects/particle-field"
import { CustomCursor } from "@/components/effects/custom-cursor"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HomePage } from "@/pages/home"
import { ProjectsPage } from "@/pages/projects"
import { BlogPage } from "@/pages/blog"
import { PostPage } from "@/pages/post"
import { AboutPage } from "@/pages/about"
import { NotFoundPage } from "@/pages/not-found"

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<PostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <GitHubProvider>
      <BrowserRouter>
        <AuroraBackground />
        <ParticleField />
        <ScrollProgress />
        <CursorGlow />
        <CustomCursor />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </GitHubProvider>
  )
}
