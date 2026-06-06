import { HomeIntro } from "@/components/home-intro"
import { PageShell } from "@/components/page-shell"
import { SocialFooter } from "@/components/social-footer"

export default function Home() {
  return (
    <PageShell>
      <div className="flex flex-1 flex-col justify-center space-y-12 text-[17px] leading-[1.65] sm:text-[18px]">
        <HomeIntro />
      </div>

      <SocialFooter />
    </PageShell>
  )
}
