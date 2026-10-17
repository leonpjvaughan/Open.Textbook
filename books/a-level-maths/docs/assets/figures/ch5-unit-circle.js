// Guided investigation for radian measure and the arc of a unit circle.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`.
import { SIZE, label, panel, react, slider } from "./kit.js";

const CENTRE = 160;
const RADIUS = 112;
const TAU = 2 * Math.PI;

function point(angle) {
  return [CENTRE + RADIUS * Math.cos(angle), CENTRE - RADIUS * Math.sin(angle)];
}

function arcPoints(angle) {
  const steps = Math.max(2, Math.ceil((Math.abs(angle) * 64) / TAU));
  let points = "";
  for (let index = 0; index <= steps; index += 1) {
    const [x, y] = point((angle * index) / steps);
    points += `${x.toFixed(1)},${y.toFixed(1)} `;
  }
  return points.trim();
}

function fixedSpecial(degrees) {
  const table = {
    30: "(root 3 / 2, 1 / 2)",
    45: "(root 2 / 2, root 2 / 2)",
    60: "(1 / 2, root 3 / 2)",
    90: "(0, 1)",
    120: "(-1 / 2, root 3 / 2)",
    135: "(-root 2 / 2, root 2 / 2)",
    150: "(-root 3 / 2, 1 / 2)",
    180: "(-1, 0)",
    270: "(0, -1)",
    360: "(1, 0)",
  };
  return table[degrees] || "";
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A unit circle with a radius at the chosen angle and the matching arc marked",
    width: 320,
    height: 320,
    max: 520,
  });

  const angleInput = slider(el, { show: false,
    id: "angle",
    label: "Angle in degrees",
    min: 0,
    max: 360,
    step: 5,
    value: 30,
  });

  function update() {
    const degrees = Number(angleInput.value);
    const radians = (degrees * Math.PI) / 180;
    const [px, py] = point(radians);
    const [ax, ay] = point(0);

    const axes =
      `<line x1="${CENTRE - RADIUS - 16}" y1="${CENTRE}" x2="${CENTRE + RADIUS + 16}" y2="${CENTRE}" class="fig-ink"></line>` +
      `<line x1="${CENTRE}" y1="${CENTRE + RADIUS + 16}" x2="${CENTRE}" y2="${CENTRE - RADIUS - 16}" class="fig-ink"></line>`;

    const circle =
      `<circle cx="${CENTRE}" cy="${CENTRE}" r="${RADIUS}" class="fig-ink"></circle>`;

    // The arc, drawn along the rim, whose length in units of the radius is the
    // angle in radians.
    const arc =
      degrees > 0
        ? `<polyline points="${arcPoints(radians)}" class="fig-accent"></polyline>`
        : "";

    const radius =
      `<line x1="${CENTRE}" y1="${CENTRE}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" class="fig-warn"></line>` +
      `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" class="fig-accent"></circle>` +
      label({ x: CENTRE + 6, y: CENTRE - 8, text: "r = 1", anchor: "start", class: "text-ink" }) +
      label({ x: ax + 8, y: ay + 16, text: "0", anchor: "start", class: "text-ink" });

    svg.innerHTML = axes + circle + arc + radius;

    const arcText = radians.toFixed(2);
    const special = fixedSpecial(degrees);
    readout.textContent =
      `Angle ${degrees} degrees, which is ${radians.toFixed(2)} radians. ` +
      `The arc has length ${arcText} because the radius is 1. ` +
      `The point on the rim is (${Math.cos(radians).toFixed(3)}, ${Math.sin(radians).toFixed(3)}).` +
      (special ? ` Exact coordinates: ${special}.` : "");

    svg.setAttribute(
      "aria-label",
      `A unit circle. The radius is drawn at ${degrees} degrees, which is ` +
        `${radians.toFixed(2)} radians. The arc from the positive x axis to the ` +
        `radius has length ${arcText} units.`
    );
  }

  react(angleInput, update);
}
