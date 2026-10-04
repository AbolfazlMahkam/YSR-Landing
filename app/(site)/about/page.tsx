import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  BookMarked,
  Check,
  Compass,
  HandHeart,
  HeartHandshake,
  Quote,
  Sparkles,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CtaBand } from '@/components/cta-band'
import { InitialsAvatar } from '@/components/pages/initials-avatar'
import { courses } from '@/lib/courses'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'درباره موسسه یاوران سلامت روان',
  description:
    'موسسه آموزشی و پژوهشی یاوران سلامت روان در قم؛ با تکیه بر پیوند روان‌شناسی علمی و معارف اسلامی، میزبان بیش از ۱۲٬۰۰۰ دانش‌پژوه و دانشجوی مشاوره و روان‌شناسی. با تیم مدرسان و ارزش‌های موسسه آشنا شوید.',
  alternates: {
    canonical: '/about',
    languages: { 'fa-IR': '/about' },
  },
  openGraph: {
    type: 'profile',
    url: `${siteConfig.url}/about`,
    title: 'درباره موسسه یاوران سلامت روان',
    description: siteConfig.description,
  },
}

const values = [
  {
    icon: Compass,
    title: 'اصالت در محتوا',
    desc: 'هر مطلب آموزشی ما از دل منابع معتبر روان‌شناسی و متون اصیل اسلامی استخراج و بازبینی می‌شود.',
  },
  {
    icon: HandHeart,
    title: 'همدلی در آموزش',
    desc: 'دانش‌پژو برای ما یک عدد نیست؛ هر شرکت‌کننده با شرایط و مسیر خاص خود دیده می‌شود.',
  },
  {
    icon: HeartHandshake,
    title: 'همراهی پس از دوره',
    desc: 'پشتیبانی آموزشی و مشاوره‌ای ما با اتمام دوره پایان نمی‌یابد و تا رسیدن به نتیجه ادامه دارد.',
  },
  {
    icon: Sparkles,
    title: 'شفافیت و صداقت',
    desc: 'هزینه‌ها، سرفصل‌ها و شیوه ارزیابی از پیش و به‌صورت شفاف اعلام می‌شود؛ بدون وعده‌های اغراق‌آمیز.',
  },
]

const timeline = [
  {
    year: '۱۳۸۹',
    title: 'تأسیس موسسه',
    desc: 'شروع کار با یک کلاس کوچک مشاوره خانواده در بلوار امین قم.',
  },
  {
    year: '۱۳۹۲',
    title: 'نخستین دوره‌های حضوری',
    desc: 'برگزاری دوره‌های روان‌شناسی شناختی-رفتاری و روان‌شناسی اسلامی با استقبال گسترده.',
  },
  {
    year: '۱۳۹۶',
    title: 'آموزش آنلاین',
    desc: 'راه‌اندازی کلاس‌های آنلاین و پوشش دانش‌پژویان سراسر کشور.',
  },
  {
    year: '۱۴۰۰',
    title: 'مرکز مشاوره تخصصی',
    desc: 'راه‌اندازی خدمات مشاوره فردی، زوج و خانواده در فضای مستقر در قم.',
  },
  {
    year: '۱۴۰۴',
    title: 'بیش از ۸۵ دوره تخصصی',
    desc: 'گسترش سبد آموزشی و پیوستن به بیش از ۱۲٬۰۰۰ دانش‌پژوه به جمع موسسه.',
  },
]

const stats = [
  { value: '۱۲٬۰۰۰+', label: 'دانش‌پژوه' },
  { value: '۸۵+', label: 'دوره تخصصی' },
  { value: '۴۰+', label: 'استاد مجرب' },
  { value: '۱۵', label: 'سال تجربه' },
]

