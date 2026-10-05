import Link from 'next/link'
import { ArrowLeft, Home, Phone } from 'lucide-react'
import { IslamicOrnament } from '@/components/islamic-ornament'
import { Reveal } from '@/components/reveal'
import { SiteHeader } from '@/components/sections/site-header'
import { SiteFooter } from '@/components/sections/site-footer'
import { siteConfig } from '@/lib/site'

const suggestions = [
  { label: 'دوره‌های آموزشی', href: '/courses' },
  { label: 'مقالات و یادداشت‌ها', href: '/blog' },
  { label: 'درباره موسسه', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
]

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="page-content">
        <section className="relative overflow-hidden bg-green-deep pt-32 pb-24 text-white sm:pt-40 sm:pb-32">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-green-deep via-green-deep to-[#123f28]" />
          <div
            className="pointer-events-none absolute -left-24 -top-24 text-gold/10"
            aria-hidden="true"
          >
            <IslamicOrnament className="size-80" />
          </div>
          <div
            className="pointer-events-none absolute -bottom-24 -right-20 text-green-light/8"
            aria-hidden="true"
          >
            <IslamicOrnament className="size-72" />
          </div>

          <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-6xl font-extrabold text-gold sm:text-7xl" dir="ltr">
              404
            </p>
            <h1 className="mt-6 text-balance text-3xl font-extrabold sm:text-4xl">
              این صفحه پیدا نشد
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-8 text-white/75">
              ممکن است نشانی را اشتباه وارد کرده باشید یا صفحه‌ای که به دنبال آن
              بودید جابه‌جا شده باشد. از میان‌برهای زیر ادامه دهید.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-green-deep transition-transform hover:scale-[1.03] sm:w-auto"
              >
                <Home className="size-4" aria-hidden="true" />
                بازگشت به صفحه اصلی
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <a
                href={`tel:${siteConfig.phoneE164}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold transition-colors hover:bg-white/10 sm:w-auto"
              >
                <Phone className="size-4 text-gold" aria-hidden="true" />
                تماس با موسسه
              </a>
            </div>

            <Reveal delay={0.1}>
              <ul className="mt-12 flex flex-wrap items-center justify-center gap-3">
                {suggestions.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 transition-colors hover:border-gold hover:text-gold"
                    >
                      {s.label}
                      <ArrowLeft className="size-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
