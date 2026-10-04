'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'

const ph = /^0\d{2}\s?[- ]?\d{4}\s?[- ]?\d{4}$/

const fieldClasses =
  'w-full rounded-xl border border-gold/25 bg-cream/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-text-mid/60 focus:border-green-main focus:ring-2 focus:ring-green-main/20'

export function EnrollForm({
  courseTitle,
  modes,
}: {
  courseTitle: string
  modes: string[]
}) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    mode: modes[0] ?? 'حضوری',
    note: '',
  })
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found: { name?: string; phone?: string } = {}
    if (form.name.trim().length < 3) found.name = 'نام باید حداقل ۳ حرف باشد.'
    if (!ph.test(form.phone.trim())) found.phone = 'شماره تماس معتبر وارد کنید.'
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setStatus('sending')
    window.setTimeout(() => setStatus('sent'), 900)
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-3xl border border-gold/20 bg-white p-7 text-center shadow-sm"
      >
        <CheckCircle2
          className="mx-auto size-14 text-green-main"
          aria-hidden="true"
        />
        <h3 className="mt-4 text-lg font-bold text-green-deep">
          درخواست شما ثبت شد
        </h3>
        <p className="mt-2 text-sm leading-7 text-text-mid">
          درخواست شما برای دوره «{courseTitle}» ثبت شد. کارشناسان ما در نخستین
          فرصت کاری با شما تماس می‌گیرند.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-gold/20 bg-white p-6 shadow-sm sm:p-7"
    >
      <h3 className="text-lg font-bold text-green-deep">ثبت‌نام در دوره</h3>
      <p className="mt-2 text-sm leading-7 text-text-mid">
        فرم زیر را تکمیل کنید تا مشاور آموزشی برای شما وقت رزرو کند.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="enroll-name"
            className="mb-1.5 block text-sm font-semibold text-text-dark"
          >
            نام و نام خانوادگی
          </label>
          <input
            id="enroll-name"
            name="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            autoComplete="name"
            placeholder="نام شما"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'enroll-name-error' : undefined}
            className={fieldClasses}
          />
          {errors.name && (
            <p
              id="enroll-name-error"
              role="alert"
              className="mt-1.5 text-xs text-red-deep"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="enroll-phone"
            className="mb-1.5 block text-sm font-semibold text-text-dark"
          >
            شماره تماس
          </label>
          <input
            id="enroll-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            autoComplete="tel"
            dir="rtl"
            inputMode="tel"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'enroll-phone-error' : undefined}
            className={fieldClasses}
          />
          {errors.phone && (
            <p
              id="enroll-phone-error"
              role="alert"
              className="mt-1.5 text-xs text-red-deep"
            >
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="enroll-mode"
            className="mb-1.5 block text-sm font-semibold text-text-dark"
          >
            شیوه شرکت
          </label>
          <select
            id="enroll-mode"
            name="mode"
            value={form.mode}
            onChange={(e) => setForm((f) => ({ ...f, mode: e.target.value }))}
            className={fieldClasses}
          >
            {modes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="enroll-note"
            className="mb-1.5 block text-sm font-semibold text-text-dark"
          >
            توضیح کوتاه <span className="text-xs text-text-mid">(اختیاری)</span>
          </label>
          <textarea
            id="enroll-note"
            name="note"
            rows={3}
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            placeholder="سوابق یا پرسش خود را بنویسید..."
            className={`${fieldClasses} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-main px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? (
          <>
            در حال ارسال...
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          </>
        ) : (
          <>
            ارسال درخواست
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}
