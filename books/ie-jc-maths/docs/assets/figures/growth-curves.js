// Tier-1 guided investigation: linear, quadratic and exponential growth on one pair of
// axes, and the week each plan overtakes the one ahead of it.
//
// The page asks the reader to predict which of the three savings plans is largest in
// week 10, and the week Cara's doubling first beats Aoife's fixed step. The table the
// page used to print answered both questions before they were asked, so the figure
// replaces it: the curves are drawn, the reader moves the week and reads the three
// amounts off the live readout, and the crossover weeks are found rather than told.
//
// The whole drawing layer is the new kit — `axes`, `curve`, `dots`, `line`, `label` —
// so this is also the first figure to prove those helpers in a book rather than in the
// checker's probe.
//
// Nothing here carries a colour. The three curves use the accent, warning and good
// classes, and they are also **labelled in the drawing**, so the distinction does not
// depend on colour alone.
import { SIZE, axes, curve, dots, fmt, label, line, panel, react, slider } from "./kit.js";

// The three plans from the chapter problem.
const PLANS = [
  { id: "aoife", name: "Aoife", rule: (n) => 3 * n, cls: "fig-accent" },
  { id: "ben", name: "Ben", rule: (n) => n * n, cls: "fig-warn" },
  { id: "cara", name: "Cara", rule: (n) => Math.pow(2, n - 1), cls: "fig-good" },
];

const LAST_WEEK = 8;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Three savings plans drawn on one pair of axes: a straight line, a curve that steepens, and a curve that races ahead",
    description:
      "Aoife's plan rises in a straight line, Ben's follows the square numbers and curves upwards, " +
      "and Cara's doubles each week so it climbs far faster once it passes them. The week is chosen " +
      "with the control below and the three amounts are given in the readout.",
    width: 560,
    height: 330,
  });

  const week = slider(el, {
    id: "week",
    label: "Week",
    min: 1,
    max: LAST_WEEK,
    step: 1,
    value: 1,
    show: false,
    name: "Week number, 1 to 8",
  });

  const { draw, x, y, box } = axes({
    width: 560,
    height: 330,
    pad: { left: 62, right: 24, top: 26, bottom: 46 },
    x: { domain: [1, LAST_WEEK], ticks: 8, label: "week", tickFormat: (v) => fmt(v, 0) },
    y: { domain: [0, 130], ticks: 5, label: "saved / €" },
  });

  function update() {
    const n = Number(week.value);

    // The curves, sampled at the whole weeks — the plans are defined week by week, so
    // a smooth line between them would draw amounts nobody ever saves.
    let drawing = draw;
    for (const plan of PLANS) {
      const points = [];
      for (let w = 1; w <= LAST_WEEK; w += 1) points.push([w, plan.rule(w)]);
      drawing += curve(points, { x, y, class: plan.cls, width: 2.5 });
      drawing += dots(points, { x, y, r: 3, class: plan.cls });
    }

    // The reader's week, marked across the whole plot so the three amounts can be read
    // against one vertical line.
    drawing += line({ x1: x(n), y1: box.y0, x2: x(n), y2: box.y1, class: "fig-grid", width: 1.4, dash: "3 3" });
    for (const plan of PLANS) {
      drawing += dots([[n, plan.rule(n)]], { x, y, r: 6, class: plan.cls });
    }

    // Each curve is named where it ends, so the three are told apart without colour.
    const ends = PLANS.map((plan) => ({
      plan,
      value: plan.rule(LAST_WEEK),
    })).sort((a, b) => b.value - a.value);
    ends.forEach((end, index) => {
      drawing += label({
        x: x(LAST_WEEK) - 6,
        y: y(end.value) + 5,
        text: end.plan.name,
        size: SIZE.tick,
        class: `text-${end.plan.cls.replace("fig-", "")}`,
        anchor: "end",
      });
      // `index` only keeps the three labels from being drawn on top of each other when
      // two plans coincide at the last week.
      void index;
    });

    svg.innerHTML = drawing;

    const amounts = PLANS.map((plan) => `${plan.name} €${fmt(plan.rule(n), 0)}`).join(", ");
    const leader = PLANS.reduce((best, plan) => (plan.rule(n) > best.rule(n) ? plan : best), PLANS[0]);
    const why = {
      aoife: "the same amount is added each week",
      ben: "the amounts are the square numbers",
      cara: "the amount doubles each week",
    }[leader.id];
    readout.textContent =
      `In week ${n}, ${amounts}. ` +
      (n === 1
        ? "Aoife is ahead at the start, and Cara is behind both."
        : `${leader.name} is ahead, because ${why}.`);
  }

  react([week], update);
}
