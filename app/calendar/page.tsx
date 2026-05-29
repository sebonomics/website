import type { Metadata } from "next"
import { CalendarToday } from "@/components/calendar-today"
import { PageShell } from "@/components/page-shell"
import { SocialFooter } from "@/components/social-footer"
import { formatTodayHeading, getTodayEvents } from "@/lib/calendar"

export const metadata: Metadata = {
  title: "Calendar — Sebastian Tan",
  description: "What Sebastian is doing today",
}

export const dynamic = "force-dynamic"

export default async function CalendarPage() {
  const timeZone = process.env.CALENDAR_TIMEZONE ?? "America/Los_Angeles"
  const { events, configured, error } = await getTodayEvents()

  return (
    <PageShell>
      <div className="flex flex-1 flex-col justify-center space-y-10 text-[17px] leading-[1.65] sm:text-[18px]">
        <section className="space-y-6">
          {configured ? (
            <>
              {error ? (
                <p className="text-muted">
                  Could not load your calendar. Check that{" "}
                  <code className="text-foreground/80">CALENDAR_ICS_URLS</code> is correct and the feed is
                  reachable.
                </p>
              ) : (
                <CalendarToday
                  events={events}
                  heading={formatTodayHeading(timeZone)}
                  timeZone={timeZone}
                />
              )}
            </>
          ) : (
            <div className="space-y-4 text-muted">
              <p>Connect a calendar feed to show what you&apos;re up to today.</p>
              <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed">
                <li>
                  <span className="text-foreground">Google Calendar:</span> Settings → your calendar →
                  Integrate calendar → copy the <strong>Secret address in iCal format</strong>
                </li>
                <li>
                  <span className="text-foreground">Apple Calendar:</span> Calendar app → share calendar →
                  public calendar → copy the subscription URL
                </li>
                <li>
                  Add to <code className="text-foreground/80">.env.local</code>:
                  <pre className="mt-2 overflow-x-auto rounded-sm bg-border/40 p-3 text-[13px] text-foreground/90">
{`CALENDAR_ICS_URLS=https://.../basic.ics,https://.../basic.ics
CALENDAR_TIMEZONE=America/Los_Angeles`}
                  </pre>
                </li>
                <li>Restart the dev server</li>
              </ol>
              <p className="text-[15px]">
                The URL stays private on the server — it is never exposed to visitors.
              </p>
            </div>
          )}
        </section>
      </div>

      <SocialFooter />
    </PageShell>
  )
}
