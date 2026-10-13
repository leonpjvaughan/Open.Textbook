// Guided investigation of the centre angle and circumference angle.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A circle with a centre angle twice the circumference angle, both standing on the same arc",
    prompt: "Both angles stand on the same arc.",
    width: 360,
    height: 230,
    max: 520,
  });

  const angle = slider(el, { show: false,
    id: "angle",
    label: "Circumference angle",
    min: 10,
    max: 80,
    step: 5,
    value: 35,
  });

  function draw() {
    const a = Number(angle.value);
    const c = 2 * a;
    const rad = Math.PI / 180;
    const x1 = 180 - 88 * Math.sin(a * rad);
    const x2 = 180 + 88 * Math.sin(a * rad);
    const y = 118 - 88 * Math.cos(a * rad);
    svg.innerHTML = `<circle cx="180" cy="118" r="88" fill="none" class="fig-ink" stroke="currentColor" stroke-width="2" />
      <circle cx="180" cy="118" r="4" class="fig-warn" />
      <circle cx="${x1.toFixed(1)}" cy="${y.toFixed(1)}" r="4" class="fig-accent" />
      <circle cx="${x2.toFixed(1)}" cy="${y.toFixed(1)}" r="4" class="fig-accent" />
      <circle cx="180" cy="206" r="4" class="fig-good" />
      <line x1="180" y1="118" x2="${x1.toFixed(1)}" y2="${y.toFixed(1)}" class="fig-grid" stroke="currentColor" />
      <line x1="180" y1="118" x2="${x2.toFixed(1)}" y2="${y.toFixed(1)}" class="fig-grid" stroke="currentColor" />
      <line x1="180" y1="206" x2="${x1.toFixed(1)}" y2="${y.toFixed(1)}" class="fig-ink" stroke="currentColor" />
      <line x1="180" y1="206" x2="${x2.toFixed(1)}" y2="${y.toFixed(1)}" class="fig-ink" stroke="currentColor" />
      <text x="185" y="112" class="text-warn">centre ${c}°</text>
      <text x="184" y="190" class="text-good">circumference ${a}°</text>`;
    readout.textContent = `Centre angle ${c} degrees; circumference angle ${a} degrees.`;
  }

  react(angle, draw);
}
