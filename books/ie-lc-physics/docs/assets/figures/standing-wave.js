// A standing wave on a string fixed at both ends, with its nodes, wavelength and
// frequency all following the controls.
//
// Section 9.5 teaches that the two fixed ends are nodes, that n half-wavelengths fit
// on the string, and that the harmonics are whole-number multiples of the fundamental.
// A static diagram shows one harmonic and nothing of the rule that links them. So the
// reader sets the string length and the harmonic number, and watches the nodes move,
// the wavelength follow from L = n lambda / 2, and the frequency follow from f = v /
// lambda. The wave speed is the 255 m/s the page's own progress check uses.
//
// Nothing here carries a colour. Every shape uses a fig-* class and every word a
// text-* class, so the figure follows the reader's theme in both schemes.
import {
  axes,
  curve,
  dots,
  fmt,
  label,
  line,
  panel,
  quantity,
  react,
  sigfig,
  slider,
  SIZE,
} from "./kit.js";

// The speed of the wave on the page's guitar string, in metres per second.
const SPEED = 255;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A standing wave on a string fixed at both ends, showing its nodes and antinodes",
    description:
      "A string drawn from left to right, vibrating in a standing wave. Both ends are fixed and " +
      "never move. The number of half-wavelengths that fit on the string is set with the harmonic " +
      "control, and the string length with the other. The nodes, the wavelength and the frequency " +
      "are given in the readout.",
    prompt: "Predict how many nodes the third harmonic has. Then choose it and count them.",
    width: 560,
    height: 320,
  });

  const length = slider(el, {
    id: "length",
    label: "String length L",
    min: 0.2,
    max: 2,
    step: 0.05,
    value: 0.65,
    unit: "m",
    show: true,
    name: "The length of the string, in metres",
  });

  const harmonic = slider(el, {
    id: "harmonic",
    label: "Harmonic n",
    min: 1,
    max: 6,
    step: 1,
    value: 1,
    show: true,
    name: "The harmonic number, from one to six",
  });

  function update() {
    const L = Number(length.value);
    const n = Number(harmonic.value);
    const lambda = (2 * L) / n;
    const frequency = SPEED / lambda;
    const fundamental = SPEED / (2 * L);

    const { draw, x, y, box } = axes({
      width: 560,
      height: 320,
      pad: { left: 56, right: 24, top: 54, bottom: 52 },
      x: { domain: [0, L], ticks: 4, label: "position along the string / m" },
      y: { domain: [-1.4, 1.4], ticks: 4, label: "displacement" },
    });

    let drawing = draw;

    // The equilibrium line, so a node is visibly a point on the axis.
    drawing += line({ x1: box.x0, y1: y(0), x2: box.x1, y2: y(0), class: "fig-grid", width: 1.2, dash: "6 5" });

    // The string, sampled at its largest displacement.
    const samples = [];
    for (let i = 0; i <= 240; i += 1) {
      const position = (L * i) / 240;
      samples.push([position, Math.sin((n * Math.PI * position) / L)]);
    }
    drawing += curve(samples, { x, y, class: "fig-accent", width: 2.8 });

    // The fixed ends, drawn as short walls, so a node at the end is not mistaken for a
    // node in the middle.
    drawing += line({ x1: x(0), y1: y(-0.2), x2: x(0), y2: y(0.2), class: "fig-ink", width: 3 });
    drawing += line({ x1: x(L), y1: y(-0.2), x2: x(L), y2: y(0.2), class: "fig-ink", width: 3 });

    // The nodes: the two ends, and the points that never move between them.
    const nodes = [];
    for (let k = 0; k <= n; k += 1) nodes.push([(k * L) / n, 0]);
    drawing += dots(nodes, { x, y, r: 5, class: "fig-ink" });

    // The antinodes: the points of largest movement.
    const antinodes = [];
    for (let k = 0; k < n; k += 1) {
      const position = ((k + 0.5) * L) / n;
      antinodes.push([position, Math.sin((n * Math.PI * position) / L)]);
    }
    drawing += dots(antinodes, { x, y, r: 5, class: "fig-warn" });

    // Half a wavelength lies between neighbouring nodes, drawn along the axis.
    drawing += line({ x1: x(0), y1: y(0), x2: x(L / n), y2: y(0), class: "fig-warn", width: 2.4 });
    drawing += label({ x: x(L / (2 * n)), y: y(0) - 10, text: `λ/2 = ${quantity(L / n, "m")}`, size: SIZE.tick, class: "text-warn" });

    // Name the first node and antinode, so the dots have a meaning.
    if (n >= 2) {
      drawing += label({ x: x(L / n), y: y(0) + 24, text: "node", size: SIZE.tick, class: "text-ink" });
    }
    drawing += label({ x: x(L / (2 * n)), y: y(1) - 12, text: "antinode", size: SIZE.tick, class: "text-warn" });

    // The two numbers the section is about.
    drawing += label({ x: box.x0, y: 24, text: `λ = 2L/n = ${quantity(lambda, "m")}`, size: SIZE.value, class: "text-accent", anchor: "start" });
    drawing += label({ x: box.x1, y: 24, text: `f = v/λ = ${sigfig(frequency, 3)} Hz`, size: SIZE.value, class: "text-accent", anchor: "end" });

    svg.innerHTML = drawing;

    const relation =
      n === 1
        ? `This is the fundamental.`
        : `This is harmonic n = ${n}, a whole-number multiple of the fundamental.`;
    readout.textContent =
      `The string is ${quantity(L, "m")} long and fixed at both ends. ` +
      `Harmonic n = ${n} fits ${n} half-wavelength${n === 1 ? "" : "s"} on the string, so λ = 2L/n = ${quantity(lambda, "m")}. ` +
      `The wave travels at ${SPEED} m/s, so f = v/λ = ${sigfig(frequency, 3)} Hz. ` +
      `The fundamental frequency is ${sigfig(fundamental, 3)} Hz. ${relation}`;
  }

  react([length, harmonic], update);
}
