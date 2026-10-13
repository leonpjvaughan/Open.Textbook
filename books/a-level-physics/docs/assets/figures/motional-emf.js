// Tier-1 guided investigation: electromagnetic induction by a moving rod.
//
// A conducting rod slides along two rails through a uniform magnetic field. The
// sliders set the flux density, the length, the speed and the resistance of the
// circuit. The readout gives the induced emf, the current, the magnetic force
// that opposes the motion, and the mechanical and electrical power. The two
// powers are equal, because energy is conserved.
//
// Colours come from the fig-* classes. The readout is plain HTML, never runtime
// maths.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-motional-emf" style="font:14px system-ui;max-width:620px">
      <svg viewBox="0 0 620 300" width="100%" role="img"
           aria-label="A conducting rod sliding along two rails through a magnetic field, with the induced current and the opposing force shown"></svg>
      <label style="display:block;margin:.5rem 0">Flux density (tesla)
        <input class="field" type="range" min="0.05" max="0.5" step="0.01" value="0.25">
        <output class="field-out">0.25</output>
      </label>
      <label style="display:block;margin:.3rem 0">Length of the rod (metres)
        <input class="length" type="range" min="0.2" max="2" step="0.1" value="1">
        <output class="length-out">1.0</output>
      </label>
      <label style="display:block;margin:.3rem 0">Speed (metres per second)
        <input class="speed" type="range" min="1" max="10" step="0.5" value="4">
        <output class="speed-out">4.0</output>
      </label>
      <label style="display:block;margin:.3rem 0">Circuit resistance (ohms)
        <input class="resistance" type="range" min="0.5" max="5" step="0.1" value="2">
        <output class="resistance-out">2.0</output>
      </label>
      <p class="readout" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const field = el.querySelector(".field");
  const length = el.querySelector(".length");
  const speed = el.querySelector(".speed");
  const resistance = el.querySelector(".resistance");
  const fieldOut = el.querySelector(".field-out");
  const lengthOut = el.querySelector(".length-out");
  const speedOut = el.querySelector(".speed-out");
  const resistanceOut = el.querySelector(".resistance-out");
  const readout = el.querySelector(".readout");

  function update() {
    const B = Number(field.value);
    const L = Number(length.value);
    const v = Number(speed.value);
    const R = Number(resistance.value);
    fieldOut.textContent = B.toFixed(2);
    lengthOut.textContent = L.toFixed(1);
    speedOut.textContent = v.toFixed(1);
    resistanceOut.textContent = R.toFixed(1);

    const emf = B * L * v;
    const current = emf / R;
    const force = B * current * L;
    const mechanical = force * v;
    const electrical = emf * current;

    const TOP = 90;
    const BOTTOM = 220;
    const LEFT = 70;
    const RIGHT = 560;

    let dots = "";
    for (let x = LEFT; x < RIGHT; x += 42) {
      for (let y = TOP - 40; y < BOTTOM + 40; y += 42) {
        dots += `<circle cx="${x}" cy="${y}" r="2.5" class="fig-ink"></circle>`;
      }
    }

    const rodX = 330;
    const drawing =
      dots +
      `<line x1="${LEFT}" y1="${TOP}" x2="${RIGHT}" y2="${TOP}" class="fig-ink" stroke-width="4"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink" stroke-width="4"></line>` +
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-accent" stroke-width="4"></line>` +
      `<line x1="${rodX}" y1="${TOP}" x2="${rodX}" y2="${BOTTOM}" class="fig-good" stroke-width="6"></line>` +
      `<line x1="${rodX + 8}" y1="${TOP - 30}" x2="${rodX + 70}" y2="${TOP - 30}" class="fig-good" stroke-width="3"></line>` +
      `<polygon points="${rodX + 70},${TOP - 35} ${rodX + 70},${TOP - 25} ${rodX + 82},${TOP - 30}" class="fig-good"></polygon>` +
      `<text x="${rodX + 88}" y="${TOP - 26}" font-size="18" class="fig-ink">v</text>` +
      `<text x="${LEFT - 10}" y="${(TOP + BOTTOM) / 2}" font-size="18" class="fig-ink" text-anchor="end">R</text>` +
      `<text x="${(LEFT + rodX) / 2}" y="${TOP + 20}" font-size="18" class="fig-ink" text-anchor="middle">current</text>`;

    svg.innerHTML = drawing;

    readout.innerHTML =
      `emf = <strong>${emf.toFixed(2)} V</strong>, so the current is ` +
      `<strong>${current.toFixed(2)} A</strong>. The field pushes the rod back with ` +
      `<strong>${force.toFixed(2)} N</strong>. ` +
      `Mechanical power = ${mechanical.toFixed(2)} W. Electrical power = ` +
      `${electrical.toFixed(2)} W. ` +
      `<em>Compare the two powers. Why must you keep pulling the rod?</em>`;
  }

  for (const control of [field, length, speed, resistance]) {
    control.addEventListener("input", update);
  }
  update();
}
