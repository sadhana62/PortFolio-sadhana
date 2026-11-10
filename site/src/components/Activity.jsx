import data from '../data/stats.json'
import { stats as cfg } from '../content.js'
import { Reveal, SectionHeading } from './ui.jsx'
import Icon from './Icons.jsx'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const fmt = (n) => (typeof n === 'number' ? n.toLocaleString('en-IN') : '—')
const fmtDate = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

/* Calendar heatmap: one column per week, one square per day, 5 shades of rose. */
function Heatmap({ days, levelOf, unit, label }) {
  if (!days?.length) return null
  const byDate = new Map(days.map((d) => [d.date, d]))
  const end = new Date(days[days.length - 1].date + 'T00:00:00')
  const start = new Date(end)
  start.setDate(start.getDate() - 52 * 7 - end.getDay())
  const cells = []
  for (let d = new Date(start), i = 0; d <= end; d.setDate(d.getDate() + 1), i++) {
    const iso = d.toISOString().slice(0, 10)
    const day = byDate.get(iso)
    const count = day?.count ?? 0
    cells.push({ iso, count, level: day ? levelOf(day) : 0, x: Math.floor(i / 7), y: d.getDay(), month: d.getMonth(), date: d.getDate() })
  }
  const s = 11, g = 3, step = s + g, weeks = cells[cells.length - 1].x + 1
  const W = 28 + weeks * step, H = 18 + 7 * step
  const months = cells.filter((c) => c.date <= 7 && c.y === 0 && c.x > 0)
  return (
    <div className="-mx-1 overflow-x-auto px-1 pb-1">
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={label} className="block max-w-none">
        {months.map((m) => (
          <text key={m.iso} x={28 + m.x * step} y={10} className="fill-ink-2" fontSize="10">{MONTHS[m.month]}</text>
        ))}
        {[1, 3, 5].map((d) => (
          <text key={d} x={0} y={18 + d * step + 9} className="fill-ink-2" fontSize="9">{['', 'Mon', '', 'Wed', '', 'Fri'][d]}</text>
        ))}
        {cells.map((c) => (
          <rect key={c.iso} x={28 + c.x * step} y={18 + c.y * step} width={s} height={s} rx="3" fill={`var(--heat-${c.level})`}>
            <title>{`${c.count} ${unit}${c.count === 1 ? '' : 's'} on ${fmtDate(c.iso)}`}</title>
          </rect>
        ))}
      </svg>
      <div className="mt-2 flex items-center justify-end gap-1.5 text-xs text-ink-2" aria-hidden="true">
        Less
        {[0, 1, 2, 3, 4].map((l) => <span key={l} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: `var(--heat-${l})` }} />)}
        More
      </div>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div className="min-w-0">
      <span className="block font-display text-3xl text-ink">{value}</span>
      <span className="block text-sm text-ink-2">{label}</span>
    </div>
  )
}

function Donut({ parts, total, center, label }) {
  const r = 52, c = 2 * Math.PI * r
  let off = 0
  return (
    <svg viewBox="0 0 140 140" className="h-36 w-36 shrink-0" role="img" aria-label={label}>
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--c-high)" strokeWidth="14" />
      {parts.map((p) => {
        const len = (p.value / total) * c
        const el = (
          <circle key={p.name} cx="70" cy="70" r={r} fill="none" stroke={p.color} strokeWidth="14" strokeLinecap="butt"
            strokeDasharray={`${Math.max(0, len - 2)} ${c}`} strokeDashoffset={-off} transform="rotate(-90 70 70)" />
        )
        off += len
        return el
      })}
      <text x="70" y="70" textAnchor="middle" className="fill-ink font-display" fontSize="28" fontWeight="600">{center}</text>
      <text x="70" y="90" textAnchor="middle" className="fill-ink-2" fontSize="11">solved</text>
    </svg>
  )
}

