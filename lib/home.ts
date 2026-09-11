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

export type AboutItem = { html: string; image?: { src: string; alt: string } }

/**
 * The About section, one entry per paragraph. `html` is rendered as-is — use
 * <a class="notion-link"> and <span class="hl"> the same way the rest of the
 * page does.
 */
export const aboutItems: AboutItem[] = [
  {
    html: `I currently run <a class="notion-link photo-link" href="https://formenos.ai/" target="_blank" rel="noopener noreferrer">Formenos</a>, a $25M AI-Native L/S Equity Hedge Fund. We’re backed by the first investors in Cognition and Etched.`,
    image: { src: "/formenos-group.png", alt: "Group photo accompanying my Formenos backstory" },
  },
  {
    html: `In middle school, I loved building computers. I turned one of them into an Ethereum mine in my basement and almost blew up our house.`,
    image: { src: "/ethereum-mine.png", alt: "The Ethereum mining setup I built in my basement" },
  },
  {
    html: `In high school, I built a job-matching algorithm for people with criminal records and was the youngest member of the U.S. National Economics Team.`,
    image: { src: "/high-school-economics.jpg", alt: "Our economics team being interviewed in high school" },
  },
  {
    html: `After high school, I took a gap year from Stanford to work at <a class="notion-link photo-link" href="https://palantir.com/" target="_blank" rel="noopener noreferrer">Palantir</a> in New York. I originally grew up in Pittsburgh and I live in SF today.`,
    image: { src: "/palantir-group.jpg", alt: "A photo from my time at Palantir" },
  },
  {
    html: `I love hiking, running, and anything outdoors or with friends. Before I die, I wanna learn how to sail and visit every country in the world.`,
    image: { src: "/friends.jpg", alt: "A photo with friends" },
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
    role: "Founder",
    start: "Aug 2026",
    end: "Present",
    highlight: "Outperforming Citadel, Millennium, and Bridgewater YTD",
    blurb: "AI-native hedge fund.",
    href: "https://formenos.ai",
    // formenos.ai serves no favicon yet — keep the old mark until it does
    domain: "bayesstreet.com",
  },
  {
    company: "Andreessen Horowitz",
    role: "Scout",
    start: "Jan 2026",
    end: "Present",
    highlight: "$10k–$25k checks through the scout fund",
    blurb: "Referral path into both the main fund and Speedrun.",
    href: "https://a16z.com",
    domain: "a16z.com",
  },
  {
    company: "Palantir",
    role: "Intern",
    start: "Aug 2025",
    end: "Nov 2025",
    location: "New York City Metropolitan Area",
    highlight: "Data Infrastructure",
    blurb: "Youngest intern on Foundry Data Connection. Built {ORCON}, deployed to hundreds of customers.",
    href: "https://palantir.com",
    domain: "palantir.com",
  },
  {
    company: "Willow Voice",
    role: "Intern",
    start: "",
    end: "",
    href: "https://willowvoice.com",
    domain: "willowvoice.com",
  },
  {
    company: "Code Four",
    role: "Intern",
    start: "Jun 2025",
    end: "Aug 2025",
    location: "Pennsylvania, United States",
    blurb: "Built GTM tooling reaching thousands of police departments across the United States.",
    href: "https://codefour.us",
    domain: "codefour.us",
  },
]
