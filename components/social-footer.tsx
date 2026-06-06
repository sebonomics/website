import type { ComponentType, SVGProps } from "react"
import Link from "next/link"
import { Github, Mail, Twitter } from "lucide-react"

function LinkedInSquare(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

const socials: { label: string; href: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { label: "Twitter", href: "https://twitter.com/sebonomics", icon: Twitter },
  { label: "GitHub", href: "https://github.com/sebonomics", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/sebonomics", icon: LinkedInSquare },
  { label: "Email", href: "mailto:sebastian@talunt.io", icon: Mail },
]

export function SocialFooter() {
  return (
    <footer className="mt-16">
      <nav className="flex items-center gap-5 text-muted">
        {socials.map((social) => {
          const Icon = social.icon
          return (
            <Link
              key={social.label}
              href={social.href}
              aria-label={social.label}
              title={social.label}
              className="text-muted transition-colors hover:text-accent"
              {...(social.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </Link>
          )
        })}
      </nav>
    </footer>
  )
}
