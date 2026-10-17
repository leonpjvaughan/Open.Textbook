// Tier-1 guided investigation: the two perpendicular components of a vector.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. The magnitude sets the length of the vector and the angle sets its
// direction; the figure draws the vector and the two components it resolves
// into, and reads back the components. The component along the x-axis is the
// cosine of the angle and the component along the y-axis is the sine, which is
// the point of the investigation.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the
// readout is plain HTML.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A vector arrow on axes, with dashed lines to its horizontal and vertical components",
    width: 540,
    height: 280,
    max: 600,
  });

  const magnitude = slider(el, { show: true,
    id: "magnitude",
    label: "Magnitude",
    min: 0,
    max: 20,
    step: 1,
    value: 10,
  });
  const angle = slider(el, { show: true,
    id: "angle",
    label: "Angle from the horizontal",
    min: 0,
    max: 180,
    step: 1,
    value: 40,
  });

  const ORIGIN_X = 270;
  const ORIGIN_Y = 230;
  const SCALE = 8; // pixels per unit, so a magnitude of 20 reaches 160 px
  const LEFT = 90;
  const RIGHT = 470;
  const TOP = 50;

  function components(m, degrees) {
    const radians = (degrees * Math.PI) / 180;
    return { x: m * Math.cos(radians), y: m * Math.sin(radians) };
  }

  function arrow(x1, y1, x2, y2, cls, width) {
    const head = 9;
    const length = Math.hypot(x2 - x1, y2 - y1);
    if (length < 1) {
      return `<circle cx="${x1}" cy="${y1}" r="4" class="${cls}"></circle>`;
    }
    const ux = (x2 - x1) / length;
    const uy = (y2 - y1) / length;
    const baseX = x2 - ux * head;
    const baseY = y2 - uy * head;
    const perpX = -uy * 6;
    const perpY = ux * 6;
    return (
      `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${baseX.toFixed(1)}" y2="${baseY.toFixed(1)}" class="${cls}" stroke-width="${width}"></line>` +
      `<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ` +
      `${(baseX + perpX).toFixed(1)},${(baseY + perpY).toFixed(1)} ` +
      `${(baseX - perpX).toFixed(1)},${(baseY - perpY).toFixed(1)}" class="${cls}"></polygon>`
    );
  }

  function update() {
    const m = Number(magnitude.value);
    const degrees = Number(angle.value);

    const { x, y } = components(m, degrees);
    const tipX = ORIGIN_X + x * SCALE;
    const tipY = ORIGIN_Y - y * SCALE;
    const xTipX = ORIGIN_X + x * SCALE;
    const yTipY = ORIGIN_Y - y * SCALE;

    const axes =
      `<line x1="${LEFT}" y1="${ORIGIN_Y}" x2="${RIGHT}" y2="${ORIGIN_Y}" class="fig-ink"></line>` +
      `<line x1="${ORIGIN_X}" y1="${ORIGIN_Y}" x2="${ORIGIN_X}" y2="${TOP}" class="fig-ink"></line>` +
      `${label({ x: RIGHT + 6, y: ORIGIN_Y + 4, text: `x`, anchor: "start", size: SIZE.tick, class: "text-ink" })}` +
      `${label({ x: ORIGIN_X - 4, y: TOP - 6, text: `y`, anchor: "end", size: SIZE.tick, class: "text-ink" })}`;

    // Dashed guides from the tip of the vector to the two component tips.
    const guides =
      `<line x1="${tipX.toFixed(1)}" y1="${tipY.toFixed(1)}" x2="${xTipX.toFixed(1)}" y2="${ORIGIN_Y}" class="fig-grid" stroke-dasharray="3 3"></line>` +
      `<line x1="${tipX.toFixed(1)}" y1="${tipY.toFixed(1)}" x2="${ORIGIN_X}" y2="${yTipY.toFixed(1)}" class="fig-grid" stroke-dasharray="3 3"></line>`;

    const xComponent = arrow(ORIGIN_X, ORIGIN_Y, xTipX, ORIGIN_Y, "fig-accent", 3);
    const yComponent = arrow(ORIGIN_X, ORIGIN_Y, ORIGIN_X, yTipY, "fig-good", 3);
    const vector = arrow(ORIGIN_X, ORIGIN_Y, tipX, tipY, "fig-warn", 3);

    svg.innerHTML = axes + guides + xComponent + yComponent + vector;

    const sign = x < 0 ? "acts to the left" : "acts to the right";
    readout.innerHTML =
      `Magnitude ${m}, angle ${degrees}&deg;. ` +
      `The x-component is <strong>${x.toFixed(1)}</strong> (${sign}), ` +
      `and the y-component is <strong>${y.toFixed(1)}</strong>. ` +
      `<em>At what angle are the two components equal? Set the magnitude to 10 and check.</em>`;
  }

  react([magnitude, angle], update);
}
