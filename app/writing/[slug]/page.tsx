import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ScrambleText } from "@/components/scramble-text"
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
      <h1 className="mt-5 font-serif text-[23px] leading-tight sm:mt-6"><ScrambleText>{post.title}</ScrambleText></h1>
      <p className="mb-6 mt-2 text-[12px] text-faint"><ScrambleText>{post.date}</ScrambleText></p>

      <article className="space-y-5 font-serif text-[15px] leading-[1.6] text-body-text sm:text-pretty">
        {post.blocks.map((block, index) =>
          typeof block === "string" ? (
            <p key={index}><ScrambleText>{block}</ScrambleText></p>
          ) : (
            <ul key={index} className="list-disc space-y-2 pl-6">
              {block.items.map((item) => (
                <li key={item}><ScrambleText>{item}</ScrambleText></li>
              ))}
            </ul>
          ),
        )}
      </article>
    </PageShell>
  )
}
