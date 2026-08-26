/** matches --background in app/globals.css for each theme */
export const themeColors = { dark: "#191919", light: "#ffffff" }

/**
 * Keeps the three things that define the theme in sync: the <html> class, the
 * saved preference, and the `theme-color` meta — which is what iOS Safari uses
 * to tint the status bar area above the page. Without the last one the bar stays
 * on whatever the server rendered, so light mode gets a black strip up top.
 */
export function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark)
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? themeColors.dark : themeColors.light)
  try {
    localStorage.setItem("theme", dark ? "dark" : "light")
  } catch {}
}
