"use client"

import { useEffect, useState } from "react"

const W = 960
const H = 264
const CELL = 6

/** 5x7 dot-matrix font for the clock */
const FONT: Record<string, string[]> = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
  ":": ["0", "0", "1", "0", "1", "0", "0"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  M: ["10001", "11011", "10101", "10001", "10001", "10001", "10001"],
  " ": ["0", "0", "0", "0", "0", "0", "0"],
}

const CACTUS = [
  "0011000",
  "0011000",
  "0011000",
  "1011010",
  "1011010",
  "1011010",
  "1111110",
  "0011000",
  "0011000",
  "0011000",
  "0011000",
  "0011000",
  "0011000",
]

const BIRD = ["1100000011", "0110000110", "0011001100", "0001111000", "0000110000"]

const CLOUD_SMALL = ["0011100", "0111111", "1111111"]
const CLOUD_WIDE = ["000111100000", "011111111100", "111111111111"]

type Dot = { x: number; y: number; o?: number }

function bitmapDots(bitmap: string[], col: number, row: number, opacity = 1): Dot[] {
  const dots: Dot[] = []
  bitmap.forEach((line, r) => {
    for (let c = 0; c < line.length; c++) {
      if (line[c] === "1") dots.push({ x: col + c, y: row + r, o: opacity })
    }
  })
  return dots
}

/** deterministic pseudo-random so server and client render identically */
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function groundDots(row: number, cols: number): Dot[] {
  const dots: Dot[] = []
  for (let c = 0; c < cols; c++) {
    const r = rand(c + 1)
    if (r > 0.22) dots.push({ x: c, y: row, o: 0.75 })
    if (r > 0.93) dots.push({ x: c, y: row - 1, o: 0.5 })
    if (r < 0.06) dots.push({ x: c, y: row + 1, o: 0.4 })
  }
  return dots
}

function sceneDots(): Dot[] {
  const cols = Math.floor(W / CELL)
  const groundRow = 30

  return [
    ...bitmapDots(CLOUD_SMALL, 8, 6, 0.55),
    ...bitmapDots(CLOUD_WIDE, 44, 4, 0.5),
    ...bitmapDots(CLOUD_SMALL, 96, 8, 0.45),
    ...bitmapDots(CLOUD_WIDE, 128, 5, 0.5),
    ...bitmapDots(BIRD, 30, 16, 0.9),
    ...bitmapDots(BIRD, 41, 12, 0.45),
    ...bitmapDots(CACTUS, 74, 17, 0.95),
    ...bitmapDots(CACTUS, 119, 18, 0.6),
    ...groundDots(groundRow, cols),
  ]
}

const SCENE = sceneDots()

function clockText(date: Date) {
  let hours = date.getHours()
  const suffix = hours >= 12 ? "PM" : "AM"
  hours = hours % 12 || 12
  const minutes = String(date.getMinutes()).padStart(2, "0")
  return `${hours}:${minutes} ${suffix}`
}

function ClockDots({ time }: { time: string }) {
  const cell = 3
  const glyphs = time.split("")

  let width = 0
  for (const ch of glyphs) width += (FONT[ch]?.[0].length ?? 3) + 1

  const startX = W - 26 - width * cell
  const startY = H - 40

  let cursor = 0
  return (
    <g>
      {glyphs.map((ch, i) => {
        const bitmap = FONT[ch] ?? FONT[" "]
        const dots = bitmapDots(bitmap, cursor, 0)
        cursor += bitmap[0].length + 1
        return (
          <g key={`${ch}-${i}`}>
            {dots.map((d, j) => (
              <rect
                key={j}
                x={startX + d.x * cell}
                y={startY + d.y * cell}
                width={cell - 0.9}
                height={cell - 0.9}
                rx={0.5}
                fill="currentColor"
                opacity={0.85}
              />
            ))}
          </g>
        )
      })}
    </g>
  )
}

export function AsciiCover() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setTime(clockText(new Date()))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-[140px] w-full overflow-hidden bg-cover sm:h-[min(22vh,190px)] md:h-[min(25vh,230px)]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        className="size-full text-cover-ink"
        aria-label="Dot-matrix desert scene"
        role="img"
      >
        <defs>
          <pattern id="cover-grid" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <circle cx={CELL / 2} cy={CELL / 2} r={0.75} fill="var(--cover-dot)" />
          </pattern>
        </defs>

        <rect width={W} height={H} fill="url(#cover-grid)" />

        {SCENE.map((d, i) => (
          <rect
            key={i}
            x={d.x * CELL + 1}
            y={d.y * CELL + 1}
            width={CELL - 2}
            height={CELL - 2}
            rx={0.8}
            fill="currentColor"
            opacity={d.o ?? 1}
          />
        ))}

        {time && <ClockDots time={time} />}
      </svg>
    </div>
  )
}
