import { useEffect } from 'react'
import { projects } from '../content.js'
import { Text } from './ui.jsx'
import Icon from './Icons.jsx'

const BASE = import.meta.env.BASE_URL

/* Moves between the home page and a case study without reloading (?work=slug in the address). */
export function goTo(slug) {
  const url = new URL(window.location.href)
  if (slug) url.searchParams.set('work', slug)
  else url.searchParams.delete('work')
  url.hash = slug ? '' : '#projects'
  window.history.pushState({}, '', url)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function Block({ title, children, n }) {
  return (
    <section className="card p-6 md:p-8">
      <p className="label">{String(n).padStart(2, '0')}</p>
      <h2 className="mt-1 text-3xl md:text-4xl"><span className="hl" style={{ backgroundSize: '100% 100%' }}>{title}</span></h2>
      <div className="mt-4 text-xl leading-relaxed text-ink-2">{children}</div>
    </section>
  )
}

export default function CaseStudy({ slug }) {
  const i = projects.findIndex((p) => p.slug === slug)
  const p = projects[i]
  const cs = p?.caseStudy
  const next = projects[(i + 1) % projects.length]

  useEffect(() => {
    window.scrollTo(0, 0)
    if (p) document.title = `${p.name} — case study · Sadhana Shrivastava`
  }, [p])

  if (!p) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-5xl">That page isn't in the sketchbook.</h1>
        <button type="button" onClick={() => goTo(null)} className="btn btn-filled mt-8">Back to the projects</button>
      </main>
    )
  }

  return (
    <main id="main" className="mx-auto max-w-4xl px-5 pt-8 pb-20 md:px-8 md:pt-12">
      <button type="button" onClick={() => goTo(null)} className="btn btn-text text-lg">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        Back to all projects
      </button>

      <header className="card hatch mt-6 p-6 md:p-10">
        <p className="caption">Case study · {p.category}</p>
        <h1 className="mt-5 text-5xl md:text-7xl">{p.name}</h1>
        {p.badge && <p className="mt-4 inline-flex items-center gap-2 font-display text-xl font-bold text-primary"><Icon name="star" className="h-5 w-5" />{p.badge}</p>}
        <Text as="p" className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-2">{p.what}</Text>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {[['My role', cs?.role], ['Timeline', cs?.timeline], ['Team', cs?.team]].map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dt className="label">{k}</dt>
              <dd className="mt-1 text-lg text-ink"><Text>{v}</Text></dd>
            </div>
          ))}
        </dl>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
          {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
        </ul>
      </header>

      {cs && (
        <div className="mt-10 grid gap-8">
          <Block n={1} title="Why it exists"><Text as="p">{cs.why}</Text></Block>
          <Block n={2} title="How I built it">
            <ol className="space-y-3">
              {cs.built.map((b, k) => (
                <li key={k} className="flex gap-3">
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border-[1.8px] border-line font-display text-base font-bold text-ink">{k + 1}</span>
                  <Text>{b}</Text>
                </li>
              ))}
            </ol>
          </Block>
          <Block n={3} title="The hard part"><Text as="p">{cs.hard}</Text></Block>
          <Block n={4} title="What happened"><Text as="p">{cs.outcome}</Text></Block>
          <Block n={5} title="What I learned"><Text as="p">{cs.learned}</Text></Block>
          <Block n={6} title="Screenshots">
            {cs.screenshots?.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {cs.screenshots.map((sh) => (
                  <img key={sh.src} src={`${BASE}${sh.src}`} alt={sh.alt} loading="lazy" className="w-full border-[1.8px] border-line" />
                ))}
              </div>
            ) : (
              <p><span className="placeholder">Add two or three screenshots or a short screen recording in src/content.js</span></p>
            )}
          </Block>
        </div>
      )}

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          {p.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-outlined">{l.label} <Icon name="arrow" className="h-4 w-4" /></a>
          ))}
        </div>
        <button type="button" onClick={() => goTo(next.slug)} className="btn btn-filled">
          Next story: {next.name}
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
    </main>
  )
}
