import type { ReactNode } from "react"

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="pb-3 pt-7 text-[38px] font-bold leading-tight tracking-[-0.02em] sm:text-[42px]">
      {children}
    </h1>
  )
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-2 mt-8 text-[24px] font-semibold tracking-[-0.01em] text-foreground sm:mb-1 sm:mt-7">
      {children}
    </h2>
  )
}

export function Paragraph({ children }: { children: ReactNode }) {
  return (
    // leading opens up on phones, where lines wrap far more often. No
    // `text-wrap: pretty` here — in a ~335px column it shortens earlier lines to
    // protect the last one, which leaves big ragged gaps down the right edge.
    <p className="text-[15px] leading-[1.7] sm:leading-[1.6]">{children}</p>
  )
}

/**
 * One list entry: the name, then its details in the second column.
 */
export function Entry({
  title,
  href,
  meta,
  note,
}: {
  title: string
  href?: string
  /** trailing details, e.g. "Paul Graham, Essay" */
  meta?: string
  /** optional second line */
  note?: string
}) {
  // `contents` hands the cells straight to the grid in Entries, so the two
  // columns line up across every row rather than per entry
  return (
    <div className="contents">
      <p className="text-[15px] leading-[1.6]">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            // underline on hover only — a whole page of underlined rows reads as clutter
            className="underline-offset-2 transition-colors hover:underline"
          >
            {title}
          </a>
        ) : (
          <span>{title}</span>
        )}
      </p>
      <p className="text-[15px] leading-[1.6] text-muted">{meta}</p>
      {note ? (
        <p className="col-start-2 text-[14px] leading-[1.6] text-muted">{note}</p>
      ) : null}
    </div>
  )
}

/**
 * Two columns, so every trailing detail starts at the same x. `max-content`
 * measures the widest name and fits the column to it — right for a page that is
 * one list. Pass an explicit `titleWidth` when a page has several lists that
 * must share one column, since separate grids each measure only their own rows.
 */
export function Entries({
  children,
  titleWidth = "max-content",
}: {
  children: ReactNode
  titleWidth?: string
}) {
  return (
    <div
      className="my-2 grid gap-x-6 gap-y-3"
      style={{ gridTemplateColumns: `${titleWidth} 1fr` }}
    >
      {children}
    </div>
  )
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
