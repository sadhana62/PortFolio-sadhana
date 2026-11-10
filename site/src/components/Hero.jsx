import { useEffect, useRef } from 'react'
import { hero, contact } from '../content.js'
import { Text } from './ui.jsx'
import Icon from './Icons.jsx'

const BASE = import.meta.env.BASE_URL

const socials = [
  { label: 'GitHub', href: 'https://github.com/sadhana62', path: 'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/sadhana-shrivastava-profile/', path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.06c.53-1 1.83-2.06 3.76-2.06 4.02 0 4.76 2.64 4.76 6.08v6.48h-4v-5.75c0-1.37-.03-3.13-1.9-3.13-1.91 0-2.2 1.49-2.2 3.03v5.85h-4z' },
]

/* Splits a word into letters that drop in one after another. */
function Letters({ text, start = 0 }) {
  return (
    <span aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className="letter" style={{ '--d': `${start + i * 40}ms` }}>{ch === ' ' ? ' ' : ch}</span>
      ))}
    </span>
  )
}

/* Gentle parallax while the cover is on screen. Transforms only, once per frame. */
function useParallax(refs) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let ticking = false
    const update = () => {
      ticking = false
      const y = Math.min(window.scrollY, 1200)
      if (refs.photo.current) refs.photo.current.style.transform = `translate3d(0, ${y * 0.07}px, 0) rotate(2deg)`
      if (refs.title.current) refs.title.current.style.transform = `translate3d(0, ${y * -0.05}px, 0)`
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [refs])
}

/*
  The cover of the sketchbook: your name lettered by hand with a pink pencil underline drawing itself,
  your pencil portrait taped in at an angle, a speech bubble, the opening line, and a nudge to turn the page.
*/
export default function Hero() {
  const [first, ...rest] = hero.fullName.split(' ')
  const refs = useRef({ photo: { current: null }, title: { current: null } }).current
  useParallax(refs)

  return (
    <section id="top" aria-labelledby="hero-title" className="px-5 pt-8 pb-6 md:px-8 md:pt-12">
      <div className="card pop hatch overflow-visible px-6 py-10 sm:px-10 md:px-14 md:py-14" style={{ '--d': '0ms' }}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <div className="min-w-0">
            {hero.location && <p className="caption mb-6">{hero.location}</p>}

            <h1 ref={refs.title} id="hero-title" className="relative text-6xl leading-[.95] will-change-transform sm:text-7xl lg:text-8xl">
              <span className="sr-only">{hero.fullName}</span>
              <Letters text={first} start={200} />
              <br />
              <span className="text-primary"><Letters text={rest.join(' ')} start={200 + first.length * 40} /></span>
              <svg className="draw absolute -bottom-3 left-0 h-5 w-[80%] max-w-md text-primary" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true" style={{ '--d': '900ms' }}>
                <path pathLength="1" d="M4 12 C 70 4, 140 16, 210 9 S 330 4, 396 11" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path pathLength="1" d="M30 16 C 110 9, 200 18, 300 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5" />
              </svg>
            </h1>

            <p className="mt-9 font-display text-2xl font-bold text-ink-2 md:text-3xl">{hero.role}</p>
            <Text as="p" className="mt-4 max-w-xl text-xl leading-relaxed text-ink-2">{hero.intro}</Text>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#about" className="btn btn-filled">Start reading</a>
              <a href="#contact" className="btn btn-outlined">Say hello</a>
              {hero.resumeUrl && <a href={`${BASE}${hero.resumeUrl}`} className="btn btn-tonal" download>Résumé</a>}
              <span className="flex gap-2 sm:ml-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="icon-btn">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
                  </a>
                ))}
                <a href={`mailto:${contact.email}`} aria-label={`Email ${contact.email}`} className="icon-btn">
                  <Icon name="contact" className="h-5 w-5" />
                </a>
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[19rem]">
            <div className="bubble pop-bubble absolute -top-6 -left-6 z-10 px-4 py-2 font-display text-xl font-bold sm:-left-14" style={{ '--tail-x': '70%', '--d': '1000ms' }}>
              Hello! Nice to meet you!
            </div>
            <figure ref={refs.photo} className="relative rotate-[2deg] bg-surface p-3 pb-10 will-change-transform" style={{ boxShadow: '6px 8px 0 var(--pencil-shadow)' }}>
              <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 bg-primary-c/80" aria-hidden="true" />
              <picture className="block border-[1.8px] border-line">
                <source srcSet={`${BASE}${hero.photo}`} type="image/webp" />
                <img src={`${BASE}${hero.photoFallback}`} alt={hero.photoAlt} width="720" height="809" fetchpriority="high"
                  className="aspect-[4/4.7] w-full object-cover object-top" />
              </picture>
              <figcaption className="absolute right-0 bottom-2 left-0 text-center font-display text-xl font-bold text-ink-2">that's me ✎</figcaption>
            </figure>
          </div>
        </div>

        <a href="#about" className="nudge mt-10 flex w-fit items-center gap-2 font-display text-xl font-bold text-ink-2 hover:text-primary lg:mx-auto">
          turn the page
          <svg viewBox="0 0 40 24" className="h-6 w-10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6c8 10 20 12 33 6" /><path d="M29 6l7 6-8 4" />
          </svg>
        </a>
      </div>
    </section>
  )
}
