import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

// Base URL for absolute OG/canonical links. Sourced from the environment so the
// production domain lives in the Vercel dashboard, never committed here. On Vercel
// VERCEL_PROJECT_PRODUCTION_URL is injected automatically; set NEXT_PUBLIC_SITE_URL
// to pin the canonical custom domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

const description =
  'Audited secp256k1/BIP-340 signing, a zero-copy local-first event store, and a native NIP-46 remote signer.'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'zig-nostr — the Nostr protocol, natively in Zig',
    template: '%s — zig-nostr',
  },
  description,
  openGraph: {
    type: 'website',
    siteName: 'zig-nostr',
    title: 'zig-nostr — the Nostr protocol, natively in Zig',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'zig-nostr — the Nostr protocol, natively in Zig',
    description,
  },
}

const navbar = (
  <Navbar
    logo={
      <span className="zn-navlogo">
        <img src="/logo.svg" alt="" width="26" height="26" />
        <b>zig-nostr</b>
      </span>
    }
    projectLink="https://github.com/zig-nostr"
  />
)

const footer = (
  <Footer>MIT {new Date().getFullYear()} © zig-nostr — built with Zig.</Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/zig-nostr/website/tree/main"
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
