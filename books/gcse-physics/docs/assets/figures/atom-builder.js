// Tier-1 guided investigation: build an atom from protons, neutrons and electrons.
//
// The page asks the reader to predict what changes when a neutron is added, then
// to test it, then to explain why the element changes when a proton is added but
// not when a neutron is. Protons and neutrons draw as different shapes as well as
// different classes, so the figure does not rely on colour alone.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  const ELEMENTS = {
    1: "hydrogen",
    2: "helium",
    3: "lithium",
    4: "beryllium",
    5: "boron",
    6: "carbon",
  };

  el.innerHTML = `
    <div class="fig-atom-builder" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 360 230" width="100%" height="230" role="img"
           aria-label="An atom drawn from protons, neutrons and electrons, changing as the sliders move"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Protons <input class="protons" type="range" min="1" max="6" step="1" value="3"></label>
        <label>Neutrons <input class="neutrons" type="range" min="0" max="8" step="1" value="4"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const CENTRE = { x: 150, y: 105 };

  function nucleonPositions(count) {
    const rings = [
      { r: 0, n: 1 },
      { r: 14, n: 6 },
      { r: 28, n: 12 },
    ];
    const out = [];
    for (const ring of rings) {
      if (out.length >= count) break;
      for (let i = 0; i < ring.n && out.length < count; i += 1) {
        const angle = (i / ring.n) * Math.PI * 2 - Math.PI / 2;
        out.push({
          x: CENTRE.x + ring.r * Math.cos(angle),
          y: CENTRE.y + ring.r * Math.sin(angle),
        });
      }
    }
    return out;
  }

  function update() {
    const protons = Number(el.querySelector(".protons").value);
    const neutrons = Number(el.querySelector(".neutrons").value);
    const massNumber = protons + neutrons;
    const element = ELEMENTS[protons];

    // The nucleus: protons are solid discs, neutrons are open rings.
    const positions = nucleonPositions(massNumber);
    const nucleons = positions
      .map((point, index) => {
        const isProton = index < protons;
        const shape = isProton
          ? `<circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="6" class="fig-accent"></circle>`
          : `<circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="6" class="fig-grid" fill="none" stroke-width="2"></circle>`;
        return shape;
      })
      .join("");

    const nucleus = `<circle cx="${CENTRE.x}" cy="${CENTRE.y}" r="14" class="fig-grid" fill="none" stroke-dasharray="2 3"></circle>`;

    // One shell for the electrons the neutral atom carries.
    const orbitRadius = 74;
    const electrons = [];
    for (let i = 0; i < protons; i += 1) {
      const angle = (i / protons) * Math.PI * 2 - Math.PI / 2;
      const x = CENTRE.x + orbitRadius * Math.cos(angle);
      const y = CENTRE.y + orbitRadius * Math.sin(angle);
      electrons.push(
        `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" class="fig-ink" fill="none" stroke-width="2"></circle>` +
          `<text x="${x.toFixed(1)}" y="${(y + 3.5).toFixed(1)}" font-size="10" text-anchor="middle" class="fig-ink">-</text>`,
      );
    }
    const orbit = `<circle cx="${CENTRE.x}" cy="${CENTRE.y}" r="${orbitRadius}" class="fig-grid" fill="none" stroke-dasharray="3 3"></circle>`;

    const legend =
      `<circle cx="286" cy="24" r="6" class="fig-accent"></circle>` +
      `<text x="298" y="28" font-size="11" class="fig-ink">proton</text>` +
      `<circle cx="286" cy="48" r="6" class="fig-grid" fill="none" stroke-width="2"></circle>` +
      `<text x="298" y="52" font-size="11" class="fig-ink">neutron</text>` +
      `<circle cx="286" cy="72" r="6" class="fig-ink" fill="none" stroke-width="2"></circle>` +
      `<text x="298" y="76" font-size="11" class="fig-ink">electron</text>`;

    svg.innerHTML = legend + orbit + nucleus + nucleons + electrons.join("");

    readout.innerHTML =
      `This atom is <strong>${element}</strong>. ` +
      `It has <strong>${protons}</strong> protons, <strong>${neutrons}</strong> neutrons ` +
      `and <strong>${protons}</strong> electrons. ` +
      `Its atomic number is <strong>${protons}</strong> and its mass number is ` +
      `<strong>${massNumber}</strong>. ` +
      `<em>Add a neutron. Which of the two numbers changes, and which stays the same?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
