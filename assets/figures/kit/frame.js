// @ts-nocheck
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
  const readout = document.createElement("div");
  readout.className = "readout";
  readout.setAttribute("aria-live", "polite");
  readout.style.cssText = `${UI_FONT};margin:.6rem 0 0`;
  const controls = document.createElement("div");
  controls.className = "fig-controls";
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
  const claim = (entries = []) => {
    const clean = entries.map((entry) => ({
      label: String(entry.label ?? ""),
      expression: String(entry.expression ?? ""),
      values: entry.values || {},
      answer: entry.answer === undefined ? null : entry.answer,
      shown: entry.shown === undefined ? null : String(entry.shown),
    }));
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
  if (!svg) throw new Error("diagram: the frame has no drawing surface");
  root.classList.add("fig-diagram");
  note.textContent = caption;
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
    control.setAttribute(
      "aria-label",
      part.description ? `${part.name}. ${part.description}` : part.name,
    );
    control.addEventListener("focus", () => activate(index));
    control.addEventListener("click", () => activate(index));
    item.append(control);
    list.append(item);
    groups[index].addEventListener("pointerenter", () => activate(index));
  });
  controls.append(list);
  void active;
  return { svg, readout, controls, groups, activate };
}
