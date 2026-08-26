"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

/** the same pages the sidebar lists under Favorites */
const pages = [
  { href: "/", label: "About" },
  { href: "/investments", label: "Investing" },
  { href: "/reading", label: "Reading" },
  { href: "/writing", label: "Writing" },
]

/**
 * Mobile navigation: the pages as text buttons inside the topbar, in place of
 * the breadcrumb — the active one names the current page, so nothing is lost.
 * Evenly padded and grouped to the left rather than stretched across the bar,
 * which leaves a clean gap before the theme toggle. On a very narrow screen the
 * row scrolls sideways rather than wrapping.
 */
export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Pages"
      className="notion-scroll -mx-1 flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto px-1 md:hidden"
      style={{ scrollbarWidth: "none" }}
    >
      {pages.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 whitespace-nowrap rounded-md px-2 py-1 text-[13px] transition-colors ${
              active
                ? "bg-hover font-medium text-foreground"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
