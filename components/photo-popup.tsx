"use client"

import { useId, useState, type ReactNode } from "react"

/** A photo disclosure directly beneath its associated paragraph. */
export function PhotoPopup({ children, image }: { children: ReactNode; image?: { src: string; alt: string } }) {
  const id = useId()
  const [photo, setPhoto] = useState<{ src: string; alt: string } | null>(null)
  return (
    <div className={image ? "photo-paragraph" : undefined} onClick={(event) => {
      const paragraph = (event.target as HTMLElement).closest("p")
      if (!paragraph || !event.currentTarget.contains(paragraph)) return
      const clickedLink = (event.target as HTMLElement).closest("a")
      if (clickedLink && !clickedLink.hasAttribute("data-photo")) return
      const link = paragraph.querySelector<HTMLAnchorElement>("a[data-photo]")
      const source = image || (link ? { src: link.getAttribute("href")!, alt: link.dataset.photo || "Photo" } : null)
      if (!source || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || window.getSelection()?.toString()) return
      event.preventDefault()
      const next = photo ? null : source
      setPhoto(next)
      link?.setAttribute("aria-expanded", String(Boolean(next)))
      link?.setAttribute("aria-controls", id)
    }}>
      {children}
      {photo && (
        <div id={id} className="mt-5 aspect-[16/9] w-full overflow-hidden">
          <img src={photo.src} alt={photo.alt} className="block size-full object-cover" />
        </div>
      )}
    </div>
  )
}
