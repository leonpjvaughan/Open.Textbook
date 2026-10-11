// Preview every theme bundle on the built site, in both schemes, and check the
// two things a screenshot cannot: that the reader's preference actually reached
// the page, and that the text on it has enough contrast.
//
// Usage:
//   node test/theme-preview.cjs [options] -- name:path [name:path ...]
//
// Options:
//   --root <dir>        the built site to serve      (default: site)
//   --out <dir>         where the PNGs go            (default: /tmp/theme-preview)
//   --themes a,b,c      bundles to preview           (default: every bundle)
//   --schemes light,dark                             (default: both)
//   --viewport WxH                                   (default: 1280x900)
//   --full              full-page screenshots (default: viewport only)
//   --no-shots          checks only, no images
//   --audit             also walk every text element on the page and report
//                       those below WCAG AA, with the element and the ratio
//   --audit-limit <n>   distinct audit findings to print (default: 12)
//
// It seeds *both* origin-wide keys before the first paint — `textbooks:theme`
// and `textbooks:scheme` — exactly as a reader who chose them would have, and
// then asserts the page reflects the choice: `data-theme` on <html> and
// `data-md-color-scheme` on <body>. Screenshots are the by-product; the checks
// are the point, and a failure exits non-zero.
//
// Colours are read two ways on purpose. The `--tb-*` tokens are read from
// computed style, and the same ratios are also measured on real elements
// (a paragraph, a link) against the first ancestor with a painted background,
// so a token that is defined but not applied cannot pass.

const fs = require("node:fs");
const path = require("node:path");

function loadPlaywright() {
  const candidates = [
    process.env.PLAYWRIGHT_PATH,
    "playwright",
    "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
  ].filter(Boolean);
  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch {
      /* try the next one */
    }
  }
  throw new Error("playwright not found; set PLAYWRIGHT_PATH");
}

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
};

// --- colour maths, the same definition the Python invariant uses -------------

function parseColour(value) {
  const text = String(value || "").trim().toLowerCase();
  const hex = text.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (hex) {
    let digits = hex[1];
    if (digits.length === 3) digits = digits.split("").map((d) => d + d).join("");
    return [0, 2, 4].map((i) => parseInt(digits.slice(i, i + 2), 16));
  }
  const rgb = text.match(/^rgba?\(([^)]+)\)$/);
  if (rgb) {
    const parts = rgb[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    if (parts.length >= 3) return parts.slice(0, 3);
  }
  return null;
}

