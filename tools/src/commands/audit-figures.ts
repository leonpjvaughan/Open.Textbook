/*
 * Measure what every figure actually paints, in both schemes, and capture it.
 *
 * A figure's colours come from `fig-*` classes and `--tb-*` tokens, and
 * `tests/test_themes.py` proves those tokens clear their contrast thresholds. That is
 * necessary and not sufficient: it cannot see what a *module* does with them. A module
 * can draw an element with no fill at all — SVG's initial `fill` is black, so it
 * vanishes on a dark panel — or use two tokens close enough together that two series
 * look like one.
 *
 * So this does not read the source. It loads each figure in a browser, asks for the
 * computed paint of every element it contains, and measures each one against the panel
 * it sits on. The static scans agree with it and are not trusted instead of it.
 *
 * Its flags are the `SURFACE` table below, which is also what `tools help` prints;
 * the comment here used to repeat them, and said nothing about `--maps`.
 *
 * The JSON is the report; the screenshots are the record for a human to look at.
 * `--mobile` answers a different question — not "is this readable?" but "can a reader
 * on a phone read it at all?" — and is the check that found a label drawn at 8.6px.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ORIGIN, launchBrowser, openContext, serveStatic } from "../lib/browser.js";
import type { Browser } from "../lib/browser.js";
import { applySetting, readControls, readoutText, readWorking, settingsFor } from "./readout.js";
import type { Control, Override } from "./readout.js";
import { parseArgs, type Surface } from "../lib/flags.js";
import { mapPool } from "../lib/pool.js";
import { discoverFigures } from "../lib/site.js";

const TABLE_START = "<!-- generated:tables -->";
const TABLE_END = "<!-- /generated:tables -->";

type Paint = { rgb: number[]; kinds: string[]; count: number; example: string; ratio: number };

/** A paint below its floor, as the measured page reports it. */
type Problem = { tag: string; cls: string; kind: string; ratio: number; need: number; example: string };

/**
 * A `var(--tb-*)` in an **HTML** background inside a figure.
 *
 * A figure takes its colour from a `fig-*` class, and those classes paint an SVG
 * shape with `fill` and `stroke`; an HTML box is painted with `background`, which no
 * `fig-*` class sets. So a token in an HTML background is a colour the figure
 * carried itself, and it was measured by nothing until this existed.
 */
type Breach = {
  tag: string;
  cls: string;
  prop: string;
  value: string;
  token: string;
  from: string;
  resolved: string;
};

type Measurement = {
  slug?: string;
  panel?: { r: number; g: number; b: number };
  panelFrom?: string;
  paints?: Paint[];
  problems?: Problem[];
  breaches?: Breach[];
  /** Set when the figure could not be measured at all. */
  error?: string;
};

type TableRow = {
  slug: string;
  tokens: string[];
  page: string;
  light: string;
  dark: string;
};

/** One figure's measurements by scheme, and the page it was measured on. */
type FigureReport = { page: string; schemes: Record<string, Measurement> };

const COLOUR_CLASSES = [
  "fig-accent", "fig-warn", "fig-good", "fig-ink", "fig-grid", "fig-line",
  "text-accent", "text-warn", "text-good", "text-ink",
];

const SHARED_FIGURE_FILES = ["figures.js", "kit.js"];

export const SURFACE: Surface = {
  positional: [{ name: "siteDir", help: "the built site to measure" }],
  flags: {
    schemes: {
      kind: "string",
      value: "<a,b>",
      default: "light,dark",
      help: "the schemes to measure, comma separated",
    },
    theme: {
      kind: "string",
      value: "<bundle>",
      help: "the bundle to force instead of the reader's preference",
    },
    maps: {
      kind: "string",
      value: "<file>",
      help: "read the figure-to-page map from here instead of deriving it from the site",
    },
    shots: {
      kind: "string",
      value: "<dir>",
      help: "write a PNG of each figure here instead of measuring only",
    },
    json: { kind: "string", value: "<file>", help: "write the measurement report here" },
    claims: {
      kind: "string",
      value: "<file>",
      help: "also sweep each figure's controls and write the claims it declares here",
    },
    only: { kind: "string", value: "<slug>", help: "measure one figure" },
    table: {
      kind: "string",
      value: "<file>",
      help: "replace the generated tables in this file with what was measured",
    },
    mobile: {
      kind: "boolean",
      help: "ask the other question: what reaches a 390px screen, and at what size",
    },
    jobs: {
      kind: "string",
      value: "<n>",
      default: "1",
      help: "pages in flight at once; one is the setting that measures all of them",
    },
  },
};

