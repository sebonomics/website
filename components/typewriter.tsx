"use client"

import {
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

export type TypewriterSegment =
  | { type: "text"; text: string }
  | { type: "node"; node: ReactNode }

type QueueItem = { type: "char"; char: string } | { type: "node"; node: ReactNode }

function buildQueue(segments: TypewriterSegment[]): QueueItem[] {
  const queue: QueueItem[] = []

  for (const segment of segments) {
    if (segment.type === "text") {
      for (const char of segment.text) {
        queue.push({ type: "char", char })
      }
    } else {
      queue.push({ type: "node", node: segment.node })
    }
  }

  return queue
}

function renderQueue(queue: QueueItem[], count: number): ReactNode[] {
  const nodes: ReactNode[] = []
  let textBuffer = ""

  const flushText = () => {
    if (textBuffer) {
      nodes.push(textBuffer)
      textBuffer = ""
    }
  }

  for (let i = 0; i < count && i < queue.length; i++) {
    const item = queue[i]
    if (item.type === "char") {
      textBuffer += item.char
    } else {
      flushText()
      nodes.push(<span key={`node-${i}`}>{item.node}</span>)
    }
  }

  flushText()
  return nodes
}

function useTypewriterQueue(
  queue: QueueItem[],
  charDelayMs: number,
  startDelayMs = 0
) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion.current) {
      setCount(queue.length)
      setDone(true)
    }
  }, [queue.length])

  useEffect(() => {
    if (reducedMotion.current) return

    if (count >= queue.length) {
      setDone(true)
      return
    }

    const delay = count === 0 ? startDelayMs : charDelayMs
    const timer = window.setTimeout(() => setCount((c) => c + 1), delay)
    return () => window.clearTimeout(timer)
  }, [count, queue.length, charDelayMs, startDelayMs])

  return { count, done }
}

export function TypewriterText({
  text,
  className,
  charDelayMs = 22,
}: {
  text: string
  className?: string
  charDelayMs?: number
}) {
  const queue = useMemo(
    () => buildQueue([{ type: "text", text }]),
    [text]
  )
  const { count, done } = useTypewriterQueue(queue, charDelayMs)

  return (
    <p className={className}>
      {renderQueue(queue, count)}
      {!done ? <span className="typewriter-cursor" aria-hidden /> : null}
    </p>
  )
}

export function TypewriterRich({
  segments,
  className,
  charDelayMs = 22,
  startDelayMs = 0,
}: {
  segments: TypewriterSegment[]
  className?: string
  charDelayMs?: number
  startDelayMs?: number
}) {
  const queue = useMemo(() => buildQueue(segments), [segments])
  const { count, done } = useTypewriterQueue(queue, charDelayMs, startDelayMs)

  return (
    <p className={className}>
      {renderQueue(queue, count)}
      {!done ? <span className="typewriter-cursor" aria-hidden /> : null}
    </p>
  )
}

export function typewriterQueueLength(segments: TypewriterSegment[]): number {
  return buildQueue(segments).length
}
