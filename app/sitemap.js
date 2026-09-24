import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { siteUrl } from './site-url.js'

// One entry per page in content/, so a new page is in the sitemap the moment
// it exists.
export default function sitemap() {
  const pages = readdirSync(join(process.cwd(), 'content'))
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.slice(0, -4))
  return pages.map((p) => ({
    url: p === 'index' ? `${siteUrl}/` : `${siteUrl}/${p}`,
    changeFrequency: 'weekly',
    priority: p === 'index' ? 1 : 0.7,
  }))
}
