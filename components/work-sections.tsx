import { AccentLink } from "@/components/accent-link"

export function WorkSections() {
  return (
    <>
      <section className="space-y-6">
        <h2 className="text-sm tracking-wide text-muted">Summary</h2>
        <p>
          I build software companies. Right now I&apos;m focused on{" "}
          <AccentLink href="https://talunt.io">Talunt</AccentLink> — an agentic revenue engine for
          startups. Before that I sold Beacon, worked at Palantir on Foundry, and shipped platform
          tooling at Willow.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-sm tracking-wide text-muted">Companies</h2>

        <div className="space-y-6">
          <p>
            <AccentLink href="https://talunt.io">Talunt</AccentLink> — $25M agentic revenue engine for startups. $240K ARR
            and backed by Afore Capital, ZFellows, and DoorDash angels.
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
    </>
  )
}
