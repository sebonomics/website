import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/site"
import { writingPosts, writingPostHref } from "@/lib/writing"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const pages = ["", "/experience", "/investments", "/people", "/writing"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }))

  const posts = writingPosts.map((post) => ({
    url: `${siteUrl}${writingPostHref(post.slug)}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }))

  return [...pages, ...posts]
}
