import { BodyShimmer } from "@/components/body-shimmer"
import { PhotoPopup } from "@/components/photo-popup"
import { PageTitle, Paragraph } from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { aboutItems } from "@/lib/home"

export default function Home() {
  return (
    <PageShell>
      <PageTitle>Sebastian Tan</PageTitle>
      <div className="about-copy mt-6 space-y-[26px] sm:space-y-3">
        {aboutItems.map((item, i) => (
          <PhotoPopup key={i} image={item.image}>
            <Paragraph>
              <BodyShimmer html={item.html} />
            </Paragraph>

          </PhotoPopup>
        ))}
      </div>


    </PageShell>
  )
}