function luminance([r, g, b]) {
  const [R, G, B] = [r, g, b]
    .map((c) => c / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

// --- the checks --------------------------------------------------------------

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
  const tokens = {};
  for (const name of [
    "--tb-paper", "--tb-ink", "--tb-ink-soft", "--tb-link", "--tb-accent",
    "--tb-accent-ink", "--tb-rule", "--tb-code-bg", "--tb-fig-warn",
    "--tb-fig-good", "--tb-fig-grid",
  ]) {
    tokens[name] = getComputedStyle(body).getPropertyValue(name).trim();
  }

  const paintedBackground = (el) => {
    let node = el;
    while (node) {
      const bg = getComputedStyle(node).backgroundColor;
      if (bg && bg !== "transparent" && !bg.includes("rgba(0, 0, 0, 0)")) return bg;
      node = node.parentElement;
    }
    return pageBackground();
  };

  const sample = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const style = getComputedStyle(el);
    return {
      selector,
      colour: style.color,
      background: paintedBackground(el),
      size: parseFloat(style.fontSize),
      text: (el.textContent || "").trim().slice(0, 40),
    };
  };

  return {
    theme: root.getAttribute("data-theme"),
    scheme: body.getAttribute("data-md-color-scheme"),
    bodyBackground: getComputedStyle(body).backgroundColor,
    tokens,
    samples: [
      sample("article p"),
      sample("article a"),
      sample("article h2"),
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
  const painted = (el) => {
    let node = el;
    while (node) {
      const bg = getComputedStyle(node).backgroundColor;
      if (bg && bg !== "transparent" && !/rgba\(0, 0, 0, 0\)/.test(bg)) return bg;
      node = node.parentElement;
    }
    return pageBackground();
  };
  const found = [];
  for (const el of document.querySelectorAll("body *")) {
    const own = [...el.childNodes].some(
      (node) => node.nodeType === 3 && node.textContent.trim().length > 1,
    );
    if (!own) continue;
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") continue;
    if (parseFloat(style.opacity || "1") < 0.5) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) continue;
    const classes = typeof el.className === "string"
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

function minimumFor(size, weight) {
  // WCAG 1.4.3: large text is 18.66px bold or 24px plain.
  const large = size >= 24 || (size >= 18.66 && weight >= 700);
  return large ? 3.0 : 4.5;
}

function auditPage(where, elements, limit, failures) {
  const rows = [];
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
  const seen = new Set();
  const lines = [];
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

function checkOne(theme, scheme, routeName, probe, thresholds, failures) {
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

  const token = (name) => parseColour(probe.tokens[name]);
  const paper = token("--tb-paper");
  const checks = [
    ["ink on paper", token("--tb-ink"), paper, thresholds.ink],
    ["link on paper", token("--tb-link"), paper, thresholds.link],
    ["accent on paper", token("--tb-accent"), paper, thresholds.accent],
  ].filter(([, fg, bg]) => fg && bg);

  const accents = [token("--tb-accent"), token("--tb-accent-ink")];
  if (accents[0] && accents[1]) {
    checks.push(["accent ink on accent", accents[1], accents[0], 4.5]);
  }

  const lines = [];
  for (const [label, fg, bg, minimum] of checks) {
    const ratio = contrast(fg, bg);
    const ok = ratio >= minimum;
    if (!ok) failures.push(`${where}: ${label} is ${ratio.toFixed(2)}:1, below ${minimum}`);
    lines.push(`${ok ? "ok  " : "FAIL"} ${label.padEnd(22)} ${ratio.toFixed(2).padStart(5)} (min ${minimum})`);
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
      failures.push(`${where}: ${sample.selector} text is ${ratio.toFixed(2)}:1 on its background, below ${minimum}`);
    }
    lines.push(
      `${ok ? "ok  " : "FAIL"} ${("painted " + sample.selector).padEnd(22)} ` +
        `${ratio.toFixed(2).padStart(5)} (min ${minimum}, ${sample.size}px)`,
    );
  }
  return lines;
}

// --- main --------------------------------------------------------------------

async function main() {
  const argv = process.argv.slice(2);
  let root = "site";
  let out = "/tmp/theme-preview";
  let themes = null;
  let schemes = ["light", "dark"];
  let viewport = { width: 1280, height: 900 };
  let fullPage = false;
  let shots = true;
  let audit = false;
  let auditLimit = 12;
  const entries = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--root") root = argv[(i += 1)];
    else if (arg === "--out") out = argv[(i += 1)];
    else if (arg === "--themes") themes = argv[(i += 1)].split(",");
    else if (arg === "--schemes") schemes = argv[(i += 1)].split(",");
    else if (arg === "--viewport") {
      const [w, h] = argv[(i += 1)].split("x").map(Number);
      viewport = { width: w, height: h };
    } else if (arg === "--full") fullPage = true;
    else if (arg === "--audit") audit = true;
    else if (arg === "--audit-limit") auditLimit = Number(argv[(i += 1)]);
    else if (arg === "--no-shots") shots = false;
    else if (arg === "--") continue;
    else {
      const [name, ...rest] = arg.split(":");
      entries.push({ name, route: rest.join(":") });
    }
  }
  if (!entries.length) {
    console.error("no routes given; use: -- name:/path");
    process.exit(2);
  }

  const siteDir = path.resolve(root);
  const outDir = path.resolve(out);
  if (shots) fs.mkdirSync(outDir, { recursive: true });

  if (!themes) {
    // Read the bundle ids from the selectors the generated stylesheet emits.
    const css = fs.readFileSync(path.join(siteDir, "assets", "stylesheets", "themes.css"), "utf8");
    themes = [...new Set([...css.matchAll(/html\[data-theme="([^"]+)"\]/g)].map((m) => m[1]))];
  }

  const thresholds = { ink: 7.0, link: 4.5, accent: 4.5 };
  const failures = [];
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({
    channel: process.env.CHROME_CHANNEL || "chrome",
    executablePath: process.env.CHROME_PATH || undefined,
  });

  for (const scheme of schemes) {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 1,
      colorScheme: scheme === "dark" ? "dark" : "light",
    });
    await context.route("**/*", (route) => {
      const url = new URL(route.request().url());
      let rel = decodeURIComponent(url.pathname);
      if (rel.endsWith("/")) rel += "index.html";
      const file = path.join(siteDir, rel);
      if (!file.startsWith(siteDir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        return route.fulfill({ status: 404, body: "not found" });
      }
      return route.fulfill({
        status: 200,
        contentType: TYPES[path.extname(file)] || "application/octet-stream",
        body: fs.readFileSync(file),
      });
    });

    for (const theme of themes) {
      // Seed both keys for this bundle, then reload from a blank page so the
      // init script runs before the first paint on every navigation.
      await context.addInitScript(
        ({ chosenTheme, chosenScheme }) => {
          try {
            localStorage.setItem("textbooks:theme", chosenTheme);
            localStorage.setItem("textbooks:scheme", chosenScheme);
          } catch (err) {}
        },
        { chosenTheme: theme, chosenScheme: scheme === "dark" ? "slate" : "default" },
      );
      const page = await context.newPage();
      for (const { name, route } of entries) {
        await page.goto(`http://preview.local${route}`, { waitUntil: "load" });
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
        const probe = await page.evaluate(PROBE);
        console.log(`\n=== ${theme} / ${scheme} / ${name} ===`);
        for (const line of checkOne(theme, scheme, name, probe, thresholds, failures)) {
          console.log("   " + line);
        }
        if (audit) {
          const elements = await page.evaluate(AUDIT);
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

  if (failures.length) {
    console.error(`\n${failures.length} problem(s):`);
    for (const failure of failures) console.error("  - " + failure);
    process.exit(1);
  }
  console.log(`\nAll checks passed for ${themes.length} theme(s) x ${schemes.length} scheme(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
