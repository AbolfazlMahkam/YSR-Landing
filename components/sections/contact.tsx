'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/reveal'
import { StarDivider } from '@/components/star-divider'
import { Mandala } from '@/components/mandala'
import { siteConfig } from '@/lib/site'

const info = [
  { icon: MapPin, label: 'نشانی', value: siteConfig.address },
  {
    icon: Phone,
    label: 'تلفن',
    value: siteConfig.phone,
    href: 'tel:+982188881234',
  },
  {
    icon: Mail,
    label: 'ایمیل',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  { icon: Clock, label: 'ساعات کاری', value: 'شنبه تا چهارشنبه، ۹ تا ۱۸' },
]

const ph = /^0\d{2}\s?[- ]?\d{4}\s?[- ]?\d{4}$/
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'message', string>>

function validate(
  name: string,
  phone: string,
  email: string,
  message: string,
): Errors {
  const errors: Errors = {}
  if (name.trim().length < 3) errors.name = 'نام باید حداقل ۳ حرف باشد.'
  if (!ph.test(phone.trim())) errors.phone = 'شماره تماس معتبر وارد کنید.'
  if (!emailRe.test(email.trim())) errors.email = 'ایمیل معتبر وارد کنید.'
  if (message.trim().length < 10) errors.message = 'پیام باید حداقل ۱۰ حرف باشد.'
  return errors
}

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const reduce = useReducedMotion()

  function handleChange(
    field: 'name' | 'phone' | 'email' | 'message',
    value: string,
  ) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate(form.name, form.phone, form.email, form.message)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setStatus('sending')
    window.setTimeout(() => setStatus('sent'), 900)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-green-deep py-20 text-white sm:py-28"
    >
      <div className="islamic-pattern-gold pointer-events-none absolute inset-0 opacity-[0.08]" />
      <motion.div
        className="pointer-events-none absolute -left-32 top-10 text-gold/10"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
      >
        <Mandala className="size-80" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StarDivider />
          <Reveal>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              با ما در ارتباط باشید
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 leading-8 text-white/75">
              برای مشاوره، ثبت‌نام در دوره‌ها یا هر پرسشی، پیام خود را برای ما
              ارسال کنید. کارشناسان ما در اسرع وقت پاسخگو خواهند بود.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="grid gap-5 sm:grid-cols-2">
            {info.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold text-green-deep">
                    <item.icon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gold">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 inline-block text-sm leading-7 text-white/85 transition-colors hover:text-gold"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm leading-7 text-white/85">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-3xl bg-white p-7 text-text-dark shadow-xl sm:p-8">
              {status === 'sent' ? (
                <div
                  role="status"
                  className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center"
                >
                  <CheckCircle2 className="size-16 text-green-main" aria-hidden="true" />
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
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-semibold text-text-dark"
                    >
                      پیام شما
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      placeholder="پیام یا پرسش خود را بنویسید..."
                      className="w-full resize-none rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-text-mid/60 focus:border-green-main focus:ring-2 focus:ring-green-main/20"
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-deep">
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
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const fieldClasses =
  'w-full rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-text-mid/60 focus:border-green-main focus:ring-2 focus:ring-green-main/20'

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