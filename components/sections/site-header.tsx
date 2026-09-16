'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'

const navLinks = [
  { label: 'خانه', href: '#home' },
  { label: 'دوره‌ها', href: '#courses' },
  { label: 'مقالات', href: '#blog' },
  { label: 'درباره ما', href: '#about' },
  { label: 'تماس', href: '#contact' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300`}
    >
      <nav
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? 'border-gold/30 mt-3 bg-cream/80 shadow-sm backdrop-blur-md' : 'border-white/15 mt-3 bg-white/10 shadow-lg shadow-black/10 backdrop-blur-md'
        }`}
      >
        {/* Logo on the right (first in RTL flow) */}
        <a href="#home" aria-label="یاوران سلامت روان">
          <Logo light={!scrolled} />
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-text-mid hover:text-green-main'
                    : 'text-white hover:text-gold'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className={`hidden rounded-full border border-gold px-6 py-2.5 text-sm font-semibold transition-colors lg:inline-block ${
              scrolled
                ? 'text-green-deep hover:bg-gold hover:text-white'
                : 'text-white hover:bg-gold hover:text-white'
            }`}
          >
            ورود
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`grid size-11 place-items-center rounded-lg transition-colors lg:hidden ${
              scrolled
                ? 'text-green-deep hover:bg-green-mist'
                : 'text-white hover:bg-white/15'
            }`}
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gold/20 bg-cream/95 backdrop-blur-md lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-text-dark transition-colors hover:bg-green-mist hover:text-green-main"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-green-main px-6 py-3 text-center text-sm font-semibold text-white"
              >
                ورود
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
