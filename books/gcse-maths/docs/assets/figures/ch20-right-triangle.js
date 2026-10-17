// Guided right-triangle investigation: predict before changing the second leg.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Right-angled triangle with one fixed side and one adjustable side",
    width: 360,
    height: 220,
    max: 520,
  });

  const secondLeg = slider(el, { show: false,
    id: "second-leg",
    label: "Second shorter side",
    min: 1,
    max: 8,
    value: 4,
  });

  function update() {
    const b = Number(secondLeg.value), scale = 18, x0 = 25, y0 = 185, a = 6;
    const x1 = x0 + a * scale, y1 = y0 - b * scale, c = Math.hypot(a, b);
    svg.innerHTML = `<path d="M${x0} ${y0} L${x1} ${y0} L${x1} ${y1} Z" fill="none" stroke="currentColor" stroke-width="3" class="fig-accent"/><path d="M${x1 - 12} ${y0} L${x1 - 12} ${y0 - 12} L${x1} ${y0 - 12}" fill="none" stroke="currentColor" class="fig-grid"/>${label({ x: x0 + 40, y: y0 + 22, text: "6 units", anchor: "start", class: "text-ink" })}${label({ x: x1 + 5, y: y0 - b * scale / 2, text: `${b} units`, anchor: "start", class: "text-warn" })}${label({ x: x0 + 40, y: y0 - b * scale / 2 - 8, text: "hypotenuse", anchor: "start", class: "text-good" })}`;
    readout.textContent = `The hypotenuse is √(${a}² + ${b}²) = ${c.toFixed(2)} units.`;
  }

  react(secondLeg, update);
}
