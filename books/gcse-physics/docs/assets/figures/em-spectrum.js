// Tier-1 guided investigation: the electromagnetic spectrum.
//
// Guided, not a sandbox: the page asks the reader to predict the link between
// frequency and wavelength before moving the slider, then to explain why a
// higher frequency means a shorter wavelength. The slider sets the frequency on
// a logarithmic scale, and the strip highlights the group it falls in.
// Colours come from CSS classes so the figure adapts to dark mode and every
// bundle; the group name is always shown, so colour is never the only signal.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. The two jump buttons are not one
// of the kit's controls, so they are built here inside the kit's control column.
// What is left is the drawing and the sentences, which are the parts that differ
// from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const GROUPS = [
    { name: "radio", min: 0, max: 3e8 },
    { name: "microwave", min: 3e8, max: 3e11 },
    { name: "infrared", min: 3e11, max: 4.3e14 },
    { name: "visible", min: 4.3e14, max: 7.5e14 },
    { name: "ultraviolet", min: 7.5e14, max: 3e16 },
    { name: "X-ray", min: 3e16, max: 3e19 },
    { name: "gamma", min: 3e19, max: Infinity },
  ];

  const { svg, readout } = panel(el, {
    label:
      "A strip of the seven groups of the electromagnetic spectrum, with the group chosen by the slider highlighted",
    width: 600,
    height: 120,
    max: 600,
  });

  const freqInput = slider(el, {
    id: "freq",
    label: "Frequency",
    min: 5,
    max: 19,
    step: 0.02,
    value: 7,
  });

  // The jump buttons sit in the same control column the kit's slider uses.
  const controls = el.querySelector(".fig-controls");
  const jumps = document.createElement("div");
  jumps.style.cssText = "display:flex;gap:.5rem;flex-wrap:wrap";
  const jump = (id, text) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = id;
    button.textContent = text;
    jumps.append(button);
    return button;
  };
  const radioButton = jump("go-radio", "Go to radio waves");
  const visibleButton = jump("go-visible", "Go to visible light");
  controls.append(jumps);

  function groupFor(frequency) {
    return GROUPS.find((g) => frequency >= g.min && frequency < g.max) || GROUPS[0];
  }

  function formatLength(metres) {
    if (metres >= 1) return `${metres.toPrecision(2)} m`;
    if (metres >= 0.01) return `${(metres * 100).toPrecision(2)} cm`;
    if (metres >= 1e-6) return `${(metres * 1e6).toPrecision(2)} micrometres`;
    if (metres >= 1e-9) return `${(metres * 1e9).toPrecision(2)} nm`;
    return `${metres.toExponential(2)} m`;
  }

  function formatFrequency(hz) {
    if (hz >= 1e18) return `${(hz / 1e18).toPrecision(2)} x 10^18 Hz`;
    if (hz >= 1e15) return `${(hz / 1e15).toPrecision(2)} x 10^15 Hz`;
    if (hz >= 1e12) return `${(hz / 1e12).toPrecision(2)} x 10^12 Hz`;
    if (hz >= 1e9) return `${(hz / 1e9).toPrecision(2)} x 10^9 Hz`;
    if (hz >= 1e6) return `${(hz / 1e6).toPrecision(2)} MHz`;
    return `${hz.toPrecision(2)} Hz`;
  }

  function update() {
    const frequency = Math.pow(10, Number(freqInput.value));
    const wavelength = 3.0e8 / frequency;
    const current = groupFor(frequency).name;

    const width = 600 / GROUPS.length;
    const cells = GROUPS.map((group, index) => {
      const x = index * width;
      const cls = group.name === current ? "fig-accent" : "fig-grid";
      return (
        `<rect x="${x}" y="30" width="${width - 2}" height="34" class="${cls}" ` +
        `stroke-width="1"></rect>` +
        `<text x="${x + width / 2}" y="82" font-size="17" text-anchor="middle" ` +
        `class="fig-ink">${group.name}</text>`
      );
    }).join("");

    svg.innerHTML = cells;

    readout.innerHTML =
      `Frequency <strong>${formatFrequency(frequency)}</strong>. ` +
      `Wavelength <strong>${formatLength(wavelength)}</strong>. ` +
      `Group: <strong>${current}</strong>. ` +
      `<em>All seven groups travel at the same speed. What happens to the ` +
      `wavelength as the frequency goes up?</em>`;
  }

  const go = (value) => {
    freqInput.value = value;
    // Setting a slider's value in script does not fire `input`, so the kit's own
    // number display would keep the old value.
    freqInput.dispatchEvent(new Event("input"));
  };
  radioButton.addEventListener("click", () => go("7"));
  visibleButton.addEventListener("click", () => go("14.85"));

  react(freqInput, update);
}
