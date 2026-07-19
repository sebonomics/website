import Image from "next/image"

import { AccentLink } from "@/components/accent-link"

function ExperienceLogo({ domain, name, src }: { domain?: string; name: string; src?: string }) {
  if (!domain && !src) {
    return (
      <div
        aria-hidden="true"
        className="mt-px flex size-[18px] shrink-0 items-center justify-center rounded-[4px] bg-foreground text-[10px] font-medium text-background"
      >
        B
      </div>
    )
  }

  const imageSrc = src ?? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

  return (
    <div className="mt-px size-[18px] shrink-0 overflow-hidden rounded-[4px]">
      <Image
        src={imageSrc}
        alt={`${name} logo`}
        width={18}
        height={18}
        className="size-[18px] rounded-[4px] object-cover"
      />
    </div>
  )
}

export function WorkSections() {
  return (
    <div className="space-y-8 lg:-mx-28">
      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-wide text-muted">Currently</h2>

        <div className="space-y-4">
          <section className="space-y-2 border-b border-border/60 pb-4">
            <div className="flex items-start gap-2.5">
              <ExperienceLogo name="Talunt" src="/talunt-logo.svg" />
              <h3 className="text-base leading-5 text-foreground">
                <AccentLink href="https://talunt.ai">Talunt</AccentLink>
                <span className="text-foreground/60"> — Founder</span>
              </h3>
            </div>
            <p className="text-[15px] leading-relaxed text-muted lg:whitespace-nowrap">
              Building the revenue engine for small businesses. $700K raised at a $25M valuation. $20K MRR.
            </p>
          </section>

          <section className="space-y-2 border-b border-border/60 pb-4">
            <div className="flex items-start gap-2.5">
              <ExperienceLogo domain="bayesstreet.com" name="Bayes Street" />
              <h3 className="text-base leading-5 text-foreground">
                <AccentLink href="https://bayesstreet.com">Bayes Street</AccentLink>
                <span className="text-foreground/60"> — Founder</span>
              </h3>
            </div>
            <p className="text-[15px] leading-relaxed text-muted lg:whitespace-nowrap">
              AI-native hedge fund outperforming Citadel, Millennium, and Bridgewater YTD.
            </p>
          </section>

          <section className="space-y-2">
            <div className="flex items-start gap-2.5">
              <ExperienceLogo domain="a16z.com" name="Andreessen Horowitz" />
              <h3 className="text-base leading-5 text-foreground">
                <AccentLink href="https://a16z.com">Andreessen Horowitz</AccentLink>
                <span className="text-foreground/60"> — Scout</span>
              </h3>
            </div>
            <p className="text-[15px] leading-relaxed text-muted lg:whitespace-nowrap">
              Investing $10k-$25k checks through the scout fund. Referral path into both the main fund and
              Speedrun.
            </p>
          </section>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-wide text-muted">Previously</h2>

        <section className="space-y-2 border-b border-border/60 pb-4">
          <div className="flex items-start gap-2.5">
            <ExperienceLogo domain="palantir.com" name="Palantir" />
            <h3 className="text-base leading-5 text-foreground">
              <AccentLink href="https://palantir.com">Palantir</AccentLink>
              <span className="text-foreground/60"> — Software Engineer</span>
            </h3>
          </div>
          <p className="text-[15px] leading-relaxed text-muted lg:whitespace-nowrap">
            Youngest intern on Foundry Data Connection. Built {"{ORCON}"} deployed to hundreds of customers.
          </p>
        </section>

        <section className="space-y-2 border-b border-border/60 pb-4">
          <div className="flex items-start gap-2.5">
            <ExperienceLogo domain="codefour.us" name="Code Four" />
            <h3 className="text-base leading-5 text-foreground">
              <AccentLink href="https://codefour.us">Code Four</AccentLink>
              <span className="text-foreground/60"> — Growth Engineer</span>
            </h3>
          </div>
          <p className="text-[15px] leading-relaxed text-muted lg:whitespace-nowrap">
            Built GTM tooling reaching thousands of police departments across the United States.
          </p>
        </section>

        <section className="space-y-2">
          <div className="flex items-start gap-2.5">
            <ExperienceLogo name="Beacon" src="/beacon-logo.svg" />
            <h3 className="text-base leading-5 text-foreground">
              <AccentLink href="https://www.psl.com/">Beacon</AccentLink>
              <span className="text-foreground/60"> — Founder</span>
            </h3>
          </div>
          <p className="text-[15px] leading-relaxed text-muted lg:whitespace-nowrap">
            MCP infrastructure for GTM teams. Acquired by Pioneer Square Labs when I was 18.
          </p>
        </section>
      </section>
    </div>
  )
}
