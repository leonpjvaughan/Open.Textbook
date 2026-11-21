/*
 * Which pages a built site actually has.
 *
 * A command that measures "a page" used to name one: `check-mobile` held a
 * gcse-maths learn route and a practise route, and `kit` held a gcse-maths book
 * root. Point either at another book's build and every request missed, so the
 * measurement reported the miss and not the book. Eleven books had never been
 * asked whether they work on a phone, and the command that would have answered
 * said nothing was wrong.
 *
 * So the page list comes from the build under test. A route is a directory with
 * an `index.html` — the URL a reader types — and a route that is not in the
 * build is an error rather than a request the static server answers with
 * something else that happens to be 980px wide.
 */
import fs from "node:fs";
import path from "node:path";
/** Every page in a built site, as the URL a reader types. Sorted, `/` first. */
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
/** The file a route names, or `null` when the build has no such page. */
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
/**
 * The book a page belongs to: the nearest ancestor that carries the figure
 * loader, `assets/figures/figures.js`. Every book root has one, whatever its
 * path shape — `gcse-maths/higher`, `a-level-maths`, `numerical-methods` — so a
 * book is recognised from its files and not from a list of its names.
 */
export function bookRoot(siteDir, route) {
    const root = path.resolve(siteDir);
    // The page's own directory first: a book's landing page *is* its root, and looking
    // only at its parent put every book's front door in the site's group.
    let dir = route.replace(/\/$/, "") || "/";
    for (;;) {
        if (fs.existsSync(path.join(root, dir, "assets", "figures", "figures.js")))
            return dir;
        if (dir === "/" || dir === ".")
            return "/";
        dir = path.posix.dirname(dir);
    }
}
/**
 * The first page of a kind that mounts a figure — `learn` when it exists — for a command
 * whose default is "a page of this build" rather than one book's page.
 */
export function firstRoute(siteDir, kind) {
    const routes = pageRoutes(siteDir);
    if (kind === undefined)
        return routes[0] ?? null;
    return routes.find((route) => route.endsWith(`/${kind}/`)) ?? null;
}
/**
 * The first page of a kind that mounts a figure, for a check about the figure loader.
 *
 * `offline` asserts that the loader a page loads reaches the service worker's runtime
 * cache, so the page it samples has to mount one. The build's first learn page is not
 * that page: `a-level-maths` chapter 1 has no figure, so sampling it made the check fail
 * on a collection where nothing was wrong — which is how this default was found, on
 * `main`, after the first release job ran.
 */
export function firstFigureRoute(siteDir, kind = "learn") {
    for (const route of pageRoutes(siteDir)) {
        if (!route.endsWith(`/${kind}/`))
            continue;
        if (figureAssets(siteDir, route))
            return route;
    }
    return null;
}
/** The page kinds a sample takes, in the order a reader meets them. */
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
        // A one-book build has its pages at the root and calls itself nothing.
        const label = book === "/" ? "the site" : book.slice(1).replace(/\//g, " ");
        let taken = 0;
        for (const kind of KINDS) {
            const route = pages.find((r) => r.endsWith(`/${kind}/`));
            if (!route)
                continue;
            taken += 1;
            sampled.push({ name: `${label} ${kind}`, route });
        }
        // A book with neither a learn nor a practise page is still a book in the
        // collection, and its first page is the only one that can answer this.
        if (taken === 0 && pages[0])
            sampled.push({ name: label, route: pages[0] });
    }
    return sampled;
}
/**
 * The figure assets a page reaches for, as URL paths, or `null` when it mounts
 * no figures.
 *
 * The page states this itself: the loader is a `src` on the page, and the kit
 * sits beside it, which is why a book root can be found without knowing anything
 * about the book. A kit that is not in the build is `null` too — the caller says
 * so, rather than a page importing a module the server answers with a 404.
 */
export function figureAssets(siteDir, route) {
    const file = routeFile(siteDir, route);
    if (!file)
        return null;
    const html = fs.readFileSync(file, "utf8");
    const match = /<script[^>]*\bsrc="([^"]*\/figures\.js)"/.exec(html);
    if (!match)
        return null;
    const loader = new URL(match[1], `http://site.local${route}`).pathname;
    const dir = path.posix.dirname(loader);
    const kit = `${dir}/kit.js`;
    const root = path.resolve(siteDir);
    if (!fs.existsSync(path.join(root, kit)))
        return null;
    return { dir, kit };
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
