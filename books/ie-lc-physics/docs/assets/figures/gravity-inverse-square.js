// The inverse-square law, drawn for gravity and for the electric force.
//
// Section 6.2 teaches F = G m1 m2 / d^2 and gives it the name "inverse-square law".
// The page's examples are numbers, and a reader can work them out and still not see
// that the curve is the same curve as Coulomb's law with a different constant. So the
// figure draws the force between two bodies against the distance between them, with a
// marker the reader moves, and a chooser that swaps the constant and the units
// together. The comparison is of the shape, because two forces in different units
// cannot be compared as numbers.
//
// Nothing here carries a colour. Every shape uses a fig-* class and every word a
// text-* class, so the figure follows the reader's theme in both schemes.
//
// The scaffolding — the panel, its accessible name, the controls, the readout and the
// redraw — comes from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, arrow, axes, circle, curve, fmt, label, line, panel, react, segmented, sigfig, slider } from "./kit.js";

// The two laws, with the units each one's sliders stand for. The distance and the
// amounts are chosen so that both sets of numbers stay small and readable: the
// gravity sliders count 10^24 kg and 10^8 m, the electric ones microcoulombs and
// metres. Switching the law switches both together, so the same slider value means a
// sensible amount in either mode.
const LAWS = {
  gravity: {
    name: "Gravity",
    constant: 6.67e-11,
    constantLabel: "G = 6.67 × 10⁻¹¹ N m² kg⁻²",
    amountFactor: 1e24,
    amountUnit: "× 10²⁴ kg",
    distanceFactor: 1e8,
    distanceUnit: "× 10⁸ m",
    first: "m₁",
    second: "m₂",
    firstLabel: "Mass 1",
    secondLabel: "Mass 2",
    attracts: true,
    shape: "fig-accent",
    word: "text-accent",
  },
  electric: {
    name: "Electric",
    constant: 9.0e9,
    constantLabel: "k = 9.0 × 10⁹ N m² C⁻²",
    amountFactor: 1e-6,
    amountUnit: "µC",
    distanceFactor: 1,
    distanceUnit: "m",
    first: "q₁",
    second: "q₂",
    firstLabel: "Charge 1",
    secondLabel: "Charge 2",
    attracts: false,
    shape: "fig-good",
    word: "text-good",
  },
};

/** The force between the two amounts, in newtons, with the slider values in the law's units. */
function forceBetween(law, first, second, distance) {
  const a = first * law.amountFactor;
  const b = second * law.amountFactor;
  const d = distance * law.distanceFactor;
  return (law.constant * a * b) / (d * d);
}

