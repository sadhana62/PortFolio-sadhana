import { useEffect, useRef } from 'react'

/*
  Page-turning chapters.

  Each section is wrapped in a <Chapter>. On a large enough screen, if the section fits on one screen,
  the chapter becomes "pinned": its page sticks in place while you scroll, the panels arrive one by one
  (CSS reads --p, the chapter's scroll progress, and each panel's --i), and at the end the page tilts and
  shades as if it's being turned. Sections that are too tall, small screens and reduced motion all fall
  back to normal scrolling with the usual fade-in.
*/
export default function Chapter({ children }) {
  return (
    <div className="chapter">
      <div className="page">{children}</div>
    </div>
  )
}

const SCROLL_PER_PANEL = 0.22 // fraction of the viewport height scrolled per panel
const HOLD = 0.35 // extra viewport heights to hold the finished page, then turn it

export function useChapters(deps = []) {
  const frame = useRef(0)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const chapters = [...document.querySelectorAll('.chapter')]
    let pinned = []

    const layout = () => {
      pinned = []
      const vh = window.innerHeight
      const canPin = !reduce && window.innerWidth >= 1024 && vh >= 680
      chapters.forEach((ch) => {
        ch.classList.remove('pinned')
        ch.style.removeProperty('--len')
        const page = ch.firstElementChild
        const panels = [...page.querySelectorAll('.reveal')]
        const fits = page.scrollHeight <= vh - 64 - 24
        if (!canPin || !fits || panels.length === 0) return
        panels.forEach((el, i) => el.style.setProperty('--i', i))
        ch.style.setProperty('--n', panels.length)
        const len = vh + panels.length * SCROLL_PER_PANEL * vh + HOLD * vh
        ch.style.setProperty('--len', `${Math.round(len)}px`)
        ch.classList.add('pinned')
        pinned.push(ch)
      })
      update()
    }

    const update = () => {
      frame.current = 0
      const vh = window.innerHeight
      for (const ch of pinned) {
        const r = ch.getBoundingClientRect()
        if (r.bottom < -vh || r.top > vh * 2) continue
        const total = ch.offsetHeight - (vh - 64)
        const p = Math.min(1, Math.max(0, (64 - r.top) / total))
        const holdStart = 1 - (HOLD * vh) / total
        // the page starts turning halfway through the hold
        const hold = Math.min(1, Math.max(0, (p - holdStart) / (1 - holdStart)))
        const out = Math.min(1, Math.max(0, (hold - 0.4) / 0.6))
        ch.style.setProperty('--p', (p / holdStart).toFixed(4))
        ch.style.setProperty('--out', out.toFixed(4))
      }
    }

    const onScroll = () => { if (!frame.current) frame.current = requestAnimationFrame(update) }
    let resizeTimer
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(layout, 150) }

    // Wait for fonts so measurements use the real text sizes.
    const ready = document.fonts?.ready ?? Promise.resolve()
    ready.then(layout)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame.current)
      chapters.forEach((ch) => ch.classList.remove('pinned'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
