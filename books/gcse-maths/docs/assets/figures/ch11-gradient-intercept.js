// Guided investigation: what m and c do to the line y = mx + c.
//
// Guided, not a sandbox: the page asks the reader to predict the shape of the
// line for a negative m and the effect of c before touching a slider, then to
// explain why c moves the line without changing its steepness. The figure draws
// the rise and the run as a triangle, so the gradient is a picture rather than a
// formula. Colours come from CSS classes, so the figure adapts to every bundle
// and both schemes.
export function mount(el) {
  const ORIGIN_X = 210;
  const ORIGIN_Y = 200;
  const UNIT = 26;
  const X_MIN = -6;
  const X_MAX = 6;
  const Y_MIN = -6;
  const Y_MAX = 6;

  el.innerHTML = `
    <div style="max-width:520px">
      <svg viewBox="0 0 420 420" width="100%" height="420" role="img"
           aria-label="A straight line on a coordinate grid with a rise and run triangle showing the gradient and a marked point where the line crosses the y-axis"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Gradient m
          <input class="gradient" type="range" min="-3" max="3" step="1" value="2">
        </label>
        <label>Intercept c
          <input class="intercept" type="range" min="-2" max="2" step="1" value="1">
        </label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const gradient = el.querySelector(".gradient");
  const intercept = el.querySelector(".intercept");
  const readout = el.querySelector(".readout");

  const format = (value) =>
    Number.isInteger(value) ? String(value) : String(Math.round(value * 100) / 100);

  const px = (x) => ORIGIN_X + x * UNIT;
  const py = (y) => ORIGIN_Y - y * UNIT;

  // The line is clipped to the grid by hand, so the drawing keeps a rise and a
  // run inside the axes and no line runs off into the labels.
  function visibleLine(m, c) {
    const candidates = [X_MIN, X_MAX];
    if (m !== 0) {
      candidates.push((Y_MIN - c) / m, (Y_MAX - c) / m);
    }
    const inside = candidates
      .filter((x) => x >= X_MIN - 1e-9 && x <= X_MAX + 1e-9)
      .map((x) => Math.min(X_MAX, Math.max(X_MIN, x)))
      .filter((x) => {
        const y = m * x + c;
        return y >= Y_MIN - 1e-9 && y <= Y_MAX + 1e-9;
      });
    if (inside.length < 2) return null;
    const start = Math.min(...inside);
    const end = Math.max(...inside);
    return { x1: start, y1: m * start + c, x2: end, y2: m * end + c };
  }

  function update() {
    const m = Number(gradient.value);
    const c = Number(intercept.value);

    let grid = "";
    for (let value = X_MIN; value <= X_MAX; value += 1) {
      const axisLine = value === 0 ? "fig-ink" : "fig-grid";
      grid +=
        `<line x1="${px(value).toFixed(1)}" y1="${py(Y_MAX).toFixed(1)}" ` +
        `x2="${px(value).toFixed(1)}" y2="${py(Y_MIN).toFixed(1)}" class="${axisLine}"></line>`;
    }
    for (let value = Y_MIN; value <= Y_MAX; value += 1) {
      const axisLine = value === 0 ? "fig-ink" : "fig-grid";
      grid +=
        `<line x1="${px(X_MIN).toFixed(1)}" y1="${py(value).toFixed(1)}" ` +
        `x2="${px(X_MAX).toFixed(1)}" y2="${py(value).toFixed(1)}" class="${axisLine}"></line>`;
    }

    let labels = "";
    for (let value = X_MIN + 1; value <= X_MAX - 1; value += 2) {
      if (value === 0) continue;
      labels +=
        `<text x="${px(value).toFixed(1)}" y="${(py(0) + 15).toFixed(1)}" font-size="11" ` +
        `text-anchor="middle" class="text-ink">${value}</text>`;
    }
    for (let value = Y_MIN + 1; value <= Y_MAX - 1; value += 2) {
      if (value === 0) continue;
      labels +=
        `<text x="${(px(0) - 8).toFixed(1)}" y="${(py(value) + 4).toFixed(1)}" font-size="11" ` +
        `text-anchor="end" class="text-ink">${value}</text>`;
    }

    const segment = visibleLine(m, c);
    const line = segment
      ? `<line x1="${px(segment.x1).toFixed(1)}" y1="${py(segment.y1).toFixed(1)}" ` +
        `x2="${px(segment.x2).toFixed(1)}" y2="${py(segment.y2).toFixed(1)}" ` +
        `class="fig-accent" stroke-width="3"></line>`
      : "";

    // The rise is m and the run is 1, so the triangle draws the gradient itself.
    const triangle =
      `<polygon points="${px(0).toFixed(1)},${py(c).toFixed(1)} ` +
      `${px(1).toFixed(1)},${py(c).toFixed(1)} ` +
      `${px(1).toFixed(1)},${py(c + m).toFixed(1)}" ` +
      `class="fig-good" fill-opacity="0.2" stroke-dasharray="4 3"></polygon>`;

    const runLabel =
      `<text x="${px(0.5).toFixed(1)}" y="${(py(c) + (m >= 0 ? 16 : -8)).toFixed(1)}" ` +
      `font-size="12" text-anchor="middle" class="text-ink">run 1</text>`;
    const riseLabel =
      `<text x="${(px(1) + 8).toFixed(1)}" y="${(py(c + m / 2) + 4).toFixed(1)}" ` +
      `font-size="12" text-anchor="start" class="text-ink">rise ${format(m)}</text>`;

    const interceptLabel =
      `<text x="${(px(0) - 10).toFixed(1)}" y="${(py(c) - 10).toFixed(1)}" font-size="12" ` +
      `text-anchor="end" class="text-warn">c = ${format(c)}</text>`;

    svg.innerHTML =
      grid +
      labels +
      triangle +
      `<line x1="${px(X_MIN).toFixed(1)}" y1="${py(0).toFixed(1)}" ` +
      `x2="${px(X_MAX).toFixed(1)}" y2="${py(0).toFixed(1)}" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${px(0).toFixed(1)}" y1="${py(Y_MIN).toFixed(1)}" ` +
      `x2="${px(0).toFixed(1)}" y2="${py(Y_MAX).toFixed(1)}" class="fig-ink" stroke-width="2"></line>` +
      line +
      runLabel +
      riseLabel +
      `<circle cx="${px(0).toFixed(1)}" cy="${py(c).toFixed(1)}" r="6" class="fig-warn"></circle>` +
      interceptLabel +
      `<text x="${(px(X_MAX) - 4).toFixed(1)}" y="${(py(0) + 16).toFixed(1)}" font-size="12" ` +
      `text-anchor="end" class="text-accent">x</text>` +
      `<text x="${(px(0) + 10).toFixed(1)}" y="${(py(Y_MAX) + 6).toFixed(1)}" font-size="12" ` +
      `class="text-accent">y</text>`;

    let equation = "";
    if (m === 0) {
      equation = `y = ${format(c)}`;
    } else {
      const coefficient = m === 1 ? "" : m === -1 ? "-" : format(m);
      equation =
        `y = ${coefficient}x ` + (c < 0 ? `- ${Math.abs(c)}` : `+ ${c}`);
    }

    let meaning = "";
    if (m > 0) {
      meaning = `Each step of 1 to the right lifts the line by ${format(m)}.`;
    } else if (m < 0) {
      meaning = `Each step of 1 to the right drops the line by ${Math.abs(m)}.`;
    } else {
      meaning = "The gradient is 0, so the line is horizontal.";
    }

    const riseRoute =
      m === 0
        ? ""
        : ` The rise ${format(m)} divided by the run 1 gives m = ${format(m)}.`;

    readout.innerHTML =
      `m = <strong>${format(m)}</strong> and c = <strong>${format(c)}</strong>, ` +
      `so the rule is <strong>${equation}</strong>. ` +
      `The line crosses the y-axis at <strong>(0, ${format(c)})</strong>. ` +
      meaning +
      riseRoute;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
