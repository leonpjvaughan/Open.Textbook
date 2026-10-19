// Tier-1 guided investigation: the tangent at a point on a circle.
//
// The page asks the reader to predict the tangent at the top of the circle before
// they move a control, then to test it and write the explanation. The figure
// draws the circle, the radius to a point on it, the tangent at that point, and
// the right angle between them.
//
// Nothing here carries a colour: every shape uses a fig-* class and every word a
// text-* class, so the figure follows the reader's theme in both schemes.
import { SIZE, fmt, label, panel, react, scale, slider, toggle } from "./kit.js";

const RANGE = 10;
const X = scale({ domain: [-RANGE, RANGE], range: [34, 526] });
const Y = scale({ domain: [-RANGE, RANGE], range: [346, 34] });
const UNIT = X(1) - X(0);

// The tangent at (px, py) to x squared + y squared = r squared.
function tangentLine(px, py, r2) {
  if (px === 0) return `y = ${fmt(r2 / py, 3)}`;
  if (py === 0) return `x = ${fmt(r2 / px, 3)}`;
  const xTerm = px === 1 ? "x" : px === -1 ? "\u2212x" : `${fmt(px)}x`;
  const yTerm = `${py > 0 ? "+" : "\u2212"} ${fmt(Math.abs(py), 3)}y`;
  return `${xTerm} ${yTerm} = ${fmt(r2)}`;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A circle on a coordinate grid with a radius drawn to a point on it and the tangent at that point, meeting the radius at a right angle",
    width: 560,
    height: 380,
  });

  const rIn = slider(el, { id: "radius", show: true, label: "Radius", min: 2, max: 8, step: 1, value: 5 });
  const pxIn = slider(el, { id: "point-x", show: true, label: "x of P", min: -4, max: 4, step: 1, value: 3 });
  const above = toggle(el, { id: "above", label: "Point above the horizontal axis", checked: true });

  function update() {
    const r = Number(rIn.value);
    const limit = r - 1;
    pxIn.min = String(-limit);
    pxIn.max = String(limit);
    let px = Number(pxIn.value);
    if (px > limit) px = limit;
    if (px < -limit) px = -limit;
    pxIn.value = String(px);

    const py = (above.checked ? 1 : -1) * Math.sqrt(r * r - px * px);
    const r2 = r * r;

    let grid = "";
    for (let k = -RANGE + 1; k < RANGE; k += 1) {
      if (k === 0) continue;
      grid += `<line x1="${X(k)}" y1="${Y(-RANGE)}" x2="${X(k)}" y2="${Y(RANGE)}" class="fig-grid" stroke-width="0.6"></line>`;
      grid += `<line x1="${X(-RANGE)}" y1="${Y(k)}" x2="${X(RANGE)}" y2="${Y(k)}" class="fig-grid" stroke-width="0.6"></line>`;
    }
    grid += `<line x1="${X(-RANGE)}" y1="${Y(0)}" x2="${X(RANGE)}" y2="${Y(0)}" class="fig-ink" stroke-width="1.5"></line>`;
    grid += `<line x1="${X(0)}" y1="${Y(-RANGE)}" x2="${X(0)}" y2="${Y(RANGE)}" class="fig-ink" stroke-width="1.5"></line>`;

    // The tangent direction is perpendicular to the radius, so it is (-py, px).
    const reach = 9;
    const t1 = { x: px + (reach * py) / r, y: py - (reach * px) / r };
    const t2 = { x: px - (reach * py) / r, y: py + (reach * px) / r };

    // The right angle at P, built along the radius and the tangent in pixel space.
    const radial = { x: px / r, y: -py / r };
    const sideways = { x: -py / r, y: -px / r };
    const side = 14;
    const square = [
      `${X(px) + side * sideways.x},${Y(py) + side * sideways.y}`,
      `${X(px) + side * sideways.x - side * radial.x},${Y(py) + side * sideways.y - side * radial.y}`,
      `${X(px) - side * radial.x},${Y(py) - side * radial.y}`,
    ].join(" ");

    svg.innerHTML =
      grid +
      `<circle cx="${X(0)}" cy="${Y(0)}" r="${(r * UNIT).toFixed(1)}" class="fig-accent" style="fill:none" stroke-width="2.4"></circle>` +
      `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(px)}" y2="${Y(py)}" class="fig-good" stroke-width="2.4"></line>` +
      `<line x1="${X(t1.x)}" y1="${Y(t1.y)}" x2="${X(t2.x)}" y2="${Y(t2.y)}" class="fig-warn" stroke-width="2.4" stroke-dasharray="9 5"></line>` +
      `<polyline points="${square}" class="fig-ink" style="fill:none" stroke-width="1.5"></polyline>` +
      `<circle cx="${X(0)}" cy="${Y(0)}" r="5" class="fig-ink"></circle>` +
      `<circle cx="${X(px)}" cy="${Y(py)}" r="6" class="fig-warn"></circle>` +
      label({ x: X(px) + 12, y: Y(py) - 12, text: "P", size: SIZE.value, class: "text-warn", anchor: "start", weight: "bold" });

    const radiusSlope = px === 0 ? "undefined" : fmt(py / px, 3);
    const tangentSlope = py === 0 ? "undefined" : fmt(-px / py, 3);
    readout.textContent =
      `P is (${fmt(px)}, ${fmt(py, 3)}) on the circle x\u00b2 + y\u00b2 = ${fmt(r2)}. ` +
      `The radius slope is ${radiusSlope} and the tangent slope is ${tangentSlope}. ` +
      `The tangent is ${tangentLine(px, py, r2)}. ` +
      (px === 0
        ? "The radius is vertical, so the tangent is horizontal."
        : py === 0
          ? "The radius is horizontal, so the tangent is vertical."
          : "The radius and the tangent meet at a right angle, so their slopes multiply to -1.");
  }

  react([rIn, pxIn, above], update);
}
