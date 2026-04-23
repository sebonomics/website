import Link from "next/link"

const socials = [
  { label: "Email", href: "mailto:sebastian@talunt.io" },
  { label: "GitHub", href: "https://github.com/sebonomics" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sebonomics" },
  { label: "Twitter", href: "https://twitter.com/sebonomics" },
]

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-16 text-black sm:py-24 lg:max-w-4xl lg:min-h-dvh lg:flex lg:flex-col lg:justify-center lg:px-12 lg:py-20 xl:max-w-5xl xl:px-16">
      <h1 className="mb-10 text-2xl font-normal">Sebastian Tan</h1>

      <div className="space-y-5 text-[15px] leading-relaxed sm:text-base">
        <p>I grew up with entrepreneurs as my heroes.</p>

        <p>
          I read <span className="italic">The Everything Store</span> in fifth grade, and I've wanted to be a founder
          ever since. Like Jeff Bezos, my mother raised me alone. I learned self-reliance from attending Montesorri
          School. I spent the summer heat running the family store. He worked at a McDonald's growing up.
          {'\u00a0'}For me, it was Wendy's.
        </p>

        <p>
          In middle school, it was Steve Jobs. I spent these years blowing off school and building a lot of computers. I
          almost burned the house <span className="italic">down</span> mining Bitcoin in the basement. I nearly blew the
          house <span className="italic">up</span> soldering batteries in
          the garage. After fuck-ups like those, I watched{" "}
          <Link
            href="https://www.youtube.com/watch?v=UF8uR6Z6KLc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline-offset-4 hover:text-blue-800 hover:underline"
          >
            his speech on YouTube
          </Link>
          . It has almost 50M views.
        </p>

        <p>
          In high school, it was Peter Thiel and Elon Musk. Both built things because they believed America was worth
          fighting for. After high school, I deferred Stanford to work at Palantir. My high school class threw a fit, but I went
          anyway. My family came to this country with nothing, and it gave us a chance. We hang flags in the office to
          remind us of this.
        </p>

        <p>
          Now, I admire the new generation. Michael Truell. Patrick Collison. Henrique Dubugras. They all started very
          young. Being young is intimidating, but for every experienced person who thinks you're stupid, there's one who
          respects your willingness to try. It's a reminder that you don't have to wait to do something meaningful.
        </p>

        <p>
          In the future, I dream of being like the people on this list. I've started three companies. The first helped
          thousands of people with criminal records find work. The second was acquired the summer after high school.
          And the third one, I'm building now. I don't consider any of them to be successful yet, but in time, I think
          one will.
        </p>
      </div>

      <nav className="mt-14 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {socials.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-blue-600 underline-offset-4 hover:text-blue-800 hover:underline"
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </Link>
        ))}
      </nav>
    </main>
  )
}
