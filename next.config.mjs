import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
})

export default withNextra({
  reactStrictMode: true,
  // No metadataBase / hard-coded site URL here on purpose: the public domain is
  // configured in the deploy dashboard (Vercel), never committed to this repo.
  // The NIP-05 CORS header now lives in app/.well-known/nostr.json/route.js,
  // alongside the handler that builds the response.
})
