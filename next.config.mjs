import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
})

export default withNextra({
  reactStrictMode: true,
  // No metadataBase / hard-coded site URL here on purpose: the public domain is
  // configured in the deploy dashboard (Vercel), never committed to this repo.
  async headers() {
    return [
      {
        // NIP-05 requires the identifier file to be readable cross-origin so
        // web clients can verify name@domain -> pubkey mappings.
        source: '/.well-known/nostr.json',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ]
  },
})
