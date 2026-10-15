// Tier-1 guided investigation: profit and loss at a stall.
//
// Guided, not a sandbox: the page asks the reader to predict before using it,
// then to explain the sign of the result. Exposes one parameter family
// (quantity / cost / price / sold) so the mathematics stays visible.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the four sliders, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { SIZE, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Bar chart comparing revenue and cost, and the resulting profit or loss",
    width: 320,
    height: 120,
    max: 560,
  });

  const bought = slider(el, { show: false, id: "bought", label: "Bought", min: 0, max: 200, step: 5, value: 120, show: false });
  const costEach = slider(el, { show: false, id: "cost", label: "Cost each (£)", min: 0, max: 2, step: 0.05, value: 0.65, show: false });
  const priceEach = slider(el, { show: false, id: "price", label: "Price each (£)", min: 0, max: 3, step: 0.05, value: 1.20, show: false });
  const sold = slider(el, { show: false, id: "sold", label: "Sold", min: 0, max: 200, step: 5, value: 95, show: false });

  function bar(x, w, h, cls, label, value) {
    const base = 100;
    return `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" class="${cls}"></rect>
      <text x="${x + w / 2}" y="${base + 12}" text-anchor="middle" font-size="${SIZE.tick}" class="fig-ink">${label}</text>
      <text x="${x + w / 2}" y="${base - h - 4}" text-anchor="middle" font-size="${SIZE.tick}" class="fig-ink">${value}</text>`;
  }

  react([bought, costEach, priceEach, sold], () => {
    const boughtValue = +bought.value;
    const costValue = +costEach.value;
    const priceValue = +priceEach.value;
    const soldValue = +sold.value;

    const cost = boughtValue * costValue;
    const revenue = soldValue * priceValue;
    const profit = revenue - cost;

    const scale = Math.max(cost, revenue, 1);
    const cap = (v) => Math.max(0, Math.min(90, (v / scale) * 90));

    svg.innerHTML =
      bar(70, 60, cap(revenue), "fig-accent", "Revenue", `£${revenue.toFixed(2)}`) +
      bar(190, 60, cap(cost), "fig-warn", "Cost", `£${cost.toFixed(2)}`);

    const isLoss = profit < 0;
    const cls = isLoss ? "text-warn" : "text-good";
    readout.innerHTML =
      `Profit = revenue − cost = £${revenue.toFixed(2)} − £${cost.toFixed(2)} = ` +
      `<strong class="${cls}">£${profit.toFixed(2)}</strong> ` +
      `(${isLoss ? "a loss" : "a profit"}). <em>Why does a negative number mean a loss?</em>`;
  });
}
