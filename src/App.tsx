import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { GitHubProvider } from "@/context/github-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HomePage } from "@/pages/home"
import { ProjectsPage } from "@/pages/projects"
import { BlogPage } from "@/pages/blog"
import { PostPage } from "@/pages/post"
import { NotesPage } from "@/pages/notes"
import { NotePage } from "@/pages/note"
import { AboutPage } from "@/pages/about"
import { LearnPage } from "@/pages/learn"
import { NotFoundPage } from "@/pages/not-found"

const AuroraBackground = lazy(() =>
  import("@/components/aurora-background").then((m) => ({ default: m.AuroraBackground }))
)
const ParticleField = lazy(() =>
  import("@/components/effects/particle-field").then((m) => ({ default: m.ParticleField }))
)
const ScrollProgress = lazy(() =>
  import("@/components/effects/scroll-progress").then((m) => ({ default: m.ScrollProgress }))
)
const CustomCursor = lazy(() =>
  import("@/components/effects/custom-cursor").then((m) => ({ default: m.CustomCursor }))
)

function AnimatedRoutes() {
  const location = useLocation()
  const isLearn = location.pathname.endsWith("/learn")

  return (
    <>
      {!isLearn && (
        <Suspense fallback={null}>
          <AuroraBackground />
          <ParticleField />
          <ScrollProgress />
          <CustomCursor />
        </Suspense>
      )}
      <Navbar />
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
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/notes/:slug" element={<NotePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <GitHubProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AnimatedRoutes />
      </BrowserRouter>
    </GitHubProvider>
  )
}
