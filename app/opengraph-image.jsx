import { ImageResponse } from 'next/og'

export const alt = 'zig-nostr — the Nostr protocol, natively in Zig'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1254 1254">
  <defs><linearGradient id="p" x1="190" y1="110" x2="1090" y2="1120" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#7C36EB"/><stop offset="0.5" stop-color="#6F2DDA"/><stop offset="1" stop-color="#7B35E8"/>
  </linearGradient></defs>
  <g fill="url(#p)">
    <path d="M181 179H496L352 323L350 574L181 1050Z"/>
    <path d="M584 179H905L746 322H440Z"/>
    <path d="M1083 84L816 314L707 571L623 367L513 368L197 1130L450 912L551 663L628 864H732Z"/>
    <path d="M1093 179L919 556V905L768 1050H1093Z"/>
    <path d="M526 907H820L676 1050H364Z"/>
  </g>
</svg>`

export default function OpengraphImage() {
  const logo = `data:image/svg+xml;base64,${btoa(logoSvg)}`
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0b0b0d',
          backgroundImage:
            'radial-gradient(1000px 520px at 15% -5%, rgba(124,54,235,0.30), transparent 60%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '26px' }}>
          <img src={logo} width="118" height="118" alt="" />
          <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: '-0.02em' }}>zig-nostr</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: '960px',
            }}
          >
            The Nostr protocol, natively in Zig
          </div>
          <div style={{ fontSize: 30, color: '#adb1bb', marginTop: '24px', maxWidth: '980px' }}>
            Audited secp256k1 / BIP-340 signing · a zero-copy local-first store · a native
            NIP-46 remote signer.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: 26, fontWeight: 700 }}>
          <div style={{ color: '#f0851a' }}>0.28 ms feed query @ 100k events</div>
          <div style={{ color: '#3a3a42' }}>|</div>
          <div style={{ color: '#8a8f9a', fontWeight: 600 }}>github.com/zig-nostr</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
