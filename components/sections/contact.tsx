'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react'
import { motion } from 'motion/react'
import { Reveal } from '@/components/reveal'
import { StarDivider } from '@/components/star-divider'
import { Mandala } from '@/components/mandala'

const info = [
  { icon: MapPin, label: 'نشانی', value: 'تهران، خیابان ولیعصر، نبش کوچه یاس، پلاک ۱۲۰' },
  { icon: Phone, label: 'تلفن', value: '۰۲۱ - ۸۸۸۸ ۱۲۳۴' },
  { icon: Mail, label: 'ایمیل', value: 'info@yavaran-ravan.ir' },
  { icon: Clock, label: 'ساعات کاری', value: 'شنبه تا چهارشنبه، ۹ تا ۱۸' },
]

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-green-deep py-20 text-white sm:py-28"
    >
      <div className="islamic-pattern-gold pointer-events-none absolute inset-0 opacity-[0.08]" />
      <motion.div
        className="pointer-events-none absolute -left-32 top-10 text-gold/10"
        animate={{ rotate: 360 }}
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
          {/* Info */}
          <div className="grid gap-5 sm:grid-cols-2">
            {info.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold text-green-deep">
                    <item.icon className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gold">{item.label}</p>
                    <p className="mt-1 text-sm leading-7 text-white/85">
                      {item.value}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Form */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl bg-white p-7 text-text-dark shadow-xl sm:p-8">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
                  <CheckCircle2 className="size-16 text-green-main" />
                  <h3 className="text-xl font-bold text-green-deep">
                    پیام شما دریافت شد
                  </h3>
                  <p className="text-text-mid">
                    از ارتباط شما سپاسگزاریم. به‌زودی با شما تماس می‌گیریم.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="نام و نام خانوادگی" name="name" placeholder="نام شما" />
                    <Field label="شماره تماس" name="phone" placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
                  </div>
                  <Field label="ایمیل" name="email" type="email" placeholder="you@example.com" />
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
                      required
                      placeholder="پیام یا پرسش خود را بنویسید..."
                      className="w-full resize-none rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-text-mid/60 focus:border-green-main focus:ring-2 focus:ring-green-main/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-main px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-deep"
                  >
                    ارسال پیام
                    <Send className="size-4" />
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

function Field({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-semibold text-text-dark"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-text-mid/60 focus:border-green-main focus:ring-2 focus:ring-green-main/20"
      />
    </div>
  )
}
