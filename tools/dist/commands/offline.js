import fs from "node:fs";
import path from "node:path";
import { launchBrowser, openContext, serveHttp } from "../lib/browser.js";
import { parseArgs } from "../lib/flags.js";
import { Report } from "../lib/report.js";
import { figureAssets, firstFigureRoute, firstRoute, routeFile } from "../lib/routes.js";
export const SURFACE = {
    positional: [{ name: "siteDir", help: "the built site to read offline", required: false }],
    flags: {
        route: {
            kind: "string",
            help: "the book page to read; it must exist in the build (default: the first learn page that mounts a figure)",
            value: "<path>",
        },
        download: {
            kind: "boolean",
            help: "press the reader's Download this book button and read a page it kept",
        },
    },
};
const STABLE = /(?:figures|kit)\.js$/;
const ADDRESSED = /\.[0-9a-f]{8}\.(?:css|js|svg|png|jpe?g|webp|wasm)$/;
export async function run(argv) {
    const { positional, values } = parseArgs(argv, SURFACE);
    const root = path.resolve(positional[0] ?? "site");
    if (!fs.existsSync(root))
        throw new Error(`no build at ${root}; build the site first`);
    const route = String(values.route ?? firstFigureRoute(root) ?? firstRoute(root, "learn") ?? "/");
    if (!routeFile(root, route))
        throw new Error(`no page at ${route} in ${root}; nothing was read`);
    const loader = figureAssets(root, route)?.loader ?? null;
    const report = new Report("offline");
    const server = await serveHttp(root);
    const browser = await launchBrowser();
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
        const status = (await page.reload({ waitUntil: "load" }))?.status() ?? 0;
        report.examined += 1;
        if (status !== 200)
            report.error(route, `the first visit answered ${status}`);
        const wanted = await page.evaluate(async (loaderUrl) => {
            const links = [...document.querySelectorAll('link[rel="stylesheet"]')].map((link) => new URL(link.href).pathname);
            const targets = loaderUrl ? [...links, loaderUrl] : links;
            for (const url of targets)
                await fetch(url).catch(() => undefined);
            return links;
        }, loader);
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
        if (!loader || !runtime.includes(loader)) {
            report.error(route, "the figure loader did not reach the runtime cache");
        }
        if (site.some((url) => STABLE.test(url)) || (loader && site.includes(loader))) {
            report.error(route, "a stable-named file is in the site cache, where a deploy cannot clear it");
        }
        const seeded = await page.evaluate(async (name) => {
            const cache = await caches.open(name);
            const day = 24 * 60 * 60 * 1000;
            const stamp = (age) => new Date(Date.now() - age).toUTCString();
            await cache.put("/__seeded-old.css", new Response("old", { headers: { "content-type": "text/css", date: stamp(200 * day) } }));
            await cache.put("/__seeded-fresh.css", new Response("fresh", { headers: { "content-type": "text/css", date: stamp(day) } }));
            const keys = await cache.keys();
            return keys.map((request) => new URL(request.url).pathname);
        }, siteName ?? "open-textbook-site");
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
        await checkChapter(page, context, server.origin, route, report);
        await context.setOffline(false);
        await page.goto(server.origin + route, { waitUntil: "load" });
        if (values.download === true) {
            await checkDownload(page, context, server.origin, route, report);
            await context.setOffline(false);
            await page.goto(server.origin + route, { waitUntil: "load" });
        }
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
export async function checkChapter(page, context, origin, route, report, timeoutMs = 20000) {
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
