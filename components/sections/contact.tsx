'use client'

import { motion, useReducedMotion } from 'motion/react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { StarDivider } from '@/components/star-divider'
import { Mandala } from '@/components/mandala'
import { ContactForm } from '@/components/pages/contact-form'
import { siteConfig } from '@/lib/site'

const info = [
  { icon: MapPin, label: 'نشانی', value: siteConfig.address },
  {
    icon: Phone,
    label: 'تلفن',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phoneE164}`,
  },
  {
    icon: Mail,
    label: 'ایمیل',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  { icon: Clock, label: 'ساعات کاری', value: siteConfig.openingHours },
]

export function Contact() {
  const reduce = useReducedMotion()

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
            {info.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.label} delay={i * 0.08}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold text-green-deep">
                      <Icon className="size-6" aria-hidden="true" />
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
              )
            })}
          </div>

          <Reveal delay={0.15}>
            <ContactForm compact />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
