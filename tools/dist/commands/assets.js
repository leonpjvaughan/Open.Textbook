import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "../lib/flags.js";
import { Report } from "../lib/report.js";
export const SURFACE = {
    positional: [{ name: "siteDir", help: "the assembled site to check", required: false }],
    flags: {},
};
const ADDRESSED = /\.[0-9a-f]{8}\.[a-z0-9]+$/;
const NOT_LOCAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const TAG = /<([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
const ATTRIBUTE = /([\w-]+)\s*=\s*"([^"]*)"/g;
const NAMED = new Set(["href", "src", "data-figure-src"]);
function walk(dir, suffix) {
    const found = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory())
            found.push(...walk(full, suffix));
        else if (entry.name.endsWith(suffix))
            found.push(full);
    }
    return found;
}
function isFile(target) {
    try {
        return fs.statSync(target).isFile();
    }
    catch {
        return false;
    }
}
function exists(target) {
    return fs.existsSync(target);
}
function census() {
    const seen = new Map();
    return (target) => {
        const known = seen.get(target);
        if (known)
            return known;
        let state = "missing";
        try {
            state = fs.statSync(target).isDirectory() ? "directory" : "file";
        }
        catch {
        }
        seen.set(target, state);
        return state;
    };
}
function manifestFor(target, manifests) {
    let best;
    for (const manifest of manifests) {
        if (target !== manifest.base && !target.startsWith(manifest.base + path.sep))
            continue;
        if (!best || manifest.base.length > best.base.length)
            best = manifest;
    }
    return best;
}
function profileRoot(page) {
    for (let dir = path.dirname(page);; dir = path.dirname(dir)) {
        if (exists(path.join(dir, "assets", "manifest.json")))
            return dir;
        if (path.dirname(dir) === dir)
            return undefined;
    }
}
function references(html) {
    const found = [];
    for (const tag of html.matchAll(TAG)) {
        for (const attribute of (tag[2] ?? "").matchAll(ATTRIBUTE)) {
            const name = attribute[1] ?? "";
            if (NAMED.has(name))
                found.push({ name, value: attribute[2] ?? "" });
        }
    }
    return found;
}
function readManifests(root, report) {
    const manifests = [];
    for (const file of walk(root, "manifest.json")) {
        if (path.basename(path.dirname(file)) !== "assets")
            continue;
        const data = JSON.parse(fs.readFileSync(file, "utf8"));
        const base = path.dirname(path.dirname(file));
        const recorded = new Set();
        for (const written of Object.values(data.assets ?? {})) {
            recorded.add(path.resolve(base, written));
        }
        for (const written of Object.values(data.figures ?? {})) {
            recorded.add(path.resolve(base, "assets", "figures", written));
        }
        for (const target of recorded) {
            report.examined += 1;
            if (!isFile(target)) {
                report.error(path.relative(root, file), `records ${path.relative(root, target)}, which is not in the build`);
            }
        }
        manifests.push({ base, file, recorded });
    }
    return manifests;
}
export async function run(argv) {
    const { positional } = parseArgs(argv, SURFACE);
    const root = path.resolve(positional[0] ?? "site");
    if (!fs.existsSync(root))
        throw new Error(`no build at ${root}; build the site first`);
    const report = new Report("assets");
    const manifests = readManifests(root, report);
    if (!manifests.length) {
        report.error(".", "has no assets/manifest.json, so no content-addressed name could be confirmed");
    }
    const pages = walk(root, ".html");
    if (!pages.length)
        report.error(".", "has no HTML pages, so nothing was checked");
    const stat = census();
    for (const page of pages) {
        const where = path.relative(root, page);
        for (const { name, value } of references(fs.readFileSync(page, "utf8"))) {
            const reference = value.split("#")[0].split("?")[0].trim();
            if (!reference || NOT_LOCAL.test(reference))
                continue;
            if (name === "data-figure-src") {
                report.examined += 1;
                if (reference.includes("/") || reference.includes("\\")) {
                    report.error(where, `names the figure module "${reference}" as a path; the loader resolves a bare filename beside itself`);
                    continue;
                }
                const profile = profileRoot(page);
                const module = profile && path.join(profile, "assets", "figures", reference);
                if (!module || !isFile(module)) {
                    report.error(where, `names the figure module "${reference}", which is not in the build`);
                    continue;
                }
                const manifest = manifestFor(module, manifests);
                if (ADDRESSED.test(reference) && manifest && !manifest.recorded.has(module)) {
                    report.error(where, `names the figure module "${reference}", which no manifest records`);
                }
                continue;
            }
            if (reference.endsWith("/"))
                continue;
            const target = reference.startsWith("/")
                ? path.join(root, reference)
                : path.resolve(path.dirname(page), reference);
            if (target !== root && !target.startsWith(root + path.sep)) {
                report.error(where, `points at "${reference}", which resolves outside the build`);
                continue;
            }
            report.examined += 1;
            const state = stat(target);
            if (state === "directory")
                continue;
            const last = reference.split("/").pop() ?? "";
            if (state === "missing" && !last.includes("."))
                continue;
            if (state === "missing") {
                report.error(where, `points at "${reference}", which is not in the build`);
                continue;
            }
            const segments = path.relative(root, target).split(path.sep);
            if (!segments.includes("assets") || !ADDRESSED.test(last))
                continue;
            const manifest = manifestFor(target, manifests);
            if (!manifest) {
                report.error(where, `points at "${reference}", which no assets/manifest.json describes`);
            }
            else if (!manifest.recorded.has(target)) {
                report.error(where, `points at "${reference}", which ${path.relative(root, manifest.file)} does not record`);
            }
        }
    }
    report.print("references and manifest entries");
    return report.exitCode();
}
