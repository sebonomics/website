import type { MusicTrack } from "@/lib/music"

const LASTFM_USERNAME = process.env.LASTFM_USERNAME ?? "sebonomics"
const LASTFM_API_KEY =
  process.env.LASTFM_API_KEY ?? "390f2ef724bcc5cdaef02fd793169ac8"

type LastFmImage = { "#text": string; size: string }
type LastFmArtist = { "#text": string; name?: string; playcount?: string; image?: LastFmImage[] }
type LastFmTrack = {
  name: string
  url?: string
  artist: LastFmArtist | { "#text": string; name?: string }
  album?: { "#text": string }
  image?: LastFmImage[]
  playcount?: string
  "@attr"?: { nowplaying?: string }
}

type LastFmResponse = {
  recenttracks?: {
    track?: LastFmTrack | LastFmTrack[]
  }
  toptracks?: {
    track?: LastFmTrack | LastFmTrack[]
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
    playCount: track.playcount ? Number.parseInt(track.playcount, 10) : undefined,
  }
}

function parseLastPlayed(raw: LastFmTrack | LastFmTrack[] | undefined): MusicTrack | null {
  if (!raw) return null

  const list = Array.isArray(raw) ? raw : [raw]
  const track = list.find((item) => item.name && item.name !== "—")
  return track ? normalizeTrack(track, 0) : null
}

function normalizeTopTracks(raw: LastFmTrack | LastFmTrack[] | undefined): MusicTrack[] {
  if (!raw) return []
  const list = Array.isArray(raw) ? raw : [raw]

  return list
    .filter((track) => track.name && track.name !== "—")
    .map((track, index) => normalizeTrack(track, index))
    .slice(0, 5)
}

async function lastFmRequest(params: Record<string, string>): Promise<LastFmResponse> {
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    throw new Error("not_configured")
  }

  const search = new URLSearchParams({
    ...params,
    user: LASTFM_USERNAME,
    api_key: LASTFM_API_KEY,
    format: "json",
  })

  const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${search}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("fetch_failed")
  }

  return res.json() as Promise<LastFmResponse>
}

export type LastFmMusic = {
  lastPlayed: MusicTrack | null
  topSongs: MusicTrack[]
  configured: boolean
  error?: "fetch_failed" | "not_configured"
}

export async function getLastFmMusic(): Promise<LastFmMusic> {
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    return {
      lastPlayed: null,
      topSongs: [],
      configured: false,
      error: "not_configured",
    }
  }

  try {
    const [recent, topTracksRes] = await Promise.all([
      lastFmRequest({ method: "user.getRecentTracks", limit: "1" }),
      lastFmRequest({ method: "user.getTopTracks", period: "1month", limit: "5" }),
    ])

    if (recent.error || topTracksRes.error) {
      return {
        lastPlayed: null,
        topSongs: [],
        configured: true,
        error: "fetch_failed",
      }
    }

    return {
      lastPlayed: parseLastPlayed(recent.recenttracks?.track),
      topSongs: normalizeTopTracks(topTracksRes.toptracks?.track),
      configured: true,
    }
  } catch (error) {
    if (error instanceof Error && error.message === "not_configured") {
      return {
        lastPlayed: null,
        topSongs: [],
        configured: false,
        error: "not_configured",
      }
    }
    return {
      lastPlayed: null,
      topSongs: [],
      configured: true,
      error: "fetch_failed",
    }
  }
}
