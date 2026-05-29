export type MusicTrack = {
  id: string
  title: string
  artist: string
  album?: string
  artworkUrl?: string
  appleMusicUrl?: string
  playCount?: number
}

export type MusicArtist = {
  id: string
  name: string
  playCount?: number
  artworkUrl?: string
}

/** Shown when Apple Music is not connected or API credentials are missing. */
export const fallbackTracks: MusicTrack[] = [
  { id: "1", title: "Where You Are", artist: "John Summit", album: "Comfort In Chaos" },
  { id: "2", title: "Titanium", artist: "David Guetta ft. Sia", album: "Nothing but the Beat" },
  { id: "3", title: "Clarity", artist: "Zedd ft. Foxes", album: "Clarity" },
  { id: "4", title: "Miracle", artist: "Adriatique & Anyma", album: "Explore" },
  { id: "5", title: "Renaissance", artist: "Anyma", album: "Genesys" },
]

export const appleMusicAppName = process.env.NEXT_PUBLIC_APPLE_MUSIC_APP_NAME ?? "Sebastian Tan"

export function isAppleMusicConfigured(): boolean {
  return Boolean(
    process.env.APPLE_MUSIC_TEAM_ID &&
      process.env.APPLE_MUSIC_KEY_ID &&
      process.env.APPLE_MUSIC_PRIVATE_KEY
  )
}
