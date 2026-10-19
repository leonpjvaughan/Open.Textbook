// Guided investigation: predict how enlargement changes a point's coordinates.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Coordinate grid showing a point and its enlarged image",
    width: 320,
    height: 230,
    max: 520,
  });

  svg.innerHTML = `
        <path d="M20 200H290 M60 210V20" class="fig-grid" style="fill:none" stroke="currentColor" stroke-width="1" />
        <circle class="fig-accent" cx="100" cy="160" r="5" fill="currentColor" />
        ${label({ x: 94, y: 156, text: "P", anchor: "end", class: "text-accent" })}`;

  const input = slider(el, { show: false,
    id: "scale",
    label: "Scale factor",
    min: 1,
    max: 4,
    value: 2,
  });

  function update() {
    const k = Number(input.value);
    const px = 60 + 40 * k;
    const py = 200 - 40 * k;
    svg.querySelectorAll('[data-image]').forEach((image) => image.remove());
    const imagePoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    imagePoint.setAttribute('data-image', '');
    imagePoint.setAttribute('cx', px);
    imagePoint.setAttribute('cy', py);
    imagePoint.setAttribute('r', '6');
    imagePoint.setAttribute('class', 'fig-good');
    imagePoint.setAttribute('fill', 'currentColor');
    svg.appendChild(imagePoint);
    const imageLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    imageLabel.setAttribute('data-image', '');
    imageLabel.setAttribute('x', px + 6);
    imageLabel.setAttribute('y', py - 6);
    imageLabel.setAttribute('class', 'text-good');
    imageLabel.textContent = 'image';
    svg.appendChild(imageLabel);
    svg.setAttribute('aria-label', `Coordinate grid with point P at (1, 1) and its image at (${k}, ${k}) after an enlargement of scale factor ${k}`);
    readout.textContent = `Scale factor ${k}. Explain how the image coordinates relate to P.`;
  }

  react(input, update);
}
