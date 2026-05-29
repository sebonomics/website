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

  return (
    <PageShell>
      <div className="flex flex-1 flex-col justify-center space-y-10 text-[17px] leading-[1.65] sm:text-[18px]">
        <section className="space-y-6">
          {!lastfm.configured ? (
            <div className="space-y-4 text-muted">
              <p>
                <span className="text-foreground">Free path:</span> a scrobbler app sends your plays to{" "}
                <a
                  href="https://www.last.fm"
                  className="text-accent underline decoration-accent/45 underline-offset-[3px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Last.fm
                </a>
                , and this site reads that (no $99 Apple fee).
              </p>
              <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed">
                <li>Create a free Last.fm account</li>
                <li>
                  Install{" "}
                  <a
                    href="https://apps.apple.com/us/app/fastscrobbler-for-last-fm/id6759501541"
                    className="text-accent underline decoration-accent/45 underline-offset-[3px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    FastScrobbler
                  </a>{" "}
                  (iPhone) — works with streamed Apple Music, not just your library
                </li>
                <li>Sign in to Last.fm in that app and enable scrobbling</li>
                <li>Play music in the Apple Music app — open FastScrobbler occasionally to sync</li>
                <li>
                  Get a free API key at{" "}
                  <a
                    href="https://www.last.fm/api/account/create"
                    className="text-accent underline decoration-accent/45 underline-offset-[3px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    last.fm/api
                  </a>
                </li>
                <li>
                  Add to <code className="text-foreground/80">.env.local</code>:
                  <pre className="mt-2 overflow-x-auto rounded-sm bg-border/40 p-3 text-[13px] text-foreground/90">
{`LASTFM_API_KEY=your_key
LASTFM_USERNAME=your_lastfm_username`}
                  </pre>
                </li>
                <li>Restart the dev server</li>
              </ol>
            </div>
          ) : lastfm.error ? (
            <p className="text-muted">
              Could not load Last.fm. Check your API key and username in{" "}
              <code className="text-foreground/80">.env.local</code>.
            </p>
          ) : hasData ? (
            <MusicLastFm
              nowPlaying={lastfm.nowPlaying}
              recentTracks={lastfm.recentTracks}
              topArtists={lastfm.topArtists}
            />
          ) : (
            <p className="text-muted">No scrobbles yet — play something and check back.</p>
          )}

          {!hasData && !lastfm.configured ? (
            <MusicTrackList tracks={fallbackTracks} sourceLabel="On repeat lately" />
          ) : null}
        </section>
      </div>

      <SocialFooter />
    </PageShell>
  )
}
