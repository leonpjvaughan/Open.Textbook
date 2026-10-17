/*
 * Check the figure kit's DOM contract through a real page.
 *
 * The pure layer is `tools kit-pure`, which runs under plain `node`. This is the half
 * that needs a browser, because most of the contract is DOM behaviour: a `role`, a
 * live region that can announce a value, one focus stop per control, a mark that
 * carries a colour class rather than a colour.
 *
 * Usage: tools kit [siteDir] [route]
 */
import fs from "node:fs";
import path from "node:path";
import {
  ORIGIN,
  launchBrowser,
  openContext,
  serveStatic,
} from "../lib/browser.js";

async function probe(kitPath: string) {
  const kit = await import(kitPath);

  const el = document.createElement("maths-figure");
  document.body.append(el);
  const { svg, readout, controls } = kit.panel(el, {
    label: "A drawing for the check",
    width: 200,
    height: 100,
  });
  kit.slider(el, { id: "plain", label: "Plain", min: 0, max: 10, value: 3 });
  kit.slider(el, { id: "quiet", label: "No value shown", min: 0, max: 10, value: 4, show: false });
  kit.slider(el, { id: "unit", label: "With a unit", min: 0, max: 300, value: 200, unit: "\u03a9" });
  const quiet = el.querySelector("input.quiet");

  const bare = document.createElement("maths-figure");
  document.body.append(bare);
  const made = kit.panel(bare, { drawing: false });

  return {
    svgRole: svg.getAttribute("role"),
    svgLabel: svg.getAttribute("aria-label"),
    svgHasHeight: svg.hasAttribute("height"),
    readoutLive: readout.getAttribute("aria-live"),
    readoutRole: readout.getAttribute("role"),
    controlsIsElement: !!controls && controls.tagName === "DIV",
    quietHasOutput: !!quiet.closest("label").querySelector("output"),
    unitOutput: [...el.querySelectorAll("output")].pop().textContent,
    fmtAsMapCallback: [1.23456, 7.89012, 3.45678].map(kit.fmt),
    signedPositive: kit.signed(3),
    signedNegative: kit.signed(-3.5),
    bareSvg: made.svg,
    bareSurfaces: bare.querySelectorAll("svg").length,

    // The size scale and the two string helpers. `SIZE` is checked by value because
    // the phone floor is arithmetic: rendered size is `font-size` times the drawing's
    // width over the viewBox width. The drawing is 322.8px at a 390px viewport, so a
    // 16-unit label is 9.2px and a 15-unit one was 8.6px — below the 9px floor. Four
    // modules had drifted below it while every module's own attributes looked
    // reasonable, and the guard then used the wrong width and passed a bad size.
    size: kit.SIZE,

    // `label` must produce a well-formed element with a colour class by default,
    // because a `<text>` with no `fig-*`/`text-*` class is painted with `fill`'s
    // initial black and disappears on a dark panel. That defect was found 18 times.
    labelDefault: kit.label({ x: 10, y: 20, text: "Hi" }),
    labelAnchored: kit.label({ x: 1, y: 2, text: "0", anchor: "end", size: 15 }),
    labelEscaped: kit.label({ x: 0, y: 0, text: "a & b < c" }),

    // `scale` maps a domain onto a range. The y-axis case is the one that gets
    // flipped by hand, so it is checked directly. `.invert` is the mapping back, which
    // is what a drag needs: a pointer position is an SVG coordinate and the value is
    // what belongs there.
    scaleX: [0, 5, 10].map(kit.scale({ domain: [0, 10], range: [100, 500] })),
    scaleY: [0, 10].map(kit.scale({ domain: [0, 10], range: [400, 40] })),
    scaleInvert: [100, 300, 500].map(kit.scale({ domain: [0, 10], range: [100, 500] }).invert),
    scaleRoundTrip: kit.scale({ domain: [-2, 7], range: [30, 400] }).invert(
      kit.scale({ domain: [-2, 7], range: [30, 400] })(3.7),
    ),
    scaleDegenerate: (() => {
      try {
        kit.scale({ domain: [3, 3], range: [0, 1] });
        return "no error";
      } catch (e) {
        return e.message;
      }
    })(),

    // ── text ────────────────────────────────────────────────────────────────
    // `sigfig` is the reader's side of the `sigfigs` check the problem-bank verifier
    // makes: a rounded answer is a claim about how much of the measurement is real.
    sigfigs: [
      kit.sigfig(6, 2),
      kit.sigfig(300, 2),
      kit.sigfig(0.0012, 2),
      kit.sigfig(3.14159, 3),
      kit.sigfig(0.5, 2),
    ],
    coordRounded: kit.coord(183.99999999999997),
    escaped: kit.escape("a & b < c"),
    extentEmpty: kit.extent([]),
    extentFlat: kit.extent([3, 3]),
    extentPlain: kit.extent([1, 5, 2]),
    extentPicked: kit.extent([{ v: 4 }, { v: -1 }], (d) => d.v),
    ticks: [
      kit.ticks({ from: 0, to: 1, count: 5 }),
      kit.ticks({ from: 0, to: 10, count: 6 }),
      kit.ticks({ from: 0, to: 0.5, count: 5 }),
    ],

    // ── the marks ───────────────────────────────────────────────────────────
    // Every mark must default its colour class, or it ships in the initial paint and
    // vanishes on a dark panel. Every coordinate must be rounded, or the markup
    // doubles in size for precision no screen shows.
    marks: {
      line: kit.line({ x1: 0, y1: 0, x2: 10, y2: 10 }),
      circle: kit.circle({ cx: 5, cy: 5 }),
      rect: kit.rect({ x: 0, y: 0, width: 10, height: 4 }),
      polygon: kit.polygon({ points: [[0, 0], [10, 0], [5, 8]] }),
      path: kit.path({ d: "M0 0 L10 10" }),
      arrow: kit.arrow({ x1: 0, y1: 0, x2: 30, y2: 0 }),
    },
    // The axis helper returns the mappers as well as the string, so a module cannot
    // draw its data with different geometry from its own axes.
    axesKeys: Object.keys(kit.axes({ x: { domain: [0, 10] }, y: { domain: [0, 5] } })).sort(),
    axesDraw: kit.axes({ x: { domain: [0, 10], label: "t" }, y: { domain: [0, 5], label: "s" } }).draw,
    numberLineKeys: Object.keys(kit.numberLine({ min: -5, max: 5 })).sort(),
    numberLineHasArrow: /<polygon/.test(kit.numberLine({ min: -5, max: 5 }).draw),
    curveEmpty: kit.curve([], { x: (v) => v, y: (v) => v }),
    curveDraw: kit.curve([[0, 0], [1, 1], [2, 4]], { x: (v) => v * 10, y: (v) => v * 2 }),
    // A sample that is not finite must break the path rather than poison it: one
    // `NaN` in a path drops the whole line and looks like a missing curve.
    graphBreaksOnNaN: kit.graph((t) => (t === 0.5 ? NaN : t), {
      x: kit.scale({ domain: [0, 1], range: [0, 100] }),
      y: kit.scale({ domain: [0, 1], range: [100, 0] }),
      samples: 5,
    }),
    areaDraw: kit.area([[0, 0], [1, 1], [2, 0]], { x: (v) => v * 10, y: (v) => v * 2, baseline: 50 }),
    dotsDraw: kit.dots([[0, 0], [1, 1]], { x: (v) => v * 10, y: (v) => v * 2 }),
    barsDraw: kit.bars([{ from: 0, to: 1, value: 5 }, { from: 1, to: 2, value: 8 }], {
      x: (v) => v * 50,
      y: (v) => v * 10,
    }),

    // ── randomness ──────────────────────────────────────────────────────────
    // Seeded, because a figure that samples must be reproducible: two readers
    // comparing what they saw must be comparing the same data, and a browser test
    // cannot assert anything about data that changes on every load.
    seedSame: kit.seed(7).next() === kit.seed(7).next(),
    seedDiffers: kit.seed(7).next() !== kit.seed(8).next(),
    seedRange: (() => {
      const rng = kit.seed(1);
      let low = 1;
      let high = 0;
      for (let i = 0; i < 500; i += 1) {
        const n = rng.int(1, 6);
        low = Math.min(low, n);
        high = Math.max(high, n);
      }
      return [low, high];
    })(),
    seedShuffleKeepsItems: JSON.stringify(kit.seed(3).shuffle([1, 2, 3, 4, 5]).slice().sort()),

    // ── checking ────────────────────────────────────────────────────────────
    // Four outcomes, and the difference between the last two matters to a reader:
    // "wrong" is a mistake worth thinking about, "invalid" is a typing problem.
    checks: [
      kit.check("6", { answer: "6.0" }).state,
      kit.check("7", { answer: "6.0" }).state,
      kit.check("", { answer: "6" }).state,
      kit.check("abc", { answer: "6" }).state,
      kit.check("6.02", { answer: "6.0", tolerance: 0.01 }).state,
      kit.check("6.005", { answer: "6.0", tolerance: 0.01 }).state,
      kit.check("6.0 N", { answer: "6.0", unit: "N" }).state,
      kit.check("1/2", { answer: "0.5" }).state,
      kit.check("acute", { answer: "acute" }).state,
      kit.check("−3", { answer: "-3" }).state,
    ],
    // ── controls ────────────────────────────────────────────────────────────
    // Every control is a native element, and the composite ones carry a `.value`
    // like a `<select>` so `react()` binds any of them and a module has one shape to
    // learn rather than two.
    segmentedValue: (() => {
      const seg = kit.segmented(el, {
        label: "Pick",
        choices: [{ value: "a", label: "A" }, { value: "b", label: "B" }],
        value: "b",
      });
      const before = seg.value;
      seg.value = "a";
      return [before, seg.value, seg.querySelectorAll("input[type=radio]").length];
    })(),
    fieldNative: (() => {
      const typed = kit.field(el, { label: "Answer", type: "text", inputmode: "decimal" });
      const numeric = kit.field(el, { label: "Amount", type: "number" });
      return [typed.tagName, typed.getAttribute("inputmode"), numeric.getAttribute("inputmode")];
    })(),
    textareaNative: kit.textarea(el, { label: "Why?" }).tagName,
    buttonNative: (() => {
      let clicks = 0;
      const b = kit.button(el, { label: "Go", onClick: () => { clicks += 1; return true; } });
      b.click();
      // `pressed` is what makes it a toggle button; without it the button is an
      // action and `aria-pressed` would be a lie.
      const t = kit.button(el, { label: "Loud", pressed: false, onClick: () => true });
      const before = t.getAttribute("aria-pressed");
      t.click();
      return [b.tagName, b.type, b.getAttribute("aria-pressed"), clicks, t.getAttribute("aria-pressed"), before];
    })(),

    // A stepper is the step slider plus two buttons, and all three go through one
    // change path, so the buttons and the slider cannot disagree.
    stepper: (() => {
      const steps = [{ text: "one" }, { text: "two" }, { text: "three" }];
      const st = kit.stepper(el, { steps });
      let redraws = 0;
      kit.react(st, () => { redraws += 1; });
      const start = st.index;
      el.querySelectorAll("button")[el.querySelectorAll("button").length - 1].click();
      return [start, st.index, st.text, redraws > 1];
    })(),

    // A table is tabular data, so it is a real table with a caption and a scope on
    // every header — and its highlight follows a control without a rebuild.
    table: (() => {
      const t = kit.table(el, { columns: ["n", "T"], rows: [[1, 3], [2, 5]], caption: "Terms", highlight: 0 });
      const caption = t.querySelector("caption");
      const scope = t.querySelector("th");
      const before = t.querySelectorAll("tbody tr").length;
      t.update([[1, 3], [2, 5], [3, 9]], 1);
      return [t.tagName, caption ? caption.textContent : null, scope ? scope.getAttribute("scope") : null, before, t.querySelectorAll("tbody tr").length, t.querySelectorAll("tr.fig-row-active").length];
    })(),

    // The animation is an explicit loop with a scrubber, so every frame is reachable
    // without motion and the figure is complete for a reader who asked for less.
    animate: (() => {
      const frames = [];
      const a = kit.animate(el, { onFrame: (t) => frames.push(t) });
      const scrub = a.scrub;
      scrub.value = "0.5";
      kit.notify(scrub);
      return [scrub.tagName, scrub.type, frames.length > 0, frames[frames.length - 1]];
    })(),

    // The reader's side of "a computer checks every answer".
    answerBox: (() => {
      const readout = el.querySelector(".readout");
      const box = kit.answerBox(el, { answer: "6.0", unit: "N", readout });
      box.input.value = "6.0 N";
      const good = box.verify();
      const said = readout.textContent;
      box.input.value = "4";
      const bad = box.verify();
      return [good, bad, said, readout.textContent.includes("6.0")];
    })(),

    // A draggable handle must not be the only way to reach its value: a pointer is not
    // a keyboard, and ten modules already handle a pointer event with no guarantee.
    dragRefusesWithoutAControl: (() => {
      try {
        kit.draggable(document.createElementNS("http://www.w3.org/2000/svg", "circle"), {
          svg,
          toValue: () => 0,
        });
        return "no error";
      } catch (e) {
        return e.message.slice(0, 40);
      }
    })(),
    dragWritesTheControl: (() => {
      const x = kit.scale({ domain: [0, 10], range: [0, 200] });
      // A fixed-width host, so the rendered box is known and the pointer position
      // maps to a viewBox position that can be asserted exactly rather than roughly.
      const host = document.createElement("maths-figure");
      host.style.cssText = "display:block;width:400px";
      document.body.append(host);
      const surface = kit.panel(host, { label: "Drag test", width: 200, height: 100 }).svg;
      const control = kit.slider(host, { label: "Value", min: 0, max: 10, step: 0.1, value: 5, show: false });
      const handle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      handle.setAttribute("cx", "100");
      handle.setAttribute("cy", "50");
      handle.setAttribute("r", "6");
      surface.append(handle);
      const grip = kit.draggable(handle, { control, svg: surface, toValue: (p) => x.invert(p.x) });
      const box = surface.getBoundingClientRect();
      const at = (viewX) => ({ clientX: box.left + (viewX / 200) * box.width, clientY: box.top + box.height / 2 });
      const down = at(150);
      const move = at(50);
      handle.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, ...down }));
      handle.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, ...move }));
      handle.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, ...move }));
      // The keyboard path is the control, so the handle must not add a second focus stop.
      return [Number(control.value), handle.hasAttribute("tabindex"), typeof grip.destroy, box.width > 0];
    })(),

    // Storage that fails silently, because a reader in private mode should get a
    // figure that forgets rather than a figure that breaks.
    rememberSafe: (() => {
      try {
        const store = kit.remember("fig-check", null);
        const wrote = store.set({ hello: 1 });
        return [wrote, wrote ? JSON.stringify(store.get()) : "n/a", typeof store.clear];
      } catch (e) {
        return ["threw", e.message.slice(0, 40), "?"];
      }
    })(),
    hiddenIsOffscreen: (() => {
      const s = kit.hidden(el, "a long description");
      // The browser normalises `position:absolute` to `position: absolute` when it
      // serialises the attribute, so the raw string is returned and matched with a
      // space-tolerant pattern rather than the source's own spelling.
      return [s.tagName, s.getAttribute("style") || "", s.textContent];
    })(),
    descriptionLinked: (() => {
      const host = document.createElement("maths-figure");
      document.body.append(host);
      const made = kit.panel(host, { label: "Named", description: "A longer description of the drawing" });
      const id = made.svg.getAttribute("aria-describedby");
      const target = id ? host.querySelector(`#${id}`) : null;
      return [!!id, target ? target.textContent.slice(0, 14) : null];
    })(),
    captionElement: (() => {
      const host = document.createElement("maths-figure");
      document.body.append(host);
      return kit.panel(host, { drawing: false }).caption.tagName;
    })(),

    // A builder assembles and the module validates, so the kit owns the order, the
    // keyboard and the announcement and never judges the assembly.
    builder: (() => {
      const host = document.createElement("maths-figure");
      host.style.cssText = "display:block;width:420px";
      document.body.append(host);
      kit.panel(host, { label: "Build", drawing: false });
      const b = kit.builder(host, {
        label: "Add a particle",
        parts: [{ id: "p", label: "Proton" }, { id: "n", label: "Neutron" }],
        value: ["p"],
      });
      let redraws = 0;
      kit.react(b, () => { redraws += 1; });
      const parts = [...b.querySelectorAll("button")].slice(0, 2);
      const undo = [...b.querySelectorAll("button")].pop();
      parts[1].click();
      const added = b.value.join(",");
      const pressed = parts.map((x) => x.getAttribute("aria-pressed")).join(",");
      undo.click();
      return [added, b.value.join(","), redraws > 1, pressed, undo.tagName];
    })(),

    // The keypad inserts plain text at the caret and fires `input`, so what receives it
    // is still an ordinary field and the checker still reads a string.
    notate: (() => {
      const host = document.createElement("maths-figure");
      host.style.cssText = "display:block;width:420px";
      document.body.append(host);
      kit.panel(host, { label: "Keypad", drawing: false });
      const input = kit.field(host, { label: "Answer" });
      const pad = kit.notate(host, { input });
      input.value = "12";
      input.setSelectionRange(1, 1);
      let fired = 0;
      input.addEventListener("input", () => { fired += 1; });
      const first = pad.querySelector("button");
      first.click();
      return [input.value, input.selectionStart, fired, first.tagName];
    })(),

    // Endless practice, which is the only thing here that changes what a reader *does*
    // rather than what they see. The verdict has to follow the current question: a
    // stale answer is how this widget would teach something false.
    practice: (() => {
      const host = document.createElement("maths-figure");
      host.style.cssText = "display:block;width:420px";
      document.body.append(host);
      const { readout, caption } = kit.panel(host, { label: "Practice", drawing: false });
      const kinds = [{
        id: "double",
        build: (rng) => { const n = rng.int(3, 9); return { text: `Double ${n}.`, answer: 2 * n }; },
      }];
      const made = kit.practice(host, { kinds, seed: 3, readout, caption });
      const first = caption.textContent;
      const firstAnswer = made.exercise.answer;
      made.input.value = firstAnswer;
      const good = made.verify();
      const said = readout.textContent;
      [...host.querySelectorAll('button')].find((b) => b.textContent === 'Another question').click();
      const second = caption.textContent;
      const cleared = made.input.value === "";
      made.input.value = made.exercise.answer;
      const goodAfterNext = made.verify();
      // The answers must differ, or the check could pass by accident.
      const checks = [...host.querySelectorAll('button')].filter((b) => b.textContent === 'Check').length;
      return [first.startsWith("Double"), good, said, second !== first, cleared, goodAfterNext, firstAnswer !== made.exercise.answer, checks];
    })(),
  };
}

