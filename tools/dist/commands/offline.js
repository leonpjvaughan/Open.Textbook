/*
 * Read a book with the network off, after the deploy that would have taken it away.
 *
 * This is the check the two caches exist for, and the only one that can perform it:
 * whether a downloaded book survives a new build is a question about a *browser*, a
 * service worker, and a socket. Source-level tests pin the strategy; this drives it.
 *
 * The sequence is the reader's, and each step is one the site must survive:
 *
 *   1. visit a page, so the worker installs and takes control;
 *   2. read it again through the worker, and touch the assets a page needs — a
 *      stylesheet (addressed) and the figure loader (stable-named);
 *   3. delete the **runtime** cache, which is exactly what `activate` does on a
 *      deploy, and leave the site cache alone;
 *   4. go offline and navigate again.
 *
 * A pass is: the page is 200, its prose is there, and every stylesheet the page links
 * still resolves. A failure names the step, because "offline reading is broken" is not
 * something anyone can act on.
 *
 * It is shelled out to by `tests/test_offline_browser.py`, which is marked `browser`
 * and therefore deselected by default — the same arrangement as the figure sweep.
 */
import fs from "node:fs";
import path from "node:path";
import { launchBrowser, openContext, serveHttp } from "../lib/browser.js";
import { parseArgs } from "../lib/flags.js";
import { Report } from "../lib/report.js";
/** What this command accepts. `tools help offline` is generated from it. */
export const SURFACE = {
    positional: [{ name: "siteDir", help: "the built site to read offline", required: false }],
    flags: {
        route: {
            kind: "string",
            help: "the book page to read; it must exist in the build",
            default: "/gcse-maths/higher/chapter-1/section-1.1/learn/",
            value: "<path>",
        },
        download: {
            kind: "boolean",
            help: "press the reader's Download this book button and read a page it kept",
        },
    },
};
/** A stable-named file that must land in the runtime cache. */
const STABLE = /(?:figures|kit)\.js$/;
/** An addressed file: `<stem>.<8 hex>.<ext>`, the shape `scaffold.addressed_name` writes. */
const ADDRESSED = /\.[0-9a-f]{8}\.(?:css|js|svg|png|jpe?g|webp|wasm)$/;
export async function run(argv) {
    const { positional, values } = parseArgs(argv, SURFACE);
    const root = path.resolve(positional[0] ?? "site");
    const route = String(values.route ?? SURFACE.flags.route.default);
    if (!fs.existsSync(root))
        throw new Error(`no build at ${root}; build the site first`);
    const report = new Report("offline");
    const server = await serveHttp(root);
    const browser = await launchBrowser();
    // A fresh profile every run: a cache left by a previous run would answer questions
    // about that run.
    const context = await openContext(browser, { width: 1100, height: 900, deviceScaleFactor: 1 });
    const page = await context.newPage();
    try {
        await page.goto(server.origin + route, { waitUntil: "load" });
        await page.evaluate(async () => {
            await navigator.serviceWorker.ready;
            if (!navigator.serviceWorker.controller) {
                await new Promise((resolve) => navigator.serviceWorker.addEventListener("controllerchange", () => resolve(), { once: true }));
            }
        });
        // Again, so this navigation is the worker's rather than the browser's.
        const status = (await page.reload({ waitUntil: "load" }))?.status() ?? 0;
        report.examined += 1;
        if (status !== 200)
            report.error(route, `the first visit answered ${status}`);
        // What the page itself asks for: the addressed sheets it links, and the loader it
        // imports. Fetched from the page, so the worker — not the HTTP cache — answers.
        const wanted = await page.evaluate(async (target) => {
            const links = [...document.querySelectorAll('link[rel="stylesheet"]')].map((link) => new URL(link.href).pathname);
            const loader = target + "assets/figures/figures.js";
            for (const url of [...links, loader])
                await fetch(url).catch(() => undefined);
            return links;
        }, route.replace(/[^/]*$/, ""));
        const before = await cacheContents(page);
        const siteName = Object.keys(before).find((name) => name.endsWith("-site"));
        const runtimeName = Object.keys(before).find((name) => name.includes("runtime-"));
        if (!siteName)
            report.error(route, "no open-textbook-site cache; nothing will survive a deploy");
        if (!runtimeName)
            report.error(route, "no open-textbook-runtime-<build> cache");
        const site = before[siteName ?? ""] ?? [];
        const runtime = before[runtimeName ?? ""] ?? [];
        const addressedInSite = site.filter((url) => ADDRESSED.test(url));
        if (!addressedInSite.length) {
            report.error(route, "no content-addressed asset reached the site cache");
        }
        const stableInRuntime = runtime.filter((url) => STABLE.test(url));
        if (!stableInRuntime.length) {
            report.error(route, "the figure loader did not reach the runtime cache");
        }
        if (site.some((url) => STABLE.test(url))) {
            report.error(route, "a stable-named file is in the site cache, where a deploy cannot clear it");
        }
        // A cache no deploy clears has to bound itself, and the bound is the age prune
        // in `activate`. Nothing else exercises it — the failure is silent, because a
        // cache that never shrinks still answers every request correctly.
        //
        // Seeded here and pruned by a real activation: the registration is dropped and
        // the page reloaded, which runs install and `activate` again. Unregistering does
        // not touch Cache Storage, so the entries are there to be judged.
        const seeded = await page.evaluate(async (name) => {
            const cache = await caches.open(name);
            const day = 24 * 60 * 60 * 1000;
            const stamp = (age) => new Date(Date.now() - age).toUTCString();
            await cache.put("/__seeded-old.css", new Response("old", { headers: { "content-type": "text/css", date: stamp(200 * day) } }));
            await cache.put("/__seeded-fresh.css", new Response("fresh", { headers: { "content-type": "text/css", date: stamp(day) } }));
            const keys = await cache.keys();
            return keys.map((request) => new URL(request.url).pathname);
        }, siteName ?? "open-textbook-site");
        // A `Date` the Cache API refuses to store would make the prune untestable and the
        // cache unbounded, so the seed is checked before the prune is.
        if (!seeded.includes("/__seeded-old.css")) {
            report.error(siteName ?? "site cache", "the cache would not store a seeded response");
        }
        await page.evaluate(async () => {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration)
                await registration.unregister();
        });
        await page.reload({ waitUntil: "load" });
        await page.evaluate(async () => {
            await navigator.serviceWorker.ready;
            if (!navigator.serviceWorker.controller) {
                await new Promise((resolve) => navigator.serviceWorker.addEventListener("controllerchange", () => resolve(), { once: true }));
            }
        });
        const pruned = await page.evaluate(async (name) => {
            const cache = await caches.open(name);
            const keys = await cache.keys();
            return keys.map((request) => new URL(request.url).pathname);
        }, siteName ?? "open-textbook-site");
        report.examined += 1;
        if (pruned.includes("/__seeded-old.css")) {
            report.error(siteName ?? "site cache", "an entry dated 200 days ago survived activation");
        }
        if (!pruned.includes("/__seeded-fresh.css")) {
            report.error(siteName ?? "site cache", "activation deleted an entry dated today");
        }
        if (!pruned.some((url) => ADDRESSED.test(url))) {
            report.error(siteName ?? "site cache", "activation deleted the book's own addressed assets");
        }
        // The chapter the reader is in, kept while they read it. Checked before the
        // deploy simulation, because a prefetch needs a network to prefetch from.
        await checkChapter(page, context, server.origin, route, report);
        // Back online: the chapter check ends offline, and both legs after this one need
        // a network — the download to fetch with, the deploy half to have something to
        // empty.
        await context.setOffline(false);
        await page.goto(server.origin + route, { waitUntil: "load" });
        // The whole book, when the reader asks for it. This is the same button a person
        // presses, driven in the same page, so the thing checked is the thing shipped.
        if (values.download === true) {
            await checkDownload(page, context, server.origin, route, report);
            await context.setOffline(false);
            await page.goto(server.origin + route, { waitUntil: "load" });
        }
        // The deploy: the runtime cache goes, the site cache stays.
        if (runtimeName)
            await page.evaluate((name) => caches.delete(name), runtimeName);
        await context.setOffline(true);
        const offline = await page.goto(server.origin + route, { waitUntil: "load" });
        report.examined += 1;
        const offlineStatus = offline?.status() ?? 0;
        if (offlineStatus !== 200)
            report.error(route, `offline navigation answered ${offlineStatus}`);
        const after = await page.evaluate(async (links) => {
            const text = document.body.textContent ?? "";
            const sheets = [];
            for (const url of links) {
                const cached = await caches.match(url);
                if (!cached)
                    sheets.push(url);
            }
            const figure = document.querySelector("maths-figure[data-figure]");
            return {
                prose: text.trim().length,
                heading: document.querySelector("h1")?.textContent?.trim() ?? "",
                missingSheets: sheets,
                figureSlug: figure ? figure.dataset.figure : "",
                figureText: figure ? (figure.textContent ?? "") : "",
            };
        }, wanted);
        report.examined += 1;
        if (after.prose < 400)
            report.error(route, `offline page carries ${after.prose} characters of text`);
        if (!after.heading)
            report.error(route, "offline page has no heading");
        for (const url of after.missingSheets) {
            report.error(route, `offline page links a stylesheet the cache does not hold: ${url}`);
        }
        if (after.figureSlug && /failed to load/i.test(after.figureText)) {
            report.error(route, `the figure ${after.figureSlug} did not mount offline`);
        }
        report.print("cache checks");
        return report.exitCode();
    }
    finally {
        await browser.close();
        server.close();
    }
}
/** Every cache and the URLs in it, read from the page's own origin. */
async function cacheContents(page) {
    return page.evaluate(async () => {
        const out = {};
        for (const name of await caches.keys()) {
            const cache = await caches.open(name);
            out[name] = (await cache.keys()).map((request) => new URL(request.url).pathname);
        }
        return out;
    });
}
/*
 * The second half of the command, and the reason it is one command: "does the chapter
 * the reader is in read offline?" is the same question as "does the page?" one level
 * up, and both are answered by driving the same session.
 *
 * A chapter is prefetched by `assets/offline/offline.js` from the sidebar's open
 * chapter. This waits for it to land, then goes offline and reads a *sibling* page —
 * one the reader never opened — and checks the things that make a page read: the
 * status, the prose, and the figure on it mounting from its addressed module.
 */
