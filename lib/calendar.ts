import ical, { type EventInstance, type VEvent } from "node-ical"

export type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  allDay: boolean
  location?: string
}

const timezone = () => process.env.CALENDAR_TIMEZONE ?? "America/Los_Angeles"

function summaryText(summary: VEvent["summary"]): string {
  if (!summary) return "Untitled"
  return typeof summary === "string" ? summary : summary.val
}

function cleanTitle(summary: VEvent["summary"]): string {
  const text = summaryText(summary)
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\s+/g, " ")
    .trim()
  return text || "Untitled"
}

function locationText(location: VEvent["location"]): string | undefined {
  if (!location) return undefined
  const text = typeof location === "string" ? location : location.val
  return text.trim() || undefined
}

function todayKey(timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date())
}

function dateKey(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(date)
}

function safeDate(value: VEvent["start"]): Date | null {
  if (!value) return null
  if (value instanceof Date) return value
  try {
    if (typeof ical.convertTimestamp === "function") {
      return ical.convertTimestamp(value)
    }
    return new Date(value as string | number)
  } catch {
    return null
  }
}

function spansToday(start: Date, end: Date, timeZone: string): boolean {
  const today = todayKey(timeZone)
  const startKey = dateKey(start, timeZone)
  const endKey = dateKey(end, timeZone)

  if (startKey === today || endKey === today) return true
  if (startKey < today && endKey > today) return true
  return false
}

function isToday(event: VEvent, timeZone: string): boolean {
  const start = safeDate(event.start)
  const end = safeDate(event.end)
  if (!start || !end) return false

  return spansToday(start, end, timeZone)
}

function todayBounds(timeZone: string): { from: Date; to: Date } {
  const today = todayKey(timeZone)
  const [year, month, day] = today.split("-").map(Number)

  // Pad by a day so expansion covers the full local day regardless of server TZ.
  const from = new Date(Date.UTC(year, month - 1, day - 1))
  const to = new Date(Date.UTC(year, month - 1, day + 1, 23, 59, 59, 999))

  return { from, to }
}

function toCalendarEvent(event: VEvent): CalendarEvent | null {
  const start = safeDate(event.start)
  const end = safeDate(event.end)
  if (!start || !end) return null

  const allDay = Boolean(event.datetype === "date" || event.datetype === "dateonly")

  return {
    id: event.uid ?? `${summaryText(event.summary)}-${start.toISOString()}`,
    title: cleanTitle(event.summary),
    start,
    end,
    allDay,
    location: locationText(event.location),
  }
}

function toCalendarEventFromInstance(event: VEvent, instance: EventInstance): CalendarEvent {
  return {
    id: `${event.uid}-${instance.start.toISOString()}`,
    title: cleanTitle(instance.summary ?? event.summary),
    start: instance.start,
    end: instance.end,
    allDay: instance.isFullDay,
    location: locationText(event.location),
  }
}

function formatClockTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

export function formatEventTime(event: CalendarEvent, timeZone: string): string {
  if (event.allDay) return "All day"

  const start = formatClockTime(event.start, timeZone)
  const end = formatClockTime(event.end, timeZone)

  if (start === end) return start

  return `${start} – ${end}`
}

export function formatTodayHeading(timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date())
}

function getIcsUrls(): string[] {
  const combined = [process.env.CALENDAR_ICS_URLS, process.env.CALENDAR_ICS_URL]
    .filter(Boolean)
    .join(",")

  return combined
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean)
}

async function eventsFromFeed(url: string, tz: string): Promise<CalendarEvent[]> {
  const data = await ical.async.fromURL(url, {
    requestOptions: { timeout: 15_000 },
  })

  const { from, to } = todayBounds(tz)
  const events: CalendarEvent[] = []

  for (const item of Object.values(data)) {
    if (item.type !== "VEVENT") continue

    if (item.rrule) {
      const instances = ical.expandRecurringEvent(item, { from, to, expandOngoing: true })

      for (const instance of instances) {
        if (!spansToday(instance.start, instance.end, tz)) continue
        events.push(toCalendarEventFromInstance(item, instance))
      }

      continue
    }

    if (!isToday(item, tz)) continue

    const event = toCalendarEvent(item)
    if (event) events.push(event)
  }

  return events
}

export async function getTodayEvents(): Promise<{
  events: CalendarEvent[]
  configured: boolean
  error?: "fetch_failed"
}> {
  const icsUrls = getIcsUrls()

  if (icsUrls.length === 0) {
    return { events: [], configured: false }
  }

  const tz = timezone()

  const results = await Promise.allSettled(icsUrls.map((url) => eventsFromFeed(url, tz)))

  const fulfilled = results.filter(
    (result): result is PromiseFulfilledResult<CalendarEvent[]> => result.status === "fulfilled"
  )

  if (fulfilled.length === 0) {
    return { events: [], configured: true, error: "fetch_failed" }
  }

  const seen = new Set<string>()

  const events = fulfilled
    .flatMap((result) => result.value)
    .filter((event) => {
      if (seen.has(event.id)) return false
      seen.add(event.id)
      return true
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime())

  return { events, configured: true }
}
