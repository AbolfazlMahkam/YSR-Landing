import Image from 'next/image'

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="نشان موسسه یاوران سلامت روان"
      width={581}
      height={581}
      className={className}
      priority
    />
  )
}

export function Logo({
  className = '',
  light = false,
}: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="grid size-12 place-items-center rounded-xl bg-[#ffffff20] ring-1 ring-border shadow-sm">
        <LogoMark className="size-12 object-contain" />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`text-base font-extrabold ${
            light ? 'text-white' : 'text-green-deep'
          }`}
        >
          یاوران سلامت روان
        </span>
        <span
          className={`text-[11px] font-medium ${
            light ? 'text-white/70' : 'text-text-mid'
          }`}
        >
          موسسه آموزشی و پژوهشی
        </span>
      </span>
    </div>
  )
}
