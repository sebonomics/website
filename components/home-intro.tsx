import { AccentLink } from "@/components/accent-link"
import { HoverNote } from "@/components/hover-note"
import { bioHoverNotes } from "@/lib/home"

export function HomeIntro() {
  return (
    <div className="space-y-6">
      <p>
        I live in San Francisco and spend most of my time building{" "}
        <AccentLink href="https://talunt.io">Talunt</AccentLink>. Most days you&apos;ll find me in
        our{" "}
        <HoverNote note={bioHoverNotes.southBeachOffice}>South Beach office</HoverNote>, down at
        Stanford for the weekend, or staying out way too late with friends.
      </p>
      <p>
        I grew up in <HoverNote note={bioHoverNotes.pittsburgh}>Pittsburgh</HoverNote> and took a
        gap year from Stanford after graduating high school. Before I die, I want to hike every
        national park in the country, sail across the Pacific, and build a trillion-dollar company.
      </p>
    </div>
  )
}
