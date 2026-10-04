import type { ReactNode } from 'react'
import { Reveal } from '@/components/reveal'
import { StarDivider } from '@/components/star-divider'

export function SectionHeading({
  title,
  description,
  align = 'center',
  light = false,
  children,
}: {
  title: string
  description?: string
  align?: 'center' | 'start'
  light?: boolean
  children?: ReactNode
}) {
  const centered = align === 'center'

  return (
    <div
      className={
        centered
          ? 'mx-auto max-w-2xl text-center'
          : 'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'
      }
    >
      <div className={centered ? undefined : 'max-w-2xl'}>
        <StarDivider className={centered ? undefined : 'justify-start'} />
        <Reveal>
          <h2
            className={`mt-4 text-balance text-3xl font-extrabold leading-snug sm:text-4xl ${
              light ? 'text-white' : 'text-green-deep'
            }`}
          >
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p
              className={`mt-4 text-pretty leading-8 ${
                light ? 'text-white/75' : 'text-text-mid'
              }`}
            >
              {description}
            </p>
          </Reveal>
        )}
      </div>
      {children && <Reveal delay={0.15}>{children}</Reveal>}
    </div>
  )
}
