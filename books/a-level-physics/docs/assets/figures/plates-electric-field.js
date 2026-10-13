// Tier-1 guided investigation: the uniform electric field between two plates.
//
// Two sliders set the potential difference and the separation of the plates. The
// drawing changes the number of field arrows as the field strength changes. The
// readout gives the field strength, the force on a xenon ion, and the kinetic
// energy the ion gains crossing the gap. That energy depends on the potential
// difference alone, not on the separation, which is the point of the figure.
//
// Colours come from the fig-* classes. The readout is plain HTML, never runtime
// maths.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-electric-field" style="font:14px system-ui;max-width:620px">
      <svg viewBox="0 0 620 300" width="100%" role="img"
           aria-label="Two parallel plates with a uniform electric field between them and a positive ion crossing the gap"></svg>
      <label style="display:block;margin:.5rem 0">Potential difference (volts)
        <input class="volts" type="range" min="200" max="2000" step="10" value="1200">
        <output class="volts-out">1200</output>
      </label>
      <label style="display:block;margin:.3rem 0">Separation (millimetres)
        <input class="gap" type="range" min="0.5" max="5" step="0.1" value="1.5">
        <output class="gap-out">1.5</output>
      </label>
      <p class="readout" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const volts = el.querySelector(".volts");
  const gap = el.querySelector(".gap");
  const voltsOut = el.querySelector(".volts-out");
  const gapOut = el.querySelector(".gap-out");
  const readout = el.querySelector(".readout");

  const Q = 1.60e-19; // charge on a xenon ion, C

  function update() {
    const V = Number(volts.value);
    const d = Number(gap.value) * 1e-3;
    voltsOut.textContent = String(V);
    gapOut.textContent = Number(gap.value).toFixed(1);

    const E = V / d;
    const F = Q * E;
    const energyJ = Q * V;

    const LEFT = 130;
    const RIGHT = 510;
    const TOP = 60;
    const BOTTOM = 240;

    let drawing =
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-accent" stroke-width="6"></line>` +
      `<line x1="${RIGHT}" y1="${TOP}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-accent" stroke-width="6"></line>` +
      `<text x="${LEFT}" y="${TOP - 12}" font-size="20" class="fig-ink" text-anchor="middle">+ plate</text>` +
      `<text x="${RIGHT}" y="${TOP - 12}" font-size="20" class="fig-ink" text-anchor="middle">- plate</text>`;

    const arrows = Math.max(
      2,
      Math.min(9, 2 + Math.round((7 * (Math.log10(E) - Math.log10(4e4))) / 2))
    );
    for (let index = 0; index < arrows; index += 1) {
      const y = TOP + ((index + 1) / (arrows + 1)) * (BOTTOM - TOP);
      const tip = RIGHT - 14;
      drawing +=
        `<line x1="${LEFT + 14}" y1="${y.toFixed(1)}" x2="${tip}" y2="${y.toFixed(1)}" class="fig-ink"></line>` +
        `<polygon points="${tip},${(y - 5).toFixed(1)} ${tip},${(y + 5).toFixed(1)} ${tip + 10},${y.toFixed(1)}" class="fig-ink"></polygon>`;
    }

    const ionX = LEFT + 70;
    const ionY = (TOP + BOTTOM) / 2;
    drawing +=
      `<circle cx="${ionX}" cy="${ionY}" r="8" class="fig-good"></circle>` +
      `<text x="${ionX}" y="${ionY + 4}" font-size="18" class="fig-ink" text-anchor="middle">+</text>` +
      `<line x1="${ionX + 12}" y1="${ionY}" x2="${ionX + 70}" y2="${ionY}" class="fig-good" stroke-width="2"></line>` +
      `<polygon points="${ionX + 70},${ionY - 5} ${ionX + 70},${ionY + 5} ${ionX + 80},${ionY}" class="fig-good"></polygon>` +
      `<text x="${LEFT + 30}" y="${BOTTOM + 28}" font-size="20" class="fig-ink">gap ${Number(gap.value).toFixed(1)} mm</text>`;

    svg.innerHTML = drawing;

    readout.innerHTML =
      `With ${V} V across ${Number(gap.value).toFixed(1)} mm, ` +
      `E = <strong>${(E / 1000).toFixed(0)} kV m<sup>-1</sup></strong>. ` +
      `The force on one xenon ion is <strong>${F.toExponential(2)} N</strong>. ` +
      `The ion gains <strong>${V} eV</strong> = ` +
      `<strong>${energyJ.toExponential(2)} J</strong> crossing the gap. ` +
      `<em>Change the separation but keep the potential difference. What happens to the energy gained?</em>`;
  }

  volts.addEventListener("input", update);
  gap.addEventListener("input", update);
  update();
}
