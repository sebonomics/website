"use client"

import { useEffect, useState, type CSSProperties, type ReactNode } from "react"
import { ArrowUpRight, MousePointer2 } from "lucide-react"
import { useSectionTitle } from "@/components/section-title"
import { investments, sourced } from "@/lib/investments"
import { reading } from "@/lib/reading"
import { writingPosts } from "@/lib/writing"

// Decorative contribution-style activity, with stable clustered snapshots.
function activity(column: number, row: number, phase: number) {
  const seed = (Math.imul(column + 19 + phase * 41, 1597334677) ^ Math.imul(row + 7, 2654435761)) >>> 0
  const noise = (seed % 1000) / 1000
  const cluster = (Math.sin(column * .29 + phase * .6) + Math.cos(column * .13 - row * .35 + phase) + 2) / 4
  const weekend = row > 4 ? .18 : 0
  const level = noise < .18 + (1 - cluster) * .32 + weekend ? 0 : Math.min(4, 1 + Math.floor((noise * .45 + cluster * .55) * 4))
  return ["0.02", "0.16", "0.36", "0.62", "0.9"][level]
}
const activityColumns = Array.from({ length: 53 }, (_, column) =>
  Array.from({ length: 7 }, (_, row) => ({
    initial: activity(column, row, 0),
    next: activity(column, row, 1),
    later: activity(column, row, 2),
    delay: `${(-((column * 1.7 + row * 3.1) % 24)).toFixed(2)}s`,
    duration: `${24 + (column * 7 + row * 3) % 13}s`,
  })),
)
const sectionColumns = [activityColumns.slice(0, 11), activityColumns.slice(11, 22), activityColumns.slice(22, 33), activityColumns.slice(33, 43), activityColumns.slice(43)]

function ExternalRow({ title, detail, href }: { title: string; detail?: string; href?: string }) {
  const content = <><span><span className="block text-foreground">{title}</span>{detail && <span className="mt-1 block text-sm text-muted">{detail}</span>}</span>{href && <ArrowUpRight className="size-4 shrink-0 text-faint" />}</>
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className="collection-row">{content}</a> : <div className="collection-row">{content}</div>
}

export function HomeCollections({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<number | null>(null)
  const { setTitle } = useSectionTitle()
  useEffect(() => {
    setTitle(active === null ? "Sebastian Tan" : ["Bio", "Investing", "Reading", "Writing", "Projects"][active])
  }, [active, setTitle])
  const collections = [
    { title: "Bio", description: "A little about me", content: null },
    { title: "Investing", description: `${investments.length} investments · ${sourced.length} sourced`, content: <>
      {investments.map(item => <ExternalRow key={item.company} title={item.company} detail={[item.stage, item.date, item.note].filter(Boolean).join(" · ")} href={item.href} />)}
      {sourced.map(item => <ExternalRow key={item.company} title={item.company} detail={item.date} href={item.href} />)}
    </> },
    { title: "Reading", description: `${reading.length} essays & ideas`, content: <>{reading.map(item => <ExternalRow key={item.title} title={item.title} detail={[item.author, item.kind].filter(Boolean).join(" · ")} href={item.href} />)}</> },
    { title: "Writing", description: `${writingPosts.length} ${writingPosts.length === 1 ? "essay" : "essays"} · The Stanford Review`, content: <>{writingPosts.map(post => post.href ? <ExternalRow key={post.slug} title={post.title} detail={`${post.publication} · ${post.date}`} href={post.href} /> : <article key={post.slug} className="space-y-5 text-base leading-7 text-body-text"><h3 className="text-foreground">{post.title}</h3>{post.blocks.map((block, i) => typeof block === "string" ? <p key={i}>{block}</p> : <ul key={i} className="list-disc space-y-2 pl-5">{block.items.map(item => <li key={item}>{item}</li>)}</ul>)}</article>)}</> },
    { title: "Projects", description: "Things I’m building", content: <>
      <ExternalRow title="Formenos" detail="AI-native L/S equity hedge fund" href="https://formenos.ai/" />
      <ExternalRow title="OutsideConnection" detail="Fair-chance job-matching algorithm" href="https://solve.mit.edu/solutions/84351" />
    </> },
  ]
  return <div className="contribution-chart inline-collections" data-expanded={active !== null}>
    <div className="wave-navigation" role="img" aria-label="Animated decorative contribution activity">
      {collections.map((item, index) => <div key={item.title} className="wave-group decorative-wave" style={{ flex: sectionColumns[index].length }}>
        <span className="wave-bars" aria-hidden="true">{sectionColumns[index].flatMap((column, x) => column.map((cell, y) => <span key={`${x}-${y}`} style={{
          "--opacity": cell.initial,
          "--activity-next": cell.next,
          "--activity-later": cell.later,
          "--wave-delay": cell.delay,
          "--activity-duration": cell.duration,
        } as CSSProperties} />))}</span>
      </div>)}
    </div>
    {collections.map((item, index) => <section key={item.title} id={`collection-panel-${index}`} hidden={active !== index} aria-label={item.title} className="inline-collection-panel">
      <div>{item.content}</div>
    </section>)}
    {active === null && children}
    <nav className="section-box-nav graphic-preview" data-graphic="skyline" aria-label="Section navigation">
      {collections.map((item, index) => { return <button key={item.title} type="button" aria-label={item.title} aria-current={(active ?? 0) === index ? "page" : undefined} onClick={() => setActive(index === 0 || active === index ? null : index)} style={{ "--item": index } as CSSProperties}>
        <span className="graphic-art" aria-hidden="true">
          <i style={{ "--bar-shade": (0.22 + index * 0.195).toFixed(2) } as CSSProperties} />
        </span>
        <span className="bar-tooltip" aria-hidden="true"><span className="block px-3 py-2 font-medium text-foreground">{item.title}</span><span className="flex items-center justify-between gap-5 border-t border-border px-3 py-2 text-muted">Click to explore<MousePointer2 className="size-3.5" /></span></span>
      </button> })}
    </nav>


  </div>
}
