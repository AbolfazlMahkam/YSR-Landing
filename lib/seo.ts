import { siteConfig } from './site'

export function absoluteUrl(path = '/') {
  const normalized = path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`
  return new URL(normalized, siteConfig.url).toString()
}
