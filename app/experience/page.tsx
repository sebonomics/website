import type { Metadata } from "next"

import { Entries, Entry, PageTitle } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { fellowships } from "@/lib/fellowships"
import { experience } from "@/lib/home"

export const metadata: Metadata = {
  title: "Experience",
  description: "Companies, roles, and fellowships — Sebastian Tan",
}

type Row = { name: string; detail: string; href?: string }

/** every group shares one column, so all three line up down the page */
const TITLE_COLUMN = "10.5rem"

/** a muted label above the same rows Reading and Investing use */
function Group({ label, rows }: { label: string; rows: Row[] }) {
  if (rows.length === 0) return null

  return (
    <section className="mt-8 first:mt-0">
      <p className="text-[13px] font-medium text-muted">{label}</p>
      <Entries titleWidth={TITLE_COLUMN}>
        {rows.map((row) => (
          <Entry
            key={`${row.name}-${row.detail}`}
            title={row.name}
            href={row.href}
            meta={row.detail}
          />
        ))}
      </Entries>
    </section>
  )
}

export default function ExperiencePage() {
  const toRow = (e: (typeof experience)[number]): Row => ({
    name: e.company,
    detail: e.role,
    href: e.href,
  })

  const current = experience.filter((e) => e.end === "Present").map(toRow)
  const previous = experience.filter((e) => e.end !== "Present").map(toRow)
  const fellowship = fellowships.map((f) => ({
    name: f.program,
    detail: f.role,
    href: f.href,
  }))

  return (
    <PageShell>
      <PageTitle>Experience</PageTitle>

      <div className="mt-3">
        <Group label="Currently" rows={current} />
        <Group label="Previously" rows={previous} />
        <Group label="Fellowships" rows={fellowship} />
      </div>
    </PageShell>
  )
}
