export function Mandala({ className = '' }: { className?: string }) {
  const petals = Array.from({ length: 12 })
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="78" />
      <circle cx="100" cy="100" r="52" strokeDasharray="2 4" />
      <circle cx="100" cy="100" r="26" />
      {petals.map((_, i) => (
        <g key={i} transform={`rotate(${(360 / 12) * i} 100 100)`}>
          <path d="M100 22 C112 46 112 62 100 78 C88 62 88 46 100 22 Z" />
          <line x1="100" y1="78" x2="100" y2="26" strokeDasharray="1 3" />
        </g>
      ))}
      <polygon
        points="100,58 111,86 141,86 117,104 126,133 100,116 74,133 83,104 59,86 89,86"
        strokeWidth="1"
      />
    </svg>
  )
}
