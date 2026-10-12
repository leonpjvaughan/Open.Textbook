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
export function mount(el) {
  el.innerHTML = `
    <div class="fig-angles-on-a-line" style="max-width:520px">
      <svg viewBox="0 0 400 220" width="100%" height="220" role="img"
           aria-label="A triangle with a line drawn through its top corner parallel to the base, showing the three angles at the top corner lying on a straight line"></svg>
      <label style="display:block;margin:.6rem 0 .3rem">
        Move the top corner:
        <input class="apex" type="range" min="120" max="280" step="2" value="200"
               aria-label="Position of the top corner">
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const slider = el.querySelector(".apex");
  const readout = el.querySelector(".readout");

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

  const text = (x, y, label) =>
    `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" text-anchor="middle" ` +
    `font-size="13" class="fig-ink">${label}</text>`;

  function draw() {
    const A = { x: Number(slider.value), y: TOP_Y };

    // Directions from the top corner, in the SVG's own coordinates.
    const toB = Math.atan2(B.y - A.y, B.x - A.x); // down and left
    const toC = Math.atan2(C.y - A.y, C.x - A.x); // down and right

    // The parallel line runs left (180 degrees) and right (0 degrees). The three
    // angles at the top corner are: the parallel line to AB, then AB to AC, then
    // AC to the parallel line.
    const left = 180 - angle(toB);
    const apex = angle(toB - toC);
    const right = angle(toC);

    const atB = between(B, A, C);
    const atC = between(C, A, B);

    const midLeft = (Math.PI + toB) / 2;
    const midApex = (toB + toC) / 2;
    const midRight = toC / 2;

    svg.innerHTML = `
      <line x1="20" y1="${TOP_Y}" x2="380" y2="${TOP_Y}" class="fig-grid"
            stroke-width="2" stroke-dasharray="6 5"></line>
      <line x1="${B.x}" y1="${BASE_Y}" x2="${C.x}" y2="${BASE_Y}"
            class="fig-ink" stroke-width="2"></line>
      <polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}"
               fill="none" stroke-width="2" class="fig-ink"></polygon>

      <path d="${arc(A.x, A.y, R, Math.PI, toB)}" fill="none" stroke-width="3" class="fig-warn"></path>
      <path d="${arc(A.x, A.y, R, toB, toC)}" fill="none" stroke-width="3" class="fig-accent"></path>
      <path d="${arc(A.x, A.y, R, toC, 0)}" fill="none" stroke-width="3" class="fig-good"></path>
      <path d="${arc(B.x, B.y, 34, 0, Math.atan2(A.y - B.y, A.x - B.x))}"
            fill="none" stroke-width="3" class="fig-warn"></path>
      <path d="${arc(C.x, C.y, 34, Math.atan2(A.y - C.y, A.x - C.x), -Math.PI)}"
            fill="none" stroke-width="3" class="fig-good"></path>

      ${text(A.x + R * 1.9 * Math.cos(midLeft), A.y + R * 1.5 * Math.sin(midLeft), `${left.toFixed(0)}°`)}
      ${text(A.x + R * 1.5 * Math.cos(midApex), A.y + R * 1.7 * Math.sin(midApex) + 18, `${apex.toFixed(0)}°`)}
      ${text(A.x + R * 1.9 * Math.cos(midRight), A.y + R * 1.5 * Math.sin(midRight), `${right.toFixed(0)}°`)}
      ${text(B.x + 26, B.y - 12, `${atB.toFixed(0)}°`)}
      ${text(C.x - 26, C.y - 12, `${atC.toFixed(0)}°`)}
      ${text(A.x, A.y - 13, "A")}
      ${text(B.x - 14, B.y + 20, "B")}
      ${text(C.x + 14, C.y + 20, "C")}`;

    // The angles are simplified to whole degrees for the labels, so the displayed
    // three sometimes add to 179 or 181. The claim is about the exact angles, so
    // the readout reports the one being made rather than the drawing.
    readout.textContent =
      `Angle B is ${atB.toFixed(0)}°, angle A is ${apex.toFixed(0)}° and angle C is ` +
      `${atC.toFixed(0)}°. At the top corner those same three angles lie on the ` +
      `straight line, and the line is straight, so they add to 180°.`;
  }

  slider.addEventListener("input", draw);
  draw();
}
