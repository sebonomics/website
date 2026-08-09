import type { ReactNode } from "react"

import { dockApps } from "@/lib/home"

type IconSpec = { bg: string; border?: string; art: ReactNode }

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
    bg: "linear-gradient(180deg,#5df675 0%,#12c93f 100%)",
    art: (
      <path
        d="M32 16c11 0 20 7 20 15.5S43 47 32 47c-2.6 0-5-.3-7.3-1L15 50l3-8.2c-3.7-2.8-6-6.6-6-10.8C12 23 21 16 32 16z"
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
  notion: {
    bg: "#ffffff",
    border: "rgba(0,0,0,0.12)",
    art: (
      <>
        <path d="M20 16h9l15 22V16h6v32h-8L26 25v23h-6z" fill="#111110" />
        <rect x="14" y="12" width="36" height="40" rx="3" stroke="#111110" strokeWidth="3" fill="none" />
      </>
    ),
  },
  linear: {
    bg: "linear-gradient(160deg,#5b5fe3 0%,#3b3fbb 100%)",
    art: (
      <>
        <path d="M16 40 40 16" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.95" />
        <path d="M20 48 48 20" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
        <path d="M28 50 50 28" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      </>
    ),
  },
  slack: {
    bg: "#ffffff",
    border: "rgba(0,0,0,0.12)",
    art: (
      <>
        <rect x="12" y="28" width="16" height="7" rx="3.5" fill="#36c5f0" />
        <rect x="29" y="12" width="7" height="16" rx="3.5" fill="#2eb67d" />
        <rect x="36" y="29" width="16" height="7" rx="3.5" fill="#ecb22e" />
        <rect x="28" y="36" width="7" height="16" rx="3.5" fill="#e01e5a" />
      </>
    ),
  },
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
  cursor: {
    bg: "linear-gradient(160deg,#2c2c2c 0%,#0d0d0d 100%)",
    art: (
      <>
        <path d="M32 12 52 24v18L32 54 12 42V24z" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.9" />
        <path d="M32 12v42M12 24l40 18M52 24 12 42" stroke="#ffffff" strokeWidth="2" opacity="0.35" />
      </>
    ),
  },
  terminal: {
    bg: "linear-gradient(180deg,#3a3a3a 0%,#101010 100%)",
    art: (
      <>
        <rect x="8" y="10" width="48" height="44" rx="5" fill="#0a0a0a" stroke="#5a5a5a" strokeWidth="2" />
        <path d="M17 24l8 7-8 7" stroke="#e8e8e8" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 40h14" stroke="#e8e8e8" strokeWidth="3.4" strokeLinecap="round" />
      </>
    ),
  },
  settings: {
    bg: "linear-gradient(160deg,#d9d9d9 0%,#9d9d9d 100%)",
    art: (
      <>
        <circle cx="32" cy="32" r="17" fill="none" stroke="#4a4a4a" strokeWidth="6" />
        <circle cx="32" cy="32" r="6" fill="#4a4a4a" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x="30"
            y="6"
            width="4"
            height="9"
            rx="2"
            fill="#4a4a4a"
            transform={`rotate(${i * 45} 32 32)`}
          />
        ))}
      </>
    ),
  },
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
      className="flex size-full items-center justify-center"
      style={{
        clipPath: "inset(0 round 22.5%)",
        borderRadius: "22.5%",
        background: spec.bg,
        boxShadow: spec.border ? `inset 0 0 0 1px ${spec.border}` : undefined,
      }}
    >
      <svg viewBox={`0 0 ${S} ${S}`} className="size-full" aria-label={name} role="img">
        <defs>
          <clipPath id={clipId}>
            <rect width={S} height={S} rx={radius} ry={radius} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>{spec.art}</g>
      </svg>
    </span>
  )
}

function DockTray() {
  return (
    <div
      className="mx-auto flex w-max items-end gap-1.5 rounded-[20px] border px-2.5 pb-1.5 pt-2 sm:gap-2 sm:px-3"
      style={{
        background: "var(--dock-bg)",
        borderColor: "var(--dock-border)",
        boxShadow: "var(--dock-shadow)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {dockApps.map((app) => (
        <span key={app.name} className="group relative flex flex-col items-center">
          <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-[12px] text-foreground opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
            {app.name}
          </span>
          <span className="size-[38px] origin-bottom transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:scale-[1.28] sm:size-[44px]">
            <DockIcon name={app.name} icon={app.icon} />
          </span>
          <span
            className={`mt-[3px] size-[3px] rounded-full ${
              app.running ? "bg-foreground/45" : "bg-transparent"
            }`}
          />
        </span>
      ))}
    </div>
  )
}

/**
 * On mobile the dock sits inline in the page. On every larger screen it is pinned
 * to the bottom-center of the viewport, where the real macOS dock lives.
 */
export function Dock() {
  return (
    <>
      <div className="-mx-2 overflow-x-auto pb-2 sm:hidden">
        <DockTray />
      </div>

      {/* left-aligned to the content column (the sidebar is 240px wide on md+) */}
      <div className="pointer-events-none fixed bottom-3 left-0 right-0 z-40 hidden justify-center px-4 sm:flex md:left-[240px]">
        <div className="pointer-events-auto max-w-full overflow-x-auto">
          <DockTray />
        </div>
      </div>
    </>
  )
}
