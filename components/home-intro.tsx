import { AccentLink } from "@/components/accent-link"
import { HoverNote } from "@/components/hover-note"
import { bioHoverNotes } from "@/lib/home"

export function HomeIntro() {
  return (
    <div className="space-y-6">
      <p>
        Hey, I&apos;m Sebastian. I currently live in San Francisco, but I grew up in Pittsburgh and took a gap year
        from Stanford after graduating high school. I&apos;ve lived in a couple of different cities,
        including New York, but nothing is quite as beautiful as the Bay Area.
      </p>
      <p>
        When I&apos;m not out enjoying the weather, I&apos;m usually in our{" "}
        <HoverNote note={bioHoverNotes.southBeachOffice}>South Beach office</HoverNote> with my
        friends building <AccentLink href="https://talunt.io">Talunt</AccentLink>. I also love a
        good movie — Good Will Hunting, Whiplash, The Social Network — and I&apos;m a big fan of EDM:
        John Summit, David Guetta, Zedd. Before I die, I want to hike every national park in the
        country, take up sailing, and build a trillion-dollar company.
      </p>
    </div>
  )
}
