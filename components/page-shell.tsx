import type { ReactNode } from "react"
import { SectionTitle, SectionTitleProvider } from "@/components/section-title"

import { SiteNav } from "@/components/site-nav"
import { SocialLinks } from "@/components/socials"
import { ThemeToggle } from "@/components/theme-toggle"

/**
 * A quiet editorial shell: one unadorned header and a single reading column.
 * Individual pages decide whether they need a photograph or other media.
 */
export function PageShell({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return (
    <SectionTitleProvider>
    <div className="atmospheric-page relative isolate min-h-dvh">
      <header className={compact ? "pt-8 sm:pt-12" : "pt-10 sm:pt-16"}>
        <div className="mx-auto flex w-full max-w-xl items-center gap-3 px-6 sm:px-4">
          {compact ? <SectionTitle /> : <SiteNav />}
          <div className="header-actions flex shrink-0 items-center gap-3">
            <SocialLinks variant="icons" className="social-header" iconClassName="size-[14px]" />
            <ThemeToggle className="shrink-0" />
          </div>
        </div>
      </header>

      <main className={`page-content mx-auto w-full max-w-xl px-6 pb-16 sm:px-4 ${compact ? "compact-home" : ""}`}>
        {children}

      </main>
    </div>
    </SectionTitleProvider>
  )
}
