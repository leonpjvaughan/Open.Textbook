// Guided investigation: how y = f(x + a) moves a graph.
//
// Guided, not a sandbox (AGENTS.md P6): the page asks the reader to predict which
// way the graph moves when `a` is positive, then to explain why the sign inside
// the bracket appears opposite to the movement. One control changes one thing,
// the value of `a`, and the readout reports where the turning point lands rather
// than stating the rule. Colours come from CSS classes, so the figure adapts to
// every bundle and both schemes.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:560px">
      <svg viewBox="0 0 600 300" width="100%" role="img"
           aria-label="A parabola and a copy of it that shifts left or right along the x axis as the value of a changes"></svg>
      <label style="display:block;margin:.5rem 0 .3rem">
        Value of a in y = f(x + a):
        <input class="shift" type="range" min="-3" max="3" step="1" value="2"
               aria-label="Value of a in y equals f of x plus a">
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const slider = el.querySelector(".shift");
  const readout = el.querySelector(".readout");

  const ORIGIN_X = 320;
  const ORIGIN_Y = 250;
  const X_SCALE = 55;
  const Y_SCALE = 21;

  const px = (x) => ORIGIN_X + x * X_SCALE;
  const py = (y) => ORIGIN_Y - y * Y_SCALE;

  // An unfilled polyline through the graph of f. `fill:none` is an inline style
  // because a class rule would override the presentation attribute.
  function curve(f, className, from, to) {
    let d = "";
    for (let i = 0; i <= 96; i += 1) {
      const x = from + ((to - from) * i) / 96;
      d += `${i === 0 ? "M" : "L"} ${px(x).toFixed(1)} ${py(f(x)).toFixed(1)} `;
    }
    return `<path d="${d}" style="fill:none" class="${className}" stroke-width="2.5"></path>`;
  }

  function draw() {
    const a = Number(slider.value);
    const moved = Math.abs(a);
    const direction = a > 0 ? "left" : "right";
    const inside = a > 0 ? `x + ${a}` : `x - ${-a}`;

    const shiftLine =
      a === 0
        ? ""
        : `<line x1="${px(0)}" y1="${ORIGIN_Y}" x2="${px(-a)}" y2="${ORIGIN_Y}" ` +
          `style="fill:none" class="fig-warn" stroke-width="2" stroke-dasharray="5 4"></line>` +
          `<text x="${(px(0) + px(-a)) / 2}" y="${ORIGIN_Y - 12}" font-size="17" ` +
          `text-anchor="middle" class="text-warn">${moved} ${direction}</text>`;

    const shiftVertex =
      a === 0
        ? `<text x="${px(0) + 10}" y="${py(0) - 10}" font-size="17" class="text-ink">turning point</text>`
        : `<circle cx="${px(-a)}" cy="${py(0)}" r="6" class="fig-good"></circle>` +
          `<text x="${px(-a) + 10}" y="${py(0) - 10}" font-size="17" class="text-good">(${-a}, 0)</text>`;

    svg.innerHTML =
      `<line x1="40" y1="${ORIGIN_Y}" x2="580" y2="${ORIGIN_Y}" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${ORIGIN_X}" y1="40" x2="${ORIGIN_X}" y2="272" class="fig-ink" stroke-width="2"></line>` +
      `<text x="586" y="${ORIGIN_Y - 8}" font-size="17" text-anchor="end" class="text-ink">x</text>` +
      `<text x="${ORIGIN_X + 10}" y="52" font-size="17" class="text-ink">y</text>` +
      curve((x) => x * x, "fig-grid", -3.4, 3.4) +
      curve((x) => (x + a) * (x + a), "fig-accent", -3.4, 3.4) +
      shiftLine +
      `<circle cx="${px(0)}" cy="${py(0)}" r="4" class="fig-ink"></circle>` +
      shiftVertex +
      `<text x="${px(2.4)}" y="${py(6.4)}" font-size="17" class="text-ink">y = f(x)</text>` +
      `<text x="${px(1.4 - a)}" y="${py(2.2)}" font-size="17" class="text-accent">y = f(x + a)</text>`;

    readout.textContent =
      a === 0
        ? "a = 0, so the graph has not moved. Move the slider to compare the two curves."
        : `a = ${a}, so the rule is y = f(${inside}). The turning point moved from ` +
          `(0, 0) to (${-a}, 0): the graph moved ${moved} unit${moved === 1 ? "" : "s"} ` +
          `${direction}. Track the point at x = 0 on y = f(x) to check.`;
  }

  slider.addEventListener("input", draw);
  draw();
}
