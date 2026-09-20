import Image from 'next/image'
import { Quote, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { StarDivider } from '@/components/star-divider'

const testimonials = [
  {
    avatar: '/images/avatar-1.png',
    name: 'محمد رضایی',
    role: 'دانش‌پژوه دوره روان‌درمانی',
    text: 'دوره‌ها فراتر از انتظارم بود. تلفیق مباحث علمی با نگاه معنوی واقعاً به من در درک عمیق‌تر مسائل کمک کرد.',
  },
  {
    avatar: '/images/avatar-2.png',
    name: 'فاطمه محمدی',
    role: 'مشاور خانواده',
    text: 'اساتید بسیار مجرب و دلسوز بودند. مهارت‌هایی که آموختم را هر روز در زندگی و کارم به کار می‌برم.',
  },
  {
    avatar: '/images/avatar-3.png',
    name: 'زهرا کریمی',
    role: 'شرکت‌کننده دوره روانشناسی معنوی',
    text: 'محیط آموزشی آرام و حرفه‌ای موسسه، همراه با محتوای غنی، تجربه‌ای اثرگذار برای من رقم زد.',
  },
]

export function Testimonials() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StarDivider />
          <Reveal>
            <h2 className="mt-4 text-3xl font-extrabold text-green-deep sm:text-4xl">
              تجربه دانش‌پژوهان ما
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 leading-8 text-text-mid">
              رضایت و رشد شرکت‌کنندگان، بزرگ‌ترین سرمایه و افتخار ماست.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="relative flex h-full flex-col rounded-3xl border border-gold/15 bg-white p-7 shadow-sm">
                <Quote className="size-9 text-gold/40" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-pretty leading-8 text-text-dark">
                  {t.text}
                </blockquote>
                <div className="mt-5 flex items-center gap-1 text-gold" role="img" aria-label="امتیاز ۵ از ۵">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-gold" aria-hidden="true" />
                  ))}
                </div>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-gold/15 pt-5">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={52}
                    height={52}
                    className="size-13 rounded-full object-cover ring-2 ring-green-mist"
                  />
                  <div>
                    <p className="font-bold text-green-deep">{t.name}</p>
                    <p className="text-xs text-text-mid">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
