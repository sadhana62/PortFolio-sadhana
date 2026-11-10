import { useEffect, useState } from 'react'
import { nav, hero } from '../content.js'
import Icon from './Icons.jsx'

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])
  const toggle = () => setDark((d) => {
    try { localStorage.setItem('theme', d ? 'light' : 'dark') } catch { /* storage blocked */ }
    return !d
  })
  return [dark, toggle]
}

export function useActiveSection(deps = []) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    nav.forEach((n) => { const el = document.querySelector(n.href); if (el) io.observe(el) })
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return active
}

export function Header({ active, linkPrefix = '' }) {
  const [dark, toggle] = useTheme()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b-2 border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-5 md:px-8">
        <a href={`${linkPrefix}#top`} className="mr-auto font-display text-3xl font-bold text-ink">
          {hero.name}<span className="text-primary">.</span>
        </a>
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => {
              const on = active === n.href
              return (
                <li key={n.href}>
                  <a href={`${linkPrefix}${n.href}`} aria-current={on ? 'true' : undefined}
                    className={`relative px-3 py-2 font-display text-lg font-bold transition-colors ${on ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}>
                    {n.label}
                    <span className={`absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-primary transition-transform duration-300 ${on ? 'scale-x-100' : 'scale-x-0'}`} aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <button type="button" onClick={toggle} className="icon-btn" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
          <Icon name={dark ? 'sun' : 'moon'} className="h-5 w-5" />
        </button>
        <a href={`${linkPrefix}#contact`} className="btn btn-filled ml-1 hidden sm:inline-flex">Say hello</a>
        <button type="button" className="icon-btn lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open}
          aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t-2 border-line bg-bg lg:hidden">
          <ul className="mx-auto grid max-w-6xl gap-1 px-5 py-3">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={`${linkPrefix}${n.href}`} onClick={() => setOpen(false)} aria-current={active === n.href ? 'true' : undefined}
                  className={`block px-4 py-3 font-display text-lg ${active === n.href ? 'bg-primary-c text-on-primary-c' : 'text-ink hover:bg-c'}`}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
