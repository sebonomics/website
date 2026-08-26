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
 * Mobile navigation: the pages as rows inside the topbar, in place of the
 * breadcrumb — the active one names the current page, so nothing is lost. It
 * borrows the sidebar's styling exactly (14px, 30px tall, `bg-active` when
 * selected) so the two read as the same control at different breakpoints.
 * Grouped left rather than stretched, which leaves a clean gap before the theme
 * toggle. On a very narrow screen the row scrolls sideways rather than wrapping.
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
            // same treatment as the sidebar's rows, just laid out horizontally
            className={`flex h-[30px] shrink-0 items-center whitespace-nowrap rounded-md px-2 text-[14px] transition-colors ${
              active ? "bg-active text-foreground" : "text-foreground/80 hover:bg-hover"
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
