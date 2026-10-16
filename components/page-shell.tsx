import type { ReactNode } from "react"

import { SiteNav } from "@/components/site-nav"
import { SocialLinks } from "@/components/socials"
import { ThemeToggle } from "@/components/theme-toggle"

/**
 * A quiet editorial shell: one unadorned header and a single reading column.
 * Individual pages decide whether they need a photograph or other media.
 */
export function PageShell({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return (
    <div className="atmospheric-page relative isolate min-h-dvh">
      <header className={compact ? "pt-8 sm:pt-12" : "pt-10 sm:pt-16"}>
        <div className="mx-auto flex w-full max-w-xl items-center gap-3 px-6 sm:px-4">
          {compact ? <span className="flex-1 text-base">Sebastian Tan</span> : <SiteNav />}
          <ThemeToggle className="shrink-0" />
        </div>
      </header>

      <main className={`page-content mx-auto w-full max-w-xl px-6 pb-16 sm:px-4 ${compact ? "compact-home" : ""}`}>
        {children}

        <footer className="mt-12 pb-4">
          <SocialLinks variant="text" />
        </footer>
      </main>
    </div>
  )
}
