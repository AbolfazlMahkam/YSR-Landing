'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'

const ph = /^0\d{2}\s?[- ]?\d{4}\s?[- ]?\d{4}$/
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const subjects = [
  'درخواست مشاوره فردی یا خانواده',
  'ثبت‌نام در دوره‌های آموزشی',
  'همکاری و تدریس با موسسه',
  'پرسش درباره گواهینامه دوره‌ها',
  'سایر موارد',
]

type FieldName = 'name' | 'phone' | 'email' | 'subject' | 'message'
type Errors = Partial<Record<FieldName, string>>

type FormState = Record<FieldName, string>

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  subject: subjects[0],
  message: '',
}

function validate(form: FormState): Errors {
  const errors: Errors = {}
  if (form.name.trim().length < 3) errors.name = 'نام باید حداقل ۳ حرف باشد.'
  if (!ph.test(form.phone.trim())) errors.phone = 'شماره تماس معتبر وارد کنید.'
  if (!emailRe.test(form.email.trim())) errors.email = 'ایمیل معتبر وارد کنید.'
  if (!form.subject) errors.subject = 'موضوع پیام را انتخاب کنید.'
  if (form.message.trim().length < 10)
    errors.message = 'پیام باید حداقل ۱۰ حرف باشد.'
  return errors
}

const fieldClasses =
  'w-full rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-text-mid/60 focus:border-green-main focus:ring-2 focus:ring-green-main/20'

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  function handleChange(field: FieldName, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setStatus('sending')
    window.setTimeout(() => setStatus('sent'), 900)
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-7 text-text-dark shadow-xl sm:p-8">
      {status === 'sent' ? (
        <div
          role="status"
          className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center"
        >
          <CheckCircle2
            className="size-16 text-green-main"
            aria-hidden="true"
          />
          <h3 className="text-xl font-bold text-green-deep">
            پیام شما دریافت شد
          </h3>
          <p className="text-text-mid">
            از ارتباط شما سپاسگزاریم. به‌زودی با شما تماس می‌گیریم.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="نام و نام خانوادگی"
              name="name"
              value={form.name}
              error={errors.name}
              onChange={(v) => handleChange('name', v)}
              autoComplete="name"
              placeholder="نام شما"
            />
            <Field
              label="شماره تماس"
              name="phone"
              type="tel"
              value={form.phone}
              error={errors.phone}
              onChange={(v) => handleChange('phone', v)}
              autoComplete="tel"
              dir="rtl"
              inputMode="tel"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="ایمیل"
              name="email"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={(v) => handleChange('email', v)}
              autoComplete="email"
              dir="ltr"
              placeholder="you@example.com"
            />
            <div>
              <label
                htmlFor="subject"
                className="mb-1.5 block text-sm font-semibold text-text-dark"
              >
                موضوع پیام
              </label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                aria-invalid={errors.subject ? 'true' : 'false'}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className={fieldClasses}
              >
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p
                  id="subject-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-deep"
                >
                  {errors.subject}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-semibold text-text-dark"
            >
              پیام شما
            </label>
            <textarea
              id="message"
              name="message"
              rows={compact ? 4 : 6}
              value={form.message}
              onChange={(e) => handleChange('message', e.target.value)}
              required
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              placeholder="پیام یا پرسش خود را بنویسید..."
              className={`${fieldClasses} resize-none`}
            />
            {errors.message && (
              <p
                id="message-error"
                role="alert"
                className="mt-1.5 text-xs text-red-deep"
              >
                {errors.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-main px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'sending' ? (
              <>
                در حال ارسال...
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              </>
            ) : (
              <>
                ارسال پیام
                <Send className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
          <p className="text-center text-xs leading-6 text-text-mid">
            اطلاعات شما نزد موسسه محفوظ است و صرفاً برای پاسخگویی استفاده
            می‌شود.
          </p>
        </form>
      )}
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  error,
  onChange,
  autoComplete,
  inputMode,
  dir,
}: {
  label: string
  name: string
  type?: string
  value: string
  placeholder?: string
  error?: string
  onChange: (v: string) => void
  autoComplete?: string
  inputMode?: 'text' | 'tel' | 'email'
  dir?: 'rtl' | 'ltr'
}) {
  const inputId = `${name}-input`
  const errorId = `${name}-error`
  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-sm font-semibold text-text-dark"
      >
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        dir={dir}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        className={fieldClasses}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-deep">
          {error}
        </p>
      )}
    </div>
  )
}
