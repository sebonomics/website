import { Building2, FileText, User } from "lucide-react"

import { NotionTable, RowIcon, type NotionColumn } from "@/components/notion-table"
import { people } from "@/lib/people"

const columns: NotionColumn[] = [
  { label: "Name", icon: User, width: "minmax(160px,1.1fr)" },
  { label: "Company", icon: Building2, width: "minmax(150px,1fr)" },
  { label: "Note", icon: FileText, width: "minmax(200px,1.4fr)" },
]

export function PeopleTable() {
  const rows = people.map((row) => [
    <span key="name" className="flex items-center gap-2">
      <RowIcon logo={row.logo} domain={row.domain} fallback={row.initial ?? row.name.charAt(0)} />
      {row.href ? (
        <a href={row.href} target="_blank" rel="noopener noreferrer" className="notion-link truncate">
          {row.name}
        </a>
      ) : (
        <span className="truncate">{row.name}</span>
      )}
    </span>,
    <span key="company" className="block truncate text-foreground/90">
      {row.company ?? ""}
    </span>,
    <span key="note" className="block truncate text-foreground/90">
      {row.note ?? ""}
    </span>,
  ])

  return (
    <NotionTable
      columns={columns}
      rows={rows}
      minWidth={620}
      emptyLabel="No results — add rows in lib/people.ts"
    />
  )
}
