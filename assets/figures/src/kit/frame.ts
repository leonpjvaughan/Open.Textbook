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
 *   controls: HTMLElement, caption: HTMLElement}} `controls` is the column a module
 *   appends its own controls to; `caption` is an empty `<p>` under the controls for
 *   a line of prose the figure needs to say.
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
  return { root, svg, readout, controls, caption };
}