type BookDir = {
  id: string;
  title: string;
  qualification: string;
  order: number;
  figures: string;
};

function bookDirs(repoRoot: string): BookDir[] {
  const base = path.join(repoRoot, "books");
  if (!fs.existsSync(base)) return [];

  const order = new Map<string, number>();
  const collection = path.join(repoRoot, "collection.yaml");
  if (fs.existsSync(collection)) {
    const text = fs.readFileSync(collection, "utf8");
    const at = text.indexOf("\nqualifications:");
    if (at >= 0) {
      const rest = text.slice(at + 1);
      const block = rest.slice(rest.indexOf("\n") + 1);
      const end = block.search(/^[a-z_]+:/m);
      let index = 0;
      for (const line of (end < 0 ? block : block.slice(0, end)).split("\n")) {
        const match = line.match(/^\s+-\s+id:\s*(\S+)/);
        if (match) order.set(match[1].replace(/["']/g, ""), index++);
      }
    }
  }

  return fs
    .readdirSync(base)
    .filter((id) => fs.existsSync(path.join(base, id, "book.yaml")))
    .map((id) => {
      const yaml = fs.readFileSync(path.join(base, id, "book.yaml"), "utf8");
      const field = (name: string, fallback: string): string => {
        const match = yaml.match(new RegExp(`^${name}:\\s*(.+)$`, "m"));
        return match ? match[1].replace(/["']/g, "").trim() : fallback;
      };
      return {
        id,
        title: field("title", id),
        qualification: field("qualification", ""),
        order: Number(field("order", "0")) || 0,
        figures: path.join(base, id, "docs", "assets", "figures"),
      };
    })
    .sort((a, b) =>
      (order.get(a.qualification) ?? 99) - (order.get(b.qualification) ?? 99)
      || a.order - b.order
      || a.id.localeCompare(b.id)
    );
}

function classesUsed(file: string): string[] {
  const body = fs.readFileSync(file, "utf8").replace(/^\s*\/\/.*$/gm, "");
  return COLOUR_CLASSES.filter((name) => new RegExp(`\\b${name}\\b`).test(body));
}

function markdownTables(report: Record<string, FigureReport>, siteDir: string): string {
  const repoRoot = path.dirname(path.resolve(siteDir));
  const books = bookDirs(repoRoot);
  const owner = new Map<string, { book: BookDir; file: string }>();
  for (const book of books) {
    if (!fs.existsSync(book.figures)) continue;
    for (const file of fs.readdirSync(book.figures)) {
      if (!file.endsWith(".js") || SHARED_FIGURE_FILES.includes(file)) continue;
      owner.set(file.slice(0, -3), { book, file: path.join(book.figures, file) });
    }
  }

  const label = (url: string): string => {
    const parts = url.split("/").filter(Boolean);
    return parts.filter((p) => p !== "higher" && p !== "foundation").join("/");
  };
  const lowest = (result: Measurement | undefined): string => {
    if (!result || result.error) return "—";
    const paints = result.paints ?? [];
    if (!paints.length) return "—";
    return `${Math.min(...paints.map((p) => p.ratio)).toFixed(2)}:1`;
  };

  const lines = [TABLE_START];

  lines.push("", "## Coverage", "", "| Book | Walkthroughs with a figure | Without |", "|---|---|---|");
  for (const book of books) {
    const walks: string[] = [];
    const walk = (dir: string): void => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name === "index.md" && path.basename(dir) === "Walkthrough") walks.push(full);
      }
    };
    const docs = path.resolve(book.figures, "..", "..");
    if (fs.existsSync(docs)) walk(docs);
    const withFigure = walks.filter((f) => /^:::figure /m.test(fs.readFileSync(f, "utf8")));
    if (!walks.length) continue;
    const missing = walks.length - withFigure.length;
    lines.push(`| ${book.title} | ${withFigure.length} of ${walks.length} | ${missing || "none"} |`);
  }

  const byBook = new Map<string, TableRow[]>(books.map((b) => [b.id, []]));
  for (const slug of Object.keys(report).sort()) {
    const where = owner.get(slug);
    if (!where) continue;
    const rows = byBook.get(where.book.id);
    if (!rows) continue;
    rows.push({
      slug,
      tokens: classesUsed(where.file),
      page: (report[slug].page || "").replace(/\/$/, "") + "/",
      light: lowest(report[slug].schemes.light),
      dark: lowest(report[slug].schemes.dark),
    });
  }

  for (const book of books) {
    const rows = byBook.get(book.id) || [];
    if (!rows.length) continue;
    lines.push("", `## ${book.title} — ${rows.length} figures`, "");
    lines.push("| Figure | Page | Paints with | Light | Dark |");
    lines.push("|---|---|---|---|---|");
    for (const row of rows) {
      const tokens = row.tokens.length
        ? row.tokens.map((t) => `\`${t}\``).join(", ")
        : "— (inherits ink)";
      lines.push(`| \`${row.slug}\` | \`${label(row.page)}\` | ${tokens} | ${row.light} | ${row.dark} |`);
    }
  }
  lines.push("", TABLE_END, "");
  return lines.join("\n");
}

function writeTable(file: string, tables: string): void {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, `${tables}\n`);
    return;
  }
  const text = fs.readFileSync(file, "utf8");
  const from = text.indexOf(TABLE_START);
  const to = text.indexOf(TABLE_END);
  if (from < 0 || to < 0) {
    throw new Error(
      `${file} has no ${TABLE_START} ... ${TABLE_END} region, so the tables cannot `
        + "be replaced without discarding whatever is there"
    );
  }
  fs.writeFileSync(file, text.slice(0, from) + tables + text.slice(to + TABLE_END.length));
}

