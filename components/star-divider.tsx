export function StarDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-gold ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-gold/40" />
      <span className="size-2 rotate-45 rounded-[2px] bg-gold" />
      <span className="h-px w-10 bg-gold/40" />
    </div>
  )
}
