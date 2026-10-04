import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookMarked,
  CalendarCheck,
  FileCheck2,
  MonitorPlay,
  Users,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { Accordion } from '@/components/accordion'
import { CtaBand } from '@/components/cta-band'
import { CourseCatalog } from '@/components/pages/course-catalog'
import { courseStats, courses } from '@/lib/courses'
import { faqs } from '@/lib/faq'
import { siteConfig } from '@/lib/site'
import { formatNumber } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'دوره‌های آموزشی روان‌شناسی | دوره‌های تخصصی یاوران سلامت روان',
  description:
    'فهرست دوره‌های تخصصی موسسه یاوران سلامت روان در قم: روان‌درمانی شناختی-رفتاری، مشاوره خانواده، روان‌شناسی اسلامی، تربیت فرزند، مدیریت استرس و روان‌سنجی بالینی با گواهی معتبر و امکان شرکت حضوری یا آنلاین.',
  alternates: {
    canonical: '/courses',
    languages: { 'fa-IR': '/courses' },
  },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/courses`,
    title: 'دوره‌های آموزشی روان‌شناسی | یاوران سلامت روان',
    description:
      'دوره‌های تخصصی روان‌شناسی و مشاوره با گواهی معتبر، حضوری و آنلاین، در قم و سراسر کشور.',
  },
}

const steps = [
  {
    icon: FileCheck2,
    title: 'ثبت‌نام و مشاوره',
    desc: 'فرم ثبت‌نام را تکمیل می‌کنید و مشاور آموزشی برای شما وقت رزرو می‌کند.',
  },
  {
    icon: CalendarCheck,
    title: 'انتخاب شیوه شرکت',
    desc: 'حضوری در قم یا آنلاین؛ دوره‌ها با تقویم مشخص از پیش اعلام می‌شوند.',
  },
  {
    icon: BookMarked,
    title: 'آموزش همراه با تمرین',
    desc: 'ارائه ماده آموزشی، تمرین‌های کلاسی و بازخورد مستمر استاد در هر جلسه.',
  },
  {
    icon: Award,
    title: 'صدور گواهینامه',
    desc: 'پس از اتمام دوره و گذراندن ارزیابی پایانی، گواهینامه قابل استعلام صادر می‌شود.',
  },
]

const courseFaqs = faqs.filter((f) =>
  [
    'دوره‌های آموزشی موسسه چه گواهی‌ای دارند؟',
    'دوره‌ها حضوری برگزار می‌شوند یا آنلاین؟',
    'روانشناسی اسلامی چه تفاوتی با روانشناسی رایج دارد؟',
    'چگونه می‌توانم برای مشاوره فردی یا خانواده وقت بگیرم؟',
  ].includes(f.question),
)

export default function CoursesPage() {
  const totalHours = courses.reduce((sum, c) => sum + c.durationHours, 0)
  const totalStudents = courses.reduce((sum, c) => sum + c.studentsCount, 0)
  const onlineCount = courses.filter((c) => c.modes.includes('آنلاین')).length

  return (
    <>
      <PageHero
        title="دوره‌های آموزشی تخصصی"
        description="مجموعه‌ای از دوره‌های علمی و کاربردی در حوزه روان‌شناسی، مشاوره خانواده و روان‌شناسی اسلامی؛ برای رشد فردی، خانوادگی و حرفه‌ای شما."
        crumbs={[{ label: 'خانه', href: '/' }, { label: 'دوره‌ها' }]}
        tone="cream"
      />

      {/* Quick facts */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-gold/20 bg-white p-6 shadow-xl shadow-green-deep/5 sm:p-8 lg:grid-cols-4">
            {courseStats.map((s, i) => (
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

      {/* Catalog */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="همه دوره‌ها"
            description="برای مشاهده جزئیات کامل هر دوره، سرفصل‌ها و ثبت‌نام، روی عنوان دوره کلیک کنید."
          />
          <div className="mt-12">
            <CourseCatalog />
          </div>
        </div>
      </section>

      {/* Teaching process */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="islamic-pattern pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="مسیر یادگیری در موسسه چگونه است؟"
            description="از ثبت‌نام تا دریافت گواهینامه، در هر مرحله همراه شما هستیم."
          />

          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <li key={s.title}>
                  <Reveal delay={i * 0.1}>
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-gold/15 bg-cream p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl hover:shadow-green-deep/10">
                      <span
                        className="absolute -left-2 -top-3 text-6xl font-extrabold text-gold/10"
                        dir="ltr"
                      >
                        {i + 1}
                      </span>
                      <span className="relative grid size-14 place-items-center rounded-2xl bg-green-deep text-gold transition-colors group-hover:bg-gold group-hover:text-green-deep">
                        <Icon className="size-7" />
                      </span>
                      <h3 className="relative mt-5 text-lg font-bold text-text-dark">
                        {s.title}
                      </h3>
                      <p className="relative mt-3 text-sm leading-7 text-text-mid">
                        {s.desc}
                      </p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>

          <Reveal delay={0.2}>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { icon: MonitorPlay, value: `${onlineCount} دوره`, label: 'قابل شرکت آنلاین' },
                { icon: Users, value: `${formatNumber(totalStudents)}+`, label: 'دانش‌پژوه در این دوره‌ها' },
                { icon: BookMarked, value: `${totalHours} ساعت`, label: 'مجموع ساعات آموزش' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-2xl border border-gold/15 bg-cream px-5 py-4"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-green-mist text-green-main">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-extrabold text-green-deep">
                        {item.value}
                      </p>
                      <p className="text-xs text-text-mid">{item.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-green-mist py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="پرسش‌های پرتکرار"
            description="پاسخ برخی از پرتکرارترین پرسش‌های شما درباره دوره‌های آموزشی."
          />
          <div className="mt-12">
            <Accordion
              defaultOpen={0}
              items={courseFaqs.map((f) => ({
                title: f.question,
                content: <p className="leading-7">{f.answer}</p>,
              }))}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="mt-8 text-center text-sm text-text-mid">
              پرسش دیگری دارید؟{' '}
              <Link
                href="/contact"
                className="font-bold text-green-main underline-offset-4 hover:underline"
              >
                با ما تماس بگیرید
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="هنوز دوره مناسب خود را پیدا نکرده‌اید؟"
        description="کارشناسان ما رایگان راهنمایی می‌کنند تا بر پایه نیاز و پیشینه شما، مناسب‌ترین دوره را پیشنهاد دهند."
      />
    </>
  )
}
