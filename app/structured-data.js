import { siteUrl } from './site-url.js'

// schema.org descriptions of what each page is about, as JSON-LD, so search
// and answer engines can tell a library from an app from a command line.

const org = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#org`,
  name: 'zig-nostr',
  url: `${siteUrl}/`,
  logo: `${siteUrl}/logo.svg`,
  sameAs: ['https://github.com/zig-nostr'],
}

const app = (name, page, repo, description, extra = {}) => ({
  '@type': 'SoftwareApplication',
  name,
  url: `${siteUrl}/${page}`,
  description,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Linux',
  license: 'https://opensource.org/licenses/MIT',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  codeRepository: `https://github.com/zig-nostr/${repo}`,
  downloadUrl: `https://github.com/zig-nostr/${repo}/releases/latest`,
  publisher: { '@id': `${siteUrl}/#org` },
  ...extra,
})

const library = {
  '@type': 'SoftwareSourceCode',
  name: 'nostr',
  alternateName: 'zig-nostr',
  description: 'A Nostr protocol library for Zig: keys and BIP-340 signatures, NIP-01 events, NIP-19, NIP-44, NIP-46, relay transport, the NIP-65 outbox model, and a local-first LMDB event store.',
  codeRepository: 'https://github.com/zig-nostr/nostr',
  programmingLanguage: 'Zig',
  license: 'https://opensource.org/licenses/MIT',
  url: `${siteUrl}/getting-started`,
  publisher: { '@id': `${siteUrl}/#org` },
}

const byPage = {
  index: [
    org,
    { '@type': 'WebSite', '@id': `${siteUrl}/#site`, name: 'zig-nostr', url: `${siteUrl}/`, publisher: { '@id': `${siteUrl}/#org` } },
    library,
  ],
  'getting-started': [library],
  deed: [app('deed', 'deed', 'deed', 'The nostr command line: keys, events, NIP-19, NIP-44, relay queries, publishing, and a local store that later runs read without a network.')],
  plaza: [app('Plaza', 'plaza', 'plaza', 'A fast, local-first Nostr client for macOS and Linux, rendered from its own store and reconciled with relays in the background.', { applicationCategory: 'SocialNetworkingApplication' })],
  notary: [app('Notary', 'notary', 'notary', 'A native NIP-46 remote signer for macOS and Linux: the key stays in a local daemon on a machine you control.', { applicationCategory: 'SecurityApplication' })],
}

export function structuredData(page) {
  const items = byPage[page]
  if (!items) return null
  return { '@context': 'https://schema.org', '@graph': items }
}
