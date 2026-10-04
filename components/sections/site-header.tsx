'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { ctaLink, navLinks } from '@/lib/nav'

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  // The mobile menu stores the route it was opened on, so navigating to a new
  // route closes it without an extra effect.
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const open = menuPath === pathname
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const dur = (n: number) => (reduce ? 0.0001 : n)
  const bezier = (a: number, b: number, c: number, d: number) =>
    [a, b, c, d] as [number, number, number, number]

  // On the landing page the nav jumps to the matching section; elsewhere it
  // navigates to the dedicated page.
  const hrefFor = (href: string, section: string) =>
    isHome ? `${href}#${section}` : href

  const ctaHref = hrefFor(ctaLink.href, 'contact')

  const menuVariants: Variants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: dur(0.25), ease: bezier(0.4, 0, 0.2, 1) },
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: { duration: dur(0.35), ease: bezier(0.22, 1, 0.36, 1) },
    },
  }

  const listVariants: Variants = {
    closed: { transition: { staggerChildren: dur(0.05), staggerDirection: -1 } },
    open: { transition: { staggerChildren: dur(0.08), delayChildren: dur(0.05) } },
  }

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 8 },
    open: { opacity: 1, y: 0, transition: { duration: dur(0.25) } },
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuPath(null)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeAndFocus = useCallback(() => {
    setMenuPath(null)
    triggerRef.current?.focus()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-300 sm:px-6`}
      role="banner"
    >
      <nav
        aria-label="منوی اصلی"
        className={`mx-auto flex max-w-7xl flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'border-gold/30 mt-3 bg-cream/80 shadow-sm backdrop-blur-md'
            : 'border-white/15 mt-3 bg-white/10 shadow-lg shadow-black/10 backdrop-blur-md'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" aria-label="یاوران سلامت روان — بازگشت به صفحه اصلی">
            <Logo light={!scrolled} />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex" role="list">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={hrefFor(link.href, link.section)}
                    aria-current={active ? 'page' : undefined}
                    className={`text-sm font-medium transition-colors ${
                      active
                        ? scrolled
                          ? 'text-green-main'
                          : 'text-gold'
                        : scrolled
                          ? 'text-text-mid hover:text-green-main'
                          : 'text-white hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href={ctaHref}
              className={`hidden rounded-full border border-gold px-6 py-2.5 text-sm font-semibold transition-colors lg:inline-block ${
                scrolled
                  ? 'text-green-deep hover:bg-gold hover:text-white'
                  : 'text-white hover:bg-gold hover:text-white'
              }`}
            >
              {ctaLink.label}
            </Link>
            <button
              type="button"
              ref={triggerRef}
              onClick={() => setMenuPath(open ? null : pathname)}
              className={`grid size-11 place-items-center rounded-lg transition-colors lg:hidden ${
                scrolled
                  ? 'text-green-deep hover:bg-green-mist'
                  : 'text-white hover:bg-white/15'
              }`}
              aria-label={open ? 'بستن منو' : 'باز کردن منو'}
              aria-expanded={open}
              aria-controls={open ? 'mobile-menu' : undefined}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-menu"
              ref={menuRef}
              id="mobile-menu"
              role="dialog"
              aria-label="منوی موبایل"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden lg:hidden"
            >
              <div
                className={`border-t px-4 pb-5 pt-2 sm:px-6 ${
                  scrolled ? 'border-gold/20' : 'border-white/15'
                }`}
              >
                <motion.ul
                  variants={listVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex flex-col gap-1"
                  role="list"
                >
                  {navLinks.map((link) => {
                    const active = pathname === link.href
                    return (
                      <motion.li key={link.href} variants={itemVariants}>
                        <Link
                          href={hrefFor(link.href, link.section)}
                          onClick={closeAndFocus}
                          aria-current={active ? 'page' : undefined}
                          className={`block rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                            scrolled
                              ? 'text-text-dark hover:bg-green-mist hover:text-green-main'
                              : 'text-white hover:bg-white/15 hover:text-gold'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    )
                  })}
                  <motion.li variants={itemVariants} className="mt-2">
                    <Link
                      href={ctaHref}
                      onClick={closeAndFocus}
                      className={`block rounded-full border border-gold px-6 py-3 text-center text-sm font-semibold transition-colors ${
                        scrolled
                          ? 'text-green-deep hover:bg-gold hover:text-white'
                          : 'text-white hover:bg-gold hover:text-white'
                      }`}
                    >
                      {ctaLink.label}
                    </Link>
                  </motion.li>
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