// WCAG 2.1 relative luminance and contrast ratio, run inside the page.
const MEASURE = `
(function (slug) {
  const TAGS_DRAWN = new Set(["rect","circle","ellipse","line","path","polygon","polyline","text","tspan"]);
  const PAINTED = TAGS_DRAWN;
  function parse(c) {
    if (!c || c === "none" || c === "transparent") return null;
    // rgb() takes 0-255; color(srgb …) — what Chrome returns for a
    // color-mix() — takes 0-1. Reading one as the other makes every ratio
    // wrong while still looking plausible, so both are handled explicitly.
    const m = c.match(/rgba?\\(([^)]+)\\)/);
    if (m) {
      const parts = m[1].split(/[,\\s/]+/).filter(Boolean).map(Number);
      if (parts.length < 3) return null;
      return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
    }
    const s = c.match(/color\\(\\s*srgb\\s+([^)]+)\\)/);
    if (s) {
      const parts = s[1].split(/[,\\s/]+/).filter(Boolean).map(Number);
      if (parts.length < 3) return null;
      return {
        r: parts[0] * 255,
        g: parts[1] * 255,
        b: parts[2] * 255,
        a: parts.length > 3 ? parts[3] : 1,
      };
    }
    return null;
  }
  function over(fg, bg) {
    if (!fg) return null;
    const a = fg.a == null ? 1 : fg.a;
    return {
      r: fg.r * a + bg.r * (1 - a),
      g: fg.g * a + bg.g * (1 - a),
      b: fg.b * a + bg.b * (1 - a),
      a: 1,
    };
  }
  function lum(c) {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  }
  function ratio(a, b) {
    if (!a || !b) return null;
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  const box = document.querySelector('maths-figure[data-figure="' + slug + '"]');
  if (!box) return { error: "not on this page" };
  // A figure that mounted nothing passes every contrast check, because there is no
  // paint to measure. The loader writes "Figure failed to load" when a module
  // throws, and a module that throws took the **whole collection** down once — a
  // one-line scope mistake in the kit, 176 figures rendering an error sentence and
  // this audit reporting 352 clean measurements. An empty figure is a failure.
  const mounted = box.querySelector("svg, canvas, input, select, button, .fig");
  if (!mounted) {
    return { error: "mounted nothing: " + (box.textContent || "").trim().slice(0, 60) };
  }

  // The panel the figure is drawn on: the nearest opaque background above it.
  function panel(node) {
    let el = node;
    while (el && el !== document.documentElement) {
      const c = parse(getComputedStyle(el).backgroundColor);
      if (c && (c.a == null || c.a > 0.9)) return { c, from: el.className || el.tagName };
      el = el.parentElement;
    }
    const body = parse(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
    return { c: body, from: "body" };
  }
  const panelInfo = panel(box);
  const bg = panelInfo.c;

  function visible(el) {
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden") return false;
    if (Number(s.opacity) === 0) return false;
    return true;
  }

  const paints = new Map();   // colour -> { count, kinds:Set, example }
  const problems = [];
  const all = [box, ...box.querySelectorAll("*")];
  for (const el of all) {
    if (el === box) continue;
    if (!visible(el)) continue;
    const s = getComputedStyle(el);
    const isSvg = el.namespaceURI === "http://www.w3.org/2000/svg";
    const tag = el.tagName.toLowerCase();
    // Only elements that paint themselves. A <g> inherits fill:black and paints
    // nothing, so counting it would report a bug that is not there — which is
    // how a check earns the right to be ignored.
    const draws = isSvg && PAINTED.has(tag);
    const isSvgText = isSvg && (tag === "text" || tag === "tspan");
    const isHtmlText = !isSvg && el.children.length === 0 && (el.textContent || "").trim().length > 0;
    if (!draws && !isHtmlText) continue;
    if (isSvgText && !(el.textContent || "").trim()) continue;
    // A zero-size box is not painted. The <option> element is the case that
    // matters: Chrome lays it out in the native widget, so computed style reports
    // the *initial* colour — black — and measuring it would report ten defects
    // that are not there. A check that cries wolf is a check that gets ignored.
    // Both axes must be zero: a vertical <line> is legitimately 0 wide, and drawn.
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;

    // Text sits on its own background when the element paints one, and on the
    // panel when it does not. Measuring against the panel regardless would miss
    // dark text on a dark chip.
    const own = parse(s.backgroundColor);
    const onBg = own && (own.a == null || own.a > 0.9) ? own : bg;

    const found = [];
    if (isSvg) {
      const fill = parse(s.fill);
      const stroke = parse(s.stroke);
      const w = parseFloat(s.strokeWidth || "0");
      if (isSvgText) {
        // SVG text is painted with fill; that is its colour, at the text
        // threshold. Pushing fill as a shape too would double-count one defect.
        if (fill) found.push({ kind: "text", colour: fill, bg: onBg });
      } else {
        if (fill) found.push({ kind: "fill", colour: fill, bg: onBg });
        if (stroke && w > 0) found.push({ kind: "stroke", colour: stroke, bg: onBg });
      }
    } else {
      const c = parse(s.color);
      if (c) found.push({ kind: "text", colour: c, bg: onBg });
    }

    for (const f of found) {
      const solid = over(f.colour, f.bg);
      const key = solid ? \`\${Math.round(solid.r)},\${Math.round(solid.g)},\${Math.round(solid.b)}\` : "?";
      if (!paints.has(key)) {
        paints.set(key, { colour: solid, kinds: new Set(), count: 0, example: el.tagName.toLowerCase() + (el.className.baseVal || el.className || "") });
      }
      const rec = paints.get(key);
      rec.kinds.add(f.kind);
      rec.count += 1;
      const r = ratio(solid, f.bg);
      const need = f.kind === "text" ? 4.5 : 3.0;
      if (r != null && r < need) {
        problems.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className.baseVal || el.className || "").toString().slice(0, 40),
          kind: f.kind,
          ratio: Math.round(r * 100) / 100,
          need,
          example: (el.textContent || "").trim().slice(0, 30),
        });
      }
    }
  }
  // **The loop above cannot see an HTML box that paints colour.** The draws flag
  // is true only for SVG shapes, so a div shading a bar with a background of
  // var(--tb-fig-accent) was skipped entirely: three modules painted four bars
  // that way and this audit called every measurement clean. The value is read from
  // the element's own style attribute and CSSOM properties, **not** from
  // getComputedStyle, because the computed style resolves the var()
  // to a colour and the declaration — which is the defect — is then gone.
  const breaches = [];
  const TOKEN = /var\\(\\s*(--tb-[a-zA-Z0-9-]+)/;
  const PROPS = ["background", "backgroundColor", "backgroundImage"];
  const seen = new Set();
  const addBreach = (tag, cls, prop, value, token, from, resolved) => {
    const key = tag + "|" + prop + "|" + token;
    if (seen.has(key)) return;
    seen.add(key);
    breaches.push({ tag, cls, prop, value: String(value).slice(0, 80), token, from, resolved });
  };
  for (const el of all) {
    if (el === box) continue;
    if (el.namespaceURI === "http://www.w3.org/2000/svg") continue;
    if (!visible(el)) continue;
    const s = getComputedStyle(el);
    const resolved = (s.backgroundColor || "") + " " + (s.backgroundImage || "");
    // The raw attribute first: it keeps the declaration exactly as written, even
    // when the CSSOM refuses to expose a shorthand containing a var().
    const raw = (el.getAttribute && el.getAttribute("style")) || "";
    for (const decl of raw.split(";")) {
      if (!/background/i.test(decl)) continue;
      const token = decl.match(TOKEN);
      if (!token) continue;
      const prop = (decl.split(":")[0] || "background").trim();
      addBreach(el.tagName.toLowerCase(), String(el.className || "").slice(0, 40), prop, decl.trim(), token[1], "style attribute", resolved.trim().slice(0, 60));
    }
    // Then the CSSOM properties, which is what a module that assigns
    // style.background inside a redraw produces.
    for (const prop of PROPS) {
      const declared = el.style ? el.style[prop] : "";
      if (!declared) continue;
      const token = declared.match(TOKEN);
      if (!token) continue;
      addBreach(el.tagName.toLowerCase(), String(el.className || "").slice(0, 40), prop, declared, token[1], "style property", resolved.trim().slice(0, 60));
    }
  }
  // A stylesheet may set the same thing outside the element's own style, but a
  // figure module cannot add one: it paints through the DOM it is given. Reading
  // stylesheet rules instead picked up the shell's own control chrome — every
  // maths-figure button takes background: var(--tb-paper) from the shared
  // sheet — and reported 112 breaches that were not the figure carrying colour.
  // The kit's chrome is styled once, for every figure, and is not the defect this
  // check exists to find.

  return {
    slug,
    breaches,
    panel: panelInfo.c,
    panelFrom: String(panelInfo.from).slice(0, 40),
    paints: [...paints.values()].map((p) => ({
      rgb: [Math.round(p.colour.r), Math.round(p.colour.g), Math.round(p.colour.b)],
      kinds: [...p.kinds],
      count: p.count,
      example: p.example,
      ratio: Math.round(ratio(p.colour, bg) * 100) / 100,
    })),
    problems,
    box: (() => { const r = box.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; })(),
  };
})
`;

