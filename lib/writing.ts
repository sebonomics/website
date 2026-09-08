export type WritingPost = {
  slug: string
  title: string
  date: string
  blocks: (string | { items: string[] })[]
}

export const writingPosts: WritingPost[] = [
  {
    slug: "contrarian-and-right",
    title: "Contrarian & Right",
    date: "Sep 7, 2026",
    blocks: [
      "Any Kalshi better will tell you that in a 99% to 1% market, if you bet with consensus, and are right, you return 1x. But if you bet against consensus and are right, you return 100x.",
      "It becomes obvious that the way you make a lot of money or create a lot of impact is to find places where 99% people are mistaken and you are right. But it’s easier said than done.",
      "In venture, and in life, this concept is called being contrarian and right.",
      "Most people miss most things. They don’t question the things they hear and genuinely consider what things are important in the world. And this creates enormous opportunities for the people who are willing to put in the work and tackle incredibly hard and nuanced issues.",
      "Arguably, some of the greatest current technological and entrepreneurial feats are in areas that most people are afraid to touch.",
      {
        items: [
          "Reindustrializing U.S. manufacturing capabilities",
          "Producing rare earth metals here instead of abroad",
          "Building ships for the U.S. Navy.",
          "Genomic editing and mapping",
        ],
      },
      "Instead, we are building:",
      {
        items: [
          "A 24th AI personal assistant",
          "A 6th hiring platform for startups (this one was me)",
          "A 10th web crawler API",
        ],
      },
      "The biggest mistake that I personally made when initially starting a company was not thinking big enough. And I think this is a problem that many exceptionally ambitious people make. We funnel kids directly into consulting, banking, and software engineering jobs where they will climb a corporate ladder for the rest of their life without thinking twice about if there was another option.",
      "In my opinion, some of the best routes and choices can be found in places where the 99% won’t dare to go.",
      {
        items: [
          "Maybe dropping out of school for a life changing opportunity is a better decision than staying for four years and doing consulting.",
          "Maybe taking a gap year to work at a frontier technology company could teach you a lot about the world.",
          "Maybe creating something that no one else has built before could create a larger outcome than doing something that already exists.",
          "Maybe befriending older and more experienced people you admire is a way to maximize your potential and grow exponentially.",
          "Maybe the mere fact that most people aren’t willing to pursue something is the exact reason why you should pursue it.",
        ],
      },
      "This is all to say that the real alpha is found in places where the 99% are not willing to look. Brilliant thinking is rare, but courage is in even shorter supply than genius.",
    ],
  },
]

export function getWritingPost(slug: string): WritingPost | undefined {
  return writingPosts.find((post) => post.slug === slug)
}

export function writingPostHref(slug: string): string {
  return `/writing/${slug}`
}
