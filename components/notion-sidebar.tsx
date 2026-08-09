"use client"

import type { SVGProps } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronsLeft, Github, Mail, Plus } from "lucide-react"

import { pageIcons, type PageIconType } from "@/components/page-icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { writingPostHref, writingPosts } from "@/lib/writing"

function LinkedInMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

function XMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const socials = [
  { label: "Email", href: "mailto:sebastian@talunt.io", icon: Mail },
  { label: "LinkedIn", href: "https://linkedin.com/in/sebonomics", icon: LinkedInMark },
  { label: "GitHub", href: "https://github.com/sebonomics", icon: Github },
  { label: "X", href: "https://twitter.com/sebonomics", icon: XMark },
]

const favorites = [
  { href: "/", icon: pageIcons.about, label: "About" },
  { href: "/experience", icon: pageIcons.experience, label: "Experience" },
  { href: "/investments", icon: pageIcons.investments, label: "Investments" },
  { href: "/writing", icon: pageIcons.writing, label: "Writing" },
]

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  onNavigate,
}: {
  href: string
  icon: PageIconType
  label: string
  active: boolean
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex h-[30px] items-center gap-2.5 rounded-md px-2 text-[14px] transition-colors ${
        active ? "bg-active text-foreground" : "text-foreground/80 hover:bg-hover"
      }`}
    >
      <Icon className="size-4 shrink-0 text-faint" strokeWidth={1.75} />
      <span className="truncate">{label}</span>
    </Link>
  )
}

export function SidebarContent({
  onNavigate,
  onCollapse,
}: {
  onNavigate?: () => void
  onCollapse?: () => void
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* workspace switcher */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded px-1.5 py-1 transition-colors hover:bg-hover">
          <span className="size-5 shrink-0 overflow-hidden rounded-[3px]">
            <Image
              src="/avatar.jpg"
              alt=""
              width={40}
              height={40}
              className="size-5 object-cover"
              style={{ transform: "scale(1.3)", transformOrigin: "50% 30%" }}
            />
          </span>
          <span className="truncate text-[14px] font-medium text-foreground">
            Sebastian&apos;s Notion
          </span>
        </div>
        {/* only in the docked sidebar — the mobile drawer has its own close button */}
        {onCollapse ? (
          <button
            type="button"
            onClick={onCollapse}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            className="flex size-6 shrink-0 items-center justify-center rounded text-faint transition-colors hover:bg-hover hover:text-foreground"
          >
            <ChevronsLeft className="size-4" strokeWidth={1.75} />
          </button>
        ) : null}
      </div>

      <nav className="notion-scroll flex-1 overflow-y-auto px-3 pb-4 pt-2">
        <p className="px-2 pb-1 text-[12px] font-medium text-faint">Favorites</p>
        <div className="space-y-px">
          {favorites.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              active={item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* posts live inside the Writing page */}
        <div className="space-y-px pl-4">
          {writingPosts.map((post) => (
            <NavItem
              key={post.slug}
              href={writingPostHref(post.slug)}
              icon={pageIcons.post}
              label={post.title}
              active={pathname === writingPostHref(post.slug)}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between px-2 pb-1">
          <span className="text-[12px] font-medium text-faint">Private</span>
          <Plus className="size-[15px] text-faint" strokeWidth={1.75} />
        </div>
        <p className="px-2 py-1 text-[13px] text-faint/80">No pages inside</p>
      </nav>

      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <div className="flex items-center gap-3.5">
          {socials.map((social) => {
            const Icon = social.icon
            const external = social.href.startsWith("http")
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                title={social.label}
                className="text-faint transition-colors hover:text-foreground"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon className="size-[15px]" strokeWidth={1.75} />
              </a>
            )
          })}
        </div>
        <ThemeToggle />
      </div>
    </div>
  )
}
