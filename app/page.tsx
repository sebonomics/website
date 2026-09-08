import { CoverBanner } from "@/components/cover-banner"
import { Paragraph } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { aboutItems } from "@/lib/home"

export default function Home() {
  return (
    <PageShell>
      <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5 sm:[&_p]:leading-[1.6] sm:[&_p]:text-pretty">
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
