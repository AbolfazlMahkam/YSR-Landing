import { GraduationCap, Users, BookOpen, Award } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const stats = [
  { icon: Users, value: '۱۲٬۰۰۰+', label: 'دانش‌پژوه' },
  { icon: BookOpen, value: '۸۵+', label: 'دوره تخصصی' },
  { icon: GraduationCap, value: '۴۰+', label: 'استاد مجرب' },
  { icon: Award, value: '۱۵', label: 'سال تجربه' },
]

export function StatsBar() {
  return (
    <section className="relative z-10 -mt-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-gold/20 bg-white p-6 shadow-xl shadow-green-deep/5 sm:p-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="grid size-14 place-items-center rounded-2xl bg-green-mist text-green-main">
                  <s.icon className="size-7" />
                </span>
                <span className="text-2xl font-extrabold text-green-deep sm:text-3xl">
                  {s.value}
                </span>
                <span className="text-sm font-medium text-text-mid">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
