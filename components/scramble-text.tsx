import { BodyShimmer } from "@/components/body-shimmer"

/** Share the body's cursor-following effect while treating labels as plain text. */
export function ScrambleText({ children }: { children: string }) {
  const html = children.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!)
  return <BodyShimmer html={html} />
}
