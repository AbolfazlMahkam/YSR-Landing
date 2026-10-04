import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Mandala } from '@/components/mandala'
import { StarDivider } from '@/components/star-divider'

const waveTones = {
  cream: 'text-cream',
  white: 'text-white',
  mist: 'text-green-mist',
} as const

export type PageHeroTone = keyof typeof waveTones

export interface Crumb {
  label: string
  href?: string
}

export function PageHero({
  title,
  description,
  crumbs = [],
  tone = 'cream',
  children,
}: {
  title: string
  description?: string
  crumbs?: Crumb[]
  tone?: PageHeroTone
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-green-deep pt-32 pb-20 text-white sm:pt-40 sm:pb-24">
      <div className="islamic-pattern-gold pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-green-deep via-green-deep to-[#123f28]" />

      <div
        className="pointer-events-none absolute -left-28 -top-20 rotate-12 text-gold/15"
        aria-hidden="true"
      >
        <Mandala className="size-80" />
      </div>
      <div
        className="pointer-events-none absolute -bottom-24 -right-16 -rotate-12 text-green-light/10"
        aria-hidden="true"
      >
        <Mandala className="size-72" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {crumbs.length > 0 && (
          <nav aria-label="مسیر صفحه" className="mb-6">
            <ol className="flex flex-wrap items-center justify-center gap-1 text-xs text-white/60">
              {crumbs.map((crumb, i) => {
                const isLast = i === crumbs.length - 1
                return (
                  <li key={crumb.label} className="flex items-center gap-1">
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-gold"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current={isLast ? 'page' : undefined}>
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && (
                      <ChevronLeft
                        className="size-3.5 text-gold/50"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}

        <StarDivider />
        <h1 className="mt-4 text-balance text-3xl font-extrabold leading-[1.3] text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-white/75">
            {description}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </div>

      <svg
        className={`pointer-events-none absolute -bottom-px left-0 w-full ${waveTones[tone]}`}
        viewBox="0 0 1440 80"
        fill="currentColor"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 80V40C240 10 480 0 720 20C960 40 1200 60 1440 30V80Z" />
      </svg>
    </section>
  )
}
