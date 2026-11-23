/* The frame: the drawing surface, the controls and the live readout.
 *
 * The accessibility contract is enforced here rather than trusted: a live readout is
 * never `role="img"`, the SVG has no pixel height, and the UI font never reaches the
 * drawing.
 */

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
  label?: string;
  description?: string;
  prompt?: string;
  width?: number;
  /** The viewBox height. There is deliberately no pixel height: see the SVG note. */
  height?: number;
  drawing?: boolean;
  max?: number;
};

export type Panel = {
  root: HTMLElement;
  svg: SVGSVGElement | null;
  readout: HTMLElement;
  controls: HTMLElement;
  caption: HTMLElement;
  claim: (entries?: Claim[]) => void;
};

export type Claim = {
  label?: string;
  expression: string;
  values?: Record<string, number>;
  answer?: number | string;
  shown?: number | string;
};

export type DiagramPart = {
  name: string;
  description?: string;
  /** The SVG for the part, composed from the marks. Called once. */
  draw?: () => string;
};

export type DiagramOptions = {
  label?: string;
  description?: string;
  width?: number;
  height?: number;
  parts?: DiagramPart[];
  caption?: string;
};

export type Diagram = {
  svg: SVGSVGElement;
  readout: HTMLElement;
  controls: HTMLElement;
  groups: SVGGElement[];
  activate: (index: number) => void;
};

/**
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
    // and Playwright can read it without the page agreeing to expose anything.
    if (clean.length) el.setAttribute("data-working", JSON.stringify(clean));
    else el.removeAttribute("data-working");
  };

  return { root, svg, readout, controls, caption, claim };
}

/**
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
  if (!svg) throw new Error("diagram: the frame has no drawing surface");
  root.classList.add("fig-diagram");
  note.textContent = caption;

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
