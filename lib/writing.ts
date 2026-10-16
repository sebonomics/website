export type WritingPost = {
  slug: string
  title: string
  date: string
  href?: string
  publication?: string
  blocks: (string | { items: string[] })[]
}

export const writingPosts: WritingPost[] = [
  {
    slug: "the-diversity-myth-30-years-later",
    title: "The Diversity Myth 30 Years Later",
    date: "Oct 5, 2026",
    href: "https://stanfordreview.org/the-diversity-myth-30-years-later/",
    publication: "The Stanford Review",
    blocks: [],
  },

]

export function getWritingPost(slug: string): WritingPost | undefined {
  return writingPosts.find((post) => post.slug === slug)
}

export function writingPostHref(slug: string): string {
  return getWritingPost(slug)?.href ?? `/writing/${slug}`
}
