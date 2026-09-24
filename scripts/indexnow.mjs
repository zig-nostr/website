#!/usr/bin/env node
/**
 * Tell the IndexNow participants (Bing, Yandex, Naver, Seznam, Yep) that the
 * site's pages changed. Google is not a participant.
 *
 * A command someone runs after a change worth announcing, not a deploy step:
 * submitting unchanged pages on every build is how a domain earns a rate limit.
 *
 *     node scripts/indexnow.mjs <host>
 *     node scripts/indexnow.mjs <host> --dry-run
 *
 * The host is an argument because the domain lives in the deploy settings, not
 * in this repo. The pages come from the deployed sitemap, so a new page is
 * announced without anyone remembering to list it.
 *
 * The key is not a secret: IndexNow checks ownership by reading it back from
 * the domain it is for, so it is public by design.
 */

const KEY = '07d125e7231655dd8670b5fb9f6f9aed'
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const host = process.argv.slice(2).find((a) => !a.startsWith('--'))
const dryRun = process.argv.includes('--dry-run')
if (!host) {
  console.error('usage: node scripts/indexnow.mjs <host> [--dry-run]')
  process.exit(2)
}

// Submitting before the key file is reachable is refused without saying why,
// so check it first and name the cause.
const keyLocation = `https://${host}/${KEY}.txt`
const hosted = await fetch(keyLocation).catch(() => undefined)
if (!hosted?.ok || (await hosted.text()).trim() !== KEY) {
  console.error(`${keyLocation} does not serve the key; deploy first.`)
  process.exit(1)
}

const sitemap = await fetch(`https://${host}/sitemap.xml`).catch(() => undefined)
if (!sitemap?.ok) {
  console.error(`Could not read https://${host}/sitemap.xml.`)
  process.exit(1)
}
const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (urlList.length === 0) {
  console.error('The sitemap lists no pages.')
  process.exit(1)
}

const body = { host, key: KEY, keyLocation, urlList }
if (dryRun) {
  console.log(JSON.stringify(body, null, 2))
  process.exit(0)
}

const response = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})
// 200 is accepted; 202 is accepted while the key is still being checked.
if (response.status === 200 || response.status === 202) {
  console.log(`Submitted ${urlList.length} URLs (HTTP ${response.status}).`)
  process.exit(0)
}
const why = {
  400: 'the request was malformed',
  403: 'the key was rejected for this host',
  422: 'a URL did not belong to this host, or the key did not match',
  429: 'too many submissions; wait rather than retrying',
}
console.error(`IndexNow refused it: HTTP ${response.status}, ${why[response.status] ?? 'unknown'}`)
process.exit(1)
