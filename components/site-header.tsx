"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/music", label: "Music" },
  { href: "/calendar", label: "Calendar" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="mb-16 flex items-start justify-between gap-4">
      <nav className="flex flex-wrap gap-6 text-[15px]">
        {navLinks.map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={
                active
                  ? "text-foreground underline decoration-accent/55 underline-offset-4"
                  : "text-muted transition-colors hover:text-foreground"
              }
            >
              {label}
            </Link>
          )
        })}
      </nav>
      <ThemeToggle />
    </header>
  )
}
