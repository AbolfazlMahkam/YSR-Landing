import { readFileSync } from 'node:fs'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }

export const ogAlt =
  'موسسه یاوران سلامت روان — روان‌شناسی نوین و حکمت اسلامی · Yavaran-e Salamat-e Ravan, Modern Psychology & Islamic Wisdom'

// Hand-maintained asset in public/. Not an app/*-image.tsx route because this
// site builds with output: 'export', which emits those as extension-less files
// that GitHub Pages serves as application/octet-stream.
// Shared by the root layout and the section pages. The ?v= query busts
// link-preview caches (Facebook, WhatsApp, Telegram, …) when this image is
// replaced — bump it whenever og-image.png changes.
export const ogImage = {
  url: '/og-image.png?v=2',
  width: ogSize.width,
  height: ogSize.height,
  alt: ogAlt,
}

const palette = {
  cream: '#FAF6EF',
  greenDeep: '#0D5C32',
  greenMist: '#E9F6EE',
  gold: '#C8A24A',
  goldDeep: '#A67F2E',
  textMid: '#4A5568',
} as const

const CREAM_PANEL_WIDTH = 680
const GREEN_PANEL_WIDTH = 520

type OgFont = {
  name: string
  data: ArrayBuffer
  weight: 400 | 700 | 900
  style: 'normal'
}

function readArrayBuffer(...segments: string[]) {
  const buf = readFileSync(path.join(process.cwd(), ...segments))
  return buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength,
  ) as ArrayBuffer
}

let cachedFonts: OgFont[]

function loadFonts(): OgFont[] {
  if (!cachedFonts) {
    const dir = ['assets', 'fonts']
    cachedFonts = [
      {
        name: 'Vazirmatn',
        data: readArrayBuffer(...dir, 'Vazirmatn-Regular.ttf'),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Vazirmatn',
        data: readArrayBuffer(...dir, 'Vazirmatn-Bold.ttf'),
        weight: 700,
        style: 'normal',
      },
      {
        name: 'Vazirmatn',
        data: readArrayBuffer(...dir, 'Vazirmatn-Black.ttf'),
        weight: 900,
        style: 'normal',
      },
    ]
  }
  return cachedFonts
}

let cachedLogo: string

function loadLogo() {
  if (!cachedLogo) {
    const buf = readFileSync(
      path.join(process.cwd(), 'public', 'images', 'logo.png'),
    )
    cachedLogo = `data:image/png;base64,${buf.toString('base64')}`
  }
  return cachedLogo
}

const cachedPattern: Record<string, string> = {}

/**
 * Tiles the real `public/pattern.svg` rosette across the cream panel.
 *
 * Satori has no CSS `mask`, so this has to be a self-contained SVG data URI —
 * but the artwork is read straight from the source file, so the OG card and the
 * site can't drift apart. The tile is carried by an SVG `<pattern>`, which keeps
 * the whole card to a single `<img>` instead of hundreds of nodes.
 *
 * `pattern.svg` has a 100x125 viewBox whose motif is top-aligned with a
 * 28.7-unit empty band below it, so the cell is kept at that exact 4:5 ratio —
 * the same rhythm `.pattern-field::before` produces via `mask-size` in globals.css.
 */
function loadPattern(ink: string) {
  const cached = cachedPattern[ink]
  if (cached) return cached

  const source = readFileSync(
    path.join(process.cwd(), 'public', 'pattern.svg'),
    'utf8',
  )
  const d = source.match(/ d="([^"]+)"/)?.[1]
  if (!d) throw new Error('pattern.svg: no path data found')

  const w = CREAM_PANEL_WIDTH
  const h = ogSize.height
  // Sized exactly to the cream panel so the <img> below renders 1:1 — any other
  // aspect would stretch the rosettes. <pattern> clips the tile to the rect.
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<defs><pattern id="t" width="100" height="125" patternUnits="userSpaceOnUse">` +
    `<path d="${d}" fill="${ink}"/></pattern></defs>` +
    `<rect width="${w}" height="${h}" fill="url(#t)"/></svg>`
  return (cachedPattern[ink] = `data:image/svg+xml,${encodeURIComponent(svg)}`)
}

export function OgCard({ siteUrl }: { siteUrl: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: palette.cream,
      }}
    >
      <div
        style={{
          width: CREAM_PANEL_WIDTH,
          height: ogSize.height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 68px',
          position: 'relative',
        }}
      >
        <img
          src={loadPattern(palette.gold)}
          alt=""
          width={CREAM_PANEL_WIDTH}
          height={ogSize.height}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0.12,
          }}
        />

        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            backgroundColor: palette.greenMist,
            borderRadius: 999,
            padding: '11px 22px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 25,
              fontWeight: 700,
              color: palette.greenDeep,
            }}
          >
            Ù…ÙˆØ³Ø³Ù‡ Ø¢Ù…ÙˆØ²Ø´ÛŒ Ùˆ Ù¾Ú˜ÙˆÙ‡Ø´ÛŒ
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 26,
            fontSize: 78,
            fontWeight: 900,
            lineHeight: 1.12,
            color: palette.greenDeep,
          }}
        >
          <div style={{ display: 'flex' }}>ÛŒØ§ÙˆØ±Ø§Ù†</div>
          <div style={{ display: 'flex' }}>Ø³Ù„Ø§Ù…Øª Ø±ÙˆØ§Ù†</div>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 16,
            fontSize: 31,
            fontWeight: 400,
            color: palette.textMid,
          }}
        >
          Ø±ÙˆØ§Ù†Ø´Ù†Ø§Ø³ÛŒ Ù†ÙˆÛŒÙ† Ùˆ Ø­Ú©Ù…Øª Ø§Ø³Ù„Ø§Ù…ÛŒ
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 30,
            width: 104,
            height: 4,
            borderRadius: 2,
            backgroundColor: palette.gold,
          }}
        />

        <div
          style={{
            display: 'flex',
            marginTop: 26,
            fontSize: 40,
            fontWeight: 700,
            color: palette.greenDeep,
          }}
        >
          Yavaran-e Salamat-e Ravan
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 7,
            fontSize: 24,
            fontWeight: 400,
            color: palette.textMid,
          }}
        >
          {'Educational & Research Institute'}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 22,
            fontWeight: 700,
            color: palette.goldDeep,
          }}
        >
          {siteUrl.replace('https://', '')}
        </div>
      </div>

      <div
        style={{
          width: GREEN_PANEL_WIDTH,
          height: ogSize.height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            'linear-gradient(160deg, #13512C 0%, #0D2417 55%, #08170F 100%)',
        }}
      >
        <div
          style={{
            width: 256,
            height: 256,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 52,
            padding: 28,
          }}
        >
          <img src={loadLogo()} alt="" width={200} height={200} />
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 26,
            width: 60,
            height: 3,
            borderRadius: 2,
            backgroundColor: palette.gold,
          }}
        />

        <div
          style={{
            display: 'flex',
            marginTop: 22,
            fontSize: 24,
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.72)',
          }}
        >
          Ù‚Ù…ØŒ Ø§ÛŒØ±Ø§Ù†
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 6,
            fontSize: 20,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.45)',
          }}
        >
          Qom, Iran
        </div>
      </div>
    </div>
  )
}

export function renderOgCard(siteUrl: string) {
  return new ImageResponse(<OgCard siteUrl={siteUrl} />, {
    ...ogSize,
    fonts: loadFonts(),
  })
}