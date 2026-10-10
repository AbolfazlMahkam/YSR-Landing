import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { Accordion } from '@/components/accordion'
import { ContactForm } from '@/components/pages/contact-form'
import { faqs } from '@/lib/faq'
import { ogImage } from '@/lib/og/card'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'تماس با ما و نوبت‌دهی مشاوره',
  description:
    'راه‌های ارتباط با موسسه یاوران سلامت روان در قم: نشانی بلوار امین، شماره تماس، ایمیل و فرم آنلاین برای درخواست مشاوره رایگان و ثبت‌نام در دوره‌ها.',
  alternates: {
    canonical: '/contact',
    languages: { 'fa-IR': '/contact' },
  },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/contact`,
    title: 'تماس با موسسه یاوران سلامت روان',
    description: `نشانی: ${siteConfig.address} — تلفن: ${siteConfig.phone}`,
    images: [ogImage],
  },
}

const info = [
  {
    icon: MapPin,
    label: 'نشانی',
    value: siteConfig.address,
    href: `https://neshan.org/maps/places/c5ec86f9a77e77dbcac9ab9cfab4a252#c34.624-50.853-20z-0p/${siteConfig.geo.latitude}/${siteConfig.geo.longitude}`,
  },
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

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="با ما در ارتباط باشید"
        description="برای مشاوره، ثبت‌نام در دوره‌ها یا هر پرسشی، پیام خود را برای ما ارسال کنید. کارشناسان ما در اسرع وقت پاسخگو خواهند بود."
        crumbs={[{ label: 'خانه', href: '/' }, { label: 'تماس با ما' }]}
        tone="cream"
      />

      {/* Contact methods */}
      <section className="relative bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {info.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.label} delay={i * 0.08}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-gold/15 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-green-deep text-gold">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-gold-deep">
                        {item.label}
                      </p>
                      {'href' in item && item.href ? (
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith('http') ? '_blank' : undefined
                          }
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-sm leading-7 text-text-dark transition-colors hover:text-green-main"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm leading-7 text-text-dark">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form + map */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div>
              <h2 className="text-2xl font-extrabold text-green-deep sm:text-3xl">
                فرم درخواست
              </h2>
              <p className="mt-4 leading-8 text-text-mid">
                فرم زیر را پر کنید تا در نخستین فرصت کاری با شما تماس بگیریم. اگر
                پرسش فوری دارید، می‌توانید مستقیماً تماس بگیرید.
              </p>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-3xl border border-gold/20 bg-cream shadow-sm">
                <iframe
                  src={siteConfig.mapEmbed}
                  title="نقشه موقعیت موسسه یاوران سلامت روان در قم"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-80 w-full"
                />
              </div>
              <div className="mt-6 rounded-3xl border border-gold/15 bg-cream p-6">
                <h3 className="font-extrabold text-green-deep">
                  چطور به موسسه برسیم؟
                </h3>
                <p className="mt-3 text-sm leading-7 text-text-mid">
                  {siteConfig.address}. برای مراجعه حضوری، پیش از آمدن با شماره
                  تماس هماهنگ کنید تا پذیرش در دسترس باشد. دوره‌های حضوری در همین
                  فضا برگزار می‌شود.
                </p>
                <a
                  href={`https://neshan.org/maps/places/c5ec86f9a77e77dbcac9ab9cfab4a252#c34.624-50.853-20z-0p/${siteConfig.geo.latitude}/${siteConfig.geo.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-main px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-deep"
                >
                  <MapPin className="size-4" aria-hidden="true" />
                  مسیریابی تا موسسه
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-green-mist py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="پرسش‌های پرتکرار"
            description="شاید پاسخ سوال شما همین‌جا باشد."
          />
          <div className="mt-12">
            <Accordion
              defaultOpen={0}
              items={faqs.map((f) => ({
                title: f.question,
                content: <p className="leading-7">{f.answer}</p>,
              }))}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="mt-8 text-center text-sm text-text-mid">
              پرسش دیگری دارید؟{' '}
              <Link
                href="/blog"
                className="font-bold text-green-main underline-offset-4 hover:underline"
              >
                مقالات موسسه
              </Link>{' '}
              را بخوانید یا از فرم بالا پیام بفرستید.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
