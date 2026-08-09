import type { Metadata } from "next"

import { Callout, PageTitle } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { PeopleTable } from "@/components/people-table"

export const metadata: Metadata = {
  title: "People — Sebastian Tan",
  description: "People worth knowing — Sebastian Tan",
}

export default function PeoplePage() {
  return (
    <PageShell icon="people" title="People">
      <PageTitle>People</PageTitle>

      <Callout>Some of the most interesting people I&apos;ve gotten to know.</Callout>

      <div className="mt-3">
        <PeopleTable />
      </div>
    </PageShell>
  )
}
