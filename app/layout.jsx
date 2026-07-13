import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    default: 'zig-nostr — the Nostr protocol, natively in Zig',
    template: '%s — zig-nostr',
  },
  description:
    'A foundational Nostr protocol library for Zig: secp256k1/BIP-340 signing, a zero-copy local-first event store, and a native NIP-46 remote signer.',
}

const navbar = (
  <Navbar logo={<b>zig-nostr</b>} projectLink="https://github.com/zig-nostr" />
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
