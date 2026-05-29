"use client"

import { useEffect, useState } from "react"

function readLightMode() {
  return document.documentElement.classList.contains("light")
}

export function ThemeToggle() {
  const [light, setLight] = useState(false)

  useEffect(() => {
    setLight(readLightMode())
  }, [])

  const toggle = () => {
    const next = !light
    setLight(next)
    document.documentElement.classList.toggle("light", next)
    localStorage.setItem("theme", next ? "light" : "dark")
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="shrink-0 rounded-sm p-1 text-muted transition-colors hover:text-foreground"
    >
      <span className="flex h-3.5 w-6 overflow-hidden rounded-[2px] border border-border">
        <span className={`w-1/2 transition-colors ${light ? "bg-background" : "bg-foreground/80"}`} />
        <span className={`w-1/2 transition-colors ${light ? "bg-accent/70" : "bg-accent/35"}`} />
      </span>
    </button>
  )
}
