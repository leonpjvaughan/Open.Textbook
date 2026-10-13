// Guided sine graph: change its amplitude and observe what stays fixed.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout, the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Sine curve from zero to three hundred and sixty degrees with an adjustable amplitude",
    width: 560,
    height: 230,
    max: 560,
  });

  const amp = slider(el, {
    id: "amp",
    label: "Amplitude",
    min: 1,
    max: 3,
    step: 1,
    value: 1,
  });

  function update() {
    const a = Number(amp.value);
    // 30 px per unit keeps the curve, the markers and their labels inside the
    // 230-unit viewBox at the top of the amplitude range. At the old 65 px per
    // unit the peak left the frame as soon as a was 2.
    const scale = 30;
    const centre = 110;
    const points = [];
    for (let deg = 0; deg <= 360; deg += 4) {
      const px = 40 + deg * 1.3;
      const py = centre - a * scale * Math.sin(deg * Math.PI / 180);
      points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    const peak = centre - a * scale;
    const trough = centre + a * scale;
    svg.innerHTML = `<line x1="40" y1="${centre}" x2="510" y2="${centre}" class="fig-ink" />
      <line x1="40" y1="${centre - 3 * scale}" x2="40" y2="${centre + 3 * scale}" class="fig-grid" />
      <polyline points="${points.join(' ')}" fill="none" stroke="currentColor" stroke-width="3" class="fig-accent" />
      <circle cx="157" cy="${peak}" r="5" class="fig-good" />
      <circle cx="391" cy="${trough}" r="5" class="fig-warn" />
      <text x="35" y="215" class="fig-ink">0°</text><text x="490" y="215" class="fig-ink">360°</text>
      <text x="164" y="${peak - 9}" font-size="16" class="text-good">maximum</text>
      <text x="395" y="${trough + 14}" font-size="16" class="text-warn">minimum</text>`;
    readout.textContent = `Amplitude ${a}; maximum ${a}; minimum ${-a}; period 360 degrees.`;
  }

  react(amp, update);
}
