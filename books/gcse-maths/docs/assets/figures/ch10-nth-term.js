// Guided investigation: how the rule for a linear sequence builds its terms.
//
// Guided, not a sandbox: the page asks the reader to predict a term before any
// slider moves, then to explain why changing the constant moves every term while
// the common difference sets the gaps. The figure plots the first six terms
// against their positions and joins them with a straight line, so a change to
// the rule is a visible change to the picture. Colours come from CSS classes, so
// the figure adapts to every bundle and both schemes.
//
// The scaffolding — the surface, its accessible name, the two sliders, the live
// readout, the redraw — comes from `kit.js`.
import { SIZE, fmt, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const AXIS_X = 44;
  const LEFT = 62;
  const RIGHT = 516;
  const TOP = 24;
  const BASE = 208;
  const FIRST = 1;
  const LAST = 6;

  const { svg, readout, claim } = panel(el, {
    label:
      "The first six terms of a linear sequence plotted against their positions and joined by a straight line",
    width: 560,
    height: 250,
    max: 580,
  });

  const difference = slider(el, { show: false,
    id: "difference",
    label: "Common difference",
    min: -2,
    max: 5,
    step: 1,
    value: 4,
  });
  const constant = slider(el, { show: false,
    id: "constant",
    label: "Constant",
    min: -4,
    max: 10,
    step: 1,
    value: 3,
  });

  const xFor = (position) =>
    LEFT + ((position - 0.5) / LAST) * (RIGHT - LEFT);

  function niceStep(span) {
    const target = span / 6;
    for (const step of [1, 2, 5, 10, 20, 50]) {
      if (step >= target) return step;
    }
    return 100;
  }

  function update() {
    const step = Number(difference.value);
    const constantTerm = Number(constant.value);

    const terms = [];
    for (let position = FIRST; position <= LAST; position += 1) {
      terms.push(step * position + constantTerm);
    }

    const low = Math.min(0, ...terms);
    const high = Math.max(0, ...terms);
    const span = high - low || 1;
    const gridStep = niceStep(span);
    const yFor = (value) => BASE - ((value - low) / span) * (BASE - TOP);

    let valueLines = "";
    for (
      let value = Math.ceil(low / gridStep) * gridStep;
      value <= high + 1e-9;
      value += gridStep
    ) {
      const y = yFor(value);
      const lineClass = value === 0 ? "fig-ink" : "fig-grid";
      const lineWidth = value === 0 ? 1.5 : 1;
      valueLines +=
        `<line x1="${AXIS_X}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" ` +
        `class="${lineClass}" stroke-width="${lineWidth}"></line>` +
        label({ x: AXIS_X - 8, y: y + 4, text: fmt(value), anchor: "end", size: SIZE.label, class: "text-ink" });
    }

    const positionTicks = [];
    for (let position = FIRST; position <= LAST; position += 1) {
      const x = xFor(position);
      positionTicks.push(
        `<line x1="${x.toFixed(1)}" y1="${BASE}" x2="${x.toFixed(1)}" y2="${BASE + 5}" class="fig-ink"></line>` +
          label({ x, y: BASE + 19, text: position, anchor: "middle", size: SIZE.label, class: "text-ink" }),
      );
    }

    const points = terms
      .map((term, index) => `${xFor(index + FIRST).toFixed(1)},${yFor(term).toFixed(1)}`)
      .join(" ");

    const dots = terms
      .map((term, index) => {
        const x = xFor(index + FIRST);
        const y = yFor(term);
        return (
          `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" class="fig-accent"></circle>` +
          label({ x, y: Math.max(y - 11, TOP + 12), text: fmt(term), anchor: "middle", size: SIZE.value, class: "text-accent" })
        );
      })
      .join("");

    svg.innerHTML =
      valueLines +
      `<line x1="${AXIS_X}" y1="${TOP}" x2="${AXIS_X}" y2="${BASE}" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${AXIS_X}" y1="${BASE}" x2="${RIGHT}" y2="${BASE}" class="fig-ink" stroke-width="2"></line>` +
      positionTicks.join("") +
      `<polyline points="${points}" class="fig-line"></polyline>` +
      dots +
      label({ x: AXIS_X + 4, y: TOP - 10, text: "term", anchor: "start", size: SIZE.label, class: "text-ink" }) +
      label({ x: RIGHT, y: BASE + 34, text: "position", anchor: "end", size: SIZE.label, class: "text-ink" });

    const rule =
      `term = ${fmt(step)} × position ` +
      (constantTerm < 0 ? `- ${Math.abs(constantTerm)}` : `+ ${constantTerm}`);

    let change = "";
    if (step > 0) {
      change = `Neighbouring terms go up by ${fmt(step)}, so the points lie on a straight line.`;
    } else if (step < 0) {
      change = `Neighbouring terms go down by ${Math.abs(step)}, so the points lie on a straight line.`;
    } else {
      change = "Every term is the same, so the points lie on a flat line.";
    }

    const lastTerm = terms[terms.length - 1];
    // The one term the sentence works out, declared rather than parsed: the printed
    // working is `step × 6 + constant = lastTerm`, so both the multiplier and the
    // constant are values, and the verifier decides the line exactly.
    claim([
      {
        label: "the term at position 6",
        expression: "step * position + constant",
        values: { step, position: LAST, constant: constantTerm },
        answer: lastTerm,
        shown: fmt(lastTerm),
      },
    ]);
    readout.innerHTML =
      `The rule is <strong>${rule}</strong>. ` +
      `Position ${LAST} has <strong>${fmt(step)} × ${LAST} ` +
      `${constantTerm < 0 ? "−" : "+"} ${Math.abs(constantTerm)} = ${fmt(lastTerm)}</strong>. ` +
      change;
  }

  react([difference, constant], update);
}
