// Guided investigation for the proof that a triangle's area is half a b sin C.
//
// The proof is half the base times the height, with the height rewritten through
// the sine ratio as `a sin C`. The figure makes the two things the proof needs
// visible at once: the perpendicular from B to the line through A and C, and the
// angle inside the right-angled triangle at C — which leaves the side AC when C
// is obtuse. That is why the slider runs past 90 degrees: the case an acute-only
// proof would miss is the one the reader has to see.
//
// Predict -> Test -> Explain per AGENTS.md P6: the page asks where the foot of the
// perpendicular lands before the reader touches the control. The readout is
// `aria-live` so the numbers reach a reader who cannot see the drawing, and every
// colour comes from a CSS class, so the figure adapts to every bundle and scheme.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A triangle with sides a and b meeting at C, a perpendicular from B to the line through A and C, and a slider that opens the angle at C",
    width: 420,
    height: 240,
    max: 540,
  });

  const cornerInput = slider(el, { show: false,
    id: "corner",
    label: "Open or close the angle at C:",
    name: "Size of the angle at C in degrees",
    min: 30,
    max: 150,
    step: 1,
    value: 60,
  });

  const BASE_Y = 195;
  const C = { x: 160, y: BASE_Y };
  const A = { x: 320, y: BASE_Y };
  const A_LEN = 3; // side a = BC, in the page's units
  const B_LEN = 4; // side b = CA
  const SCALE = 40; // pixels per unit

  const rad = (degrees) => (degrees * Math.PI) / 180;

  const line = (p, q, cls, width = 2, dash = "") =>
    `<line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" ` +
    `x2="${q.x.toFixed(1)}" y2="${q.y.toFixed(1)}" stroke-width="${width}" ` +
    (dash ? `stroke-dasharray="${dash}" ` : "") + `class="${cls}"></line>`;

  const text = (x, y, label, cls = "fig-ink") =>
    `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" text-anchor="middle" ` +
    `font-size="13" class="${cls}">${label}</text>`;

  // An arc about (cx, cy) from `from` to `to`, travelling straight from one angle
  // to the other. SVG's positive angle direction is clockwise on screen, because
  // y points down.
  function arc(cx, cy, r, from, to) {
    const at = (t) =>
      `${(cx + r * Math.cos(t)).toFixed(1)},${(cy + r * Math.sin(t)).toFixed(1)}`;
    const sweep = to > from ? 1 : 0;
    return `M ${at(from)} A ${r} ${r} 0 0 ${sweep} ${at(to)}`;
  }

  function draw() {
    const Cdeg = Number(cornerInput.value);
    const t = rad(Cdeg);

    // B sits above C, at the angle the slider gives, a side-length away.
    const B = { x: C.x + A_LEN * SCALE * Math.cos(t), y: BASE_Y - A_LEN * SCALE * Math.sin(t) };
    // The foot of the perpendicular from B to the line through A and C. For an
    // obtuse C it lands beyond C, off the side AC.
    const D = { x: B.x, y: BASE_Y };

    const height = A_LEN * Math.sin(t); // h = a sin C, in the page's units
    const fromHeight = 0.5 * B_LEN * height; // half b h
    const fromFormula = 0.5 * A_LEN * B_LEN * Math.sin(t); // half a b sin C

    // The right angle at D, drawn on the side the triangle has room for it.
    const size = 11;
    const towardsC = C.x >= D.x ? 1 : -1;
    const corner =
      `M ${(D.x + towardsC * size).toFixed(1)} ${BASE_Y} ` +
      `L ${(D.x + towardsC * size).toFixed(1)} ${BASE_Y - size} ` +
      `L ${D.x.toFixed(1)} ${BASE_Y - size}`;

    const aX = B.x >= C.x ? 18 : -18;
    const hX = D.x > C.x ? 24 : -24;

    svg.innerHTML = `
      ${line({ x: 24, y: BASE_Y }, { x: 396, y: BASE_Y }, "fig-grid", 2, "6 5")}
      <polygon points="${A.x},${A.y} ${B.x.toFixed(1)},${B.y.toFixed(1)} ${C.x},${C.y}"
               fill="none" stroke-width="2" class="fig-ink"></polygon>
      ${line(C, B, "fig-warn", 3)}
      ${line(C, A, "fig-accent", 3)}
      ${line(B, D, "fig-good", 2)}
      <path d="${corner}" fill="none" stroke-width="1.5" class="fig-grid"></path>
      <path d="${arc(C.x, C.y, 26, 0, -t)}" fill="none" stroke-width="2" class="fig-warn"></path>
      ${text(C.x + 46 * Math.cos(-t / 2), C.y + 46 * Math.sin(-t / 2), `C = ${Cdeg}°`, "text-warn")}
      ${text((C.x + B.x) / 2 + aX, (C.y + B.y) / 2, `a = ${A_LEN}`, "text-warn")}
      ${text((C.x + A.x) / 2, BASE_Y + 20, `b = ${B_LEN}`, "text-accent")}
      ${text(D.x + hX, (B.y + BASE_Y) / 2, `h = ${height.toFixed(2)}`, "text-good")}
      ${text(B.x, B.y - 12, "B")}
      ${text(A.x + 12, BASE_Y + 20, "A")}
      ${text(C.x - 14, BASE_Y + 20, "C")}
      ${text(D.x + (D.x < C.x ? -14 : 14), BASE_Y + 20, "D")}`;

    const where =
      Cdeg > 90
        ? "C is obtuse, so D has left the side AC and sits on the line beyond C."
        : "C is acute, so D sits on the side AC between A and C.";
    readout.textContent =
      `The angle at C is ${Cdeg}°. The height is a sin C = ${height.toFixed(2)}, ` +
      `so half the base times the height is ${fromHeight.toFixed(2)}. ` +
      `Worked out as half a b sin C it is ${fromFormula.toFixed(2)}. The two ` +
      `numbers agree. ${where}`;
  }

  react(cornerInput, draw);
}
