"use client"

import { useEffect, useRef, useState } from "react"

import { AsciiCover } from "@/components/ascii-cover"
import { profile } from "@/lib/home"

/**
 * Renders the cover photo at `profile.coverImage` (drop the file in /public).
 * If that file is missing, it quietly falls back to the dot-matrix desert scene.
 */
export function CoverBanner() {
  const [failed, setFailed] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // an <img> that 404s before hydration never fires onError, so re-check on mount
  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])

  if (failed || !profile.coverImage) return <AsciiCover />

  return (
    <div className="relative h-[140px] w-full overflow-hidden bg-cover sm:h-[min(22vh,190px)] md:h-[min(25vh,230px)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={profile.coverImage}
        alt=""
        onError={() => setFailed(true)}
        className="size-full object-cover"
        style={{ objectPosition: profile.coverPosition }}
      />
      <div className="pointer-events-none absolute inset-0 dark:bg-black/25" />
    </div>
  )
}
