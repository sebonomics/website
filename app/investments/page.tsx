import type { Metadata } from "next"

import { Entries, Entry, Paragraph } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { investments } from "@/lib/investments"

export const metadata: Metadata = {
  title: "Investing",
  description: "Scout checks and angel investments — Sebastian Tan",
}

export default function InvestmentsPage() {
  return (
    <PageShell>
      <div className="mt-5 sm:mt-6">
        <Paragraph>
          I scout for Andreessen Horowitz and Afore Capital. I also personally write $10–25k checks.
        </Paragraph>
        <div className="mt-6">
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
        </div>
      </div>
    </PageShell>
  )
}
