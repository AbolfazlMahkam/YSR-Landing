import { Send, MessageCircle, Phone, Mail, Heart } from 'lucide-react'
import { LogoMark } from '@/components/logo'

const columns = [
  {
    title: 'دسترسی سریع',
    links: [
      { label: 'خانه', href: '#home' },
      { label: 'دوره‌ها', href: '#courses' },
      { label: 'مقالات', href: '#blog' },
      { label: 'درباره ما', href: '#about' },
      { label: 'تماس با ما', href: '#contact' },
    ],
  },
  {
    title: 'دوره‌ها',
    links: [
      { label: 'روان‌درمانی شناختی', href: '#courses' },
      { label: 'مشاوره خانواده', href: '#courses' },
      { label: 'روانشناسی معنوی', href: '#courses' },
      { label: 'مهارت‌های زندگی', href: '#courses' },
      { label: 'تربیت فرزند', href: '#courses' },
    ],
  },
  {
    title: 'خدمات',
    links: [
      { label: 'مشاوره فردی', href: '#contact' },
      { label: 'مشاوره خانواده', href: '#contact' },
      { label: 'کارگاه‌های آموزشی', href: '#courses' },
      { label: 'گواهینامه‌ها', href: '#courses' },
    ],
  },
]

const socials = [
  { icon: Send, label: 'تلگرام' },
  { icon: MessageCircle, label: 'واتس‌اپ' },
  { icon: Phone, label: 'تماس', href: 'tel:+982188881234' },
  { icon: Mail, label: 'ایمیل', href: 'mailto:info@yavaran-ravan.ir' },
]

export function SiteFooter() {
  return (
    <footer className="bg-footer text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href ?? '#contact'}
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
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-white/50 sm:flex-row sm:px-6 sm:text-right lg:px-8">
          <p>© ۱۴۰۴ موسسه یاوران سلامت روان. تمامی حقوق محفوظ است.</p>
          <p className="inline-flex items-center gap-1.5">
            طراحی و توسعه با
            <Heart className="size-3.5 fill-red-brand text-red-brand" aria-hidden="true" />
            برای سلامت روان جامعه
          </p>
        </div>
      </div>
    </footer>
  )
}