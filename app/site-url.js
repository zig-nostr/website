// Base URL for absolute OG, canonical, sitemap and structured-data links.
// Sourced from the environment so the production domain lives in the Vercel
// dashboard, never committed here. On Vercel VERCEL_PROJECT_PRODUCTION_URL is
// injected automatically; set NEXT_PUBLIC_SITE_URL to pin the canonical custom
// domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
