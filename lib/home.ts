export const profile = {
  name: "Sebastian",
  fullName: "Sebastian Tan",
  pageTitle: "Hey, I'm Sebastian",
  pageEmoji: "👋",
  tagline: "I like technology, investing, and writing.",
  /** shorter line for narrow screens */
  taglineShort: "I like tech, investing, and writing.",
  editedLabel: "Edited Aug 8",
  /** cover photo in /public — falls back to the dot-matrix scene if missing */
  coverImage: "/cover.png",
  /** how the cover photo is cropped inside the banner */
  coverPosition: "center 62%",
}

export const bioHoverNotes = {
  southBeachOffice: "88 King St, San Francisco.",
}

export type AboutItem = { emoji?: string; html: string }

/**
 * `html` is rendered as-is — use <a class="notion-link"> and <span class="hl"> the
 * same way the rest of the page does.
 */
export const aboutItems: AboutItem[] = [
  {
    html: `I live in San Francisco, grew up in Pittsburgh, and took a gap year from Stanford`,
  },
  {
    html: `Building <a class="notion-link" href="https://formenos.ai" target="_blank" rel="noopener noreferrer">Formenos</a>, the AI-native hedge fund, investing through <a class="notion-link" href="https://a16z.com" target="_blank" rel="noopener noreferrer">a16z</a>'s scout fund`,
  },
  {
    html: `I love hiking, running, eating, and anything outdoors or with friends`,
  },
  {
    html: `Before I die: hike every national park, learn how to sail, and travel across Europe`,
  },
]

export const nowPlaying = {
  artist: "Drake",
  track: "Nokia",
  href: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
}

export type DockApp = {
  name: string
  icon: string
  running?: boolean
  href?: string
  /** red notification badge count, like a real dock */
  badge?: number
}

/**
 * Matches the real dock, left to right. Icons are drawn SVG unless the entry in
 * components/dock.tsx points at an image file in /public.
 */
export const dockApps: DockApp[] = [
  { name: "Messages", icon: "messages" },
  { name: "Chrome", icon: "chrome", href: "https://www.google.com/chrome/" },
  { name: "System Settings", icon: "settings", badge: 1 },
  { name: "Slack", icon: "slack", href: "https://slack.com" },
  { name: "Slashy", icon: "slashy", href: "https://slashy.com" },
  { name: "Granola", icon: "spiral", href: "https://www.granola.ai" },
  { name: "Cursor", icon: "cursor", href: "https://cursor.com" },
  { name: "Willow Voice", icon: "layers", href: "https://willowvoice.com" },
  { name: "Anticipate", icon: "anticipate", href: "https://useanticipate.com" },
  { name: "Claude", icon: "claude", href: "https://claude.ai" },
  { name: "Notion", icon: "notion", href: "https://www.notion.so", running: true },
]

export type ExperienceRow = {
  company: string
  role: string
  start: string
  end: string
  href?: string
  /** favicon domain, or a local logo path via `logo` */
  domain?: string
  logo?: string
  /** initial fallback when there is no logo */
  initial?: string
  /** short headline achievement, LinkedIn-style */
  highlight?: string
  /** where the role was based */
  location?: string
  /** longer description — not rendered today, kept for when you want a Notes column */
  blurb?: string
}

/**
 * Titles, dates, locations and highlights match LinkedIn.
 * NOTE: Bayes Street and a16z are not on LinkedIn — their dates are still guesses.
 */
export const experience: ExperienceRow[] = [
  {
    company: "Formenos",
    role: "Founder & CEO",
    start: "Aug 2026",
    end: "Present",
    highlight: "Outperforming Citadel, Millennium, and Bridgewater YTD",
    blurb: "AI-native hedge fund.",
    href: "https://formenos.ai",
    // formenos.ai serves no favicon yet — keep the old mark until it does
    domain: "bayesstreet.com",
  },
  {
    company: "Talunt",
    role: "Co-Founder & CEO",
    start: "Jan 2026",
    end: "Jul 2026",
    location: "San Francisco Bay Area",
    highlight: "$215k ARR and 37 customers",
    blurb: "The revenue engine for small businesses. $700K raised at a $25M valuation.",
    href: "https://talunt.ai",
    logo: "/talunt-logo.svg",
  },
  {
    company: "Andreessen Horowitz",
    role: "Venture Scout",
    start: "Jan 2026",
    end: "Present",
    highlight: "$10k–$25k checks through the scout fund",
    blurb: "Referral path into both the main fund and Speedrun.",
    href: "https://a16z.com",
    domain: "a16z.com",
  },
  {
    company: "Palantir Technologies",
    role: "Software Engineer Intern",
    start: "Aug 2025",
    end: "Nov 2025",
    location: "New York City Metropolitan Area",
    highlight: "Data Infrastructure",
    blurb: "Youngest intern on Foundry Data Connection. Built {ORCON}, deployed to hundreds of customers.",
    href: "https://palantir.com",
    domain: "palantir.com",
  },
  {
    company: "Beacon (Acquired)",
    role: "Co-Founder & COO",
    start: "Jun 2025",
    end: "Aug 2025",
    location: "Seattle, Washington",
    highlight: "6-figure acquisition",
    blurb: "MCP infrastructure for GTM teams. Acquired by Pioneer Square Labs when I was 18.",
    href: "https://www.psl.com/",
    logo: "/beacon-logo.svg",
  },
  {
    company: "Code Four",
    role: "GTM Engineer Intern",
    start: "Jun 2025",
    end: "Aug 2025",
    location: "Pennsylvania, United States",
    blurb: "Built GTM tooling reaching thousands of police departments across the United States.",
    href: "https://codefour.us",
    domain: "codefour.us",
  },
]
