"use client"

import { createElement, useEffect, useRef, useState, type ReactNode } from "react"

const symbols = "01/<>+*{}[]"
type Segment = { text: string; start: number } | { tag: string; props: Record<string, string>; children: Segment[] }

export function BodyShimmer({ html }: { html: string }) {
  const root = useRef<HTMLSpanElement>(null)
  const [segments, setSegments] = useState<Segment[] | null>(null)
  const [glyphs, setGlyphs] = useState<Record<number, string>>({})
  const letters = useRef<string[]>([])

  useEffect(() => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    const originals: string[] = []
    const parse = (node: Node): Segment => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || ""
        const start = originals.length
        originals.push(...Array.from(text))
        return { text, start }
      }
      const element = node as HTMLElement
      const props: Record<string, string> = {}
      for (const attribute of Array.from(element.attributes)) {
        if (["href", "target", "rel", "class", "data-photo"].includes(attribute.name)) {
          props[attribute.name === "class" ? "className" : attribute.name] = attribute.value
        }
      }
      return { tag: element.tagName.toLowerCase(), props, children: Array.from(element.childNodes).map(parse) }
    }
    letters.current = originals
    setSegments(Array.from(doc.body.childNodes).map(parse))
    setGlyphs({})
  }, [html])

  useEffect(() => {
    if (!segments || !root.current) return
    const element = root.current
    const preference = matchMedia("(prefers-reduced-motion: reduce)")
    const target = element.closest<HTMLElement>("p, li, h1, h2") || element
    let idle: ReturnType<typeof setTimeout> | undefined
    let pointerActive = false
    let lastMove = 0
    const reset = () => { clearTimeout(idle); pointerActive = false; setGlyphs({}) }
    const move = (event: PointerEvent) => {
      if (preference.matches || event.pointerType === "touch") return
      clearTimeout(idle)
      pointerActive = true
      idle = setTimeout(reset, 150)
      if (performance.now() - lastMove < 65) return
      lastMove = performance.now()
      const next: Record<number, string> = {}
      element.querySelectorAll<HTMLElement>("[data-glyph]").forEach(cell => {
        const index = Number(cell.dataset.glyph)
        const rect = cell.getBoundingClientRect()
        if (Math.hypot(rect.x + rect.width / 2 - event.clientX, (rect.y + rect.height / 2 - event.clientY) * 1.7) < 45 && /[a-z0-9]/i.test(letters.current[index])) {
          next[index] = symbols[Math.floor(Math.random() * symbols.length)]
        }
      })
      setGlyphs(next)
    }
    target.addEventListener("pointermove", move)
    target.addEventListener("pointerleave", reset)
    target.addEventListener("click", reset)
    window.addEventListener("scroll", reset, { passive: true })
    window.addEventListener("blur", reset)
    document.addEventListener("visibilitychange", reset)
    preference.addEventListener("change", reset)
    return () => {
      clearTimeout(idle)
      target.removeEventListener("pointermove", move)
      target.removeEventListener("pointerleave", reset)
      target.removeEventListener("click", reset)
      window.removeEventListener("scroll", reset)
      window.removeEventListener("blur", reset)
      document.removeEventListener("visibilitychange", reset)
      preference.removeEventListener("change", reset)
    }
  }, [segments])

  const render = (segment: Segment, key: number): ReactNode => {
    if (!("text" in segment)) {
      // Keep photo/website links as native text so their underline remains continuous.
      if (segment.tag === "a" && segment.props.className?.includes("photo-link")) {
        const plain = (items: Segment[]): string => items.map(item => "text" in item ? item.text : plain(item.children)).join("")
        return createElement("a", { ...segment.props, key }, plain(segment.children))
      }
      return createElement(segment.tag, { ...segment.props, key }, segment.tag === "br" ? undefined : segment.children.map(render))
    }
    let index = segment.start
    return <span key={key}><span className="sr-only">{segment.text}</span><span aria-hidden="true">{segment.text.split(/(\s+)/).map((word, wordIndex) => {
      if (/^\s+$/.test(word)) { index += Array.from(word).length; return word }
      return <span className="shimmer-word" key={wordIndex}>{Array.from(word).map(letter => {
        const position = index++
        return <span className="shimmer-cell" data-glyph={position} key={position}><span className="shimmer-original">{letter}</span><span className="shimmer-glyph">{glyphs[position] || letter}</span></span>
      })}</span>
    })}</span></span>
  }
  return segments ? <span ref={root}>{segments.map(render)}</span> : <span ref={root} dangerouslySetInnerHTML={{ __html: html }} />
}
