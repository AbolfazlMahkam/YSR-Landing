'use client'

import { motion } from 'motion/react'
import { ArrowLeft, PlayCircle } from 'lucide-react'
import { Mandala } from '@/components/mandala'

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-green-deep pt-28 pb-20 text-white sm:pt-36 sm:pb-28"
    >
      {/* geometric texture */}
      <div className="islamic-pattern-gold pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-green-deep via-green-deep to-[#123f28]" />

      {/* rotating mandala accents */}
      <motion.div
        className="pointer-events-none absolute -left-24 -top-24 text-gold/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <Mandala className="size-72" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -bottom-32 -right-20 text-green-light/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <Mandala className="size-96" />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Text */}
        <div className="text-center lg:text-right">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-sm font-medium text-gold"
          >
            <span className="size-1.5 rotate-45 rounded-[2px] bg-gold" />
            پیوند دانش نوین و حکمت اسلامی
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.25] sm:text-5xl lg:text-6xl"
          >
            آرامش روان در پرتو{' '}
            <span className="text-gold">دانش و معنویت</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-8 text-white/80 lg:mx-0 lg:text-lg"
          >
            موسسه یاوران سلامت روان با تکیه بر روانشناسی علمی و معارف اصیل
            اسلامی، دوره‌های تخصصی و خدمات مشاوره‌ای را برای رشد و سلامت روان شما
            و خانواده‌تان فراهم می‌کند.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#courses"
              className="shimmer group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-bold text-green-deep shadow-lg shadow-black/20 transition-transform hover:scale-[1.03]"
            >
              مشاهده دوره‌ها
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <PlayCircle className="size-5 text-gold" />
              معرفی موسسه
            </a>
          </motion.div>
        </div>

        {/* Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-md place-items-center lg:grid"
        >
          <div className="absolute inset-6 rounded-full border border-gold/30" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/10 to-transparent" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="text-gold/70"
          >
            <Mandala className="size-[26rem]" />
          </motion.div>
          <div className="absolute grid size-40 place-items-center rounded-full bg-white/5 text-center backdrop-blur-sm">
            <div>
              <p className="text-3xl font-bold text-gold">﴾٢٨﴿</p>
              <p className="mt-2 px-4 text-xs leading-6 text-white/75">
                اَلا بِذِكرِ اللّهِ تَطمَئِنُّ القُلوب
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* bottom wave */}
      <svg
        className="pointer-events-none absolute -bottom-px left-0 w-full text-cream"
        viewBox="0 0 1440 80"
        fill="currentColor"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 80V40C240 10 480 0 720 20C960 40 1200 60 1440 30V80Z" />
      </svg>
    </section>
  )
}
