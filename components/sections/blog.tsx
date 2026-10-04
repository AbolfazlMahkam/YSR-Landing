import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { StarDivider } from '@/components/star-divider'
import { posts } from '@/lib/blog'

const featured = posts.slice(0, 3)

export function Blog() {
  return (
    <section id="blog" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-right">
          <div>
            <StarDivider className="justify-center sm:justify-start" />
            <Reveal>
              <h2 className="mt-4 text-3xl font-extrabold text-green-deep sm:text-4xl">
                آخرین مقالات و یادداشت‌ها
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-green-main px-6 py-3 text-sm font-bold text-green-deep transition-colors hover:bg-green-main hover:text-white"
            >
              همه مقالات
              <ArrowLeft className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/15 bg-cream shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-green-deep/10">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={480}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-green-deep shadow-sm">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex items-center gap-1.5 text-xs text-text-mid">
                    <CalendarDays className="size-4 text-gold" />
                    {p.dateLabel}
                  </span>
                  <h3 className="mt-3 text-lg font-bold leading-7 text-text-dark transition-colors group-hover:text-green-main">
                    <Link href={`/blog/${p.slug}`}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-text-mid">
                    {p.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-green-main">
                    ادامه مطلب
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
