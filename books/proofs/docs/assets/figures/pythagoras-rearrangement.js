// Guided investigation for the proof of Pythagoras' theorem.
//
// The proof is a square counted two ways, so the figure is the square: four copies
// of the right-angled triangle in a frame of side a + b, leaving a tilted hole
// whose area is c squared. The slider changes the triangle, and the readout reports
// a squared plus b squared against c squared so the reader sees the equality hold
// rather than being told it does.
//
// Predict -> Test -> Explain per AGENTS.md P6: the page asks for a prediction about
// the hole before the slider is touched. Colours come from CSS classes, so the
// figure adapts to every bundle and both schemes, and the readout is `aria-live`.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-pythagoras-rearrangement" style="max-width:520px">
      <svg viewBox="0 0 420 380" width="100%" height="380" role="img"
           aria-label="Four copies of a right-angled triangle arranged inside a square frame, leaving a tilted square hole whose side is the hypotenuse"></svg>
      <label style="display:block;margin:.6rem 0 .3rem">
        Change the triangle (the short side):
        <input class="leg" type="range" min="60" max="220" step="2" value="110"
               aria-label="Length of the shorter side of the triangle">
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const slider = el.querySelector(".leg");
  const readout = el.querySelector(".readout");

  const FRAME = 280; // the side of the outer square, a + b
  const ORIGIN = 60; // where it sits in the viewBox

  const text = (x, y, label) =>
    `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" text-anchor="middle" ` +
    `font-size="13" class="fig-ink">${label}</text>`;

  function draw() {
    const a = Number(slider.value);
    const b = FRAME - a;
    const S = FRAME;
    const o = ORIGIN;

    // One corner of the inner square sits `a` along each side of the frame, so
    // every outer triangle has legs a and b and hypotenuse c.
    const P1 = { x: o + a, y: o };
    const P2 = { x: o + S, y: o + a };
    const P3 = { x: o + S - a, y: o + S };
    const P4 = { x: o, y: o + S - a };

    const tri = (p, q, r) =>
      `<polygon points="${p.x},${p.y} ${q.x},${q.y} ${r.x},${r.y}" ` +
      `fill="none" stroke-width="2" class="fig-accent"></polygon>`;

    const c = Math.sqrt(a * a + b * b);

    svg.innerHTML = `
      <rect x="${o}" y="${o}" width="${S}" height="${S}"
            fill="none" stroke-width="2.5" class="fig-ink"></rect>
      ${tri({ x: o, y: o }, P1, P4)}
      ${tri(P1, { x: o + S, y: o }, P2)}
      ${tri(P2, { x: o + S, y: o + S }, P3)}
      ${tri(P3, { x: o, y: o + S }, P4)}
      <polygon points="${P1.x},${P1.y} ${P2.x},${P2.y} ${P3.x},${P3.y} ${P4.x},${P4.y}"
               fill="none" stroke-width="3" class="fig-warn"></polygon>
      ${text(o + a / 2, o + S + 20, `a = ${a}`)}
      ${text(o - 18, o + (S - a) / 2, `b = ${b}`)}
      ${text((P1.x + P2.x) / 2 + 20, (P1.y + P2.y) / 2 - 8, `c`)}
      ${text(o + S / 2, o - 12, `the frame is a + b = ${S}`)}`;

    readout.textContent =
      `The hole is a square of side c = ${c.toFixed(1)}, so its area is ` +
      `${(c * c).toFixed(0)}. The triangle's legs are a = ${a} and b = ${b}, and ` +
      `a² + b² is ${a * a} + ${b * b} = ${a * a + b * b}. The frame holds four ` +
      `triangles plus the hole, and that is why the two numbers agree.`;
  }

  slider.addEventListener("input", draw);
  draw();
}
