import Image from 'next/image'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { StarDivider } from '@/components/star-divider'

const points = [
  'تلفیق روش‌های علمی روانشناسی روز دنیا با آموزه‌های اصیل اسلامی',
  'اساتید مجرب دارای مدارک تخصصی و پروانه فعالیت',
  'دوره‌های حضوری و آنلاین با گواهی معتبر',
  'پشتیبانی و همراهی تخصصی پس از اتمام دوره',
]

export function About() {
  return (
    <section id="about" className="relative bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Image */}
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-gold/20 shadow-xl">
            <Image
              src="/images/institute.png"
              alt="فضای آموزشی موسسه یاوران سلامت روان"
              width={720}
              height={560}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-6 rounded-2xl bg-green-deep px-6 py-4 text-white shadow-lg">
            <p className="text-2xl font-extrabold text-gold">۱۵ سال</p>
            <p className="text-xs text-white/80">اعتماد و تجربه</p>
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <StarDivider className="justify-start" />
          <Reveal>
            <h2 className="mt-4 text-3xl font-extrabold leading-snug text-green-deep sm:text-4xl">
              موسسه‌ای برای رشد روان،
              <br />
              در مسیر ایمان و آگاهی
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-pretty leading-8 text-text-mid">
              موسسه یاوران سلامت روان با هدف ارتقای سلامت روان جامعه بر پایه
              دو ستون دانش روانشناسی نوین و معارف عمیق اسلامی بنیان نهاده شده
              است. ما باور داریم که آرامش پایدار در پیوند میان علم و معنویت
              یافت می‌شود.
            </p>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {points.map((p, i) => (
              <li key={p}>
                <Reveal delay={0.15 + i * 0.08}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-green-main text-white">
                      <Check className="size-4" />
                    </span>
                    <span className="leading-7 text-text-dark">{p}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={0.4}>
            <a
              href="/about"
              className="mt-9 inline-flex rounded-full bg-green-main px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-deep"
            >
              بیشتر بدانید
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
