import type { ReactNode } from "react"
import { ScrambleText } from "@/components/scramble-text"

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="mt-8 font-serif text-[34px] font-bold leading-[1.1] tracking-[-0.02em] sm:mt-10 sm:text-[40px]">
      {typeof children === "string" ? <ScrambleText>{children}</ScrambleText> : children}
    </h1>
  )
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 mt-10 font-serif text-[23px] font-medium leading-tight text-foreground">
      {typeof children === "string" ? <ScrambleText>{children}</ScrambleText> : children}
    </h2>
  )
}

export function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p className="font-serif text-[15px] leading-[1.2] text-body-text sm:leading-[1.3]">{typeof children === "string" ? <ScrambleText>{children}</ScrambleText> : children}</p>
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
      <p className="font-serif text-[15px] leading-[1.35] text-body-text">
        {href ? (
          <a
            href={href}
            target={href.startsWith("/") ? undefined : "_blank"}
            rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
            className="notion-link"
          >
            <ScrambleText>{title}</ScrambleText>
          </a>
        ) : (
          <ScrambleText>{title}</ScrambleText>
        )}
      </p>
      <p className="font-serif text-[15px] leading-[1.35] text-muted">{meta ? <ScrambleText>{meta}</ScrambleText> : null}</p>
      {note ? (
        <p className="col-start-2 font-serif text-[15px] leading-[1.35] text-muted"><ScrambleText>{note}</ScrambleText></p>
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
      className="my-2 grid gap-x-6 gap-y-3.5"
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
      className="ml-1 inline-flex -translate-y-px items-center gap-1.5 rounded-[4px] bg-hover px-1.5 py-0.5 align-middle text-[13px] leading-none transition-colors hover:bg-active"
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