export default function AboutPage() {
  const instructors = courses
    .map((c) => c.instructor)
    .filter(
      (inst, i, list) => list.findIndex((x) => x.name === inst.name) === i,
    )

  return (
    <>
      <PageHero
        title="موسسه‌ای برای رشد روان، در مسیر ایمان و آگاهی"
        description={`${siteConfig.name} با دو ستون دانش روان‌شناسی نوین و معارف عمیق اسلامی بنیان نهاده شده است تا آرامش پایدار، نه یک اتفاق گذرا، باشد.`}
        crumbs={[{ label: 'خانه', href: '/' }, { label: 'درباره ما' }]}
        tone="cream"
      />

      {/* Story */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
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
            <div className="islamic-pattern-gold absolute -left-4 -top-4 -z-10 size-40 rounded-2xl opacity-30" />
            <div className="absolute -bottom-6 right-6 rounded-2xl bg-green-deep px-6 py-4 text-white shadow-lg">
              <p className="text-2xl font-extrabold text-gold">۱۵ سال</p>
              <p className="text-xs text-white/80">اعتماد و تجربه</p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="start"
              title="داستان ما از یک کلاس کوچک شروع شد"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-pretty leading-8 text-text-mid">
                در سال ۱۳۸۹، چند مدرس با اتاقی کوچک و چند دانشجوی مشتاق، دوره‌ای
                درباره ارتباط زناشویی برگزار کردند. آن‌ها باور داشتند که آرامش
                روان، هم به دانش روز نیاز دارد و هم به معنا. همین باور، هسته
                امروز موسسه یاوران سلامت روان است.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 text-pretty leading-8 text-text-mid">
                امروز با تیمی از روان‌شناسان، مشاوران خانواده و مدرسان دارای
                پروانه فعالیت، دوره‌های حضوری و آنلاین برگزار می‌کنیم و در کنار
                آن، خدمات مشاوره‌ای فردی و خانوادگی ارائه می‌دهیم.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {[
                'تلفیق روش‌های علمی روان‌شناسی روز دنیا با آموزه‌های اصیل اسلامی',
                'اساتید مجرب دارای مدارک تخصصی و پروانه فعالیت',
                'دوره‌های حضوری و آنلاین با گواهی معتبر',
                'پشتیبانی و همراهی تخصصی پس از اتمام دوره',
              ].map((point, i) => (
                <li key={point}>
                  <Reveal delay={0.2 + i * 0.08}>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-green-main text-white">
                        <Check className="size-4" aria-hidden="true" />
                      </span>
                      <span className="leading-7 text-text-dark">{point}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal delay={0.5}>
              <Link
                href="/courses"
                className="mt-9 inline-flex rounded-full bg-green-main px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-deep"
              >
                مشاهده دوره‌های آموزشی
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 -mt-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-gold/20 bg-white p-6 shadow-xl shadow-green-deep/5 sm:p-8 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <span className="text-2xl font-extrabold text-green-deep sm:text-3xl">
                    {s.value}
                  </span>
                  <span className="text-sm font-medium text-text-mid">
                    {s.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-green-mist py-20 sm:py-28">
        <div className="islamic-pattern pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="ارزش‌هایی که به آن پایبندیم"
            description="چهار اصلی که تصمیم‌های آموزشی و درمانی ما بر پایه آن‌ها گرفته می‌شود."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div className="group h-full rounded-3xl border border-gold/15 bg-white p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl hover:shadow-green-deep/10">
                    <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-green-deep text-gold transition-colors group-hover:bg-gold group-hover:text-green-deep">
                      <Icon className="size-8" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-text-dark">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-text-mid">
                      {v.desc}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="مسیری که آمده‌ایم"
            description="از یک کلاس کوچک در قم تا موسسه‌ای با هزاران دانش‌پژوه."
          />

          <ol className="relative mt-14 space-y-8 border-r-2 border-dashed border-gold/30 pr-8">
            {timeline.map((item, i) => (
              <li key={item.year} className="relative">
                <Reveal delay={i * 0.08}>
                  <span className="absolute -right-[2.4rem] top-1 grid size-6 place-items-center rounded-full bg-green-deep ring-4 ring-white">
                    <span className="size-1.5 rotate-45 rounded-[2px] bg-gold" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold-deep">
                    {item.year}
                  </span>
                  <h3 className="mt-3 text-lg font-extrabold text-green-deep">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-7 text-text-mid">{item.desc}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="مدرسان و مشاوران موسسه"
            description="تیمی از متخصصان دارای مدرک تحصیلی و پروانه فعالیت."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {instructors.map((inst, i) => (
              <Reveal key={inst.name} delay={i * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-3xl border border-gold/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg">
                  <InitialsAvatar
                    initials={inst.initials}
                    name={inst.name}
                    className="size-14 text-base"
                  />
                  <div>
                    <h3 className="font-extrabold text-green-deep">
                      {inst.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-text-dark">
                      {inst.role}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-text-mid">
                      {inst.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <figure className="mt-12 rounded-3xl border border-gold/20 bg-green-mist p-8 text-center sm:p-10">
              <Quote className="mx-auto size-10 text-gold/50" aria-hidden="true" />
              <blockquote className="mx-auto mt-5 max-w-3xl text-pretty text-lg font-bold leading-9 text-green-deep sm:text-xl">
                آرامش پایدار در پیوند میان علم و معنویت یافت می‌شود؛ نه در یکی
                از آن دو.
              </blockquote>
              <figcaption className="mt-5 inline-flex items-center gap-2 text-sm text-text-mid">
                <BookMarked className="size-4 text-gold" aria-hidden="true" />
                {siteConfig.name}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="بیایید از نزدیک‌تر شروع کنیم"
        description="یک جلسه گفت‌وگوی رایگان با کارشناسان موسسه، نقطه آغاز مناسبی برای شناخت بهتر ماست."
      />
    </>
  )
}
