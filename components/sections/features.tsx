import { HeartHandshake, BookMarked, ShieldCheck, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { StarDivider } from '@/components/star-divider'

const features = [
  {
    icon: BookMarked,
    title: 'رویکرد علمی و اصیل',
    desc: 'محتوای دوره‌ها بر پایه معتبرترین منابع روانشناسی و متون اسلامی تدوین شده است.',
  },
  {
    icon: HeartHandshake,
    title: 'همراهی تخصصی',
    desc: 'در تمام مسیر یادگیری، مشاوران و اساتید ما در کنار شما خواهند بود.',
  },
  {
    icon: ShieldCheck,
    title: 'گواهی معتبر',
    desc: 'پس از اتمام هر دوره، گواهینامه رسمی و قابل استعلام دریافت می‌کنید.',
  },
  {
    icon: Sparkles,
    title: 'رشد پایدار',
    desc: 'تمرکز ما بر ایجاد تحول واقعی و پایدار در سلامت روان و کیفیت زندگی شماست.',
  },
]

export function Features() {
  return (
    <section className="relative overflow-hidden bg-green-mist py-20 sm:py-28">
      <div className="islamic-pattern pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StarDivider />
          <Reveal>
            <h2 className="mt-4 text-3xl font-extrabold text-green-deep sm:text-4xl">
              چرا موسسه یاوران سلامت روان؟
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 leading-8 text-text-mid">
              ما با تعهد به کیفیت و اصالت، تجربه‌ای متفاوت از آموزش روانشناسی
              ارائه می‌دهیم.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl border border-gold/15 bg-white p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl hover:shadow-green-deep/10">
                <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-green-deep text-gold transition-colors group-hover:bg-gold group-hover:text-green-deep">
                  <f.icon className="size-8" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-text-dark">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-text-mid">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
