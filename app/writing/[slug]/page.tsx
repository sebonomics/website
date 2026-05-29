import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/page-shell"
import { SocialFooter } from "@/components/social-footer"
import { getWritingPost, writingPosts } from "@/lib/writing"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return writingPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getWritingPost(slug)

  if (!post) {
    return { title: "Writing — Sebastian Tan" }
  }

  return {
    title: `${post.title} — Sebastian Tan`,
    description: post.paragraphs[0],
  }
}

export default async function WritingArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getWritingPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <PageShell>
      <article className="flex flex-1 flex-col justify-center space-y-10 text-[17px] leading-[1.65] sm:text-[18px]">
        <header className="space-y-3">
          <Link
            href="/writing"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← Writing
          </Link>
          <h1 className="text-foreground">{post.title}</h1>
          <p className="text-sm text-muted">{post.date}</p>
        </header>

        <div className="space-y-6">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </article>

      <SocialFooter />
    </PageShell>
  )
}