export async function run(argv: string[]): Promise<number> {
  const { values, positional } = parseArgs(argv, SURFACE);
  const jobs = Math.max(1, Math.min(Number(values.jobs ?? 1) || 1, 8));
  const siteDir = path.resolve(positional[0]!);
  const schemes = String(values.schemes ?? "light,dark").split(",");
  const theme = values.theme ? String(values.theme) : undefined;
  const maps = values.maps ? String(values.maps) : null;
  const shots = values.shots ? path.resolve(String(values.shots)) : null;
  const jsonOut = values.json ? path.resolve(String(values.json)) : null;
  const only = values.only ? String(values.only) : null;
  const table = values.table ? path.resolve(String(values.table)) : null;
  const claimsOut = values.claims ? path.resolve(String(values.claims)) : null;
  const mobile = values.mobile === true;
  if (shots) fs.mkdirSync(shots, { recursive: true });

  const pages = maps ? JSON.parse(fs.readFileSync(maps, "utf8")) : discoverFigures(siteDir);

  let slugs = Object.keys(pages).sort();
  if (only) slugs = slugs.filter((s) => s === only);

  const browser = await launchBrowser();

  // `font-size` does not say, because the SVG scales by rendered width over
  // 8px. Measured, not inferred: 70 figures were once below 7px.
  if (mobile) {
    return runMobile(browser, siteDir, pages, jsonOut, jobs);
  }

  const report: Record<string, FigureReport> = {};
  const claimRecords: {
    slug: string;
    route: string;
    settings: Override[];
    readout: string;
    claims: unknown[];
  }[] = [];
  for (const scheme of schemes) {
    const context = await openContext(browser, {
      scheme: scheme as "light" | "dark",
      theme,
      width: 1280,
      height: 900,
      deviceScaleFactor: 2,
      blockServiceWorkers: true,
    });
    await serveStatic(context, siteDir);
    const pagesPool = await Promise.all(Array.from({ length: jobs }, () => context.newPage()));
    await mapPool(slugs, jobs, async (slug, index) => {
      const page = pagesPool[index % jobs];
      const route = pages[slug][0];
      if (!report[slug]) report[slug] = { page: route, schemes: {} };
      const entry = report[slug];

      const attempt = async () => {
        await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" });
        await page
          .waitForFunction(
            (s: string) => {
              const figure = document.querySelector(`maths-figure[data-figure="${s}"]`);
              if (!figure) return false;
              return !!figure.querySelector("svg, canvas, input, select, button, .fig");
            },
            slug,
            { timeout: 8000 },
          )
          .catch(() => {});
        await page.waitForTimeout(60);
        return page.evaluate(`${MEASURE}(${JSON.stringify(slug)})`);
      };

      try {
        let res;
        try {
          res = await attempt();
        } catch {
          // in the figure. Measured: about 2% of 490 at two workers, zero at one. The
          res = await attempt();
        }
        entry.schemes[scheme] = res as Measurement;
        if (claimsOut && scheme === "light" && !res.error) {
          const controls = (await page.evaluate(readControls, slug)) as Control[];
          for (const overrides of settingsFor(controls, 6, false)) {
            await page.evaluate(applySetting, { slug, controls, overrides });
            await page.waitForTimeout(40);
            const text = (await page.evaluate(readoutText, slug)) as string;
            const declared = (await page.evaluate(readWorking, slug)) as unknown[];
            if (!text || !declared.length) continue;
            claimRecords.push({ slug, route, settings: overrides, readout: text, claims: declared });
          }
        }
        if (shots && !res.error) {
          const el = await page.$(`maths-figure[data-figure="${slug}"]`);
          if (el) {
            await el.screenshot({ path: path.join(shots, `${slug}${scheme === "light" ? "" : "-dark"}.png`) });
          }
        }
      } catch (err) {
        entry.schemes[scheme] = { error: String(err).slice(0, 120) };
      }
      process.stdout.write(".");
    });
    for (const page of pagesPool) await page.close();
    process.stdout.write(` ${scheme}\n`);
    await context.close();
  }
  await browser.close();

  if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(report, null, 1));
  if (claimsOut) {
    fs.writeFileSync(claimsOut, JSON.stringify(claimRecords, null, 1));
    console.log(`claims     ${claimRecords.length} render(s) -> ${path.relative(process.cwd(), claimsOut)}`);
  }
  if (table) {
    writeTable(table, markdownTables(report, siteDir));
    console.log(`wrote ${path.relative(process.cwd(), table)}`);
  }

  let bad = 0, errs = 0, taken = 0, breaches = 0;
  for (const [slug, entry] of Object.entries(report)) {
    for (const [scheme, res] of Object.entries(entry.schemes)) {
      if (res.error) { errs += 1; continue; }
      taken += 1;
      const problems = res.problems ?? [];
      if (problems.length) {
        bad += 1;
        const panel = res.panel ?? { r: 0, g: 0, b: 0 };
        console.log(`\n${slug} [${scheme}]  panel rgb(${panel.r},${panel.g},${panel.b})`);
        for (const p of problems.slice(0, 4)) {
          console.log(`   ${p.tag} .${p.cls} ${p.kind} ${p.ratio}:1 (needs ${p.need}) ${p.example}`);
        }
      }
      // painted SVG shape, so a reader's scheme is not the only thing that could be
      const found = res.breaches ?? [];
      breaches += found.length;
      if (found.length) {
        bad += 1;
        console.log(`\n${slug} [${scheme}]  colour on an HTML box, where only a fig-* class on an SVG shape is allowed`);
        for (const b of found.slice(0, 6)) {
          console.log(
            `   ${b.tag}${b.cls ? " " + b.cls : ""}  ${b.prop}: ${b.value}` +
              `  -> ${b.token} from ${b.from}; resolved ${b.resolved || "(nothing)"}`,
          );
        }
      }
    }
  }
  const expected = slugs.length * schemes.length;
  const missing = expected - taken - errs;
  console.log(`  measurements taken: ${taken} of ${expected}`);
  if (bad || errs || missing || expected === 0) {
    console.error(
      `\nfigure audit failed: ${bad} measurement(s) with a defect, ${breaches} HTML ` +
        `background(s) carrying a var(--tb-*), ${errs} unmeasured figure(s), ` +
        `${missing} measurement(s) not attempted`
    );
    return 1;
  }
  return 0;
}

