import { Table2, Tag, User } from "lucide-react"

import { NotionTable, RowIcon, type NotionColumn } from "@/components/notion-table"
import { reading } from "@/lib/reading"

const columns: NotionColumn[] = [
  { label: "Title", icon: Table2, width: "minmax(200px,1.6fr)" },
  { label: "Author", icon: User, width: "minmax(150px,1.1fr)" },
  { label: "Type", icon: Tag, width: "minmax(120px,0.8fr)" },
]

export function ReadingTable() {
  const rows = reading.map((row) => [
    <span key="title" className="flex items-center gap-2">
      <RowIcon
        logo={row.logo}
        domain={row.domain}
        fallback={row.initial ?? row.title.charAt(0)}
        fit={row.fit}
      />
      {row.href ? (
        <a href={row.href} target="_blank" rel="noopener noreferrer" className="notion-link truncate">
          {row.title}
        </a>
      ) : (
        <span className="truncate">{row.title}</span>
      )}
    </span>,
    <span key="author" className="block truncate text-foreground/90">
      {row.author ?? ""}
    </span>,
    row.kind ? (
      <span key="kind" className="inline-flex rounded-[4px] bg-hover px-1.5 py-0.5 text-[13px]">
        {row.kind}
      </span>
    ) : (
      <span key="kind" />
    ),
  ])

  return (
    <NotionTable columns={columns} rows={rows} emptyLabel="No results — add rows in lib/reading.ts" />
  )
}
