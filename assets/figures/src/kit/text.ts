/* Text, sizes and number formatting.
 *
 * The first of the kit's layers, and the one everything else uses. Nothing here
 * touches the DOM except `hidden()`, so every function returns a string and can be
 * tested without a browser.
 *
 * Why a layer and not a handful of helpers: 136 of the 209 figure modules wrote a
 * `<text>` element by hand and never called `label()`, and 154 formatted their own
 * numbers. Both defects they caused were shipped — a `<text>` with no colour class
 * is painted with `fill`'s initial black and vanishes on a dark panel (found
 * eighteen times by measurement), and two modules put `2.6666666666666665 parts`
 * and `2x + (-5)` in front of a reader.
 */

/**
 * Text sizes for a drawing, in viewBox units.
 *
 * **Why a scale rather than a number.** An SVG scales by rendered width over viewBox
 * width, so a `font-size` is not the size a reader sees. A 560-unit viewBox in a
 * 358px phone panel draws at 0.64: `font-size="16"` is 10.2px on screen, and `13` is
 * 8.3px. The audit's floor is 9px, so **anything below 15 in a full-width viewBox
 * fails at phone width** — and four modules had drifted to 10, 11 and 12.
 *
 * That is why these are named rather than chosen. Fourteen distinct sizes were in use
 * across 177 modules with nothing to stop the next one being 10, so the size is now a
 * decision with a name and a reason attached, taken once here.
 *
 * The values assume a viewBox around 420–560 units wide, which is what `panel`
 * produces. A figure with a much wider viewBox needs to scale these up by the same
 * factor, and `check-figure-kit.cjs` measures the arithmetic rather than trusting the
 * name.
 *
 * The scale is not a round number and it is not the panel's own width. Measured at a
 * 390px viewport, the `maths-figure` element is 358px wide but carries 17.6px of
 * padding on each side, so **the drawing is 322.8px** and a 560-unit viewBox draws at
 * 322.8 / 560 = 0.576. `SIZE.tick` was 15 units for a while, which is 8.6px — below
 * the 9px floor — and the guard missed it because it used the element's width instead
 * of the drawing's. Re-measure with `audit-figures.cjs --mobile` before changing these.
 */
export const SIZE = {
  /** An axis tick or a minor annotation. 16 units is 9.2px at the 0.576 phone scale. */
  tick: 16,
  /** The smallest a label may be. */
  label: 16,
  /** A title or a value read off the drawing. */
  value: 18,
  /** A heading inside the drawing. */
  heading: 20,
};

/** The options `label()` accepts. */
export type LabelOptions = {
  /** viewBox x, the point the anchor refers to. */
  x: number;
  /** viewBox y. */
  y: number;
  /** The words. Never `$...$` — the maths hook runs at build time. */
  text: string;
  /** `start` | `middle` | `end`, default `middle`. */
  anchor?: string;
  /** One of `SIZE`; default `SIZE.label`. */
  size?: number;
  /** A `text-*` class; default `text-ink`. */
  class?: string;
  /** Optional font-weight. */
  weight?: number;
  /** Degrees anticlockwise about `(x, y)`, for an axis title. */
  rotate?: number;
};

/** How `sigfig()` decides between plain and scientific notation. */
export type SigfigOptions = {
  /** `true` always, `false` never, `"auto"` when the integer part needs zeros. */
  scientific?: boolean | "auto";
};

/*
 * The option types, stated twice.
 *
 * `tsc` reads a type from JSDoc in a **`.js`** file and ignores it in a `.ts` one, so
 * the `@typedef` below does nothing for this file's own check. But it is what makes
 * the **compiled copy** typed: `tsc` strips the annotations when it emits, so
 * `kit/text.js` — which a figure module imports — can otherwise only infer `label`'s
 * options from the destructuring defaults, giving a type with `anchor` in it and no
 * `x`, and every module that calls it reports an error the source does not have.
 * `draw.ts` states its own types the same way, and the two halves must agree.
 */

/**
 * The options `label()` takes, for the compiled copy.
 *
 * @typedef {object} LabelOptions
 * @property {number} x  viewBox x, the point the anchor refers to
 * @property {number} y  viewBox y
 * @property {string} text  the words; never `$...$`, the maths hook runs at build time
 * @property {string} [anchor]  `start` | `middle` | `end`, default `middle`
 * @property {number} [size]  one of `SIZE`; default `SIZE.label`
 * @property {string} [class]  a `text-*` class; default `text-ink`
 * @property {number} [weight]  optional font-weight
 * @property {number} [rotate]  degrees anticlockwise about `(x, y)`, for an axis title
 */

/** Escape the three characters that make a string malformed inside an element.
 *
 * @param {unknown} text  whatever is about to be interpolated into markup
 * @returns {string}
 */