/** The smallest rendered label per figure at a phone viewport. */
async function runMobile(
  browser: Browser,
  dir: string,
  pages: Record<string, string[]>,
  outFile: string | null,
  jobs: number,
): Promise<number> {
  const routes = [...new Set(Object.values(pages).map((where) => where[0]))];
  const context = await openContext(browser, { width: 390, height: 844, deviceScaleFactor: 1 });
  await serveStatic(context, dir);
  const page = await context.newPage();
  const measured: Record<string, number> = {};
  for (const route of routes) {
    try {
      await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" });
      await page.waitForTimeout(300);
      const found = await page.evaluate(() => {
        const out = [];
        for (const fig of document.querySelectorAll<HTMLElement>("maths-figure[data-figure]")) {
          let smallest = Infinity;
          for (const el of fig.querySelectorAll<SVGElement>("text, tspan")) {
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) continue;
            const svg = el.ownerSVGElement;
            const vb = svg && svg.viewBox && svg.viewBox.baseVal;
            const scale = vb && vb.width ? svg.getBoundingClientRect().width / vb.width : 1;
            smallest = Math.min(smallest, parseFloat(getComputedStyle(el).fontSize) * scale);
          }
          if (smallest !== Infinity) out.push({ slug: fig.dataset.figure, px: smallest });
        }
        return out;
      });
      for (const one of found) {
        if (!(one.slug in measured) || one.px < measured[one.slug]) measured[one.slug] = one.px;
      }
    } catch (err) {
    }
  }
  await context.close();
  await browser.close();

  if (outFile) fs.writeFileSync(outFile, JSON.stringify(measured, null, 1));
  const slugs = Object.keys(measured).sort((a, b) => measured[a] - measured[b]);
  const tooSmall = slugs.filter((s) => measured[s] < 9);
  const median = slugs.length ? measured[slugs[Math.floor(slugs.length / 2)]] : 0;
  console.log(`\nfigures measured at 390px: ${slugs.length}`);
  console.log(`  below 9px: ${tooSmall.length}   below 7px: ${slugs.filter((s) => measured[s] < 7).length}`);
  console.log(`  median smallest label: ${median.toFixed(1)}px`);
  if (tooSmall.length) {
    console.error("\nfigure legibility failed: these draw a label too small to read:");
    for (const slug of tooSmall.slice(0, 20)) console.error(`   ${measured[slug].toFixed(1)}px  ${slug}`);
    return 1;
  }
  // The guard against a run that measured almost nothing. A fixed floor of ten was
  const expected = Object.keys(pages).length;
  if (slugs.length === 0 || slugs.length < expected / 2) {
    console.error(
      `\nfigure legibility failed: measured ${slugs.length} of ${expected} figures. ` +
        "Either the build is missing pages or the server is not serving them.",
    );
    return 1;
  }
  return 0;
}
