import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Award,
  CalendarDays,
  Check,
  Clock,
  GraduationCap,
  MonitorPlay,
  Phone,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { Accordion } from '@/components/accordion'
import { CtaBand } from '@/components/cta-band'
import { CourseCard } from '@/components/pages/course-card'
import { EnrollForm } from '@/components/pages/enroll-form'
import { InitialsAvatar } from '@/components/pages/initials-avatar'
import { courses, getCourse, getRelatedCourses } from '@/lib/courses'
import { siteConfig } from '@/lib/site'

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const course = getCourse(slug)

  if (!course) {
    return { title: 'دوره یافت نشد' }
  }

  return {
    title: `${course.title} | دوره‌های آموزشی`,
    description: `${course.summary} مدت دوره: ${course.duration}، سطح ${course.level}، شیوه برگزاری: ${course.modes.join(' و ')}.`,
    alternates: {
      canonical: `/courses/${course.slug}`,
      languages: { 'fa-IR': `/courses/${course.slug}` },
    },
    openGraph: {
      type: 'article',
      url: `${siteConfig.url}/courses/${course.slug}`,
      title: `${course.title} | ${siteConfig.name}`,
      description: course.summary,
      images: [{ url: course.image }],
    },
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = getCourse(slug)

  if (!course) notFound()

  const related = getRelatedCourses(course)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.summary,
    inLanguage: 'fa-IR',
    provider: {
      '@type': 'EducationalOrganization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    educationalLevel: course.level,
    timeRequired: `PT${course.durationHours}H`,
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      price: course.priceToman,
      priceCurrency: 'IRR',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/courses/${course.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: course.ratingValue,
      reviewCount: course.reviews,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title={course.title}
        description={course.summary}
        crumbs={[
          { label: 'خانه', href: '/' },
          { label: 'دوره‌ها', href: '/courses' },
          { label: course.category },
        ]}
        tone="cream"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: Clock, label: course.duration },
            { icon: GraduationCap, label: course.level },
            { icon: MonitorPlay, label: course.modes.join(' و ') },
            {
              icon: Star,
              label: `${course.rating} از ۵ (${course.reviews} نظر)`,
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur-sm"
              >
                <Icon className="size-4 text-gold" aria-hidden="true" />
                {item.label}
              </span>
            )
          })}
        </div>
      </PageHero>

      <section className="relative bg-cream py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {/* Main column */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="rounded-3xl border border-gold/15 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-extrabold text-green-deep">
                  معرفی دوره
                </h2>
                <p className="mt-5 text-pretty leading-8 text-text-mid">
                  {course.intro}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-8 grid gap-4 rounded-3xl border border-gold/15 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
                {[
                  {
                    icon: Clock,
                    label: 'مدت و جلسات',
                    value: `${course.duration} · ${course.sessions} جلسه`,
                  },
                  {
                    icon: Users,
                    label: 'شرکت‌کنندگان',
                    value: `${course.students} دانش‌پژوه`,
                  },
                  {
                    icon: GraduationCap,
                    label: 'سطح دوره',
                    value: course.level,
                  },
                  {
                    icon: MonitorPlay,
                    label: 'شیوه برگزاری',
                    value: course.modes.join(' و '),
                  },
                  {
                    icon: CalendarDays,
                    label: 'شروع دوره بعدی',
                    value: course.nextStart,
                  },
                  {
                    icon: Award,
                    label: 'گواهینامه',
                    value: course.certificate,
                  },
                ].map((row) => {
                  const Icon = row.icon
                  return (
                    <div key={row.label} className="flex items-start gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-green-mist text-green-main">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-xs text-text-mid">{row.label}</dt>
                        <dd className="mt-1 text-sm font-bold text-text-dark">
                          {row.value}
                        </dd>
                      </div>
                    </div>
                  )
                })}
              </dl>
            </Reveal>

            {/* Outcomes */}
            <div className="mt-12">
              <SectionHeading
                align="start"
                title="با این دوره چه چیزهایی به دست می‌آورید؟"
                description="پس از گذراندن دوره، می‌توانید انتظار داشته باشید که:"
              />
              <ul className="mt-8 space-y-4">
                {course.outcomes.map((item, i) => (
                  <li key={item}>
                    <Reveal delay={0.05 * i}>
                      <div className="flex items-start gap-3 rounded-2xl border border-gold/15 bg-white px-5 py-4 shadow-sm">
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-green-main text-white">
                          <Check className="size-4" aria-hidden="true" />
                        </span>
                        <span className="leading-7 text-text-dark">{item}</span>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            {/* Syllabus */}
            <div className="mt-12">
              <SectionHeading
                align="start"
                title="سرفصل‌های دوره"
                description={`این دوره در ${course.sessions} جلسه و با ${course.duration} آموزش تخصصی ارائه می‌شود.`}
              />
              <div className="mt-8">
                <Accordion
                  defaultOpen={0}
                  items={course.syllabus.map((mod, i) => ({
                    title: mod.title,
                    meta: `جلسه ${i + 1} از ${course.sessions}`,
                    content: (
                      <ul className="space-y-2.5">
                        {mod.topics.map((topic) => (
                          <li key={topic} className="flex items-start gap-2.5">
                            <span className="mt-2 size-1.5 shrink-0 rotate-45 rounded-[2px] bg-gold" />
                            <span className="leading-7">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    ),
                  }))}
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="mt-12">
              <SectionHeading align="start" title="پیش‌نیازهای دوره" />
              <ul className="mt-8 space-y-4">
                {course.requirements.map((item, i) => (
                  <li key={item}>
                    <Reveal delay={0.05 * i}>
                      <div className="flex items-start gap-3 rounded-2xl border border-gold/15 bg-white px-5 py-4 shadow-sm">
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-lavender/15 text-lavender">
                          <ShieldCheck className="size-4" aria-hidden="true" />
                        </span>
                        <span className="leading-7 text-text-dark">{item}</span>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructor */}
            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-col items-start gap-5 rounded-3xl border border-gold/15 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
                <InitialsAvatar
                  initials={course.instructor.initials}
                  name={course.instructor.name}
                  className="size-20 text-lg"
                />
                <div>
                  <p className="text-xs font-medium text-gold-deep">
                    مدرس دوره
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-green-deep">
                    {course.instructor.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-text-dark">
                    {course.instructor.role}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-text-mid">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28" aria-label="ثبت‌نام در دوره">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-gold/20 bg-white p-6 shadow-xl shadow-green-deep/5">
                <p className="text-xs text-text-mid">شهریه دوره</p>
                <p className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-green-deep">
                    {course.price}
                  </span>
                  <span className="text-sm text-text-mid">تومان</span>
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-semibold text-gold-deep">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  ظرفیت محدود — شروع {course.nextStart}
                </p>

                <div className="mt-6 border-t border-gold/15 pt-6">
                  <EnrollForm
                    courseTitle={course.title}
                    modes={course.modes}
                  />
                </div>

                <a
                  href={`tel:${siteConfig.phoneE164}`}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-green-main px-5 py-3 text-sm font-bold text-green-deep transition-colors hover:bg-green-main hover:text-white"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="relative bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="start"
            title="دوره‌های مرتبط"
            description="اگر به دنبال مسیر دیگری هستید، این دوره‌ها می‌توانند مکمل خوبی باشند."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c, i) => (
              <CourseCard key={c.slug} course={c} delay={i * 0.1} />
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-full border border-green-main px-8 py-3.5 text-sm font-bold text-green-deep transition-colors hover:bg-green-main hover:text-white"
              >
                مشاهده همه دوره‌ها
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="در انتخاب دوره تردید دارید؟"
        description="پیش از ثبت‌نام، یک جلسه مشاوره رایگان با کارشناسان ما داشته باشید تا با خیال آسوده انتخاب کنید."
      />
    </>
  )
}
