import type { ReactNode } from "react"
import Link from "next/link"

export function AccentLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http")

  return (
    <Link
      href={href}
      className="text-accent underline decoration-accent/45 underline-offset-[3px] transition-colors hover:text-accent-hover hover:decoration-accent-hover/60"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  )
}
