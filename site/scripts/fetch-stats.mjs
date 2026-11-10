/*
  Fetches your GitHub and LeetCode activity and saves it to src/data/stats.json.
  Runs automatically before every build (npm run build), and daily on GitHub Actions.

  It runs on the build machine, not in the visitor's browser, so LeetCode's
  browser restrictions don't apply and the page loads instantly.
  If a request fails, the previous stats.json is kept and the build continues.

  Usernames come from src/content.js (stats.githubUser / stats.leetcodeUser).
*/
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { stats as cfg } from '../src/content.js'

const OUT = new URL('../src/data/stats.json', import.meta.url)
const UA = { 'User-Agent': 'portfolio-stats-script' }

async function previous() {
  try { return JSON.parse(await readFile(OUT, 'utf8')) } catch { return {} }
}

async function github(user) {
  const headers = { ...UA, Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const u = await (await fetch(`https://api.github.com/users/${user}`, { headers })).json()
  if (!u.login) throw new Error(`GitHub user lookup failed: ${u.message || 'unknown error'}`)

  let repos = []
  for (let page = 1; page <= 5; page++) {
    const r = await (await fetch(`https://api.github.com/users/${user}/repos?per_page=100&page=${page}`, { headers })).json()
    if (!Array.isArray(r)) throw new Error('GitHub repo list failed')
    repos = repos.concat(r)
    if (r.length < 100) break
  }
  const own = repos.filter((r) => !r.fork)
  const langCount = {}
  own.forEach((r) => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1 })
  const languages = Object.entries(langCount).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }))

  // Public contribution calendar (the green squares on your profile), read from GitHub's own page.
  const html = await (await fetch(`https://github.com/users/${user}/contributions`, { headers: UA })).text()
  const tips = {}
  for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = m[2].match(/^(\d[\d,]*) contribution/)
    tips[m[1]] = n ? Number(n[1].replace(/,/g, '')) : 0
  }
  const days = []
  for (const m of html.matchAll(/<td[^>]*data-date="([\d-]+)"[^>]*>/g)) {
    const tag = m[0]
    const id = (tag.match(/id="([^"]+)"/) || [])[1]
    const level = Number((tag.match(/data-level="(\d)"/) || [])[1] || 0)
    days.push({ date: m[1], count: tips[id] ?? 0, level })
  }
  days.sort((a, b) => a.date.localeCompare(b.date))
  if (!days.length) throw new Error('GitHub contribution calendar could not be read')

  return {
    user,
    publicRepos: u.public_repos,
    ownRepos: own.length,
    followers: u.followers,
    stars: own.reduce((s, r) => s + (r.stargazers_count || 0), 0),
    since: new Date(u.created_at).getFullYear(),
    languages,
    contributions: { total: days.reduce((s, d) => s + d.count, 0), days },
  }
}

async function leetcode(user) {
  const query = `query($u:String!){
    matchedUser(username:$u){
      submitStatsGlobal{acSubmissionNum{difficulty count}}
      userCalendar{streak totalActiveDays submissionCalendar}
    }
    allQuestionsCount{difficulty count}
  }`
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { ...UA, 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({ query, variables: { u: user } }),
  })
  const d = (await res.json()).data
  if (!d?.matchedUser) throw new Error('LeetCode user lookup failed')
  const solved = Object.fromEntries(d.matchedUser.submitStatsGlobal.acSubmissionNum.map((x) => [x.difficulty, x.count]))
  const total = Object.fromEntries(d.allQuestionsCount.map((x) => [x.difficulty, x.count]))
  const cal = JSON.parse(d.matchedUser.userCalendar.submissionCalendar || '{}')
  const days = Object.entries(cal)
    .map(([ts, count]) => ({ date: new Date(Number(ts) * 1000).toISOString().slice(0, 10), count }))
    .sort((a, b) => a.date.localeCompare(b.date))
  return {
    user,
    solved: { all: solved.All, easy: solved.Easy, medium: solved.Medium, hard: solved.Hard },
    totalQuestions: { all: total.All, easy: total.Easy, medium: total.Medium, hard: total.Hard },
    streak: d.matchedUser.userCalendar.streak,
    activeDays: d.matchedUser.userCalendar.totalActiveDays,
    submissions: { total: days.reduce((s, x) => s + x.count, 0), days },
  }
}

const prev = await previous()
const out = { updatedAt: new Date().toISOString(), github: prev.github ?? null, leetcode: prev.leetcode ?? null }

for (const [key, fn, user] of [['github', github, cfg.githubUser], ['leetcode', leetcode, cfg.leetcodeUser]]) {
  if (!user) continue
  try {
    out[key] = await fn(user)
    console.log(`✓ ${key} stats updated for ${user}`)
  } catch (e) {
    console.warn(`! ${key} stats not updated (${e.message}). Keeping the previous data.`)
    out.updatedAt = prev.updatedAt ?? out.updatedAt
  }
}

await mkdir(new URL('../src/data/', import.meta.url), { recursive: true })
await writeFile(OUT, JSON.stringify(out, null, 2) + '\n')
