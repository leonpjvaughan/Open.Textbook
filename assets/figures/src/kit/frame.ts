/* The frame: the drawing surface, the controls and the live readout.
 *
 * The accessibility contract is enforced here rather than trusted: a live readout is
 * never `role="img"`, the SVG has no pixel height, and the UI font never reaches the
 * drawing.
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
 * The options `panel()` takes.
 *
 * A TypeScript type, not JSDoc: a `@param` on a destructured binding with a default
 * is silently ignored. `label()` in `text.js` is the worked example.
 */
export type PanelOptions = {
  /** The accessible name for the drawing. Omit it only when there is no drawing. */
  label?: string;
  /** A longer description, put into the document and pointed at by `aria-describedby`. */
  description?: string;
  /** A line of prose above the controls: something to predict, not a description. */
  prompt?: string;
  /** The viewBox width. */
  width?: number;
  /** The viewBox height. There is deliberately no pixel height: see the SVG note. */
  height?: number;
  /** `false` for a figure that draws nothing. */
  drawing?: boolean;
  /** `max-width` in pixels for the whole figure. */
  max?: number;
};

/** The frame `panel()` returns. */
export type Panel = {
  root: HTMLElement;
  /** The drawing surface, or `null` for a figure that draws nothing. */
  svg: SVGSVGElement | null;
  /** The polite live region the figure announces its values in. */
  readout: HTMLElement;
  /** The column a module appends its own controls to. */
  controls: HTMLElement;
  /** An empty `<p>` under the controls, for a line of the figure's own prose. */
  caption: HTMLElement;
  /** Record the arithmetic the figure states. */
  claim: (entries?: Claim[]) => void;
};

/**
 * One piece of arithmetic a figure states, as data rather than prose.
 *
 * `expression` is Python syntax, because the verifier is SymPy, and `shown` is the
 * string the reader sees.
 */
export type Claim = {
  /** What the claim is about, for a failure message. */
  label?: string;
  /** The expression to evaluate, in Python syntax. */
  expression: string;
  /** The values it was given, by name. */
  values?: Record<string, number>;
  /** The figure's own answer. */
  answer?: number | string;
  /** The string the reader sees beside it. */
  shown?: number | string;
};

/** One part of a `diagram()`. */
export type DiagramPart = {
  /** The part's name, read out on arrival. */
  name: string;
  /** What the part is, said after its name. */
  description?: string;
  /** The SVG for the part, composed from the marks. Called once. */
  draw?: () => string;
};

/** The options `diagram()` takes: a panel's, plus the parts and the hint. */
export type DiagramOptions = {
  label?: string;
  description?: string;
  width?: number;
  height?: number;
  /** One entry per part, in reading order. */
  parts?: DiagramPart[];
  /** A line under the drawing; default is the hint that says the parts can be explored. */
  caption?: string;
};

/** The diagram `diagram()` returns. */
export type Diagram = {
  svg: SVGSVGElement;
  readout: HTMLElement;
  controls: HTMLElement;
  groups: SVGGElement[];
  activate: (index: number) => void;
};

/**
 * The figure's frame: an optional drawing surface and a live readout.
 *
 * @param {HTMLElement} el        the `<maths-figure>` the loader hands us
 * @param {object} options
 * @param {string} [options.label]  the accessible name for the drawing. Omit it only
 *   when there is no drawing: naming an image that draws nothing hides its text.
 * @param {string} [options.description]  a longer description for a drawing its name
 *   cannot carry. Off the screen, pointed at by `aria-describedby`.
 * @param {string} [options.prompt] a line of prose above the controls: something to
 *   predict, not a description of the controls.
 * @param {number} [options.width]  the viewBox width.
 * @param {number} [options.height] the viewBox height.
 * @param {boolean} [options.drawing] false for a figure that draws nothing.
 * @param {number} [options.max]    `max-width` in pixels for the whole figure.
 * @returns {{root: HTMLElement, svg: SVGSVGElement|null, readout: HTMLElement,
 *   controls: HTMLElement, caption: HTMLElement, claim: Function}} `controls` is the
 *   column a module appends its own controls to; `caption` is an empty `<p>` under the
 *   controls for a line of prose the figure needs to say; `claim` records the
 *   arithmetic the figure states (see below).
 */
