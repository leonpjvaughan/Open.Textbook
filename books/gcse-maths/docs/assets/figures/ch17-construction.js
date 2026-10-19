// Guided construction: equal-radius arcs locate a perpendicular bisector.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Equal-radius arcs drawn from two fixed endpoints, meeting the perpendicular bisector",
    prompt: "Two fixed points and equal-radius arcs locate points equally far from both ends.",
    width: 320,
    height: 190,
  });

  svg.innerHTML = `
      <line x1="70" y1="95" x2="250" y2="95" class="fig-ink" stroke="currentColor" stroke-width="3" />
      <g class="arcs" style="fill:none" stroke="currentColor" stroke-width="2">
        <path class="fig-accent arc-a" />
        <path class="fig-warn arc-b" />
      </g>
      <line x1="160" y1="10" x2="160" y2="180" class="fig-good" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4" />
      <circle cx="70" cy="95" r="4" class="fig-ink" fill="currentColor" />
      <circle cx="250" cy="95" r="4" class="fig-ink" fill="currentColor" />
      ${label({ x: 58, y: 118, text: "A", anchor: "start", class: "text-ink" })}${label({ x: 254, y: 118, text: "B", anchor: "start", class: "text-ink" })}`;

  const input = slider(el, { show: false,
    id: "width",
    label: "Compass width",
    min: 60,
    max: 125,
    step: 5,
    value: 100,
  });

  function draw() {
    const r = Number(input.value);
    const half = 90; // half of the 180-unit segment between A and B
    const y = Math.sqrt(Math.max(0, r * r - half * half));
    // The crossings lie on the right half of the circle about A and the left
    // half of the circle about B, so those are the halves to draw. Two upper
    // semicircles meet only above the segment, which is not the construction.
    el.querySelector('.arc-a').setAttribute('d', `M 70 ${95 - r} A ${r} ${r} 0 0 1 70 ${95 + r}`);
    el.querySelector('.arc-b').setAttribute('d', `M 250 ${95 - r} A ${r} ${r} 0 0 0 250 ${95 + r}`);
    if (r < half) {
      readout.textContent = `The marked endpoints are 180 units apart. Each arc radius is ${r} units, which is less than half the segment, so the arcs do not meet. Widen the compass to draw the perpendicular bisector.`;
      svg.setAttribute('aria-label', `Two equal-radius arcs drawn from endpoints A and B. The compass width of ${r} units is less than half the 180-unit segment, so the arcs do not meet.`);
    } else if (y === 0) {
      readout.textContent = `The marked endpoints are 180 units apart. Each arc radius is ${r} units, exactly half the segment, so the arcs touch at the midpoint of the segment.`;
      svg.setAttribute('aria-label', `Two equal-radius arcs drawn from endpoints A and B. The arcs are tangent at the midpoint of the segment, giving one point equally far from both ends.`);
    } else {
      const gap = Math.round(y);
      readout.textContent = `The marked endpoints are 180 units apart. Each arc radius is ${r} units, so the arcs cross ${gap} units above and ${gap} units below the segment.`;
      svg.setAttribute('aria-label', `Two equal-radius arcs drawn from endpoints A and B. The arcs cross about ${gap} units above and ${gap} units below the segment; the two crossings define the perpendicular bisector.`);
    }
  }

  react(input, draw);
}
