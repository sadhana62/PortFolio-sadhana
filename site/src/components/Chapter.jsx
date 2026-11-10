import { useEffect, useRef } from 'react'

/*
  Page-turning chapters.

  Each section is wrapped in a <Chapter>. On a large enough screen, if the section fits on one screen,
  the chapter becomes "pinned": its page sticks in place while you scroll, the panels arrive one by one
  and at the end the page tilts and shades as if it's being turned. Only the moving panels, the page and a
  shade layer get inline transform/opacity each frame, so the browser never restyles the whole chapter. Sections that are too tall, small screens and reduced motion all fall
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
        const page = ch.firstElementChild
        const panels = [...page.querySelectorAll('.reveal')]
        ch.classList.remove('pinned')
        ch.style.removeProperty('--len')
        page.style.transform = ''
        panels.forEach((el) => { el.style.opacity = ''; el.style.transform = '' })
        const fits = page.scrollHeight <= vh - 64 - 24
        if (!canPin || !fits || panels.length === 0) return
        let shade = page.querySelector(':scope > .turn-shade')
        if (!shade) { shade = document.createElement('div'); shade.className = 'turn-shade'; page.appendChild(shade) }
        const len = vh + panels.length * SCROLL_PER_PANEL * vh + HOLD * vh
        ch.style.setProperty('--len', `${Math.round(len)}px`)
        ch.classList.add('pinned')
        pinned.push({ ch, page, panels, shade, last: -1 })
      })
      update()
    }

    const update = () => {
      frame.current = 0
      const vh = window.innerHeight
      for (const item of pinned) {
        const { ch, page, panels, shade } = item
        const r = ch.getBoundingClientRect()
        if (r.bottom < -vh || r.top > vh * 2) continue
        const total = ch.offsetHeight - (vh - 64)
        const p = Math.min(1, Math.max(0, (64 - r.top) / total))
        const holdStart = 1 - (HOLD * vh) / total
        // the page starts turning halfway through the hold
        const hold = Math.min(1, Math.max(0, (p - holdStart) / (1 - holdStart)))
        const out = Math.min(1, Math.max(0, (hold - 0.4) / 0.6))
        if (Math.abs(p - item.last) < 0.0005) continue
        item.last = p
        const pp = p / holdStart
        const n = panels.length
        panels.forEach((el, i) => {
          const a = Math.min(1, Math.max(0, (pp * (n + 1.6) - i) * 1.4))
          el.style.opacity = a.toFixed(3)
          el.style.transform = a >= 1 ? 'none' : `translate3d(0, ${((1 - a) * 46).toFixed(1)}px, 0) rotate(${((1 - a) * -1.4).toFixed(2)}deg)`
        })
        page.style.transform = out > 0 ? `perspective(1600px) rotateY(${(out * 10).toFixed(2)}deg) scale(${(1 - out * 0.04).toFixed(4)})` : ''
        shade.style.opacity = out.toFixed(3)
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
      document.querySelectorAll('.turn-shade').forEach((el) => el.remove())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
