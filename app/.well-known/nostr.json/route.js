// NIP-05 identifier endpoint: https://github.com/nostr-protocol/nips/blob/master/05.md
//
// Served as a dynamic route (not a static public/ file) so we honor the
// `?name=<local-part>` query and return only the requested mapping, instead of
// enumerating every handle on the domain.

const PUBKEY =
  '3e294d2fd339bb16a5403a86e3664947dd408c4d87a0066524f8a573ae53ca8e'

const PLAZA_PUBKEY =
  '218cd85be35f1558286e68aae8fc2b33a10d19f0c2c8e05d2cf0b42653332124'

// name -> hex pubkey (lowercase). `_` is the root identifier: sepehr@zignostr.com
// with no local part resolves to it per NIP-05.
const NAMES = {
  _: PUBKEY,
  sepehr: PUBKEY,
  plaza: PLAZA_PUBKEY,
}

// The response depends on the query string, so never prerender or cache it.
export const dynamic = 'force-dynamic'

export function GET(request) {
  const name = new URL(request.url).searchParams.get('name')
  const pubkey = name ? NAMES[name] : undefined

  return Response.json(
    { names: pubkey ? { [name]: pubkey } : {} },
    {
      // NIP-05 requires the file to be readable cross-origin so web clients can
      // verify name@domain -> pubkey.
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
  )
}
