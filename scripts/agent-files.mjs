// Writes the files agents and answer engines read, from the same MDX the site
// renders, so they can never drift from the pages:
//
//   public/<page>.md     a plain Markdown copy of every page (index.md for home)
//   public/llms-full.txt every page in one file, in navigation order
//
// Runs before `next build`. The output is generated, so it is ignored by git.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const content = join(root, 'content')
const out = join(root, 'public')

// Navigation order comes from _meta.js, so llms-full.txt reads like the site.
const meta = readFileSync(join(content, '_meta.js'), 'utf8')
const order = [...meta.matchAll(/^\s{2}(?:'([^']+)'|(\w+)):/gm)].map((m) => m[1] || m[2])
const pages = readdirSync(content).filter((f) => f.endsWith('.mdx')).map((f) => f.slice(0, -4))
const ordered = [...order.filter((p) => pages.includes(p)), ...pages.filter((p) => !order.includes(p))]

const ELEMENT = '(?:div|span|p|img|h[1-6]|a|br|section|ul|ol|li|strong|em|b|i|code|pre|small)'

function toMarkdown(src) {
  let title = null
  src = src.replace(/^---\n([\s\S]*?)\n---\n/, (_, fm) => {
    const t = fm.match(/^title:\s*(.+)$/m)
    if (t) title = t[1].trim()
    return ''
  })
  // Protect code, fenced and inline, from the tag stripping below.
  const kept = []
  const keep = (s) => `\u0000${kept.push(s) - 1}\u0000`
  src = src.replace(/```[\s\S]*?```/g, keep).replace(/`[^`\n]+`/g, keep)

  src = src
    .replace(/^(?:import|export) .*$/gm, '')
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g, (_, n, t) => `\n\n${'#'.repeat(+n)} ${t.trim()}\n\n`)
    .replace(/<a\b[^>]*?href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, t) => `[${t.trim()}](${href})`)
    .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/g, (_, t) => `\n\n${t.trim().replace(/\s*\n\s*/g, ' ')}\n\n`)
    .replace(new RegExp(`</?${ELEMENT}\\b[^>]*?/?>`, 'g'), '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/[ \t]+$/gm, '')
    // Indentation survives only on nested list items; anywhere else four
    // spaces would turn a line into a code block.
    .replace(/^[ \t]+(?=\S)/gm, (ws, off, all) => (/^[ \t]+(?:[-*+]|\d+\.)\s/.test(all.slice(off, off + ws.length + 4)) ? ws : ''))
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  src = src.replace(/\u0000(\d+)\u0000/g, (_, i) => kept[+i])
  if (title && !/^# /.test(src)) src = `# ${title}\n\n${src}`
  return src + '\n'
}

const full = ['# zig-nostr, every page\n', 'The whole site as Markdown, in navigation order. Each page is also served on its own at its path with `.md` added; the home page is `/index.md`.\n']
for (const page of ordered) {
  const md = toMarkdown(readFileSync(join(content, `${page}.mdx`), 'utf8'))
  writeFileSync(join(out, `${page}.md`), md)
  full.push(`\n---\n\nSource: /${page === 'index' ? '' : page}\n\n${md}`)
}
writeFileSync(join(out, 'llms-full.txt'), full.join(''))
console.log(`agent files: ${ordered.length} pages, llms-full.txt`)
