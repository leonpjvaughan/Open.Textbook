// Guided investigation: how the circumference and the area of a circle scale with
// its radius. The scaffolding — the surface, its accessible name, the slider, the
// live readout, the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentence, which differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Two bars comparing how the circumference and the area of a circle scale with its radius",
    width: 420,
    height: 170,
    max: 560,
  });

  const radius = slider(el, { show: false,
    id: "radius",
    label: "Radius in units",
    min: 1,
    max: 8,
    value: 2,
  });

  function draw() {
    const r = Number(radius.value), c = 2 * Math.PI * r, a = Math.PI * r * r;
    const circumferenceFactor = r, areaFactor = r * r, scale = 100 / 64;
    const ch = circumferenceFactor * scale, ah = areaFactor * scale;
    svg.setAttribute('aria-label', `Relative to radius 1: circumference scales by ${circumferenceFactor}; area scales by ${areaFactor}.`);
    svg.innerHTML = `<path d="M45 140 H400 M45 140 V20" fill="none" class="fig-grid"/>` +
      `<rect x="100" y="${140 - ch}" width="70" height="${ch}" class="fig-accent"/>` +
      `<rect x="230" y="${140 - ah}" width="70" height="${ah}" class="fig-good"/>` +
      `<text x="111" y="${Math.max(18, 132 - ch)}" class="fig-ink">${circumferenceFactor}×</text>` +
      `<text x="251" y="${Math.max(18, 132 - ah)}" class="fig-ink">${areaFactor}×</text>` +
      `<text x="108" y="158" class="text-accent">C multiple</text>` +
      `<text x="241" y="158" class="text-good">A multiple</text>`;
    readout.textContent = `Radius ${r}: circumference ${c.toFixed(2)} units; area ${a.toFixed(2)} square units. Compared with radius 1, these are ${circumferenceFactor} times the circumference and ${areaFactor} times the area. Explain why doubling the radius changes each ratio by a different factor.`;
  }

  react(radius, draw);
}
