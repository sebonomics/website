import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Newsreader } from "next/font/google"
import "./globals.css"

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Sebastian Tan",
  description: "Sebastian Tan",
}

const themeScript = `
(function () {
  try {
    document.documentElement.classList.remove("dark");
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  } catch (e) {}
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={newsreader.variable} suppressHydrationWarning>
      <body className={newsreader.className}>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  )
}
