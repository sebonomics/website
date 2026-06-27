import { AccentLink } from "@/components/accent-link"

export function HomeIntro() {
  return (
    <div className="space-y-6">
      <p>
        Hey, I&apos;m Sebastian. I currently live in San Francisco, but I grew up in Pittsburgh and took a gap year
        from Stanford after graduating high school. I&apos;ve lived in a couple of different cities,
        including New York, but I have a feeling I&apos;m going to live in the Bay Area for a long time.
      </p>
      <p>
        When I&apos;m not out enjoying the weather, I&apos;m usually in our South Beach office with my
        friends building <AccentLink href="https://talunt.io">Talunt</AccentLink>. I love hiking,
        going for runs, and riding my electric bike on long trips across SF. Before I die, I want to
        hike every national park in the country, take up sailing, and build a trillion-dollar company.
      </p>
    </div>
  )
}
