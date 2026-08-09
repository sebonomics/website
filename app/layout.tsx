import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter, Newsreader } from "next/font/google"
import "./globals.css"
import { siteDescription as description, siteUrl } from "@/lib/site"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // "Sebastian Tan" on the home page; subpages read "Experience — Sebastian Tan"
  title: {
    default: "Sebastian Tan",
    template: "%s — Sebastian Tan",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Sebastian Tan",
    title: "Sebastian Tan",
    description,
    url: siteUrl,
    images: [{ url: "/cover.png", width: 1860, height: 930, alt: "Sebastian Tan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastian Tan",
    description,
    creator: "@sebonomics",
    images: ["/cover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
}

const themeScript = `
(function () {
  try {
    // dark by default; only an explicit "light" choice opts out
    var stored = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", stored !== "light");
  } catch (e) {}
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
      </body>
    </html>
  )
}
