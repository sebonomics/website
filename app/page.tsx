import { Dock } from "@/components/dock"
import { PageTitle, Paragraph } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { aboutItems, profile } from "@/lib/home"

export default function Home() {
  return (
    <PageShell icon="about" title="About">
      <PageTitle>{profile.fullName}</PageTitle>
      <div className="space-y-[22px] sm:space-y-4">
        {aboutItems.map((item, i) => (
          <Paragraph key={i}>
            <span dangerouslySetInnerHTML={{ __html: item.html }} />
          </Paragraph>
        ))}
      </div>

      <Dock />
    </PageShell>
  )
}
