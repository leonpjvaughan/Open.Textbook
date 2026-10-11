// Tier-1 guided investigation: velocity, acceleration and a velocity-time graph.
//
// Guided, not a sandbox: the page asks the reader to predict what doubling the
// acceleration and doubling the time each do, then to explain why doubling the
// time makes the area four times as large. The reader sets a steady acceleration
// and a time; the graph draws the straight line, the gradient triangle and the
// area under the line.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-motion-graph" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 200" width="100%" height="200" role="img"
           aria-label="A velocity-time graph of a straight line from the origin, with the gradient and the area under the line marked"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Acceleration (m/s&sup2;) <input class="accel" type="range" min="0.5" max="4" step="0.5" value="2"></label>
        <label>Time (s) <input class="time" type="range" min="1" max="10" step="1" value="4"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const LEFT = 52;
  const BOTTOM = 158;
  const WIDTH = 470;
  const HEIGHT = 118;
  const TIME_MAX = 10;
  const VELOCITY_MAX = 40;
  const xScale = WIDTH / TIME_MAX;
  const yScale = HEIGHT / VELOCITY_MAX;

  function update() {
    const accel = Number(el.querySelector(".accel").value);
    const time = Number(el.querySelector(".time").value);
    const velocity = accel * time;
    const distance = 0.5 * accel * time * time;

    const xEnd = LEFT + time * xScale;
    const yEnd = BOTTOM - velocity * yScale;

    const axes =
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${LEFT + WIDTH}" y2="${BOTTOM}" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${LEFT}" y2="${BOTTOM - HEIGHT}" class="fig-ink" stroke-width="2"></line>` +
      `<text x="${LEFT + WIDTH / 2}" y="${BOTTOM + 22}" font-size="11" text-anchor="middle" class="fig-ink">time (s)</text>` +
      `<text x="14" y="${BOTTOM - HEIGHT / 2}" font-size="11" text-anchor="middle" class="fig-ink" transform="rotate(-90 14 ${BOTTOM - HEIGHT / 2})">velocity (m/s)</text>`;

    const line =
      `<polygon points="${LEFT},${BOTTOM} ${xEnd.toFixed(1)},${BOTTOM} ${xEnd.toFixed(1)},${yEnd.toFixed(1)}" class="fig-good"></polygon>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${xEnd.toFixed(1)}" y2="${yEnd.toFixed(1)}" class="fig-accent" stroke-width="3"></line>` +
      `<line x1="${xEnd.toFixed(1)}" y1="${BOTTOM}" x2="${xEnd.toFixed(1)}" y2="${yEnd.toFixed(1)}" class="fig-grid" stroke-dasharray="4 3"></line>` +
      `<line x1="${LEFT}" y1="${yEnd.toFixed(1)}" x2="${xEnd.toFixed(1)}" y2="${yEnd.toFixed(1)}" class="fig-grid" stroke-dasharray="4 3"></line>` +
      `<text x="${(LEFT + xEnd) / 2}" y="${BOTTOM - 8}" font-size="11" text-anchor="middle" class="fig-ink">area = ${distance.toFixed(1)} m</text>` +
      `<text x="${xEnd.toFixed(1)}" y="${(BOTTOM + yEnd) / 2}" font-size="11" text-anchor="end" class="fig-ink">v = ${velocity.toFixed(1)} m/s</text>`;

    svg.innerHTML = axes + line;

    readout.innerHTML =
      `Acceleration ${accel.toFixed(1)} m/s&sup2; for ${time} s. The line ends at ` +
      `<strong>${velocity.toFixed(1)} m/s</strong>, so the gradient is ` +
      `<strong>${accel.toFixed(1)} m/s&sup2;</strong>. The area under the line is ` +
      `<strong>${distance.toFixed(1)} m</strong>, which is the distance travelled. ` +
      `<em>Double the time: which number doubles, and which becomes four times as large?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
