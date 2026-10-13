// Guided graph investigation for a pair of linear equations.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout, the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Two straight lines crossing at a marked point",
    width: 520,
    height: 260,
    max: 520,
  });

  const xvalue = slider(el, { show: false,
    id: "xvalue",
    label: "Test x value",
    min: 0,
    max: 4,
    step: 1,
    value: 2,
  });

  function update() {
    const x = Number(xvalue.value);
    const y1 = 2 * x + 1;
    const y2 = -x + 7;
    const px = 70 + x * 90;
    // The lines and the dots share one scale and one set of equations, so the
    // crossing the reader reads off the drawing is the crossing the readout
    // reports. The scale keeps y = 2x + 1 (y = 9 at x = 4) inside the frame.
    const py = (y) => 220 - y * 20;
    const py1 = py(y1);
    const py2 = py(y2);
    const pxStart = 70;
    const pxEnd = 70 + 4 * 90;
    svg.innerHTML = `<line x1="50" y1="220" x2="470" y2="220" class="fig-ink"></line>
      <line x1="${pxStart}" y1="${py(2 * 0 + 1)}" x2="${pxEnd}" y2="${py(2 * 4 + 1)}" class="fig-accent"></line>
      <line x1="${pxStart}" y1="${py(-0 + 7)}" x2="${pxEnd}" y2="${py(-4 + 7)}" class="fig-good"></line>
      <line x1="${px}" y1="${Math.min(py1, py2)}" x2="${px}" y2="${Math.max(py1, py2)}" class="fig-grid"></line>
      <circle cx="${px}" cy="${py1}" r="5" class="fig-accent"></circle>
      <circle cx="${px}" cy="${py2}" r="5" class="fig-good"></circle>
      <text x="80" y="25" class="text-accent">y = 2x + 1</text>
      <text x="330" y="25" class="text-good">y = -x + 7</text>
      <text x="440" y="238" class="fig-ink">x</text>`;
    readout.className = `readout ${y1 === y2 ? "text-good" : "text-warn"}`;
    readout.textContent = `At x = ${x}: first line y = ${y1}; second line y = ${y2}${y1 === y2 ? ". The values match." : ". The values do not match yet."}`;
  }

  react(xvalue, update);
}
