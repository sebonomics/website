import Link from "next/link"

const socials = [
  { label: "Twitter", href: "https://twitter.com/sebonomics" },
  { label: "GitHub", href: "https://github.com/sebonomics" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sebonomics" },
  { label: "Email", href: "mailto:sebastian@talunt.io" },
]

export function SocialFooter() {
  return (
    <footer className="mt-16">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {socials.map((social, index) => (
          <span key={social.label} className="flex items-center gap-2">
            {index > 0 && <span className="text-muted/50">/</span>}
            <Link
              href={social.href}
              className="text-muted transition-colors hover:text-accent"
              {...(social.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {social.label}
            </Link>
          </span>
        ))}
      </nav>
    </footer>
  )
}
