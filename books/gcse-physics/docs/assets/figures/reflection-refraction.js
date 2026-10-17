// Tier-1 guided investigation: reflection and refraction at a glass surface.
//
// Guided, not a sandbox: the page asks the reader to predict which way the ray
// bends before moving the slider, then to explain why the change of speed makes
// it bend. The slider sets the angle of incidence. The angle of refraction uses
// Snell's law with an internal glass value, because the figure must draw the
// correct ray; the page does not teach that relationship and does not ask the
// reader to use it.
// Colours come from CSS classes so the figure adapts to dark mode and every
// bundle; each ray is also labelled.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const GLASS = 1.5;
  const originX = 300;
  const originY = 150;
  const reach = 130;

  const { svg, readout } = panel(el, {
    label:
      "A ray of light meeting a horizontal glass surface, with the reflected and refracted rays shown against the normal",
    width: 600,
    height: 300,
    max: 600,
  });

  const angleInput = slider(el, { show: false,
    id: "angle",
    label: "Angle of incidence:",
    min: 5,
    max: 85,
    step: 1,
    value: 40,
  });

  function point(angleDeg, down) {
    const angle = (angleDeg * Math.PI) / 180;
    const dx = reach * Math.sin(angle);
    const dy = reach * Math.cos(angle);
    return { x: originX + dx, y: originY + (down ? dy : -dy) };
  }

  function update() {
    const incidence = Number(angleInput.value);
    const refraction = (Math.asin(Math.sin((incidence * Math.PI) / 180) / GLASS) * 180) / Math.PI;

    const incidentStart = point(incidence, false);
    const reflectedEnd = { x: originX + (originX - incidentStart.x), y: incidentStart.y };
    const refractedEnd = point(refraction, true);

    svg.innerHTML =
      // The glass block, below the boundary.
      `<rect x="20" y="${originY}" width="560" height="130" class="fig-grid"></rect>` +
      `<line x1="20" y1="${originY}" x2="580" y2="${originY}" class="fig-ink"></line>` +
      // The normal.
      `<line x1="${originX}" y1="20" x2="${originX}" y2="280" class="fig-grid" ` +
      `stroke-dasharray="5 5"></line>` +
      `${label({ x: originX + 6, y: 28, text: `normal`, anchor: "start", size: SIZE.value, class: "text-ink" })}` +
      // The three rays.
      `<line x1="${incidentStart.x}" y1="${incidentStart.y}" x2="${originX}" y2="${originY}" ` +
      `class="fig-accent" stroke-width="2"></line>` +
      `<line x1="${originX}" y1="${originY}" x2="${reflectedEnd.x}" y2="${reflectedEnd.y}" ` +
      `class="fig-warn" stroke-width="2"></line>` +
      `<line x1="${originX}" y1="${originY}" x2="${refractedEnd.x}" y2="${refractedEnd.y}" ` +
      `class="fig-good" stroke-width="2"></line>` +
      // Labels.
      `${label({ x: incidentStart.x + 4, y: incidentStart.y - 4, text: `incident`, anchor: "start", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: reflectedEnd.x - 60, y: reflectedEnd.y - 4, text: `reflected`, anchor: "start", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: refractedEnd.x + 4, y: refractedEnd.y + 12, text: `refracted`, anchor: "start", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: originX + 4, y: 46, text: `i = ${incidence}\u00b0`, anchor: "start", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: originX + 4, y: 60, text: `r = ${refraction.toFixed(0)}\u00b0`, anchor: "start", size: SIZE.value, class: "text-ink" })}`;

    readout.innerHTML =
      `Angle of incidence <strong>${incidence}\u00b0</strong>. ` +
      `The angle of reflection is <strong>${incidence}\u00b0</strong>, because it always ` +
      `equals the angle of incidence. ` +
      `The angle of refraction is about <strong>${refraction.toFixed(0)}\u00b0</strong>, ` +
      `so the ray bends towards the normal as it enters the glass. ` +
      `<em>The angle of incidence and the angle of refraction are both measured from ` +
      `the normal.</em>`;
  }

  react(angleInput, update);
}
