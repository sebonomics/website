import type { Metadata } from "next"

import { ExperienceTable } from "@/components/experience-table"
import { Callout, PageTitle } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Experience — Sebastian Tan",
  description: "Companies and experience — Sebastian Tan",
}

export default function ExperiencePage() {
  return (
    <PageShell icon="experience" title="Experience">
      <PageTitle>Experience</PageTitle>

      <Callout>Everything I&apos;ve built, shipped, or helped fund.</Callout>

      <div className="mt-3">
        <ExperienceTable />
      </div>
    </PageShell>
  )
}
