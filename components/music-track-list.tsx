import type { MusicTrack } from "@/lib/music"

export function MusicTrackList({
  tracks,
  sourceLabel,
}: {
  tracks: MusicTrack[]
  sourceLabel?: string
}) {
  return (
    <div className="space-y-6">
      {sourceLabel ? <p className="text-sm text-muted">{sourceLabel}</p> : null}
      <ol className="space-y-4">
        {tracks.map((track, index) => (
          <li key={track.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="w-5 shrink-0 text-sm text-muted tabular-nums">{index + 1}</span>
            <span className="text-foreground">{track.title}</span>
            <span className="text-sm text-muted">{track.artist}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
