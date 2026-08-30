"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const pages = [
  { href: "/", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/investments", label: "Investing" },
  { href: "/reading", label: "Reading" },
  { href: "/writing", label: "Writing" },
]

/**
 * The whole navigation: one row of page links, the same at every width. The
 * active page is the only one at full strength. On a narrow screen the row
 * scrolls sideways rather than wrapping.
 */
export function SiteNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Pages"
      className="notion-scroll -mx-2 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-2"
      style={{ scrollbarWidth: "none" }}
    >
      {pages.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 whitespace-nowrap rounded-md px-2 py-1 text-[14px] transition-colors ${
              active ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
