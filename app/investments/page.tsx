import type { Metadata } from "next"

import { Entries, Entry, PageTitle } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { investments } from "@/lib/investments"

export const metadata: Metadata = {
  title: "Investing",
  description: "Scout checks and angel investments — Sebastian Tan",
}

export default function InvestmentsPage() {
  return (
    <PageShell>
      <PageTitle>Investing</PageTitle>

      <Entries>
        {investments.map((item) => (
          <Entry
            key={item.company}
            title={item.company}
            href={item.href}
            meta={[item.stage, item.date].filter(Boolean).join(", ")}
            note={item.note}
          />
        ))}
      </Entries>
    </PageShell>
  )
}
