/*
 * Check the asset graph of a whole assembled site.
 *
 * Two checks already look at parts of this and neither can see the whole:
 * `pipeline.check_links` follows `<a href>` to a built page and nothing else, and
 * `tests/test_hashed_assets.py` checks one book profile as the build wrote it. A
 * content-addressed name cannot be derived from the source tree, so the only thing
 * that can confirm a page's link to `book.8ddcb550.css` is the manifest the build
 * wrote — and a hand-edited page, a lost asset or a manifest entry naming a file
 * nobody wrote all pass both of those. So this walks the built HTML and asks:
 *
 *   * does every file reference a page makes resolve to a file? A page route is the
 *     pipeline's job and is skipped here.
 *   * is every **content-addressed** name a page names recorded in the manifest for
 *     the directory it lives in — the book's
 *     `<book>/<profile>/assets/manifest.json`, or the portal's `assets/manifest.json`
 *     at the site root? An unaddressed name (the figure loader, the kit, the icons)
 *     is deliberately not in a manifest, and cannot be: its own bytes are the
 *     evidence, which the first question already checks.
 *   * does every entry in every manifest exist on disk? A manifest is the offline
 *     download list's seed, so an entry naming a file the build did not write is the
 *     download list lying.
 *
 * Two shapes are easy to miss. Root-absolute references (`/assets/...`, the 404's and
 * the Settings script's) belong to the portal and resolve at the **site** root, not at
 * the book profile the page sits in, so they are resolved there rather than skipped —
 * which is why a profile build on its own cannot pass this and the assembled site can.
 * And a page names its figure module in `data-figure-src`, not in `href` or `src`: the
 * loader mounts a bare filename from beside itself, so that attribute is collected
 * too. A bare filename is resolved against the page's own profile, because that is the
 * directory the loader sits in.
 */
import fs from "node:fs";
import path from "node:path";
import { parseArgs, type Surface } from "../lib/flags.js";
import { Report } from "../lib/report.js";

/** What this command accepts. `tools help assets` is generated from it. */
export const SURFACE: Surface = {
  positional: [{ name: "siteDir", help: "the assembled site to check", required: false }],
  flags: {},
};

/** A name the build wrote for its bytes: `<stem>.<8 hex>.<ext>`, as `addressed_name` does. */
const ADDRESSED = /\.[0-9a-f]{8}\.[a-z0-9]+$/;

/** An absolute URL, or a protocol-relative one: not ours to resolve. */
const NOT_LOCAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/** A tag, its attribute text, and the attributes we follow inside it. */
const TAG = /<([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
const ATTRIBUTE = /([\w-]+)\s*=\s*"([^"]*)"/g;
const NAMED = new Set(["href", "src", "data-figure-src"]);

/** One `assets/manifest.json`, and the directory whose paths it records. */
type Manifest = {
  /** The profile root, or the site root: the manifest's paths are relative to it. */
  base: string;
  /** The manifest itself, for a finding that has to name it. */
  file: string;
  /** Every file it says the build wrote, resolved. */
  recorded: Set<string>;
};

/** Every file under `dir` whose name ends with `suffix`. */
function walk(dir: string, suffix: string): string[] {
  const found: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...walk(full, suffix));
    else if (entry.name.endsWith(suffix)) found.push(full);
  }
  return found;
}

/** Is there a regular file at `target`? A directory is not a file a page can load. */
function isFile(target: string): boolean {
  try {
    return fs.statSync(target).isFile();
  } catch {
    return false;
  }
}

/** Is there anything at `target` at all — a file, or the page route a directory is? */
function exists(target: string): boolean {
  return fs.existsSync(target);
}

/** What is at a path: a page route is a directory, and an absent route is neither. */
type Stat = "file" | "directory" | "missing";

/**
 * `statSync`, memoised.
 *
 * Every page carries the same navigation, so the same paths are asked about tens of
 * thousands of times and the filesystem does not need to be asked again. That alone
 * took the run on the assembled site from fifteen seconds to six.
 */
function census(): (target: string) => Stat {
  const seen = new Map<string, Stat>();
  return (target) => {
    const known = seen.get(target);
    if (known) return known;
    let state: Stat = "missing";
    try {
      state = fs.statSync(target).isDirectory() ? "directory" : "file";
    } catch {
      /* absent, which is an answer */
    }
    seen.set(target, state);
    return state;
  };
}

/** The manifest whose base is the deepest ancestor of `target`, if any. */
function manifestFor(target: string, manifests: Manifest[]): Manifest | undefined {
  let best: Manifest | undefined;
  for (const manifest of manifests) {
    if (target !== manifest.base && !target.startsWith(manifest.base + path.sep)) continue;
    if (!best || manifest.base.length > best.base.length) best = manifest;
  }
  return best;
}

