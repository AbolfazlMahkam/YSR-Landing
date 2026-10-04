export interface NavLink {
  label: string
  href: string
  /** anchor of the matching block on the landing page, used when already on `/` */
  section: string
}

export const navLinks: NavLink[] = [
  { label: 'خانه', href: '/', section: 'home' },
  { label: 'دوره‌ها', href: '/courses', section: 'courses' },
  { label: 'مقالات', href: '/blog', section: 'blog' },
  { label: 'درباره ما', href: '/about', section: 'about' },
  { label: 'تماس', href: '/contact', section: 'contact' },
]

// Members area lives on its own host, so it is always an absolute URL and never
// goes through the landing-page anchor logic.
export const panelLink = { label: 'ورود', href: 'https://panel.rohanian-ysr.ir' }
