import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, ArrowLeft, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { StarDivider } from '@/components/star-divider'
import { courses } from '@/lib/courses'

const featured = courses.slice(0, 3)

export function Courses() {
  return (
    <section id="courses" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StarDivider />
          <Reveal>
            <h2 className="mt-4 text-3xl font-extrabold text-green-deep sm:text-4xl">
              دوره‌های تخصصی ما
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 leading-8 text-text-mid">
              مجموعه‌ای از دوره‌های کاربردی و علمی، طراحی‌شده برای رشد فردی،
              خانوادگی و حرفه‌ای شما.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.1}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/15 bg-cream shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-green-deep/10">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={480}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-green-deep shadow-sm">
                    {c.tag}
                  </span>
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-green-deep/90 px-2.5 py-1 text-xs font-semibold text-gold">
                    <Star className="size-3 fill-gold" />
                    {c.rating}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold leading-7 text-text-dark">
                    <Link href={`/courses/${c.slug}`}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {c.title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-text-mid">
                    {c.summary}
                  </p>

                  <div className="mt-5 flex items-center gap-4 text-xs text-text-mid">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4 text-gold" />
                      {c.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="size-4 text-gold" />
                      {c.students} نفر
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-gold/15 pt-5">
                    <div className="flex items-baseline gap-1 text-green-deep">
                      <span className="text-lg font-extrabold">{c.price}</span>
                      <span className="text-xs text-text-mid">تومان</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-main px-4 py-2 text-xs font-bold text-white transition-colors group-hover:bg-green-deep">
                      ثبت‌نام
                      <ArrowLeft className="size-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-green-main px-8 py-3.5 text-sm font-bold text-green-deep transition-colors hover:bg-green-main hover:text-white"
            >
              مشاهده همه دوره‌ها
              <ArrowLeft className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
