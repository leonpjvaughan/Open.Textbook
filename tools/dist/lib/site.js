import fs from "node:fs";
import path from "node:path";
export function discoverFigures(siteDir) {
    const root = path.resolve(siteDir);
    const pages = {};
    const walk = (dir) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(full);
            }
            else if (entry.name.endsWith(".html")) {
                const html = fs.readFileSync(full, "utf8");
                if (!html.includes("data-figure="))
                    continue;
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
    const out = {};
    for (const slug of Object.keys(pages))
        out[slug] = [...pages[slug]].sort();
    return out;
}
