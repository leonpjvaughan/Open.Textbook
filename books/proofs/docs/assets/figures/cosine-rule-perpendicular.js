// Guided investigation for the proof of the cosine rule.
//
// The proof is a picture: drop a perpendicular from C to AB and the triangle splits
// into two right-angled ones. The cosine ratio gives x = b cos A in the left
// triangle, Pythagoras gives h² = b² − x², and Pythagoras in the right triangle
// gives a² = h² + (c − x)². Substitute and the x² terms cancel, leaving
// a² = b² + c² − 2bc cos A. The reader moves the angle and the base and watches the
// two ways of working out a² agree at every setting, so the identity is observed
// rather than asserted.
//
// The figure covers the acute case, which is the case the proof sets out first; the
// page's own paragraph handles the obtuse case. Colours come from CSS classes, so
// the figure adapts to every bundle and both schemes; the readout is `aria-live`,
// so the arithmetic reaches a reader who cannot see the drawing.
//
// The scaffolding — the surface, its accessible name, the sliders, the live readout
// and the redraw — comes from `kit.js`. What is left here is the drawing and the
// sentences, which are the parts that differ from every other figure.
import { panel, slider, react, label, line, path, fmt } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A triangle with a perpendicular dropped from the top corner to the base, splitting it into two right-angled triangles that share the same height",
    width: 520,
    height: 275,
    max: 560,
  });

  const angle = slider(el, {
    show: true,
    id: "angle",
    label: "Angle A:",
    name: "Angle at A in degrees",
    min: 25,
    max: 85,
    step: 5,
    value: 55,
    unit: "°",
  });
  const base = slider(el, {
    show: true,
    id: "base",
    label: "Side c:",
    name: "Length of side c",
    min: 120,
    max: 200,
    step: 10,
    value: 150,
  });

  const B_LENGTH = 110; // side b, fixed so the drawing stays still
  const A = { x: 190, y: 212 };

  function draw() {
    const degrees = Number(angle.value);
    const c = Number(base.value);
    const radians = (degrees * Math.PI) / 180;

    const B = { x: A.x + c, y: A.y };
    const C = { x: A.x + B_LENGTH * Math.cos(radians), y: A.y - B_LENGTH * Math.sin(radians) };
    const D = { x: C.x, y: A.y }; // the foot of the perpendicular

    const x = B_LENGTH * Math.cos(radians); // AD, along the base
    const h = B_LENGTH * Math.sin(radians); // CD
    const pythagoras = h * h + (c - x) * (c - x);
    const rule = B_LENGTH * B_LENGTH + c * c - 2 * B_LENGTH * c * Math.cos(radians);

    const size = 9; // the right-angle markers at the foot
    const mark = (sign) =>
      path({
        d: `M ${D.x + sign * size} ${D.y} L ${D.x + sign * size} ${D.y - size} L ${D.x} ${D.y - size}`,
        class: "fig-grid",
        width: 1.4,
      });

    svg.innerHTML =
      path({
        d: `M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`,
        class: "fig-ink",
        fill: "none",
        width: 2,
      }) +
      line({ x1: A.x, y1: A.y, x2: C.x, y2: C.y, class: "fig-warn", width: 3 }) +
      line({ x1: B.x, y1: B.y, x2: C.x, y2: C.y, class: "fig-good", width: 3 }) +
      line({ x1: C.x, y1: C.y, x2: D.x, y2: D.y, class: "fig-grid", width: 2, dash: "5 4" }) +
      mark(-1) +
      mark(1) +
      // The vertices.
      label({ x: A.x - 12, y: A.y + 18, text: "A" }) +
      label({ x: B.x + 12, y: B.y + 18, text: "B" }) +
      label({ x: C.x, y: C.y - 12, text: "C" }) +
      label({ x: D.x, y: A.y + 36, text: "D" }) +
      // The two right-angled triangles' sides, named.
      label({ x: (A.x + C.x) / 2 - 14, y: (A.y + C.y) / 2 - 6, text: "b" }) +
      label({ x: (B.x + C.x) / 2 + 14, y: (B.y + C.y) / 2 - 6, text: "a" }) +
      label({ x: (A.x + B.x) / 2, y: A.y + 20, text: "c" }) +
      // The split of the base, and the height.
      label({ x: (A.x + D.x) / 2, y: A.y - 8, text: "x" }) +
      label({ x: (D.x + B.x) / 2, y: A.y - 8, text: "c − x" }) +
      label({ x: D.x - 8, y: (C.y + D.y) / 2, text: "h", anchor: "end" });

    readout.textContent =
      `Angle A = ${degrees}°, b = ${B_LENGTH} and c = ${c}. The perpendicular gives ` +
      `x = b cos A = ${fmt(x, 1)} and h = b sin A = ${fmt(h, 1)}. Pythagoras in the ` +
      `two right-angled triangles: h² + (c − x)² = ${fmt(pythagoras, 1)}. The cosine ` +
      `rule: b² + c² − 2bc cos A = ${fmt(rule, 1)}. Both are a², and they agree.`;
  }

  react([angle, base], draw);
}
