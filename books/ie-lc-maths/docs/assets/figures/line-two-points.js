// Tier-1 guided investigation: two points and the line through them.
//
// The page asks the reader to predict what happens to the slope when the two
// points share an x-coordinate, then to test it and write the explanation. The
// figure draws the two points, the segment, the right triangle that underlies the
// distance formula, and the midpoint.
//
// Nothing here carries a colour: every shape uses a fig-* class and every word a
// text-* class, so the figure follows the reader's theme in both schemes.
import { SIZE, fmt, label, panel, react, scale, slider } from "./kit.js";

// The drawing area, in SVG units, and the value range on both axes.
const RANGE = 10;
const X = scale({ domain: [-RANGE, RANGE], range: [34, 526] });
const Y = scale({ domain: [-RANGE, RANGE], range: [346, 34] });

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Two points on a coordinate grid, with the line through them, the right triangle between them and the midpoint of the segment",
    width: 560,
    height: 380,
  });

  const x1 = slider(el, { id: "x1", show: true, label: "x of A", min: -9, max: 9, step: 1, value: -1 });
  const y1 = slider(el, { id: "y1", show: true, label: "y of A", min: -9, max: 9, step: 1, value: 1 });
  const x2 = slider(el, { id: "x2", show: true, label: "x of B", min: -9, max: 9, step: 1, value: 7 });
  const y2 = slider(el, { id: "y2", show: true, label: "y of B", min: -9, max: 9, step: 1, value: 7 });

  function update() {
    const ax = Number(x1.value);
    const ay = Number(y1.value);
    const bx = Number(x2.value);
    const by = Number(y2.value);

    let grid = "";
    for (let k = -RANGE + 1; k < RANGE; k += 1) {
      if (k === 0) continue;
      grid += `<line x1="${X(k)}" y1="${Y(-RANGE)}" x2="${X(k)}" y2="${Y(RANGE)}" class="fig-grid" stroke-width="0.6"></line>`;
      grid += `<line x1="${X(-RANGE)}" y1="${Y(k)}" x2="${X(RANGE)}" y2="${Y(k)}" class="fig-grid" stroke-width="0.6"></line>`;
    }
    grid += `<line x1="${X(-RANGE)}" y1="${Y(0)}" x2="${X(RANGE)}" y2="${Y(0)}" class="fig-ink" stroke-width="1.5"></line>`;
    grid += `<line x1="${X(0)}" y1="${Y(-RANGE)}" x2="${X(0)}" y2="${Y(RANGE)}" class="fig-ink" stroke-width="1.5"></line>`;
    grid += label({ x: X(RANGE) - 4, y: Y(0) - 8, text: "x", size: SIZE.tick, class: "text-ink", anchor: "end" });
    grid += label({ x: X(0) + 10, y: Y(RANGE) + 16, text: "y", size: SIZE.tick, class: "text-ink", anchor: "start" });

    const axp = X(ax);
    const ayp = Y(ay);
    const bxp = X(bx);
    const byp = Y(by);

    // The right triangle: a horizontal leg from A, then a vertical leg up to B.
    const triangle =
      `<line x1="${axp}" y1="${ayp}" x2="${bxp}" y2="${ayp}" class="fig-grid" stroke-width="1.2" stroke-dasharray="5 4"></line>` +
      `<line x1="${bxp}" y1="${ayp}" x2="${bxp}" y2="${byp}" class="fig-grid" stroke-width="1.2" stroke-dasharray="5 4"></line>`;

    const segment = `<line x1="${axp}" y1="${ayp}" x2="${bxp}" y2="${byp}" class="fig-accent" stroke-width="2.4"></line>`;

    const mx = (ax + bx) / 2;
    const my = (ay + by) / 2;
    const marks =
      `<circle cx="${axp}" cy="${ayp}" r="6" class="fig-good"></circle>` +
      `<circle cx="${bxp}" cy="${byp}" r="6" class="fig-warn"></circle>` +
      `<circle cx="${X(mx)}" cy="${Y(my)}" r="5" class="fig-ink"></circle>` +
      label({ x: axp - 12, y: ayp + 22, text: "A", size: SIZE.value, class: "text-good", anchor: "end", weight: "bold" }) +
      label({ x: bxp + 12, y: byp - 12, text: "B", size: SIZE.value, class: "text-warn", anchor: "start", weight: "bold" }) +
      label({ x: X(mx) + 10, y: Y(my) + 22, text: "M", size: SIZE.value, class: "text-ink", anchor: "start" });

    svg.innerHTML = grid + triangle + segment + marks;

    const dx = bx - ax;
    const dy = by - ay;
    const distance = Math.hypot(dx, dy);
    readout.textContent =
      `A is (${fmt(ax)}, ${fmt(ay)}) and B is (${fmt(bx)}, ${fmt(by)}). ` +
      `The run is ${fmt(dx)} and the rise is ${fmt(dy)}. ` +
      `The distance is ${fmt(distance, 3)}, and the midpoint M is (${fmt(mx, 1)}, ${fmt(my, 1)}). ` +
      (dx === 0
        ? "The run is zero, so the line is vertical and its slope is undefined."
        : `The slope is ${fmt(dy)} divided by ${fmt(dx)}, which is ${fmt(dy / dx, 3)}.`);
  }

  react([x1, y1, x2, y2], update);
}
