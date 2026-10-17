// Guided box plot: adjust the upper quartile and observe the middle-half box.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Box plot for travel times from 12 to 42 minutes",
    width: 560,
    height: 150,
    max: 560,
  });

  const upper = slider(el, { show: false,
    id: "upper",
    label: "Upper quartile",
    min: 24,
    max: 34,
    value: 27,
  });

  function update() {
    const q3 = Number(upper.value);
    const x = value => 55 + value * 10;
    const q1 = 17.5;
    svg.innerHTML = `
      <line x1="${x(12)}" y1="95" x2="${x(42)}" y2="95" class="fig-ink" />
      <line x1="175" y1="55" x2="${x(q1)}" y2="55" class="fig-accent" />
      <line x1="${x(q3)}" y1="55" x2="475" y2="55" class="fig-accent" />
      <line x1="${x(12)}" y1="35" x2="${x(12)}" y2="75" class="fig-ink" />
      <line x1="${x(42)}" y1="35" x2="${x(42)}" y2="75" class="fig-ink" />
      <rect x="${x(q1)}" y="35" width="${x(q3) - x(q1)}" height="40" fill="none" stroke="currentColor" stroke-width="3" class="fig-accent" />
      <line x1="270" y1="35" x2="270" y2="75" class="fig-warn" stroke-width="3" />
      ${label({ x: x(12), y: 120, text: "12", anchor: "middle", class: "text-ink" })}
      ${label({ x: x(q1), y: 120, text: "17.5", anchor: "middle", class: "text-ink" })}
      ${label({ x: x(21.5), y: 120, text: "21.5", anchor: "middle", class: "text-warn" })}
      ${label({ x: x(q3), y: 120, text: q3, anchor: "middle", class: "text-ink" })}
      ${label({ x: x(42), y: 120, text: "42", anchor: "middle", class: "text-ink" })}
      ${label({ x: (x(q1) + x(q3)) / 2, y: 28, text: "middle half", anchor: "middle", class: "text-accent" })}`;
    readout.textContent = `The box runs from ${q1} to ${q3}; its width is ${q3 - q1} minutes.`;
  }

  react(upper, update);
}
