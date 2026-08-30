import type { Metadata } from "next"

import { PageTitle } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { fellowships } from "@/lib/fellowships"
import { experience } from "@/lib/home"

export const metadata: Metadata = {
  title: "Experience",
  description: "Companies, roles, and fellowships — Sebastian Tan",
}

type Row = { name: string; detail: string; href?: string }

/**
 * A monospace tree: a muted section label, then one row per entry hanging off a
 * vertical rule. The rule is drawn per row rather than on the list, so the last
 * row can stop it at its own tick — the `└` of a box-drawing tree, without
 * relying on the glyphs lining up.
 */
function Branch({ label, rows }: { label: string; rows: Row[] }) {
  if (rows.length === 0) return null

  return (
    <section className="mt-9 first:mt-0 sm:mt-7">
      <p className="text-[13px] text-faint">{label}</p>

      <ul className="mt-2.5 sm:mt-2">
        {rows.map((row, i) => {
          const last = i === rows.length - 1
          const name = "min-w-[11rem] shrink-0 text-faint"
          return (
            <li
              key={`${row.name}-${row.detail}`}
              className="relative flex flex-wrap items-baseline gap-x-4 pb-3.5 pl-6 last:pb-0"
            >
              {/* the vertical rule, stopping at the tick on the final row */}
              <span
                aria-hidden
                className={`absolute left-0 top-0 w-px bg-border-strong ${
                  last ? "h-[0.8em]" : "h-full"
                }`}
              />
              {/* the tick out to the row */}
              <span
                aria-hidden
                className="absolute left-0 top-[0.8em] h-px w-3.5 bg-border-strong"
              />

              {row.href ? (
                <a
                  href={row.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${name} transition-colors hover:text-foreground`}
                >
                  {row.name}
                </a>
              ) : (
                <span className={name}>{row.name}</span>
              )}
              <span className="text-foreground">{row.detail}</span>
            </li>
          )
        })}
      </ul>
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
    <PageShell icon="experience" title="Experience">
      <PageTitle>Experience</PageTitle>

      <div className="mt-5 font-mono text-[14px] leading-[1.6] sm:mt-4">
        <Branch label="Currently" rows={current} />
        <Branch label="Previously" rows={previous} />
        <Branch label="Fellowships" rows={fellowship} />
      </div>
    </PageShell>
  )
}
