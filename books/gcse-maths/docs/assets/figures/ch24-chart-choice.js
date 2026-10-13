// Guided chart-choice investigation: compare category counts and proportions.
//
// This figure draws no shapes: the "chart" is a list of counts with a bar of
// blocks, so the kit supplies the frame, the control and the live readout, and
// `drawing: false` keeps it from claiming to be an image when there is no
// surface to name. The bars keep their own `role="img"` and label, as before.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { root, readout } = panel(el, { drawing: false, max: 520 });

  const bars = document.createElement("div");
  bars.className = "bars";
  bars.setAttribute("role", "img");
  bars.setAttribute("aria-label", "Bar chart showing walking, bus and car counts");
  root.append(bars);

  const size = slider(el, {
    id: "size",
    label: "Sample size",
    min: 20,
    max: 100,
    step: 20,
    value: 40,
  });

  function update() {
    const total = Number(size.value);
    const values = [['Walk', total / 4], ['Bus', total / 2], ['Car', total / 4]];
    bars.innerHTML = '';
    values.forEach(([name, count], index) => {
      const row = document.createElement('p');
      row.className = index === 1 ? 'text-good' : 'text-accent';
      row.textContent = `${name}: ${count} ${'▰'.repeat(count / 5)}`;
      bars.append(row);
    });
    bars.setAttribute('aria-label', values.map(([name, count]) => `${name}: ${count}`).join(', '));
    readout.textContent = `Sample size ${total}. Compare the category counts.`;
  }

  react(size, update);
}
