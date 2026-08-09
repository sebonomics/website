import type { Metadata } from "next"

import { InvestmentsTable } from "@/components/investments-table"
import { Callout, PageTitle } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Investments — Sebastian Tan",
  description: "Scout checks and angel investments — Sebastian Tan",
}

export default function InvestmentsPage() {
  return (
    <PageShell icon="💸" title="Investments">
      <PageTitle>Investments</PageTitle>

      <Callout>I write $10k–$25k checks through the a16z scout fund.</Callout>

      <div className="mt-3">
        <InvestmentsTable />
      </div>
    </PageShell>
  )
}
