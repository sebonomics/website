import type { ReactNode } from "react"
import type { MusicTrack } from "@/lib/music"
import { MusicTrackList } from "@/components/music-track-list"

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-sm tracking-wide text-muted">{children}</h2>
}

function LastPlayed({ track }: { track: MusicTrack }) {
  return (
    <div className="flex items-start gap-4">
      {track.artworkUrl ? (
        <img
          src={track.artworkUrl}
          alt=""
          width={64}
          height={64}
          className="size-16 shrink-0 rounded-sm object-cover"
        />
      ) : null}
      <div className="min-w-0 space-y-1">
        <p className="text-foreground">{track.title}</p>
        <p className="text-sm text-muted">{track.artist}</p>
        {track.album ? <p className="text-sm text-muted">{track.album}</p> : null}
      </div>
    </div>
  )
}

export function MusicLastFm({
  lastPlayed,
  topSongs,
}: {
  lastPlayed: MusicTrack | null
  topSongs: MusicTrack[]
}) {
  return (
    <div className="space-y-10">
      {lastPlayed ? (
        <section className="space-y-4">
          <SectionHeading>Last played</SectionHeading>
          <LastPlayed track={lastPlayed} />
        </section>
      ) : null}

      {topSongs.length > 0 ? (
        <section className="space-y-4">
          <SectionHeading>Top songs</SectionHeading>
          <MusicTrackList tracks={topSongs} />
        </section>
      ) : null}
    </div>
  )
}
