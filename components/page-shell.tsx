import type { ReactNode } from "react"

import { CoverBanner } from "@/components/cover-banner"
import { SiteNav } from "@/components/site-nav"
import { SocialLinks } from "@/components/socials"
import { ThemeToggle } from "@/components/theme-toggle"

/**
 * One centred column at every width — no sidebar, no app chrome. The nav sits in
 * a sticky bar at the top, the cover runs full bleed under it, and everything
 * else lives inside a measure narrow enough to read comfortably.
 */
export function PageShell({
  cover = <CoverBanner />,
  children,
}: {
  /** the cover photo, on every page by default; pass null to drop it */
  cover?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex h-12 w-full max-w-[48rem] items-center gap-3 px-5 sm:px-6">
          <SiteNav />
          <ThemeToggle className="shrink-0" />
        </div>
      </header>

      {cover}

      <main className="mx-auto w-full max-w-[48rem] px-5 pb-16 sm:px-6 sm:pb-[86px]">
        {children}

        <footer className="mt-14 border-t border-border pt-5">
          <SocialLinks iconClassName="size-[17px]" />
        </footer>
      </main>
    </div>
  )
}
