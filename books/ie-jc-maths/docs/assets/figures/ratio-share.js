// Tier-1 guided investigation: dividing a quantity in a ratio as a bar of equal parts.
//
// Section 6.2 divides an amount by adding the parts, dividing by the total number of
// parts, and multiplying back up. The trap it names is dividing the amount by each
// part separately, which gives shares that do not add back to the whole. A bar of
// equal parts makes both halves of the method visible: the whole bar is the amount,
// every part is the same width, and the two shares are counts of those parts.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { SIZE, fmt, label, line, panel, react, rect, slider } from "./kit.js";

const X0 = 60;
const WIDTH = 440;
const BAR = 58;

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label: "A bar for a total amount, cut into equal parts and shared in a ratio between two people",
    description:
      "The bar is the whole amount, cut into as many equal parts as the ratio has in total. The first " +
      "share takes the first group of parts and the second share takes the rest, so the two shares " +
      "together make the whole bar.",
    prompt: "Predict which share will be larger, then change the ratio and check.",
    width: 560,
    height: 250,
  });

  const total = slider(el, { id: "total", label: "Total", min: 12, max: 120, step: 1, value: 60, show: true });
  const first = slider(el, { id: "first", label: "First share, in parts", min: 1, max: 6, step: 1, value: 2, show: true });
  const second = slider(el, { id: "second", label: "Second share, in parts", min: 1, max: 6, step: 1, value: 3, show: true });

  function update() {
    const amount = Number(total.value);
    const a = Number(first.value);
    const b = Number(second.value);
    const parts = a + b;
    const each = amount / parts;
    const exact = Math.abs(each - Math.round(each)) < 1e-9;
    const cell = WIDTH / parts;
    const y = 96;

    let drawing = "";
    // One block per part, so the count of parts is the picture and not a calculation.
    for (let i = 0; i < parts; i += 1) {
      drawing += rect({
        x: X0 + i * cell,
        y,
        width: cell,
        height: BAR,
        class: i < a ? "fig-accent" : "fig-good",
        opacity: i % 2 === 0 ? 0.38 : 0.22,
      });
    }
    for (let i = 1; i < parts; i += 1) {
      drawing += line({ x1: X0 + i * cell, y1: y, x2: X0 + i * cell, y2: y + BAR, class: "fig-ink", width: 1.4 });
    }
    drawing += rect({ x: X0, y, width: WIDTH, height: BAR, class: "fig-ink" });

    // A bracket over each share, so the two groups of parts are named.
    const bracket = (from, count, text, cls) => {
      const left = X0 + from * cell;
      const right = left + count * cell;
      const top = y - 16;
      let out = line({ x1: left, y1: top, x2: right, y2: top, class: cls, width: 2 });
      out += line({ x1: left, y1: top, x2: left, y2: y, class: cls, width: 1.4 });
      out += line({ x1: right, y1: top, x2: right, y2: y, class: cls, width: 1.4 });
      out += label({ x: (left + right) / 2, y: top - 8, text, size: SIZE.value, class: cls.replace("fig-", "text-") });
      return out;
    };
    drawing += bracket(0, a, `first share: ${fmt(each * a, 2)}`, "fig-accent");
    drawing += bracket(a, b, `second share: ${fmt(each * b, 2)}`, "fig-good");

    for (let i = 0; i < parts; i += 1) {
      drawing += label({
        x: X0 + (i + 0.5) * cell,
        y: y + BAR + 24,
        text: fmt(each, 2),
        size: SIZE.tick,
        class: "text-ink",
      });
    }
    drawing += label({
      x: X0 + WIDTH / 2,
      y: y + BAR + 50,
      text: `the whole bar is ${fmt(amount, 0)}`,
      size: SIZE.label,
      class: "text-ink",
    });
    svg.innerHTML = drawing;

    const r2 = (value) => fmt(value, 2);
    // The two shares are the arithmetic this figure states, so they are declared. In the
    // exact case the printed equation is `a × each`; otherwise it is computed from the
    // total, because a rounded `each` multiplied back up is the defect this replaced.
    const shareClaims = exact
      ? [
          { label: "first share", expression: "a * each", values: { a, each }, answer: each * a, shown: String(each * a) },
          { label: "second share", expression: "b * each", values: { b, each }, answer: each * b, shown: String(each * b) },
        ]
      : [
          { label: "first share", expression: "amount * a / parts", values: { amount, a, parts }, answer: each * a, shown: r2(each * a) },
          { label: "second share", expression: "amount * b / parts", values: { amount, b, parts }, answer: each * b, shown: r2(each * b) },
        ];
    claim(shareClaims);
    // Rounding two shares can leave the check a penny short, so the sentence says
    // which of the two it is rather than asserting a sum that may not hold.
    const checkAddsUp =
      Math.abs(Number(r2(each * a)) + Number(r2(each * b)) - amount) < 0.005;
    readout.textContent =
      `${fmt(amount, 0)} is divided in the ratio ${a}:${b}. Add the parts: ${a} + ${b} = ${parts}. ` +
      `One part is ${fmt(amount, 0)} \u00f7 ${parts}${exact ? ` = ${fmt(each, 0)}` : `, which is ${r2(each)} to 2 decimal places`}. ` +
      // Only an exact one-part value can be multiplied back up in print. When it is not,
      // the share is computed from the total, so the equation printed is one that holds:
      // `100 \u00d7 3 \u00f7 7 = 42.86`, not `3 \u00d7 14.29 = 42.86` with 14.29 rounded.
      (exact
        ? `The shares are ${a} \u00d7 ${each} = ${each * a} and ${b} \u00d7 ${each} = ${each * b}. `
        : `The shares are ${fmt(amount, 0)} \u00d7 ${a} \u00f7 ${parts} = ${r2(each * a)} and ` +
          `${fmt(amount, 0)} \u00d7 ${b} \u00f7 ${parts} = ${r2(each * b)}, both to 2 decimal places. `) +
      `Check: ${r2(each * a)} + ${r2(each * b)} = ${r2(each * a + each * b)}${checkAddsUp ? ", which is the total" : ", which is the total before rounding"}.`;
  }

  react([total, first, second], update);
}
