/* Text, sizes and number formatting.
 *
 * The kit's lowest layer. Nothing here touches the DOM except `hidden()`, so every
 * function returns a string and tests without a browser.
 */

/**
 * Text sizes for a drawing, in viewBox units.
 *
 * An SVG scales by rendered width over viewBox width, so `font-size` is not the size
 * a reader sees: at phone width a 560-unit viewBox draws at 0.576, so anything below
 * 15 units falls under the 9px audit floor. These assume a viewBox around 420–560
 * units wide, as `panel` produces. Re-measure with `node tools/dist/cli.js audit site
 * --mobile` before changing them.
 */
export const SIZE = {
  /** An axis tick or a minor annotation. */
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
 * The types are stated twice on purpose: `tsc` ignores JSDoc types in a `.ts` file
 * but strips the annotations when it emits, so the compiled `text.js` needs the
 * `@typedef`. `draw.ts` does the same, and the two halves must agree.
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
 * A positioned piece of text, as an SVG `<text>` element string.
 *
 * `class` defaults to `text-ink`, so a label cannot ship uncoloured: a `<text>` with
 * no class paints in `fill`'s initial black and vanishes on a dark panel. The
 * options are a TypeScript type, because a `@param` on a destructured binding with a
 * default is silently ignored.
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
  // An axis title is the one non-horizontal label. `rotate(a x y)` rotates about
  // its own position, so no second position has to be passed.
  if (rotate) attrs.push(`transform="rotate(${coord(rotate)} ${coord(x)} ${coord(y)})"`);
  return `<text ${attrs.join(" ")}>${escape(text)}</text>`;
}

/**
 * A coordinate, rounded to one decimal place: finer than any screen, and it halves
 * the markup a float like `183.99999999999997` would add.
 */
export function coord(value: unknown): string {
  const n = Number(value);
  return Number.isFinite(n) ? n.toFixed(1) : "0";
}

/**
 * A number formatted for a reader: trailing zeros dropped, so `fmt(2.5)` is "2.5"
 * and `fmt(2.0)` is "2".
 *
 * A `.map(fmt)` callback passes the index as `places` and the array as a third
 * argument; the array identifies that case, so two places are used.
 */
/**
 * A number with its unit: `2.88 s`, `14.1 m/s`, `50%`.
 *
 * SI style puts a space between number and unit, except for `%`, `°`, `°C`, `′` and
 * `″`, which bind to the number.
 *
 * @param value  the quantity
 * @param unit   the unit as a reader sees it: `"m/s"`, `"°C"`, `"%"`
 * @param places decimal places, as `fmt()`
 */
const TIGHT_UNITS = new Set(["%", "°", "°C", "′", "″"]);

export function quantity(value: number, unit: string, places = 2): string {
  const number = fmt(value, places);
  if (!unit) return number;
  return TIGHT_UNITS.has(unit) ? `${number}${unit}` : `${number} ${unit}`;
}

export function fmt(value: number, places = 2, fromMap?: unknown): string {
  if (!Number.isFinite(value)) return "—";
  const digits = Array.isArray(fromMap) ? 2 : Number.isInteger(places) ? places : 2;
  const rounded = Number(value.toFixed(Math.max(0, Math.min(20, digits))));
  return String(rounded);
}

/**
 * A signed number, spaced for use as a term: `+ 3`, `− 3`.
 *
 * The space is part of the output, so it survives interpolation straight into an
 * expression: ``y = ${m}x ${signed(c)}``.
 */
export function signed(value: number, places = 2): string {
  if (!Number.isFinite(value)) return "—";
  const n = Number(value.toFixed(places));
  return `${n < 0 ? "−" : "+"} ${Math.abs(n)}`;
}

/**
 * A number to a stated number of significant figures.
 *
 * A rounded answer is a claim about how much of the measurement is real, so trailing
 * zeros are kept when they carry significance, and a value whose integer part needs
 * place-holding zeros is written scientifically: `sigfig(300, 2)` is `"3.0e2"`,
 * matching the problem-bank verifier's own convention.
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
 * A visually-hidden line of text, for a description a drawing cannot carry: in the
 * document for a screen reader, off the screen for everyone else.
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
