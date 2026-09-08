"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const pages = [
  { href: "/investments", label: "Investing" },
  { href: "/reading", label: "Reading" },
  { href: "/writing", label: "Writing" },
]

/**
 * A small, text-first navigation. The name is home; the rest is deliberately
 * quiet so the page content—not the chrome—gets the attention.
 */
export function SiteNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Pages"
      className="notion-scroll -mx-1 flex min-w-0 flex-1 items-center gap-3 overflow-x-auto px-1 py-1 font-serif"
      style={{ scrollbarWidth: "none" }}
    >
      <Link href="/" className="shrink-0 whitespace-nowrap text-[17px] leading-[1.15] text-foreground">
        Sebastian
      </Link>
      {pages.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 whitespace-nowrap text-[17px] leading-[1.15] transition-colors ${
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
