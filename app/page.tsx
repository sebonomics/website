import { LiveTimeGraphic } from "@/components/section-graphics"
import { HomeCollections } from "@/components/home-collections"
import { PageShell } from "@/components/page-shell"
import { aboutItems } from "@/lib/home"

export default function Home() {
  return (
    <PageShell compact>
      <h1 className="sr-only">Sebastian Tan</h1>
      <HomeCollections />
      <div className="about-copy space-y-4">
        {aboutItems.map((item, index) => (
          <p key={index} className="text-base leading-6 text-muted" dangerouslySetInnerHTML={{ __html: item.html }} />
        ))}
      </div>
      <div className="bio-shelf"><LiveTimeGraphic /></div>
    </PageShell>
  )
}
