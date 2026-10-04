import Link from 'next/link'
import { ArrowLeft, Phone } from 'lucide-react'
import { Mandala } from '@/components/mandala'
import { Reveal } from '@/components/reveal'
import { siteConfig } from '@/lib/site'

export function CtaBand({
  title = 'برای شروع آماده‌اید؟',
  description = 'کارشناسان ما رایگان راهنمایی می‌کنند تا دوره متناسب با نیاز شما را انتخاب کنید.',
  primaryLabel = 'مشاوره رایگان',
  primaryHref = '/contact',
  secondaryLabel = 'تماس مستقیم',
}: {
  title?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
}) {
  return (
    <section className="relative overflow-hidden bg-green-deep py-20 text-white sm:py-24">
      <div className="islamic-pattern-gold pointer-events-none absolute inset-0 opacity-[0.1]" />
      <div
        className="pointer-events-none absolute -left-20 -top-20 text-gold/10"
        aria-hidden="true"
      >
        <Mandala className="size-80" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-balance text-3xl font-extrabold sm:text-4xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-8 text-white/75">
            {description}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={primaryHref}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-green-deep shadow-lg shadow-black/20 transition-transform hover:scale-[1.03] sm:w-auto"
            >
              {primaryLabel}
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </Link>
            <a
              href={`tel:${siteConfig.phoneE164}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              <Phone className="size-4 text-gold" />
              {secondaryLabel}: {siteConfig.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
