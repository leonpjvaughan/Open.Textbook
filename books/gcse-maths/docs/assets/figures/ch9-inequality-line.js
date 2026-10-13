// Guided number-line investigation for strict and inclusive inequalities.
//
// The scaffolding — the surface, its accessible name, the controls, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { panel, slider, toggle, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Number line with a movable boundary and solution direction",
    width: 520,
    height: 90,
    max: 520,
  });

  const bound = slider(el, {
    id: "bound",
    label: "Boundary",
    min: -5,
    max: 5,
    value: 2,
    show: false,
  });
  const inclusive = toggle(el, { id: "inclusive", label: "Include the boundary" });

  react([bound, inclusive], () => {
    const b = Number(bound.value);
    const isInclusive = inclusive.checked;
    const x = 260 + b * 35;
    const circle = isInclusive
      ? `<circle cx="${x}" cy="42" r="7" class="fig-good"></circle>`
      : `<circle cx="${x}" cy="42" r="7" class="fig-warn"></circle>`;
    svg.innerHTML = `<line x1="45" y1="42" x2="475" y2="42" class="fig-ink"></line>
      <line x1="${x}" y1="42" x2="475" y2="42" class="fig-grid"></line>
      <line x1="${x}" y1="31" x2="${x}" y2="53" class="fig-accent"></line>
      ${circle}<text x="${x}" y="72" text-anchor="middle" class="fig-ink">${b}</text>
      <text x="55" y="25" class="text-accent">values greater than boundary</text>
      <text x="55" y="80" class="fig-ink">open: excluded · filled: included</text>`;
    readout.className = `readout ${isInclusive ? "text-good" : "text-warn"}`;
    readout.textContent = `x ${isInclusive ? "≥" : ">"} ${b}`;
  });
}
