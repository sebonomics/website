import type { Metadata } from "next"

import { PageTitle, Entries, Entry, H2 } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { investments, sourced } from "@/lib/investments"

export const metadata: Metadata = {
  title: "Investing",
  description: "Scout checks and angel investments — Sebastian Tan",
}

export default function InvestmentsPage() {
  return (
    <PageShell>
      <PageTitle>Investing</PageTitle>
      <div className="mt-6">
        <div>
          <H2>Investor</H2>
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
          <H2>Sourced</H2>
          <Entries>
            {sourced.map((item) => (
              <Entry key={item.company} title={item.company} href={item.href} meta={["a16z Speedrun", item.date].filter(Boolean).join(", ")} />
            ))}
          </Entries>
        </div>
      </div>
    </PageShell>
  )
}