/** Rename a slider's visible label, keeping the input and its output where they are. */
function relabel(input, text) {
  const holder = input.parentElement;
  if (holder && holder.firstChild && holder.firstChild.nodeType === 3) {
    holder.firstChild.nodeValue = `${text} `;
  }
}

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label: "Two bodies and the force between them, with the force plotted against the distance between their centres",
    description:
      "Two round bodies sit above a graph of the force between them against the distance between " +
      "their centres. The bodies move further apart as the distance control increases. The graph " +
      "shows the force falling with the square of the distance. A chooser switches the same law " +
      "between gravity and the electric force, so the two can be compared.",
    prompt: "Predict what happens to the force when you double the distance. Then double it and check.",
    width: 560,
    height: 360,
  });

  const lawChoice = segmented(el, {
    id: "law",
    label: "Inverse-square law",
    choices: [
      { value: "gravity", label: "Gravity" },
      { value: "electric", label: "Electric" },
    ],
    value: "gravity",
  });

  const first = slider(el, {
    id: "first",
    label: "Mass 1",
    min: 1,
    max: 9,
    step: 1,
    value: 6,
    show: true,
    name: "The first mass or charge, in the units of the chosen law",
  });

  const second = slider(el, {
    id: "second",
    label: "Mass 2",
    min: 1,
    max: 9,
    step: 1,
    value: 7,
    show: true,
    name: "The second mass or charge, in the units of the chosen law",
  });

  const distance = slider(el, {
    id: "distance",
    label: "Distance between centres",
    min: 1,
    max: 9,
    step: 0.5,
    value: 4,
    show: true,
    name: "The distance between the centres, in the units of the chosen law",
  });

  function update() {
    const law = LAWS[lawChoice.value] || LAWS.gravity;
    const a = Number(first.value);
    const b = Number(second.value);
    const d = Number(distance.value);
    const force = forceBetween(law, a, b, d);
    // The force at the closest distance the slider allows, so the curve always fills
    // the graph and the marker stays on it.
    const closest = forceBetween(law, a, b, 1);

    relabel(first, law.firstLabel);
    relabel(second, law.secondLabel);

    const { draw, x, y, box } = axes({
      width: 560,
      height: 360,
      pad: { left: 78, right: 24, top: 100, bottom: 48 },
      x: { domain: [1, 9], ticks: 5, label: `distance / ${law.distanceUnit}` },
      y: { domain: [0, closest], ticks: 4, label: "force / N", tickFormat: (value) => sigfig(value, 1) },
    });

    // The two bodies, and the force between them. Gravity pulls them together; two
    // like charges push them apart, and the arrows say which.
    const topY = 48;
    const gap = 80 + ((d - 1) / 8) * 250;
    const left = 280 - gap / 2;
    const right = 280 + gap / 2;
    const mid = 280;
    let bodies = "";
    bodies += circle({ cx: left, cy: topY, r: 15, class: law.shape });
    bodies += circle({ cx: right, cy: topY, r: 15, class: law.shape });
    bodies += label({ x: left, y: topY - 24, text: law.first, size: SIZE.value, class: law.word });
    bodies += label({ x: right, y: topY - 24, text: law.second, size: SIZE.value, class: law.word });
    if (law.attracts) {
      bodies += arrow({ x1: left + 16, y1: topY, x2: mid - 7, y2: topY, class: "fig-ink", width: 2, head: 9 });
      bodies += arrow({ x1: right - 16, y1: topY, x2: mid + 7, y2: topY, class: "fig-ink", width: 2, head: 9 });
    } else {
      bodies += arrow({ x1: mid - 7, y1: topY, x2: left + 16, y2: topY, class: "fig-ink", width: 2, head: 9 });
      bodies += arrow({ x1: mid + 7, y1: topY, x2: right - 16, y2: topY, class: "fig-ink", width: 2, head: 9 });
    }
    bodies += label({ x: 280, y: topY + 34, text: law.constantLabel, size: SIZE.tick, class: "text-ink" });

    // The law itself, sampled because it is not a straight line, with the reader's
    // point on it and guides to both axes.
    const samples = [];
    for (let i = 0; i <= 120; i += 1) {
      const value = 1 + (8 * i) / 120;
      samples.push([value, forceBetween(law, a, b, value)]);
    }
    let drawing = draw + bodies;
    drawing += curve(samples, { x, y, class: law.shape, width: 2.6 });
    drawing += line({ x1: x(d), y1: box.y0, x2: x(d), y2: y(force), class: "fig-grid", width: 1.4, dash: "5 4" });
    drawing += line({ x1: box.x0, y1: y(force), x2: x(d), y2: y(force), class: "fig-grid", width: 1.4, dash: "5 4" });
    drawing += circle({ cx: x(d), cy: y(force), r: 6, class: "fig-warn" });
    drawing += label({ x: box.x1 - 8, y: box.y1 + 24, text: `d = ${fmt(d)} ${law.distanceUnit}`, size: SIZE.value, class: "text-warn", anchor: "end" });

    svg.innerHTML = drawing;

    const doubled = forceBetween(law, a, b, 2 * d);
    readout.textContent =
      `${law.name} between ${law.first} = ${fmt(a)} ${law.amountUnit} and ${law.second} = ${fmt(b)} ${law.amountUnit}, ` +
      `at a distance of ${fmt(d)} ${law.distanceUnit}, is ${sigfig(force, 3)} N. ` +
      `Double the distance to ${fmt(2 * d)} ${law.distanceUnit} and the force becomes ${sigfig(doubled, 3)} N, one quarter as large.`;

    // The force and the doubled-distance force, in the law's own units, declared. The
    // masses, charges and distance are passed as the numbers the expression actually
    // multiplies, so `m1` is 6e24 kg rather than the slider's 6, and the constant is
    // the one the label prints.
    const metre = d * law.distanceFactor;
    const firstAmount = a * law.amountFactor;
    const secondAmount = b * law.amountFactor;
    // `sigfig` writes a large force as `1.75e22`, and the verifier reads a printed
    // number's tolerance from its decimal places — which an exponent does not carry, so
    // a numeric `shown` of that form would demand the full 22 digits. The unit is part
    // of what the reader sees, so the claim quotes it, and the expression against the
    // answer is what is proved.
    claim([
      {
        label: "the force",
        expression: "constant * m1 * m2 / d ** 2",
        values: { constant: law.constant, m1: firstAmount, m2: secondAmount, d: metre },
        answer: force,
        shown: `${sigfig(force, 3)} N`,
      },
      {
        label: "the force at twice the distance",
        expression: "constant * m1 * m2 / (2 * d) ** 2",
        values: { constant: law.constant, m1: firstAmount, m2: secondAmount, d: metre },
        answer: doubled,
        shown: `${sigfig(doubled, 3)} N`,
      },
      {
        label: "one quarter of the force",
        expression: "constant * m1 * m2 / d ** 2 / 4",
        values: { constant: law.constant, m1: firstAmount, m2: secondAmount, d: metre },
        answer: doubled,
        shown: `${sigfig(doubled, 3)} N`,
      },
    ]);
  }

  react([lawChoice, first, second, distance], update);
}
