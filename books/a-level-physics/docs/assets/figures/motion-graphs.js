// Tier-1 guided investigation: the velocity-time graph for constant acceleration.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Two sliders set the initial velocity and the acceleration. The figure
// draws the velocity-time line, shades the area under it, and reads back the
// gradient (the acceleration) and the area (the displacement). The point of the
// investigation is that the gradient is a and the area is s.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to both
// schemes. No colour literal appears here, and no runtime LaTeX: the readout is
// plain HTML.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-motion-graphs" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 600 300" width="100%" role="img"
           aria-label="A velocity-time graph with the area under the line shaded and a marker at the end of the interval"></svg>
      <label style="display:block;margin:.5rem 0">Initial velocity, u (metres per second)
        <input class="u" type="range" min="0" max="10" step="1" value="4">
        <output class="u-out">4</output>
      </label>
      <label style="display:block;margin:.3rem 0">Acceleration, a (metres per second squared)
        <input class="a" type="range" min="-2" max="3" step="0.5" value="2">
        <output class="a-out">2</output>
      </label>
      <p class="readout" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const uInput = el.querySelector(".u");
  const aInput = el.querySelector(".a");
  const uOut = el.querySelector(".u-out");
  const aOut = el.querySelector(".a-out");
  const readout = el.querySelector(".readout");

  const LEFT = 70;
  const RIGHT = 560;
  const TOP = 30;
  const BOTTOM = 250;
  const T_MAX = 8;
  const V_MIN = -20;
  const V_MAX = 36;

  function xFor(t) {
    return LEFT + (t / T_MAX) * (RIGHT - LEFT);
  }

  function yFor(v) {
    return BOTTOM - ((v - V_MIN) / (V_MAX - V_MIN)) * (BOTTOM - TOP);
  }

  function update() {
    const u = Number(uInput.value);
    const a = Number(aInput.value);
    uOut.textContent = String(u);
    aOut.textContent = a.toFixed(1);

    const vEnd = u + a * T_MAX;
    const displacement = u * T_MAX + 0.5 * a * T_MAX * T_MAX;

    let grid = "";
    for (let v = -20; v <= 30; v += 10) {
      const y = yFor(v);
      grid +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        `<text x="${LEFT - 8}" y="${(y + 4).toFixed(1)}" font-size="17" class="fig-ink" text-anchor="end">${v}</text>`;
    }
    for (let t = 0; t <= T_MAX; t += 1) {
      const x = xFor(t);
      grid +=
        `<line x1="${x.toFixed(1)}" y1="${BOTTOM}" x2="${x.toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `<text x="${x.toFixed(1)}" y="${BOTTOM + 18}" font-size="17" class="fig-ink" text-anchor="middle">${t}</text>`;
    }

    const axisY = yFor(0);
    const axes =
      `<line x1="${LEFT}" y1="${axisY.toFixed(1)}" x2="${RIGHT}" y2="${axisY.toFixed(1)}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<text x="${RIGHT}" y="${(axisY + 18).toFixed(1)}" font-size="19" class="fig-ink" text-anchor="end">time (s)</text>` +
      `<text x="${LEFT}" y="${TOP - 10}" font-size="19" class="fig-ink">velocity (m/s)</text>`;

    const x0 = xFor(0);
    const y0 = yFor(u);
    const x1 = xFor(T_MAX);
    const y1 = yFor(vEnd);
    const area =
      `<polygon points="${x0.toFixed(1)},${y0.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)} ` +
      `${x1.toFixed(1)},${axisY.toFixed(1)} ${x0.toFixed(1)},${axisY.toFixed(1)}" class="fig-good" opacity="0.35"></polygon>`;
    const line =
      `<line x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" class="fig-accent" stroke-width="3"></line>`;
    const marker =
      `<circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="5" class="fig-warn"></circle>`;

    svg.innerHTML = grid + axes + area + line + marker;

    const direction = vEnd < 0 ? "moving in the negative direction" : "moving in the positive direction";
    readout.innerHTML =
      `With u = ${u} m/s and a = ${a.toFixed(1)} m/s², the line has gradient ` +
      `<strong>${a.toFixed(1)} m/s²</strong> and the shaded area is ` +
      `<strong>${displacement.toFixed(0)} m</strong>. ` +
      `After ${T_MAX} s the velocity is ${vEnd.toFixed(1)} m/s, so the object is ${direction}. ` +
      `<em>Set a = 0. What is the gradient, and why is the area still the displacement?</em>`;
  }

  uInput.addEventListener("input", update);
  aInput.addEventListener("input", update);
  update();
}
