"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <button
        onClick={toggleTheme}
        className="fixed top-8 right-8 z-10 group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 bg-background/80 backdrop-blur-sm"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg
            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">ABOUT / 2026</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">Sebastian Tan</h1>
              </div>

              <div className="space-y-6 max-w-xl">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  I currently live in SF and am building{" "}
                  <Link href="https://talunt.io" className="text-foreground hover:underline">
                    Talunt.io
                  </Link>
                  . You can find me at either at the Founder's, Inc campus near Fort Mason or in Afore Capital's SoMa office.
                </p>

                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  I'm also a student at Stanford, studying computer science and economics. Right now, I'm on leave, but I take trips down to campus sometimes to see friends.
                </p>

                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  On my gap year, I interned as a SWE at Palantir, founded Beacon (Acquired), explored NYC, and started Talunt. I fell in love with all types of food, but still enjoy staying active and lifting.
                </p>

                <p className="hidden sm:block text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  I believe that people are the greatest asset that any of us will have in life. The people who work
                  with you, for you, and around you are some of the largest predictors of where life will take you.
                </p>
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-2 items-start justify-center self-stretch">
              <div className="relative w-full max-w-md h-full">
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <Image
                    src="/my-photo.jpg"
                    alt="Sebastian Tan"
                    fill
                    className="object-cover"
                    priority
                    style={{
                      maskImage: 'radial-gradient(ellipse 90% 90% at center, black 60%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at center, black 60%, transparent 100%)',
                    }}
                  />
                </div>
                <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-b from-background/0 via-background/0 to-background/30"></div>
                <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-t from-background/0 via-background/0 to-background/30"></div>
                <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-background/0 via-background/0 to-background/20"></div>
                <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-l from-background/0 via-background/0 to-background/20"></div>
              </div>
            </div>
          </div>
        </header>

        {false && (
          <section
            id="thoughts"
            ref={(el) => (sectionsRef.current[2] = el)}
            className="min-h-screen py-20 sm:py-32 opacity-0"
          >
            <div className="space-y-12 sm:space-y-16">
              <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>

              <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                {[
                  {
                    title: "The Future of Web Development",
                    excerpt: "Exploring how AI and automation are reshaping the way we build for the web.",
                    date: "Dec 2024",
                    readTime: "5 min",
                  },
                  {
                    title: "Design Systems at Scale",
                    excerpt: "Lessons learned from building and maintaining design systems across multiple products.",
                    date: "Nov 2024",
                    readTime: "8 min",
                  },
                  {
                    title: "Performance-First Development",
                    excerpt: "Why performance should be a first-class citizen in your development workflow.",
                    date: "Oct 2024",
                    readTime: "6 min",
                  },
                  {
                    title: "The Art of Code Review",
                    excerpt: "Building better software through thoughtful and constructive code reviews.",
                    date: "Sep 2024",
                    readTime: "4 min",
                  },
                ].map((post, index) => (
                  <article
                    key={index}
                    className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <span>Read more</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="connect" ref={(el) => (sectionsRef.current[1] = el)} className="min-h-screen pt-64 pb-32 sm:py-40 lg:py-48 opacity-0 flex items-center">
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-light mb-12 sm:mb-16">Let's Connect</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="p-6 border border-border rounded-lg flex flex-col">
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-muted-foreground font-mono mb-4">EMAIL</div>
                    <Link href="mailto:sebastian@talunt.io" className="text-base sm:text-lg hover:opacity-70 transition-opacity">
                      sebastian@talunt.io
                    </Link>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground font-mono mb-4">ELSEWHERE</div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "GitHub", handle: "@sebonomics", url: "https://github.com/sebonomics" },
                        { name: "LinkedIn", handle: "sebonomics", url: "https://linkedin.com/in/sebonomics" },
                        { name: "Twitter", handle: "@sebonomics", url: "https://twitter.com/sebonomics" },
                        { name: "Email", handle: "sebastian@talunt.io", url: "mailto:sebastian@talunt.io" },
                      ].map((social) => (
                        <Link
                          key={social.name}
                          href={social.url}
                          target={social.name === "Email" ? undefined : "_blank"}
                          rel={social.name === "Email" ? undefined : "noopener noreferrer"}
                          className="space-y-1 hover:opacity-70 transition-opacity"
                        >
                          <div className="text-sm text-foreground font-medium">
                            {social.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{social.handle}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-border rounded-lg flex flex-col">
                <div className="text-sm text-muted-foreground font-mono mb-4">LOCATIONS</div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Founder's Inc Campus</div>
                    <div className="text-sm text-muted-foreground">Fort Mason Center for Arts & Culture, Building B, San Francisco, CA.</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Afore Capital Office</div>
                    <div className="text-sm text-muted-foreground">680 2nd Street, San Francisco, CA 94107</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2026 Sebastian Tan. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
