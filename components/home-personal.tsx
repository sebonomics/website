import { HoverNote } from "@/components/hover-note"
import { movieHoverNotes } from "@/lib/home"

export function HomePersonal() {
  return (
    <section className="space-y-6">
      <h2 className="text-sm tracking-wide text-muted">Personal</h2>

      <div className="space-y-6">
        <p>
          I love a good movie:{" "}
          <HoverNote note={movieHoverNotes.goodWillHunting}>Good Will Hunting</HoverNote>,{" "}
          <HoverNote note={movieHoverNotes.whiplash}>Whiplash</HoverNote>,{" "}
          <HoverNote note={movieHoverNotes.theSocialNetwork}>The Social Network</HoverNote>.
          Big EDM fan — John Summit, David Guetta, Zedd.
        </p>

        <p>
          Outside of work you&apos;ll usually find me at a show, on a long run, or planning the
          next trip I definitely do not have time for.
        </p>
      </div>
    </section>
  )
}
