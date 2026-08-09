import type { ReactNode } from "react"

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="pb-3 pt-7 text-[38px] font-bold leading-tight tracking-[-0.02em] sm:text-[42px]">
      {children}
    </h1>
  )
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-3 rounded-[4px] bg-callout-bg px-4 py-3.5">
      <p className="text-[16px] leading-6 text-callout-text">{children}</p>
    </div>
  )
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-1 mt-7 text-[24px] font-semibold tracking-[-0.01em] text-foreground">
      {children}
    </h2>
  )
}

export function Bullets({ children }: { children: ReactNode }) {
  return <ul className="my-1.5 space-y-1.5">{children}</ul>
}

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 text-[16px] leading-[1.6]">
      <span aria-hidden className="mt-[9px] size-[5px] shrink-0 rounded-full bg-foreground/70" />
      <span className="min-w-0">{children}</span>
    </li>
  )
}

export function Paragraph({ children }: { children: ReactNode }) {
  return <p className="my-1.5 text-[16px] leading-[1.6]">{children}</p>
}

export function SpotifyPill({
  artist,
  track,
  href,
}: {
  artist: string
  track: string
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-1 inline-flex -translate-y-px items-center gap-1.5 rounded-[4px] bg-hover px-1.5 py-0.5 align-middle text-[14px] leading-none transition-colors hover:bg-active"
    >
      <svg viewBox="0 0 24 24" className="size-[15px] shrink-0" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#1db954" />
        <path
          d="M6.4 9.1c3.6-1.1 8-.8 11.2 1.2M7.2 12.2c3-1 6.6-.7 9.3 1M8 15.2c2.4-.8 5.2-.6 7.4.8"
          stroke="#0b0b0b"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-muted">{artist}</span>
      <span className="font-medium text-foreground">{track}</span>
    </a>
  )
}