export function escape(text: unknown): string {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

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
 * **Every figure in the collection calls this now.** Measured 2026-10-17: 137 of 250
 * modules hand-wrote a `<text>` when the migration started, and 0 do once the nine
 * rotated axis titles could name `rotate` instead of writing a transform.
 *
 * **The options are a real TypeScript type, and that is the general fix.** A `@param`
 * on a destructured binding with a default is silently ignored — `{ x, y } = {}` takes
 * its type from the default, so annotating `o.x` leaves `x` as `{}`, and a `@type` cast
 * on the initialiser is ignored too. Measured three times: 5 of the kit's 190 type
 * errors were this one function, and the same shape is behind most of the rest. These
 * files are `.ts` and `tsc` compiles them, so the language's own annotation is the one
 * that cannot fail silently — and it is stripped from the emitted JavaScript.
 *
 * @param {LabelOptions} [o]  the position, the words and the size
 * @returns an SVG `<text>` element, ready to concatenate
 */
export function label({
  x,
  y,
  text,
  anchor = "middle",
  size = SIZE.label,
  class: cls = "text-ink",
  weight,
  rotate,
}: LabelOptions = {} as LabelOptions): string {
  const attrs = [
    `x="${coord(x)}"`,
    `y="${coord(y)}"`,
    `font-size="${size}"`,
    `text-anchor="${anchor}"`,
    `class="${cls}"`,
  ];
  if (weight) attrs.push(`font-weight="${weight}"`);
  // An axis title is the one label that is not horizontal, and it was the last thing
  // keeping nine modules on a hand-written `<text>`: every one of them wrote
  // `transform="rotate(-90 x y)"` about its own position. Rotating about `(x, y)` is
  // what that means, so it does not need a second position to be passed.
  if (rotate) attrs.push(`transform="rotate(${coord(rotate)} ${coord(x)} ${coord(y)})"`);
  return `<text ${attrs.join(" ")}>${escape(text)}</text>`;
}

/**
 * A coordinate, rounded to one decimal place.
 *
 * Every drawing helper rounds its coordinates through this. A float like
 * `183.99999999999997` is valid SVG and doubles the size of the markup; one decimal
 * place is finer than any screen, and the rounding is invisible.
 */
export function coord(value: unknown): string {
  const n = Number(value);
  return Number.isFinite(n) ? n.toFixed(1) : "0";
}

/**
 * A number formatted for a reader.
 *
 * One implementation, because 154 modules hand-rolled their own and two of them
 * shipped a raw float — `2.6666666666666665 parts` and `2x + (-5)` — to a reader.
 * Trailing zeros are dropped, so `fmt(2.5)` is "2.5" and `fmt(2.0)` is "2".
 *
 * **A `.map(fmt)` callback is detected and its index ignored.** `values.map(fmt)` passes
 * the *element*, the *index* and the *array*, so the index lands in `places` and a
 * caller who wrote the natural thing gets 0 places, then 1, then 2, down the list. The
 * third argument is the array, and only `Array.prototype.map` supplies it — so it
 * identifies the case exactly rather than guessing from the number, and `.map(fmt)`
 * now behaves the way a reader would expect.
 */
export function fmt(value: number, places = 2, fromMap?: unknown): string {
  if (!Number.isFinite(value)) return "—";
  const digits = Array.isArray(fromMap) ? 2 : Number.isInteger(places) ? places : 2;
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
export function signed(value: number, places = 2): string {
  if (!Number.isFinite(value)) return "—";
  const n = Number(value.toFixed(places));
  return `${n < 0 ? "−" : "+"} ${Math.abs(n)}`;
}

/**
 * A number to a stated number of significant figures.
 *
 * This is the reader's side of the `sigfigs` check the problem-bank verifier makes,
 * and it exists for the same reason the check does: **a rounded answer is a claim
 * about how much of the measurement is real**. A physics answer of `6.0 N` says the
 * reading was good to two figures; `6 N` says something different, and `6.00` says
 * something wrong.
 *
 * Trailing zeros are kept when they carry significance, and a value whose integer
 * part would need place-holding zeros is written in scientific notation — so
 * `sigfig(300, 2)` is `"3.0e2"`, not `"300"`, which is what the verifier's own
 * convention expects. `sigfig(6, 2)` is `"6.0"` and `sigfig(0.0012, 2)` is
 * `"0.0012"`.
 *
 * @param {number} value
 * @param {number} [figures]  how many significant figures, default 3
 * @param {object} [o]
 * @param {boolean|"auto"} [o.scientific]  `true` always, `false` never, `"auto"`
 *   (the default) when the integer part needs zeros to hold the place.
 */
export function sigfig(
  value: number,
  figures = 3,
  { scientific = "auto" }: SigfigOptions = {},
): string {
  if (!Number.isFinite(value)) return "—";
  const digits = Math.max(1, Math.min(15, Number.isInteger(figures) ? figures : 3));
  if (value === 0) return digits === 1 ? "0" : `0.${"0".repeat(digits - 1)}`;
  const magnitude = Math.floor(Math.log10(Math.abs(value)));
  const needsScience = scientific === true || (scientific === "auto" && magnitude >= digits);
  if (needsScience) {
    const mantissa = value / Math.pow(10, magnitude);
    return `${mantissa.toFixed(digits - 1)}e${magnitude}`;
  }
  // Enough decimal places to keep the significant digits, and no more.
  const places = Math.max(0, digits - 1 - magnitude);
  return value.toFixed(Math.min(20, places));
}

/**
 * A visually-hidden line of text, for a description a drawing cannot carry.
 *
 * `panel()` uses this for the long description of a figure. A reader who can see the
 * drawing does not need it read out on every visit, and a reader who cannot needs it
 * available rather than absent, so it is in the document and off the screen.
 * @param {Element} parent  what to add the line to
 * @param {string} text  the sentence a reader with a screen reader needs
 * @param {{id?: string}} [o]  an id, when something points at it
 * @returns {HTMLElement}
 */
export function hidden(parent: Element, text: string, { id = "" }: { id?: string } = {}) {
  const span = document.createElement("span");
  span.className = "fig-hidden";
  if (id) span.id = id;
  span.textContent = text;
  span.style.cssText =
    "position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;" +
    "clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0";
  parent.append(span);
  return span;
}
