import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { LogoMark } from '@/components/logo'
import { courses } from '@/lib/courses'
import { siteConfig } from '@/lib/site'

const columns = [
  {
    title: 'دسترسی سریع',
    links: [
      { label: 'خانه', href: '/' },
      { label: 'دوره‌ها', href: '/courses' },
      { label: 'مقالات', href: '/blog' },
      { label: 'درباره ما', href: '/about' },
      { label: 'تماس با ما', href: '/contact' },
    ],
  },
  {
    title: 'دوره‌ها',
    links: [
      { label: 'روان‌درمانی شناختی', href: '/courses/cbt-psychotherapy' },
      { label: 'مشاوره خانواده', href: '/courses/family-counseling' },
      { label: 'روانشناسی معنوی', href: '/courses/spiritual-psychology' },
      { label: 'تربیت فرزند', href: '/courses/conscious-parenting' },
      { label: 'روان‌سنجی بالینی', href: '/courses/clinical-psychometrics' },
    ],
  },
  {
    title: 'خدمات',
    links: [
      { label: 'مشاوره فردی', href: '/contact' },
      { label: 'مشاوره خانواده', href: '/contact' },
      { label: 'کارگاه‌های آموزشی', href: '/courses' },
      { label: 'گواهینامه‌ها', href: '/courses' },
    ],
  },
]

const socials = [
  { icon: Send, label: 'تلگرام', href: siteConfig.sameAs[0] },
  { icon: Send, label: 'ایتا', href: siteConfig.sameAs[1] },
  { icon: Phone, label: 'تماس', href: `tel:${siteConfig.phoneE164}` },
  { icon: Mail, label: 'ایمیل', href: `mailto:${siteConfig.email}` },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-footer text-white/70">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-green-main text-gold">
                <LogoMark className="size-7" />
              </span>
              <span className="text-lg font-extrabold text-white">
                یاوران سلامت روان
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-8">
              موسسه آموزشی و پژوهشی یاوران سلامت روان، در مسیر پیوند دانش نوین
              روانشناسی و حکمت اصیل اسلامی، همراه شما در راه آرامش و رشد پایدار.
            </p>

            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin
                  className="mt-1 size-4 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <span className="leading-7">{siteConfig.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneE164}`}
                  dir="ltr"
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:bg-gold hover:text-green-deep"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-bold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-10 text-xs text-white/40">
          {courses.length} دوره تخصصی فعال — همه دوره‌ها با گواهی معتبر و امکان
          شرکت حضوری یا آنلاین.
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-white/50 sm:flex-row sm:px-6 sm:text-right lg:px-8">
          <p>تمام حقوق این سایت برای موسسه یاوران سلامت روان محفوظ است. ©</p>
          <p className="inline-flex items-center gap-1.5">
            طراحی و توسعه توسط
            <a
              href="https://abolfazlmahkam.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold transition-colors hover:text-white"
            >
              a.mahkam.950
            </a>
            <Image
              src="/images/a.mahkam.950.png"
              alt=""
              width={180}
              height={180}
              className="size-6"
            />
          </p>
        </div>
      </div>
    </footer>
  )
}
