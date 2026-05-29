import type { Metadata } from "next"
import { MusicLastFm } from "@/components/music-lastfm"
import { PageShell } from "@/components/page-shell"
import { SocialFooter } from "@/components/social-footer"
import { getLastFmMusic } from "@/lib/lastfm"

export const metadata: Metadata = {
  title: "Music — Sebastian Tan",
  description: "What Sebastian is listening to",
}

export const dynamic = "force-dynamic"

export default async function MusicPage() {
  const lastfm = await getLastFmMusic()

  return (
    <PageShell>
      <div className="flex flex-1 flex-col justify-center space-y-10 text-[17px] leading-[1.65] sm:text-[18px]">
        <section className="space-y-6">
          {lastfm.error ? (
            <p className="text-muted">
              Could not load music right now.{" "}
              <a
                href="https://www.last.fm/user/sebonomics"
                className="text-accent underline decoration-accent/45 underline-offset-[3px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Last.fm
              </a>
            </p>
          ) : (
            <MusicLastFm
              nowPlaying={lastfm.nowPlaying}
              recentTracks={lastfm.recentTracks}
              topArtists={lastfm.topArtists}
            />
          )}
        </section>
      </div>

      <SocialFooter />
    </PageShell>
  )
}
