import { readFileSync } from 'node:fs'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }

export const ogAlt =
  'Ù…ÙˆØ³Ø³Ù‡ ÛŒØ§ÙˆØ±Ø§Ù† Ø³Ù„Ø§Ù…Øª Ø±ÙˆØ§Ù† â€” Ø±ÙˆØ§Ù†Ø´Ù†Ø§Ø³ÛŒ Ù†ÙˆÛŒÙ† Ùˆ Ø­Ú©Ù…Øª Ø§Ø³Ù„Ø§Ù…ÛŒ Â· Yavaran-e Salamat-e Ravan, Modern Psychology & Islamic Wisdom'

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

/**
 * The eight-point star lattice already used by `.islamic-pattern` in
 * globals.css, emitted as one inline SVG so the whole card needs a single
 * `<img>` instead of hundreds of nodes.
 */
function loadPattern(stroke: string) {
  const tile = 64
  const star = '30,4 37,23 56,23 41,34 47,52 30,41 13,52 19,34 4,23 23,23'
  // Generated slightly oversized, then scaled down onto the cream panel by the
  // <img> width/height below, so no tile can poke into the green panel.
  const cols = Math.ceil(CREAM_PANEL_WIDTH / tile) + 1
  const rows = Math.ceil(ogSize.height / tile) + 1
  const stars: string[] = []
  for (let row = 0; row < rows; row++) {
    const offset = row % 2 === 0 ? 0 : tile / 2
    for (let col = 0; col < cols; col++) {
      stars.push(
        `<polygon points="${star}" transform="translate(${col * tile + offset} ${row * tile})"/>`,
      )
    }
  }
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * tile}" height="${rows * tile}" ` +
    `viewBox="0 0 ${cols * tile} ${rows * tile}" fill="none" ` +
    `stroke="${stroke}" stroke-width="1.1" stroke-linejoin="round">${stars.join('')}</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
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
            opacity: 0.16,
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