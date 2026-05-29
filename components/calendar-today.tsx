import type { CalendarEvent } from "@/lib/calendar"
import { formatEventTime } from "@/lib/calendar"

export function CalendarToday({
  events,
  heading,
  timeZone,
}: {
  events: CalendarEvent[]
  heading: string
  timeZone: string
}) {
  return (
    <div className="space-y-6">
      <p className="text-muted">{heading}</p>

      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="shrink-0 text-sm text-muted tabular-nums whitespace-nowrap">
                {formatEventTime(event, timeZone)}
              </span>
              <span className="text-foreground">{event.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Nothing on the calendar today.</p>
      )}
    </div>
  )
}
