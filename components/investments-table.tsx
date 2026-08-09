import { CalendarDays, Table2, Tag } from "lucide-react"

import { NotionTable, RowIcon, type NotionColumn } from "@/components/notion-table"
import { investments } from "@/lib/investments"

const columns: NotionColumn[] = [
  { label: "Company", icon: Table2, width: "minmax(150px,1.1fr)" },
  { label: "Stage", icon: Tag, width: "minmax(190px,1.5fr)" },
  { label: "Date", icon: CalendarDays, width: "minmax(180px,1.2fr)" },
]

export function InvestmentsTable() {
  const rows = investments.map((row) => [
    <span key="company" className="flex items-center gap-2">
      <RowIcon
        logo={row.logo}
        domain={row.domain}
        fallback={row.initial ?? row.company.charAt(0)}
        fit={row.fit}
      />
      {row.href ? (
        <a href={row.href} target="_blank" rel="noopener noreferrer" className="notion-link truncate">
          {row.company}
        </a>
      ) : (
        <span className="truncate">{row.company}</span>
      )}
    </span>,
    row.stage ? (
      <span key="stage" className="inline-flex rounded-[4px] bg-hover px-1.5 py-0.5 text-[13px]">
        {row.stage}
      </span>
    ) : (
      <span key="stage" />
    ),
    <span key="date" className="block truncate whitespace-nowrap text-foreground/90">
      {row.date ?? ""}
    </span>,
  ])

  return (
    <NotionTable
      columns={columns}
      rows={rows}
      emptyLabel="No results — add rows in lib/investments.ts"
    />
  )
}