export async function checkChapter(page, context, origin, route, report, timeoutMs = 20000) {
    // The prefetch is sequential and asynchronous: a page reaches the cache before the
    // modules it mounts do. So wait for the cache to go quiet, not for the first hit —
    // otherwise the check takes the network away mid-prefetch and reports a page that
    // was kept without its figure.
    const started = Date.now();
    const chapterPrefix = route.slice(0, route.indexOf("/", route.indexOf("/chapter-") + 1) + 1);
    let chapter = [];
    let previous = -1;
    let quiet = 0;
    while (Date.now() - started < timeoutMs) {
        const urls = await cacheContents(page);
        const site = Object.entries(urls).find(([name]) => name.endsWith("-site"))?.[1] ?? [];
        chapter = site.filter((url) => url.endsWith("/") && url.startsWith(chapterPrefix) && url !== route);
        quiet = site.length === previous ? quiet + 1 : 0;
        previous = site.length;
        if (chapter.length && quiet >= 3)
            break;
        await page.waitForTimeout(250);
    }
    report.examined += 1;
    if (!chapter.length) {
        report.error(route, "no page of the chapter was kept; the prefetch did not run or did not reach the cache");
        return [];
    }
    await context.setOffline(true);
    const sibling = chapter[0];
    const response = await page.goto(origin + sibling, { waitUntil: "load" });
    report.examined += 1;
    if ((response?.status() ?? 0) !== 200) {
        report.error(sibling, `a kept page answered ${response?.status() ?? 0} offline`);
    }
    const read = await page.evaluate(async () => {
        const figure = document.querySelector("maths-figure[data-figure-src]");
        const file = figure ? figure.dataset.figureSrc : "";
        // A module sits beside the loader, and this script sits beside both, so the
        // running page's own URL is what resolves the filename — not the page route,
        // which is two directories deeper.
        const self = document.querySelector('script[src*="assets/offline/"]');
        const figures = self ? new URL("../figures/", self.src).href : "";
        return {
            prose: (document.body.textContent ?? "").trim().length,
            heading: document.querySelector("h1")?.textContent?.trim() ?? "",
            figureFile: file,
            figureMounted: figure ? !/failed to load/i.test(figure.textContent ?? "") && !!figure.querySelector("*") : false,
            figureCached: file && figures ? Boolean(await caches.match(new URL(file, figures).pathname)) : true,
        };
    });
    if (read.prose < 400)
        report.error(sibling, `offline page carries ${read.prose} characters`);
    if (!read.heading)
        report.error(sibling, "offline page has no heading");
    if (read.figureFile && !read.figureCached) {
        report.error(sibling, `the figure ${read.figureFile} was not kept with the page`);
    }
    return chapter;
}
/*
 * "Download this book", pressed by a reader and then read with the network off.
 *
 * The button is inside the Settings dialog and hidden until the manifest has been
 * read, so this opens the panel, waits for the label (which carries the measured
 * size), presses it, and waits for the cache to stop growing. Then it takes the
 * network away and reads a page from a **later chapter** — one nothing has visited
 * and nothing prefetched, so the only thing that can answer is the download.
 */
