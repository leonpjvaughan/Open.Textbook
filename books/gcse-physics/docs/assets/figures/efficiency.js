// Tier-1 guided investigation: efficiency of an energy transfer.
//
// Guided, not a sandbox: the page asks the reader to predict the efficiency
// before moving the sliders, then to explain why it cannot rise above 100 per
// cent. The reader sets the total input power and the useful output power; the
// wasted power is what is left.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A horizontal power bar split into a useful output part and a wasted part, with the efficiency shown as a fraction",
    width: 560,
    height: 120,
  });

  const inputControl = slider(el, {
    id: "input",
    label: "Total input power (W)",
    min: 10,
    max: 200,
    step: 5,
    value: 120,
  });
  const usefulControl = slider(el, {
    id: "useful",
    label: "Useful output power (W)",
    min: 0,
    max: 200,
    step: 5,
    value: 60,
  });
  const BAR_X = 30;
  const BAR_W = 500;
  const BAR_MAX = 200;

  function update() {
    const input = Number(inputControl.value);
    let useful = Number(usefulControl.value);
    if (useful > input) {
      // A transfer cannot give out more than it takes in, so the figure holds
      // the useful output at the input and says why.
      useful = input;
      usefulControl.value = String(useful);
      // Setting a slider's value in script does not fire `input`, so the kit's
      // own number display would keep the old value.
      usefulControl.dispatchEvent(new Event("input"));
    }
    const wasted = input - useful;
    const efficiency = useful / input;

    const width = (value) => ((value / BAR_MAX) * BAR_W).toFixed(1);
    const usefulWidth = width(useful);
    const wastedWidth = width(wasted);

    svg.innerHTML =
      `<text x="${BAR_X}" y="28" font-size="16" class="fig-ink">Input ${input} W</text>` +
      `<rect x="${BAR_X}" y="40" width="${width(input)}" height="34" class="fig-grid"></rect>` +
      `<rect x="${BAR_X}" y="40" width="${usefulWidth}" height="34" class="fig-accent"></rect>` +
      `<rect x="${(BAR_X + Number(usefulWidth)).toFixed(1)}" y="40" width="${wastedWidth}" height="34" class="fig-warn"></rect>` +
      `<text x="${BAR_X}" y="96" font-size="16" class="fig-ink">Useful output ${useful} W</text>` +
      `<text x="${BAR_X + 190}" y="96" font-size="16" class="fig-ink">Wasted ${wasted} W</text>`;

    readout.innerHTML =
      `Efficiency = useful output ÷ total input = ${useful} W ÷ ${input} W = ` +
      `<strong>${efficiency.toFixed(2)}</strong> (${(efficiency * 100).toFixed(0)}%). ` +
      `Wasted power = ${input} W − ${useful} W = <strong>${wasted} W</strong>. ` +
      `<em>Keep the useful output still and raise the input. Why does the efficiency fall?</em>`;
  }

  react([inputControl, usefulControl], update);
}
