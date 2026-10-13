// Guided figure: compare simple and compound interest over a fixed number of years.
// The reader predicts before moving the time control, then explains the difference.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Simple and compound balances over time",
    width: 420,
    height: 150,
    max: 560,
  });

  const years = slider(el, {
    id: "years",
    label: "Years:",
    min: 1,
    max: 10,
    value: 5,
    show: false,
  });

  react(years, () => {
    const n = Number(years.value);
    const start = 1000;
    const rate = .05;
    // The vertical scale is set by the largest balance on the drawing, so the
    // compound curve — the point of the figure — stays inside the frame.
    const biggest = start * (1 + rate) ** n - start;
    const scale = 100 / biggest;
    const points = (compound) => Array.from({ length: n + 1 }, (_, i) => {
      const balance = compound ? start * (1 + rate) ** i : start * (1 + rate * i);
      return [30 + i * (360 / n), 120 - (balance - start) * scale];
    });
    const line = (pts, cls) => `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="currentColor" stroke-width="3" class="${cls}"/>`;
    svg.innerHTML = `<path d="M30 120 H400 M30 120 V20" fill="none" stroke="currentColor" class="fig-grid"/>` + line(points(false), 'fig-accent') + line(points(true), 'fig-good') + `<text x="32" y="18" class="fig-ink">Blue: simple · Green: compound</text>`;
    const simple = start * (1 + rate * n);
    const compound = start * (1 + rate) ** n;
    readout.textContent = `After ${n} years: simple £${simple.toFixed(2)}; compound £${compound.toFixed(2)}. Why does compound interest grow faster?`;
  });
}