export function panel(el: HTMLElement, options: PanelOptions = {}): Panel {
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
  // **No font on this element.** An SVG `<text>` with no `font-size` of its own
  // inherits whatever is set here, so the UI font belongs on the controls and the
  // readout, not on the surface the drawing is on.
  root.style.cssText = `max-width:${max}px`;

  if (prompt) {
    const line = document.createElement("p");
    line.className = "text-ink";
    line.style.cssText = `${UI_FONT};margin:0 0 .6rem`;
    line.textContent = prompt;
    root.append(line);
  }

  let svg: SVGSVGElement | null = null;
  if (drawing) {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    // `width="100%"` and **no `height` attribute**: a pixel height makes the drawing
    // scale down inside a box that does not, shrinking its own text.
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

  // The readout is a live region and never `role="img"`, which makes its content
  // presentational and its value unannounceable. A `<div>`, not a `<p>`: a readout
  // holding a table cannot be a paragraph, because the parser hoists the table out.
  const readout = document.createElement("div");
  readout.className = "readout";
  readout.setAttribute("aria-live", "polite");
  readout.style.cssText = `${UI_FONT};margin:.6rem 0 0`;

  const controls = document.createElement("div");
  controls.className = "fig-controls";
  // Two columns when there is room, one when there is not: `auto-fit` with a minimum,
  // not a fixed `repeat(2, …)`, which would stack every two-slider figure.
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
   * Parsing the printed sentence back out is unbounded work, so the figure declares
   * the claim instead and the verifier evaluates the expression exactly. Call it once
   * per redraw with everything the figure now asserts:
   *
   *     claim([
   *       { label: "compound total", expression: "P * (1 + r)**t",
   *         values: { P, r, t }, answer: compoundTotal, shown: money(compoundTotal) },
   *     ]);
   *
   * `shown` is the string the reader sees, and it must appear in the readout, so a
   * claim cannot be about a number the figure never printed.
   *
   * @param {object[]} entries the claims for the current render, replacing the last
   */
  const claim = (entries: Claim[] = []): void => {
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
 * A dense figure is one image to a screen reader, which is right for a graph and
 * wrong for a diagram with six named parts. So each part gets a **button**, and the
 * buttons are the focus stops — not the shapes: a `<g>` with `tabindex` plus a button
 * for the same part would be two focus stops that do the same thing. The drawing
 * follows the buttons; it does not compete with them.
 *
 * `draw()` returns SVG the module has already composed from the marks, so this is a
 * frame and a list, not a layout.
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
export function diagram(el: HTMLElement, options: DiagramOptions = {}): Diagram {
  const {
    label = "",
    description = "",
    width = 560,
    height = 300,
    parts = [],
    caption = "Use Tab to move from part to part.",
  } = options;

  const { root, svg, readout, controls, caption: note } = panel(el, {
    label,
    description,
    width,
    height,
  });
  // `diagram()` always asks `panel()` for a surface, so the null is unreachable; one
  // throw here keeps `Diagram` non-nullable and every caller out of a check for a
  // state it cannot be in.
  if (!svg) throw new Error("diagram: the frame has no drawing surface");
  root.classList.add("fig-diagram");
  note.textContent = caption;

  // One <g> per part, in reading order. The index is the identity, so a part name
  // needs no attribute selector and no escaping.
  const groups: SVGGElement[] = parts.map((part) => {
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
  const activate = (index: number): void => {
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
    // The description is the second half of the accessible name, so a reader hears
    // what the part *is* on arrival.
    control.setAttribute(
      "aria-label",
      part.description ? `${part.name}. ${part.description}` : part.name,
    );
    control.addEventListener("focus", () => activate(index));
    control.addEventListener("click", () => activate(index));
    item.append(control);
    list.append(item);

    // A pointer user explores the way a keyboard user does; both paths reach the same
    // state, so they cannot disagree.
    groups[index].addEventListener("pointerenter", () => activate(index));
  });

  controls.append(list);
  // The last part reached stays active: clearing it on blur would take the drawing
  // apart the moment the reader tabbed away.
  void active;

  return { svg, readout, controls, groups, activate };
}
