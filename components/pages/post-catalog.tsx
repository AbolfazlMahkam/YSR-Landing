'use client'

import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { postCategories, posts, type PostCategory } from '@/lib/blog'
import { PostCard } from '@/components/pages/post-card'

type CategoryFilter = PostCategory | 'همه'

export function PostCatalog({ exclude }: { exclude?: string }) {
  const [category, setCategory] = useState<CategoryFilter>('همه')

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          p.slug !== exclude && (category === 'همه' || p.category === category),
      ),
    [category, exclude],
  )

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-3xl border border-gold/15 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="دسته‌بندی مقالات">
          {(['همه', ...postCategories] as CategoryFilter[]).map((c) => {
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
                {c === 'همه' ? 'همه موضوعات' : c}
              </button>
            )
          })}
          {category !== 'همه' && (
            <button
              type="button"
              onClick={() => setCategory('همه')}
              className="inline-flex items-center gap-1.5 rounded-full border border-green-main/30 px-4 py-2 text-xs font-semibold text-green-deep transition-colors hover:bg-green-mist"
            >
              <X className="size-3.5" aria-hidden="true" />
              حذف فیلتر
            </button>
          )}
        </div>

        <p className="text-sm text-text-mid" aria-live="polite">
          {filtered.length} مطلب برای شما نمایش داده می‌شود
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <PostCard key={p.slug} post={p} delay={(i % 3) * 0.1} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-gold/30 bg-white p-12 text-center">
          <p className="text-lg font-bold text-text-dark">
            در این موضوع هنوز مطلبی منتشر نشده است
          </p>
          <button
            type="button"
            onClick={() => setCategory('همه')}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-main px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-deep"
          >
            نمایش همه مطالب
          </button>
        </div>
      )}
    </div>
  )
}
