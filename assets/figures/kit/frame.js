// @ts-nocheck
/* The frame: the drawing surface, the controls and the live readout.
 *
 * Every figure in the collection begins here, and the frame is where the
 * accessibility contract is enforced rather than trusted. The three defects this
 * layer exists to prevent were all shipped:
 *
 *   * `role="img"` on a live readout, in four modules — `role="img"` makes an
 *     element's content presentational, so the readout could never announce a
 *     value;
 *   * a pixel `height` on the SVG, which made 70 figures render their smallest
 *     label below 7px at phone width, because the drawing scaled down inside a box
 *     that did not;
 *   * `font:14px` on the figure's root, which an SVG `<text>` with no size of its
 *     own inherits, so five figures dropped below the 9px floor while every one of
 *     their own attributes stayed correct.
 */
/** The UI font, for controls and readouts. **Not** applied to the drawing. */
export const UI_FONT = "font:14px system-ui";
const HIDDEN = [
  "position:absolute",
  "width:1px",
  "height:1px",
  "margin:-1px",
  "padding:0",
  "overflow:hidden",
  "clip:rect(0 0 0 0)",
  "clip-path:inset(50%)",
  "white-space:nowrap",
  "border:0",
].join(";");
/**
 * The figure's frame: an optional drawing surface and a live readout.
 *
 * @param {HTMLElement} el        the `<maths-figure>` the loader hands us
 * @param {object} options
 * @param {string} [options.label]  the accessible name for the drawing. Omit it
 *   only when there is no drawing — a figure that draws nothing has no image to
 *   name, and naming one hides its text instead.
 * @param {string} [options.description]  a longer description for a drawing that
 *   cannot be understood from its name. Put into the document, off the screen, and
 *   pointed at by `aria-describedby`, so a screen reader reaches it and nobody else
 *   wades through it.
 * @param {string} [options.prompt] a line of prose above the controls. Give the
 *   reader something to predict, not a description of the controls.
 * @param {number} [options.width]  the viewBox width. There is deliberately no
 *   height option: see the note on the SVG below.
 * @param {number} [options.height] the viewBox height.
 * @param {boolean} [options.drawing] false for a figure that draws nothing.
 * @param {number} [options.max]    `max-width` in pixels for the whole figure.
 * @returns {{root: HTMLElement, svg: SVGSVGElement|null, readout: HTMLElement,
 *   controls: HTMLElement, caption: HTMLElement, claim: Function}} `controls` is the
 *   column a module appends its own controls to; `caption` is an empty `<p>` under the
 *   controls for a line of prose the figure needs to say; `claim` records the
 *   arithmetic the figure states (see below).
 */
