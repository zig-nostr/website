import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
})

export default withNextra({
  reactStrictMode: true,
  // Notary's page used to live at /signer, from before the name existed. The
  // page, the nav label and the images all said Notary while the URL did not.
  //
  // Permanent, and kept permanently. It costs nothing to serve and the old
  // address may be sitting in somebody's notes or someone else's link. A
  // redirect that is removed later is just a broken link with extra steps.
  async redirects() {
    return [{ source: '/signer', destination: '/notary', permanent: true }]
  },
  // No metadataBase / hard-coded site URL here on purpose: the public domain is
  // configured in the deploy dashboard (Vercel), never committed to this repo.
  // The NIP-05 CORS header now lives in app/.well-known/nostr.json/route.js,
  // alongside the handler that builds the response.
})
