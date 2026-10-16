"use client"

import { type CSSProperties, type ReactNode } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUpRight, MousePointer2, X } from "lucide-react"
import { investments, sourced } from "@/lib/investments"
import { reading } from "@/lib/reading"
import { writingPosts } from "@/lib/writing"

function Collection({ title, description, children, wave = false, index = 0 }: { title: string; description: string; children: ReactNode; wave?: boolean; index?: number }) {
  return <Dialog.Root>
    <Dialog.Trigger className={wave ? "wave-group" : "collection-trigger group"}>
      {wave ? <>
        <span className="wave-preview">
          <span className="block px-3 pt-2.5 pb-2"><span className="block font-medium text-foreground">{title}</span><span className="mt-0.5 block text-muted">{description}</span></span>
          <span className="flex items-center justify-between border-t border-border px-3 py-2 text-muted">Click to explore <MousePointer2 className="size-4" /></span>
        </span>
        <span className="wave-bars" aria-hidden="true">{Array.from({ length: 77 }, (_, i) => <span key={i} style={{ "--opacity": ["0", "0.25", "0.48", "0.72", "1"][((i * 17 + Math.floor(i / 7) * 11 + index * 23) % 31) < 13 ? 0 : ((i * 13 + index * 7) % 4) + 1], "--tilt": `${((i * 7 + index * 3) % 15) - 7}deg` } as CSSProperties} />)}</span>
        <span className="sr-only">{title}: {description}</span>
      </> : <span className="flex-1"><span className="flex items-center justify-between text-foreground">{title}</span><span className="mt-1 block text-muted">{description}</span></span>}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="collection-overlay" />
      <Dialog.Content className="collection-dialog">
        <div className="dialog-header flex items-start justify-between gap-6">
          <div><Dialog.Title className="text-base font-medium">{title}</Dialog.Title><Dialog.Description className="mt-1 text-sm leading-6 text-muted">{description}</Dialog.Description></div>
          <Dialog.Close aria-label="Close" className="rounded-md p-1.5 text-muted hover:bg-hover"><X className="size-4" /></Dialog.Close>
        </div>
        <div className="dialog-body">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}

function ExternalRow({ title, detail, href }: { title: string; detail?: string; href?: string }) {
  const content = <><span><span className="block text-foreground">{title}</span>{detail && <span className="mt-1 block text-sm text-muted">{detail}</span>}</span>{href && <ArrowUpRight className="size-4 shrink-0 text-faint" />}</>
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className="collection-row">{content}</a> : <div className="collection-row">{content}</div>
}

export function HomeCollections() {
  const collections = [
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
  return <>
    <div className="contribution-chart">
    <div className="wave-navigation" role="group" aria-label="Explore investing, reading, writing, and projects">
      {collections.map((item, index) => <Collection key={item.title} wave index={index} title={item.title} description={item.description}>{item.content}</Collection>)}
    </div>
    </div>
  </>
}
