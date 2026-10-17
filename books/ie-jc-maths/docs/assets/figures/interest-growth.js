// Tier-1 guided investigation: simple interest against compound interest.
//
// Section 7.5 gives two formulae and one sentence — compound interest earns interest
// on the interest — and the sentence is the whole difference. Drawing both totals on
// one pair of axes makes it visible: the simple total is a straight line, the compound
// total curves away from it, and the widening gap between them is exactly the interest
// that the interest earned. The gap is the lesson, so it is shaded and measured.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { axes, circle, coord, dots, fmt, graph, label, panel, path, react, slider } from "./kit.js";

const money = (value) =>
  "\u20ac" + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label: "Two graphs of a savings total against time, one straight for simple interest and one curving up for compound interest",
    description:
      "The straight line is the total with simple interest, which grows by the same amount every year. " +
      "The curve is the total with compound interest, which grows faster each year. The shaded area " +
      "between them is the extra interest that the interest itself earned.",
    prompt: "Predict how the two totals compare after one year, then change the number of years and check.",
    width: 560,
    height: 330,
  });

  const principal = slider(el, { id: "principal", label: "Amount saved", min: 500, max: 5000, step: 100, value: 2000, show: true, unit: "\u20ac" });
  const rate = slider(el, { id: "rate", label: "Rate each year", min: 1, max: 10, step: 0.5, value: 5, show: true, unit: "%" });
  const years = slider(el, { id: "years", label: "Years", min: 1, max: 10, step: 1, value: 3, show: true });

  function update() {
    const P = Number(principal.value);
    const r = Number(rate.value) / 100;
    const t = Number(years.value);

    const simple = (n) => P * (1 + r * n);
    const compound = (n) => P * Math.pow(1 + r, n);
    const top = Math.max(simple(t), compound(t)) * 1.12;

    const { draw, x, y, box } = axes({
      width: 560,
      height: 330,
      pad: { left: 76, right: 96, top: 22, bottom: 46 },
      x: { domain: [0, t], label: "years", ticks: Math.min(6, t + 1), tickFormat: (v) => fmt(v, 0) },
      y: { domain: [0, top], label: "euro", ticks: 5, tickFormat: (v) => fmt(v, 0) },
    });

    // The gap is drawn first, under both lines, so it reads as the space between them.
    const gap = [];
    for (let i = 0; i <= 60; i += 1) gap.push([(t * i) / 60, compound((t * i) / 60)]);
    let d = gap.map(([px, py], i) => `${i ? "L" : "M"}${coord(x(px))} ${coord(y(py))}`).join(" ");
    for (let i = 60; i >= 0; i -= 1) {
      const n = (t * i) / 60;
      d += `L${coord(x(n))} ${coord(y(simple(n)))}`;
    }
    d += "Z";

    let drawing = draw;
    if (compound(t) > simple(t) + 1e-9) {
      drawing += path({ d, class: "fig-warn", fill: "currentColor", width: 0, opacity: 0.2 });
    }
    drawing += graph(simple, { x, y, from: 0, to: t, class: "fig-accent", width: 2.5 });
    drawing += graph(compound, { x, y, from: 0, to: t, class: "fig-good", width: 2.5 });

    const marks = [];
    for (let n = 0; n <= t; n += 1) marks.push([n, simple(n)], [n, compound(n)]);
    drawing += dots(marks, { x, y, r: 3.5, class: "fig-ink" });
    drawing += circle({ cx: x(t), cy: y(simple(t)), r: 5, class: "fig-accent" });
    drawing += circle({ cx: x(t), cy: y(compound(t)), r: 5, class: "fig-good" });
    drawing += label({ x: x(t) + 8, y: y(simple(t)) + 5, text: "simple", size: 16, class: "text-accent", anchor: "start" });
    drawing += label({ x: x(t) + 8, y: y(compound(t)) + 5, text: "compound", size: 16, class: "text-good", anchor: "start" });
    drawing += label({
      x: (box.x0 + box.x1) / 2,
      y: box.y1 - 6,
      text: `${money(P)} at ${fmt(Number(rate.value), 1)}% for ${t} year${t > 1 ? "s" : ""}`,
      size: 16,
      class: "text-ink",
    });
    svg.innerHTML = drawing;

    const simpleInterest = P * r * t;
    const compoundTotal = compound(t);
    const gapAtEnd = compoundTotal - simple(t);
    // Declared, not parsed. The defect this replaced printed `× 0.07` for a rate of
    // 6.5%; with the rate as a value, the verifier rationalises it to 13/200 and the
    // multiplication is decided exactly.
    claim([
      { label: "simple interest", expression: "P * r * t", values: { P, r, t }, answer: simpleInterest, shown: money(simpleInterest) },
      { label: "compound total", expression: "P * (1 + r) ** t", values: { P, r, t }, answer: compoundTotal, shown: money(compoundTotal) },
      // The two numbers the sentence prints as its *working*. Claiming them is what
      // makes a rounded intermediate a failure: the verifier requires the readout to
      // contain the string claimed, so printing `0.07` for a claimed `0.065` fails even
      // though the total beside it is right. That was the original defect.
      { label: "rate", expression: "r", values: { r }, answer: r, shown: fmt(r, 3) },
      { label: "compound multiplier", expression: "1 + r", values: { r }, answer: 1 + r, shown: fmt(1 + r, 3) },
    ]);
    readout.textContent =
      `${money(P)} at ${fmt(Number(rate.value), 1)}% for ${t} year${t > 1 ? "s" : ""}. ` +
      // Three decimal places, because the rate moves in half percents: `r` is 0.065
      // at 6.5%, and `fmt(r, 2)` printed "0.07", which made the working false while
      // the total beside it was right.
      `Simple interest is ${money(P)} \u00d7 ${fmt(r, 3)} \u00d7 ${t} = ${money(simpleInterest)}, so the total is ${money(simple(t))}. ` +
      `Compound interest gives ${money(P)} \u00d7 ${fmt(1 + r, 3)}^${t} = ${money(compoundTotal)}. ` +
      (gapAtEnd < 0.005
        ? `After one year the two totals are the same, because the first year's interest has not earned anything yet.`
        : `Compound interest is ${money(gapAtEnd)} more. That extra is the interest on the interest, and it is the shaded gap.`);
  }

  react([principal, rate, years], update);
}
