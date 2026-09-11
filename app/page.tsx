import { CoverBanner } from "@/components/cover-banner"
import { Paragraph } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { aboutItems } from "@/lib/home"

export default function Home() {
  return (
    <PageShell>
      <h1 className="mt-8 font-serif text-[34px] font-bold leading-[1.1] tracking-[-0.02em] sm:mt-10 sm:text-[40px]">
        Sebastian Tan
      </h1>
      <div className="mt-6 space-y-[26px] sm:space-y-3">
        {aboutItems.map((item, i) => (
          <Paragraph key={i}>
            <span dangerouslySetInnerHTML={{ __html: item.html }} />
          </Paragraph>
        ))}
      </div>

      <CoverBanner inline />
    </PageShell>
  )
}
