/*
 * Read what each figure claims, and check it exactly.
 *
 * The readout is where a figure states its working — "€1,500.00 × 0.065 × 4 = €390.00"
 * — and nothing read it. Two of fourteen figures added on 2026-10-17 printed a
 * multiplication that does not give the number beside it, and every check passed:
 * structure, colour, contrast, legibility and the kit's DOM contract all measure the
 * drawing, not the sentence under it.
 *
 * **An assertion is data.** A figure calls `claim([{expression, values, answer, shown}])`
 * once per redraw; `panel()` records it on the element, and `--verify` hands the lot to
 * `python -m textbook.working`, which evaluates each expression with the same exact
 * computer algebra the problem banks use. This command collects honest data — at
 * several settings, because the defect showed up at 6.5% and not at 5% — and reports
 * how many figures state arithmetic and declare none.
 *
 * The sentence heuristic that first tried to parse the readout is gone. It needed
 * `<sup>`, `√`, `%` and thousands separators to read 43% of what it saw, and every new
 * formatting choice was a new case.
 *
 *     tools readout <siteDir> [--only slug] [--json file] [--defaults-only]
 *
 * That line is the `SURFACE` table below, rendered; `tools help readout` is generated
 * from the same table, and the parser reads nothing else.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { launchBrowser, openContext, serveStatic, ORIGIN } from "../lib/browser.js";
import { parseArgs, type Surface } from "../lib/flags.js";
import { discoverFigures } from "../lib/site.js";
import { mapPool } from "../lib/pool.js";

export type Control = {
  kind: "range" | "select" | "checkbox";
  index: number;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  values?: string[];
  checked?: boolean;
};

export type Override = { kind: Control["kind"]; index: number; value: number | string | boolean };

export const SURFACE: Surface = {
  positional: [{ name: "siteDir", help: "the built site to read", required: false }],
  flags: {
    only: { kind: "string", value: "<slug>", help: "read one figure" },
    json: { kind: "string", value: "<file>", help: "write what each figure declares here" },
    "defaults-only": { kind: "boolean", help: "read at the default settings only" },
    verify: { kind: "boolean", help: "hand the claims to `python -m textbook.working`" },
    settings: {
      kind: "string",
      value: "<n>",
      default: "6",
      help: "how many settings to try, the default and its neighbours",
    },
    jobs: { kind: "string", value: "<n>", help: "pages in flight at once; one unless asked" },
  },
};

export function readControls(slug: string): Control[] {
  const figure = document.querySelector(`maths-figure[data-figure="${slug}"]`);
  if (!figure) return [];
  const out: unknown[] = [];
  for (const el of figure.querySelectorAll("input, select")) {
    const input = el as HTMLInputElement;
    if (input.tagName === "SELECT") {
      const select = input as unknown as HTMLSelectElement;
      out.push({
        kind: "select",
        index: [...figure.querySelectorAll("select")].indexOf(select),
        values: [...select.options].map((o) => o.value).slice(0, 8),
      });
    } else if (input.type === "range") {
      const ranges = [...figure.querySelectorAll('input[type="range"]')] as HTMLInputElement[];
      out.push({
        kind: "range",
        index: ranges.indexOf(input),
        min: Number(input.min),
        max: Number(input.max),
        step: Number(input.step) || 1,
        value: Number(input.value),
      });
    } else if (input.type === "checkbox") {
      const boxes = [...figure.querySelectorAll('input[type="checkbox"]')] as HTMLInputElement[];
      out.push({ kind: "checkbox", index: boxes.indexOf(input), checked: input.checked });
    }
  }
  return out as Control[];
}

export function applySetting(input: {
  slug: string;
  controls: Control[];
  overrides: Override[];
}): void {
  const { slug, controls, overrides } = input;
  const figure = document.querySelector(`maths-figure[data-figure="${slug}"]`);
  if (!figure) return;
  const ranges = [...figure.querySelectorAll('input[type="range"]')] as HTMLInputElement[];
  const selects = [...figure.querySelectorAll("select")] as unknown as HTMLSelectElement[];
  const boxes = [...figure.querySelectorAll('input[type="checkbox"]')] as HTMLInputElement[];
  for (const control of controls) {
    if (control.kind === "range" && control.value !== undefined) {
      const el = ranges[control.index];
      if (el) el.value = String(control.value);
    } else if (control.kind === "select" && control.values?.length) {
      const el = selects[control.index];
      if (el) el.value = control.values[0];
    } else if (control.kind === "checkbox" && control.checked !== undefined) {
      const el = boxes[control.index];
      if (el) el.checked = control.checked;
    }
  }
  for (const override of overrides) {
    const el =
      override.kind === "range"
        ? ranges[override.index as number]
        : override.kind === "select"
          ? (selects[override.index as number] as unknown as HTMLInputElement)
          : boxes[override.index as number];
    if (!el) continue;
    if (override.kind === "checkbox") el.checked = Boolean(override.value);
    else el.value = String(override.value);
  }
  for (const el of [...ranges, ...selects, ...boxes]) {
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

export function readWorking(slug: string): unknown[] {
  const figure = document.querySelector(`maths-figure[data-figure="${slug}"]`);
  if (!figure) return [];
  const raw = figure.getAttribute("data-working");
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function readoutText(slug: string): string {
  const figure = document.querySelector(`maths-figure[data-figure="${slug}"]`);
  if (!figure) return "";
  const live = figure.querySelector("[aria-live], .fig-out, .fig-readout");
  if (!live) return "";
  const clone = live.cloneNode(true) as HTMLElement;
  for (const sup of [...clone.querySelectorAll("sup")]) sup.replaceWith(`^${sup.textContent}`);
  for (const sub of [...clone.querySelectorAll("sub")]) sub.replaceWith(`_${sub.textContent}`);
  return (clone.textContent || "").trim();
}

export function settingsFor(controls: Control[], cap: number, defaultsOnly: boolean): Override[][] {
  if (defaultsOnly) return [[]];
  const settings: Override[][] = [[]];
  for (const control of controls) {
    const candidates: (number | string | boolean)[] = [];
    if (control.kind === "range" && control.min !== undefined && control.max !== undefined) {
      const { min, max, step = 1, value = min } = control;
      const snap = (n: number) => Math.round(n / step) * step;
      candidates.push(min, max);
      const mid = snap(min + (max - min) * 0.62);
      if (mid !== value && mid !== min && mid !== max) candidates.push(mid);
    } else if (control.kind === "select") {
      for (const option of (control.values || []).slice(1)) candidates.push(option);
    } else if (control.kind === "checkbox") {
      candidates.push(!control.checked);
    }
    for (const value of candidates) {
      if (settings.length >= cap) break;
      settings.push([{ kind: control.kind, index: control.index, value }]);
    }
  }
  return settings;
}

export async function run(argv: string[]): Promise<number> {
  const { values, positional } = parseArgs(argv, SURFACE);

  const siteDir = positional[0] ?? "site";
  const only = values.only ? String(values.only) : "";
  const jsonOut = values.json ? String(values.json) : "";
  const defaultsOnly = values["defaults-only"] === true;
  const verify = values.verify === true;
  const jobsFlag = Number(values.jobs) || 0;
  const cap = Number(values.settings) || 10;

  const pages = discoverFigures(siteDir);
  let slugs = Object.keys(pages).sort();
  if (only) slugs = slugs.filter((s) => s === only);
  if (!slugs.length) {
    console.error(`no figures found under ${siteDir}`);
    return 2;
  }

  const browser = await launchBrowser();
  const context = await openContext(browser, {
    scheme: "light",
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    blockServiceWorkers: true,
  });
  await serveStatic(context, siteDir);
  const jobs = Math.max(1, Math.min(jobsFlag || 1, 8));
  const pagesPool = await Promise.all(Array.from({ length: jobs }, () => context.newPage()));

  const records: {
    slug: string;
    route: string;
    settings: Override[];
    readout: string;
    claims: unknown[];
  }[] = [];
  let declared = 0;
  const undeclaredSlugs: string[] = [];
  let readouts = 0;

  await mapPool(slugs, jobs, async (slug, index) => {
    const page = pagesPool[index % jobs]!;
    const route = pages[slug][0];
    let figureDeclared = 0;
    let figureStatesArithmetic = false;
    try {
      await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" });
      await page
        .waitForFunction(
          (s: string) => {
            const figure = document.querySelector(`maths-figure[data-figure="${s}"]`);
            return !!figure && !!figure.querySelector("svg, canvas, input, select, button, .fig");
          },
          slug,
          { timeout: 8000 },
        )
        .catch(() => {});
      await page.waitForTimeout(60);
      const controls = (await page.evaluate(readControls, slug)) as Control[];
      const settings = settingsFor(controls, cap, defaultsOnly);
      const seen = new Set<string>();
      for (const overrides of settings) {
        await page.evaluate(applySetting, { slug, controls, overrides });
        await page.waitForTimeout(40);
        const text = (await page.evaluate(readoutText, slug)) as string;
        const claims = (await page.evaluate(readWorking, slug)) as unknown[];
        if (!text || seen.has(text)) continue;
        seen.add(text);
        readouts += 1;
        if (/\d\s*[\u00d7\u00f7]\s*\d|\d\s*=\s*[\d\u00a3\u20ac\u00a3]/.test(text)) {
          figureStatesArithmetic = true;
        }
        if (claims.length) {
          figureDeclared += 1;
          records.push({ slug, route, settings: overrides, readout: text, claims });
        }
      }
    } catch (error) {
      console.error(`\n  ${slug}: ${String(error).slice(0, 160)}`);
    }
    if (figureDeclared) declared += 1;
    else if (figureStatesArithmetic) undeclaredSlugs.push(slug);
    process.stdout.write(".");
  });
  for (const page of pagesPool) await page.close();
  process.stdout.write("\n");
  await browser.close();

  const jsonPath = jsonOut || (verify ? path.join(os.tmpdir(), "textbook-claims.json") : "");
  if (jsonPath) fs.writeFileSync(jsonPath, JSON.stringify(records, null, 1));

  const claimCount = records.reduce((total, record) => total + record.claims.length, 0);
  console.log(
    `  ${slugs.length} figures, ${readouts} readouts; ` +
      `${declared} declare ${claimCount} claim(s), ${undeclaredSlugs.length} state arithmetic and declare none`,
  );
  if (verify) {
    try {
      execFileSync("uv", ["run", "python", "-m", "textbook.working", jsonPath], {
        stdio: "inherit",
      });
      return 0;
    } catch (error) {
      const status = (error as { status?: number }).status;
      return typeof status === "number" ? status : 1;
    }
  }
  if (undeclaredSlugs.length) {
    console.log(
      `  ${undeclaredSlugs.length} figure(s) print arithmetic and declare no claim — ` +
        "call `claim([...])` from the panel so the verifier can prove it:",
    );
    for (const slug of undeclaredSlugs.sort()) console.log(`    ${slug}`);
  }
  return 0;
}
