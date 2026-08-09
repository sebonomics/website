import { ArrowRight, CalendarDays, Table2, User } from "lucide-react"

import { NotionTable, RowIcon, type NotionColumn } from "@/components/notion-table"
import { fellowships } from "@/lib/fellowships"

const columns: NotionColumn[] = [
  { label: "Program", icon: Table2, width: "minmax(150px,1.1fr)" },
  { label: "Role", icon: User, width: "minmax(190px,1.5fr)" },
  { label: "Date", icon: CalendarDays, width: "minmax(180px,1.2fr)" },
]

export function FellowshipsTable() {
  const rows = fellowships.map((row) => [
    <span key="program" className="flex items-center gap-2">
      <RowIcon logo={row.logo} domain={row.domain} fallback={row.initial ?? row.program.charAt(0)} />
      {row.href ? (
        <a href={row.href} target="_blank" rel="noopener noreferrer" className="notion-link truncate">
          {row.program}
        </a>
      ) : (
        <span className="truncate">{row.program}</span>
      )}
    </span>,
    <span key="role" className="block truncate text-foreground/90">
      {row.role}
    </span>,
    row.start ? (
      <span key="date" className="flex items-center gap-1.5 text-foreground/90">
        <span className="whitespace-nowrap">{row.start}</span>
        <ArrowRight className="size-[13px] shrink-0 text-faint" strokeWidth={2} />
        <span className="whitespace-nowrap">{row.end ?? "Present"}</span>
      </span>
    ) : (
      <span key="date" />
    ),
  ])

  return <NotionTable columns={columns} rows={rows} />
}
