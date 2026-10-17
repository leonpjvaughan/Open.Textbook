// Tier-1 guided investigation: multiplying two fractions as an area.
//
// Section 5.3 multiplies fractions by multiplying the numerators and multiplying the
// denominators, and a reader who has only memorised that rule has no reason to trust
// it. The area model is the reason. A unit square is cut into `b` columns and `d`
// rows; `a/b` of it is a band of `a` columns and `c/d` of it is a band of `c` rows.
// The overlap is `a` columns by `c` rows — `a × c` small squares out of `b × d` — so
// the product is `ac/bd`, and it is a picture rather than a rule.
//
// The two fractions are chosen from the proper fractions with denominators up to 6,
// because a fraction greater than 1 has no band inside the unit square and the model
// is about the part of a part.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { fmt, label, line, panel, react, rect, chooser } from "./kit.js";

const FRACTIONS = [];
for (let d = 2; d <= 6; d += 1) for (let n = 1; n < d; n += 1) FRACTIONS.push(`${n}/${d}`);

const gcd = (a, b) => {
  let x = a;
  let y = b;
  while (y) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1;
};

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A unit square cut into columns and rows, with one fraction shaded across and another down, and the overlap marked",
    description:
      "The square is divided into as many columns as the first denominator and as many rows as the " +
      "second denominator. The first fraction shades that many columns, the second shades that many " +
      "rows, and the rectangles in both bands are the product of the two fractions.",
    prompt: "Predict how many small rectangles the overlap will hold, then choose two fractions and check.",
    width: 560,
    height: 330,
  });

  const options = FRACTIONS.map((f) => ({ value: f, label: f }));
  const first = chooser(el, { id: "first", label: "First fraction", choices: options, value: "2/3" });
  const second = chooser(el, { id: "second", label: "Second fraction", choices: options, value: "3/4" });

  function update() {
    const [a, b] = first.value.split("/").map(Number);
    const [c, d] = second.value.split("/").map(Number);

    const side = 240;
    const x0 = 180;
    const y0 = 42;
    const cellW = side / b;
    const cellH = side / d;

    let drawing = "";
    // The two bands, then the overlap on top of both, so the overlap is the darkest
    // region and is the one the reader counts.
    drawing += rect({ x: x0, y: y0, width: a * cellW, height: side, class: "fig-accent", opacity: 0.22 });
    drawing += rect({ x: x0, y: y0, width: side, height: c * cellH, class: "fig-good", opacity: 0.22 });
    drawing += rect({ x: x0, y: y0, width: a * cellW, height: c * cellH, class: "fig-warn", opacity: 0.45 });
    drawing += rect({ x: x0, y: y0, width: side, height: side, class: "fig-grid" });

    for (let i = 1; i < b; i += 1) {
      drawing += line({ x1: x0 + i * cellW, y1: y0, x2: x0 + i * cellW, y2: y0 + side, class: "fig-grid", width: 1 });
    }
    for (let j = 1; j < d; j += 1) {
      drawing += line({ x1: x0, y1: y0 + j * cellH, x2: x0 + side, y2: y0 + j * cellH, class: "fig-grid", width: 1 });
    }

    drawing += label({ x: x0 + (a * cellW) / 2, y: y0 - 12, text: first.value, size: 18, class: "text-accent" });
    drawing += label({
      x: x0 - 14,
      y: y0 + (c * cellH) / 2 + 6,
      text: second.value,
      size: 18,
      class: "text-good",
      anchor: "end",
    });
    drawing += label({
      x: x0 + side / 2,
      y: y0 + side + 26,
      text: `${fmt(b, 0)} columns and ${fmt(d, 0)} rows make ${fmt(b * d, 0)} small rectangles`,
      size: 16,
      class: "text-ink",
    });
    svg.innerHTML = drawing;

    const top = a * c;
    const bottom = b * d;
    const divisor = gcd(top, bottom);
    const simplified =
      divisor === 1 ? `${top}/${bottom}` : `${top / divisor}/${bottom / divisor}`;
    const simplifyLine =
      divisor === 1
        ? `It is already in its simplest form.`
        : `Both parts divide by ${divisor}, so it simplifies to ${simplified}.`;

    readout.textContent =
      `${first.value} of ${second.value}: shade ${fmt(a, 0)} of the ${fmt(b, 0)} columns and ` +
      `${fmt(c, 0)} of the ${fmt(d, 0)} rows. The overlap holds ${fmt(a, 0)} \u00d7 ${fmt(c, 0)} = ${fmt(top, 0)} ` +
      `rectangles out of ${fmt(b, 0)} \u00d7 ${fmt(d, 0)} = ${fmt(bottom, 0)}, so the product is ${top}/${bottom}. ` +
      simplifyLine;
  }

  react([first, second], update);
}
