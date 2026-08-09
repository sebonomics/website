import { CoverBanner } from "@/components/cover-banner"
import { Dock } from "@/components/dock"
import {
  Bullet,
  Bullets,
  Callout,
  H2,
  PageTitle,
  Paragraph,
  SpotifyPill,
} from "@/components/notion-blocks"
import { PageShell } from "@/components/page-shell"
import { aboutItems, nowPlaying, profile } from "@/lib/home"

export default function Home() {
  return (
    <PageShell icon={profile.pageEmoji} title="About" cover={<CoverBanner />}>
      <PageTitle>{profile.fullName}</PageTitle>

      <Callout>{profile.tagline}</Callout>

      <H2>About</H2>
      <Bullets>
        {aboutItems.map((item, i) => (
          <Bullet key={i}>
            <span dangerouslySetInnerHTML={{ __html: item.html }} />
          </Bullet>
        ))}
        <Bullet>
          Currently listening to:
          <SpotifyPill artist={nowPlaying.artist} track={nowPlaying.track} href={nowPlaying.href} />
        </Bullet>
      </Bullets>

      <H2>My Dock</H2>
      <Paragraph>
        My daily drivers — parked at the bottom of the screen, same as on my Mac.
      </Paragraph>
      <div className="mt-5">
        <Dock />
      </div>
    </PageShell>
  )
}
