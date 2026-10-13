// Tier-1 guided investigation: an echo and the distance to a boundary.
//
// Guided, not a sandbox: the page asks the reader to predict what doubling the
// depth does to the echo time, then to explain it from distance = speed x time
// with the trip there and back. The reader sets the depth and the speed of the
// wave; the figure draws the down-and-back path and reports the echo time.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-echo-timing" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 240" width="100%" role="img"
           aria-label="A boat sends a sound pulse down to a boundary and the reflection returns. The depth and the speed of the wave can be changed"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Depth (m) <input class="depth" type="range" min="10" max="60" step="5" value="30"></label>
        <label>Speed of the wave (m/s) <input class="speed" type="range" min="1000" max="3000" step="100" value="1500"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const BOAT_Y = 45;
  const SEABED_Y = 200;
  const CENTRE_X = 280;

  function update() {
    const depth = Number(el.querySelector(".depth").value);
    const speed = Number(el.querySelector(".speed").value);
    const time = (2 * depth) / speed;

    const boat =
      `<polygon points="${CENTRE_X - 40},${BOAT_Y} ${CENTRE_X + 40},${BOAT_Y} ` +
      `${CENTRE_X + 26},${BOAT_Y + 18} ${CENTRE_X - 26},${BOAT_Y + 18}" class="fig-ink"></polygon>` +
      `<text x="${CENTRE_X}" y="${BOAT_Y - 10}" font-size="16" text-anchor="middle" class="fig-ink">survey boat</text>`;

    const seabed =
      `<line x1="60" y1="${SEABED_Y}" x2="500" y2="${SEABED_Y}" class="fig-ink" stroke-width="3"></line>` +
      `<text x="505" y="${SEABED_Y + 4}" font-size="16" text-anchor="end" class="fig-ink">boundary</text>`;

    const down =
      `<line x1="${CENTRE_X - 12}" y1="${BOAT_Y + 20}" x2="${CENTRE_X - 12}" y2="${SEABED_Y - 8}" ` +
      `class="fig-accent" stroke-width="2" stroke-dasharray="6 4"></line>` +
      `<polygon points="${CENTRE_X - 12},${SEABED_Y - 4} ${CENTRE_X - 18},${SEABED_Y - 16} ` +
      `${CENTRE_X - 6},${SEABED_Y - 16}" class="fig-accent"></polygon>`;

    const up =
      `<line x1="${CENTRE_X + 12}" y1="${SEABED_Y - 8}" x2="${CENTRE_X + 12}" y2="${BOAT_Y + 20}" ` +
      `class="fig-warn" stroke-width="2" stroke-dasharray="6 4"></line>` +
      `<polygon points="${CENTRE_X + 12},${BOAT_Y + 16} ${CENTRE_X + 6},${BOAT_Y + 28} ` +
      `${CENTRE_X + 18},${BOAT_Y + 28}" class="fig-warn"></polygon>`;

    const labels =
      `<text x="${CENTRE_X - 22}" y="${(BOAT_Y + SEABED_Y) / 2}" font-size="16" text-anchor="end" class="fig-ink">going down</text>` +
      `<text x="${CENTRE_X + 22}" y="${(BOAT_Y + SEABED_Y) / 2}" font-size="16" class="fig-ink">reflection</text>` +
      `<line x1="150" y1="${BOAT_Y + 18}" x2="150" y2="${SEABED_Y}" class="fig-grid" stroke-dasharray="3 3"></line>` +
      `<text x="158" y="${(BOAT_Y + SEABED_Y) / 2}" font-size="16" class="fig-ink">depth = ${depth} m</text>`;

    svg.innerHTML = boat + seabed + down + up + labels;

    readout.innerHTML =
      `Depth <strong>${depth} m</strong>, wave speed <strong>${speed} m/s</strong>. ` +
      `The pulse travels down and back, a total of <strong>${2 * depth} m</strong>, ` +
      `so the echo time is <strong>${time.toFixed(3)} s</strong>. ` +
      `<em>Now double the depth. What happens to the echo time?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
