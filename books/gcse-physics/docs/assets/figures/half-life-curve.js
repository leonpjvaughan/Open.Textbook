// Tier-1 guided investigation: how a count rate falls with each half-life.
//
// The page asks the reader to predict the fraction that remains after three
// half-lives, then to test it by changing the half-life and the starting count
// rate, then to explain why the curve never reaches zero. The smooth curve is the
// expected average: a real count is random, and the page makes that point.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-half-life" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 540 250" width="100%" height="250" role="img"
           aria-label="A decay curve of count rate against time, with a marker at each half-life"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Half-life (hours) <input class="halflife" type="range" min="1" max="12" step="1" value="6"></label>
        <label>Starting count rate (per second) <input class="rate" type="range" min="200" max="1000" step="100" value="800"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const LEFT = 62;
  const RIGHT = 522;
  const TOP = 22;
  const BOTTOM = 196;

  function update() {
    const halfLife = Number(el.querySelector(".halflife").value);
    const start = Number(el.querySelector(".rate").value);
    const totalTime = 6 * halfLife;

    const x = (time) => LEFT + (time / totalTime) * (RIGHT - LEFT);
    const y = (rate) => BOTTOM - (rate / start) * (BOTTOM - TOP);

    let curve = "";
    for (let step = 0; step <= 120; step += 1) {
      const time = (step / 120) * totalTime;
      const rate = start * 2 ** (-time / halfLife);
      curve += `${step === 0 ? "M" : "L"}${x(time).toFixed(1)} ${y(rate).toFixed(1)} `;
    }

    const axes =
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<text x="${LEFT - 6}" y="${TOP + 4}" font-size="11" text-anchor="end" class="fig-ink">${start}</text>` +
      `<text x="${LEFT - 6}" y="${BOTTOM + 4}" font-size="11" text-anchor="end" class="fig-ink">0</text>` +
      `<text x="${RIGHT}" y="${BOTTOM + 18}" font-size="11" text-anchor="end" class="fig-ink">time (hours)</text>`;

    let guides = "";
    let ticks = "";
    const readings = [];
    for (let n = 0; n <= 4; n += 1) {
      const time = n * halfLife;
      const rate = start / 2 ** n;
      ticks +=
        `<line x1="${x(time).toFixed(1)}" y1="${BOTTOM}" x2="${x(time).toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `<text x="${x(time).toFixed(1)}" y="${BOTTOM + 17}" font-size="11" text-anchor="middle" class="fig-ink">${time}</text>`;
      if (n > 0) {
        guides +=
          `<line x1="${LEFT}" y1="${y(rate).toFixed(1)}" x2="${x(time).toFixed(1)}" y2="${y(rate).toFixed(1)}" class="fig-grid" stroke-dasharray="4 4"></line>` +
          `<line x1="${x(time).toFixed(1)}" y1="${y(rate).toFixed(1)}" x2="${x(time).toFixed(1)}" y2="${BOTTOM}" class="fig-grid" stroke-dasharray="4 4"></line>` +
          `<text x="${LEFT + 4}" y="${(y(rate) - 4).toFixed(1)}" font-size="11" class="fig-ink">${rate}</text>`;
        readings.push(`${n} half-life${n === 1 ? "" : "s"}: ${rate} per second`);
      }
      const cx = x(time).toFixed(1);
      const cy = y(rate).toFixed(1);
      guides += `<circle cx="${cx}" cy="${cy}" r="5" class="fig-accent"></circle>`;
    }

    svg.innerHTML =
      axes +
      ticks +
      guides +
      `<path d="${curve}" class="fig-accent" fill="none" stroke-width="3"></path>`;

    readout.innerHTML =
      `With a half-life of <strong>${halfLife} hours</strong> and a starting count rate ` +
      `of <strong>${start} per second</strong>, the count rate falls like this. ` +
      readings.join(". ") +
      `. Each value is half the one before. ` +
      `<em>A real count is random, so a real measurement only follows this curve on average. ` +
      `Why does the curve get close to zero but never reach it?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
