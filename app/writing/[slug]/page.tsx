import type { Metadata } from "next"
import { notFound } from "next/navigation"

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
    description: post.blocks.find((block): block is string => typeof block === "string"),
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
      <h1 className="mt-5 font-serif text-[23px] leading-tight sm:mt-6">{post.title}</h1>
      <p className="mb-6 mt-2 text-[12px] text-faint">{post.date}</p>

      <article className="space-y-5 font-serif text-[17px] leading-[1.6] sm:text-pretty">
        {post.blocks.map((block, index) =>
          typeof block === "string" ? (
            <p key={index}>{block}</p>
          ) : (
            <ul key={index} className="list-disc space-y-2 pl-6">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ),
        )}
      </article>
    </PageShell>
  )
}