/**
 * The directory whose `assets/` a page's own assets sit in: the nearest ancestor
 * holding a manifest, which is the book's profile root or the site root.
 */
function profileRoot(page: string): string | undefined {
  for (let dir = path.dirname(page); ; dir = path.dirname(dir)) {
    if (exists(path.join(dir, "assets", "manifest.json"))) return dir;
    if (path.dirname(dir) === dir) return undefined;
  }
}

/** Every `href`, `src` and `data-figure-src` in the document, as written. */
function references(html: string): { name: string; value: string }[] {
  const found: { name: string; value: string }[] = [];
  for (const tag of html.matchAll(TAG)) {
    for (const attribute of (tag[2] ?? "").matchAll(ATTRIBUTE)) {
      const name = attribute[1] ?? "";
      if (NAMED.has(name)) found.push({ name, value: attribute[2] ?? "" });
    }
  }
  return found;
}

/** Read every manifest under the site root, and check each entry was written. */
function readManifests(root: string, report: Report): Manifest[] {
  const manifests: Manifest[] = [];
  for (const file of walk(root, "manifest.json")) {
    // The shape is `<profile>/assets/manifest.json`; anything else is not ours.
    if (path.basename(path.dirname(file)) !== "assets") continue;
    const data = JSON.parse(fs.readFileSync(file, "utf8")) as {
      assets?: Record<string, string>;
      figures?: Record<string, string>;
    };
    // A manifest's paths are relative to the profile root, which is the parent of
    // its own `assets/` directory — not to `assets/`, which is one level too deep.
    const base = path.dirname(path.dirname(file));
    const recorded = new Set<string>();
    for (const written of Object.values(data.assets ?? {})) {
      recorded.add(path.resolve(base, written));
    }
    for (const written of Object.values(data.figures ?? {})) {
      recorded.add(path.resolve(base, "assets", "figures", written));
    }
    for (const target of recorded) {
      report.examined += 1;
      if (!isFile(target)) {
        report.error(
          path.relative(root, file),
          `records ${path.relative(root, target)}, which is not in the build`,
        );
      }
    }
    manifests.push({ base, file, recorded });
  }
  return manifests;
}

export async function run(argv: string[]): Promise<number> {
  const { positional } = parseArgs(argv, SURFACE);
  const root = path.resolve(positional[0] ?? "site");
  if (!fs.existsSync(root)) throw new Error(`no build at ${root}; build the site first`);

  const report = new Report("assets");
  const manifests = readManifests(root, report);
  // "." is the site root: a finding about the whole tree has no page to name.
  if (!manifests.length) {
    report.error(".", "has no assets/manifest.json, so no content-addressed name could be confirmed");
  }

  const pages = walk(root, ".html");
  if (!pages.length) report.error(".", "has no HTML pages, so nothing was checked");
  const stat = census();

  for (const page of pages) {
    const where = path.relative(root, page);
    for (const { name, value } of references(fs.readFileSync(page, "utf8"))) {
      const reference = value.split("#")[0]!.split("?")[0]!.trim();
      if (!reference || NOT_LOCAL.test(reference)) continue;

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

      // A trailing slash is a page route, and `check_links` owns every page-to-page
      // link. Walking the navigation here would double its work and this check's run.
      if (reference.endsWith("/")) continue;

      // Root-absolute references are the portal's: they resolve at the site root,
      // never at the profile the page was built into.
      const target = reference.startsWith("/")
        ? path.join(root, reference)
        : path.resolve(path.dirname(page), reference);
      if (target !== root && !target.startsWith(root + path.sep)) {
        report.error(where, `points at "${reference}", which resolves outside the build`);
        continue;
      }
      // Counted from here on: it names a local path, and every answer is a verdict.
      report.examined += 1;

      const state = stat(target);
      // A slashless directory reference is a page route too.
      if (state === "directory") continue;
      const last = reference.split("/").pop() ?? "";
      // Extensionless and absent: a route to a page another build writes.
      if (state === "missing" && !last.includes(".")) continue;

      if (state === "missing") {
        report.error(where, `points at "${reference}", which is not in the build`);
        continue;
      }
      const segments = path.relative(root, target).split(path.sep);
      if (!segments.includes("assets") || !ADDRESSED.test(last)) continue;
      const manifest = manifestFor(target, manifests);
      if (!manifest) {
        report.error(where, `points at "${reference}", which no assets/manifest.json describes`);
      } else if (!manifest.recorded.has(target)) {
        report.error(
          where,
          `points at "${reference}", which ${path.relative(root, manifest.file)} does not record`,
        );
      }
    }
  }

  report.print("references and manifest entries");
  return report.exitCode();
}
