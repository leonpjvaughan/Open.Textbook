// Guided model: a fraction strip with an adjustable number of equal parts.
// The reader predicts a matching numerator before using the controls.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const WIDTH = 560;
  const HEIGHT = 64;

  const { svg, readout } = panel(el, {
    drawing: true,
    label:
      "Strip divided into equal parts; shaded parts show two thirds",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });
  readout.classList.add("text-ink");

  const parts = slider(el, {
    id: "parts",
    label: "Number of parts:",
    min: 3,
    max: 15,
    value: 6,
    show: false,
  });

  react(parts, () => {
    const n = Number(parts.value);
    const shaded = 2 * n / 3;
    const whole = Math.floor(shaded);
    const partial = shaded - whole;
    const cell = WIDTH / n;
    const cells = [];
    for (let i = 0; i < n; i++) {
      // Each cell is a painted shape: a counted cell is accent, the partial cell
      // is warn at its fraction of the whole, and an empty cell is an outline.
      const counted = i < whole;
      const part = i === whole && partial > 0;
      const cls = counted ? "fig-accent" : part ? "fig-warn" : "fig-grid";
      const opacity = part ? ` opacity="${partial}"` : "";
      cells.push(
        `<rect class="${cls}" x="${(i * cell).toFixed(2)}" y="8" ` +
          `width="${cell.toFixed(2)}" height="48"${opacity}></rect>`,
      );
    }
    svg.innerHTML = cells.join("");
    svg.setAttribute(
      "aria-label",
      `Strip of ${n} equal parts, with two thirds shaded`,
    );
    readout.textContent = `${n} equal parts: two thirds corresponds to ${Number(shaded.toFixed(2))} parts.`;
  });
}
