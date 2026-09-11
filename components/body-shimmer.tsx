"use client"

import { useEffect, useRef } from "react"

const symbols = "01/<>+*{}[]"

/** Adds a moving band of cipher glyphs without changing text metrics or links. */
export function BodyShimmer({ html }: { html: string }) {
  const root = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = root.current
    if (!element) return
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    const characters: { overlay: HTMLElement; original: string }[] = []
    const replacements: { wrapper: HTMLElement; node: Text }[] = []
    for (const node of nodes) {
      const wrapper = document.createElement("span")
      const accessible = document.createElement("span")
      accessible.className = "sr-only"
      accessible.textContent = node.data
      wrapper.append(accessible)
      const visual = document.createElement("span")
      visual.setAttribute("aria-hidden", "true")
      // Keep words together while retaining normal wrapping at spaces.
      for (const word of node.data.split(/(\s+)/)) {
        if (/^\s+$/.test(word)) { visual.append(word); continue }
        const wordElement = document.createElement("span")
        wordElement.className = "shimmer-word"
        for (const letter of word) {
          const cell = document.createElement("span")
          cell.className = "shimmer-cell"
          const sizing = document.createElement("span")
          sizing.style.visibility = "hidden"
          sizing.textContent = letter
          const overlay = document.createElement("span")
          overlay.className = "shimmer-glyph"
          overlay.textContent = letter
          cell.append(sizing, overlay)
          wordElement.append(cell)
          characters.push({ overlay, original: letter })
        }
        visual.append(wordElement)
      }
      wrapper.append(visual)
      node.replaceWith(wrapper)
      replacements.push({ wrapper, node })
    }
    let timer: ReturnType<typeof setInterval> | undefined
    let pointer: { x: number; y: number } | null = null
    const restore = () => {
      clearInterval(timer)
      timer = undefined
      pointer = null
      characters.forEach(({ overlay, original }) => { overlay.textContent = original })
    }
    const draw = () => {
      if (!pointer || preference.matches) { restore(); return }
      characters.forEach(({ overlay, original }) => {
        const rect = overlay.getBoundingClientRect()
        const distance = Math.hypot(rect.x + rect.width / 2 - pointer!.x, (rect.y + rect.height / 2 - pointer!.y) * 1.7)
        overlay.textContent = distance < 55 && /[a-z0-9]/i.test(original)
          ? symbols[Math.floor(Math.random() * symbols.length)] : original
      })
    }
    const move = (event: PointerEvent) => {
      if (preference.matches || event.pointerType === "touch") return
      pointer = { x: event.clientX, y: event.clientY }
      draw()
      if (!timer) timer = setInterval(draw, 75)
    }
    let twitchTimer: ReturnType<typeof setTimeout>
    let settleTimer: ReturnType<typeof setTimeout> | undefined
    const settle = () => { if (pointer) draw(); else characters.forEach(({ overlay, original }) => { overlay.textContent = original }) }
    const scheduleTwitch = () => {
      twitchTimer = setTimeout(() => {
        if (!preference.matches && !document.hidden && !pointer && characters.length) {
          const bounds = element.getBoundingClientRect()
          if (bounds.bottom > 0 && bounds.top < innerHeight) {
            const start = Math.floor(Math.random() * characters.length)
            characters.slice(start, start + 2).forEach(({ overlay }) => {
              overlay.textContent = symbols[Math.floor(Math.random() * symbols.length)]
            })
            settleTimer = setTimeout(settle, 320)
          }
        }
        scheduleTwitch()
      }, 1800 + Math.random() * 3200)
    }
    scheduleTwitch()
    const target = element.closest<HTMLElement>("p, li, h1, h2") || element
    target.addEventListener("pointermove", move)
    target.addEventListener("pointerleave", restore)
    window.addEventListener("blur", restore)
    window.addEventListener("scroll", restore, { passive: true })
    preference.addEventListener("change", restore)
    return () => {
      restore()
      clearTimeout(twitchTimer)
      clearTimeout(settleTimer)
      settle()
      target.removeEventListener("pointermove", move)
      target.removeEventListener("pointerleave", restore)
      window.removeEventListener("blur", restore)
      window.removeEventListener("scroll", restore)
      preference.removeEventListener("change", restore)
      replacements.forEach(({ wrapper, node }) => wrapper.replaceWith(node))
    }
  }, [html])

  return <span ref={root} dangerouslySetInnerHTML={{ __html: html }} />
}
