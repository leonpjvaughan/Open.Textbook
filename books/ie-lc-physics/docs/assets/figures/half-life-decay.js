// Tier-1 guided investigation: the decay curve and what one half-life does.
//
// The page asks the reader to predict the fraction left after three half-lives,
// then to move the slider and check, then to explain why the curve never reaches
// zero. So the figure draws the whole curve, marks the point the reader chose, and
// shows the two readings a half-life is found from: the activity, and the time at
// which it has halved.
//
// The starting activity is fixed at 800 Bq, so the fraction on the curve and a real
// activity are visible together. Nothing here carries a colour; the curve, the
// guides and the marker use different `fig-*` classes and line styles.
//
// The scaffolding comes from `kit.js`. What is left is the drawing and the words.
import { SIZE, chooser, fmt, label, panel, react, scale, slider } from "./kit.js";

const A0 = 800; // Bq

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A decay curve of activity against time in half-lives, with a movable marker on the curve",
    width: 560,
    height: 260,
  });

  const elapsed = slider(el, {
    show: true,
    id: "elapsed",
    label: "Half-lives elapsed",
    min: 0,
    max: 6,
    step: 0.25,
    value: 2,
    unit: "half-lives",
  });

  const isotope = chooser(el, {
    id: "isotope",
    label: "Name the time for",
    choices: [
      { value: "carbon", label: "Carbon-14 (5730 years)" },
      { value: "radon", label: "Radon-222 (3.8 days)" },
      { value: "technetium", label: "Technetium-99m (6.0 hours)" },
    ],
    value: "carbon",
  });

  const PLOT = { x0: 72, y0: 196, x1: 516, y1: 28 };
  const x = scale({ domain: [0, 6], range: [PLOT.x0, PLOT.x1] });
  const y = scale({ domain: [0, 1], range: [PLOT.y0, PLOT.y1] });

  const HALF_LIVES = {
    carbon: { label: "years", value: 5730 },
    radon: { label: "days", value: 3.8 },
    technetium: { label: "hours", value: 6.0 },
  };

  function update() {
    const t = Number(elapsed.value);
    const fraction = Math.pow(2, -t);
    const activity = A0 * fraction;
    const half = HALF_LIVES[isotope.value];
    const elapsedTime = t * half.value;

    let drawing = "";

    // Axes.
    drawing += `<line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x1}" y2="${PLOT.y0}" class="fig-grid" stroke-width="1.5"></line>`;
    drawing += `<line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x0}" y2="${PLOT.y1}" class="fig-grid" stroke-width="1.5"></line>`;
    drawing += label({ x: PLOT.x0 - 10, y: PLOT.y0 + 5, text: "0", anchor: "end", size: SIZE.tick });
    drawing += label({ x: PLOT.x0 - 10, y: PLOT.y1 + 5, text: "A0", anchor: "end", size: SIZE.tick });
    drawing += label({ x: PLOT.x1, y: PLOT.y0 + 22, text: "time / half-lives", anchor: "end", size: SIZE.tick });
    drawing += label({ x: PLOT.x0 - 8, y: PLOT.y1 - 6, text: "activity", anchor: "end", size: SIZE.tick });

    // Tick marks at every whole half-life.
    for (let step = 0; step <= 6; step += 1) {
      drawing += `<line x1="${x(step)}" y1="${PLOT.y0}" x2="${x(step)}" y2="${PLOT.y0 + 6}" class="fig-grid" stroke-width="1.5"></line>`;
      drawing += label({ x: x(step), y: PLOT.y0 + 22, text: String(step), size: SIZE.tick });
    }

    // The curve, sampled because it is not a straight line.
    let curve = "";
    for (let i = 0; i < 120; i += 1) {
      const t1 = (6 * i) / 120;
      const t2 = (6 * (i + 1)) / 120;
      curve += `<line x1="${x(t1).toFixed(1)}" y1="${y(Math.pow(2, -t1)).toFixed(1)}" x2="${x(t2).toFixed(1)}" y2="${y(Math.pow(2, -t2)).toFixed(1)}" class="fig-accent" stroke-width="2.5"></line>`;
    }
    drawing += curve;

    // A dot at each whole half-life, so the halving steps are visible.
    for (let step = 1; step <= 6; step += 1) {
      drawing += `<circle cx="${x(step).toFixed(1)}" cy="${y(Math.pow(2, -step)).toFixed(1)}" r="3.2" class="fig-ink"></circle>`;
    }

    // The marker at the chosen time, with guides to both axes.
    drawing += `<line x1="${x(t)}" y1="${PLOT.y0}" x2="${x(t)}" y2="${y(fraction)}" class="fig-grid" stroke-width="1.5" stroke-dasharray="4 4"></line>`;
    drawing += `<line x1="${PLOT.x0}" y1="${y(fraction)}" x2="${x(t)}" y2="${y(fraction)}" class="fig-grid" stroke-width="1.5" stroke-dasharray="4 4"></line>`;
    drawing += `<circle cx="${x(t).toFixed(1)}" cy="${y(fraction).toFixed(1)}" r="5.5" class="fig-warn"></circle>`;
    drawing += label({
      x: x(t),
      y: y(fraction) - 14,
      text: `${fmt(fraction * 100, 1)}%`,
      size: SIZE.value,
      class: "text-warn",
      weight: 600,
    });

    svg.innerHTML = drawing;

    readout.textContent = `After ${fmt(t, 2)} half-lives the fraction remaining is ${fmt(fraction, 3)}. A source that started at ${A0} Bq now has an activity of about ${fmt(activity, 3)} Bq. For ${half.label === "years" ? "carbon-14" : half.label === "days" ? "radon-222" : "technetium-99m"} that is about ${fmt(elapsedTime, 3)} ${half.label}.`;
  }

  react([elapsed, isotope], update);
}
