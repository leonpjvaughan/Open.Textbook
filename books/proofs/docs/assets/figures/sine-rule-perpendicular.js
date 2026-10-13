// Guided investigation for the proof of the sine rule.
//
// The proof is one length written two ways: the perpendicular from C to AB is
// `b sin A` from the left-hand right-angled triangle and `a sin B` from the
// right-hand one, and because it is the same line the two must agree. The figure
// makes that visible — the reader moves the top corner freely and the two
// calculations track each other, so the identity is observed rather than asserted.
//
// Two sliders rather than one because the proof must hold for *every* triangle: a
// single slider would trace a line of them, and a reader could reasonably wonder
// whether the equality was a property of that line. Predict -> Test -> Explain per
// AGENTS.md P6, and the readout is `aria-live` so the numbers reach a reader who
// cannot see the drawing. Colours are CSS classes, so it adapts to every bundle.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-sine-rule-perpendicular" style="max-width:540px">
      <svg viewBox="0 0 400 230" width="100%" role="img"
           aria-label="A triangle with a perpendicular dropped from the top corner to the base, splitting it into two right-angled triangles that both contain the same height"></svg>
      <label style="display:block;margin:.5rem 0 .2rem">
        Move the top corner sideways:
        <input class="across" type="range" min="120" max="280" step="2" value="200"
               aria-label="Horizontal position of the top corner">
      </label>
      <label style="display:block;margin:.2rem 0 .5rem">
        Move it up and down:
        <input class="up" type="range" min="50" max="150" step="2" value="70"
               aria-label="Height of the top corner">
      </label>
      <p class="readout" aria-live="polite" style="margin:.3rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const across = el.querySelector(".across");
  const up = el.querySelector(".up");
  const readout = el.querySelector(".readout");

  const BASE_Y = 196;
  const A = { x: 56, y: BASE_Y };
  const B = { x: 344, y: BASE_Y };

  const degrees = (radians) => (radians * 180) / Math.PI;

  function angleAt(P, Q, R) {
    const a = { x: Q.x - P.x, y: Q.y - P.y };
    const b = { x: R.x - P.x, y: R.y - P.y };
    const dot = a.x * b.x + a.y * b.y;
    const magnitude = Math.hypot(a.x, a.y) * Math.hypot(b.x, b.y);
    return degrees(Math.acos(Math.max(-1, Math.min(1, dot / magnitude))));
  }

  const line = (p, q, cls, width = 2) =>
    `<line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${q.x.toFixed(1)}" y2="${q.y.toFixed(1)}" ` +
    `stroke-width="${width}" class="${cls}"></line>`;
  const text = (x, y, label) =>
    `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" text-anchor="middle" ` +
    `font-size="13" class="fig-ink">${label}</text>`;

  function draw() {
    const C = { x: Number(across.value), y: Number(up.value) };
    const D = { x: C.x, y: BASE_Y }; // the foot of the perpendicular

    const height = BASE_Y - C.y;
    const a = Math.hypot(C.x - B.x, C.y - B.y); // BC, opposite A
    const b = Math.hypot(C.x - A.x, C.y - A.y); // AC, opposite B
    const Aa = angleAt(A, B, C);
    const Bb = angleAt(B, A, C);

    const fromLeft = b * Math.sin((Aa * Math.PI) / 180); // h = b sin A
    const fromRight = a * Math.sin((Bb * Math.PI) / 180); // h = a sin B

    // The right angle at D, drawn on whichever side has room for it.
    const size = 11;
    const towardsA = C.x > A.x + size * 2;
    const corner = towardsA
      ? `M ${D.x - size} ${BASE_Y} L ${D.x - size} ${BASE_Y - size} L ${D.x} ${BASE_Y - size}`
      : `M ${D.x + size} ${BASE_Y} L ${D.x + size} ${BASE_Y - size} L ${D.x} ${BASE_Y - size}`;

    svg.innerHTML = `
      <polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}"
               fill="none" stroke-width="2" class="fig-ink"></polygon>
      ${line(C, D, "fig-grid", 2)}
      <path d="${corner}" fill="none" stroke-width="1.5" class="fig-grid"></path>
      ${line(A, C, "fig-warn", 3)}
      ${line(B, C, "fig-good", 3)}
      ${text((A.x + C.x) / 2 - 14, (A.y + C.y) / 2 - 6, `b = ${b.toFixed(1)}`)}
      ${text((B.x + C.x) / 2 + 14, (B.y + C.y) / 2 - 6, `a = ${a.toFixed(1)}`)}
      ${text(D.x + 26, (C.y + BASE_Y) / 2, `h = ${height.toFixed(1)}`)}
      ${text(A.x - 12, A.y + 18, "A")}
      ${text(B.x + 12, B.y + 18, "B")}
      ${text(C.x, C.y - 12, "C")}
      ${text(D.x, D.y + 18, "D")}`;

    readout.textContent =
      `The perpendicular from C is ${fromLeft.toFixed(1)} worked out from the left ` +
      `triangle as b sin A, and ${fromRight.toFixed(1)} from the right triangle as ` +
      `a sin B. It is the same line, so they agree — and dividing both by sin A sin B ` +
      `gives b / sin B = a / sin A.`;
  }

  across.addEventListener("input", draw);
  up.addEventListener("input", draw);
  draw();
}
