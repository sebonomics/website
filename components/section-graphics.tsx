"use client"

import { useEffect, useState, type CSSProperties } from "react"

const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
})

export function LiveTimeGraphic() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [])
  const second = now?.getSeconds() ?? -1
  return <div className="live-time-graphic" aria-label="Live San Francisco clock">
    <div className="time-pixels" aria-hidden="true">
      {Array.from({ length: 60 }, (_, index) => <span key={index} data-current={index === second} style={{
        "--pixel-opacity": index <= second ? [.35, .55, .75, .95][index % 4] : .07,
      } as CSSProperties} />)}
    </div>
    <div className="time-caption"><span>San Francisco</span><time dateTime={now?.toISOString()}>{now ? timeFormat.format(now) : "—"}<span className="time-live-dot" aria-hidden="true" /></time></div>
  </div>
}
