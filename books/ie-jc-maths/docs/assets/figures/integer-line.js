// Tier-1 guided investigation: adding and subtracting integers as movement along
// the number line.
//
// Section 1.2 teaches four movements — adding a positive goes right, adding a
// negative goes left, subtracting a positive goes left, subtracting a negative goes
// right — and the trap it names is that two signs side by side are read as one. The
// picture is the lesson: the reader sets where they start and how far they move, and
// watches the hop go the way the rule says. Subtracting a negative is the case worth
// seeing, because the hops then run to the right when the written sign says minus.
//
// The hops are drawn one place at a time, because "you pass -6, then -5, then -4" is
// how the page teaches the count. The arrow only carries the direction; the hops
// carry the size.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { fmt, label, numberLine, panel, path, react, segmented, slider, circle } from "./kit.js";

// A hop is a semicircle over one unit of the line.
const HOP = 11;
const RING = (cx, cy, r) =>
  path({
    d: `M${cx - r} ${cy} A${r} ${r} 0 1 0 ${cx + r} ${cy} A${r} ${r} 0 1 0 ${cx - r} ${cy}`,
    class: "fig-grid",
    width: 2.4,
  });

/** A whole number written with the minus sign a reader expects, not a hyphen. */
const num = (value) => String(value).replace("-", "\u2212");

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label: "A number line from minus twelve to twelve, with a start point and a jump of one place at a time",
    description:
      "The starting number is marked on the number line and the movement is drawn as a row of " +
      "semicircular hops, one for each place moved. The hops run to the right for an addition and to " +
      "the left for a subtraction.",
    prompt: "Predict which way the hops will go, then set the numbers and check.",
    width: 560,
    height: 170,
  });

  const start = slider(el, { id: "start", label: "Start at", min: -10, max: 10, step: 1, value: -3, show: true });
  const move = slider(el, { id: "move", label: "Second number", min: -10, max: 10, step: 1, value: -8, show: true });
  const operation = segmented(el, {
    id: "operation",
    label: "Operation",
    choices: [
      { value: "add", label: "Add" },
      { value: "subtract", label: "Subtract" },
    ],
    value: "add",
  });

  function update() {
    const from = Number(start.value);
    const amount = Number(move.value);
    const adding = operation.value === "add";
    // Adding moves in the direction of the second number's sign. Subtracting moves
    // the other way, which is the whole of the two-signs rule.
    const direction = adding ? Math.sign(amount) : -Math.sign(amount);
    const to = adding ? from + amount : from - amount;
    const steps = Math.abs(amount);

    const line = numberLine({ width: 560, height: 120, min: -12, max: 12, step: 13, label: "" });
    let drawing = line.draw;

    // The hops, drawn left to right so the reader can count them in the direction
    // they are travelled.
    if (direction !== 0) {
      for (let i = 0; i < steps; i += 1) {
        const a = from + direction * i;
        const b = a + direction;
        const left = Math.min(a, b);
        const right = Math.max(a, b);
        drawing += path({
          d: `M${line.x(left)} ${line.y} A${HOP} ${HOP} 0 0 ${direction > 0 ? 1 : 0} ${line.x(right)} ${line.y}`,
          class: "fig-accent",
          width: 2,
        });
      }
    }

    // The endpoints last, so a hop never covers the dot it starts from.
    drawing += RING(line.x(from), line.y, 8);
    drawing += circle({ cx: line.x(to), cy: line.y, r: 7, class: "fig-accent" });
    drawing += label({
      x: line.x(to),
      y: line.y + 44,
      text: num(to),
      size: 18,
      class: "text-accent",
      weight: 600,
    });
    svg.innerHTML = drawing;

    const expression = adding
      ? `${num(from)} + ${amount < 0 ? `(${num(amount)})` : amount}`
      : `${num(from)} \u2212 ${amount < 0 ? `(${num(amount)})` : amount}`;
    const answer = `${expression} = ${num(to)}`;

    // The landing number and the count of hops are the arithmetic this figure states,
    // declared. `start` rather than `from`, because `from` is a Python keyword and the
    // verifier parses the expression as Python.
    claim([
      {
        label: "where the hops land",
        expression: adding ? "start + amount" : "start - amount",
        values: { start: from, amount },
        answer: to,
        shown: num(to),
      },
      {
        label: "how many hops",
        expression: "abs(amount)",
        values: { amount },
        answer: steps,
        shown: String(steps),
      },
    ]);

    if (amount === 0) {
      readout.textContent = `${answer}. The second number is 0, so there is no movement and you stay at ${num(from)}.`;
      return;
    }

    let rule;
    if (adding && amount > 0) {
      rule = `Adding a positive number moves you to the right, so the ${steps} hops go right.`;
    } else if (adding && amount < 0) {
      rule = `Adding a negative number moves you to the left, so the ${steps} hops go left.`;
    } else if (!adding && amount > 0) {
      rule = `Subtracting a positive number moves you to the left, so the ${steps} hops go left.`;
    } else {
      rule = `Subtracting a negative number is the same as adding ${steps}, so the ${steps} hops go right.`;
    }
    readout.textContent = `${answer}. ${rule} The hop starts at ${num(from)} and lands at ${num(to)}.`;
  }

  react([start, move, operation], update);
}
