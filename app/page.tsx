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
        <p>
          Growing up, I was always the kid who couldn't sit still. In middle school, I almost burned the house down
          mining Bitcoin in the basement. In high school, I sold sneakers and software out of my bedroom.
        </p>

        <p>
          I heard about Stanford from a friend during my freshman year of high school. My mom, who raised me by
          herself, had never even heard of the school, and when I told my principal that I wanted to go there, I
          remember her laughing in my face.
        </p>

        <p>
          A couple of years later, I graduated from high school with the highest GPA in my class — and also the most
          absences. I got into Stanford, and we got a new head of school. This one gave me an award.
        </p>

        <p>
          I thought I would go to Stanford, but I took a detour when Palantir called, asking me to come work in New
          York. My high school class thought I was an idiot for taking that swing. Alex Karp thought it was badass.
        </p>

        <p>
          I've started three companies. The first was a job platform that helped thousands of people with criminal
          records get jobs. The second one got acquired the summer after I graduated high school. And the third one, I
          am working on now.
        </p>

        <p>
          My biggest strength is my ability to withstand pain. My biggest fear is not reaching my potential while
          I'm here. My biggest hero is my mom. And my greatest enjoyment comes from spending time with amazing
          people whom I am lucky to call friends.
        </p>
      </div>

      <nav className="mt-14 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {socials.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-black underline-offset-4 hover:underline"
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </Link>
        ))}
      </nav>
    </main>
  )
}
