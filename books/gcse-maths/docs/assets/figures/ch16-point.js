// Guided investigation: angles around a point complete a full turn.
//
// The scaffolding — the frame, the prompt, the two sliders, the live readout, the
// redraw — comes from `kit.js`. The one thing this figure draws is the bar, a
// gradient rather than an SVG, so the kit supplies a frame with no drawing
// surface and the bar carries its own name.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { root, readout } = panel(el, {
    drawing: false,
    prompt: "Angles around one point complete a full turn.",
    max: 560,
  });
  readout.classList.add("text-ink");

  const bar = document.createElement("div");
  bar.className = "bar fig-ink";
  bar.setAttribute("role", "img");
  bar.setAttribute(
    "aria-label",
    "Three angle sectors around a point; the third completes the full turn",
  );
  root.append(bar);

  const first = slider(el, {
    id: "first",
    label: "First angle:",
    min: 30,
    max: 150,
    step: 10,
    value: 90,
  });
  const second = slider(el, {
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
    bar.style.height = "1rem";
    bar.style.background = `linear-gradient(90deg, var(--tb-fig-accent) 0 ${a/3.6}%, var(--tb-fig-grid) ${a/3.6}% ${(a+b)/3.6}%, var(--tb-ink) ${(a+b)/3.6}% 100%)`;
    bar.setAttribute(
      "aria-label",
      `Angle amounts ${a}, ${b}, and ${c} degrees total 360 degrees`,
    );
  }

  react([first, second], draw);
}
