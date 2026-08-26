"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"

import { dockApps } from "@/lib/home"

type IconSpec = {
  bg?: string
  border?: string
  art?: ReactNode
  img?: string
  /** scale for image icons — <1 insets a bare logo inside its tile */
  imgScale?: number
}

const S = 64 // icon art viewBox

const ICONS: Record<string, IconSpec> = {
  finder: {
    bg: "linear-gradient(180deg,#4aa8f5 0%,#2a7fd4 100%)",
    art: (
      <>
        <path d="M0 0h32v64H0z" fill="#f1f6fe" />
        <circle cx="17" cy="26" r="3" fill="#1b3d5c" />
        <circle cx="45" cy="26" r="3" fill="#1b3d5c" />
        <path d="M20 42q12 9 24 0" stroke="#1b3d5c" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  arc: {
    bg: "linear-gradient(145deg,#ff8a5c 0%,#f45d8f 42%,#7a5cf5 100%)",
    art: (
      <>
        <path
          d="M14 47c0-13 8-27 18-27s18 14 18 27"
          stroke="#ffffff"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />
        <circle cx="45" cy="46" r="6" fill="#ffd76e" />
      </>
    ),
  },
  messages: {
    bg: "linear-gradient(150deg,#5ef577 0%,#2ee04f 45%,#04c22f 100%)",
    art: (
      <path
        d="M32 9c13.3 0 24 8.7 24 19.5S45.3 48 32 48c-2.8 0-5.4-.4-7.9-1.1-3.2 2.8-7.6 5.3-12.4 6.4 2.8-2.8 4.7-6 5.4-9.5C11.6 40.2 8 34.7 8 28.5 8 17.7 18.7 9 32 9z"
        fill="#ffffff"
      />
    ),
  },
  calendar: {
    bg: "#ffffff",
    border: "rgba(0,0,0,0.12)",
    art: (
      <>
        <rect width={S} height="16" fill="#f04a3f" />
        <text
          x="32"
          y="12"
          textAnchor="middle"
          fontSize="10"
          fontWeight="600"
          fill="#ffffff"
          fontFamily="var(--font-sans)"
        >
          AUG
        </text>
        <text
          x="32"
          y="52"
          textAnchor="middle"
          fontSize="30"
          fontWeight="400"
          fill="#33312d"
          fontFamily="var(--font-sans)"
        >
          8
        </text>
      </>
    ),
  },
  slack: { bg: "#ffffff", border: "rgba(0,0,0,0.10)", img: "/slack.png", imgScale: 1.07 },
  slashy: { img: "/slashy.png" },
  notion: { img: "/notion.png" },
  chrome: { bg: "#ffffff", border: "rgba(0,0,0,0.10)", img: "/chrome.png", imgScale: 0.8 },
  spotify: {
    bg: "#1db954",
    art: (
      <>
        <path d="M16 24q16-6 32 2" stroke="#000" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9" />
        <path d="M18 34q14-5 27 2" stroke="#000" strokeWidth="4.2" fill="none" strokeLinecap="round" opacity="0.9" />
        <path d="M20 43q11-4 21 1.5" stroke="#000" strokeWidth="3.4" fill="none" strokeLinecap="round" opacity="0.9" />
      </>
    ),
  },
  figma: {
    bg: "#ffffff",
    border: "rgba(0,0,0,0.12)",
    art: (
      <>
        <path d="M32 10h-8a8 8 0 1 0 0 16h8z" fill="#f24e1e" />
        <path d="M32 10h8a8 8 0 0 1 0 16h-8z" fill="#ff7262" />
        <path d="M32 26h-8a8 8 0 1 0 0 16h8z" fill="#a259ff" />
        <circle cx="40" cy="34" r="8" fill="#1abcfe" />
        <path d="M32 42h-8a8 8 0 1 0 8 8z" fill="#0acf83" />
      </>
    ),
  },
  superhuman: {
    bg: "linear-gradient(160deg,#8f7bff 0%,#5b48d8 100%)",
    art: <path d="M18 40c4 5 10 7 15 4 6-3 5-9-1-11s-9-6-4-10 13-2 17 3" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />,
  },
  cursor: { img: "/cursor.png" },
  terminal: {
    bg: "linear-gradient(180deg,#3a3a3a 0%,#101010 100%)",
    art: (
      <>
        <rect width={S} height={S} fill="#0a0a0a" />
        <path
          d="M18 23l9 8-9 8"
          stroke="#e8e8e8"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M32 41h15" stroke="#e8e8e8" strokeWidth="4" strokeLinecap="round" />
      </>
    ),
  },
  spiral: { img: "/granola.png" },
  layers: { img: "/willow.png" },
  // real logo file rather than a hand-drawn approximation
  anticipate: { img: "/anticipate.png" },
  claude: { img: "/claude.png" },
  settings: { img: "/settings.png" },
}

function DockIcon({ name, icon }: { name: string; icon: string }) {
  const spec = ICONS[icon]
  if (!spec) return null

  // The tile background is a CSS gradient (clipped in CSS) while the art is SVG.
  // Both are rounded with the same 22.5% radius — expressed in each coordinate
  // system — so full-bleed art like Finder's white half lines up with the tile edge.
  const clipId = `dock-clip-${icon}`
  const radius = S * 0.225

  return (
    <span
      className="flex size-full items-center justify-center overflow-hidden"
      style={{
        borderRadius: "22.5%",
        background: spec.bg,
        boxShadow: spec.border ? `inset 0 0 0 1px ${spec.border}` : undefined,
      }}
    >
      {spec.img ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={spec.img}
          alt={name}
          className="size-full object-cover"
          /* imgScale insets a bare logo like Chrome's circle inside its tile */
          style={{ transform: `scale(${spec.imgScale ?? 1})` }}
        />
      ) : (
        <svg viewBox={`0 0 ${S} ${S}`} className="size-full" aria-label={name} role="img">
          <defs>
            <clipPath id={clipId}>
              <rect width={S} height={S} rx={radius} ry={radius} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>{spec.art}</g>
        </svg>
      )}
    </span>
  )
}

function DockTray({
  apps = dockApps,
  fill = false,
}: {
  apps?: typeof dockApps
  /** span the container instead of hugging the icons, so it lines up with the text */
  fill?: boolean
}) {
  return (
    <div
      className={`mx-auto flex items-end gap-1.5 rounded-[18px] border px-3 pb-1.5 pt-2 sm:px-3.5 ${
        fill ? "w-full justify-between" : "w-max sm:gap-2"
      }`}
      style={{
        background: "var(--dock-bg)",
        borderColor: "var(--dock-border)",
        boxShadow: "var(--dock-shadow)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {apps.map((app) => {
        const Tile = app.href ? "a" : "span"
        return (
        <span key={app.name} className="group relative flex flex-col items-center">
          <Tile
            className="dock-icon relative block size-[38px] sm:size-[44px]"
            {...(app.href
              ? {
                  href: app.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": app.name,
                }
              : {})}
          >
            <DockIcon name={app.name} icon={app.icon} />
            {app.badge ? (
              <span className="absolute -right-1 -top-1 flex size-[15px] items-center justify-center rounded-full bg-[#ff3b30] text-[9px] font-semibold leading-none text-white shadow-sm ring-[1.5px] ring-white/70">
                {app.badge}
              </span>
            ) : null}
          </Tile>
          <span
            className={`mt-[3px] size-[3px] rounded-full ${
              app.running ? "bg-foreground/45" : "bg-transparent"
            }`}
          />
        </span>
        )
      })}
    </div>
  )
}

/**
 * On mobile the dock sits inline in the page, spanning the same width as the
 * text above it. On every larger screen it is pinned to the bottom-center of the
 * viewport, where the real macOS dock lives.
 */
const MOBILE_ICON = 38
const MOBILE_GAP = 6
const TRAY_PADDING = 26 // px-3 both sides + border

/** Renders the right-hand icons — however many actually fit the viewport. */
function MobileDock() {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(6)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const available = el.clientWidth - TRAY_PADDING
      if (available <= 0) return // hidden at this breakpoint; nothing to measure
      const fits = Math.floor((available + MOBILE_GAP) / (MOBILE_ICON + MOBILE_GAP))
      setCount(Math.max(1, Math.min(dockApps.length, fits)))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="mt-10 sm:hidden">
      <DockTray apps={dockApps.slice(-count)} fill />
    </div>
  )
}

export function Dock() {
  return (
    <>
      <MobileDock />

      {/* left-aligned to the content column (the sidebar is 240px wide on md+) */}
      <div className="pointer-events-none fixed bottom-3 left-0 right-0 z-40 hidden justify-center px-4 sm:flex md:left-[240px]">
        <div className="pointer-events-auto max-w-full">
          <DockTray />
        </div>
      </div>
    </>
  )
}
