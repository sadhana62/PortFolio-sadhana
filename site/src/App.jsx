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
      lerp: 0.08,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      smoothWheel: true,
      anchors: { offset: -72, duration: 1.6 },
    })
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf) })
    return () => { cancelAnimationFrame(id); lenis.destroy() }
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
