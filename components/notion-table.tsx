import type { ComponentType, ReactNode } from "react"
import { Plus, Table2 } from "lucide-react"

export type NotionColumn = {
  label: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  /** grid track, e.g. "minmax(140px,1.1fr)" */
  width: string
}

export function NotionTable({
  columns,
  rows,
  emptyLabel = "No results",
  minWidth = 560,
}: {
  columns: NotionColumn[]
  rows: ReactNode[][]
  emptyLabel?: string
  minWidth?: number
}) {
  const template = columns.map((c) => c.width).join("_")
  const gridStyle = { gridTemplateColumns: columns.map((c) => c.width).join(" ") }
  void template

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-md bg-hover px-2 py-1 text-[13px] font-medium text-foreground">
          <Table2 className="size-[14px] text-muted" strokeWidth={1.75} />
          Table
        </span>
        <span className="rounded-md bg-[var(--blue-btn)] px-2.5 py-1 text-[13px] font-medium text-white shadow-sm">
          New
        </span>
      </div>

      <div className="notion-scroll -mx-1 overflow-x-auto px-1">
        <div style={{ minWidth }}>
          <div className="grid border-b border-t border-border" style={gridStyle}>
            {columns.map((column, i) => {
              const Icon = column.icon
              return (
                <div
                  key={column.label}
                  className={`flex items-center gap-1.5 px-2 py-1.5 text-[13px] text-muted ${
                    i < columns.length - 1 ? "border-r border-border" : ""
                  }`}
                >
                  <Icon className="size-[13px] shrink-0 text-faint" strokeWidth={1.75} />
                  <span className="truncate">{column.label}</span>
                </div>
              )
            })}
          </div>

          {rows.length > 0 ? (
            rows.map((cells, r) => (
              <div
                key={r}
                className="grid border-b border-border transition-colors hover:bg-hover/60"
                style={gridStyle}
              >
                {cells.map((cell, c) => (
                  <div
                    key={c}
                    className={`min-w-0 px-2 py-1.5 text-[14px] ${
                      c < columns.length - 1 ? "border-r border-border" : ""
                    }`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="border-b border-border px-2 py-3 text-[14px] text-faint">
              {emptyLabel}
            </div>
          )}

          <div className="flex items-center gap-1.5 px-2 py-2 text-[14px] text-faint">
            <Plus className="size-[14px]" strokeWidth={1.75} />
            New page
          </div>
        </div>
      </div>
    </div>
  )
}

export function RowIcon({
  logo,
  domain,
  fallback,
  fit = "contain",
}: {
  logo?: string
  domain?: string
  fallback: string
  /** "cover" fills the tile edge to edge; "contain" letterboxes inside it */
  fit?: "contain" | "cover"
}) {
  const src = logo ?? (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null)

  if (!src) {
    return (
      <span
        aria-hidden="true"
        className="flex size-[18px] shrink-0 items-center justify-center rounded-[4px] bg-foreground text-[10px] font-medium text-background"
      >
        {fallback}
      </span>
    )
  }

  return (
    <span className="size-[18px] shrink-0 overflow-hidden rounded-[4px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={18}
        height={18}
        className={`size-[18px] ${fit === "cover" ? "object-cover" : "object-contain"}`}
      />
    </span>
  )
}
