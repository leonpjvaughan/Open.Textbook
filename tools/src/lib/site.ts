/*
 * Finding the figures in a built site.
 *
 * Two commands need this now — the figure audit and the readout check — and both need
 * it derived from the build rather than from a map a caller writes, so the audit cannot
 * be pointed at a stale map and silently measure last week's build.
 */
import fs from "node:fs";
import path from "node:path";

/** Every figure slug in a built site, with the routes it appears on, sorted. */
export function discoverFigures(siteDir: string): Record<string, string[]> {
  const root = path.resolve(siteDir);
  const pages: Record<string, Set<string>> = {};
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(".html")) {
        const html = fs.readFileSync(full, "utf8");
        if (!html.includes("data-figure=")) continue;
        const rel = path.relative(root, full);
        const url = full.endsWith("index.html")
          ? "/" + path.dirname(rel).split(path.sep).join("/") + "/"
          : "/" + rel.split(path.sep).join("/");
        for (const m of html.matchAll(/data-figure="([^"]+)"/g)) {
          (pages[m[1]] = pages[m[1]] || new Set()).add(url);
        }
      }
    }
  };
  walk(root);
  const out: Record<string, string[]> = {};
  for (const slug of Object.keys(pages)) out[slug] = [...pages[slug]].sort();
  return out;
}
