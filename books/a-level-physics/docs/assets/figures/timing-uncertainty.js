// Tier-1 guided investigation: the uncertainty in a timed period.
//
// Guided, not a sandbox: the page asks the reader to predict before moving the
// slider. One parameter — how many oscillations are timed in one measurement —
// changes the percentage uncertainty in the period, and through the period the
// percentage uncertainty in the value of g found from it. The period itself does
// not change, which is the point of the investigation.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to both
// schemes. No colour literal appears here, and no runtime LaTeX: the readout is
// plain HTML.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-timing-uncertainty" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 600 240" width="100%" height="240" role="img"
           aria-label="A graph of the percentage uncertainty in the period against the number of oscillations timed in one measurement"></svg>
      <label style="display:block;margin:.5rem 0">Oscillations timed in one measurement
        <input class="count" type="range" min="1" max="50" step="1" value="20">
        <output class="count-out">20</output>
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const count = el.querySelector(".count");
  const countOut = el.querySelector(".count-out");
  const readout = el.querySelector(".readout");

  // The chapter problem values: a 0.800 m pendulum has a period of 1.795 s, and
  // a single hand timing carries an uncertainty of about 0.2 s.
  const PERIOD = 1.795;
  const TIMING_UNCERTAINTY = 0.2;
  const N_MAX = 50;
  const LEFT = 64;
  const RIGHT = 560;
  const TOP = 24;
  const BOTTOM = 190;

  function periodPercentage(n) {
    return (TIMING_UNCERTAINTY / (n * PERIOD)) * 100;
  }

  function update() {
    const n = Number(count.value);
    countOut.textContent = String(n);
    const percentT = periodPercentage(n);
    const percentG = 2 * percentT;
    const yMax = periodPercentage(1) * 1.1;

    // Axes and gridlines, drawn first so the curve sits on top.
    let axes = `
      <line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-ink"></line>
      <line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>
      <text x="${LEFT}" y="${TOP - 8}" font-size="11" class="fig-ink">uncertainty in the period (%)</text>
      <text x="${RIGHT}" y="${BOTTOM + 18}" font-size="11" class="fig-ink" text-anchor="end">oscillations timed</text>`;

    for (let tick = 0; tick <= 4; tick += 1) {
      const y = BOTTOM - (tick / 4) * (BOTTOM - TOP);
      const value = (tick / 4) * yMax;
      axes +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        `<text x="${LEFT - 8}" y="${(y + 4).toFixed(1)}" font-size="10" class="fig-ink" text-anchor="end">${value.toFixed(1)}</text>`;
    }
    for (let tick = 0; tick <= 5; tick += 1) {
      const x = LEFT + (tick / 5) * (RIGHT - LEFT);
      const value = Math.round((tick / 5) * N_MAX);
      axes +=
        `<line x1="${x.toFixed(1)}" y1="${BOTTOM}" x2="${x.toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `<text x="${x.toFixed(1)}" y="${BOTTOM + 18}" font-size="10" class="fig-ink" text-anchor="middle">${value}</text>`;
    }

    const point = (value) => {
      const x = LEFT + ((value - 1) / (N_MAX - 1)) * (RIGHT - LEFT);
      const y = BOTTOM - (periodPercentage(value) / yMax) * (BOTTOM - TOP);
      return [x, y];
    };

    let curve = "";
    for (let value = 1; value <= N_MAX; value += 1) {
      const [x, y] = point(value);
      curve += `${x.toFixed(1)},${y.toFixed(1)} `;
    }

    const [markerX, markerY] = point(n);
    svg.innerHTML =
      axes +
      `<polyline points="${curve.trim()}" class="fig-line"></polyline>` +
      `<circle cx="${markerX.toFixed(1)}" cy="${markerY.toFixed(1)}" r="5" class="fig-accent"></circle>` +
      `<line x1="${markerX.toFixed(1)}" y1="${markerY.toFixed(1)}" x2="${markerX.toFixed(1)}" y2="${BOTTOM}" class="fig-grid" stroke-dasharray="3 3"></line>`;

    readout.innerHTML =
      `Timing ${n} oscillation${n === 1 ? "" : "s"} takes <strong>${(n * PERIOD).toFixed(2)} s</strong>, ` +
      `and dividing by ${n} gives the same period, <strong>${PERIOD.toFixed(3)} s</strong>. ` +
      `The percentage uncertainty in the period is <strong>${percentT.toFixed(2)}%</strong>, ` +
      `and the value of g found from it carries <strong>${percentG.toFixed(2)}%</strong>, because the period is squared. ` +
      `<em>How many oscillations do you need before the uncertainty in g falls below 0.5%?</em>`;
  }

  count.addEventListener("input", update);
  update();
}
