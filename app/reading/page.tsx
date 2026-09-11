import type { Metadata } from "next"

import { Entries, Entry } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { reading } from "@/lib/reading"

export const metadata: Metadata = {
  title: "Reading",
  description: "Favorite essays and things worth re-reading — Sebastian Tan",
}

export default function ReadingPage() {
  return (
    <PageShell>
      <div className="mt-6">
        <Entries>
        {reading.map((item) => (
          <Entry
            key={item.title}
            title={item.title}
            href={item.href}
            meta={item.author}
          />
        ))}
        </Entries>
      </div>
    </PageShell>
  )
}
