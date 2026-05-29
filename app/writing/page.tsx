import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { SocialFooter } from "@/components/social-footer"
import { writingPostHref, writingPosts } from "@/lib/writing"

export const metadata: Metadata = {
  title: "Writing — Sebastian Tan",
  description: "Essays and writing by Sebastian Tan",
}

export default function WritingPage() {
  return (
    <PageShell>
      <div className="flex flex-1 flex-col justify-center space-y-10 text-[17px] leading-[1.65] sm:text-[18px]">
        <section className="space-y-6">
          <h1 className="text-sm tracking-wide text-muted">Writing</h1>

          {writingPosts.length > 0 ? (
            <ul className="space-y-5">
              {writingPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={writingPostHref(post.slug)}
                    className="group block space-y-1"
                  >
                    <span className="text-accent underline decoration-accent/45 underline-offset-[3px] transition-colors group-hover:text-accent-hover group-hover:decoration-accent-hover/60">
                      {post.title}
                    </span>
                    <span className="block text-sm text-muted">{post.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Nothing published here yet.</p>
          )}
        </section>
      </div>

      <SocialFooter />
    </PageShell>
  )
}