export function panel(el, options = {}) {
  const {
    label = "",
    description = "",
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
    if (description) {
      const id = `fig-desc-${Math.random().toString(36).slice(2, 9)}`;
      const span = document.createElement("span");
      span.id = id;
      span.textContent = description;
      span.style.cssText = HIDDEN;
      root.append(span);
      svg.setAttribute("aria-describedby", id);
    }
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
  const caption = document.createElement("p");
  caption.className = "fig-caption";
  caption.style.cssText = `${UI_FONT};margin:.4rem 0 0`;
  root.append(controls, readout, caption);
  el.replaceChildren(root);
  /**
   * Record the arithmetic this figure states, as data rather than prose.
   *
   * **Why this exists, and why it is not a parser.** Two figures printed a
   * multiplication that does not give the number beside it — `× 0.07` for a rate of
   * 6.5%, and `3 × 14.29 = 42.86` from an already-rounded 14.29 — and every check
   * passed, because none of them reads a number. The first attempt at a check parsed
   * the printed sentence back out of the text, and that is unbounded work: it needed
   * `<sup>`, `√`, `%`, thousands separators, a trailing sentence period and the words
   * "and"/"is" before it could read **43%** of the statements it saw, and only four
   * of them were arithmetic. Each new formatting choice is a new case.
   *
   * So the figure *declares* the claim instead: an expression, the values it was
   * given, and the answer. The verifier evaluates the expression with the same
   * computer algebra the problem banks already use, which is exact — `0.065` is
   * `13/200`, not a float — and needs no notation table at all.
   *
   * Call it once per redraw with everything the figure now asserts:
   *
   *     claim([
   *       { label: "compound total", expression: "P * (1 + r)**t",
   *         values: { P, r, t }, answer: compoundTotal, shown: money(compoundTotal) },
   *     ]);
   *
   * `expression` is Python syntax, because the verifier is SymPy. `shown` is the string
   * the reader sees, and the check also requires the readout to contain it — so a claim
   * cannot be about a number the figure never printed.
   *
   * @param {object[]} entries the claims for the current render, replacing the last
   */
  const claim = (entries = []) => {
    const clean = entries.map((entry) => ({
      label: String(entry.label ?? ""),
      expression: String(entry.expression ?? ""),
      values: entry.values || {},
      answer: entry.answer === undefined ? null : entry.answer,
      shown: entry.shown === undefined ? null : String(entry.shown),
    }));
    // A data attribute rather than a global: it is on the figure, it survives a clone,
    // and Playwright can read it without the page agreeing to expose anything.
    if (clean.length) el.setAttribute("data-working", JSON.stringify(clean));
    else el.removeAttribute("data-working");
  };
  return { root, svg, readout, controls, caption, claim };
}
/**
 * A drawing whose parts can be explored one at a time.
 *
 * A dense figure is one image to a screen reader: `panel()` gives it a name and a
 * description, and everything inside is unreadable. That is right for a graph — the
 * shape is the message — and wrong for a diagram with six named parts, which is what a
 * reader wants to move through: *this* is the perpendicular, *this* is the base.
 *
 * So each part gets a **button**, and the buttons are the focus stops. That is the one
 * design decision here and the reason it is not "make the shapes focusable": a `<g>`
 * with `tabindex` and a button for the same part would be two focus stops that do the
 * same thing, which is the trap `draggable()` avoids by refusing a pointer with no
 * backing control. The drawing follows the buttons; it does not compete with them.
 *
 * **Nothing here decides what a part looks like.** `draw()` returns SVG the module has
 * already composed from the marks, so `diagram()` is a frame and a list, not a layout.
 *
 * @param {HTMLElement} el the `<maths-figure>` the loader hands us
 * @param {object} options
 * @param {string} [options.label]        the drawing's accessible name
 * @param {string} [options.description]  a longer description, as `panel()` takes
 * @param {number} [options.width]
 * @param {number} [options.height]
 * @param {Array<{name: string, description?: string, draw?: () => string}>} options.parts
 *   one entry per part, in reading order. `draw()` is called once, so a part whose
 *   shape changes with a control belongs on a `panel()` instead.
 * @param {string} [options.caption] a line under the drawing; default is the hint that
 *   says the parts can be explored
 * @returns {{svg: SVGSVGElement, readout: HTMLElement, controls: HTMLElement,
 *   groups: SVGGElement[], activate: (index: number) => void}}
 */
export function diagram(el, options = {}) {
  const {
    label = "",
    description = "",
    width = 560,
    height = 300,
    parts = [],
    caption = "Use Tab to move from part to part.",
  } = options;
  const {
    root,
    svg,
    readout,
    controls,
    caption: note,
  } = panel(el, {
    label,
    description,
    width,
    height,
  });
  // `diagram()` is a drawing by construction — it never asks `panel()` for a frame
  // without one — so the surface is always there. Saying it once here is what keeps
  // the null out of `Diagram`, and every caller out of a check for a state it cannot
  // be in. A frame that arrived without a surface has already gone wrong in `panel()`.
  if (!svg) throw new Error("diagram: the frame has no drawing surface");
  root.classList.add("fig-diagram");
  note.textContent = caption;
  // One <g> per part, appended in reading order. The index is the identity, so a part
  // named with a character an attribute selector would need to escape cannot break it.
  const groups = parts.map((part) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", "fig-part");
    group.innerHTML = part.draw ? part.draw() : "";
    svg.append(group);
    return group;
  });
  const list = document.createElement("ul");
  list.className = "fig-parts";
  list.setAttribute("role", "group");
  if (label) list.setAttribute("aria-label", `Parts of ${label}`);
  list.style.cssText =
    `${UI_FONT};margin:.5rem 0 0;padding:0;list-style:none;` +
    "display:flex;flex-wrap:wrap;gap:.35rem";
  let active = -1;
  const activate = (index) => {
    active = index;
    root.classList.add("is-exploring");
    groups.forEach((group, i) => group.classList.toggle("is-active", i === index));
    const part = parts[index];
    if (!part) return;
    readout.textContent = part.description ? `${part.name}. ${part.description}` : part.name;
  };
  parts.forEach((part, index) => {
    const item = document.createElement("li");
    item.style.cssText = "margin:0";
    const control = document.createElement("button");
    control.type = "button";
    control.className = "fig-part-button";
    control.textContent = part.name;
    control.style.cssText = `${UI_FONT};cursor:pointer`;
    // The description is the accessible name's second half, so a reader hears what the
    // part *is* on arrival rather than having to ask again.
    control.setAttribute(
      "aria-label",
      part.description ? `${part.name}. ${part.description}` : part.name,
    );
    control.addEventListener("focus", () => activate(index));
    control.addEventListener("click", () => activate(index));
    item.append(control);
    list.append(item);
    // A pointer user explores the drawing the same way a keyboard user explores the
    // list; the two paths land on the same state, so they cannot disagree.
    groups[index].addEventListener("pointerenter", () => activate(index));
  });
  controls.append(list);
  // The last part the reader reached stays active. Clearing it on blur would take the
  // drawing apart the moment they tabbed away, which is the opposite of a position.
  void active;
  return { svg, readout, controls, groups, activate };
}
