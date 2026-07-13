# zig-nostr website

The documentation and showcase site for
[zig-nostr](https://github.com/zig-nostr) — the Nostr protocol library for Zig.

Built with [Next.js](https://nextjs.org) and [Nextra](https://nextra.site).

## Develop

```sh
npm install
npm run dev
```

Then open http://localhost:3000.

## Build

```sh
npm run build
```

`next build` prerenders every page as static HTML and `pagefind` builds the
search index.

## Structure

- `content/` — the pages, authored in MDX.
- `content/_meta.js` — sidebar/navigation order and labels.
- `app/` — the Next.js App Router entry (layout, catch-all MDX route).
- `app/globals.css` — brand styles and the landing hero.

## Deploy

Deployed on Vercel. The production domain is configured in the Vercel dashboard,
not committed to this repository.

## License

MIT — see [LICENSE](LICENSE).
