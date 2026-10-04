'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { courseCategories, courses, type CourseCategory, type CourseLevel } from '@/lib/courses'
import { CourseCard } from '@/components/pages/course-card'

const levels: CourseLevel[] = ['مقدماتی', 'متوسط', 'پیشرفته']

type CategoryFilter = CourseCategory | 'همه'

export function CourseCatalog() {
  const [category, setCategory] = useState<CategoryFilter>('همه')
  const [level, setLevel] = useState<CourseLevel | 'همه'>('همه')

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (category === 'همه' || c.category === category) &&
          (level === 'همه' || c.level === level),
      ),
    [category, level],
  )

  const isFiltered = category !== 'همه' || level !== 'همه'

  function reset() {
    setCategory('همه')
    setLevel('همه')
  }

  return (
    <div>
      <div className="rounded-3xl border border-gold/15 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-green-deep">
            <SlidersHorizontal className="size-4 text-gold" aria-hidden="true" />
            فیلتر دوره‌ها
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="course-level" className="sr-only">
              سطح دوره
            </label>
            <select
              id="course-level"
              value={level}
              onChange={(e) => setLevel(e.target.value as CourseLevel | 'همه')}
              className="rounded-full border border-gold/25 bg-cream px-4 py-2 text-xs font-semibold text-text-dark outline-none transition-colors focus:border-green-main focus:ring-2 focus:ring-green-main/20"
            >
              <option value="همه">همه سطوح</option>
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            {isFiltered && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-full border border-green-main/30 px-4 py-2 text-xs font-semibold text-green-deep transition-colors hover:bg-green-mist"
              >
                <X className="size-3.5" aria-hidden="true" />
                حذف فیلترها
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5" role="group" aria-label="دسته‌بندی دوره‌ها">
          {(['همه', ...courseCategories] as CategoryFilter[]).map((c) => {
            const active = category === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-green-deep text-gold'
                    : 'bg-cream text-text-dark hover:bg-green-mist'
                }`}
              >
                {c === 'همه' ? 'همه دوره‌ها' : c}
              </button>
            )
          })}
        </div>
      </div>

      <p className="mt-8 text-sm text-text-mid" aria-live="polite">
        {filtered.length} دوره برای شما نمایش داده می‌شود
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <CourseCard key={c.slug} course={c} delay={(i % 3) * 0.1} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-gold/30 bg-white p-12 text-center">
          <p className="text-lg font-bold text-text-dark">
            دوره‌ای با این مشخصات پیدا نشد
          </p>
          <p className="mt-2 text-sm text-text-mid">
            می‌توانید فیلترها را بردارید یا با کارشناسان ما تماس بگیرید.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-main px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-deep"
          >
            نمایش همه دوره‌ها
          </button>
        </div>
      )}
    </div>
  )
}
