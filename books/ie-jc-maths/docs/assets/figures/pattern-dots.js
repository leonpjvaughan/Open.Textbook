// Tier-1 guided investigation: the general term as a description of the picture.
//
// Section 9.2 builds a general term by taking the common difference as the number
// that multiplies n, then adjusting a constant. That is a procedure on a list of
// numbers; the pattern is a picture. So the figure draws each term as `n` rows of `d`
// dots plus `c` extra dots, and the general term `dn + c` stops being a formula and
// becomes a description of what is drawn: n rows of d, and c more.
//
// The extra dots are a different shape from the rows, so the constant is visibly the
// part that does not grow with n.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { circle, fmt, label, panel, react, slider } from "./kit.js";

const STEP = 22;
const DOT = 6;

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label: "Three terms of a dot pattern, each drawn as a number of rows of dots plus a few extra dots",
    description:
      "Each term is a rectangle of dots, one row taller than the term before, with the same few extra " +
      "dots underneath. The rows carry the common difference and the extra dots carry the constant, so " +
      "the general term can be read off the picture.",
    prompt: "Predict how many dots the fourth term will have, then change the common difference and check.",
    width: 560,
    height: 250,
  });

  const difference = slider(el, { id: "difference", label: "Dots in each row", min: 1, max: 4, step: 1, value: 4, show: true });
  const constant = slider(el, { id: "constant", label: "Extra dots", min: 0, max: 4, step: 1, value: 3, show: true });

  function update() {
    const d = Number(difference.value);
    const c = Number(constant.value);
    const width = Math.max(d, c) * STEP;
    const gap = 46;
    const x0 = (560 - (3 * width + 2 * gap)) / 2;
    const y0 = 44;

    let drawing = "";
    for (let term = 1; term <= 3; term += 1) {
      const left = x0 + (term - 1) * (width + gap);
      for (let row = 0; row < term; row += 1) {
        for (let k = 0; k < d; k += 1) {
          drawing += circle({ cx: left + k * STEP + DOT, cy: y0 + row * STEP + DOT, r: DOT, class: "fig-accent" });
        }
      }
      // The extra dots sit on their own row below the rectangle, so the constant is
      // the part that stays the same size as n grows.
      for (let k = 0; k < c; k += 1) {
        drawing += circle({ cx: left + k * STEP + DOT, cy: y0 + term * STEP + DOT, r: DOT, class: "fig-good" });
      }
      drawing += label({
        x: left + width / 2,
        y: y0 + 4 * STEP + 30,
        text: `term ${term}`,
        size: 16,
        class: "text-ink",
      });
      drawing += label({
        x: left + width / 2,
        y: y0 + 4 * STEP + 50,
        text: `${d * term + c} dots`,
        size: 16,
        class: "text-accent",
      });
    }
    svg.innerHTML = drawing;

    const term = c === 0 ? (d === 1 ? "n" : `${d}n`) : d === 1 ? `n + ${c}` : `${d}n + ${c}`;
    const values = [1, 2, 3].map((n) => d * n + c);
    readout.textContent =
      `Each term is ${d} dot${d === 1 ? "" : "s"} in a row, repeated as many times as the term number` +
      (c > 0 ? `, plus ${c} extra dot${c === 1 ? "" : "s"}` : "") +
      `. The general term is ${term}. ` +
      `Check it: term 1 is ${d} \u00d7 1${c > 0 ? ` + ${c}` : ""} = ${values[0]}, ` +
      `term 2 is ${d} \u00d7 2${c > 0 ? ` + ${c}` : ""} = ${values[1]}, and ` +
      `term 3 is ${d} \u00d7 3${c > 0 ? ` + ${c}` : ""} = ${values[2]}. ` +
      `The rows grow with n and the extra dots do not, which is why ${c} is the constant. ` +
      `The 10th term is ${d} \u00d7 10${c > 0 ? ` + ${c}` : ""} = ${d * 10 + c}.`;

    // Every term the sentence works out is declared — the three the drawing also labels,
    // and the tenth, which is the one that shows the general term is a rule and not a
    // list. `dn + c` is the claim; a printed term that disagrees with it is a defect the
    // picture cannot show.
    claim(
      [1, 2, 3, 10].map((n) => ({
        label: `term ${n}`,
        expression: "d * n + c",
        values: { d, n, c },
        answer: d * n + c,
        shown: String(d * n + c),
      })),
    );
  }

  react([difference, constant], update);
}
