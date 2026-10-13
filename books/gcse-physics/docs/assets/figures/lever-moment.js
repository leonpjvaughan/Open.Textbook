// Tier-1 guided investigation: moments and a balanced lever.
//
// Guided, not a sandbox: the page asks the reader to predict the effort that
// balances a load before moving the sliders, then to explain why the effort must
// grow as it moves closer to the pivot. The reader sets the load and the two
// distances; the figure works out the effort that balances the lever.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-lever-moment" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 180" width="100%" role="img"
           aria-label="A lever turning about a pivot, with a load on the left and the balancing effort on the right"></svg>
      <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.4rem .9rem">
        <label>Load (N) <input class="load" type="range" min="100" max="600" step="50" value="300"></label>
        <label>Load distance (m) <input class="load-d" type="range" min="0.20" max="1.00" step="0.05" value="1.00"></label>
        <label>Effort distance (m) <input class="effort-d" type="range" min="0.20" max="1.50" step="0.05" value="1.00"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const PIVOT = 280;
  const BEAM = 60;
  const SCALE = 130; // pixels per metre, so 1.5 m reaches 195 px

  function forceArrow(x, label, cls) {
    return (
      `<line x1="${x.toFixed(1)}" y1="${BEAM}" x2="${x.toFixed(1)}" y2="${BEAM + 70}" class="${cls}" stroke-width="3"></line>` +
      `<polygon points="${x.toFixed(1)},${BEAM + 80} ${(x - 6).toFixed(1)},${BEAM + 68} ${(x + 6).toFixed(1)},${BEAM + 68}" class="${cls}"></polygon>` +
      `<text x="${x.toFixed(1)}" y="${BEAM + 96}" font-size="18" text-anchor="middle" class="fig-ink">${label}</text>`
    );
  }

  function update() {
    const load = Number(el.querySelector(".load").value);
    const loadDistance = Number(el.querySelector(".load-d").value);
    const effortDistance = Number(el.querySelector(".effort-d").value);
    const loadMoment = load * loadDistance;
    const effort = loadMoment / effortDistance;

    const loadX = PIVOT - loadDistance * SCALE;
    const effortX = PIVOT + effortDistance * SCALE;

    svg.innerHTML =
      `<line x1="70" y1="${BEAM}" x2="490" y2="${BEAM}" class="fig-ink" stroke-width="4"></line>` +
      `<polygon points="${PIVOT},${BEAM + 6} ${PIVOT - 14},${BEAM + 30} ${PIVOT + 14},${BEAM + 30}" class="fig-grid"></polygon>` +
      `<line x1="${loadX.toFixed(1)}" y1="${BEAM - 24}" x2="${PIVOT}" y2="${BEAM - 24}" class="fig-grid" stroke-dasharray="3 3"></line>` +
      `<line x1="${PIVOT}" y1="${BEAM - 44}" x2="${effortX.toFixed(1)}" y2="${BEAM - 44}" class="fig-grid" stroke-dasharray="3 3"></line>` +
      `<text x="${((loadX + PIVOT) / 2).toFixed(1)}" y="${BEAM - 28}" font-size="16" text-anchor="middle" class="fig-ink">${loadDistance.toFixed(2)} m</text>` +
      `<text x="${((PIVOT + effortX) / 2).toFixed(1)}" y="${BEAM - 48}" font-size="16" text-anchor="middle" class="fig-ink">${effortDistance.toFixed(2)} m</text>` +
      forceArrow(loadX, `${load} N`, "fig-warn") +
      forceArrow(effortX, `${Math.round(effort)} N`, "fig-accent");

    const multiplied = effort < load;
    readout.innerHTML =
      `Load moment = ${load} N &times; ${loadDistance.toFixed(2)} m = ` +
      `<strong>${loadMoment.toFixed(1)} N m</strong>. ` +
      `To balance it, the effort moment must equal this, so effort = ` +
      `${loadMoment.toFixed(1)} N m &divide; ${effortDistance.toFixed(2)} m = ` +
      `<strong>${Math.round(effort)} N</strong>. ` +
      (multiplied
        ? `The effort is smaller than the load, so this lever multiplies the force. `
        : `The effort is larger than the load at this setting. `) +
      `<em>Move the effort closer to the pivot. Why does the effort needed grow?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
