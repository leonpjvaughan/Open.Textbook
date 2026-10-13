// Tier-1 guided investigation: ordering numbers on a number line.
// Predict → Test → Explain: the page asks which is greater before the reader
// moves the sliders, then asks why a "longer" decimal is not always bigger.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the two sliders, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Number line from minus ten to ten with two marked values",
    width: 560,
    height: 90,
    max: 560,
  });

  const a = slider(el, { id: "a", label: "a", min: -10, max: 10, step: 0.1, value: -2.5, show: false });
  const b = slider(el, { id: "b", label: "b", min: -10, max: 10, step: 0.1, value: 1.8, show: false });

  const min = -10;
  const max = 10;
  const width = 560;
  const pad = 24;
  const X = (v) => pad + ((v - min) / (max - min)) * (width - 2 * pad);

  react([a, b], () => {
    const av = Number(a.value);
    const bv = Number(b.value);
    const ticks = [];
    for (let v = min; v <= max; v += 2) {
      ticks.push(
        `<line x1="${X(v)}" y1="44" x2="${X(v)}" y2="52" class="fig-ink"></line>` +
          `<text x="${X(v)}" y="68" font-size="16" text-anchor="middle" class="fig-ink">${v}</text>`,
      );
    }
    const mark = (v, label, cls) =>
      `<circle cx="${X(v)}" cy="34" r="6" class="${cls}"></circle>` +
      `<text x="${X(v)}" y="20" font-size="18" text-anchor="middle" class="fig-ink">${label} = ${v}</text>`;
    svg.innerHTML =
      `<line x1="${pad}" y1="34" x2="${width - pad}" y2="34" class="fig-ink"></line>` +
      ticks.join("") +
      mark(av, "a", "fig-accent") +
      mark(bv, "b", "fig-warn");

    const rel = av === bv ? "=" : av < bv ? "<" : ">";
    readout.innerHTML =
      `a ${rel} b — because ${Math.min(av, bv)} is to the left of ${Math.max(av, bv)}. ` +
      `<em>Now try a = 0.3 and b = 0.29: why is the shorter decimal bigger?</em>`;
  });
}
