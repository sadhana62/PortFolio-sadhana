import { useEffect, useRef, useState } from 'react'

/* Renders a content string. **bold** becomes <strong>; a string wrapped in [brackets] is shown as a placeholder. */
export function Text({ children, as: Tag = 'span', className = '' }) {
  if (!children) return null
  const s = String(children)
  if (/^\[.*\]$/.test(s.trim())) {
    return (
      <Tag className={className}>
        <span className="placeholder" title="Placeholder: replace this in src/content.js">{s.trim().slice(1, -1)}</span>
      </Tag>
    )
  }
  const parts = s.split(/(\*\*[^*]+\*\*)/g)
  return (
    <Tag className={className}>
      {parts.map((p, i) =>
        p.startsWith('**') ? <strong key={i} className="font-semibold text-ink">{p.slice(2, -2)}</strong> : p,
      )}
    </Tag>
  )
}

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduce(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return reduce
}

/* Fades its children in once they scroll into view. */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div', style }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'is-in' : ''} ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

/* Manga chapter opener: a narration box above a round lettered title with a highlighter swipe. */
export function SectionHeading({ eyebrow, title, id, action }) {
  return (
    <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
      <div className="min-w-0">
        <p className="mb-4"><span className="caption">{eyebrow}</span></p>
        <h2 id={id} className="text-3xl md:text-5xl"><span className="hl">{title}</span></h2>
      </div>
      {action}
    </Reveal>
  )
}
