import { useState } from 'react'
import { about, projects, moreWork, experience, skills, achievements, contact, footer, hero } from '../content.js'
import { Text, Reveal, SectionHeading } from './ui.jsx'
import Icon from './Icons.jsx'
import { goTo } from './CaseStudy.jsx'

const wrap = 'px-5 py-12 md:px-8 md:py-16'

/* Rotating accent colours for cards and badges: rose, plum, apricot, sage. */
const TONES = [
  { bg: 'var(--rose-c)', fg: 'var(--rose)' },
  { bg: 'var(--plum-c)', fg: 'var(--plum)' },
  { bg: 'var(--apricot-c)', fg: 'var(--apricot)' },
  { bg: 'var(--sage-c)', fg: 'var(--sage)' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className={wrap}>
      <SectionHeading id="about-title" eyebrow="Chapter 1 · About me" title={about.title} icon={<Icon name="about" className="h-4 w-4" />} />
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="card min-w-0 space-y-4 p-6 text-lg leading-relaxed text-ink-2 md:p-8">
          {about.paragraphs.map((p, i) => <Text key={i} as="p">{p}</Text>)}
          {about.personalNote && <Text as="p">{about.personalNote}</Text>}
          <ul className="flex flex-wrap gap-2 pt-2" aria-label="What I work with most">
            {about.focus.map((f) => <li key={f} className="chip">{f}</li>)}
          </ul>
        </Reveal>
        <ul className="grid grid-cols-2 gap-4">
          {about.stats.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 70} className="card lift flex flex-col justify-between p-5 md:p-6"
              style={{ background: TONES[i % 4].bg }}>
              <span className="font-display text-4xl text-ink md:text-5xl">{s.value}</span>
              <span className="mt-3 text-sm font-medium text-ink-2">{s.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className={wrap}>
      <SectionHeading id="projects-title" eyebrow="Chapter 2 · Things I built" title="Featured projects" icon={<Icon name="projects" className="h-4 w-4" />}
        action={<a href={moreWork.href} target="_blank" rel="noopener noreferrer" className="btn btn-text">{moreWork.label} <Icon name="arrow" className="h-4 w-4" /></a>} />
      <ul className="grid gap-4 md:grid-cols-2">
        {projects.map((p, i) => {
          const tone = TONES[i % 4]
          return (
            <Reveal as="li" key={p.name} delay={(i % 2) * 80} className="card lift flex flex-col overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-6 pt-6">
                <span className="grid h-12 w-12 place-items-center inkbox" style={{ background: tone.bg, color: tone.fg }}>
                  <Icon name="code" className="h-6 w-6" />
                </span>
                {p.badge && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-tertiary-c px-3 py-1.5 text-xs font-medium text-on-tertiary-c">
                    <Icon name="star" className="h-3.5 w-3.5" />{p.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
                <p className="label">{p.category}</p>
                <h3 className="mt-1.5 text-2xl">{p.name}</h3>
                <Text as="p" className="mt-3 text-ink-2">{p.what}</Text>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${p.name} tech stack`}>
                  {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {p.slug && (
                    <a href={`?work=${p.slug}`} onClick={(e) => { e.preventDefault(); goTo(p.slug) }} className="btn btn-filled">
                      Read the story
                    </a>
                  )}
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-outlined">
                      {l.label} <Icon name="arrow" className="h-4 w-4" />
                      <span className="sr-only">for {p.name} (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className={wrap}>
      <SectionHeading id="experience-title" eyebrow="Chapter 3 · The journey so far" title="Experience & education" icon={<Icon name="experience" className="h-4 w-4" />} />
      <ol className="card divide-y divide-line/60 overflow-hidden">
        {experience.map((e, i) => (
          <Reveal as="li" key={e.title} delay={i * 50} className="grid gap-4 p-6 sm:grid-cols-[3rem_1fr] md:p-8">
            <span className="grid h-12 w-12 place-items-center inkbox" style={{ background: TONES[i % 4].bg, color: TONES[i % 4].fg }}>
              <Icon name={e.kind === 'Education' ? 'school' : e.kind === 'Work' ? 'experience' : 'code'} className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl">{e.title}</h3>
                <p className="font-mono text-sm text-ink-2">{e.period}</p>
              </div>
              <p className="text-ink-2">{e.org} <span className="text-outline">· {e.kind}</span></p>
              <Text as="p" className="mt-3 text-ink-2">{e.text}</Text>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Highlights">
                {e.tags.map((t) => <li key={t} className="chip">{t}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className={wrap}>
      <SectionHeading id="skills-title" eyebrow="Chapter 4 · My toolkit" title="Skills & technologies" icon={<Icon name="skills" className="h-4 w-4" />} />
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal as="li" key={g.group} delay={(i % 3) * 60} className="card p-6">
            <h3 className="flex items-center gap-2 text-xl">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: TONES[i % 4].fg }} aria-hidden="true" />
              {g.group}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* Achievements, each with a hand-drawn star. */
export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className={wrap}>
      <SectionHeading id="achievements-title" eyebrow="Chapter 6 · Little trophies" title="Achievements & certifications" icon={<Icon name="achievements" className="h-4 w-4" />} />
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {achievements.map((a, i) => {
          return (
            <Reveal as="li" key={a.title} delay={(i % 4) * 50} className="card lift flex flex-col items-center p-5 text-center">
              <svg viewBox="0 0 48 48" className="h-14 w-14 text-primary" aria-hidden="true">
                <path d="M24 4.5l5.6 12.2 13.3 1.5-9.9 9 2.8 13.1L24 33.6l-11.8 6.7 2.8-13.1-9.9-9 13.3-1.5z" fill="var(--primary-c)" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M23.4 6.2l5.9 11.6 12.6 1.9" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5" />
              </svg>
              <h3 className="mt-4 text-base leading-snug">{a.title}</h3>
              <p className="mt-1 text-sm text-ink-2">{a.text}</p>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}

function CopyEmail({ email }) {
  const [state, setState] = useState('idle')
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setState('done') } catch { setState('fail') }
    setTimeout(() => setState('idle'), 2200)
  }
  return (
    <button type="button" onClick={copy} className="btn btn-filled">
      <Icon name="copy" className="h-4 w-4" />
      {state === 'done' ? 'Copied' : state === 'fail' ? 'Copy failed, select the address' : 'Copy email'}
      <span className="sr-only" aria-live="polite">{state === 'done' ? 'Email address copied' : ''}</span>
    </button>
  )
}

function ContactForm() {
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') || '').trim()
    const from = String(f.get('email') || '').trim()
    const msg = String(f.get('message') || '').trim()
    const err = {}
    if (!name) err.name = 'Please add your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) err.email = 'Please add a valid email address.'
    if (!msg) err.message = 'Please write a short message.'
    setErrors(err)
    if (Object.keys(err).length) return
    const body = `${msg}\n\n— ${name} (${from})`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Hello from ${name}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  const field = 'mt-1.5 w-full rounded-xl border border-outline bg-transparent px-4 py-3.5 text-ink placeholder:text-outline focus:border-primary focus:outline-2 focus:outline-primary'
  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-4 p-6 md:p-8" aria-describedby="form-note">
      {[
        { id: 'name', label: 'Name', type: 'text', auto: 'name' },
        { id: 'email', label: 'Email', type: 'email', auto: 'email' },
      ].map((x) => (
        <div key={x.id}>
          <label htmlFor={x.id} className="text-sm font-medium text-ink">{x.label}</label>
          <input id={x.id} name={x.id} type={x.type} autoComplete={x.auto} className={field}
            aria-invalid={!!errors[x.id]} aria-describedby={errors[x.id] ? `${x.id}-err` : undefined} />
          {errors[x.id] && <p id={`${x.id}-err`} className="mt-1 text-sm" style={{ color: 'var(--rose)' }}>{errors[x.id]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">Message</label>
        <textarea id="message" name="message" rows="4" className={`${field} resize-y`}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined} />
        {errors.message && <p id="message-err" className="mt-1 text-sm" style={{ color: 'var(--rose)' }}>{errors.message}</p>}
      </div>
      <button type="submit" className="btn btn-filled w-full">Send message</button>
      <p id="form-note" className="text-center text-sm text-ink-2" aria-live="polite">
        {sent ? 'Your email app should open with the message ready to send.' : 'This opens your email app with the message filled in.'}
      </p>
    </form>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={wrap}>
      <SectionHeading id="contact-title" eyebrow="Last page · Your turn" title={contact.title} icon={<Icon name="contact" className="h-4 w-4" />} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal className="min-w-0 space-y-4">
          <div className="bubble mb-8 p-6 md:p-8" style={{ '--bubble-bg': 'var(--surface)' }}>
            <Text as="p" className="text-lg leading-relaxed">{contact.text}</Text>
            <p className="mt-6 text-sm font-medium opacity-80">Email, fastest response</p>
            <p className="mt-1 font-display text-2xl break-all text-primary md:text-3xl">
              <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">{contact.email}</a>
            </p>
            <div className="mt-5"><CopyEmail email={contact.email} /></div>
          </div>
          <ul className="card divide-y divide-line/60 overflow-hidden">
            {contact.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-c">
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">{l.label}</span>
                    <span className="block truncate text-sm text-ink-2">{l.handle}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary">{l.note} <Icon name="arrow" className="h-4 w-4" /></span>
                </a>
              </li>
            ))}
            {(contact.phone || contact.location) && (
              <li className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 text-ink-2">
                {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-primary"><Icon name="phone" className="h-4 w-4" />{contact.phone}</a>}
                {contact.location && <span className="flex items-center gap-2"><Icon name="pin" className="h-4 w-4" />{contact.location}</span>}
              </li>
            )}
          </ul>
        </Reveal>
        <Reveal delay={100}><ContactForm /></Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="mx-auto mb-6 max-w-6xl border-t border-line/60 px-5 pt-8 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-4xl font-bold text-ink md:text-5xl">The end… <span className="text-primary">for now!</span></p>
          <p className="mt-2 font-display text-xl tracking-wide text-ink">{hero.fullName}</p>
          <p className="text-sm text-ink-2">{footer.line}</p>
        </div>
        <a href="#top" className="btn btn-text">Back to top</a>
      </div>
      <p className="mt-6 text-sm text-ink-2">{footer.copyright}</p>
    </footer>
  )
}
