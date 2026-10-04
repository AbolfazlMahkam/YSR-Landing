import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock, Quote, Share2 } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CtaBand } from '@/components/cta-band'
import { PostCard } from '@/components/pages/post-card'
import { InitialsAvatar } from '@/components/pages/initials-avatar'
import { getPost, getRelatedPosts, posts } from '@/lib/blog'
import { siteConfig } from '@/lib/site'

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) {
    return { title: 'مطلب یافت نشد' }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: { 'fa-IR': `/blog/${post.slug}` },
    },
    openGraph: {
      type: 'article',
      url: `${siteConfig.url}/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.image }],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) notFound()

  const related = getRelatedPosts(post)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    inLanguage: 'fa-IR',
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title={post.title}
        description={post.excerpt}
        crumbs={[
          { label: 'خانه', href: '/' },
          { label: 'مقالات', href: '/blog' },
          { label: post.category },
        ]}
        tone="cream"
      >
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-white/80">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="size-4 text-gold" aria-hidden="true" />
            {post.dateLabel}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="size-4 text-gold" aria-hidden="true" />
            {post.readingTime} مطالعه
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
            {post.category}
          </span>
        </div>
      </PageHero>

      <article className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 rounded-3xl border border-gold/20 bg-white p-6 shadow-sm">
              <InitialsAvatar
                initials={post.author.initials}
                name={post.author.name}
                className="size-14 text-base"
              />
              <div>
                <p className="font-extrabold text-green-deep">
                  {post.author.name}
                </p>
                <p className="mt-1 text-sm text-text-mid">
                  {post.author.role}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 space-y-6">
            {post.content.map((block, i) => {
              if (block.type === 'heading') {
                return (
                  <Reveal key={i} delay={0.05}>
                    <h2 className="text-pretty text-xl font-extrabold leading-9 text-green-deep sm:text-2xl">
                      {block.text}
                    </h2>
                  </Reveal>
                )
              }
              if (block.type === 'quote') {
                return (
                  <Reveal key={i} delay={0.05}>
                    <blockquote className="relative overflow-hidden rounded-3xl border-r-4 border-gold bg-green-mist px-6 py-6 text-pretty text-lg font-bold leading-9 text-green-deep sm:px-8">
                      <Quote
                        className="mb-3 size-7 text-gold/50"
                        aria-hidden="true"
                      />
                      {block.text}
                    </blockquote>
                  </Reveal>
                )
              }
              if (block.type === 'list') {
                return (
                  <Reveal key={i} delay={0.05}>
                    <ul className="space-y-3 rounded-3xl border border-gold/15 bg-white p-6 shadow-sm">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2.5 size-1.5 shrink-0 rotate-45 rounded-[2px] bg-gold" />
                          <span className="leading-8 text-text-dark">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )
              }
              return (
                <Reveal key={i} delay={0.05}>
                  <p className="text-pretty text-base leading-9 text-text-mid">
                    {block.text}
                  </p>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-gold/20 bg-white p-7 text-center shadow-sm">
              <Share2 className="size-6 text-gold" aria-hidden="true" />
              <p className="text-sm leading-7 text-text-mid">
                اگر این مطلب برایتان سودمند بود، آن را با دوستان و اعضای خانواده
                به اشتراک بگذارید.
              </p>
              <a
                href={`https://eitaa.com/share?url=${encodeURIComponent(`${siteConfig.url}/blog/${post.slug}/`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-green-main px-6 py-3 text-sm font-bold text-green-deep transition-colors hover:bg-green-main hover:text-white"
              >
                اشتراک‌گذاری در ایتا
                <ArrowLeft className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gold/20 bg-white p-6 shadow-sm">
              <p className="text-sm text-text-mid">
                دوره‌های مرتبط با این موضوع را ببینید.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-full bg-green-main px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-deep"
              >
                مشاهده دوره‌ها
                <ArrowLeft className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="start"
            title="مطالب مرتبط"
            description="خواندن این نوشته‌ها می‌تواند نگاهتان را عمیق‌تر کند."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {related.map((p, i) => (
              <PostCard key={p.slug} post={p} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="نیاز به راهنمایی شخصی دارید؟"
        description="کارشناسان موسسه رایگان با شما تماس می‌گیرند و قدم بعدی را با هم مشخص می‌کنیم."
      />
    </>
  )
}
