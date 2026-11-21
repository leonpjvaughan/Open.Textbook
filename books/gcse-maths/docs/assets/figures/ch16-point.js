// Guided investigation: angles around a point complete a full turn.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const WIDTH = 560;
  const HEIGHT = 48;

  const { svg, readout } = panel(el, {
    drawing: true,
    prompt: "Angles around one point complete a full turn.",
    label:
      "Three angle sectors around a point; the third completes the full turn",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });
  readout.classList.add("text-ink");

  const first = slider(el, { show: false,
    id: "first",
    label: "First angle:",
    min: 30,
    max: 150,
    step: 10,
    value: 90,
  });
  const second = slider(el, { show: false,
    id: "second",
    label: "Second angle:",
    min: 30,
    max: 150,
    step: 10,
    value: 110,
  });

  function draw() {
    const a = Number(first.value);
    const b = Number(second.value);
    const c = 360 - a - b;
    readout.textContent = `Known angles: ${a} and ${b} degrees. The remaining angle is ${c} degrees.`;
    const wa = (a / 360) * WIDTH;
    const wb = (b / 360) * WIDTH;
    const wc = WIDTH - wa - wb;
    svg.innerHTML =
      `<rect class="fig-accent" x="0" y="0" width="${wa.toFixed(2)}" height="${HEIGHT}"></rect>` +
      `<rect class="fig-good" x="${wa.toFixed(2)}" y="0" width="${wb.toFixed(2)}" height="${HEIGHT}"></rect>` +
      `<rect class="fig-ink" x="${(wa + wb).toFixed(2)}" y="0" width="${wc.toFixed(2)}" height="${HEIGHT}"></rect>`;
    svg.setAttribute(
      "aria-label",
      `Angle amounts ${a}, ${b}, and ${c} degrees total 360 degrees`,
    );
  }

  react([first, second], draw);
}
