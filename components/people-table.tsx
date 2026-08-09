import { Building2, Linkedin, User } from "lucide-react"

import { NotionTable, RowIcon, type NotionColumn } from "@/components/notion-table"
import { people } from "@/lib/people"

const columns: NotionColumn[] = [
  { label: "Name", icon: User, width: "minmax(160px,1fr)" },
  { label: "Company", icon: Building2, width: "minmax(180px,1.1fr)" },
  { label: "LinkedIn", icon: Linkedin, width: "minmax(150px,0.9fr)" },
]

export function PeopleTable() {
  const rows = people.map((row) => [
    <span key="name" className="flex items-center">
      {row.href ? (
        <a href={row.href} target="_blank" rel="noopener noreferrer" className="notion-link truncate">
          {row.name}
        </a>
      ) : (
        <span className="truncate">{row.name}</span>
      )}
    </span>,
    <span key="company" className="flex items-center gap-2 text-foreground/90">
      {row.company ? (
        <>
          <RowIcon
            logo={row.logo}
            domain={row.domain}
            fallback={row.initial ?? row.company.charAt(0)}
          />
          <span className="truncate">{row.company}</span>
        </>
      ) : null}
    </span>,
    <span key="linkedin" className="block truncate">
      {row.linkedin ? (
        <a
          href={row.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="notion-link text-foreground/90"
        >
          {row.linkedin.replace(/^https:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "")}
        </a>
      ) : null}
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
