import { AccentLink } from "@/components/accent-link"

export function WorkSections() {
  return (
    <div className="space-y-6">
      <p>
        I knew I wanted to be an entrepreneur when I was very young. In middle school I almost burned
        the house down mining Ethereum in the basement. I spent my summers selling sneakers
        instead of skipping grades in math, and I ran our family bakery instead of prioritizing
        homework.
      </p>

      <p>
        When I started high school, I told our head of school about my dream of going to Stanford. She
        laughed at me, and I worked my ass off academically because I had a chip on my
        shoulder. Nevertheless, that dream came true.
      </p>

      <p>
        After high school, I worked at a couple of friends&apos; early-stage companies, and then at
        Palantir as an engineer on Foundry. I also started and sold a company called Beacon. I think
        the gap year, which most people told me not to take, was completely worth it.
      </p>

      <p>
        Right now I&apos;m focused on an inflection point in software:{" "}
        <AccentLink href="https://sequoiacap.com/article/services-the-new-software/">
          AI-native services companies
        </AccentLink>
        . For every $1 a company spends on software, it spends $6 on services. I believe the
        current biggest window of opportunity in technology is this discrepancy. I&apos;m working on{" "}
        <AccentLink href="https://talunt.io">Talunt</AccentLink>, an AI-native services company for
        startups, starting with revenue automation.
      </p>

      <p>
        I plan to build technology companies for the rest of my life. And when I get too old for
        that, I&apos;ll help younger versions of myself start their own. My dream would be to join
        Sequoia because in all aspects and functions of life, I always aspire to be the best.
      </p>
    </div>
  )
}
