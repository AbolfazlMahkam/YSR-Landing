export function InitialsAvatar({
  initials,
  name,
  className = 'size-12',
}: {
  initials: string
  name: string
  className?: string
}) {
  return (
    <span
      role="img"
      aria-label={name}
      className={`grid shrink-0 place-items-center rounded-full bg-green-deep font-bold text-gold ring-2 ring-gold/40 ${className}`}
    >
      {initials}
    </span>
  )
}
