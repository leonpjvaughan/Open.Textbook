// Tier-1 guided investigation: the graphs of simple harmonic motion.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Two sliders set the amplitude and the period. The left panel draws the
// displacement-time curve and the right panel draws the acceleration-displacement
// graph, which is a straight line through the origin with gradient minus omega
// squared. The readout gives omega, the maximum speed and the maximum
// acceleration.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to both
// schemes. No colour literal appears here, and no runtime LaTeX: the readout is
// plain HTML.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-shm-graphs" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 600 300" width="100%" height="300" role="img"
           aria-label="Two graphs of simple harmonic motion: displacement against time, and acceleration against displacement"></svg>
      <label style="display:block;margin:.5rem 0">Amplitude (metres)
        <input class="amplitude" type="range" min="0.01" max="0.10" step="0.01" value="0.05">
        <output class="amplitude-out">0.05</output>
      </label>
      <label style="display:block;margin:.3rem 0">Period (seconds)
        <input class="period" type="range" min="0.5" max="3" step="0.1" value="1">
        <output class="period-out">1.0</output>
      </label>
      <p class="readout" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const amplitude = el.querySelector(".amplitude");
  const period = el.querySelector(".period");
  const amplitudeOut = el.querySelector(".amplitude-out");
  const periodOut = el.querySelector(".period-out");
  const readout = el.querySelector(".readout");

  const LX0 = 70;
  const LX1 = 280;
  const RX0 = 360;
  const RX1 = 560;
  const TOP = 40;
  const BOTTOM = 250;

  function update() {
    const A = Number(amplitude.value);
    const T = Number(period.value);
    amplitudeOut.textContent = A.toFixed(2);
    periodOut.textContent = T.toFixed(1);

    const omega = (2 * Math.PI) / T;
    const vMax = A * omega;
    const aMax = A * omega * omega;

    // Left panel: displacement against time over two periods.
    const leftMid = (TOP + BOTTOM) / 2;
    const xFor = (t) => LX0 + (t / (2 * T)) * (LX1 - LX0);
    const yFor = (x) => leftMid - (x / A) * ((BOTTOM - TOP) / 2);

    const leftAxes =
      `<line x1="${LX0}" y1="${leftMid.toFixed(1)}" x2="${LX1}" y2="${leftMid.toFixed(1)}" class="fig-ink"></line>` +
      `<line x1="${LX0}" y1="${TOP}" x2="${LX0}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<text x="${LX0}" y="${TOP - 12}" font-size="11" class="fig-ink">displacement x</text>` +
      `<text x="${LX1}" y="${BOTTOM + 18}" font-size="11" class="fig-ink" text-anchor="end">time t</text>` +
      `<text x="${LX0 - 6}" y="${TOP + 4}" font-size="10" class="fig-ink" text-anchor="end">+A</text>` +
      `<text x="${LX0 - 6}" y="${BOTTOM + 4}" font-size="10" class="fig-ink" text-anchor="end">-A</text>`;

    let leftCurve = "";
    for (let index = 0; index <= 120; index += 1) {
      const t = (index / 120) * 2 * T;
      const x = A * Math.cos(omega * t);
      leftCurve += `${xFor(t).toFixed(1)},${yFor(x).toFixed(1)} `;
    }
    const leftLine =
      `<polyline points="${leftCurve.trim()}" class="fig-accent" fill="none" stroke-width="3"></polyline>` +
      `<text x="${LX0 + 4}" y="${BOTTOM - 4}" font-size="10" class="fig-ink">x = A cos(omega t)</text>`;

    // Right panel: acceleration against displacement, a straight line a = -omega^2 x.
    const rightMid = (TOP + BOTTOM) / 2;
    const rxFor = (x) => RX0 + ((x + A) / (2 * A)) * (RX1 - RX0);
    const ryFor = (a) => rightMid - (a / aMax) * ((BOTTOM - TOP) / 2);

    const rightAxes =
      `<line x1="${RX0}" y1="${rightMid.toFixed(1)}" x2="${RX1}" y2="${rightMid.toFixed(1)}" class="fig-ink"></line>` +
      `<line x1="${(RX0 + RX1) / 2}" y1="${TOP}" x2="${(RX0 + RX1) / 2}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<text x="${RX0}" y="${TOP - 12}" font-size="11" class="fig-ink">acceleration a</text>` +
      `<text x="${RX1}" y="${BOTTOM + 18}" font-size="11" class="fig-ink" text-anchor="end">displacement x</text>` +
      `<text x="${RX0 - 4}" y="${TOP + 4}" font-size="10" class="fig-ink" text-anchor="end">+a max</text>` +
      `<text x="${RX0 - 4}" y="${BOTTOM + 4}" font-size="10" class="fig-ink" text-anchor="end">-a max</text>`;

    const rightLine =
      `<line x1="${rxFor(-A).toFixed(1)}" y1="${ryFor(aMax).toFixed(1)}" x2="${rxFor(A).toFixed(1)}" y2="${ryFor(-aMax).toFixed(1)}" class="fig-good" stroke-width="3"></line>` +
      `<text x="${RX0 + 6}" y="${BOTTOM - 4}" font-size="10" class="fig-ink">a = -omega squared x</text>`;

    svg.innerHTML = leftAxes + leftLine + rightAxes + rightLine;

    readout.innerHTML =
      `Amplitude ${A.toFixed(2)} m, period ${T.toFixed(1)} s. ` +
      `The angular frequency is <strong>${omega.toFixed(2)} rad/s</strong>, ` +
      `the maximum speed is <strong>${vMax.toFixed(2)} m/s</strong>, ` +
      `and the maximum acceleration is <strong>${aMax.toFixed(2)} m/s&sup2;</strong>. ` +
      `The acceleration-displacement graph is a straight line with negative gradient, ` +
      `which is the test for simple harmonic motion. ` +
      `<em>Double the period: what happens to omega, and to the gradient of the line?</em>`;
  }

  amplitude.addEventListener("input", update);
  period.addEventListener("input", update);
  update();
}
