import type { Metadata } from "next"

import { Entries, Entry, PageTitle, Paragraph } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { investments } from "@/lib/investments"

export const metadata: Metadata = {
  title: "Investing",
  description: "Scout checks and angel investments — Sebastian Tan",
}

export default function InvestmentsPage() {
  return (
    <PageShell icon="investments" title="Investing">
      <PageTitle>Investing</PageTitle>

      <div className="mb-7">
        <Paragraph>
          I scout for Andreessen Horowitz and Afore Capital. I’ve also held fellowships at Notable
          Capital, Comma Capital, and ZFellows. I am happy to provide warm introductions to these, or
          First Round Capital, Pear VC, CRV, Pareto Holdings, Liquid2, and others.
        </Paragraph>
      </div>

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
