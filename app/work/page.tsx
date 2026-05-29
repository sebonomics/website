import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { SocialFooter } from "@/components/social-footer"
import { WorkSections } from "@/components/work-sections"

export const metadata: Metadata = {
  title: "Work — Sebastian Tan",
  description: "Companies and experience — Sebastian Tan",
}

export default function WorkPage() {
  return (
    <PageShell>
      <div className="flex flex-1 flex-col justify-center space-y-12 text-[17px] leading-[1.65] sm:text-[18px]">
        <WorkSections />
      </div>

      <SocialFooter />
    </PageShell>
  )
}
