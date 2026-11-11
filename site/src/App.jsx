import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { Header } from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Activity from './components/Activity.jsx'
import Chapter, { useChapters } from './components/Chapter.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import { About, Projects, Experience, Skills, Achievements, Contact, Footer } from './components/Sections.jsx'

/* Smooth, gliding page scroll (Lenis). Skipped when the visitor prefers reduced motion. */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      smoothWheel: true,
      anchors: { offset: -72, duration: 1.6 },
    })
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf) })

    // Keyboard scrolling (arrows, Page Up/Down, Space, Home/End) glides the same way as the wheel.
    const onKey = (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
      const t = e.target
      if (t.closest?.('input, textarea, select, [contenteditable], [role="slider"], [role="listbox"], [role="menu"]')) return
      const page = window.innerHeight - 120
      const max = document.documentElement.scrollHeight - window.innerHeight
      const from = lenis.targetScroll
      let to
      switch (e.key) {
        case 'ArrowDown': to = from + 140; break
        case 'ArrowUp': to = from - 140; break
        case 'PageDown': to = from + page; break
        case 'PageUp': to = from - page; break
        case ' ':
          if (t.closest?.('button, a, summary')) return
          to = from + (e.shiftKey ? -page : page); break
        case 'Home': to = 0; break
        case 'End': to = max; break
        default: return
      }
      e.preventDefault()
      const far = e.key === 'Home' || e.key === 'End'
      lenis.scrollTo(Math.max(0, Math.min(max, to)), far ? { duration: 1.4 } : { lerp: 0.1 })
    }
    window.addEventListener('keydown', onKey)
    return () => { cancelAnimationFrame(id); window.removeEventListener('keydown', onKey); lenis.destroy() }
  }, [])
}

/* Which page is open: the home page, or a project's case study (?work=slug). */
function useRoute() {
  const read = () => new URLSearchParams(window.location.search).get('work')
  const [work, setWork] = useState(read)
  useEffect(() => {
    const on = () => setWork(read())
    window.addEventListener('popstate', on)
    return () => window.removeEventListener('popstate', on)
  }, [])
  return work
}

function Home() {
  useChapters()
  useEffect(() => {
    // Coming back from a case study: land on the projects chapter.
    if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView()
  }, [])
  return (
    <main id="main" className="mx-auto max-w-6xl">
      <Hero />
      <Chapter><About /></Chapter>
      <Chapter><Projects /></Chapter>
      <Chapter><Experience /></Chapter>
      <Chapter><Skills /></Chapter>
      <Chapter><Activity /></Chapter>
      <Chapter><Achievements /></Chapter>
      <Chapter><Contact /></Chapter>
    </main>
  )
}

export default function App() {
  useSmoothScroll()
  const work = useRoute()
  return (
    <>
      <a href="#main" className="sr-only-focusable fixed top-3 left-3 z-[60] rounded-full bg-primary px-4 py-2 font-medium text-on-primary">
        Skip to content
      </a>
      <Header route={work} linkPrefix={work ? './' : ''} />
      {work ? <CaseStudy slug={work} /> : <Home />}
      <Footer />
    </>
  )
}
