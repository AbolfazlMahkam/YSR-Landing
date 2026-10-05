/**
 * The large geometric rosette from `public/big-islamic.svg`, used as a
 * decorative background shape (the slowly rotating elements in the hero, page
 * heroes, CTA band and contact section).
 *
 * Rendered as a CSS mask rather than inlined SVG so the artwork stays one
 * cached file instead of ~7KB of path data in the JS bundle, and so it can be
 * tinted with `currentColor` — set the colour on the parent wrapper, e.g.
 * `<div className="text-gold/10"><IslamicOrnament className="size-80" /></div>`.
 */
export function IslamicOrnament({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`islamic-ornament ${className}`} />
}