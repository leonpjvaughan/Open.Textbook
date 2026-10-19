// Tier-1 guided investigation: the centre and the radius of a circle.
//
// The page asks the reader to predict what happens to the circle and the equation
// as the radius approaches zero, then to test it and write the explanation. The
// figure draws the circle, its centre, the radius to the rightmost point, and the
// equation in both forms.
//
// Nothing here carries a colour: every shape uses a fig-* class and every word a
// text-* class, so the figure follows the reader's theme in both schemes.
import { SIZE, fmt, label, panel, react, scale, slider } from "./kit.js";

const RANGE = 10;
const X = scale({ domain: [-RANGE, RANGE], range: [34, 526] });
const Y = scale({ domain: [-RANGE, RANGE], range: [346, 34] });

// A bracketed term like (x - 3) or (y + 2), or a bare x when the value is zero.
function bracket(value, name) {
  if (value === 0) return name;
  return value > 0 ? `(${name} \u2212 ${fmt(value)})` : `(${name} + ${fmt(-value)})`;
}

// The expanded equation, with the zero terms dropped.
function expanded(a, b, r) {
  const parts = ["x\u00b2 + y\u00b2"];
  const g = -2 * a;
  const f = -2 * b;
  const c = a * a + b * b - r * r;
  if (g !== 0) parts.push(`${g > 0 ? "+" : "\u2212"} ${fmt(Math.abs(g))}x`);
  if (f !== 0) parts.push(`${f > 0 ? "+" : "\u2212"} ${fmt(Math.abs(f))}y`);
  if (c !== 0) parts.push(`${c > 0 ? "+" : "\u2212"} ${fmt(Math.abs(c))}`);
  return `${parts.join(" ")} = 0`;
}

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label:
      "A circle on a coordinate grid with its centre marked, the radius drawn to a point on the circle, and the equation of the circle",
    width: 560,
    height: 380,
  });

  const aIn = slider(el, { id: "centre-x", show: true, label: "x of the centre", min: -6, max: 6, step: 1, value: 3 });
  const bIn = slider(el, { id: "centre-y", show: true, label: "y of the centre", min: -6, max: 6, step: 1, value: 4 });
  const rIn = slider(el, { id: "radius", show: true, label: "Radius", min: 1, max: 7, step: 1, value: 5 });

  function update() {
    const a = Number(aIn.value);
    const b = Number(bIn.value);
    const r = Number(rIn.value);

    let grid = "";
    for (let k = -RANGE + 1; k < RANGE; k += 1) {
      if (k === 0) continue;
      grid += `<line x1="${X(k)}" y1="${Y(-RANGE)}" x2="${X(k)}" y2="${Y(RANGE)}" class="fig-grid" stroke-width="0.6"></line>`;
      grid += `<line x1="${X(-RANGE)}" y1="${Y(k)}" x2="${X(RANGE)}" y2="${Y(k)}" class="fig-grid" stroke-width="0.6"></line>`;
    }
    grid += `<line x1="${X(-RANGE)}" y1="${Y(0)}" x2="${X(RANGE)}" y2="${Y(0)}" class="fig-ink" stroke-width="1.5"></line>`;
    grid += `<line x1="${X(0)}" y1="${Y(-RANGE)}" x2="${X(0)}" y2="${Y(RANGE)}" class="fig-ink" stroke-width="1.5"></line>`;
    grid += label({ x: X(RANGE) - 4, y: Y(0) - 8, text: "x", size: SIZE.tick, class: "text-ink", anchor: "end" });
    grid += label({ x: X(0) + 10, y: Y(RANGE) + 16, text: "y", size: SIZE.tick, class: "text-ink", anchor: "start" });

    // The circle and the radius to its rightmost point.
    const shape =
      `<circle cx="${X(a)}" cy="${Y(b)}" r="${(r * (X(1) - X(0))).toFixed(1)}" class="fig-accent" style="fill:none" stroke-width="2.4"></circle>` +
      `<line x1="${X(a)}" y1="${Y(b)}" x2="${X(a + r)}" y2="${Y(b)}" class="fig-good" stroke-width="2.4"></line>` +
      `<circle cx="${X(a)}" cy="${Y(b)}" r="5" class="fig-ink"></circle>` +
      `<circle cx="${X(a + r)}" cy="${Y(b)}" r="6" class="fig-good"></circle>` +
      label({ x: X(a + r) + 12, y: Y(b) + 24, text: "P", size: SIZE.value, class: "text-good", anchor: "start", weight: "bold" }) +
      label({ x: X(a + r / 2), y: Y(b) - 12, text: `r = ${fmt(r)}`, size: SIZE.value, class: "text-good" });

    svg.innerHTML = grid + shape;

    readout.textContent =
      `Centre (${fmt(a)}, ${fmt(b)}) and radius ${fmt(r)}. ` +
      `Centre-radius form: ${bracket(a, "x")}\u00b2 + ${bracket(b, "y")}\u00b2 = ${fmt(r * r)}. ` +
      `Expanded: ${expanded(a, b, r)}. ` +
      (r === 1
        ? "The radius is 1, so the circle is small and the right-hand side of the equation is 1."
        : "The right-hand side is the square of the radius, and the brackets carry the centre with the opposite sign.");

    // The two numbers the equation prints as its working, declared rather than written
    // into a string: the right-hand side is r squared, and the constant term is the
    // expanded form's `a² + b² - r²`. `expanded()` writes that constant with its sign in
    // front of it (`- 1`), so the number beside the sign is the magnitude, and which
    // subtraction produced it depends on the sign. Declaring both is what makes the
    // printed sign part of the claim instead of a decoration.
    const constant = a * a + b * b - r * r;
    const constantClaim =
      constant === 0
        ? []
        : [
            {
              label: "constant term",
              expression:
                constant > 0
                  ? "a ** 2 + b ** 2 - r ** 2"
                  : "r ** 2 - a ** 2 - b ** 2",
              values: { a, b, r },
              answer: Math.abs(constant),
              shown: fmt(Math.abs(constant)),
            },
          ];
    claim([
      {
        label: "square of the radius",
        expression: "r ** 2",
        values: { r },
        answer: r * r,
        shown: fmt(r * r),
      },
      ...constantClaim,
    ]);
  }

  react([aIn, bIn, rIn], update);
}
