"use client"

import { useEffect, useMemo, useState } from "react"
import { Building2, ChevronUp, Linkedin, User } from "lucide-react"

import { NotionTable, RowIcon, type NotionColumn } from "@/components/notion-table"
import { people } from "@/lib/people"

const columns: NotionColumn[] = [
  { label: "Name", icon: User, width: "minmax(150px,1fr)" },
  { label: "Company", icon: Building2, width: "minmax(170px,1.1fr)" },
  { label: "LinkedIn", icon: Linkedin, width: "minmax(140px,0.85fr)" },
  { label: "Bumps", icon: ChevronUp, width: "minmax(86px,0.45fr)" },
]

const STORAGE_KEY = "people-bumps"

export function PeopleTable() {
  // no backend, so bumps are stored per-visitor in localStorage
  const [bumps, setBumps] = useState<Record<string, number>>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setBumps(JSON.parse(raw))
    } catch {}
    setLoaded(true)
  }, [])

  const toggleBump = (name: string) => {
    setBumps((prev) => {
      const next = { ...prev }
      if (next[name]) delete next[name]
      else next[name] = 1
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }

  const ordered = useMemo(() => {
    const total = (p: (typeof people)[number]) => (p.bumps ?? 0) + (bumps[p.name] ?? 0)
    // index tiebreak keeps the source order stable for equal counts
    return people
      .map((person, index) => ({ person, index }))
      .sort((a, b) => total(b.person) - total(a.person) || a.index - b.index)
      .map(({ person }) => person)
  }, [bumps])

  const rows = ordered.map((row) => {
    const count = (row.bumps ?? 0) + (bumps[row.name] ?? 0)
    const voted = loaded && Boolean(bumps[row.name])

    return [
      <span key="name" className="block truncate">
        {row.name}
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
      <button
        key="bump"
        type="button"
        onClick={() => toggleBump(row.name)}
        aria-pressed={voted}
        aria-label={voted ? `Remove bump for ${row.name}` : `Bump ${row.name}`}
        title={voted ? "Remove bump" : "Bump"}
        className={`inline-flex items-center gap-1 rounded-[4px] px-1.5 py-0.5 text-[13px] tabular-nums transition-colors ${
          voted
            ? "bg-[var(--blue-btn)] font-medium text-white"
            : "bg-hover text-muted hover:bg-active hover:text-foreground"
        }`}
      >
        <ChevronUp className="size-[13px]" strokeWidth={2.25} />
        {count}
      </button>,
    ]
  })

  return (
    <NotionTable
      columns={columns}
      rows={rows}
      minWidth={680}
      emptyLabel="No results — add rows in lib/people.ts"
    />
  )
}
