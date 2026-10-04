import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'
import type { Post } from '@/lib/blog'
import { Reveal } from '@/components/reveal'

export function PostCard({ post, delay = 0 }: { post: Post; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl hover:shadow-green-deep/10">
        <div className="relative aspect-[16/10] overflow-hidden bg-green-mist">
          <Image
            src={post.image}
            alt={post.title}
            width={480}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-green-deep shadow-sm">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-4 text-xs text-text-mid">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4 text-gold" aria-hidden="true" />
              {post.dateLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4 text-gold" aria-hidden="true" />
              {post.readingTime} مطالعه
            </span>
          </div>
          <h3 className="mt-3 text-lg font-bold leading-7 text-text-dark transition-colors group-hover:text-green-main">
            <Link href={`/blog/${post.slug}`}>
              <span className="absolute inset-0" aria-hidden="true" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-text-mid">
            {post.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-green-main">
            ادامه مطلب
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </span>
        </div>
      </article>
    </Reveal>
  )
}
