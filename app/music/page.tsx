import type { Metadata } from "next"
import { MusicLastFm } from "@/components/music-lastfm"
import { MusicTrackList } from "@/components/music-track-list"
import { PageShell } from "@/components/page-shell"
import { SocialFooter } from "@/components/social-footer"
import { fallbackTracks } from "@/lib/music"
import { getLastFmMusic } from "@/lib/lastfm"

export const metadata: Metadata = {
  title: "Music — Sebastian Tan",
  description: "What Sebastian is listening to",
}

export const dynamic = "force-dynamic"

export default async function MusicPage() {
  const lastfm = await getLastFmMusic()
  const hasData =
    lastfm.nowPlaying != null ||
    lastfm.recentTracks.length > 0 ||
    lastfm.topArtists.length > 0
  const showLive = lastfm.configured && !lastfm.error && hasData

  return (
    <PageShell>
      <div className="flex flex-1 flex-col justify-center space-y-10 text-[17px] leading-[1.65] sm:text-[18px]">
        <section className="space-y-6">
          {showLive ? (
            <MusicLastFm
              nowPlaying={lastfm.nowPlaying}
              recentTracks={lastfm.recentTracks}
              topArtists={lastfm.topArtists}
            />
          ) : (
            <MusicTrackList tracks={fallbackTracks} sourceLabel="On repeat lately" />
          )}
        </section>
      </div>

      <SocialFooter />
    </PageShell>
  )
}
