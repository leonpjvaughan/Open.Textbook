// Tier-1 guided investigation: speed, radius and centripetal force.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Two sliders set the speed and the radius of a small object moving in
// a horizontal circle. The figure draws the circle, the velocity along the
// tangent and the centripetal force towards the centre, and reads back the
// angular velocity, the centripetal acceleration and the force for a fixed mass.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to both
// schemes. No colour literal appears here, and no runtime LaTeX: the readout is
// plain HTML.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import {
  panel,
  quantity,
  react,
  slider,
} from "./kit.js";

// How far a ray from (x, y) in direction (ux, uy) travels before it meets the
// 600 by 300 frame, keeping a margin clear for the arrowhead.
function reach(x, y, ux, uy) {
  const margin = 8;
  let t = Infinity;
  if (ux > 1e-9) t = Math.min(t, (600 - margin - x) / ux);
  if (ux < -1e-9) t = Math.min(t, (margin - x) / ux);
  if (uy > 1e-9) t = Math.min(t, (300 - margin - y) / uy);
  if (uy < -1e-9) t = Math.min(t, (margin - y) / uy);
  return Math.max(0, t);
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "An object moving in a horizontal circle, with its velocity along the tangent and the centripetal force towards the centre",
    width: 600,
    height: 300,
    max: 600,
  });

  const speed = slider(el, { show: false,
    id: "speed",
    label: "Speed (metres per second)",
    min: 1,
    max: 15,
    step: 0.5,
    value: 6,
    format: (value) => value.toFixed(1),
  });
  const radius = slider(el, { show: false,
    id: "radius",
    label: "Radius (metres)",
    min: 0.5,
    max: 5,
    step: 0.1,
    value: 2,
    format: (value) => value.toFixed(1),
  });

  const MASS = 0.5;
  const CX = 300;
  const CY = 150;
  const ANGLE = -Math.PI / 5;

  function arrow(x1, y1, x2, y2, cls, width) {
    const head = 9;
    const length = Math.hypot(x2 - x1, y2 - y1);
    if (length < 1) return "";
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
    const v = Number(speed.value);
    const r = Number(radius.value);

    const pixels = 24 + (r / 5) * 100;
    const omega = v / r;
    const acceleration = (v * v) / r;
    const force = MASS * acceleration;
    const period = (2 * Math.PI * r) / v;

    const px = CX + pixels * Math.cos(ANGLE);
    const py = CY + pixels * Math.sin(ANGLE);

    // Unit vectors: outward along the radius and along the tangent.
    const ox = Math.cos(ANGLE);
    const oy = Math.sin(ANGLE);
    const tx = -oy;
    const ty = ox;

    // The acceleration can reach 450 m/s^2 at the smallest radius, so an arrow
    // length proportional to it would leave the canvas. Clamp each arrow: the
    // velocity arrow to the frame edge, and the force arrow to the radius, so it
    // never passes through the centre.
    const rawLength = 40 + acceleration * 1.5;
    const arrowLength = Math.min(rawLength, reach(px, py, tx, ty));
    const forceLength = Math.min(rawLength, pixels);

    const circle = `<circle cx="${CX}" cy="${CY}" r="${pixels.toFixed(1)}" class="fig-grid" style="fill:none" stroke-width="2"></circle>`;
    const radiusLine = `<line x1="${CX}" y1="${CY}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" class="fig-ink" stroke-dasharray="4 4"></line>`;
    const object = `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="7" class="fig-accent"></circle>`;
    const velocityArrow = arrow(
      px,
      py,
      px + tx * arrowLength,
      py + ty * arrowLength,
      "fig-warn",
      3
    );
    const forceArrow = arrow(
      px,
      py,
      px - ox * forceLength,
      py - oy * forceLength,
      "fig-good",
      3
    );

    svg.innerHTML = circle + radiusLine + object + velocityArrow + forceArrow;

    readout.innerHTML =
      `Speed ${quantity(v, "m", 1)}/s, radius ${quantity(r, "m", 1)}. ` +
      `The angular velocity is <strong>${omega.toFixed(2)} rad/s</strong>, ` +
      `the centripetal acceleration is <strong>${quantity(acceleration, "m", 2)}/s&sup2;</strong>, ` +
      `and for a mass of 0.50 kg the centripetal force is ` +
      `<strong>${quantity(force, "N", 2)}</strong>. The period is ${quantity(period, "s", 2)}. ` +
      `<em>The velocity arrow points along the tangent and the force arrow points to the centre. Double the speed: what happens to the force?</em>`;
  }

  react([speed, radius], update);
}
