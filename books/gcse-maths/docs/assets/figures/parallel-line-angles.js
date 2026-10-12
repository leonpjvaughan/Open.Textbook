// Guided investigation: which angles stay equal when a transversal crosses two
// parallel lines.
//
// Guided, not a sandbox (AGENTS.md P6): the page asks the reader to predict which
// angles at the lower crossing stay equal to angle a, then to explain why. The
// reader can slide the transversal (nothing about the angles changes) and tilt it
// (every angle changes together), and the readout reports the four values rather
// than naming the rule. Colours come from CSS classes, so the figure adapts to
// every bundle and both schemes.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <svg viewBox="0 0 500 250" width="100%" role="img"
           aria-label="Two parallel lines crossed by a transversal, with the four angles at the two crossings marked"></svg>
      <label style="display:block;margin:.5rem 0 .2rem">
        Tilt the transversal:
        <input class="tilt" type="range" min="35" max="75" step="1" value="62"
               aria-label="Tilt of the transversal in degrees">
      </label>
      <label style="display:block;margin:0 0 .2rem">
        Slide the transversal:
        <input class="slide" type="range" min="110" max="280" step="2" value="180"
               aria-label="Position where the transversal crosses the top line">
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const tilt = el.querySelector(".tilt");
  const slide = el.querySelector(".slide");
  const readout = el.querySelector(".readout");

  const TOP_Y = 80;
  const BOTTOM_Y = 180;
  const GAP = BOTTOM_Y - TOP_Y;

  // An arc of radius r about (cx, cy), from `from` to `to` radians, travelling in
  // the direction of increasing angle (SVG's positive direction, which is
  // clockwise on screen because y points down).
  function arc(cx, cy, r, from, to) {
    const at = (t) =>
      `${(cx + r * Math.cos(t)).toFixed(1)},${(cy + r * Math.sin(t)).toFixed(1)}`;
    const large = to - from > Math.PI ? 1 : 0;
    return `M ${at(from)} A ${r} ${r} 0 ${large} 1 ${at(to)}`;
  }

  function draw() {
    const degrees = Number(tilt.value);
    const theta = (degrees * Math.PI) / 180;
    const tx = Number(slide.value);

    const T = { x: tx, y: TOP_Y };
    const B = { x: tx + GAP / Math.tan(theta), y: BOTTOM_Y };
    const ux = Math.cos(theta);
    const uy = Math.sin(theta);
    const start = { x: T.x - 130 * ux, y: T.y - 130 * uy };
    const end = { x: B.x + 40 * ux, y: B.y + 40 * uy };

    // The angle marked a sits below the top line, to the right of the
    // transversal. Its three partners sit at the lower crossing: b is the
    // corresponding angle, c the alternate angle and d the co-interior angle.
    const marks = [
      { centre: T, r: 30, from: 0, to: theta, tone: "fig-accent", ink: "text-accent", name: "a", value: degrees },
      { centre: B, r: 30, from: 0, to: theta, tone: "fig-accent", ink: "text-accent", name: "b", value: degrees },
      { centre: B, r: 22, from: Math.PI, to: Math.PI + theta, tone: "fig-accent", ink: "text-accent", name: "c", value: degrees },
      { centre: B, r: 16, from: Math.PI + theta, to: 2 * Math.PI, tone: "fig-warn", ink: "text-warn", name: "d", value: 180 - degrees },
    ];

    const sectors = marks
      .map(
        (m) =>
          `<path d="${arc(m.centre.x, m.centre.y, m.r, m.from, m.to)}" ` +
          `style="fill:none" class="${m.tone}" stroke-width="3"></path>`,
      )
      .join("");

    const labels = marks
      .map((m) => {
        const mid = (m.from + m.to) / 2;
        const lr = m.r + 20;
        return (
          `<text x="${(m.centre.x + lr * Math.cos(mid)).toFixed(1)}" ` +
          `y="${(m.centre.y + lr * Math.sin(mid) + 4).toFixed(1)}" font-size="12" ` +
          `text-anchor="middle" class="${m.ink}">${m.name} ${m.value}°</text>`
        );
      })
      .join("");

    svg.innerHTML =
      `<line x1="20" y1="${TOP_Y}" x2="480" y2="${TOP_Y}" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="20" y1="${BOTTOM_Y}" x2="480" y2="${BOTTOM_Y}" class="fig-ink" stroke-width="2"></line>` +
      `<path d="M 52 73 L 61 80 L 52 87" style="fill:none" class="fig-ink" stroke-width="2"></path>` +
      `<path d="M 52 173 L 61 180 L 52 187" style="fill:none" class="fig-ink" stroke-width="2"></path>` +
      `<line x1="${start.x.toFixed(1)}" y1="${start.y.toFixed(1)}" x2="${end.x.toFixed(1)}" y2="${end.y.toFixed(1)}" class="fig-ink" stroke-width="2"></line>` +
      sectors +
      labels;

    readout.textContent =
      `The angle marked a is ${degrees}°. The corresponding angle b is ${degrees}° ` +
      `and the alternate angle c is ${degrees}°. The co-interior angle d is ` +
      `${180 - degrees}°, and ${degrees} + ${180 - degrees} = 180°.`;
  }

  tilt.addEventListener("input", draw);
  slide.addEventListener("input", draw);
  draw();
}