export async function checkDownload(page, context, origin, route, report, timeoutMs = 240000) {
    await page.evaluate(() => {
        const dialog = document.getElementById("tb-settings-dialog");
        if (dialog && !dialog.open)
            dialog.showModal();
    });
    // The label is the size, and it only appears once the manifest has been fetched.
    const label = await page
        .waitForFunction(() => {
        const button = document.getElementById("tb-offline-download");
        return button && !button.hidden ? button.textContent || "" : "";
    }, undefined, { timeout: 10000 })
        .then((handle) => handle.jsonValue())
        .catch(() => "");
    report.examined += 1;
    if (!/\d/.test(String(label))) {
        report.error(route, "the download control never stated a size");
        return;
    }
    // A stop must leave the reader where they were: what arrived stays stored, the
    // page they are on still reads, and the control goes back to offering the download.
    await page.click("#tb-offline-download");
    await page.waitForFunction(() => {
        const bar = document.getElementById("tb-offline-progress");
        return bar ? !bar.hidden && bar.value > 0 : false;
    }, undefined, { timeout: 20000 });
    await page.click("#tb-offline-cancel");
    const stopped = await page.evaluate(() => ({
        status: document.getElementById("tb-offline-status")?.textContent ?? "",
        offering: !document.getElementById("tb-offline-download")?.hidden,
    }));
    report.examined += 1;
    if (!/Stopped/i.test(stopped.status) || !stopped.offering) {
        report.error(route, `stopping the download did not settle: ${JSON.stringify(stopped)}`);
    }
    // A stop must leave the reader where they were: what arrived stays stored, the
    // page they are on still reads, and the control goes back to offering the download.
    await page.click("#tb-offline-download");
    await page.waitForFunction(() => {
        const bar = document.getElementById("tb-offline-progress");
        return bar ? !bar.hidden && bar.value > 0 : false;
    }, undefined, { timeout: 30000 });
    await page.click("#tb-offline-cancel");
    const halted = await page.evaluate(() => ({
        status: document.getElementById("tb-offline-status")?.textContent ?? "",
        offering: !document.getElementById("tb-offline-download")?.hidden,
    }));
    report.examined += 1;
    if (!/Stopped/i.test(halted.status) || !halted.offering) {
        report.error(route, `stopping the download did not settle: ${JSON.stringify(halted)}`);
    }
    const before = await cacheContents(page);
    const siteBefore = Object.entries(before).find(([name]) => name.endsWith("-site"))?.[1] ?? [];
    await page.click("#tb-offline-download");
    // Wait for it to start, then for it to stop. Quiescence alone is not enough: the
    // cache is already still in the moment between the click and the first fetch, so a
    // quiet-only wait reports a download that never began.
    const started = Date.now();
    let previous = siteBefore.length;
    let quiet = 0;
    let running = false;
    while (Date.now() - started < timeoutMs) {
        const now = await cacheContents(page);
        const site = Object.entries(now).find(([name]) => name.endsWith("-site"))?.[1] ?? [];
        if (!running && site.length > siteBefore.length + 3)
            running = true;
        quiet = site.length === previous ? quiet + 1 : 0;
        previous = site.length;
        if (running && quiet >= 8)
            break;
        await page.waitForTimeout(250);
    }
    const after = await cacheContents(page);
    const site = Object.entries(after).find(([name]) => name.endsWith("-site"))?.[1] ?? [];
    const pages = site.filter((url) => url.endsWith("/"));
    report.examined += 1;
    if (pages.length < 40) {
        report.error(route, `the download kept ${pages.length} pages, which is not a book`);
    }
    // A page from a later chapter: nothing visited it, and nothing prefetched it.
    const bookRoot = route.slice(0, route.indexOf("/chapter-"));
    const later = pages.find((url) => url.startsWith(bookRoot) && !url.includes("/chapter-1/"));
    if (!later) {
        report.error(route, "the download kept no page outside the chapter that was read");
        return;
    }
    await page.evaluate(async () => {
        for (const name of await caches.keys()) {
            if (name.includes("runtime-"))
                await caches.delete(name);
        }
    });
    await context.setOffline(true);
    const response = await page.goto(origin + later, { waitUntil: "load" });
    report.examined += 1;
    if ((response?.status() ?? 0) !== 200) {
        report.error(later, `a downloaded page answered ${response?.status() ?? 0} offline`);
    }
    const read = await page.evaluate(async () => {
        const figure = document.querySelector("maths-figure[data-figure-src]");
        const file = figure ? figure.dataset.figureSrc : "";
        const self = document.querySelector('script[src*="assets/offline/"]');
        const figures = self ? new URL("../figures/", self.src).href : "";
        return {
            prose: (document.body.textContent ?? "").trim().length,
            heading: document.querySelector("h1")?.textContent?.trim() ?? "",
            figureFile: file,
            figureCached: file && figures ? Boolean(await caches.match(new URL(file, figures).pathname)) : true,
        };
    });
    if (read.prose < 400)
        report.error(later, `offline page carries ${read.prose} characters`);
    if (!read.heading)
        report.error(later, "offline page has no heading");
    if (read.figureFile && !read.figureCached) {
        report.error(later, `the figure ${read.figureFile} was not kept by the download`);
    }
}
