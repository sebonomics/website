import type { ReactNode } from "react"

export function HoverNote({ children, note }: { children: ReactNode; note: string }) {
  return (
    <span className="group relative inline cursor-help" tabIndex={0}>
      <span className="inline border-b border-dotted border-accent/55 [box-decoration-break:clone]">{children}</span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+0.4rem)] left-1/2 z-30 w-max max-w-[min(17rem,calc(100vw-2.5rem))] -translate-x-1/2 border border-border bg-background px-3 py-2 text-left text-[14px] leading-snug text-muted opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {note}
      </span>
    </span>
  )
}
