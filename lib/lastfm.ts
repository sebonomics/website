import type { MusicArtist, MusicTrack } from "@/lib/music"

type LastFmImage = { "#text": string; size: string }
type LastFmArtist = { "#text": string; name?: string; playcount?: string; image?: LastFmImage[] }
type LastFmTrack = {
  name: string
  url?: string
  artist: LastFmArtist | { "#text": string }
  album?: { "#text": string }
  image?: LastFmImage[]
  "@attr"?: { nowplaying?: string }
}

type LastFmResponse = {
  recenttracks?: {
    track?: LastFmTrack | LastFmTrack[]
  }
  topartists?: {
    artist?: LastFmArtist | LastFmArtist[]
  }
  error?: number
  message?: string
}

function lastFmArtistName(artist: LastFmTrack["artist"] | LastFmArtist): string {
  if (typeof artist === "object" && artist !== null) {
    return artist.name ?? artist["#text"] ?? "Unknown artist"
  }
  return "Unknown artist"
}

function largestImage(images: LastFmImage[] | undefined): string | undefined {
  if (!images?.length) return undefined
  const sorted = [...images].sort((a, b) => {
    const order = ["small", "medium", "large", "extralarge", "mega"]
    return order.indexOf(b.size) - order.indexOf(a.size)
  })
  return sorted.find((img) => img["#text"])?.["#text"]
}

function normalizeTrack(track: LastFmTrack, index: number): MusicTrack {
  return {
    id: `${track.name}-${lastFmArtistName(track.artist)}-${index}`,
    title: track.name,
    artist: lastFmArtistName(track.artist),
    album: track.album?.["#text"] || undefined,
    artworkUrl: largestImage(track.image),
  }
}

function normalizeArtists(raw: LastFmArtist | LastFmArtist[] | undefined): MusicArtist[] {
  if (!raw) return []
  const list = Array.isArray(raw) ? raw : [raw]

  return list
    .filter((artist) => artist.name)
    .map((artist, index) => ({
      id: `${artist.name}-${index}`,
      name: artist.name!,
      playCount: artist.playcount ? Number.parseInt(artist.playcount, 10) : undefined,
      artworkUrl: largestImage(artist.image),
    }))
}

function dedupeTracks(tracks: MusicTrack[]): MusicTrack[] {
  const seen = new Set<string>()
  return tracks.filter((track) => {
    const key = `${track.title}-${track.artist}`.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function parseRecentTracks(raw: LastFmTrack | LastFmTrack[] | undefined): {
  nowPlaying: MusicTrack | null
  recentTracks: MusicTrack[]
} {
  if (!raw) return { nowPlaying: null, recentTracks: [] }

  const list = Array.isArray(raw) ? raw : [raw]
  let nowPlaying: MusicTrack | null = null
  const scrobbled: MusicTrack[] = []

  list.forEach((track, index) => {
    if (!track.name || track.name === "—") return

    const normalized = normalizeTrack(track, index)

    if (track["@attr"]?.nowplaying === "true") {
      nowPlaying = normalized
      return
    }

    scrobbled.push(normalized)
  })

  return {
    nowPlaying,
    recentTracks: dedupeTracks(scrobbled).slice(0, 5),
  }
}

async function lastFmRequest(
  params: Record<string, string>,
  revalidate = 300
): Promise<LastFmResponse> {
  const apiKey = process.env.LASTFM_API_KEY
  const user = process.env.LASTFM_USERNAME

  if (!apiKey || !user) {
    throw new Error("not_configured")
  }

  const search = new URLSearchParams({
    ...params,
    user,
    api_key: apiKey,
    format: "json",
  })

  const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${search}`, {
    next: { revalidate },
  })

  if (!res.ok) {
    throw new Error("fetch_failed")
  }

  return res.json() as Promise<LastFmResponse>
}

export type LastFmMusic = {
  nowPlaying: MusicTrack | null
  recentTracks: MusicTrack[]
  topArtists: MusicArtist[]
  configured: boolean
  error?: "fetch_failed" | "not_configured"
}

export async function getLastFmMusic(): Promise<LastFmMusic> {
  if (!process.env.LASTFM_API_KEY || !process.env.LASTFM_USERNAME) {
    return {
      nowPlaying: null,
      recentTracks: [],
      topArtists: [],
      configured: false,
      error: "not_configured",
    }
  }

  try {
    const [recent, topArtistsRes] = await Promise.all([
      lastFmRequest({ method: "user.getRecentTracks", limit: "8" }, 60),
      lastFmRequest(
        { method: "user.getTopArtists", period: "1month", limit: "5" },
        300
      ),
    ])

    if (recent.error || topArtistsRes.error) {
      return {
        nowPlaying: null,
        recentTracks: [],
        topArtists: [],
        configured: true,
        error: "fetch_failed",
      }
    }

    const { nowPlaying, recentTracks } = parseRecentTracks(recent.recenttracks?.track)
    const topArtists = normalizeArtists(topArtistsRes.topartists?.artist)

    return {
      nowPlaying,
      recentTracks,
      topArtists,
      configured: true,
    }
  } catch (error) {
    if (error instanceof Error && error.message === "not_configured") {
      return {
        nowPlaying: null,
        recentTracks: [],
        topArtists: [],
        configured: false,
        error: "not_configured",
      }
    }
    return {
      nowPlaying: null,
      recentTracks: [],
      topArtists: [],
      configured: true,
      error: "fetch_failed",
    }
  }
}
