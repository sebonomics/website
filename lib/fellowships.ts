export type Fellowship = {
  program: string
  role: string
  start?: string
  end?: string
  href?: string
  /** favicon domain, or a local logo path via `logo` */
  domain?: string
  logo?: string
  initial?: string
}

/**
 * NOTE: dates are blank until you fill them in, and the favicon domains below are
 * my best guess at each program's site — swap any that point somewhere wrong.
 */
export const fellowships: Fellowship[] = [
  {
    program: "ZFellows",
    role: "Fellow",
    href: "https://www.zfellows.com",
    domain: "zfellows.com",
  },
  {
    program: "Rise",
    role: "Rise Fellow",
    href: "https://www.risefortheworld.org",
    domain: "risefortheworld.org",
  },
  {
    program: "Notable Capital",
    role: "Fellow",
    href: "https://www.notablecap.com",
    domain: "notablecap.com",
  },
]
