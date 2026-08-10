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
    title: "Advice",
    author: "Patrick Collison",
    kind: "Essay",
    href: "https://patrickcollison.com/advice",
    logo: "/stripe.png",
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
]
