"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import {
  Check,
  ChevronsRight,
  Link2,
  Lock,
  Menu,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Printer,
  Star,
  Sun,
  X,
} from "lucide-react"

import { SidebarContent } from "@/components/notion-sidebar"
import { pageIcons } from "@/components/page-icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { profile } from "@/lib/home"

function useCopyLink() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // clipboard API needs focus + permission; fall back to a temp selection
      const field = document.createElement("textarea")
      field.value = url
      field.setAttribute("readonly", "")
      field.style.position = "fixed"
      field.style.opacity = "0"
      document.body.appendChild(field)
      field.select()
      try {
        document.execCommand("copy")
      } catch {}
      document.body.removeChild(field)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return { copied, copy }
}

function MoreMenu({ onCopy }: { onCopy: () => void }) {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {}
    setOpen(false)
  }

  const item = "flex w-full items-center gap-2 rounded px-2 py-1.5 text-[14px] hover:bg-hover"

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="More actions"
        aria-expanded={open}
        className="hidden size-7 items-center justify-center rounded text-faint transition-colors hover:bg-hover hover:text-foreground sm:flex"
      >
        <MoreHorizontal className="size-[17px]" strokeWidth={1.75} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute right-0 top-9 z-50 w-52 rounded-lg border border-border bg-background p-1 shadow-md">
            <button
              type="button"
              className={item}
              onClick={() => {
                onCopy()
                setOpen(false)
              }}
            >
              <Link2 className="size-4 text-faint" strokeWidth={1.75} />
              Copy link
            </button>
            <button type="button" className={item} onClick={toggleTheme}>
              {dark ? (
                <Sun className="size-4 text-faint" strokeWidth={1.75} />
              ) : (
                <Moon className="size-4 text-faint" strokeWidth={1.75} />
              )}
              {dark ? "Light mode" : "Dark mode"}
            </button>
            <button
              type="button"
              className={item}
              onClick={() => {
                setOpen(false)
                window.print()
              }}
            >
              <Printer className="size-4 text-faint" strokeWidth={1.75} />
              Print
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export function PageShell({
  icon,
  title,
  cover,
  children,
}: {
  /** key into pageIcons — a string, since components can't cross the server boundary */
  icon: keyof typeof pageIcons
  title: string
  cover?: ReactNode
  children: ReactNode
}) {
  const Icon = pageIcons[icon]
  const [drawer, setDrawer] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [starred, setStarred] = useState(true)
  const { copied, copy } = useCopyLink()

  // restore the sidebar + star state after mount so SSR markup stays stable
  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("sidebar") === "collapsed")
      setStarred(localStorage.getItem("starred") !== "false")
    } catch {}
  }, [])

  const toggleSidebar = () => {
    setCollapsed((v) => {
      const next = !v
      try {
        localStorage.setItem("sidebar", next ? "collapsed" : "open")
      } catch {}
      return next
    })
  }

  const toggleStar = () => {
    setStarred((v) => {
      const next = !v
      try {
        localStorage.setItem("starred", String(next))
      } catch {}
      return next
    })
  }

  return (
    <div className="flex min-h-dvh">
      {/* desktop sidebar */}
      <aside
        className={`sticky top-0 hidden h-dvh shrink-0 overflow-hidden border-r border-border transition-[width] duration-200 md:block ${
          collapsed ? "w-0 border-r-0" : "w-[240px]"
        }`}
      >
        <div className="h-full w-[240px]">
          <SidebarContent onCollapse={toggleSidebar} />
        </div>
      </aside>

      {/* mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawer(false)}
            className="absolute inset-0 bg-black/30"
          />
          <div className="drawer-in absolute inset-y-0 left-0 w-[264px] border-r border-border shadow-md">
            <button
              type="button"
              onClick={() => setDrawer(false)}
              aria-label="Close menu"
              className="absolute right-2 top-2.5 z-10 flex size-7 items-center justify-center rounded text-faint hover:bg-hover"
            >
              <X className="size-4" strokeWidth={1.75} />
            </button>
            <SidebarContent onNavigate={() => setDrawer(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* top bar */}
        <header className="sticky top-0 z-30 flex h-11 items-center gap-2 bg-background/85 px-3 backdrop-blur-sm sm:px-4">
          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
            className="flex size-7 items-center justify-center rounded text-muted transition-colors hover:bg-hover md:hidden"
          >
            <Menu className="size-[18px]" strokeWidth={1.75} />
          </button>

          {collapsed && (
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Expand sidebar"
              title="Expand sidebar"
              className="hidden size-7 items-center justify-center rounded text-faint transition-colors hover:bg-hover hover:text-foreground md:flex"
            >
              <ChevronsRight className="size-4" strokeWidth={1.75} />
            </button>
          )}

          <div className="flex min-w-0 items-center gap-1.5 rounded px-1.5 py-1 hover:bg-hover">
            <Icon className="size-[15px] shrink-0 text-muted" strokeWidth={1.75} />
            <span className="truncate text-[14px] text-foreground">{title}</span>
          </div>

          <div className="hidden items-center gap-1 text-[13px] text-faint sm:flex">
            <Lock className="size-3.5" strokeWidth={1.75} />
            <span>Private</span>
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <span className="hidden text-[13px] text-faint lg:inline">{profile.editedLabel}</span>

            <button
              type="button"
              onClick={copy}
              title="Copy a link to this page"
              className="hidden items-center gap-1 rounded px-2 py-1 text-[13px] text-muted transition-colors hover:bg-hover hover:text-foreground sm:flex"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" strokeWidth={2} />
                  Copied
                </>
              ) : (
                "Share"
              )}
            </button>

            <a
              href="mailto:sebastian@talunt.io"
              aria-label="Send me a note"
              title="Send me a note"
              className="hidden size-7 items-center justify-center rounded text-faint transition-colors hover:bg-hover hover:text-foreground sm:flex"
            >
              <MessageSquare className="size-[17px]" strokeWidth={1.75} />
            </a>

            <button
              type="button"
              onClick={toggleStar}
              aria-pressed={starred}
              aria-label={starred ? "Remove from favorites" : "Add to favorites"}
              title={starred ? "Remove from favorites" : "Add to favorites"}
              className={`hidden size-7 items-center justify-center rounded transition-colors hover:bg-hover sm:flex ${
                starred ? "text-[#f5a623]" : "text-faint hover:text-foreground"
              }`}
            >
              <Star
                className={`size-[17px] ${starred ? "fill-current" : ""}`}
                strokeWidth={1.75}
              />
            </button>

            <ThemeToggle className="sm:hidden" />

            <MoreMenu onCopy={copy} />
          </div>
        </header>

        {cover}

        <main className="notion-scroll flex-1 px-6 pb-28 sm:px-10">
          <div className="mx-auto w-full max-w-[708px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
