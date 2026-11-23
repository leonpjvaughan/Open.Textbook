import fs from "node:fs";
import path from "node:path";
export function pageRoutes(siteDir) {
    const root = path.resolve(siteDir);
    const routes = [];
    const walk = (dir) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory())
                walk(full);
            else if (entry.name === "index.html") {
                const rel = path.relative(root, path.dirname(full));
                routes.push(rel ? `/${rel.split(path.sep).join("/")}/` : "/");
            }
        }
    };
    walk(root);
    return routes.sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));
}
export function routeFile(siteDir, route) {
    if (!route.startsWith("/"))
        return null;
    const root = path.resolve(siteDir);
    let rel = decodeURIComponent(route);
    if (rel.endsWith("/"))
        rel += "index.html";
    const file = path.join(root, rel);
    if (!file.startsWith(root + path.sep))
        return null;
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory())
        return null;
    return file;
}
export function bookRoot(siteDir, route) {
    const root = path.resolve(siteDir);
    let dir = route.replace(/\/$/, "") || "/";
    for (;;) {
        if (fs.existsSync(path.join(root, dir, "assets", "figures", "figures.js")))
            return dir;
        if (dir === "/" || dir === ".")
            return "/";
        dir = path.posix.dirname(dir);
    }
}
export function firstRoute(siteDir, kind) {
    const routes = pageRoutes(siteDir);
    if (kind === undefined)
        return routes[0] ?? null;
    return routes.find((route) => route.endsWith(`/${kind}/`)) ?? null;
}
export function firstFigureRoute(siteDir, kind = "learn") {
    for (const route of pageRoutes(siteDir)) {
        if (!route.endsWith(`/${kind}/`))
            continue;
        if (figureAssets(siteDir, route))
            return route;
    }
    return null;
}
const KINDS = ["learn", "practise"];
/**
 * One page of each kind from every book in the build, and the front page.
 *
 * A single book's route cannot answer "does this book work on a phone" for the
 * others, and a book that publishes no learn page is still a book: it
 * contributes its first page rather than nothing, so every book in the build is
 * measured and the report says which ones those were.
 */
export function sampleRoutes(siteDir) {
    const routes = pageRoutes(siteDir);
    const books = new Map();
    for (const route of routes) {
        // The front page is the collection's, not a book's: it is measured once below.
        if (route === "/")
            continue;
        const book = bookRoot(siteDir, route);
        books.set(book, [...(books.get(book) ?? []), route]);
    }
    const sampled = [];
    if (routes.includes("/"))
        sampled.push({ name: "the front page", route: "/" });
    for (const [book, pages] of [...books].sort(([a], [b]) => a.localeCompare(b))) {
        const label = book === "/" ? "the site" : book.slice(1).replace(/\//g, " ");
        let taken = 0;
        for (const kind of KINDS) {
            const route = pages.find((r) => r.endsWith(`/${kind}/`));
            if (!route)
                continue;
            taken += 1;
            sampled.push({ name: `${label} ${kind}`, route });
        }
        if (taken === 0 && pages[0])
            sampled.push({ name: label, route: pages[0] });
    }
    return sampled;
}
export function figureAssets(siteDir, route) {
    const file = routeFile(siteDir, route);
    if (!file)
        return null;
    const html = fs.readFileSync(file, "utf8");
    const match = /<script[^>]*\bsrc="((?:[^"]*\/)?figures\.js)"/.exec(html);
    if (!match)
        return null;
    const loader = new URL(match[1], `http://site.local${route}`).pathname;
    const dir = path.posix.dirname(loader);
    const kit = path.posix.join(dir, "kit.js");
    const root = path.resolve(siteDir);
    if (!fs.existsSync(path.join(root, loader)) || !fs.existsSync(path.join(root, kit)))
        return null;
    return { dir, loader, kit };
}
/**
 * The first page in the build that mounts a figure, and the assets it mounts.
 *
 * `kit` checks the kit's DOM contract through a real page, so it needs a page
 * with a figure on it. Which book that page is in is the build's answer, not a
 * name in this repository's source.
 */
export function figurePage(siteDir) {
    for (const route of pageRoutes(siteDir)) {
        const assets = figureAssets(siteDir, route);
        if (assets)
            return { route, ...assets };
    }
    return null;
}
