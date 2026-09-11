import type { Metadata } from "next"

import { PageTitle, Entries, Entry } from "@/components/notion-blocks"
import { ScrambleText } from "@/components/scramble-text"
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
          <h2 className="mb-3 font-serif text-[17px] font-normal leading-tight"><ScrambleText>Investor</ScrambleText></h2>
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
          <h2 className="mb-3 mt-8 font-serif text-[17px] font-normal leading-tight"><ScrambleText>Sourced</ScrambleText></h2>
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
