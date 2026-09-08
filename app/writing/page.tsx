import type { Metadata } from "next"
import { Entries, Entry, Paragraph } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { writingPostHref, writingPosts } from "@/lib/writing"

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and writing by Sebastian Tan",
}

export default function WritingPage() {
  return (
    <PageShell>
      <div className="mt-5 sm:mt-6">
        {writingPosts.length > 0 ? (
          <Entries titleWidth="min(12.18rem, 60%)">
            {writingPosts.map((post) => (
              <Entry
                key={post.slug}
                title={post.title}
                href={writingPostHref(post.slug)}
                meta={post.date}
              />
            ))}
          </Entries>
        ) : (
          <Paragraph>
            <span className="text-faint">No pages inside. First one&apos;s coming.</span>
          </Paragraph>
        )}
      </div>
    </PageShell>
  )
}
