import { siteUrl } from './site-url.js'

// Everyone may read everything, search engines and answer engines alike. The
// sitemap line is what makes this file worth serving.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
