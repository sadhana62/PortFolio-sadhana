import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { site } from './src/content.js'

// Copies the SEO fields from content.js into index.html at build time,
// so search engines and social previews see them without running JavaScript.
function seoFromContent() {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const url = site.url.endsWith('/') ? site.url : site.url + '/'
  return {
    name: 'seo-from-content',
    transformIndexHtml(html) {
      return html
        .replaceAll('__SITE_TITLE__', esc(site.title))
        .replaceAll('__SITE_DESCRIPTION__', esc(site.description))
        .replaceAll('__SITE_URL__', esc(url))
    },
  }
}

// GitHub Pages serves the site from /<repo-name>/, Vercel serves it from /.
// The GitHub Actions workflow sets BASE_PATH; locally and on Vercel it stays "/".
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss(), seoFromContent()],
})
