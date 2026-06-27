import { AccentLink } from "@/components/accent-link"

export function WorkSections() {
  return (
    <div className="space-y-6">
      <p>
        I knew I wanted to be an entrepreneur when I was very young. I spent my summers selling
        sneakers instead of skipping grades in math, and I ran our family bakery instead of
        prioritizing homework.
      </p>

      <p>
        After high school, I worked at a couple of friends&apos; early-stage companies, and then at
        Palantir as an engineer on Foundry. I also started and sold a company. I think the gap year,
        which most people told me not to take, was completely worth it.
      </p>

      <p>
        Right now I&apos;m focused on an inflection point in software:{" "}
        <AccentLink href="https://sequoiacap.com/article/services-the-new-software/">
          AI-native services companies
        </AccentLink>
        . For every $1 a company spends on software, it spends $6 on services. I believe the
        current biggest window of opportunity in technology is this discrepancy. I&apos;m working on{" "}
        <AccentLink href="https://talunt.io">Talunt</AccentLink>, an AI-native services company for
        startups.
      </p>

      <p>
        I plan to build technology companies for the rest of my life. And when I get too old for
        that, I&apos;ll help younger versions of myself start their own.
      </p>
    </div>
  )
}
