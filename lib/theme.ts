/** the colour behind the notch / status bar: black in dark, white in light */
export const themeColors = { dark: "#000000", light: "#ffffff" }

/**
 * Replaces the `theme-color` meta rather than editing it. Two reasons: Safari
 * frequently ignores a `content` change on an existing tag and keeps painting
 * the status bar the old colour, and the tag itself may be missing — it is
 * created imperatively at parse time, so nothing guarantees it survived
 * hydration. Removing every copy first also stops duplicates piling up.
 */
export function setThemeColor(dark: boolean) {
  document.querySelectorAll('meta[name="theme-color"]').forEach((tag) => tag.remove())

  const meta = document.createElement("meta")
  meta.setAttribute("name", "theme-color")
  meta.setAttribute("content", dark ? themeColors.dark : themeColors.light)
  document.head.appendChild(meta)
}

/** keeps the <html> class, the saved preference, and the status bar in sync */
export function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark)
  setThemeColor(dark)
  try {
    localStorage.setItem("theme", dark ? "dark" : "light")
  } catch {}
}
