export type Investment = {
  company: string
  /** e.g. "Pre-seed", "Seed", "Series A" */
  stage?: string
  /** e.g. "Jan 2026" */
  date?: string
  /** short one-liner on what they do */
  note?: string
  href?: string
  /** favicon domain, or a local logo path via `logo` */
  domain?: string
  logo?: string
  initial?: string
  /** "cover" makes the logo fill its tile */
  fit?: "contain" | "cover"
}

/**
 * Scout checks. Add rows here and they show up on /investments.
 *
 * Example:
 * {
 *   company: "Acme",
 *   stage: "Pre-seed",
 *   date: "Feb 2026",
 *   note: "Agents for warehouse ops",
 *   href: "https://acme.com",
 *   domain: "acme.com",
 * },
 */
export const investments: Investment[] = [
  { company: "Memorable", stage: "Pre-Seed", date: "Aug 2026", href: "https://memorable.sh/" },
  { company: "Volaren", stage: "Pre-Seed", date: "Jul 2026", href: "https://www.volaren.ai/" },
  { company: "Anticipate", stage: "Pre-Seed", date: "Jul 2026", href: "https://www.useanticipate.com/" },
  { company: "Merchant", stage: "Pre-Seed", date: "Aug 2026", href: "https://www.merchantgo.com/" },
]

export const sourced: Investment[] = [
  { company: "Vela Energy", date: "Jul 2026", href: "https://www.velaenergy.ai/" },
  { company: "Wallyworks", date: "Sep 2026", href: "https://www.wallyworks.co/" },
]
