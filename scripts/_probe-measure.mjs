import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const projectRoot = process.cwd()
const require = createRequire(path.join(projectRoot, 'package.json'))
const { createElement: h } = require('react')
const { ImageResponse } = require('next/og')

const buf = (f) => readFileSync(path.join(projectRoot, 'assets', 'fonts', f))
const fonts = [
  { name: 'Vazirmatn', data: buf('Vazirmatn-Regular.ttf'), weight: 400, style: 'normal' },
  { name: 'Vazirmatn', data: buf('Vazirmatn-Bold.ttf'), weight: 700, style: 'normal' },
  { name: 'Vazirmatn', data: buf('Vazirmatn-Black.ttf'), weight: 900, style: 'normal' },
]

const ITEMS = [
  ['name-a', 70, 900, 'یاوران'],
  ['name-b', 70, 900, 'سلامت روان'],
  ['name-b-78', 78, 900, 'سلامت روان'],
  ['tag-fa', 29, 400, 'روانشناسی نوین و حکمت اسلامی'],
  ['tag-fa-31', 31, 400, 'روانشناسی نوین و حکمت اسلامی'],
  ['eyebrow', 24, 700, 'موسسه آموزشی و پژوهشی'],
  ['name-en', 37, 700, 'Yavaran-e Salamat-e Ravan'],
  ['name-en-40', 40, 700, 'Yavaran-e Salamat-e Ravan'],
  ['desc-en', 23, 400, 'Educational & Research Institute'],
  ['url', 21, 700, 'rohanian-ysr.ir'],
]

const ROW = 60
const children = []
ITEMS.forEach(([name, fontSize, fontWeight, text], i) => {
  children.push(
    h(
      'div',
      {
        key: name,
        style: {
          display: 'flex',
          alignItems: 'flex-start',
          position: 'absolute',
          left: 0,
          top: i * ROW,
          width: 1100,
        },
      },
      h(
        'div',
        { style: { display: 'flex', fontSize, fontWeight, color: '#000000' } },
        text,
      ),
      h('div', {
        style: { display: 'flex', width: 3, height: 44, backgroundColor: '#FF0000' },
      }),
    ),
  )
})

const el = h(
  'div',
  {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      position: 'relative',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Vazirmatn',
    },
  },
  children,
)

const H = ITEMS.length * ROW
const res = new ImageResponse(el, { width: 1100, height: H, fonts })
const png = Buffer.from(await res.arrayBuffer())
mkdirSync(path.join(projectRoot, 'scripts'), { recursive: true })
writeFileSync(path.join(projectRoot, 'scripts', '_measure.png'), png)
console.log(`wrote scripts/_measure.png ${png.length} bytes`)
console.log(ITEMS.map(([n]) => n).join('\n'))