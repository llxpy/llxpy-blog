import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { GitHubProvider } from "@/context/github-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const HomePage = lazy(() =>
  import("@/pages/home").then((m) => ({ default: m.HomePage }))
)
const ProjectsPage = lazy(() =>
  import("@/pages/projects").then((m) => ({ default: m.ProjectsPage }))
)
const BlogPage = lazy(() =>
  import("@/pages/blog").then((m) => ({ default: m.BlogPage }))
)
const PostPage = lazy(() =>
  import("@/pages/post").then((m) => ({ default: m.PostPage }))
)
const NotesPage = lazy(() =>
  import("@/pages/notes").then((m) => ({ default: m.NotesPage }))
)
const NotePage = lazy(() =>
  import("@/pages/note").then((m) => ({ default: m.NotePage }))
)
const AboutPage = lazy(() =>
  import("@/pages/about").then((m) => ({ default: m.AboutPage }))
)
const LearnPage = lazy(() =>
  import("@/pages/learn").then((m) => ({ default: m.LearnPage }))
)
const NotFoundPage = lazy(() =>
  import("@/pages/not-found").then((m) => ({ default: m.NotFoundPage }))
)
const AuroraBackground = lazy(() =>
  import("@/components/aurora-background").then((m) => ({
    default: m.AuroraBackground,
  }))
)
const ScrollProgress = lazy(() =>
  import("@/components/effects/scroll-progress").then((m) => ({
    default: m.ScrollProgress,
  }))
)
const CustomCursor = lazy(() =>
  import("@/components/effects/custom-cursor").then((m) => ({
    default: m.CustomCursor,
  }))
)

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <>
      <Suspense fallback={null}>
        <AuroraBackground />
        <ScrollProgress />
        <CustomCursor />
      </Suspense>
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
          <Suspense fallback={null}>
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
          </Suspense>
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
