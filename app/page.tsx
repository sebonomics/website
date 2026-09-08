import { CoverBanner } from "@/components/cover-banner"
import { Paragraph } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { aboutItems } from "@/lib/home"

export default function Home() {
  return (
    <PageShell>
      <div className="mt-10 space-y-4 sm:mt-12 sm:space-y-4">
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
