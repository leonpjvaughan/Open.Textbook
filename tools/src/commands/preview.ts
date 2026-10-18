/*
 * Preview every theme bundle on the built site, in both schemes, and check the
 * two things a screenshot cannot: that the reader's preference actually reached
 * the page, and that the text on it has enough contrast.
 *
 * This was `test/theme-preview.cjs`, the last loose script outside the CLI. It
 * carried its own Playwright resolution, its own MIME table and its own route
 * handler — the duplication the rest of the browser checks had already shed, and
 * the reason `test/` is gone rather than kept beside `tests/`.
 *
 * The route layout is asserted before a browser starts. The layout's own witness
 * page must exist under `--root`, and every route must resolve to a built file;
 * any miss is printed with the layout the run expected and returns 2. This exists
 * because the routes really did change when the renderer did — MkDocs served
 * `Chapter 1/Section 1.1/Walkthrough/`, the pipeline serves
 * `chapter-1/section-1.1/learn/` — and a miss used to be served to the audit as
 * a `not found` body, which it then measured as 738 "text elements" and
 * reported as a pass. A renderer swap must fail here, not pass quietly.
 *
 * What `--audit` can and cannot see. It walks every element that owns a text
 * node, so it measures the text the page actually paints and is not fooled by a
 * token that is declared but never applied. It cannot see anything a text node
 * does not carry:
 *
 *   - pseudo-elements. `::marker` — the sidebar's `<summary>` disclosure
 *     triangle, where a below-3:1 `--tb-ink-lighter` went unseen — and
 *     `::before`/`::after` content;
 *   - `input::placeholder` text, including the search box's;
 *   - SVG `fill`, so no icon is measured.
 *
 * That is a documented limit, not a coverage claim. Growing it means reading
 * pseudo-element computed styles and SVG presentation attributes as well.
 *
 * Colours are read two ways on purpose. The `--tb-*` tokens are read from
 * computed style, and the same ratios are also measured on real elements
 * (a paragraph, a link) against the first ancestor with a painted background,
 * so a token that is defined but not applied cannot pass.
 */
import fs from "node:fs";
import path from "node:path";
import { launchBrowser, openContext, serveStatic, ORIGIN } from "../lib/browser.js";
import { parseArgs, type Surface } from "../lib/flags.js";

// The route layouts this harness knows. They are not interchangeable: the
// renderer decides the path, and a run that names the wrong one must stop before
// it measures a 404. `witness` is a page that only that renderer writes, so its
// presence is what makes the assertion concrete rather than stylistic.
const LAYOUTS: Record<string, { label: string; example: string; witness: string }> = {
  pipeline: {
    label: "the pipeline (`python -m textbook.pipeline`) — the site",
    example: "/gcse-maths/higher/chapter-1/section-1.1/learn/",
    witness: "gcse-maths/higher/chapter-1/section-1.1/learn/index.html",
  },
  mkdocs: {
    label: "the parked MkDocs shell — only if MkDocs is un-parked",
    example: "/gcse-maths/higher/Chapter 1/Section 1.1/Walkthrough/",
    witness: "gcse-maths/higher/Chapter 1/Section 1.1/Walkthrough/index.html",
  },
};

// A URL path to a built file under `siteDir`, or `null` when the site has no
// such page. A trailing slash is a directory index; anything that escapes the
// root or is itself a directory is a miss. The route handler and the up-front
// layout check share this so they cannot disagree about what resolves.
function resolveFile(siteDir: string, urlPath: string): string | null {
  let rel = decodeURIComponent(urlPath);
  if (rel.endsWith("/")) rel += "index.html";
  const file = path.join(siteDir, rel);
  if (!file.startsWith(siteDir)) return null;
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) return null;
  return file;
}

