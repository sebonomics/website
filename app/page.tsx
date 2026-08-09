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
    <PageShell icon="about" title="About" cover={<CoverBanner />}>
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

      <H2>Dock</H2>
      <Paragraph>What I&apos;m currently up to</Paragraph>
      <div className="mt-5">
        <Dock />
      </div>
    </PageShell>
  )
}
