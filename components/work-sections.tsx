import { AccentLink } from "@/components/accent-link"

export function WorkSections() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-wide text-muted">Currently</h2>

        <div className="space-y-4">
          <section className="space-y-1.5 border-b border-border/60 pb-4">
            <h3 className="text-base text-foreground">
              Founder @ <AccentLink href="https://talunt.ai">Talunt</AccentLink>
            </h3>
            <p className="text-[15px] leading-relaxed text-muted">
              Building an AI-native services company for startups, starting with revenue automation and
              execution-heavy workflows.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-base text-foreground">
              Scout @ <AccentLink href="https://a16z.com">a16z</AccentLink>
            </h3>
            <p className="text-[15px] leading-relaxed text-muted">
              Investing $200k+ through the scout fund in $10k-$25k checks and serving as a referral
              path into both the main fund and Speedrun.
            </p>
          </section>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-wide text-muted">Previously</h2>

        <section className="space-y-1.5">
          <h3 className="text-base text-foreground">
            Software Engineer @{" "}
            <AccentLink href="https://palantir.com">Palantir</AccentLink>
          </h3>
          <p className="text-[15px] leading-relaxed text-muted">
            Worked on Foundry as a software engineering intern. Designed an IMAP ingest deployed to
            hundreds of enterprise customers.
          </p>
        </section>
      </section>
    </div>
  )
}
