"use client"

import { useEffect, useRef, useState } from "react"

/**
 * FIGlet "Georgia11", generated once and embedded — no runtime dependency.
 * First and last name sit on separate lines: at 78 columns instead of 110 the
 * wordmark stays legible on a phone. Backticks and backslashes are part of the
 * art, so it lives in a template literal with those two escaped.
 */
const ART = `
                 ,,                                  ,,                       
                *MM                           mm     db                       
                 MM                           MM                              
,pP"Ybd  .gP"Ya  MM,dMMb.   ,6"Yb.  ,pP"Ybd mmMMmm \`7MM   ,6"Yb.  \`7MMpMMMb.  
8I   \`" ,M'   Yb MM    \`Mb 8)   MM  8I   \`"   MM     MM  8)   MM    MM    MM  
\`YMMMa. 8M"""""" MM     M8  ,pm9MM  \`YMMMa.   MM     MM   ,pm9MM    MM    MM  
L.   I8 YM.    , MM.   ,M9 8M   MM  L.   I8   MM     MM  8M   MM    MM    MM  
M9mmmP'  \`Mbmmd' P^YbmdP'  \`Moo9^Yo.M9mmmP'   \`Mbmo.JMML.\`Moo9^Yo..JMML  JMML.
                                                                              
                           mm                                                 
                           MM                                                 
                         mmMMmm  ,6"Yb.  \`7MMpMMMb.                           
                           MM   8)   MM    MM    MM                           
                           MM    ,pm9MM    MM    MM                           
                           MM   8M   MM    MM    MM                           
                           \`Mbmo\`Moo9^Yo..JMML  JMML.                         
`

const RAW = ART.replace(/^\n/, "").replace(/\n$/, "").split("\n")
const WIDTH = Math.max(...RAW.map((l) => l.length))
/** every row padded to the same width so column maths lines up */
const LINES = RAW.map((l) => l.padEnd(WIDTH, " "))

/** drawn from the art's own alphabet, so the noise looks like the wordmark */
const NOISE = "MM7bd9'\"`.,moYPIJL8^gpaAmm"
const SWEEP_MS = 2100
const BAND = 17 // columns of noise running ahead of the resolved edge
const HOLD_MS = 700
const FADE_MS = 560
/** the sweep advances every frame, but glyphs re-roll on a slower beat —
    scrambling at a full 60fps just reads as flicker over a long run */
const NOISE_TICK_MS = 55

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2

const rollNoise = () =>
  LINES.map((line) =>
    Array.from(line, () => NOISE[(Math.random() * NOISE.length) | 0]).join(""),
  )

function frameAt(progress: number, noise: string[]) {
  const front = progress * (WIDTH + BAND)
  let out = ""

  for (let r = 0; r < LINES.length; r++) {
    const line = LINES[r]
    for (let c = 0; c < WIDTH; c++) {
      const ch = line[c]
      const lead = front - c

      if (lead >= BAND) {
        out += ch
      } else if (lead > 0 && ch !== " ") {
        // still resolving: stand-in glyph, never a space, so the wordmark's
        // silhouette arrives before its letterforms do
        out += noise[r][c]
      } else {
        out += " "
      }
    }
    if (r < LINES.length - 1) out += "\n"
  }

  return out
}

/**
 * Covers the page on a full load: the wordmark decodes left to right, holds,
 * then fades. Client-side navigation doesn't remount the root layout, so this
 * never interrupts moving between pages.
 *
 * Desktop only — the wordmark is 78 characters wide, so on a phone it shrinks
 * to an illegible smudge. Below the md breakpoint it never runs, and the CSS
 * hides it there too so nothing flashes before hydration.
 */
export function LoadingScreen() {
  const [frame, setFrame] = useState(() => frameAt(0, rollNoise()))
  const [phase, setPhase] = useState<"run" | "out" | "gone">("run")
  const raf = useRef<number | null>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    const skip =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches
    if (skip) {
      setPhase("gone")
      return
    }

    const start = performance.now()
    let noise = rollNoise()
    let lastRoll = start

    const tick = (now: number) => {
      if (now - lastRoll >= NOISE_TICK_MS) {
        noise = rollNoise()
        lastRoll = now
      }

      const t = Math.min(1, (now - start) / SWEEP_MS)
      setFrame(frameAt(easeInOutSine(t), noise))

      if (t < 1) {
        raf.current = requestAnimationFrame(tick)
        return
      }

      timers.current.push(
        window.setTimeout(() => setPhase("out"), HOLD_MS),
        window.setTimeout(() => setPhase("gone"), HOLD_MS + FADE_MS),
      )
    }

    raf.current = requestAnimationFrame(tick)

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      timers.current.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    // the splash owns the viewport while it's up
    document.body.style.overflow = phase === "gone" ? "" : "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [phase])

  if (phase === "gone") return null

  return (
    <div className={`splash ${phase === "out" ? "splash-out" : ""}`} role="status" aria-label="Loading">
      <pre className="splash-art" aria-hidden="true">
        {frame}
      </pre>
    </div>
  )
}
