// Tier-1 guided investigation: direct and inverse proportion.
// Predict -> Test -> Explain.
//
// The scaffolding — the surface, its accessible name, the controls, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { panel, slider, toggle, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Graph of y against x for direct or inverse proportion",
    width: 300,
    height: 200,
    max: 560,
  });

  const k = slider(el, { show: true, id: "k", label: "k", min: 1, max: 10, value: 3 });
  const x = slider(el, { show: true, id: "x", label: "x", min: 1, max: 10, value: 4 });
  const inverse = toggle(el, { id: "inverse", label: "inverse" });

  react([k, x, inverse], () => {
    const kv = Number(k.value);
    const xv0 = Number(x.value);
    const isInverse = inverse.checked;
    const y = isInverse ? kv / xv0 : kv * xv0;
    const X = (v) => 30 + (v / 11) * 240;
    const Y = (v) => 175 - (Math.min(v, 55) / 55) * 150;
    const points = [];
    for (let xv = 1; xv <= 10; xv += 1) {
      const yv = isInverse ? kv / xv : kv * xv;
      points.push(`<circle cx="${X(xv)}" cy="${Y(yv)}" r="3" class="fig-accent"></circle>`);
    }
    svg.innerHTML =
      `<line x1="30" y1="175" x2="280" y2="175" class="fig-ink"></line>` +
      `<line x1="30" y1="20" x2="30" y2="175" class="fig-ink"></line>` +
      points.join("") +
      `<circle cx="${X(xv0)}" cy="${Y(y)}" r="5" class="fig-warn"></circle>`;
    readout.textContent = isInverse
      ? `Inverse proportion: y = ${kv}/x. When x = ${xv0}, y = ${Number.isInteger(y) ? y : y.toFixed(2)}. Predict: as x doubles, what happens to y?`
      : `Direct proportion: y = ${kv}x. When x = ${xv0}, y = ${y}. Predict: as x doubles, what happens to y?`;
  });
}
