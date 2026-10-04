import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock,
  GraduationCap,
  MonitorPlay,
  Users,
} from 'lucide-react'
import type { Course } from '@/lib/courses'
import { Reveal } from '@/components/reveal'
import { InitialsAvatar } from '@/components/pages/initials-avatar'

export function CourseCard({
  course,
  delay = 0,
}: {
  course: Course
  delay?: number
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl hover:shadow-green-deep/10">
        <div className="relative aspect-[16/10] overflow-hidden bg-green-mist">
          <Image
            src={course.image}
            alt={course.title}
            width={480}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-green-deep shadow-sm">
            {course.category}
          </span>
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-green-deep/90 px-2.5 py-1 text-xs font-semibold text-gold">
            <span className="size-1.5 rotate-45 rounded-[2px] bg-gold" />
            {course.level}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-bold leading-7 text-text-dark transition-colors group-hover:text-green-main">
            <Link href={`/courses/${course.slug}`}>
              <span className="absolute inset-0" aria-hidden="true" />
              {course.title}
            </Link>
          </h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-text-mid">
            {course.summary}
          </p>

          <dl className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-cream px-4 py-3.5 text-xs text-text-mid">
            <div className="inline-flex items-center gap-1.5">
              <Clock className="size-4 shrink-0 text-gold" aria-hidden="true" />
              <dt className="sr-only">مدت دوره</dt>
              <dd>
                {course.duration} · {course.sessions} جلسه
              </dd>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Users className="size-4 shrink-0 text-gold" aria-hidden="true" />
              <dt className="sr-only">تعداد دانش‌پژوهان</dt>
              <dd>{course.students} نفر</dd>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <GraduationCap className="size-4 shrink-0 text-gold" aria-hidden="true" />
              <dt className="sr-only">سطح دوره</dt>
              <dd>{course.level}</dd>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <MonitorPlay className="size-4 shrink-0 text-gold" aria-hidden="true" />
              <dt className="sr-only">شیوه برگزاری</dt>
              <dd>{course.modes.join(' و ')}</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center gap-3 border-t border-gold/15 pt-5">
            <InitialsAvatar
              initials={course.instructor.initials}
              name={course.instructor.name}
              className="size-10 text-xs"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-text-dark">
                {course.instructor.name}
              </p>
              <p className="inline-flex items-center gap-1 text-xs text-text-mid">
                <BookOpen className="size-3.5 text-gold" aria-hidden="true" />
                {course.tag}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-baseline gap-1 text-green-deep">
              <span className="text-lg font-extrabold">{course.price}</span>
              <span className="text-xs text-text-mid">تومان</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-main">
              جزئیات دوره
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </span>
          </div>
        </div>

        <p className="mt-0 inline-flex items-center gap-1.5 border-t border-gold/15 bg-cream/60 px-6 py-3 text-xs text-text-mid">
          <CalendarDays className="size-3.5 text-gold" aria-hidden="true" />
          شروع دوره بعدی: {course.nextStart}
        </p>
      </article>
    </Reveal>
  )
}
