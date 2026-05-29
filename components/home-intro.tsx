"use client"

import { AccentLink } from "@/components/accent-link"
import { HoverNote } from "@/components/hover-note"
import {
  TypewriterRich,
  type TypewriterSegment,
  typewriterQueueLength,
} from "@/components/typewriter"
import { bioHoverNotes } from "@/lib/home"

const CHAR_DELAY_MS = 12
const PARAGRAPH_GAP_MS = 280

const bioParagraph1: TypewriterSegment[] = [
  { type: "text", text: "I live in San Francisco and spend most of my time building " },
  { type: "node", node: <AccentLink href="https://talunt.io">Talunt</AccentLink> },
  {
    type: "text",
    text: ". Most days you'll find me in our ",
  },
  {
    type: "node",
    node: <HoverNote note={bioHoverNotes.southBeachOffice}>South Beach office</HoverNote>,
  },
  {
    type: "text",
    text: ", down at Stanford for the weekend, or staying out way too late with friends.",
  },
]

const bioParagraph2: TypewriterSegment[] = [
  { type: "text", text: "I grew up in " },
  {
    type: "node",
    node: <HoverNote note={bioHoverNotes.pittsburgh}>Pittsburgh</HoverNote>,
  },
  {
    type: "text",
    text: " and took a gap year from Stanford after graduating high school. Before I die, I want to hike every national park in the country, sail across the Pacific, and build a trillion-dollar company.",
  },
]

const paragraph2DelayMs =
  typewriterQueueLength(bioParagraph1) * CHAR_DELAY_MS + PARAGRAPH_GAP_MS

export function HomeIntro() {
  return (
    <div className="space-y-6">
      <TypewriterRich segments={bioParagraph1} charDelayMs={CHAR_DELAY_MS} />
      <TypewriterRich
        segments={bioParagraph2}
        charDelayMs={CHAR_DELAY_MS}
        startDelayMs={paragraph2DelayMs}
      />
    </div>
  )
}
