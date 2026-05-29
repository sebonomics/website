import type { ReactNode } from "react"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-dvh max-w-[42rem] flex-col px-8 py-12 sm:px-10 sm:py-14">
      <Suspense fallback={<header className="mb-16 h-6" />}>
        <SiteHeader />
      </Suspense>
      {children}
    </div>
  )
}
