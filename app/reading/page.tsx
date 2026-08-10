import type { Metadata } from "next"

import { PageTitle } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { ReadingTable } from "@/components/reading-table"

export const metadata: Metadata = {
  title: "Reading",
  description: "Favorite essays and things worth re-reading — Sebastian Tan",
}

export default function ReadingPage() {
  return (
    <PageShell icon="reading" title="Reading">
      <PageTitle>Reading</PageTitle>

      <div className="mt-3">
        <ReadingTable />
      </div>
    </PageShell>
  )
}
