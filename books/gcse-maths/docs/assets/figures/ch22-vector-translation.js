// Guided translation: predict the direction from the signs, then test it.
//
// The scaffolding — the surface, its accessible name, the two sliders, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A point translated from the origin on a labelled coordinate grid",
    width: 360,
    height: 260,
    max: 520,
  });

  const horizontal = slider(el, {
    id: "horizontal",
    label: "Horizontal change",
    min: -4,
    max: 4,
    value: 3,
  });

  const vertical = slider(el, {
    id: "vertical",
    label: "Vertical change",
    min: -4,
    max: 4,
    value: 2,
  });

  function update() {
    const x = Number(horizontal.value);
    const y = Number(vertical.value);
    const ox = 180;
    const oy = 130;
    const px = ox + x * 28;
    const py = oy - y * 28;
    const grid = [];
    for (let i = -5; i <= 5; i += 1) {
      grid.push(`<line x1="${ox + i * 28}" y1="20" x2="${ox + i * 28}" y2="240" class="fig-grid"></line>`);
      grid.push(`<line x1="40" y1="${oy - i * 28}" x2="320" y2="${oy - i * 28}" class="fig-grid"></line>`);
    }
    svg.innerHTML = `${grid.join("")}
      <line x1="40" y1="${oy}" x2="320" y2="${oy}" class="fig-ink"></line>
      <line x1="${ox}" y1="20" x2="${ox}" y2="240" class="fig-ink"></line>
      <line x1="${ox}" y1="${oy}" x2="${px}" y2="${oy}" class="fig-warn"></line>
      <line x1="${px}" y1="${oy}" x2="${px}" y2="${py}" class="fig-good"></line>
      <line x1="${ox}" y1="${oy}" x2="${px}" y2="${py}" class="fig-accent"></line>
      <circle cx="${px}" cy="${py}" r="5" class="fig-accent"></circle>
      <text x="${ox + 6}" y="${oy + 18}" class="text-ink">start</text>
      <text x="${Math.min(px + 6, 280)}" y="${py - 8}" class="text-accent">end</text>
      <text x="302" y="${oy - 7}" class="text-ink">x</text>
      <text x="${ox + 7}" y="29" class="text-ink">y</text>`;
    const directionX = x < 0 ? "left" : x > 0 ? "right" : "no horizontal change";
    const directionY = y < 0 ? "down" : y > 0 ? "up" : "no vertical change";
    readout.textContent = `Vector (${x}, ${y}): ${directionX}; ${directionY}.`;
  }

  react([horizontal, vertical], update);
}
