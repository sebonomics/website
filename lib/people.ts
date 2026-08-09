export type Person = {
  name: string
  /** where they work, or what they're known for */
  company?: string
  /** short line on why they're worth knowing */
  note?: string
  href?: string
  /** favicon domain, or a local image path via `logo` */
  domain?: string
  logo?: string
  initial?: string
}

/**
 * Cool people. Add rows here and they show up on /people.
 *
 * Attio sync: this is the seam. Swap `people` for an async loader that hits
 * Attio's REST API, e.g.
 *
 *   export async function getPeople(): Promise<Person[]> {
 *     const res = await fetch(
 *       "https://api.attio.com/v2/objects/people/records/query",
 *       {
 *         method: "POST",
 *         headers: {
 *           Authorization: `Bearer ${process.env.ATTIO_API_KEY}`,
 *           "Content-Type": "application/json",
 *         },
 *         body: JSON.stringify({ limit: 100 }),
 *         next: { revalidate: 3600 },
 *       },
 *     )
 *     const { data } = await res.json()
 *     return data.map(toPerson)
 *   }
 *
 * That needs an ATTIO_API_KEY in .env.local and a mapping from your workspace's
 * attribute slugs to the fields above, since those are per-workspace.
 */
export const people: Person[] = []
