"use client"

import { useState, type CSSProperties } from "react"
import { ArrowUpRight, MousePointer2 } from "lucide-react"
import { investments, sourced } from "@/lib/investments"
import { reading } from "@/lib/reading"
import { writingPosts } from "@/lib/writing"

// Seven-row pixel lettering, laid out column-first like a contribution graph.
const glyphs: Record<string, string[]> = {
  S: ["11111", "10000", "10000", "11111", "00001", "00001", "11111"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  B: ["11111", "10001", "10001", "11111", "10001", "10001", "11111"],
  A: ["11111", "10001", "10001", "11111", "10001", "10001", "10001"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
}
const nameRows = Array.from({ length: 7 }, (_, row) =>
  [..."SEBASTIAN"].map(letter => glyphs[letter][row]).join("0"),
)
const nameColumns = Array.from({ length: nameRows[0].length }, (_, column) =>
  Array.from({ length: 7 }, (_, row) => {
    const letter = nameRows[row][column] === "1"
    // Stable decorative activity; these squares are navigation, not GitHub statistics.
    const seed = ((column + 3) * 2654435761 ^ (row + 7) * 1597334677) >>> 0
    const variation = (seed % 1000) / 1000
    const weekSeed = Math.imul(column + 17, 1597334677) >>> 0
    const weekActivity = (weekSeed % 100) / 100
    const cluster = (Math.sin(column * .31) + Math.cos(column * .13 + 1.7) + 2) / 4
    const quiet = variation < .12 + (1 - cluster) * .22
    const level = quiet ? 0 : Math.min(4, 1 + Math.floor((variation * .45 + weekActivity * .25 + cluster * .3) * 4))
    // Shared shades and occasional gaps keep the lettering inside the activity.
    const shades = ["0", "0.12", "0.29", "0.48", "0.67"]
    const ink = ["0.48", "0.65", "0.82", "0.95"]
    return letter ? ink[seed % 4] : shades[level]

  }),
)
const sectionColumns = [nameColumns.slice(0, 11), nameColumns.slice(11, 22), nameColumns.slice(22, 33), nameColumns.slice(33, 43), nameColumns.slice(43)]

function ExternalRow({ title, detail, href }: { title: string; detail?: string; href?: string }) {
  const content = <><span><span className="block text-foreground">{title}</span>{detail && <span className="mt-1 block text-sm text-muted">{detail}</span>}</span>{href && <ArrowUpRight className="size-4 shrink-0 text-faint" />}</>
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className="collection-row">{content}</a> : <div className="collection-row">{content}</div>
}

export function HomeCollections() {
  const [active, setActive] = useState<number | null>(null)
  const collections = [
    { title: "Bio", description: "A little about me", content: null },
    { title: "Investing", description: `${investments.length} investments · ${sourced.length} sourced`, content: <>
      <h3 className="collection-label">Investor</h3>
      {investments.map(item => <ExternalRow key={item.company} title={item.company} detail={[item.stage, item.date, item.note].filter(Boolean).join(" · ")} href={item.href} />)}
      <h3 className="collection-label mt-7">Sourced · a16z Speedrun</h3>
      {sourced.map(item => <ExternalRow key={item.company} title={item.company} detail={item.date} href={item.href} />)}
    </> },
    { title: "Reading", description: `${reading.length} essays & ideas`, content: <>{reading.map(item => <ExternalRow key={item.title} title={item.title} detail={[item.author, item.kind].filter(Boolean).join(" · ")} href={item.href} />)}</> },
    { title: "Writing", description: `${writingPosts.length} ${writingPosts.length === 1 ? "essay" : "essays"} · The Stanford Review`, content: <>{writingPosts.map(post => post.href ? <ExternalRow key={post.slug} title={post.title} detail={`${post.publication} · ${post.date}`} href={post.href} /> : <article key={post.slug} className="space-y-5 text-base leading-7 text-body-text"><h3 className="text-foreground">{post.title}</h3>{post.blocks.map((block, i) => typeof block === "string" ? <p key={i}>{block}</p> : <ul key={i} className="list-disc space-y-2 pl-5">{block.items.map(item => <li key={item}>{item}</li>)}</ul>)}</article>)}</> },
    { title: "Projects", description: "Things I’m building", content: <ExternalRow title="Formenos" detail="AI-native L/S equity hedge fund" href="https://formenos.ai/" /> },
  ]
  return <div className="contribution-chart inline-collections" data-expanded={active !== null}>
    <div className="wave-navigation" role="group" aria-label="SEBASTIAN — explore bio, investing, reading, writing, and projects">
      {collections.map((item, index) => <button key={item.title} type="button" className="wave-group" style={{ flex: sectionColumns[index].length }} aria-label={item.title} aria-expanded={index === 0 ? active === null : active === index} aria-controls={`collection-panel-${index}`} onClick={() => setActive(index === 0 || active === index ? null : index)}>
        <span className="wave-preview" aria-hidden="true">
          <span className="block px-3 pt-2.5 pb-2"><span className="block font-medium text-foreground">{item.title}</span></span>
          <span className="flex items-center justify-between border-t border-border px-3 py-2 text-muted">{active === index ? "Click to collapse" : "Click to explore"}<MousePointer2 className="size-4" /></span>
        </span>
        <span className="wave-bars" aria-hidden="true">{sectionColumns[index].flatMap((column, x) => column.map((opacity, y) => <span key={`${x}-${y}`} style={{
          "--opacity": opacity,
          "--reveal": nameRows[y][[0, 11, 22, 33, 43][index] + x] === "1"
            ? (0.62 + ((x * 13 + y * 7 + index * 11) % 35) / 100).toFixed(2)
            : (0.10 + Number(opacity) * 0.5).toFixed(2),
          "--wave-delay": `${(([0, 11, 22, 33, 43][index] + x) * .07 + y * .008).toFixed(3)}s`,
        } as CSSProperties} />))}</span>
      </button>)}
    </div>
    {collections.map((item, index) => <section key={item.title} id={`collection-panel-${index}`} hidden={active !== index} aria-label={item.title} className="inline-collection-panel">
      <div>{item.content}</div>
    </section>)}
  </div>
}
