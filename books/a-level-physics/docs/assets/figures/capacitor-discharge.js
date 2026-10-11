// Tier-1 guided investigation: the discharge of a capacitor.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. The resistance and the capacitance set the time constant, and the
// figure draws the potential difference as an exponential fall from a fixed
// starting value. The working point in time sits at one time constant, where the
// potential difference has fallen to about 37 percent of its starting value.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the
// readout is plain HTML.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-capacitor-discharge" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 600 280" width="100%" height="280" role="img"
           aria-label="A potential difference against time graph for a discharging capacitor, with the working point marked at one time constant"></svg>
      <label style="display:block;margin:.5rem 0">Resistance
        <input class="resistance" type="range" min="100" max="1000" step="50" value="200">
        <output class="resistance-out">200</output> ohm
      </label>
      <label style="display:block;margin:.3rem 0">Capacitance
        <input class="capacitance" type="range" min="100" max="500" step="50" value="100">
        <output class="capacitance-out">100</output> microfarad
      </label>
      <p class="readout" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const resistance = el.querySelector(".resistance");
  const resistanceOut = el.querySelector(".resistance-out");
  const capacitance = el.querySelector(".capacitance");
  const capacitanceOut = el.querySelector(".capacitance-out");
  const readout = el.querySelector(".readout");

  const LEFT = 70;
  const RIGHT = 560;
  const TOP = 30;
  const BOTTOM = 230;
  const V0 = 10; // volts, fixed

  const px = (t, tMax) => LEFT + (t / tMax) * (RIGHT - LEFT);
  const py = (v) => BOTTOM - (v / V0) * (BOTTOM - TOP);

  function update() {
    const r = Number(resistance.value);
    const c = Number(capacitance.value) * 1e-6;
    const tau = r * c; // seconds
    const tMax = 5 * tau;
    resistanceOut.textContent = String(r);
    capacitanceOut.textContent = String(c * 1e6);

    let axes =
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${LEFT}" y2="${TOP}" class="fig-ink"></line>` +
      `<text x="${LEFT}" y="${TOP - 8}" font-size="11" class="fig-ink">pd / V</text>` +
      `<text x="${RIGHT}" y="${BOTTOM + 18}" font-size="11" class="fig-ink" text-anchor="end">time</text>`;

    for (let tick = 0; tick <= 5; tick += 1) {
      const x = px(tick * tau, tMax);
      axes +=
        `<line x1="${x.toFixed(1)}" y1="${BOTTOM}" x2="${x.toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `<text x="${x.toFixed(1)}" y="${BOTTOM + 16}" font-size="10" class="fig-ink" text-anchor="middle">${tick}</text>`;
    }
    for (let tick = 0; tick <= 4; tick += 1) {
      const value = (tick / 4) * V0;
      const y = py(value);
      axes +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        `<text x="${LEFT - 8}" y="${(y + 4).toFixed(1)}" font-size="10" class="fig-ink" text-anchor="end">${value}</text>`;
    }

    let points = "";
    for (let step = 0; step <= 50; step += 1) {
      const t = (step / 50) * tMax;
      const v = V0 * Math.exp(-t / tau);
      points += `${px(t, tMax).toFixed(1)},${py(v).toFixed(1)} `;
    }
    const curve = `<polyline points="${points.trim()}" fill="none" class="fig-accent" stroke-width="3"></polyline>`;

    // The working point at one time constant.
    const vTau = V0 * Math.exp(-1);
    const marker = `<circle cx="${px(tau, tMax).toFixed(1)}" cy="${py(vTau).toFixed(1)}" r="6" class="fig-warn"></circle>`;
    const guide =
      `<line x1="${px(tau, tMax).toFixed(1)}" y1="${py(0).toFixed(1)}" x2="${px(tau, tMax).toFixed(1)}" y2="${py(vTau).toFixed(1)}" class="fig-grid" stroke-dasharray="4 3"></line>` +
      `<line x1="${LEFT}" y1="${py(vTau).toFixed(1)}" x2="${px(tau, tMax).toFixed(1)}" y2="${py(vTau).toFixed(1)}" class="fig-grid" stroke-dasharray="4 3"></line>`;

    svg.innerHTML = axes + guide + curve + marker;

    const tauMs = (tau * 1000).toFixed(0);
    const halfLifeMs = (tau * Math.log(2) * 1000).toFixed(0);
    readout.innerHTML =
      `The time constant is <strong>${tauMs} ms</strong>. ` +
      `At one time constant the potential difference has fallen to ` +
      `<strong>${vTau.toFixed(1)} V</strong>, which is about 37 percent of the ${V0} V start. ` +
      `The half-life is about <strong>${halfLifeMs} ms</strong>. ` +
      `<em>Double the resistance: what happens to the time constant?</em>`;
  }

  resistance.addEventListener("input", update);
  capacitance.addEventListener("input", update);
  update();
}
