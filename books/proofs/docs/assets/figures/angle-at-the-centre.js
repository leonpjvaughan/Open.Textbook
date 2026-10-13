// Guided investigation for the proof that the angle at the centre is twice the
// angle at the circumference.
//
// The proof draws the diameter through P and the centre O, which makes two
// isosceles triangles. The one step that changes with the position of P is which
// angle at O is the one standing on the same arc as the angle at P: the ordinary
// angle between OA and OB, or the reflex angle round the other side. The figure
// moves P right around the circle and marks that angle, so the case a reader
// would otherwise skip is the one they see.
//
// Predict -> Test -> Explain per AGENTS.md P6: the page asks what happens to the
// doubled angle before the reader moves P. The readout is `aria-live` so the
// numbers reach a reader who cannot see the drawing, and every colour comes from
// a CSS class, so the figure adapts to every bundle and scheme.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-angle-at-the-centre" style="max-width:520px">
      <svg viewBox="0 0 420 320" width="100%" role="img"
           aria-label="A circle with fixed points A and B, a moving point P on the circumference, and the angles at P and at the centre that stand on the same arc"></svg>
      <label style="display:block;margin:.5rem 0 .3rem">
        Move the point P around the circle:
        <input class="where" type="range" min="5" max="355" step="2" value="265"
               aria-label="Position of the point P on the circle in degrees">
      </label>
      <p class="readout" aria-live="polite" style="margin:.3rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const slider = el.querySelector(".where");
  const readout = el.querySelector(".readout");

  const O = { x: 210, y: 160 };
  const R = 110;
  const A_DEG = 150; // A left of O and a little below
  const B_DEG = 0; // B right of O
  const TAU = Math.PI * 2;

  const rad = (degrees) => (degrees * Math.PI) / 180;
  const deg = (radians) => (radians * 180) / Math.PI;
  const norm = (x) => ((x % TAU) + TAU) % TAU;
  const on = (d) => ({ x: O.x + R * Math.cos(rad(d)), y: O.y + R * Math.sin(rad(d)) });

  const line = (p, q, cls, width = 2, dash = "") =>
    `<line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" ` +
    `x2="${q.x.toFixed(1)}" y2="${q.y.toFixed(1)}" stroke-width="${width}" ` +
    (dash ? `stroke-dasharray="${dash}" ` : "") + `class="${cls}"></line>`;

  const text = (x, y, label, cls = "fig-ink") =>
    `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" text-anchor="middle" ` +
    `font-size="13" class="${cls}">${label}</text>`;

  // An arc about (cx, cy), drawn in the positive angle direction (clockwise on
  // screen, because y points down) from `from` through `travel` radians. The
  // caller passes an increasing span, so the large-arc flag follows the travel.
  function arc(cx, cy, r, from, travel) {
    const at = (t) =>
      `${(cx + r * Math.cos(t)).toFixed(1)},${(cy + r * Math.sin(t)).toFixed(1)}`;
    const large = travel > Math.PI ? 1 : 0;
    return `M ${at(from)} A ${r} ${r} 0 ${large} 1 ${at(from + travel)}`;
  }

  function draw() {
    // The slider only lands on odd degrees, and A and B sit on even ones, so P
    // never reaches a position that would flatten the triangle.
    const pDeg = Number(slider.value);
    const P = on(pDeg);
    const A = on(A_DEG);
    const B = on(B_DEG);

    // The arc AB that does not contain P: that is the arc the two angles share.
    const aA = rad(A_DEG);
    const aB = rad(B_DEG);
    const aP = rad(pDeg);
    const sizeAB = norm(aB - aA);
    const pOnArc = norm(aP - aA) > 0 && norm(aP - aA) < sizeAB;
    const centreSize = pOnArc ? TAU - sizeAB : sizeAB;
    const centreStart = pOnArc ? aB : aA;
    const centreMid = centreStart + centreSize / 2;

    // The angle at P, and the short arc that draws it.
    const u = { x: A.x - P.x, y: A.y - P.y };
    const v = { x: B.x - P.x, y: B.y - P.y };
    const cosine =
      (u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
    const pSize = Math.acos(Math.max(-1, Math.min(1, cosine)));
    const dirPA = Math.atan2(u.y, u.x);
    const dirPB = Math.atan2(v.y, v.x);
    const turn = norm(dirPB - dirPA);
    const travel = turn <= Math.PI ? turn : TAU - turn;
    const pStart = turn <= Math.PI ? dirPA : dirPB;
    const pMid = pStart + travel / 2;

    const Q = on(pDeg + 180);
    const out = (point, angle, gap) => ({
      x: point.x + gap * Math.cos(angle),
      y: point.y + gap * Math.sin(angle),
    });

    const aLab = out(A, aA, 20);
    const bLab = out(B, aB, 20);
    const pLab = out(P, aP, 20);
    const qLab = out(Q, aP + Math.PI, 20);
    const centreLab = {
      x: O.x + 64 * Math.cos(centreMid),
      y: O.y + 64 * Math.sin(centreMid),
    };
    const pAngleLab = {
      x: P.x + 54 * Math.cos(pMid),
      y: P.y + 54 * Math.sin(pMid),
    };

    svg.innerHTML = `
      <circle cx="${O.x}" cy="${O.y}" r="${R}" fill="none" stroke-width="2" class="fig-ink"></circle>
      ${line(P, Q, "fig-grid", 2, "6 5")}
      ${line(O, A, "fig-good", 2)}
      ${line(O, B, "fig-good", 2)}
      ${line(P, A, "fig-accent", 3)}
      ${line(P, B, "fig-accent", 3)}
      <circle cx="${P.x.toFixed(1)}" cy="${P.y.toFixed(1)}" r="5" class="fig-warn"></circle>
      <path d="${arc(O.x, O.y, 38, centreStart, centreSize)}"
            fill="none" stroke-width="3" class="fig-good"></path>
      <path d="${arc(P.x, P.y, 30, pStart, travel)}"
            fill="none" stroke-width="3" class="fig-warn"></path>
      ${text(aLab.x, aLab.y, "A")}
      ${text(bLab.x, bLab.y, "B")}
      ${text(pLab.x, pLab.y, "P", "text-warn")}
      ${text(qLab.x, qLab.y, "Q")}
      ${text(O.x + 2, O.y + 19, "O")}
      ${text(centreLab.x, centreLab.y, `${deg(centreSize).toFixed(0)}°`, "text-good")}
      ${text(pAngleLab.x, pAngleLab.y, `${deg(pSize).toFixed(0)}°`, "text-warn")}`;

    const which =
      centreSize > Math.PI
        ? "P is on the near arc, so the angle at the centre is the reflex angle: it sweeps round the far side of O."
        : "P is on the far arc, so the angle at the centre is the ordinary angle between OA and OB.";
    readout.textContent =
      `The angle at P is ${deg(pSize).toFixed(0)}°, and the angle at the centre ` +
      `standing on the same arc is ${deg(centreSize).toFixed(0)}°. The centre ` +
      `angle is twice the angle at P. ${which}`;
  }

  slider.addEventListener("input", draw);
  draw();
}
