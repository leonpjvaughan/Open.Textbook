// Guided investigation for the proof that completing the square adds half the
// coefficient of x, squared.
//
// The picture is the proof: a square of side x, two strips each of width b/2
// (which together make the coefficient b), and the corner square the strips leave
// behind, of area (b/2)^2. The reader moves one slider — the coefficient b — and
// watches the strip widen and the corner grow, so the number to add is a length
// they can see rather than a rule to remember.
//
// Predict -> Test -> Explain: the page asks what fills the corner before the
// slider is touched. The readout is `aria-live`, because a reader who cannot see
// the drawing must still be told the strip width and the corner area.
//
// No colour is written here: the shapes use fig-* classes and the words use
// text-* classes, so the figure adapts to every bundle and both schemes.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-completing-the-square" style="max-width:520px">
      <svg viewBox="0 0 340 340" width="100%" role="img"
           aria-label="A square of side x with two strips of width b over two added along the right and the bottom, leaving a corner square"></svg>
      <label style="display:block;margin:.5rem 0 .2rem">
        Coefficient of x, b:
        <input class="b" type="range" min="2" max="8" step="2" value="6"
               aria-label="Coefficient of x">
        <output class="b-value">6</output>
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const slider = el.querySelector(".b");
  const bValue = el.querySelector(".b-value");
  const readout = el.querySelector(".readout");

  const X = 4; // the side of the starting square, in units
  const SCALE = 33; // pixels per unit
  const OX = 34;
  const OY = 34;
  const SIDE = X * SCALE;

  const bar = (x, y, w, h, cls, opacity) =>
    `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" ` +
    `height="${h.toFixed(1)}" class="${cls}" fill-opacity="${opacity}"></rect>`;

  const text = (x, y, label, cls, size, anchor) =>
    `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" text-anchor="${anchor || "middle"}" ` +
    `font-size="${size || 14}" class="${cls}">${label}</text>`;

  function draw() {
    const b = Number(slider.value);
    bValue.textContent = String(b);

    const strip = (b / 2) * SCALE;
    const total = SIDE + strip;

    // The starting square, the two strips that make the coefficient b, and the
    // corner the strips leave. The strips share b between them, which is why each
    // one is b/2 wide.
    svg.innerHTML =
      bar(OX, OY, SIDE, SIDE, "fig-accent", 0.35) +
      bar(OX + SIDE, OY, strip, SIDE, "fig-warn", 0.35) +
      bar(OX, OY + SIDE, SIDE, strip, "fig-warn", 0.35) +
      bar(OX + SIDE, OY + SIDE, strip, strip, "fig-good", 0.6) +
      `<rect x="${OX}" y="${OY}" width="${total.toFixed(1)}" ` +
      `height="${total.toFixed(1)}" class="fig-line"></rect>` +
      // The area of each piece, in the middle of the piece.
      text(OX + SIDE / 2, OY + SIDE / 2 + 5, "x²", "text-ink", 16) +
      text(OX + SIDE + strip / 2, OY + SIDE / 2 + 4, "x·b/2", "text-warn", 11) +
      text(OX + SIDE / 2, OY + SIDE + strip / 2 + 4, "x·b/2", "text-warn", 11) +
      text(OX + SIDE + strip / 2, OY + SIDE + strip / 2 + 4, "(b/2)²", "text-good", 11) +
      // The two side lengths of the finished square: x, then b/2.
      text(OX + SIDE / 2, OY + total + 18, "x", "text-ink", 13) +
      text(OX + SIDE + strip / 2, OY + total + 18, "b/2", "text-ink", 13) +
      text(OX + total + 4, OY + SIDE / 2 + 4, "x", "text-ink", 13, "start") +
      text(OX + total + 4, OY + SIDE + strip / 2 + 4, "b/2", "text-ink", 13, "start");

    const half = b / 2;
    const corner = half * half;
    readout.textContent =
      `When b = ${b}, each strip is ${half} wide and x long, so each strip has ` +
      `area ${half}x. The two strips together make ${b}x. The corner square has ` +
      `side ${half}, so its area is (b/2)² = ${corner}. Adding that corner makes a ` +
      `single square of side x + ${half}, and ` +
      `x² + ${b}x + ${corner} = (x + ${half})².`;
  }

  slider.addEventListener("input", draw);
  draw();
}
