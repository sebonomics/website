"use client"

import Script from "next/script"
import { useCallback, useEffect, useState } from "react"
import { MusicTrackList } from "@/components/music-track-list"
import { appleMusicAppName, fallbackTracks, type MusicTrack } from "@/lib/music"

const MUSIC_KIT_SCRIPT = "https://js-cdn.music.apple.com/musickit/v3/musickit.js"

function mapMediaItems(items: MusicKit.MediaItem[]): MusicTrack[] {
  return items.map((item) => {
    const artwork = item.attributes.artwork?.url
    return {
      id: item.id,
      title: item.attributes.name,
      artist: item.attributes.artistName,
      album: item.attributes.albumName,
      artworkUrl: artwork,
      appleMusicUrl: item.attributes.url,
    }
  })
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

export function AppleMusicRotation() {
  const [tracks, setTracks] = useState<MusicTrack[]>(fallbackTracks)
  const [sourceLabel, setSourceLabel] = useState<string>("On repeat lately")
  const [status, setStatus] = useState<"idle" | "loading" | "connected" | "error">("idle")
  const [scriptReady, setScriptReady] = useState(false)
  const [apiConfigured, setApiConfigured] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/apple-music/token")
      .then((res) => res.json())
      .then((data: { configured?: boolean }) => setApiConfigured(Boolean(data.configured)))
      .catch(() => setApiConfigured(false))
  }, [])

  const loadFromAppleMusic = useCallback(async () => {
    if (!window.MusicKit) {
      setErrorMessage("Apple Music kit failed to load.")
      setStatus("error")
      return
    }

    setStatus("loading")
    setErrorMessage(null)

    try {
      const tokenRes = await fetch("/api/apple-music/token")
      const tokenData = (await tokenRes.json()) as { configured?: boolean; token?: string }

      if (!tokenRes.ok || !tokenData.token) {
        setTracks(fallbackTracks)
        setSourceLabel("On repeat lately")
        setStatus("idle")
        setErrorMessage("Apple Music API is not configured yet — showing a static list.")
        return
      }

      const music = await window.MusicKit.configure({
        developerToken: tokenData.token,
        app: { name: appleMusicAppName, build: "1.0.0" },
      })

      await music.authorize()

      const musicApi = music.api as MusicKit.MusicKitInstance["api"] & {
        music(path: string, options?: { limit?: number }): Promise<MusicKit.APIResponse>
      }

      const [heavy, recent] = await Promise.all([
        musicApi.music("v1/me/history/heavy-rotation", { limit: 10 }),
        musicApi.music("v1/me/recent/played/tracks", { limit: 10 }),
      ])

      const merged = dedupeTracks([
        ...mapMediaItems(heavy.data ?? []),
        ...mapMediaItems(recent.data ?? []),
      ]).slice(0, 12)

      if (merged.length > 0) {
        setTracks(merged)
        setSourceLabel("From your Apple Music heavy rotation & recent plays")
        setStatus("connected")
      } else {
        setTracks(fallbackTracks)
        setSourceLabel("On repeat lately")
        setStatus("connected")
      }
    } catch {
      setTracks(fallbackTracks)
      setSourceLabel("On repeat lately")
      setStatus("error")
      setErrorMessage("Could not connect to Apple Music. Showing a static list.")
    }
  }, [])

  return (
    <>
      <Script
        src={MUSIC_KIT_SCRIPT}
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />

      <div className="space-y-8">
        {apiConfigured ? (
          <div className="space-y-3">
            <button
              type="button"
              onClick={loadFromAppleMusic}
              disabled={!scriptReady || status === "loading"}
              className="text-accent underline decoration-accent/45 underline-offset-[3px] transition-colors hover:text-accent-hover hover:decoration-accent-hover/60 disabled:opacity-50"
            >
              {status === "loading"
                ? "Connecting…"
                : status === "connected"
                  ? "Refresh from Apple Music"
                  : "Connect Apple Music"}
            </button>
            <p className="text-sm text-muted">
              Sign in with your Apple ID to pull heavy rotation and recent plays. Only you need to
              connect — visitors see the list after you sync.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Live Apple Music sync needs developer credentials in{" "}
            <code className="text-foreground/80">.env.local</code>. Showing a static list for now.
          </p>
        )}

        {errorMessage ? <p className="text-sm text-muted">{errorMessage}</p> : null}

        <MusicTrackList tracks={tracks} sourceLabel={sourceLabel} />
      </div>
    </>
  )
}
