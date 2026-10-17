// Guided investigation: predict how the real distance changes with map length.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A map segment and the real distance it represents",
    prompt: "Predict what happens to the real distance when the map length doubles.",
    width: 360,
    height: 100,
    max: 520,
  });

  svg.innerHTML = `
      <line x1="24" y1="40" x2="84" y2="40" class="fig-ink" stroke-width="3"></line>
      <circle cx="24" cy="40" r="6" class="fig-accent"></circle>
      <circle cx="84" cy="40" r="6" class="fig-warn"></circle>
      ${label({ x: 24, y: 68, text: "Map length", anchor: "start", size: SIZE.label, class: "text-ink" })}
      ${label({ x: 24, y: 90, text: "Scale 1 cm : 1 m", anchor: "start", size: SIZE.label, class: "text-good" })}`;

  const input = slider(el, { show: false,
    id: "length",
    label: "Map length in cm",
    min: 1,
    max: 10,
    value: 2,
  });

  const line = svg.querySelector("line");
  const farEnd = svg.querySelector("circle.fig-warn");

  // 30 pixels per centimetre keeps the longest segment inside the frame.
  const PIXELS_PER_CM = 30;

  react(input, () => {
    const n = Number(input.value);
    const x2 = 24 + PIXELS_PER_CM * n;
    line.setAttribute("x2", x2);
    farEnd.setAttribute("cx", x2);

    const centimetres = n === 1 ? "centimetre" : "centimetres";
    const metres = n === 1 ? "metre" : "metres";
    svg.setAttribute(
      "aria-label",
      `A map segment ${n} ${centimetres} long, representing ${n} ${metres} in real life`,
    );
    readout.textContent = `${n} cm on the map represents ${n} m in real life.`;
  });
}
