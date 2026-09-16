import Image from 'next/image'
import { Clock, Users, ArrowLeft, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { StarDivider } from '@/components/star-divider'

const courses = [
  {
    image: '/images/course-1.png',
    tag: 'روانشناسی شناختی',
    title: 'اصول روان‌درمانی شناختی-رفتاری',
    desc: 'آشنایی با تکنیک‌های علمی درمان اضطراب، افسردگی و بازسازی الگوهای فکری.',
    duration: '۲۴ ساعت',
    students: '۱٬۸۰۰',
    rating: '۴٫۹',
    price: '۲٬۴۰۰٬۰۰۰',
  },
  {
    image: '/images/course-2.png',
    tag: 'خانواده و ازدواج',
    title: 'مشاوره خانواده و مهارت‌های زندگی',
    desc: 'بهبود روابط زناشویی و تربیت فرزندان بر اساس اصول روانشناسی و سبک زندگی اسلامی.',
    duration: '۱۸ ساعت',
    students: '۲٬۳۵۰',
    rating: '۴٫۸',
    price: '۱٬۹۰۰٬۰۰۰',
  },
  {
    image: '/images/course-3.png',
    tag: 'روانشناسی اسلامی',
    title: 'روان‌شناسی معنوی و آرامش درون',
    desc: 'کشف پیوند میان معنویت، ذکر و سلامت روان بر پایه آموزه‌های قرآن و اهل‌بیت (ع).',
    duration: '۲۰ ساعت',
    students: '۱٬۵۲۰',
    rating: '۵٫۰',
    price: '۲٬۱۰۰٬۰۰۰',
  },
]

export function Courses() {
  return (
    <section id="courses" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StarDivider />
          <Reveal>
            <h2 className="mt-4 text-3xl font-extrabold text-green-deep sm:text-4xl">
              دوره‌های تخصصی ما
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 leading-8 text-text-mid">
              مجموعه‌ای از دوره‌های کاربردی و علمی، طراحی‌شده برای رشد فردی،
              خانوادگی و حرفه‌ای شما.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gold/15 bg-cream shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-green-deep/10">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={480}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-green-deep shadow-sm">
                    {c.tag}
                  </span>
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-green-deep/90 px-2.5 py-1 text-xs font-semibold text-gold">
                    <Star className="size-3 fill-gold" />
                    {c.rating}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold leading-7 text-text-dark">
                    {c.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-text-mid">
                    {c.desc}
                  </p>

                  <div className="mt-5 flex items-center gap-4 text-xs text-text-mid">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4 text-gold" />
                      {c.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="size-4 text-gold" />
                      {c.students} نفر
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-gold/15 pt-5">
                    <div className="flex items-baseline gap-1 text-green-deep">
                      <span className="text-lg font-extrabold">{c.price}</span>
                      <span className="text-xs text-text-mid">تومان</span>
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 rounded-full bg-green-main px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-green-deep"
                    >
                      ثبت‌نام
                      <ArrowLeft className="size-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <a
              href="#courses"
              className="inline-flex items-center gap-2 rounded-full border border-green-main px-8 py-3.5 text-sm font-bold text-green-deep transition-colors hover:bg-green-main hover:text-white"
            >
              مشاهده همه دوره‌ها
              <ArrowLeft className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
