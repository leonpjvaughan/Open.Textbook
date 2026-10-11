// Tier-1 guided investigation: efficiency of an energy transfer.
//
// Guided, not a sandbox: the page asks the reader to predict the efficiency
// before moving the sliders, then to explain why it cannot rise above 100 per
// cent. The reader sets the total input power and the useful output power; the
// wasted power is what is left.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-efficiency" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 120" width="100%" height="120" role="img"
           aria-label="A horizontal power bar split into a useful output part and a wasted part, with the efficiency shown as a fraction"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Total input power (W) <input class="input" type="range" min="10" max="200" step="5" value="120"></label>
        <label>Useful output power (W) <input class="useful" type="range" min="0" max="200" step="5" value="60"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const BAR_X = 30;
  const BAR_W = 500;
  const BAR_MAX = 200;

  function update() {
    const input = Number(el.querySelector(".input").value);
    const usefulSlider = el.querySelector(".useful");
    let useful = Number(usefulSlider.value);
    if (useful > input) {
      // A transfer cannot give out more than it takes in, so the figure holds
      // the useful output at the input and says why.
      useful = input;
      usefulSlider.value = String(useful);
    }
    const wasted = input - useful;
    const efficiency = useful / input;

    const width = (value) => ((value / BAR_MAX) * BAR_W).toFixed(1);
    const usefulWidth = width(useful);
    const wastedWidth = width(wasted);

    svg.innerHTML =
      `<text x="${BAR_X}" y="28" font-size="11" class="fig-ink">Input ${input} W</text>` +
      `<rect x="${BAR_X}" y="40" width="${width(input)}" height="34" class="fig-grid"></rect>` +
      `<rect x="${BAR_X}" y="40" width="${usefulWidth}" height="34" class="fig-accent"></rect>` +
      `<rect x="${(BAR_X + Number(usefulWidth)).toFixed(1)}" y="40" width="${wastedWidth}" height="34" class="fig-warn"></rect>` +
      `<text x="${BAR_X}" y="96" font-size="11" class="fig-ink">Useful output ${useful} W</text>` +
      `<text x="${BAR_X + 190}" y="96" font-size="11" class="fig-ink">Wasted ${wasted} W</text>`;

    readout.innerHTML =
      `Efficiency = useful output ÷ total input = ${useful} W ÷ ${input} W = ` +
      `<strong>${efficiency.toFixed(2)}</strong> (${(efficiency * 100).toFixed(0)}%). ` +
      `Wasted power = ${input} W − ${useful} W = <strong>${wasted} W</strong>. ` +
      `<em>Keep the useful output still and raise the input. Why does the efficiency fall?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
