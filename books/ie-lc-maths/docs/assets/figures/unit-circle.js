// Guided investigation: the unit circle.
//
// The page asks the reader to predict the signs of sin and cos in each quadrant, then
// to move the angle and check, then to find the angle whose sine and cosine are both
// negative. So the figure has to draw the radius, the point (cos, sin) on the circle,
// and the two projections that are the coordinates themselves.
//
// Nothing here carries a colour. The cosine is drawn in the warning class and the sine
// in the good class, and each is labelled with its name, so the two are told apart
// without relying on colour. The scaffolding — the panel, its accessible name, the
// slider, the readout and the redraw — comes from `kit.js`.
import { SIZE, fmt, label, panel, react, scale, slider } from "./kit.js";

// The centre of the circle, in SVG units, and its radius.
const CX = 280;
const CY = 214;
const R = 150;
// The sliders' readout is in degrees; the drawing works in radians.
const REACH = 1.16;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A unit circle with a movable angle, showing the point whose coordinates are the cosine and the sine of the angle",
    width: 560,
    height: 430,
  });

  const angleInput = slider(el, {
    show: true,
    id: "angle",
    label: "Angle",
    min: 0,
    max: 360,
    step: 5,
    value: 120,
    unit: "\u00b0",
  });

  // One mapping for each axis: a value in [-1, 1] to an SVG coordinate. The y mapping
  // is reversed, because an SVG y counts downwards and the sine counts upwards.
  const toX = scale({ domain: [-REACH, REACH], range: [CX - R * REACH, CX + R * REACH] });
  const toY = scale({ domain: [-REACH, REACH], range: [CY + R * REACH, CY - R * REACH] });

  function update() {
    const deg = Number(angleInput.value);
    const rad = (deg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const x = toX(cos);
    const y = toY(sin);

    // The axes, with a grid line every quarter unit.
    let axes = "";
    for (const k of [-1, -0.5, 0.5, 1]) {
      axes += `<line x1="${toX(k)}" y1="${toY(-REACH)}" x2="${toX(k)}" y2="${toY(REACH)}" class="fig-grid" stroke-width="0.7"></line>`;
      axes += `<line x1="${toX(-REACH)}" y1="${toY(k)}" x2="${toX(REACH)}" y2="${toY(k)}" class="fig-grid" stroke-width="0.7"></line>`;
    }
    axes += `<line x1="${toX(-REACH)}" y1="${CY}" x2="${toX(REACH)}" y2="${CY}" class="fig-ink" stroke-width="1.6"></line>`;
    axes += `<line x1="${CX}" y1="${toY(-REACH)}" x2="${CX}" y2="${toY(REACH)}" class="fig-ink" stroke-width="1.6"></line>`;
    axes += label({ x: toX(1.12), y: CY - 12, text: "cos", size: SIZE.tick, class: "text-ink", anchor: "end" });
    axes += label({ x: CX + 14, y: toY(1.12), text: "sin", size: SIZE.tick, class: "text-ink", anchor: "start" });
    axes += label({ x: toX(1), y: CY + 22, text: "1", size: SIZE.tick, class: "text-ink" });
    axes += label({ x: toX(-1), y: CY + 22, text: "\u22121", size: SIZE.tick, class: "text-ink" });

    // The circle itself, and the angle arc from the positive cosine axis.
    const circle = `<circle cx="${CX}" cy="${CY}" r="${R}" class="fig-grid" stroke-width="1.4"></circle>`;
    const arcX = CX + 46 * Math.cos(rad);
    const arcY = CY - 46 * Math.sin(rad);
    const arc =
      deg === 0 || deg === 360
        ? ""
        : `<path d="M ${CX + 46} ${CY} A 46 46 0 ${deg > 180 ? 1 : 0} 0 ${arcX} ${arcY}" class="fig-grid" stroke-width="1.6" style="fill:none"></path>`;

    // The radius, and the two projections that are the coordinates.
    const radius = `<line x1="${CX}" y1="${CY}" x2="${x}" y2="${y}" class="fig-accent" stroke-width="2.4"></line>`;
    const drop = `<line x1="${x}" y1="${y}" x2="${x}" y2="${CY}" class="fig-grid" stroke-width="1.2" stroke-dasharray="4 3"></line>`;
    const rise = `<line x1="${x}" y1="${y}" x2="${CX}" y2="${y}" class="fig-grid" stroke-width="1.2" stroke-dasharray="4 3"></line>`;
    const cosine = `<line x1="${CX}" y1="${CY}" x2="${x}" y2="${CY}" class="fig-warn" stroke-width="4"></line>`;
    const sine = `<line x1="${CX}" y1="${CY}" x2="${CX}" y2="${y}" class="fig-good" stroke-width="4"></line>`;

    const point =
      `<circle cx="${x}" cy="${y}" r="8" class="fig-accent"></circle>` +
      `<circle cx="${CX}" cy="${CY}" r="3.5" class="fig-ink"></circle>` +
      label({ x: x + 14, y: y - 12, text: "(cos, sin)", size: SIZE.tick, class: "text-accent", anchor: "start" }) +
      label({ x: (CX + x) / 2, y: CY + 24, text: "cos", size: SIZE.tick, class: "text-warn" }) +
      label({ x: CX - 16, y: (CY + y) / 2, text: "sin", size: SIZE.tick, class: "text-good", anchor: "end" });

    svg.innerHTML = `${axes}${circle}${arc}${drop}${rise}${cosine}${sine}${radius}${point}`;

    // The quadrant, and what it says about the signs.
    const quadrant =
      deg === 0 || deg === 90 || deg === 180 || deg === 270 || deg === 360
        ? "on an axis"
        : deg < 90
          ? "in the first quadrant"
          : deg < 180
            ? "in the second quadrant"
            : deg < 270
              ? "in the third quadrant"
              : "in the fourth quadrant";
    const signs =
      cos === 0
        ? "cos is zero here"
        : sin === 0
          ? "sin is zero here"
          : `cos is ${cos > 0 ? "positive" : "negative"} and sin is ${sin > 0 ? "positive" : "negative"}`;

    readout.textContent =
      `The angle is ${fmt(deg, 0)}\u00b0, which is ${fmt(rad, 3)} radians. ` +
      `The point is (${fmt(cos, 3)}, ${fmt(sin, 3)}), so cos = ${fmt(cos, 3)} and sin = ${fmt(sin, 3)}. ` +
      `It lies ${quadrant}, and there ${signs}.`;
  }

  react([angleInput], update);
}
