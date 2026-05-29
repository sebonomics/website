import { HoverNote } from "@/components/hover-note"
import { movieHoverNotes } from "@/lib/home"

export function HomeTastes() {
  return (
    <p>
      I love a good movie: <HoverNote note={movieHoverNotes.goodWillHunting}>Good Will Hunting</HoverNote>,{" "}
      <HoverNote note={movieHoverNotes.whiplash}>Whiplash</HoverNote>,{" "}
      <HoverNote note={movieHoverNotes.theSocialNetwork}>The Social Network</HoverNote>. Big EDM fan too — John Summit,
      David Guetta, Zedd. Before I die, I want to hike every national park in the country, sail across the Pacific, and
      build a trillion-dollar company that actually does some good.
    </p>
  )
}
