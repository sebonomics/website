import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { siteDescription as description, siteUrl } from "@/lib/site"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // "Sebastian Tan" on the home page; subpages read "Reading — Sebastian Tan"
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
    icon: { url: "/icon.svg", type: "image/svg+xml" },
    apple: "/apple-icon.png",
  },
}

const themeScript = `
(function () {
  try {
    // light by default; preserve an explicit dark-mode preference
    var dark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", dark);
    // owns the theme-color meta: created here in <head> so iOS Safari has the
    // right colour for the status bar / notch area before it paints. Kept in
    // step with setThemeColor() in lib/theme.ts — replace the tag, never edit it
    var stale = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < stale.length; i++) stale[i].remove();
    var meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    meta.setAttribute("content", dark ? "#000000" : "#ffffff");
    document.head.appendChild(meta);
  } catch (e) {}
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
