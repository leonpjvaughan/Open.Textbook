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
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A square of side x with two strips of width b over two added along the right and the bottom, leaving a corner square",
    width: 340,
    height: 340,
    max: 520,
  });

  const bInput = slider(el, { show: true,
    id: "b",
    label: "Coefficient of x, b:",
    name: "Coefficient of x",
    min: 2,
    max: 8,
    step: 2,
    value: 6,
  });

  const X = 4; // the side of the starting square, in units
  const SCALE = 33; // pixels per unit
  const OX = 34;
  const OY = 34;
  const SIDE = X * SCALE;

  const bar = (x, y, w, h, cls, opacity) =>
    `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" ` +
    `height="${h.toFixed(1)}" class="${cls}" fill-opacity="${opacity}"></rect>`;

  const text = (x, y, words, cls, anchor = "middle") =>
    label({ x, y, text: words, anchor, size: SIZE.tick, class: cls });

  function draw() {
    const b = Number(bInput.value);

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
      text(OX + SIDE / 2, OY + SIDE / 2 + 5, "x²", "text-ink") +
      text(OX + SIDE + strip / 2, OY + SIDE / 2 + 4, "x·b/2", "text-warn") +
      text(OX + SIDE / 2, OY + SIDE + strip / 2 + 4, "x·b/2", "text-warn") +
      text(OX + SIDE + strip / 2, OY + SIDE + strip / 2 + 4, "(b/2)²", "text-good") +
      // The two side lengths of the finished square: x, then b/2.
      text(OX + SIDE / 2, OY + total + 18, "x", "text-ink") +
      text(OX + SIDE + strip / 2, OY + total + 18, "b/2", "text-ink") +
      text(OX + total + 4, OY + SIDE / 2 + 4, "x", "text-ink", "start") +
      text(OX + total + 4, OY + SIDE + strip / 2 + 4, "b/2", "text-ink", "start");

    const half = b / 2;
    const corner = half * half;
    readout.textContent =
      `When b = ${b}, each strip is ${half} wide and x long, so each strip has ` +
      `area ${half}x. The two strips together make ${b}x. The corner square has ` +
      `side ${half}, so its area is (b/2)² = ${corner}. Adding that corner makes a ` +
      `single square of side x + ${half}, and ` +
      `x² + ${b}x + ${corner} = (x + ${half})².`;
  }

  react(bInput, draw);
}
