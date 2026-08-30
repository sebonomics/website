import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PageTitle } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
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
    return { title: "Writing" }
  }

  return {
    title: post.title,
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
      <PageTitle>{post.title}</PageTitle>
      <p className="mb-6 text-[13px] text-faint">{post.date}</p>

      <article className="space-y-4">
        {post.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-[16px] leading-[1.7]">
            {paragraph}
          </p>
        ))}
      </article>
    </PageShell>
  )
}
