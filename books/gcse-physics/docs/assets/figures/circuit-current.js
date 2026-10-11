// Tier-1 guided investigation: current, potential difference and resistance.
//
// Guided, not a sandbox: the page asks the reader to predict the effect of
// doubling the resistance, and then of doubling the potential difference, before
// the sliders are touched. The figure shows a simple series circuit with a cell,
// a resistor and an ammeter, and reads out the current.
//
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes. No colour is the only signal: every value is printed as text and the
// current is written in the readout.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-circuit-current" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 560 200" width="100%" height="200" role="img"
           aria-label="A series circuit with a cell, a resistor and an ammeter. The current readout changes with the potential difference and the resistance."></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Potential difference (V)
          <input class="pd" type="range" min="1" max="12" step="1" value="6"></label>
        <label>Resistance (&Omega;)
          <input class="resistance" type="range" min="1" max="12" step="1" value="3"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const pd = el.querySelector(".pd");
  const resistance = el.querySelector(".resistance");
  const readout = el.querySelector(".readout");

  function update() {
    const volts = Number(pd.value);
    const ohms = Number(resistance.value);
    const amps = volts / ohms;

    svg.innerHTML =
      // Wires of the loop.
      `<line x1="70" y1="40" x2="70" y2="92" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="70" y1="108" x2="70" y2="160" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="70" y1="40" x2="230" y2="40" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="330" y1="40" x2="490" y2="40" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="490" y1="40" x2="490" y2="82" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="490" y1="118" x2="490" y2="160" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="490" y1="160" x2="70" y2="160" class="fig-ink" stroke-width="2"></line>` +
      // Cell symbol: a long line (positive) and a short line (negative).
      `<line x1="48" y1="92" x2="92" y2="92" class="fig-ink" stroke-width="3"></line>` +
      `<line x1="60" y1="108" x2="80" y2="108" class="fig-ink" stroke-width="6"></line>` +
      // Resistor block on the top wire.
      `<rect x="230" y="28" width="100" height="24" class="fig-accent"></rect>` +
      `<text x="280" y="24" font-size="12" text-anchor="middle" class="fig-ink">resistor</text>` +
      // Ammeter.
      `<circle cx="490" cy="100" r="18" class="fig-grid" stroke-width="2"></circle>` +
      `<text x="490" y="105" font-size="13" text-anchor="middle" class="fig-ink">A</text>` +
      // Conventional-current arrow on the top wire.
      `<polygon points="440,40 420,32 420,48" class="fig-accent"></polygon>` +
      `<text x="352" y="26" font-size="12" text-anchor="middle" class="fig-ink">current</text>` +
      `<text x="70" y="180" font-size="12" text-anchor="start" class="fig-ink">cell</text>`;

    readout.innerHTML =
      `Potential difference <strong>${volts} V</strong>. ` +
      `Resistance <strong>${ohms} &Omega;</strong>. ` +
      `Current <strong>${amps.toFixed(2)} A</strong>. ` +
      `<em>The current is the potential difference divided by the resistance. ` +
      `What happens to the current if the resistance doubles?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