export async function run(argv: string[]): Promise<number> {
  const siteDir = path.resolve(argv[0] ?? "site");
  const route = argv[1] ?? "/gcse-maths/higher/";
  const kitPath = `${route.replace(/\/$/, "")}/assets/figures/kit.js`;

  const browser = await launchBrowser();
  let result;
  try {
    const context = await openContext(browser, { deviceScaleFactor: 1 });
    await serveStatic(context, siteDir);
    const page = await context.newPage();
    await page.goto(`${ORIGIN}${route}`, { waitUntil: "load" });
    result = await page.evaluate(probe, kitPath);
    await context.close();
  } finally {
    await browser.close();
  }

  const problems = [];
  const want = (what, got, expected) => {
    if (got !== expected) problems.push(`${what}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(got)}`);
  };

  want("the surface's role", result.svgRole, "img");
  if (!result.svgLabel) problems.push("the surface has no accessible name");
  want("the surface sets no pixel height", result.svgHasHeight, false);
  want("the readout is a live region", result.readoutLive, "polite");
  want("the readout is not role=img", result.readoutRole, null);
  want("panel returns its controls column", result.controlsIsElement, true);
  want("`show: false` adds no value display", result.quietHasOutput, false);
  want("a unit follows the number", result.unitOutput, "200 \u03a9");
  want("fmt as a map callback ignores the index", JSON.stringify(result.fmtAsMapCallback),
       JSON.stringify(["1.23", "7.89", "3.46"]));
  want("a positive signed number", result.signedPositive, "+ 3");
  want("a negative signed number", result.signedNegative, "\u2212 3.5");
  want("a figure with no drawing makes no surface", result.bareSvg, null);
  want("and puts none on the page", result.bareSurfaces, 0);

  // ── the size scale ────────────────────────────────────────────────────────
  //
  // Grounded in measurement, not taste. At a 390px viewport the `maths-figure`
  // element is 358px wide but carries 17.6px of padding on each side, so the drawing
  // is 322.8px and a 560-unit viewBox draws at 322.8 / 560 = 0.576. The smallest
  // named size must clear 9px at that scale. A module choosing its own number is how
  // four figures drifted below the floor while every one of their own attributes
  // looked reasonable. `audit-figures.cjs --mobile` measures what actually reaches the
  // screen; this checks the arithmetic the modules are told to rely on.
  //
  // The earlier value here was 358 / 560 — the element's width, not the drawing's —
  // and it passed `SIZE.tick` at 15 units (9.6px by that arithmetic) when the drawing
  // put it at 8.6px. A guard that measures the wrong box is worse than no guard.
  const PHONE_PANEL_PX = 358 - 2 * 17.6;
  const PHONE_SCALE = PHONE_PANEL_PX / 560;
  const FLOOR_PX = 9;
  if (!result.size || !Object.keys(result.size).length) {
    problems.push("the kit exports no SIZE scale, so every module picks its own number");
  }
  for (const [name, units] of Object.entries(result.size || {})) {
    const onPhone = units * PHONE_SCALE;
    if (onPhone < FLOOR_PX) {
      problems.push(
        `SIZE.${name} is ${units} units, which is ${onPhone.toFixed(1)}px at phone ` +
          `width - below the ${FLOOR_PX}px floor`,
      );
    }
  }

  // ── label ─────────────────────────────────────────────────────────────────
  //
  // A `<text>` with no `fig-*`/`text-*` class is painted with `fill`'s initial black and
  // disappears on a dark panel. That defect was found eighteen times by measurement, so
  // the helper carries the class by default rather than leaving it to the caller.
  const defaultLabel = result.labelDefault || "";
  if (!/^<text /.test(defaultLabel)) {
    problems.push(`label() does not return a <text> element: ${defaultLabel.slice(0, 60)}`);
  }
  if (!/class="text-ink"/.test(defaultLabel)) {
    problems.push(
      "label() has no default colour class, so a caller that forgets one gets " +
        "initial-black text on a dark panel",
    );
  }
  if (!/font-size="16"/.test(defaultLabel)) {
    problems.push(`label() does not default to SIZE.label: ${defaultLabel.slice(0, 60)}`);
  }
  if (!/text-anchor="end"/.test(result.labelAnchored || "")) {
    problems.push("label() ignores its `anchor` argument");
  }
  if (!/font-size="15"/.test(result.labelAnchored || "")) {
    problems.push("label() ignores its `size` argument");
  }
  if (!/a &amp; b &lt; c/.test(result.labelEscaped || "")) {
    problems.push(`label() does not escape its text: ${result.labelEscaped}`);
  }

  // ── scale ─────────────────────────────────────────────────────────────────
  //
  // The y-axis case is the one that gets flipped when written by hand: a value that
  // counts upwards onto an axis that counts downwards.
  const scaleX = result.scaleX || [];
  want("scale maps the domain's low end", scaleX[0], 100);
  want("scale maps the domain's middle", scaleX[1], 300);
  want("scale maps the domain's high end", scaleX[2], 500);
  const scaleY = result.scaleY || [];
  want("scale handles a range that counts down", scaleY[0], 400);
  want("scale handles a range that counts down at the top", scaleY[1], 40);
  if (!/no width/.test(result.scaleDegenerate || "")) {
    problems.push(
      "scale() accepts a domain with no width, which would divide by zero and " +
        "produce NaN coordinates rather than failing",
    );
  }
  want("scale().invert undoes the mapping", JSON.stringify(result.scaleInvert), JSON.stringify([0, 5, 10]));
  if (Math.abs(result.scaleRoundTrip - 3.7) > 1e-9) {
    problems.push(
      `scale().invert does not round-trip: got ${result.scaleRoundTrip}, expected 3.7. ` +
        "A drag maps a pointer position back to a value, so the inverse has to be right.",
    );
  }

  // ── text ────────────────────────────────────────────────────────────────────
  //
  // `sigfig` is the reader's side of the bank's `sigfigs` check: a rounded answer is a
  // claim about how much of the measurement is real, so `6`, `6.0` and `6.00` are three
  // different statements and only one of them is right.
  want("sigfig keeps a trailing zero", result.sigfigs[0], "6.0");
  want("sigfig uses scientific notation when zeros would hold the place", result.sigfigs[1], "3.0e2");
  want("sigfig keeps a small value in place value", result.sigfigs[2], "0.0012");
  want("sigfig rounds to the figures asked for", result.sigfigs[3], "3.14");
  want("sigfig pads a trailing zero on a half", result.sigfigs[4], "0.50");
  want("coord rounds the float SVG would carry", result.coordRounded, "184.0");
  want("escape closes the three unsafe characters", result.escaped, "a &amp; b &lt; c");
  want("extent of nothing is a usable domain", JSON.stringify(result.extentEmpty), "[0,1]");
  want("extent of one value is not zero-width", JSON.stringify(result.extentFlat), "[3,4]");
  want("extent of several", JSON.stringify(result.extentPlain), "[1,5]");
  want("extent reads a picked field", JSON.stringify(result.extentPicked), JSON.stringify([-1, 4]));
  want("ticks on 0..1", JSON.stringify(result.ticks[0]), JSON.stringify([0, 0.2, 0.4, 0.6, 0.8, 1]));
  want("ticks on 0..10", JSON.stringify(result.ticks[1]), JSON.stringify([0, 2, 4, 6, 8, 10]));
  want("ticks on 0..0.5", JSON.stringify(result.ticks[2]), JSON.stringify([0, 0.1, 0.2, 0.3, 0.4, 0.5]));

  // ── the marks ───────────────────────────────────────────────────────────────
  //
  // Every mark defaults its colour class and rounds its coordinates. The colour class
  // is the same defect `label()` exists to prevent — a shape with no `fig-*` class is
  // painted from the initial value and its stroke is invisible on a dark panel — and
  // the rounding is what stopped 44 modules shipping `183.99999999999997` to a reader.
  const marks = result.marks || {};
  const markNeeds = [
    ["line", "fig-ink"],
    ["circle", "fig-ink"],
    ["rect", "fig-ink"],
    ["polygon", "fig-ink"],
    ["path", "fig-ink"],
    ["arrow", "fig-ink"],
  ];
  for (const [name, cls] of markNeeds) {
    const markup = marks[name] || "";
    if (!markup) {
      problems.push(`the ${name} mark draws nothing`);
      continue;
    }
    if (!markup.includes(`class="${cls}"`)) {
      problems.push(
        `the ${name} mark has no default colour class, so a caller that forgets one ` +
          "gets a shape painted from the initial value and invisible on a dark panel",
      );
    }
    if (/\d\.\d{3,}/.test(markup)) {
      problems.push(
        `the ${name} mark ships a coordinate with more than one decimal place: ` +
          markup.slice(0, 80),
      );
    }
  }
  if (!/<polygon/.test(marks.arrow || "")) {
    problems.push("arrow() draws no head, so it is a line rather than an arrow");
  }
  if (result.axesKeys.join(",") !== "box,draw,x,xTicks,y,yTicks") {
    problems.push(
      `axes() does not return its mappers as well as its string: ${JSON.stringify(result.axesKeys)}. ` +
        "A module must draw its data with the same geometry the axes used.",
    );
  }
  if (!/<text /.test(result.axesDraw || "")) {
    problems.push("axes() draws no tick labels");
  }
  if (result.numberLineKeys.join(",") !== "box,draw,x,y") {
    problems.push(`numberLine() returns ${JSON.stringify(result.numberLineKeys)}`);
  }
  if (!result.numberLineHasArrow) problems.push("numberLine() draws no axis arrow");
  want("curve() of nothing is empty, not a broken path", result.curveEmpty, "");
  if (!/^<path d="M0\.0 0\.0 L10\.0 2\.0 L20\.0 8\.0"/.test(result.curveDraw || "")) {
    problems.push(`curve() does not map its points in order: ${(result.curveDraw || "").slice(0, 80)}`);
  }
  if (/NaN/.test(result.graphBreaksOnNaN || "")) {
    problems.push(
      "graph() puts a NaN into the path when a sample is not finite, which drops the " +
        "whole line instead of breaking it",
    );
  }
  if ((result.graphBreaksOnNaN || "").split("M").length - 1 < 2) {
    problems.push("graph() does not break the path at a non-finite sample");
  }
  if (!/currentColor/.test(result.areaDraw || "") || !/Z/.test(result.areaDraw || "")) {
    problems.push(`area() does not close a filled region: ${(result.areaDraw || "").slice(0, 80)}`);
  }
  if (!/<circle/.test(result.dotsDraw || "")) problems.push("dots() draws no circles");
  if ((result.barsDraw || "").split("<rect").length - 1 !== 2) {
    problems.push("bars() does not draw one rect per item");
  }

  // ── randomness ──────────────────────────────────────────────────────────────
  //
  // Seeded, because a figure that samples must be reproducible and a browser test
  // cannot assert anything about data that changes on every load.
  want("a seed repeats", result.seedSame, true);
  want("a different seed differs", result.seedDiffers, true);
  want("a seeded integer stays in range", JSON.stringify(result.seedRange), JSON.stringify([1, 6]));
  want("a seeded shuffle keeps every item", result.seedShuffleKeepsItems, "[1,2,3,4,5]");

  // ── checking ────────────────────────────────────────────────────────────────
  want(
    "the four verdicts of check()",
    JSON.stringify(result.checks),
    JSON.stringify([
      "correct",
      "wrong",
      "empty",
      "invalid",
      "wrong",
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
    ]),
  );

  // ── controls ────────────────────────────────────────────────────────────────
  //
  // A composite control carries a `.value` like a `<select>`, so `react()` binds it
  // and a module has one shape to learn rather than two.
  want("segmented reads and writes like a select", JSON.stringify(result.segmentedValue), JSON.stringify(["b", "a", 2]));
  want(
    "field is a native input and asks for the right keypad",
    JSON.stringify(result.fieldNative),
    JSON.stringify(["INPUT", "decimal", "decimal"]),
  );
  want("textarea is a native textarea", result.textareaNative, "TEXTAREA");
  want(
    "button is a real button, and only a toggle carries aria-pressed",
    JSON.stringify(result.buttonNative),
    JSON.stringify(["BUTTON", "button", null, 1, "true", "false"]),
  );
  want(
    "a stepper advances and narrates",
    JSON.stringify(result.stepper),
    JSON.stringify([0, 1, "two", true]),
  );
  want(
    "a table is tabular, captioned and browsable",
    JSON.stringify(result.table),
    JSON.stringify(["TABLE", "Terms", "col", 2, 3, 1]),
  );
  want(
    "an animation is scrubbable without motion",
    JSON.stringify(result.animate),
    JSON.stringify(["INPUT", "range", true, 0.5]),
  );
  want(
    "answerBox verifies against the proved answer",
    JSON.stringify(result.answerBox),
    JSON.stringify([true, false, "Correct.", true]),
  );
  if (!/control is required/.test(result.dragRefusesWithoutAControl || "")) {
    problems.push(
      "draggable() accepts a handle with no backing control, so the pointer would be " +
        "the only way to reach the value and a keyboard reader could not use the figure",
    );
  }
  want(
    "a drag writes through its control and adds no second focus stop",
    JSON.stringify(result.dragWritesTheControl),
    JSON.stringify([2.5, false, "function", true]),
  );
  want(
    "remember() round-trips or fails quietly",
    JSON.stringify(result.rememberSafe),
    JSON.stringify([true, '{"hello":1}', "function"]),
  );
  const hidden = result.hiddenIsOffscreen || [];
  if (hidden[0] !== "SPAN") problems.push(`hidden() returns ${hidden[0]}`);
  if (!/position:\s*absolute/.test(hidden[1] || "")) {
    problems.push(
      "hidden() is visible on the page, so a description meant for a screen reader " +
        `would be read by everyone: ${String(hidden[1]).slice(0, 60)}`,
    );
  }
  if (hidden[2] !== "a long description") problems.push("hidden() lost its text");
  want("a description is linked to the drawing", JSON.stringify(result.descriptionLinked), JSON.stringify([true, "A longer descr"]));
  want("panel returns a caption element", result.captionElement, "P");
  want(
    "a builder adds in order, undoes, announces and redraws",
    JSON.stringify(result.builder),
    JSON.stringify(["p,n", "p", true, "true,true", "BUTTON"]),
  );
  want(
    "a keypad inserts at the caret and fires input",
    JSON.stringify(result.notate),
    JSON.stringify(["1/2", 2, 1, "BUTTON"]),
  );
  want(
    "practice verifies the current question and moves on",
    JSON.stringify(result.practice),
    JSON.stringify([true, true, "Correct.", true, true, true, true, 1]),
  );


  if (problems.length) {
    console.error("the figure kit does not keep its contract:");
    for (const problem of problems) console.error(`   ${problem}`);
    return 1;
  }
  console.log("figure kit: contract kept");
  return 0;
}
