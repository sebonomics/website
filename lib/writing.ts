export type WritingPost = {
  slug: string
  title: string
  date: string
  paragraphs: string[]
}

export const writingPosts: WritingPost[] = []

export function getWritingPost(slug: string): WritingPost | undefined {
  return writingPosts.find((post) => post.slug === slug)
}

export function writingPostHref(slug: string): string {
  return `/writing/${slug}`
}
