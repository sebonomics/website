import type { ReactNode } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const socials = [
  { label: "Twitter", href: "https://twitter.com/sebonomics" },
  { label: "GitHub", href: "https://github.com/sebonomics" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sebonomics" },
  { label: "Email", href: "mailto:sebastian@talunt.io" },
]

function AccentLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http")
  return (
    <Link
      href={href}
      className="text-accent underline decoration-accent/50 underline-offset-2 transition-opacity hover:opacity-80"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  )
}

export default function Home() {
  return (
    <div className="relative z-10 mx-auto flex min-h-dvh max-w-[42rem] flex-col px-8 py-12 sm:px-10 sm:py-14">
      <header className="mb-16 flex items-start justify-between gap-4">
        <nav className="flex gap-6 text-[15px]">
          <Link href="/" className="text-foreground underline decoration-foreground/40 underline-offset-4">
            Sebastian Tan
          </Link>
        </nav>
        <ThemeToggle />
      </header>

      <div className="flex flex-1 flex-col justify-center space-y-12 text-[17px] leading-[1.65] sm:text-[18px]">
        <p>
          I'm originally from Pittsburgh, but I live in San Francisco now. I took a gap year from Stanford and have been
          having a blast so far. Usually you can find me in our office in South Beach, taking runs around Fort Mason, or
          spending weekends with friends.
        </p>

        <section className="space-y-6">
          <h2 className="text-sm tracking-wide text-muted">Companies</h2>

          <div className="space-y-6">
            <p>
              <AccentLink href="https://talunt.io">Talunt</AccentLink> — $25M agentic revenue engine for startups. $240K
              ARR and 20 customers. Backed by ZFellows and angels from DoorDash.
            </p>

            <p>
              <AccentLink href="https://bayesstreet.com">Bayes Street</AccentLink> — Crypto quant fund using HFT. Our
              current strategy has better returns than even frontier hedge funds.
            </p>

            <p>
              <AccentLink href="https://www.psl.com/">Beacon</AccentLink> — Cursor for GTM teams, acquired by a Pioneer
              Square Labs portfolio company. Backed by angels from Kalshi.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm tracking-wide text-muted">Previously</h2>

          <div className="space-y-6">
            <p>
              <AccentLink href="https://www.palantir.com">Palantir</AccentLink> — engineer on the data connection team,
              building Foundry.
            </p>

            <p>
              <AccentLink href="https://willowvoice.com">Willow</AccentLink> — built platform tooling for the team for a
              couple months.
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-16">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
          {socials.map((social, index) => (
            <span key={social.label} className="flex items-center gap-2">
              {index > 0 && <span className="text-muted/50">/</span>}
              <Link
                href={social.href}
                className="text-foreground/80 transition-opacity hover:text-foreground"
                {...(social.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {social.label}
              </Link>
            </span>
          ))}
        </nav>
      </footer>
    </div>
  )
}
