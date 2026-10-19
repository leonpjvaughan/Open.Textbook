// @ts-nocheck
/* The shared figure kit — the public surface, and the rules behind it.
 *
 * Every figure in this collection is a hand-written module that exports `mount(el)`,
 * and that is deliberate: 213 bespoke diagrams do not want a framework. But until
 * this file existed, **not one module imported a single shared line** — 176 of them
 * wrote their own `innerHTML` template, their own `aria-live` readout, their own
 * slider wiring, and 154 hand-formatted their own numbers. 18,773 lines with no code
 * shared between any two of them.
 *
 * That was not a style complaint. Every figure defect found in review came from a
 * module re-earning the same correctness by hand:
 *
 *   * `role="img"` on a live readout, in four modules — `role="img"` makes an
 *     element's content presentational, so the readout could never announce a value;
 *   * `2.6666666666666665 parts` and `2x + (-5)` — 154 modules hand-rolled their own
 *     formatting;
 *   * 70 modules with a 7px label at phone width, because each set its own `height`
 *     attribute;
 *   * a `<text>` with no colour class, painted black on a dark panel, found eighteen
 *     times by measurement.
 *
 * ## The layers
 *
 * The kit began as ten functions in one file and was deliberately **not** a drawing
 * library: "a framework for 177 bespoke diagrams would be a framework around
 * nothing". That was right about bespoke drawing and wrong about repeated drawing, and
 * the measurements settled it — 162 of 213 modules draw an axis by hand, 68 a
 * `<rect>`, 44 a `<polygon>`, 44 sample a curve segment by segment, and 24 hand-build
 * a coordinate mapping. So the kit is now layered, and each layer is a question a
 * module can ask:
 *
 * | Layer | File | The question it answers |
 * |---|---|---|
 * | text | `kit/text.js` | what does it say, and at what size? |
 * | frame | `kit/frame.js` | what is the figure, and where does it live? |
 * | draw | `kit/draw.js` | what does it look like? |
 * | controls | `kit/controls.js` | what can the reader change? |
 * | interact | `kit/interact.js` | what happens over time, or in response? |
 * | drag | `kit/drag.js` | what can the reader move directly? |
 *
 * A module imports only what it needs, and this file is a convenience barrel so the
 * 213 existing modules — which all write `from "./kit.js"` — keep working unchanged.
 *
 * ## What it guarantees, by construction
 *
 * * the drawing carries `role="img"` and a plain-text `aria-label`, and the surface
 *   never claims to be an image when it draws nothing;
 * * the readout is `aria-live="polite"` and is never given `role="img"`;
 * * every control is a **native** element, so the keyboard and the screen reader work
 *   without being rebuilt, and every control has a visible label *and* an accessible
 *   name;
 * * an SVG has no fixed pixel `height`, so the drawing scales with its box on a phone
 *   rather than shrinking its own text;
 * * no mark and no text carries a colour; the class is a parameter with a safe
 *   default, and the theme supplies the paint;
 * * every coordinate is rounded, so no mark ships `183.99999999999997`;
 * * randomness is seeded, so a figure that samples is reproducible;
 * * a draggable handle must have a backing control, so the pointer is never the only
 *   way in;
 * * every animation has a scrubber and honours `prefers-reduced-motion`.
 *
 * ## What it still deliberately does not do
 *
 * It does not decide what a figure looks like. There is no chart type, no layout
 * engine, no data model and no encodings — a mark is a pure function returning a
 * string, the arrangement stays the module's, and a module that wants to draw
 * something the kit has never seen writes the SVG itself and is not fighting anything.
 * The kit owns the parts that must be the same every time and gets out of the way of
 * the parts that must not be.
 *
 * The rules and the measurements behind them are in `assets/AGENTS.md`; the queue of
 * what to add next is `ideas.md`; the audit that measures every figure in a browser is
 * `scripts/audit-figures.cjs`.
 */
export { UI_FONT, diagram, panel } from "./kit/frame.js";
export { SIZE, coord, escape, fmt, hidden, label, quantity, sigfig, signed } from "./kit/text.js";
export {
  area,
  arrow,
  axes,
  bars,
  camera3d,
  circle,
  curve,
  dots,
  extent,
  graph,
  line,
  numberLine,
  path,
  polygon,
  rect,
  scale,
  ticks,
  vectorField,
  venn,
} from "./kit/draw.js";
export {
  builder,
  button,
  chooser,
  field,
  notate,
  segmented,
  slider,
  textarea,
  toggle,
} from "./kit/controls.js";
export {
  animate,
  answerBox,
  check,
  exercise,
  notify,
  react,
  practice,
  remember,
  seed,
  stepper,
  table,
} from "./kit/interact.js";
export { draggable } from "./kit/drag.js";
