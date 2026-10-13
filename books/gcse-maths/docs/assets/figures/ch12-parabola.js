// Guided family y = (x - p)^2 - 4; compare roots and turning point as p changes.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout, the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Coordinate graph of a movable quadratic curve with marked roots and turning point",
    width: 520,
    height: 330,
    max: 520,
  });

  const shift = slider(el, { show: false,
    id: "shift",
    label: "Horizontal shift p",
    min: -3,
    max: 3,
    step: 1,
    value: 0,
  });

  function update() {
    const p = Number(shift.value);
    const sx = x => 260 + x * 38;
    const sy = y => 205 - y * 24;
    const points = [];
    for (let x=-5; x<=5.001; x+=0.1) {
      const y=(x-p)**2-4;
      points.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
    }
    const rootL=p-2, rootR=p+2, turnX=p, turnY=-4;
    svg.innerHTML = `<line x1="40" y1="${sy(0)}" x2="480" y2="${sy(0)}" class="fig-ink" />
      <line x1="${sx(0)}" y1="25" x2="${sx(0)}" y2="320" class="fig-ink" />
      <polyline points="${points.join(' ')}" fill="none" stroke="currentColor" stroke-width="3" class="fig-accent" />
      <circle cx="${sx(rootL)}" cy="${sy(0)}" r="6" class="fig-good" /><circle cx="${sx(rootR)}" cy="${sy(0)}" r="6" class="fig-good" />
      <circle cx="${sx(turnX)}" cy="${sy(turnY)}" r="7" class="fig-warn" />
      <text x="${sx(rootL)}" y="${sy(0)-12}" text-anchor="middle" class="text-good">left root</text>
      <text x="${sx(rootR)}" y="${sy(0)-12}" text-anchor="middle" class="text-good">right root</text>
      <text x="${sx(turnX)+8}" y="${sy(turnY)+18}" class="text-warn">turning point</text>
      <text x="485" y="${sy(0)-5}" class="fig-ink">x</text><text x="${sx(0)+5}" y="22" class="fig-ink">y</text>`;
    readout.textContent = `p = ${p}; roots x = ${p-2} and x = ${p+2}; turning point (${p}, -4).`;
  }

  react(shift, update);
}
