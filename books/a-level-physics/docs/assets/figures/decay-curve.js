// Tier-1 guided investigation: the decay curve of a radioactive source.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Three sliders set the half-life, the starting activity and the time
// at which to read the curve. The left panel plots the activity against time in
// half-lives, with the working point marked. The readout gives the activity, the
// number of half-lives and the fraction that remains.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the
// readout is plain HTML.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Activity of a radioactive source against time in half-lives, with the working point marked",
    width: 620,
    height: 300,
    max: 620,
  });

  const halfLife = slider(el, {
    id: "half-life",
    label: "Half-life (hours)",
    min: 1,
    max: 20,
    value: 8,
  });
  const activity = slider(el, {
    id: "activity",
    label: "Starting activity (becquerels)",
    min: 100,
    max: 1000,
    step: 50,
    value: 800,
  });
  const time = slider(el, {
    id: "time",
    label: "Time (half-lives)",
    min: 0,
    max: 5,
    step: 0.1,
    value: 3,
    format: (value) => value.toFixed(1),
  });

  const LEFT = 80;
  const RIGHT = 580;
  const TOP = 40;
  const BOTTOM = 250;
  const T_MAX = 5;

  const px = (t) => LEFT + (t / T_MAX) * (RIGHT - LEFT);
  const py = (fraction) => BOTTOM - fraction * (BOTTOM - TOP);

  function update() {
    const halfLifeHours = Number(halfLife.value);
    const start = Number(activity.value);
    const n = Number(time.value);

    const fraction = Math.pow(2, -n);
    const remaining = start * fraction;
    const elapsed = n * halfLifeHours;

    let axes =
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${LEFT}" y2="${TOP}" class="fig-ink"></line>` +
      `<text x="${LEFT}" y="${TOP - 12}" font-size="20" class="fig-ink">activity / fraction of start</text>` +
      `<text x="${RIGHT}" y="${BOTTOM + 18}" font-size="20" class="fig-ink" text-anchor="end">time / half-lives</text>`;

    for (let tick = 0; tick <= T_MAX; tick += 1) {
      const x = px(tick);
      axes +=
        `<line x1="${x.toFixed(1)}" y1="${BOTTOM}" x2="${x.toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `<text x="${x.toFixed(1)}" y="${BOTTOM + 16}" font-size="18" class="fig-ink" text-anchor="middle">${tick}</text>`;
    }
    for (let tick = 0; tick <= 4; tick += 1) {
      const y = py(tick / 4);
      axes +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        `<text x="${LEFT - 8}" y="${(y + 4).toFixed(1)}" font-size="18" class="fig-ink" text-anchor="end">${(tick / 4).toFixed(2)}</text>`;
    }

    let curve = "";
    for (let index = 0; index <= 120; index += 1) {
      const sample = (index / 120) * T_MAX;
      curve += `${px(sample).toFixed(1)},${py(Math.pow(2, -sample)).toFixed(1)} `;
    }

    const line =
      `<polyline points="${curve.trim()}" class="fig-accent" fill="none" stroke-width="3"></polyline>`;

    let halfMarks = "";
    for (let step = 1; step <= 5; step += 1) {
      halfMarks +=
        `<circle cx="${px(step).toFixed(1)}" cy="${py(Math.pow(2, -step)).toFixed(1)}" r="4" class="fig-good"></circle>`;
    }

    const marker =
      `<line x1="${px(n).toFixed(1)}" y1="${py(0).toFixed(1)}" x2="${px(n).toFixed(1)}" y2="${py(fraction).toFixed(1)}" class="fig-ink" stroke-dasharray="4 3"></line>` +
      `<circle cx="${px(n).toFixed(1)}" cy="${py(fraction).toFixed(1)}" r="6" class="fig-warn"></circle>`;

    svg.innerHTML = axes + halfMarks + line + marker;

    readout.innerHTML =
      `After <strong>${n.toFixed(1)} half-lives</strong> the fraction remaining is ` +
      `<strong>${fraction.toFixed(3)}</strong>. Starting at ${start} Bq, the activity is ` +
      `<strong>${remaining.toFixed(1)} Bq</strong>. The time elapsed is ` +
      `<strong>${elapsed.toFixed(1)} hours</strong>, with a half-life of ${halfLifeHours} hours. ` +
      `The dots mark whole half-lives. ` +
      `<em>Set the time to 3 half-lives. What fraction remains? Try 4.</em>`;
  }

  react([halfLife, activity, time], update);
}