// Stop before a browser starts if the site is not the layout the run is for.
// Every route is resolved here, so a route handler that later comes up empty can
// only mean the tree changed mid-run, which is a bug worth failing on too.
// Returns an exit code to stop with, or null to carry on.
function assertLayout(
  layoutId: string,
  siteDir: string,
  entries: { name: string; route: string }[],
): number | null {
  const layout = LAYOUTS[layoutId];
  if (!layout) {
    console.error(`unknown layout "${layoutId}"; known: ${Object.keys(LAYOUTS).join(", ")}`);
    return 2;
  }
  if (!fs.existsSync(siteDir) || !fs.statSync(siteDir).isDirectory()) {
    console.error(`--root ${siteDir} is not a directory; build the site first`);
    return 2;
  }

  const problems: string[] = [];
  if (!fs.existsSync(path.join(siteDir, layout.witness))) {
    problems.push(`this layout's witness page is missing: ${layout.witness}`);
  }
  for (const { name, route } of entries) {
    if (!resolveFile(siteDir, route)) problems.push(`route "${name}" (${route}) does not resolve`);
  }

  console.log(`layout: ${layoutId} — ${layout.label}`);
  console.log(`  route shape: ${layout.example}`);
  if (!problems.length) return null;

  console.error(`\nlayout assertion failed for --root ${siteDir}`);
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error(
    `\nThis site was not built with the "${layoutId}" layout, or the routes are\nfrom a different renderer. Known layouts:`,
  );
  for (const [id, known] of Object.entries(LAYOUTS)) {
    console.error(`  ${id.padEnd(9)} ${known.example}`);
  }
  console.error(
    "\nRefusing to run: a missing route served as 404 once left this audit\n" +
      'measuring 738 "text elements" of a "not found" body and reporting a pass.',
  );
  return 2;
}

// --- colour maths, the same definition the Python invariant uses -------------

type RGB = [number, number, number];

function parseColour(value: unknown): RGB | null {
  const text = String(value || "").trim().toLowerCase();
  const hex = text.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (hex) {
    let digits = hex[1];
    if (digits.length === 3) digits = digits.split("").map((d) => d + d).join("");
    return [0, 2, 4].map((i) => parseInt(digits.slice(i, i + 2), 16)) as RGB;
  }
  const rgb = text.match(/^rgba?\(([^)]+)\)$/);
  if (rgb) {
    const parts = rgb[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    if (parts.length >= 3) return parts.slice(0, 3) as RGB;
  }
  return null;
}

