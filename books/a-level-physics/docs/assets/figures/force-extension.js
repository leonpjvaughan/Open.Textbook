// Tier-1 guided investigation: a force-extension graph and the energy stored.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. The stiffness sets the gradient of the straight line, and the force
// sets the point on it. The figure draws the line, marks the current point and
// shades the triangular area under the line, which is the energy stored. The
// point of the investigation is that the gradient is the spring constant and the
// area is the energy.
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
      "A force-extension graph for a spring, with a straight line through the origin and the area under the line shaded as the energy stored",
    width: 600,
    height: 270,
    max: 600,
  });

  const stiffness = slider(el, {
    id: "stiffness",
    label: "Stiffness (N/m)",
    min: 100,
    max: 500,
    step: 50,
    value: 200,
  });
  const force = slider(el, {
    id: "force",
    label: "Force (N)",
    min: 0,
    max: 40,
    value: 20,
  });

  const LEFT = 64;
  const RIGHT = 560;
  const TOP = 26;
  const BOTTOM = 230;
  const X_MAX = 0.4; // metres
  const Y_MAX = 40; // newtons

  const px = (x) => LEFT + (x / X_MAX) * (RIGHT - LEFT);
  const py = (f) => BOTTOM - (f / Y_MAX) * (BOTTOM - TOP);

  function update() {
    const k = Number(stiffness.value);
    const f = Number(force.value);

    const x = f / k;
    const pointX = px(x);
    const pointY = py(f);

    // Axes and the labelled ticks.
    let axes =
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${LEFT}" y2="${TOP}" class="fig-ink"></line>` +
      `<text x="${LEFT}" y="${TOP - 8}" font-size="19" class="fig-ink">force / N</text>` +
      `<text x="${RIGHT}" y="${BOTTOM + 20}" font-size="19" class="fig-ink" text-anchor="end">extension / m</text>`;

    for (let tick = 0; tick <= 4; tick += 1) {
      const y = BOTTOM - (tick / 4) * (BOTTOM - TOP);
      const value = (tick / 4) * Y_MAX;
      axes +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        `<text x="${LEFT - 8}" y="${(y + 4).toFixed(1)}" font-size="17" class="fig-ink" text-anchor="end">${value}</text>`;
    }
    for (let tick = 0; tick <= 4; tick += 1) {
      const xTick = LEFT + (tick / 4) * (RIGHT - LEFT);
      const value = (tick / 4) * X_MAX;
      axes +=
        `<line x1="${xTick.toFixed(1)}" y1="${BOTTOM}" x2="${xTick.toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `<text x="${xTick.toFixed(1)}" y="${BOTTOM + 18}" font-size="17" class="fig-ink" text-anchor="middle">${value.toFixed(2)}</text>`;
    }

    // The straight line runs from the origin to the top of the graph, or to the
    // right edge, whichever comes first.
    const lineEndX = Math.min(X_MAX, Y_MAX / k);
    const line = `<line x1="${px(0).toFixed(1)}" y1="${py(0).toFixed(1)}" ` +
      `x2="${px(lineEndX).toFixed(1)}" y2="${py(k * lineEndX).toFixed(1)}" class="fig-accent" stroke-width="3"></line>`;

    // The shaded triangle under the line, out to the current extension.
    const area = f > 0
      ? `<polygon points="${px(0).toFixed(1)},${py(0).toFixed(1)} ${pointX.toFixed(1)},${py(0).toFixed(1)} ${pointX.toFixed(1)},${pointY.toFixed(1)}" class="fig-good"></polygon>`
      : "";

    const marker = `<circle cx="${pointX.toFixed(1)}" cy="${pointY.toFixed(1)}" r="5" class="fig-warn"></circle>`;

    svg.innerHTML = axes + area + line + marker;

    const energy = 0.5 * f * x;
    readout.innerHTML =
      `Force <strong>${f} N</strong>, stiffness <strong>${k} N/m</strong>. ` +
      `The extension is <strong>${x.toFixed(3)} m</strong>. ` +
      `The gradient of the line is the spring constant, and the shaded area is the energy stored, ` +
      `<strong>${energy.toFixed(2)} J</strong>. ` +
      `<em>Double the force on the same spring: by what factor does the shaded area grow?</em>`;
  }

  react([stiffness, force], update);
}
