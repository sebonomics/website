import type { Metadata } from "next"

import { InvestmentsTable } from "@/components/investments-table"
import { PageTitle } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Investments",
  description: "Scout checks and angel investments — Sebastian Tan",
}

export default function InvestmentsPage() {
  return (
    <PageShell icon="investments" title="Investments">
      <PageTitle>Investments</PageTitle>

      <div className="mt-3">
        <InvestmentsTable />
      </div>
    </PageShell>
  )
}
