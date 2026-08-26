export type Reading = {
  title: string
  author?: string
  /** e.g. "Essay", "Book", "Talk" — rendered as a pill */
  kind?: string
  href?: string
  /** favicon domain, or a local logo path via `logo` */
  domain?: string
  logo?: string
  initial?: string
  /** "cover" makes the logo fill its tile */
  fit?: "contain" | "cover"
}

/**
 * Favorite essays and things worth re-reading. Add rows here and they show up on /reading.
 *
 * Example:
 * {
 *   title: "The Ultimate Engine of Progress",
 *   author: "Jane Doe",
 *   kind: "Essay",
 *   href: "https://example.com/essay",
 *   domain: "example.com",
 * },
 */
export const reading: Reading[] = [
  {
    title: "How to Earn a Billion Dollars",
    author: "Paul Graham",
    kind: "Essay",
    href: "https://paulgraham.com/earn.html",
    logo: "/yc.png",
    fit: "cover",
  },
  {
    title: "Is YC for Cowards?",
    author: "Bassel Ojjeh",
    kind: "Essay",
    href: "https://stanfordreview.org/is-yc-for-cowards/",
    logo: "/stanford-review.png",
    fit: "cover",
  },
  {
    title: "Competition is for Losers",
    author: "Peter Thiel",
    kind: "Essay",
    href: "https://www.wsj.com/articles/peter-thiel-competition-is-for-losers-1410535536",
    domain: "wsj.com",
  },
  {
    title: "Situational Awareness",
    author: "Leopold Aschenbrenner",
    kind: "Essay",
    href: "https://situational-awareness.ai/",
    domain: "situational-awareness.ai",
  },
  {
    title: "The Allegory of the Cave",
    author: "Plato",
    kind: "Essay",
    href: "https://web.sbu.edu/theology/bychkov/plato%20republic%207.pdf",
    domain: "sbu.edu",
  },
]
