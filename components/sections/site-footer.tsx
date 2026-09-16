import { Send, MessageCircle, Phone, Mail, Heart } from 'lucide-react'
import { LogoMark } from '@/components/logo'

const columns = [
  {
    title: 'دسترسی سریع',
    links: ['خانه', 'دوره‌ها', 'مقالات', 'درباره ما', 'تماس با ما'],
  },
  {
    title: 'دوره‌ها',
    links: [
      'روان‌درمانی شناختی',
      'مشاوره خانواده',
      'روانشناسی معنوی',
      'مهارت‌های زندگی',
      'تربیت فرزند',
    ],
  },
  {
    title: 'خدمات',
    links: ['مشاوره فردی', 'مشاوره خانواده', 'کارگاه‌های آموزشی', 'گواهینامه‌ها'],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-footer text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand */}
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
              {[Send, MessageCircle, Phone, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#contact"
                  aria-label="شبکه اجتماعی"
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:bg-gold hover:text-green-deep"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:text-gold"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-white/50 sm:flex-row sm:px-6 sm:text-right lg:px-8">
          <p>© ۱۴۰۴ موسسه یاوران سلامت روان. تمامی حقوق محفوظ است.</p>
          <p className="inline-flex items-center gap-1.5">
            طراحی و توسعه با
            <Heart className="size-3.5 fill-red-brand text-red-brand" />
            برای سلامت روان جامعه
          </p>
        </div>
      </div>
    </footer>
  )
}
