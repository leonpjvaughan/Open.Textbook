// Tier-1 guided investigation: the cone of a moving-coil loudspeaker.
//
// The page asks the reader to predict which way the cone moves for a positive
// current, then to reverse the current, then to explain why a changing current
// makes the cone vibrate. The figure shows the force and the cone position, not
// a real sound. Colours come from CSS classes.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentence, which are the parts that differ from every other figure.
import {
  label,
  panel,
  quantity,
  react,
  slider,
  SIZE,
} from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A cross-section of a moving-coil loudspeaker. A coil sits in the gap of a magnet and is joined to a cone. The current can be changed, and the cone moves with the force",
    width: 560,
    height: 220,
  });

  const currentInput = slider(el, { show: false,
    id: "current",
    label: "Current in the coil (A)",
    min: -2,
    max: 2,
    step: 0.5,
    value: 1.5,
    show: false,
  });

  function update() {
    const current = Number(currentInput.value);
    const shift = (current / 2) * 30;
    const base = 230 + shift;

    const magnet = `
      <rect x="300" y="55" width="60" height="45" rx="6" class="fig-ink" opacity="0.2"></rect>
      <rect x="300" y="120" width="60" height="45" rx="6" class="fig-ink" opacity="0.2"></rect>
      ${label({ x: 330, y: 45, text: `magnet`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}`;

    const cone = `
      <polygon points="70,25 70,195 ${base - 12},120" class="fig-ink" opacity="0.15"></polygon>
      ${label({ x: 80, y: 18, text: `cone`, anchor: "start", size: SIZE.tick, class: "text-ink" })}`;

    const coil = `
      <rect x="${base - 12}" y="100" width="24" height="40" rx="6" class="fig-accent"></rect>
      ${label({ x: base, y: 160, text: `coil`, anchor: "middle", size: SIZE.tick, class: "text-accent" })}`;

    let arrow = "";
    if (current > 0) {
      arrow =
        `<line x1="${base + 12}" y1="120" x2="${base - 45}" y2="120" class="fig-warn" stroke-width="3"></line>` +
        `<polygon points="${base - 45},120 ${base - 33},114 ${base - 33},126" class="fig-warn"></polygon>`;
    } else if (current < 0) {
      arrow =
        `<line x1="${base - 12}" y1="120" x2="${base + 45}" y2="120" class="fig-warn" stroke-width="3"></line>` +
        `<polygon points="${base + 45},120 ${base + 33},114 ${base + 33},126" class="fig-warn"></polygon>`;
    }

    svg.innerHTML = cone + coil + magnet + arrow;

    if (current === 0) {
      readout.innerHTML =
        `The current is <strong>zero</strong>, so the force on the coil is zero and ` +
        `the cone rests. <em>Move the slider to send a current.</em>`;
      return;
    }
    const way = current > 0 ? "outwards, away from the magnet" : "inwards, towards the magnet";
    readout.innerHTML =
      `Current <strong>${quantity(current, "A", 1)}</strong>. The force on the coil pushes the ` +
      `cone <strong>${way}</strong>. ` +
      `<em>Now reverse the current. Which way does the cone move?</em>`;
  }

  react(currentInput, update);
}
