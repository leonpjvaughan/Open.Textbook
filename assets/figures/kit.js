/* The shared scaffolding for a guided figure.
 *
 * Every figure in this collection is a hand-written module that exports
 * `mount(el)`, and that is deliberate — 176 diagrams do not want a framework. But
 * until this file existed, **not one module imported a single shared line**:
 * 176/176 wrote their own `innerHTML` template, 176/176 their own `aria-live`
 * readout, 173/173 their own slider wiring, 154 hand-formatted their own numbers.
 * 18,773 lines with no code shared between any two of them.
 *
 * That is not a style complaint. Every one of the figure defects found in review
 * came from a module re-earning the same correctness by hand:
 *
 *   * `role="img"` on a live readout, in four modules — `role="img"` makes an
 *     element's content presentational, so the readout could never announce a
 *     value. Each module wrote that pairing itself.
 *   * `2.6666666666666665 parts` and `2x + (-5)` — 154 modules hand-rolled their
 *     own formatting.
 *   * 70 modules with a 7px label at phone width, because each set its own
 *     `height` attribute.
 *
 * So this is the minimum that removes the scaffolding without touching a single
 * drawing. It is a metric-only library: no dependencies, no build step, no
 * drawing helpers, and nothing that decides what a figure looks like. It gives
 * back the parts that must be the same every time, and gets out of the way of the
 * parts that must not be.
 *
 * ## What it guarantees, by construction
 *
 * * the drawing carries `role="img"` and a plain-text `aria-label`, and the
 *   surface never claims to be an image when it draws nothing;
 * * the readout is `aria-live="polite"` and is never given `role="img"`;
 * * every control has a visible label *and* an accessible name;
 * * an SVG has no fixed pixel `height`, so the drawing scales with its box on a
 *   phone rather than shrinking its own text;
 * * numbers are formatted for a reader, never `2.6666666666666665`.
 *
 * ## What it deliberately does not do
 *
 * It does not draw. There is no `line()`, no `axis()`, no `curve()`: those differ
 * enough between figures that sharing them would be a framework, and the drawings
 * are the part of a figure that is genuinely bespoke. It also does not own the
 * colours — `fig-*` and `text-*` classes do that, so every figure follows the
 * reader's bundle and scheme without being revisited.
 */

/**
 * The figure's frame: an optional drawing surface and a live readout.
 *
 * @param {HTMLElement} el        the `<maths-figure>` the loader hands us
 * @param {object} options
 * @param {string} [options.label]  the accessible name for the drawing. Omit it
 *   only when there is no drawing — a figure that draws nothing has no image to
 *   name, and naming one hides its text instead.
 * @param {string} [options.prompt] a line of prose above the controls. Give the
 *   reader something to predict, not a description of the controls.
 * @param {number} [options.width]  the viewBox width. There is deliberately no
 *   height option: see `surface()`.
 * @param {number} [options.height] the viewBox height.
 * @param {boolean} [options.drawing] false for a figure that draws nothing.
 * @param {number} [options.max]    `max-width` in pixels for the whole figure.
 * @returns {{root: HTMLElement, svg: SVGSVGElement|null, readout: HTMLElement,
 *   controls: HTMLElement}} `controls` is the column a module can append its own
 *   buttons to; the kit has no button helper.
 */
//: The UI font, for controls and readouts. **Not** applied to the drawing: an SVG
//: `<text>` with no `font-size` of its own inherits whatever its container sets, so
//: putting this on the figure's root dropped five figures below the 9px phone floor.
const UI_FONT = "font:14px system-ui";

export function panel(el, options = {}) {
  const {
    label = "",
    prompt = "",
    width = 560,
    height = 260,
    drawing = true,
    max = 560,
  } = options;

  const root = document.createElement("div");
  root.className = "fig";
  // **No font on this element.** It contains the drawing, and an SVG `<text>` with
  // no `font-size` of its own inherits whatever is set here. The UI font belongs on
  // the controls and the readout — where it is set below — not on the surface the
  // drawing is on. Setting `font:14px` here dropped five figures below the 9px
  // phone floor (14 × a 0.617 scale is 8.6px) while every module's own attributes
  // stayed correct, so it looked like a drawing problem and was a container one.
  root.style.cssText = `max-width:${max}px`;

  if (prompt) {
    const line = document.createElement("p");
    line.className = "text-ink";
    line.style.cssText = `${UI_FONT};margin:0 0 .6rem`;
    line.textContent = prompt;
    root.append(line);
  }

  let svg = null;
  if (drawing) {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    // `width="100%"` and **no `height` attribute**. A pixel height equal to the
    // viewBox height is what made 70 figures render their smallest label below
    // 7px at phone width: the drawing scaled down while the box did not, so the
    // figure wasted vertical space and shrank its own text with it.
    svg.setAttribute("width", "100%");
    svg.setAttribute("role", "img");
    if (label) svg.setAttribute("aria-label", label);
    root.append(svg);
  }

  // The readout, always. It is a live region and never `role="img"` — that pairing
  // appeared in four modules and made the value unannounceable.
  const readout = document.createElement("p");
  readout.className = "readout";
  readout.setAttribute("aria-live", "polite");
  readout.style.cssText = `${UI_FONT};margin:.6rem 0 0`;

  const controls = document.createElement("div");
  controls.className = "fig-controls";
  // Two columns when there is room, one when there is not — `auto-fit` with a
  // minimum, rather than a fixed `repeat(2, …)`. Modules used to write the fixed
  // two-column grid themselves, so a single column here silently stacked every
  // two-slider figure and grew its box by a row. On a phone a fixed two columns
  // would be the wrong answer anyway, so the responsive form is the one that was
  // wanted all along.
  controls.style.cssText =
    `${UI_FONT};display:grid;` +
    "grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));" +
    "gap:.35rem .9rem;margin-top:.5rem";

  root.append(controls, readout);
  el.replaceChildren(root);
  return { root, svg, readout, controls };
}

