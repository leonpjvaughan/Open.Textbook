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
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import {
  label,
  panel,
  quantity,
  react,
  slider,
  SIZE,
} from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Two graphs of simple harmonic motion: displacement against time, and acceleration against displacement",
    width: 600,
    height: 300,
    max: 600,
  });

  const amplitude = slider(el, { show: true,
    id: "amplitude",
    label: "Amplitude (metres)",
    min: 0.01,
    max: 0.1,
    step: 0.01,
    value: 0.05,
    format: (value) => value.toFixed(2),
  });
  const period = slider(el, { show: true,
    id: "period",
    label: "Period (seconds)",
    min: 0.5,
    max: 3,
    step: 0.1,
    value: 1,
    format: (value) => value.toFixed(1),
  });

  const LX0 = 70;
  const LX1 = 280;
  const RX0 = 360;
  const RX1 = 560;
  const TOP = 40;
  const BOTTOM = 250;

  function update() {
    const A = Number(amplitude.value);
    const T = Number(period.value);

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
      `${label({ x: LX0, y: TOP - 12, text: `displacement x`, anchor: "start", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: LX1, y: BOTTOM + 18, text: `time t`, anchor: "end", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: LX0 - 6, y: TOP + 4, text: `+A`, anchor: "end", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: LX0 - 6, y: BOTTOM + 4, text: `-A`, anchor: "end", size: SIZE.value, class: "text-ink" })}`;

    let leftCurve = "";
    for (let index = 0; index <= 120; index += 1) {
      const t = (index / 120) * 2 * T;
      const x = A * Math.cos(omega * t);
      leftCurve += `${xFor(t).toFixed(1)},${yFor(x).toFixed(1)} `;
    }
    const leftLine =
      `<polyline points="${leftCurve.trim()}" class="fig-accent" style="fill:none" stroke-width="3"></polyline>` +
      `${label({ x: LX0 + 4, y: BOTTOM - 4, text: `x = A cos(omega t)`, anchor: "start", size: SIZE.value, class: "text-ink" })}`;

    // Right panel: acceleration against displacement, a straight line a = -omega^2 x.
    const rightMid = (TOP + BOTTOM) / 2;
    const rxFor = (x) => RX0 + ((x + A) / (2 * A)) * (RX1 - RX0);
    const ryFor = (a) => rightMid - (a / aMax) * ((BOTTOM - TOP) / 2);

    const rightAxes =
      `<line x1="${RX0}" y1="${rightMid.toFixed(1)}" x2="${RX1}" y2="${rightMid.toFixed(1)}" class="fig-ink"></line>` +
      `<line x1="${(RX0 + RX1) / 2}" y1="${TOP}" x2="${(RX0 + RX1) / 2}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `${label({ x: RX0, y: TOP - 12, text: `acceleration a`, anchor: "start", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: RX1, y: BOTTOM + 18, text: `displacement x`, anchor: "end", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: RX0 - 4, y: TOP + 4, text: `+a max`, anchor: "end", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: RX0 - 4, y: BOTTOM + 4, text: `-a max`, anchor: "end", size: SIZE.value, class: "text-ink" })}`;

    const rightLine =
      `<line x1="${rxFor(-A).toFixed(1)}" y1="${ryFor(aMax).toFixed(1)}" x2="${rxFor(A).toFixed(1)}" y2="${ryFor(-aMax).toFixed(1)}" class="fig-good" stroke-width="3"></line>` +
      `${label({ x: RX0 + 6, y: BOTTOM - 4, text: `a = -omega squared x`, anchor: "start", size: SIZE.value, class: "text-ink" })}`;

    svg.innerHTML = leftAxes + leftLine + rightAxes + rightLine;

    readout.innerHTML =
      `Amplitude ${quantity(A, "m", 2)}, period ${quantity(T, "s", 1)}. ` +
      `The angular frequency is <strong>${omega.toFixed(2)} rad/s</strong>, ` +
      `the maximum speed is <strong>${quantity(vMax, "m", 2)}/s</strong>, ` +
      `and the maximum acceleration is <strong>${quantity(aMax, "m", 2)}/s&sup2;</strong>. ` +
      `The acceleration-displacement graph is a straight line with negative gradient, ` +
      `which is the test for simple harmonic motion. ` +
      `<em>Double the period: what happens to omega, and to the gradient of the line?</em>`;
  }

  react([amplitude, period], update);
}
