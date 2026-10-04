'use client'

import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import { Minus, Plus } from 'lucide-react'

export interface AccordionItem {
  title: string
  meta?: string
  content: ReactNode
}

export function Accordion({
  items,
  defaultOpen = -1,
  className = '',
}: {
  items: AccordionItem[]
  defaultOpen?: number
  className?: string
}) {
  const [open, setOpen] = useState(defaultOpen)
  const uid = useId()
  const reduce = useReducedMotion()

  const panelVariants: Variants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: reduce ? 0 : 0.25, ease: [0.4, 0, 0.2, 1] },
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className={`divide-y divide-gold/15 overflow-hidden rounded-3xl border border-gold/15 bg-white ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${uid}-panel-${i}`
        const buttonId = `${uid}-button-${i}`
        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-right transition-colors hover:bg-green-mist/50 sm:px-7"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-text-dark sm:text-base">
                    {item.title}
                  </span>
                  {item.meta && (
                    <span className="text-xs font-medium text-gold-deep">
                      {item.meta}
                    </span>
                  )}
                </span>
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors ${
                    isOpen
                      ? 'bg-green-main text-white'
                      : 'bg-green-mist text-green-deep'
                  }`}
                  aria-hidden="true"
                >
                  {isOpen ? (
                    <Minus className="size-4" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  variants={panelVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 text-sm leading-7 text-text-mid sm:px-7">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