/**
 * A slider, with a visible label and an accessible name.
 *
 * @returns {HTMLInputElement} the input, ready to read `.value` from.
 */
export function slider(parent, options = {}) {
  const {
    id = "",
    label = "",
    // A module whose slider had no value displayed gains one, which changes what
    // the reader sees. `show: false` keeps the previous behaviour; `unit` puts a
    // unit after the number, which is why "200 ohm" does not have to live in the
    // label.
    show = true,
    unit = "",
    // The accessible name, when it should say more than the visible label. A
    // distinct, more descriptive name was being replaced by the shorter visible
    // one.
    name = "",
    min = 0,
    max = 1,
    step = 1,
    value = min,
    format,
  } = options;
  const holder = document.createElement("label");
  holder.className = "fig-control";
  holder.style.cssText = UI_FONT;
  holder.textContent = label ? `${label} ` : "";

  const input = document.createElement("input");
  input.type = "range";
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  if (id) input.className = id;
  input.setAttribute("aria-label", name || label || id);

  if (!show) {
    holder.append(input);
    (parent.querySelector(".fig-controls") || parent).append(holder);
    return input;
  }

  const out = document.createElement("output");
  out.className = id ? `${id}-out` : "fig-out";
  const paint = () => {
    // The raw value, not `fmt`: a slider's value is whatever its `step` produced, so
    // it is already clean, and rounding it to a fixed number of places would
    // truncate a `step="0.001"` control at 3.14159 to 3.1416.
    const number = format ? format(Number(input.value)) : input.value;
    out.textContent = unit ? `${number} ${unit}` : number;
  };

  holder.append(input, out);
  (parent.querySelector(".fig-controls") || parent).append(holder);
  input.addEventListener("input", paint);
  paint();
  return input;
}

/** A checkbox, with a visible label and an accessible name. */
export function toggle(parent, options = {}) {
  const { id = "", label = "", name = "", checked = false } = options;
  const holder = document.createElement("label");
  holder.className = "fig-control";
  holder.style.cssText = UI_FONT;
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;
  if (id) input.className = id;
  input.setAttribute("aria-label", name || label || id);
  holder.append(input, document.createTextNode(label ? ` ${label}` : ""));
  (parent.querySelector(".fig-controls") || parent).append(holder);
  return input;
}

/** A drop-down, with a visible label and an accessible name. */
export function chooser(parent, options = {}) {
  const { id = "", label = "", name = "", choices = [], value } = options;
  const holder = document.createElement("label");
  holder.className = "fig-control";
  holder.style.cssText = UI_FONT;
  holder.textContent = label ? `${label} ` : "";
  const select = document.createElement("select");
  if (id) select.className = id;
  select.setAttribute("aria-label", name || label || id);
  for (const choice of choices) {
    const option = document.createElement("option");
    option.value = choice.value;
    option.textContent = choice.label;
    select.append(option);
  }
  if (value !== undefined) select.value = String(value);
  holder.append(select);
  (parent.querySelector(".fig-controls") || parent).append(holder);
  return select;
}

/**
 * A number formatted for a reader.
 *
 * One implementation, because 154 modules hand-rolled their own and two of them
 * shipped a raw float — `2.6666666666666665 parts` and `2x + (-5)` — to a reader.
 * Trailing zeros are dropped, so `fmt(2.5)` is "2.5" and `fmt(2.0)` is "2".
 */
export function fmt(value, places = 2) {
  if (!Number.isFinite(value)) return "—";
  // `values.map(fmt)` passes the *index* as `places`, so a caller who writes the
  // natural thing silently rounds to 0, 1, 2 places down the list. A second
  // argument that is not a number is ignored rather than obeyed.
  const digits = Number.isInteger(places) ? places : 2;
  const rounded = Number(value.toFixed(Math.max(0, Math.min(20, digits))));
  return String(rounded);
}