function GitHubCard({ gh }) {
  const langs = gh.languages.slice(0, 6)
  const max = langs[0]?.count || 1
  return (
    <Reveal className="card min-w-0 p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-2xl">GitHub</h3>
        <a href={`https://github.com/${gh.user}`} target="_blank" rel="noopener noreferrer" className="btn btn-text h-auto">
          github.com/{gh.user} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        <Stat value={fmt(gh.publicRepos)} label="public repos" />
        <Stat value={fmt(gh.contributions.total)} label="contributions, last year" />
        <Stat value={gh.since} label="on GitHub since" />
      </div>
      <p className="mt-7 mb-3 text-sm font-semibold text-ink">Contributions in the last year</p>
      <Heatmap days={gh.contributions.days} levelOf={(d) => d.level} unit="contribution"
        label={`GitHub contribution calendar: ${gh.contributions.total} contributions in the last year`} />
      <p className="mt-7 mb-3 text-sm font-semibold text-ink">Main language of my own repos</p>
      <ul className="space-y-2.5">
        {langs.map((l) => (
          <li key={l.name} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-3 text-sm">
            <span className="truncate text-ink-2">{l.name}</span>
            <span className="h-2.5 overflow-hidden rounded-full bg-c-high">
              <span className="block h-full rounded-full bg-primary" style={{ width: `${(l.count / max) * 100}%` }} />
            </span>
            <span className="text-right font-semibold text-ink tabular-nums">{l.count}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

function LeetCodeCard({ lc }) {
  const parts = [
    { name: 'Easy', value: lc.solved.easy, of: lc.totalQuestions?.easy, color: 'var(--easy)' },
    { name: 'Medium', value: lc.solved.medium, of: lc.totalQuestions?.medium, color: 'var(--medium)' },
    { name: 'Hard', value: lc.solved.hard, of: lc.totalQuestions?.hard, color: 'var(--hard)' },
  ]
  const lvl = (d) => (d.count >= 10 ? 4 : d.count >= 6 ? 3 : d.count >= 3 ? 2 : d.count >= 1 ? 1 : 0)
  return (
    <Reveal delay={100} className="card min-w-0 p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-2xl">LeetCode</h3>
        <a href={`https://leetcode.com/u/${lc.user}`} target="_blank" rel="noopener noreferrer" className="btn btn-text h-auto">
          leetcode.com/u/{lc.user} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-6">
        <Donut parts={parts} total={lc.solved.all} center={fmt(lc.solved.all)}
          label={`${lc.solved.all} problems solved: ${lc.solved.easy} easy, ${lc.solved.medium} medium, ${lc.solved.hard} hard`} />
        <ul className="min-w-0 flex-1 space-y-3">
          {parts.map((p) => (
            <li key={p.name} className="flex items-center gap-3 text-sm">
              <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: p.color }} aria-hidden="true" />
              <span className="w-16 text-ink-2">{p.name}</span>
              <span className="font-semibold text-ink tabular-nums">{fmt(p.value)}</span>
              {p.of && <span className="text-ink-2 tabular-nums">/ {fmt(p.of)}</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Stat value={fmt(lc.activeDays)} label="active days" />
        <Stat value={`${fmt(lc.streak)} days`} label="current streak" />
      </div>
      <p className="mt-7 mb-3 text-sm font-semibold text-ink">Submissions in the last year</p>
      <Heatmap days={lc.submissions.days} levelOf={lvl} unit="submission"
        label={`LeetCode submission calendar: ${lc.submissions.total} submissions in the last year`} />
    </Reveal>
  )
}

export default function Activity() {
  const gh = data.github
  const lc = data.leetcode
  if (!gh && !lc) return null
  return (
    <section id="activity" aria-labelledby="activity-title" className="px-5 py-12 md:px-8 md:py-16">
      <div>
        <SectionHeading id="activity-title" eyebrow="Chapter 5 · Daily practice" title="GitHub & LeetCode" icon={<Icon name="activity" className="h-4 w-4" />} />
        <div className="grid gap-4 xl:grid-cols-2">
          {gh && cfg.githubUser && <GitHubCard gh={gh} />}
          {lc && cfg.leetcodeUser && <LeetCodeCard lc={lc} />}
        </div>
        <p className="mt-6 text-center text-sm text-ink-2">Updated {fmtDate(data.updatedAt.slice(0, 10))}. Refreshed automatically every day.</p>
      </div>
    </section>
  )
}
