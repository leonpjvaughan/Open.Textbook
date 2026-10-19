// Guided investigation for the proof that a triangle's angles add to 180 degrees.
//
// The picture is the proof: a line through the top corner parallel to the base.
// The two angles the triangle makes at the base reappear at the top corner as
// alternate angles, so the three angles at the top corner are the triangle's
// three angles, and they lie on a straight line.
//
// The reader is asked to predict before touching the slider (Predict -> Test ->
// Explain, AGENTS.md P6), so the figure changes one thing — where the top corner
// sits — and reports the three angles rather than telling the reader what to
// conclude. Colours come from CSS classes so the figure adapts to every bundle
// and both schemes, and the readout is `aria-live` so a reader who cannot see the
// drawing is told what changed.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A triangle with a line drawn through its top corner parallel to the base, showing the three angles at the top corner lying on a straight line",
    width: 400,
    height: 220,
    max: 520,
  });

  const apex = slider(el, { show: false,
    id: "apex",
    label: "Move the top corner:",
    name: "Position of the top corner",
    min: 120,
    max: 280,
    step: 2,
    value: 200,
  });

  const TOP_Y = 54;
  const BASE_Y = 178;
  const B = { x: 76, y: BASE_Y };
  const C = { x: 324, y: BASE_Y };
  const R = 30; // the arc radius at the top corner

  const angle = (radians) => (radians * 180) / Math.PI;

  // The angle at P between the rays to Q and to R.
  function between(P, Q, R) {
    const a = { x: Q.x - P.x, y: Q.y - P.y };
    const b = { x: R.x - P.x, y: R.y - P.y };
    const dot = a.x * b.x + a.y * b.y;
    const magnitude = Math.hypot(a.x, a.y) * Math.hypot(b.x, b.y);
    return angle(Math.acos(Math.max(-1, Math.min(1, dot / magnitude))));
  }

  // An arc of radius r about (cx, cy), from `from` to `to` radians. `sweep` follows
  // the direction of travel: SVG's positive angle direction is clockwise on
  // screen, because y points down.
  function arc(cx, cy, r, from, to) {
    const at = (t) => `${(cx + r * Math.cos(t)).toFixed(1)},${(cy + r * Math.sin(t)).toFixed(1)}`;
    const large = Math.abs(to - from) > Math.PI ? 1 : 0;
    const sweep = to > from ? 1 : 0;
    return `M ${at(from)} A ${r} ${r} 0 ${large} ${sweep} ${at(to)}`;
  }

  const text = (x, y, words) => label({ x, y, text: words, size: SIZE.tick });

  function draw() {
    const A = { x: Number(apex.value), y: TOP_Y };

    // Directions from the top corner, in the SVG's own coordinates.
    const toB = Math.atan2(B.y - A.y, B.x - A.x); // down and left
    const toC = Math.atan2(C.y - A.y, C.x - A.x); // down and right

    // The parallel line runs left (180 degrees) and right (0 degrees). The three
    // angles at the top corner are the parallel line to AB, then AB to AC, then
    // AC to the parallel line. Alternate angles make the top-corner outer angles
    // equal to the base angles at B and C, which is what the picture shows.
    const atB = between(B, A, C);
    const atC = between(C, A, B);

    // Show one decimal place, and give the apex whatever is left after rounding
    // the two base angles, so the three numbers the reader can see add to exactly
    // 180. Rounding each of the three separately made them add to 179 or 181 at
    // about a third of the slider positions, in a proof whose whole page is this
    // sum. The base angles are the same angles the top corner repeats.
    const shownLeft = Number(atB.toFixed(1));
    const shownRight = Number(atC.toFixed(1));
    const shownApex = Number((180 - shownLeft - shownRight).toFixed(1));

    const midLeft = (Math.PI + toB) / 2;
    const midApex = (toB + toC) / 2;
    const midRight = toC / 2;

    svg.innerHTML = `
      <line x1="20" y1="${TOP_Y}" x2="380" y2="${TOP_Y}" class="fig-grid"
            stroke-width="2" stroke-dasharray="6 5"></line>
      <line x1="${B.x}" y1="${BASE_Y}" x2="${C.x}" y2="${BASE_Y}"
            class="fig-ink" stroke-width="2"></line>
      <polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}"
               style="fill:none" stroke-width="2" class="fig-ink"></polygon>

      <path d="${arc(A.x, A.y, R, Math.PI, toB)}" style="fill:none" stroke-width="3" class="fig-warn"></path>
      <path d="${arc(A.x, A.y, R, toB, toC)}" style="fill:none" stroke-width="3" class="fig-accent"></path>
      <path d="${arc(A.x, A.y, R, toC, 0)}" style="fill:none" stroke-width="3" class="fig-good"></path>
      <path d="${arc(B.x, B.y, 34, 0, Math.atan2(A.y - B.y, A.x - B.x))}"
            style="fill:none" stroke-width="3" class="fig-warn"></path>
      <path d="${arc(C.x, C.y, 34, Math.atan2(A.y - C.y, A.x - C.x), -Math.PI)}"
            style="fill:none" stroke-width="3" class="fig-good"></path>

      ${text(A.x + R * 1.9 * Math.cos(midLeft), A.y + R * 1.5 * Math.sin(midLeft), `${shownLeft.toFixed(1)}°`)}
      ${text(A.x + R * 1.5 * Math.cos(midApex), A.y + R * 1.7 * Math.sin(midApex) + 18, `${shownApex.toFixed(1)}°`)}
      ${text(A.x + R * 1.9 * Math.cos(midRight), A.y + R * 1.5 * Math.sin(midRight), `${shownRight.toFixed(1)}°`)}
      ${text(B.x + 26, B.y - 12, `${shownLeft.toFixed(1)}°`)}
      ${text(C.x - 26, C.y - 12, `${shownRight.toFixed(1)}°`)}
      ${text(A.x, A.y - 13, "A")}
      ${text(B.x - 14, B.y + 20, "B")}
      ${text(C.x + 14, C.y + 20, "C")}`;

    readout.textContent =
      `Angle B is ${shownLeft.toFixed(1)}°, angle A is ${shownApex.toFixed(1)}° and angle C is ` +
      `${shownRight.toFixed(1)}°. At the top corner those same three angles lie on the ` +
      `straight line, and the line is straight, so they add to ` +
      `${(shownLeft + shownApex + shownRight).toFixed(1)}°.`;
  }

  react(apex, draw);
}
