import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CtaBand } from '@/components/cta-band'
import { PostCatalog } from '@/components/pages/post-catalog'
import { featuredPost } from '@/lib/blog'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'مقالات و یادداشت‌های روان‌شناسی',
  description:
    'مقالات، یادداشت‌ها و پژوهش‌های کاربردی موسسه یاوران سلامت روان در حوزه سلامت روان، خانواده، معنویت و مهارت‌های زندگی.',
  alternates: {
    canonical: '/blog',
    languages: { 'fa-IR': '/blog' },
  },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/blog`,
    title: 'مقالات و یادداشت‌های روان‌شناسی | یاوران سلامت روان',
    description:
      'مقالات و یادداشت‌های کاربردی در حوزه روان‌شناسی، خانواده و معنویت از سوی مدرسان موسسه یاوران سلامت روان.',
  },
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="مقالات و یادداشت‌ها"
        description="تجربه‌ها، تحلیل‌ها و راهکارهای عملی مدرسان و مشاوران موسسه، برای زندگی روزمره‌ای آرام‌تر و آگاهانه‌تر."
        crumbs={[{ label: 'خانه', href: '/' }, { label: 'مقالات' }]}
        tone="cream"
      />

      {/* Featured post */}
      <section className="bg-cream pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-xs font-bold text-gold-deep">
              <span className="size-1.5 rotate-45 rounded-[2px] bg-gold" />
              تازه‌ترین مطلب
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="group relative mt-6 grid overflow-hidden rounded-3xl border border-gold/20 bg-white shadow-lg transition-all duration-300 hover:border-gold/40 hover:shadow-xl hover:shadow-green-deep/10 lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden bg-green-mist lg:aspect-auto">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  width={720}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-4 text-xs text-text-mid">
                  <span className="rounded-full bg-green-mist px-3 py-1 font-semibold text-green-deep">
                    {featuredPost.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-4 text-gold" aria-hidden="true" />
                    {featuredPost.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4 text-gold" aria-hidden="true" />
                    {featuredPost.readingTime} مطالعه
                  </span>
                </div>
                <h2 className="mt-4 text-balance text-2xl font-extrabold leading-snug text-green-deep sm:text-3xl">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="mt-4 text-pretty leading-8 text-text-mid">
                  {featuredPost.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-green-main">
                  خواندن مطلب
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                </span>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* All posts */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="islamic-pattern pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="بایگانی مطالب"
            description="موضوع دلخواه خود را انتخاب کنید یا همه نوشته‌ها را بخوانید."
          />
          <div className="mt-12">
            <PostCatalog exclude={featuredPost.slug} />
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl border border-gold/20 bg-white p-8 text-center shadow-sm sm:p-10">
              <h2 className="text-2xl font-extrabold text-green-deep">
                سوالی در ذهن دارید؟
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-8 text-text-mid">
                مقاله‌ها نقطه شروع‌اند، نه پایان. اگر درباره وضعیت خود یا خانواده
                خودتان پرسشی دارید، مشاوران ما رایگان راهنمایی می‌کنند.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-main px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-deep sm:w-auto"
                >
                  مشاوره رایگان
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-green-main px-8 py-3.5 text-sm font-bold text-green-deep transition-colors hover:bg-green-main hover:text-white sm:w-auto"
                >
                  مشاهده دوره‌ها
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="می‌خواهید عمیق‌تر یاد بگیرید؟"
        description="دوره‌های تخصصی موسسه، موضوعات مقالات را به مسیر آموزشی کامل و همراه با تمرین تبدیل می‌کنند."
        primaryLabel="مشاهده دوره‌ها"
        primaryHref="/courses"
      />
    </>
  )
}
