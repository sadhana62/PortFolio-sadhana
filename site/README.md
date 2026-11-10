# Sadhana Shrivastava — portfolio

A warm, personal portfolio built with React, Vite and Tailwind CSS.

## Edit your content

Every word on the site lives in **`src/content.js`**. Open it, change the text, save.

- Text in `[square brackets]` is a placeholder. The site shows it with a dashed outline so you can spot what still needs your words. Replace it, or set the field to `''` to hide it.
- `**double asterisks**` make a word bold.
- Your photo is `public/me.webp` (with `public/me.jpg` as a fallback). Replace both, keeping the names.
- To add a résumé button, put your PDF in `public/` (for example `public/resume.pdf`) and set `resumeUrl: 'resume.pdf'` in `hero`.
- `site.url` is the address the site lives at. It's used for search results and link previews (WhatsApp, LinkedIn, X). Update it if you deploy somewhere other than GitHub Pages.
- The link-preview image is `public/og-image.jpg` (1200 × 630).

## Case study pages

Every project has its own page (the "Read the story" button). The content lives in `caseStudy` inside each project in `src/content.js`: your role, timeline, team, why you built it, how you built it, the hard part, the result and what you learned. Fill in the `[bracketed]` parts and add screenshots to `public/`.

## Page-turning chapters

On laptops and desktops, any section that fits on one screen becomes a page: it stays in place while its panels arrive one by one, then tilts away like a turned page. Taller sections, phones and visitors with reduce motion turned on get normal scrolling. The timing lives in `src/components/Chapter.jsx`.

## GitHub and LeetCode graphs

The *Coding activity* section shows your real GitHub contribution calendar and languages, and your LeetCode solved counts and submission calendar.

- Usernames are set in `stats` inside `src/content.js`.
- `npm run build` fetches fresh numbers first (`scripts/fetch-stats.mjs`) and saves them to `src/data/stats.json`. Run `npm run stats` to refresh them by hand.
- The GitHub Pages workflow rebuilds the site every day, so the graphs stay current on their own.
- If GitHub or LeetCode can't be reached, the last saved numbers are kept and the build still succeeds.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
cd site
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Deploy

### Option A: GitHub Pages (free, already set up)

1. Push this repository to GitHub (the workflow lives in `.github/workflows/deploy-site.yml` at the repo root).
2. On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The site builds and goes live at `https://sadhana62.github.io/PortFolio-sadhana/`.

You can also run it by hand from the **Actions** tab → *Deploy portfolio to GitHub Pages* → **Run workflow**.

### Option B: Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repository.
2. Set **Root Directory** to `site`. Vercel detects Vite; keep the default build command (`npm run build`) and output directory (`dist`).
3. Deploy, then put your Vercel address in `site.url` inside `src/content.js` and push again so link previews use it.

## What's inside

```
site/
├─ index.html            SEO and social tags (filled from content.js at build)
├─ public/               photo, favicon, link-preview image
└─ src/
   ├─ content.js         ← all your words
   ├─ index.css          colours, fonts, light and dark themes
   ├─ App.jsx            section order
   └─ components/
      ├─ Header.jsx      navigation and theme toggle
      ├─ Hero.jsx        intro with the typing effect
      ├─ Sections.jsx    About, Projects, Experience, Skills, Achievements, Contact, Footer
      ├─ Doodles.jsx     the small hand-drawn accents
      └─ ui.jsx          fade-in, text and heading helpers
```

## Design notes

- **Theme:** a pencil-sketch graphic novel. Warm sketchbook paper, graphite pencil lines, soft cross-hatching, and pink as the one ink colour, with a charcoal dark mode. Text colours meet WCAG AA contrast in both themes.
- **Type:** Gaegu for headings, Patrick Hand for body text.
- **Motion:** gentle fade-ins, hover lift on cards, and a typing effect in the hero. With *reduce motion* turned on in the system settings, animation stops and the roles show as a plain list.
- **Accessibility:** skip link, keyboard focus rings, labelled navigation, form errors announced inline, alt text on the photo.
- **Contact form:** there's no server, so the form checks the fields and opens the visitor's email app with the message filled in.
