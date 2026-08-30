"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronsLeft, Plus } from "lucide-react"

import { pageIcons, type PageIconType } from "@/components/page-icons"
import { SocialLinks } from "@/components/socials"
import { ThemeToggle } from "@/components/theme-toggle"
import { writingPostHref, writingPosts } from "@/lib/writing"

const favorites = [
  { href: "/", icon: pageIcons.about, label: "About" },
  { href: "/experience", icon: pageIcons.experience, label: "Experience" },
  { href: "/investments", icon: pageIcons.investments, label: "Investing" },
  { href: "/reading", icon: pageIcons.reading, label: "Reading" },
  { href: "/writing", icon: pageIcons.writing, label: "Writing" },
]

function NavItem({
  href,
  icon: Icon,
  label,
  active,
}: {
  href: string
  icon: PageIconType
  label: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex h-[30px] items-center gap-2.5 rounded-md px-2 text-[14px] transition-colors ${
        active ? "bg-active text-foreground" : "text-foreground/80 hover:bg-hover"
      }`}
    >
      <Icon className="size-4 shrink-0 text-faint" strokeWidth={1.75} />
      <span className="truncate">{label}</span>
    </Link>
  )
}

export function SidebarContent({ onCollapse }: { onCollapse?: () => void }) {
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
        <SocialLinks />
        <ThemeToggle />
      </div>
    </div>
  )
}
