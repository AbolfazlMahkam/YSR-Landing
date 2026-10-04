/**
 * Renders the Open Graph card to public/og-image.png.
 *
 * Why a build step instead of the app/opengraph-image.tsx file convention:
 * this site is built with output: 'export' for GitHub Pages, which emits
 * metadata image routes as extension-less files (out/opengraph-image). GitHub
 * Pages then serves those as application/octet-stream and Twitter/X refuse to
 * render them. A real .png in public/ is served as image/png.
 *
 * Run via `npm run build` (wired into the build script) — not on its own.
 */
import { createRequire } from 'node:module'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const projectRoot = process.cwd()
const require = createRequire(path.join(projectRoot, 'package.json'))
const cacheDir = path.join(projectRoot, 'node_modules', '.cache', 'ysr-og')

/**
 * Transpiles a project TypeScript module to CommonJS inside the cache dir so
 * `require` can still resolve `next`, `react` and friends from node_modules.
 * Keeping the source in .tsx means it stays under `tsc --noEmit` in CI.
 */
function loadTsModule(relativeSource, outName) {
  const source = path.join(projectRoot, relativeSource)
  const { outputText } = ts.transpileModule(readFileSync(source, 'utf8'), {
    fileName: source,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  })
  mkdirSync(cacheDir, { recursive: true })
  const outFile = path.join(cacheDir, outName)
  writeFileSync(outFile, outputText)
  delete require.cache[require.resolve(outFile)]
  return require(outFile)
}

const { siteConfig } = loadTsModule('lib/site.ts', 'site.cjs')
const { renderOgCard, ogSize } = loadTsModule('lib/og/card.tsx', 'card.cjs')

const png = Buffer.from(await renderOgCard(siteConfig.url).arrayBuffer())

const target = path.join(projectRoot, 'public', 'og-image.png')
writeFileSync(target, png)
console.log(
  `og-image: wrote public/og-image.png (${ogSize.width}x${ogSize.height}, ${png.length} bytes)`,
)