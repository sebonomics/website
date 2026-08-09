import type { Metadata } from "next"
import Link from "next/link"

import { Callout, PageTitle, Paragraph } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { writingPostHref, writingPosts } from "@/lib/writing"

export const metadata: Metadata = {
  title: "Writing — Sebastian Tan",
  description: "Essays and writing by Sebastian Tan",
}

export default function WritingPage() {
  return (
    <PageShell icon="✍️" title="Writing">
      <PageTitle>Writing</PageTitle>

      <Callout>Notes on technology, investing, and whatever else I&apos;m chewing on.</Callout>

      {writingPosts.length > 0 ? (
        <ul className="mt-4">
          {writingPosts.map((post) => (
            <li key={post.slug} className="border-b border-border last:border-b-0">
              <Link
                href={writingPostHref(post.slug)}
                className="flex items-center gap-2.5 rounded px-1 py-2.5 transition-colors hover:bg-hover"
              >
                <span className="text-[15px] leading-none">🌻</span>
                <span className="min-w-0 flex-1 truncate text-[16px]">{post.title}</span>
                <span className="shrink-0 text-[13px] text-faint">{post.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Paragraph>
          <span className="text-faint">No pages inside. First one&apos;s coming.</span>
        </Paragraph>
      )}
    </PageShell>
  )
}
