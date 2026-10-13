// Tier-1 guided investigation: the path of a projectile.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Two sliders set the launch speed and the launch angle. The figure
// draws the trajectory from ground level and reads back the time of flight, the
// range and the maximum height. The point of the investigation is that the
// horizontal and vertical motions are independent.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to both
// schemes. No colour literal appears here, and no runtime LaTeX: the readout is
// plain HTML.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "The curved path of a projectile launched from the ground, with its range and maximum height marked",
    width: 600,
    height: 300,
    max: 600,
  });

  const speed = slider(el, { show: true,
    id: "speed",
    label: "Launch speed (metres per second)",
    min: 10,
    max: 30,
    step: 1,
    value: 20,
  });
  const angle = slider(el, { show: true,
    id: "angle",
    label: "Launch angle (degrees above the horizontal)",
    min: 10,
    max: 80,
    step: 5,
    value: 45,
  });

  const G = 9.81;
  const LEFT = 70;
  const RIGHT = 560;
  const TOP = 30;
  const BOTTOM = 250;

  function update() {
    const u = Number(speed.value);
    const degrees = Number(angle.value);

    const radians = (degrees * Math.PI) / 180;
    const ux = u * Math.cos(radians);
    const uy = u * Math.sin(radians);
    const flight = (2 * uy) / G;
    const range = ux * flight;
    const height = (uy * uy) / (2 * G);

    const xMax = Math.max(range * 1.1, 1);
    const yMax = Math.max(height * 1.25, 1);

    function xFor(x) {
      return LEFT + (x / xMax) * (RIGHT - LEFT);
    }

    function yFor(y) {
      return BOTTOM - (y / yMax) * (BOTTOM - TOP);
    }

    let grid = "";
    for (let step = 0; step <= 4; step += 1) {
      const x = xFor((step / 4) * xMax);
      grid +=
        `<line x1="${x.toFixed(1)}" y1="${TOP}" x2="${x.toFixed(1)}" y2="${BOTTOM}" class="fig-grid"></line>` +
        `<text x="${x.toFixed(1)}" y="${BOTTOM + 18}" font-size="17" class="fig-ink" text-anchor="middle">${((step / 4) * xMax).toFixed(0)}</text>`;
    }
    for (let step = 0; step <= 4; step += 1) {
      const y = yFor((step / 4) * yMax);
      grid +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        `<text x="${LEFT - 8}" y="${(y + 4).toFixed(1)}" font-size="17" class="fig-ink" text-anchor="end">${((step / 4) * yMax).toFixed(0)}</text>`;
    }

    const axes =
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<text x="${RIGHT}" y="${BOTTOM + 18}" font-size="19" class="fig-ink" text-anchor="end">range (m)</text>` +
      `<text x="${LEFT - 60}" y="${TOP - 8}" font-size="19" class="fig-ink">height (m)</text>`;

    let path = "";
    const steps = 60;
    for (let index = 0; index <= steps; index += 1) {
      const t = (index / steps) * flight;
      const x = ux * t;
      const y = uy * t - 0.5 * G * t * t;
      path += `${xFor(x).toFixed(1)},${yFor(Math.max(y, 0)).toFixed(1)} `;
    }

    const apexX = xFor(range / 2);
    const apexY = yFor(height);
    const marker =
      `<line x1="${apexX.toFixed(1)}" y1="${apexY.toFixed(1)}" x2="${apexX.toFixed(1)}" y2="${BOTTOM}" class="fig-grid" stroke-dasharray="3 3"></line>` +
      `<circle cx="${apexX.toFixed(1)}" cy="${apexY.toFixed(1)}" r="5" class="fig-warn"></circle>`;

    svg.innerHTML =
      grid +
      axes +
      `<polyline points="${path.trim()}" class="fig-accent" fill="none" stroke-width="3"></polyline>` +
      marker;

    const bestAngle = degrees === 45 ? " This angle gives the greatest range for this speed." : "";
    readout.innerHTML =
      `Speed ${u} m/s at ${degrees}&deg;. The horizontal component is ` +
      `<strong>${ux.toFixed(1)} m/s</strong> and the vertical component is ` +
      `<strong>${uy.toFixed(1)} m/s</strong>. ` +
      `The time of flight is <strong>${flight.toFixed(2)} s</strong>, the range is ` +
      `<strong>${range.toFixed(1)} m</strong> and the maximum height is ` +
      `<strong>${height.toFixed(1)} m</strong>.${bestAngle} ` +
      `<em>At the highest point, what is the vertical velocity, and what is the horizontal velocity?</em>`;
  }

  react([speed, angle], update);
}