function luminance([r, g, b]: RGB): number {
  const [R, G, B] = [r, g, b]
    .map((c) => c / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrast(a: RGB, b: RGB): number {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

// --- the checks --------------------------------------------------------------

type Probe = {
  theme: string | null;
  scheme: string | null;
  bodyBackground: string;
  tokens: Record<string, string>;
  samples: {
    selector: string;
    colour: string;
    background: string;
    size: number;
    text: string;
  }[];
};

type Audited = {
  selector: string;
  text: string;
  colour: string;
  background: string;
  size: number;
  weight: number;
};

// Runs in the page. Returns what the reader's screen actually resolved to.
const PROBE = () => {
  const root = document.documentElement;
  const body = document.body;
  // The page itself may be painted on <html>, on <body>, or not at all (the
  // reader's `--tb-paper` is then the background by definition). Everything that
  // measures text needs one answer to "what is behind this?", so it is here.
  const pageBackground = () => {
    for (const node of [body, root]) {
      const bg = node && getComputedStyle(node).backgroundColor;
      if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") return bg;
    }
    const paper = getComputedStyle(body).getPropertyValue("--tb-paper").trim();
    if (paper) return paper;
    const paperRoot = getComputedStyle(root).getPropertyValue("--tb-paper").trim();
    return paperRoot || "rgba(0, 0, 0, 0)";
  };
  const tokens: Record<string, string> = {};
  for (const name of [
    "--tb-paper", "--tb-ink", "--tb-ink-soft", "--tb-link", "--tb-accent",
    "--tb-accent-ink", "--tb-rule", "--tb-code-bg", "--tb-fig-warn",
    "--tb-fig-good", "--tb-fig-grid",
  ]) {
    tokens[name] = getComputedStyle(body).getPropertyValue(name).trim();
  }

  const paintedBackground = (el: Element) => {
    let node: Element | null = el;
    while (node) {
      const bg = getComputedStyle(node).backgroundColor;
      if (bg && bg !== "transparent" && !bg.includes("rgba(0, 0, 0, 0)")) return bg;
      node = node.parentElement;
    }
    return pageBackground();
  };

  const sample = (...selectors: string[]) => {
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (!el) continue;
      const style = getComputedStyle(el);
      return {
        selector,
        colour: style.color,
        background: paintedBackground(el),
        size: parseFloat(style.fontSize),
        text: (el.textContent || "").trim().slice(0, 40),
      };
    }
    return null;
  };

  return {
    theme: root.getAttribute("data-theme"),
    scheme: body.getAttribute("data-md-color-scheme"),
    bodyBackground: getComputedStyle(body).backgroundColor,
    tokens,
    // Two renderers exist, so the sample is by role rather than by one markup:
    // MkDocs wraps the page in <article>, the pipeline in <main class="content">.
    samples: [
      sample("article p", "main p", ".content p"),
      sample("article a", "main a", ".content a"),
      sample("article h2", "main h2", ".content h2"),
      sample("pre code"),
    ].filter(Boolean),
  };
};

// Every element that paints text, with the colour it resolved to and the colour
// of the first ancestor that actually painted a background. This is the whole
// page, not a sample, so a token that is readable in the palette but misused in
// the CSS shows up here.
const AUDIT = () => {
  const pageBackground = () => {
    for (const node of [document.body, document.documentElement]) {
      const bg = node && getComputedStyle(node).backgroundColor;
      if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") return bg;
    }
    const paper = getComputedStyle(document.body).getPropertyValue("--tb-paper").trim();
    return paper || "rgba(0, 0, 0, 0)";
  };
  const painted = (el: Element) => {
    let node: Element | null = el;
    while (node) {
      const bg = getComputedStyle(node).backgroundColor;
      if (bg && bg !== "transparent" && !/rgba\(0, 0, 0, 0\)/.test(bg)) return bg;
      node = node.parentElement;
    }
    return pageBackground();
  };
  const found: unknown[] = [];
  for (const el of document.querySelectorAll("body *")) {
    const own = [...el.childNodes].some(
      (node) => node.nodeType === 3 && (node.textContent || "").trim().length > 1,
    );
    if (!own) continue;
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") continue;
    if (parseFloat(style.opacity || "1") < 0.5) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) continue;
    const classes =
      typeof el.className === "string"
        ? el.className.trim().split(/\s+/).slice(0, 2).map((c) => "." + c).join("")
        : "";
    found.push({
      selector: el.tagName.toLowerCase() + classes,
      text: (el.textContent || "").trim().slice(0, 48),
      colour: style.color,
      background: painted(el),
      size: parseFloat(style.fontSize),
      weight: Number(style.fontWeight) || 400,
    });
  }
  return found;
};

function minimumFor(size: number, weight: number): number {
  // WCAG 1.4.3: large text is 18.66px bold or 24px plain.
  const large = size >= 24 || (size >= 18.66 && weight >= 700);
  return large ? 3.0 : 4.5;
}

function auditPage(
  where: string,
  elements: Audited[],
  limit: number,
  failures: string[],
): string[] {
  const rows: (Audited & { ratio: number; minimum: number })[] = [];
  for (const el of elements) {
    const fg = parseColour(el.colour);
    const bg = parseColour(el.background);
    if (!fg || !bg) continue;
    const ratio = contrast(fg, bg);
    const minimum = minimumFor(el.size, el.weight);
    if (ratio >= minimum) continue;
    rows.push({ ...el, ratio, minimum });
  }
  rows.sort((a, b) => a.ratio - b.ratio);
  if (!rows.length) return [];
  // One line per distinct (selector, size, colours): a list of twenty identical
  // list items is one finding, not twenty.
  const seen = new Set<string>();
  const lines: string[] = [];
  for (const row of rows) {
    const key = `${row.selector}|${row.size}|${row.colour}|${row.background}`;
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push(
      `   ${row.ratio.toFixed(2).padStart(5)} (min ${row.minimum}, ${row.size}px) ` +
        `${row.selector} ${row.colour} on ${row.background} — "${row.text}"`,
    );
    if (lines.length >= limit) break;
  }
  if (rows.length) {
    failures.push(`${where}: ${rows.length} text element(s) below WCAG AA`);
  }
  return lines;
}

function checkOne(
  theme: string,
  scheme: string,
  routeName: string,
  probe: Probe,
  thresholds: { ink: number; link: number; accent: number },
  failures: string[],
): string[] {
  const where = `${theme}/${scheme}/${routeName}`;
  // Material names the schemes `default` and `slate`, which is what the built
  // pages carry; `light`/`dark` is only our name for the reader's choice.
  const expectedScheme = scheme === "dark" ? "slate" : "default";
  if (probe.theme !== theme) {
    failures.push(`${where}: data-theme is ${probe.theme}`);
  }
  if (probe.scheme !== expectedScheme) {
    failures.push(`${where}: data-md-color-scheme is ${probe.scheme}, expected ${expectedScheme}`);
  }

  const token = (name: string) => parseColour(probe.tokens[name]);
  const paper = token("--tb-paper");
  const checks: [string, RGB | null, RGB | null, number][] = [
    ["ink on paper", token("--tb-ink"), paper, thresholds.ink],
    ["link on paper", token("--tb-link"), paper, thresholds.link],
    ["accent on paper", token("--tb-accent"), paper, thresholds.accent],
  ].filter(([, fg, bg]) => fg && bg) as [string, RGB | null, RGB | null, number][];

  const accents = [token("--tb-accent"), token("--tb-accent-ink")];
  if (accents[0] && accents[1]) {
    checks.push(["accent ink on accent", accents[1], accents[0], 4.5]);
  }

  const lines: string[] = [];
  for (const [label, fg, bg, minimum] of checks) {
    const ratio = contrast(fg as RGB, bg as RGB);
    const ok = ratio >= minimum;
    if (!ok) failures.push(`${where}: ${label} is ${ratio.toFixed(2)}:1, below ${minimum}`);
    lines.push(
      `${ok ? "ok  " : "FAIL"} ${label.padEnd(22)} ${ratio.toFixed(2).padStart(5)} (min ${minimum})`,
    );
  }

  // The measured elements: what is painted, not what is declared.
  for (const sample of probe.samples) {
    const fg = parseColour(sample.colour);
    const bg = parseColour(sample.background);
    if (!fg || !bg) continue;
    const ratio = contrast(fg, bg);
    const large = sample.size >= 24;
    const minimum = large ? 3.0 : 4.5;
    const ok = ratio >= minimum;
    if (!ok) {
      failures.push(
        `${where}: ${sample.selector} text is ${ratio.toFixed(2)}:1 on its background, below ${minimum}`,
      );
    }
    lines.push(
      `${ok ? "ok  " : "FAIL"} ${("painted " + sample.selector).padEnd(22)} ` +
        `${ratio.toFixed(2).padStart(5)} (min ${minimum}, ${sample.size}px)`,
    );
  }
  return lines;
}

// --- main --------------------------------------------------------------------

/** What this command accepts. `tools help preview` is generated from this table. */
export const SURFACE: Surface = {
  positional: [
    { name: "name:route ...", help: "one route per name, passed after `--`", required: false },
  ],
  flags: {
    root: { kind: "string", value: "<dir>", default: "site", help: "the built site to preview" },
    layout: {
      kind: "string",
      value: "<id>",
      default: "pipeline",
      help: `the route layout the site has; known: ${Object.keys(LAYOUTS).join(", ")}`,
    },
    out: {
      kind: "string",
      value: "<dir>",
      default: "/tmp/theme-preview",
      help: "write the images here",
    },
    themes: {
      kind: "string",
      value: "<a,b>",
      help: "the bundles to preview; by default every one the stylesheet defines",
    },
    schemes: {
      kind: "string",
      value: "<a,b>",
      default: "light,dark",
      help: "the schemes to preview, comma separated",
    },
    viewport: {
      kind: "string",
      value: "<WxH>",
      default: "1280x900",
      help: "the window to measure in",
    },
    full: { kind: "boolean", help: "capture the whole page, not the window" },
    "no-shots": {
      kind: "boolean",
      help: "check the preference and the contrast, and write no images",
    },
    audit: { kind: "boolean", help: "walk every text element on the page, not a sample" },
    "audit-limit": {
      kind: "string",
      value: "<n>",
      default: "12",
      help: "print at most this many failing elements per page",
    },
  },
};

export async function run(argv: string[]): Promise<number> {
  const { values, positional } = parseArgs(argv, SURFACE);
  const root = String(values.root);
  const out = String(values.out);
  const layout = String(values.layout);
  let themes: string[] | null = values.themes ? String(values.themes).split(",") : null;
  const schemes = String(values.schemes).split(",");
  const [width, height] = String(values.viewport).split("x").map(Number);
  const viewport = { width, height };
  const fullPage = values.full === true;
  const shots = values["no-shots"] !== true;
  const audit = values.audit === true;
  const auditLimit = Number(values["audit-limit"]);
  // A route contains slashes and may contain a colon, so only the first colon
  // separates the name from the route.
  const entries = positional.map((entry) => {
    const [name, ...rest] = entry.split(":");
    return { name: name!, route: rest.join(":") };
  });
  if (!entries.length) {
    console.error("no routes given; use: -- name:/path");
    return 2;
  }

  const siteDir = path.resolve(root);
  const outDir = path.resolve(out);
  if (shots) fs.mkdirSync(outDir, { recursive: true });

  // Before Playwright, before any page: does this site have the layout and the
  // routes the run is about to measure?
  const layoutCode = assertLayout(layout, siteDir, entries);
  if (layoutCode !== null) return layoutCode;
  if (audit) {
    console.log(
      "audit limit: sees elements that own a text node; blind to ::marker,\n" +
        "             ::before/::after, input::placeholder and SVG fills",
    );
  }

  if (!themes) {
    // Read the bundle ids from the selectors the generated stylesheet emits.
    const css = fs.readFileSync(path.join(siteDir, "assets", "stylesheets", "themes.css"), "utf8");
    themes = [...new Set([...css.matchAll(/html\[data-theme="([^"]+)"\]/g)].map((m) => m[1]))];
  }

  const thresholds = { ink: 7.0, link: 4.5, accent: 4.5 };
  const failures: string[] = [];
  const routeMisses = new Set<string>();
  const browser = await launchBrowser();

  for (const scheme of schemes) {
    const context = await openContext(browser, {
      scheme: scheme === "dark" ? "dark" : "light",
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      // The pages register a service worker. Its fetches are not seen by request
      // interception, and the origin is not a real host, so a controlled
      // navigation would fail. The preview wants the bytes on disk anyway, not
      // whatever the worker's cache answers with.
      blockServiceWorkers: true,
    });
    await serveStatic(context, siteDir, {
      // Every route resolved before the browser started, so a miss now means the
      // tree changed under the run. Abort rather than serve a body the audit
      // would measure as if it were the page.
      onMiss: (rel) => {
        console.error(`route miss during the run: ${rel}`);
        routeMisses.add(rel);
      },
    });

    for (const theme of themes) {
      // Seed both keys for this bundle, then reload from a blank page so the
      // init script runs before the first paint on every navigation.
      await context.addInitScript(
        ({ chosenTheme, chosenScheme }: { chosenTheme: string; chosenScheme: string }) => {
          try {
            localStorage.setItem("textbooks:theme", chosenTheme);
            localStorage.setItem("textbooks:scheme", chosenScheme);
          } catch {
            /* a context that forbids storage is not a failure here */
          }
        },
        { chosenTheme: theme, chosenScheme: scheme === "dark" ? "slate" : "default" },
      );
      const page = await context.newPage();
      for (const { name, route } of entries) {
        await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" });
        // The build's stylesheets are fetched after `load` often enough that a
        // fixed pause is a race: an unstyled page reads as black-on-transparent
        // and every element "fails". Wait for the shell to paint instead.
        await page
          .waitForFunction(
            () => {
              const body = document.body;
              if (!body) return false;
              const style = getComputedStyle(body);
              const paper = style.getPropertyValue("--tb-paper").trim();
              if (paper) return true;
              const bg = style.backgroundColor;
              return Boolean(bg) && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent";
            },
            { timeout: 10000 },
          )
          .catch(() => {});
        await page.waitForTimeout(250);
        const probe = (await page.evaluate(PROBE)) as Probe;
        console.log(`\n=== ${theme} / ${scheme} / ${name} ===`);
        for (const line of checkOne(theme, scheme, name, probe, thresholds, failures)) {
          console.log("   " + line);
        }
        if (audit) {
          const elements = (await page.evaluate(AUDIT)) as Audited[];
          const below = auditPage(`${theme}/${scheme}/${name}`, elements, auditLimit, failures);
          console.log(`   audited ${elements.length} text elements`);
          for (const line of below) console.log(line);
        }
        if (shots) {
          const file = path.join(outDir, `${theme}-${scheme}-${name}.png`);
          await page.screenshot({ path: file, fullPage });
          console.log(`   -> ${file}`);
        }
      }
      await page.close();
    }
    await context.close();
  }

  await browser.close();

  if (routeMisses.size) {
    failures.push(
      `route(s) stopped resolving while the run was in progress: ${[...routeMisses].join(", ")}`,
    );
  }

  if (failures.length) {
    console.error(`\n${failures.length} problem(s):`);
    for (const failure of failures) console.error("  - " + failure);
    return 1;
  }
  console.log(
    `\nAll checks passed for ${themes.length} theme(s) x ${schemes.length} scheme(s).`,
  );
  return 0;
}