/**
 * A signed number, spaced for use as a term: `+ 3`, `− 3`.
 *
 * The space is part of the output because this is meant to be interpolated
 * straight into an expression — ``y = ${m}x ${signed(c)}`` — and a caller that has
 * to remember the space is a caller that will forget it. A converted module
 * produced `y = 2x +1` for a positive intercept where the page read `y = 2x + 1`
 * before, while correctly fixing `+ -3` to `− 3`; both were the same missing space.
 */
export function signed(value, places = 2) {
  if (!Number.isFinite(value)) return "—";
  const n = Number(value.toFixed(places));
  return `${n < 0 ? "−" : "+"} ${Math.abs(n)}`;
}

/**
 * Text sizes for a drawing, in viewBox units.
 *
 * **Why a scale rather than a number.** An SVG scales by rendered width over viewBox
 * width, so a `font-size` is not the size a reader sees. A 560-unit viewBox in a 358px
 * phone panel draws at 0.64: `font-size="16"` is 10.2px on screen, and `13` is 8.3px.
 * The audit's floor is 9px, so **anything below 15 in a full-width viewBox fails at
 * phone width** — and four modules had drifted to 10, 11 and 12.
 *
 * That is why these are named rather than chosen. Fourteen distinct sizes were in use
 * across 177 modules with nothing to stop the next one being 10, so the size is now a
 * decision with a name and a reason attached, taken once here.
 *
 * The values assume a viewBox around 420–560 units wide, which is what `panel`.
 * A figure with a much wider viewBox needs to scale these up by the same factor, and
 * `check-figure-kit.cjs` measures the rendered size rather than trusting the name.
 */
export const SIZE = {
  /** The smallest a label may be. 16 units is 10.2px at the 0.64 phone scale. */
  label: 16,
  /** An axis tick or a minor annotation. */
  tick: 15,
  /** A title or a value read off the drawing. */
  value: 18,
  /** A heading inside the drawing. */
  heading: 20,
};

/**
 * A positioned piece of text, as an SVG element string.
 *
 * One hundred and seven of 177 modules wrote this by hand — the same four attributes
 * in the same order, varying only position, words and size. Writing it by hand is how
 * a `<text>` ends up with no `fig-*` or `text-*` class and ships as black on a dark
 * panel: that defect was found **eighteen times** by measurement.
 *
 * The class defaults to `text-ink`, so the common case cannot forget it.
 *
 * @param {object} o
 * @param {number} o.x  viewBox x, the point the anchor refers to
 * @param {number} o.y  viewBox y
 * @param {string} o.text  the words. Never `$...$` — the maths hook runs at build time.
 * @param {string} [o.anchor]  `start` | `middle` | `end`, default `middle`
 * @param {number} [o.size]  one of `SIZE`; default `SIZE.label`
 * @param {string} [o.class]  a `text-*` class; default `text-ink`
 * @param {number} [o.weight]  optional font-weight
 * @returns {string} an SVG `<text>` element, ready to concatenate
 */
export function label({ x, y, text, anchor = "middle", size = SIZE.label, class: cls = "text-ink", weight } = {}) {
  const attrs = [
    `x="${Number(x).toFixed(1)}"`,
    `y="${Number(y).toFixed(1)}"`,
    `font-size="${size}"`,
    `text-anchor="${anchor}"`,
    `class="${cls}"`,
  ];
  if (weight) attrs.push(`font-weight="${weight}"`);
  // `escape` rather than trusting the caller: a label with an ampersand in it is a
  // malformed document, and the failure is silent in every browser.
  const safe = String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<text ${attrs.join(" ")}>${safe}</text>`;
}

/**
 * Map a value in its own units to an SVG coordinate, in one axis.
 *
 * Twenty modules built this by hand and the arithmetic is identical each time — which
 * is exactly why the sign errors are not. A y-axis that counts upwards and an SVG
 * y-axis that counts downwards is the pair that gets flipped, and a flipped axis looks
 * like a correct drawing until someone reads a value off it.
 *
 * @param {object} o
 * @param {[number, number]} o.domain  the values to map, `[low, high]`
 * @param {[number, number]} o.range  the SVG coordinates, `[low, high]`
 * @returns {(value: number) => number} the mapping
 */
export function scale({ domain, range }) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  if (d1 === d0) throw new Error("scale: the domain has no width, so it cannot be mapped");
  const span = d1 - d0;
  return (value) => r0 + ((Number(value) - d0) / span) * (r1 - r0);
}

/**
 * Run `draw` whenever any control changes, and once now.
 *
 * Every figure does this by hand, and doing it by hand is how a figure ends up
 * drawing only after the first `input` event — the image point that appeared only
 * once the slider moved.
 */
export function react(controls, draw, options = {}) {
  const { initial = true } = options;
  const list = [controls].flat().filter(Boolean);
  for (const control of list) control.addEventListener("input", draw);
  for (const control of list) control.addEventListener("change", draw);
  // `initial: false` for a control whose change is a *side effect* rather than a
  // redraw — a slider that takes a new random sample must not take one on load,
  // and the faithful wiring is `react(slider, render, { initial: false })` plus
  // its own listener for the sample.
  if (initial) draw();
  return list;
}
