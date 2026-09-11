import type { ReactNode } from "react"

import { SiteNav } from "@/components/site-nav"
import { SocialLinks } from "@/components/socials"
import { ThemeToggle } from "@/components/theme-toggle"

/**
 * A quiet editorial shell: one unadorned header and a single reading column.
 * Individual pages decide whether they need a photograph or other media.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="atmospheric-page relative isolate min-h-dvh">
      <header className="pt-12 sm:pt-20">
        <div className="mx-auto flex w-full max-w-[34rem] items-center gap-3 px-5 sm:px-0">
          <SiteNav />
          <ThemeToggle className="shrink-0" />
        </div>
      </header>

      <main className="page-content mx-auto w-full max-w-[34rem] px-5 pb-16 sm:px-0">
        {children}

        <footer className="mt-10 pb-4">
          <SocialLinks iconClassName="size-[16px]" />
        </footer>
      </main>
    </div>
  )
}
