// Tier-1 guided investigation: the gradient of a stress-strain graph is the
// Young modulus.
//
// Guided, not a sandbox: the page asks the reader to predict whether changing
// the size of the wire changes the gradient, then to explain why it does not.
// The line belongs to the material, and its gradient is the Young modulus. The
// force and the area move the point along that line but never change it, while a
// different material changes the line. Colours come from CSS classes, so the
// figure adapts to every bundle and to both schemes.
export function mount(el) {
  const LEFT = 64;
  const RIGHT = 520;
  const BASE = 224;
  const TOP = 28;
  const MAX_STRESS = 3.5e8; // pascals
  const MAX_STRAIN = 6e-3;
  const MATERIALS = [
    { name: "Steel", E: 2.0e11 },
    { name: "Copper", E: 1.2e11 },
    { name: "Aluminium", E: 7.0e10 },
  ];
  const SUPERSCRIPT = "⁰¹²³⁴⁵⁶⁷⁸⁹";

  el.innerHTML = `
    <div class="fig-stress-strain-graph" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 560 262" width="100%" role="img"
           aria-label="A stress-strain graph for a wire. The line is straight through the origin, and its gradient is the Young modulus of the material"></svg>
      <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.4rem .8rem">
        <label>Material
          <select class="material">
            ${MATERIALS.map((m) => `<option value="${m.name}">${m.name}</option>`).join("")}
          </select>
        </label>
        <label>Force / N <input class="force" type="range" min="0" max="100" step="5" value="40"></label>
        <label>Area / mm² <input class="area" type="range" min="0.3" max="1.2" step="0.1" value="0.4"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const select = el.querySelector(".material");
  const forceSlider = el.querySelector(".force");
  const areaSlider = el.querySelector(".area");
  const readout = el.querySelector(".readout");

  const xFor = (strain) => LEFT + (strain / MAX_STRAIN) * (RIGHT - LEFT);
  const yFor = (stress) => BASE - (stress / MAX_STRESS) * (BASE - TOP);

  // A strain written as a mantissa and a power of ten, in plain text.
  function strainText(value) {
    if (value === 0) return "0";
    const parts = value.toExponential(1).split("e");
    const exponent = Number(parts[1]);
    const sign = exponent < 0 ? "⁻" : "";
    const digits = String(Math.abs(exponent))
      .split("")
      .map((digit) => SUPERSCRIPT[Number(digit)])
      .join("");
    return `${parts[0]} × 10${sign}${digits}`;
  }

  function update() {
    const material =
      MATERIALS.find((m) => m.name === select.value) || MATERIALS[0];
    const E = material.E;
    const force = Number(forceSlider.value);
    const areaMm2 = Number(areaSlider.value);
    const area = areaMm2 * 1e-6; // square metres
    const stress = area > 0 ? force / area : 0;
    const strain = stress / E;

    // The line is the material: it runs from the origin to the edge of the plot.
    const exitStrain = Math.min(MAX_STRESS / E, MAX_STRAIN);
    const exitStress = E * exitStrain;

    const pointX = xFor(strain);
    const pointY = yFor(stress);

    const stressTicks = [0, 1, 2, 3]
      .map((value) => {
        const y = yFor(value * 1e8);
        return (
          `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
          `<text x="${LEFT - 9}" y="${(y + 4).toFixed(1)}" font-size="16" text-anchor="end" class="text-ink">${value * 100}</text>`
        );
      })
      .join("");

    const strainTicks = [0, 2, 4, 6]
      .map((value) => {
        const x = xFor(value * 1e-3);
        return (
          `<line x1="${x.toFixed(1)}" y1="${BASE}" x2="${x.toFixed(1)}" y2="${BASE + 5}" class="fig-ink"></line>` +
          `<text x="${x.toFixed(1)}" y="${BASE + 18}" font-size="16" text-anchor="middle" class="text-ink">${value}</text>`
        );
      })
      .join("");

    // The gradient triangle to the current point. It shows the rise and the run
    // whose ratio is the Young modulus. It is left out when the point is too
    // close to the origin to draw legibly.
    const runPx = pointX - LEFT;
    const risePx = BASE - pointY;
    const triangle =
      runPx > 14 && risePx > 14
        ? `<polygon points="${LEFT},${BASE} ${pointX.toFixed(1)},${BASE} ` +
          `${pointX.toFixed(1)},${pointY.toFixed(1)}" class="fig-good" fill-opacity="0.16"></polygon>`
        : "";

    const marker =
      stress > 0 && strain > 0
        ? `<circle cx="${pointX.toFixed(1)}" cy="${pointY.toFixed(1)}" r="5" class="fig-warn"></circle>`
        : "";

    svg.innerHTML =
      stressTicks +
      `<line x1="${LEFT}" y1="${BASE}" x2="${RIGHT}" y2="${BASE}" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${LEFT}" y1="${BASE}" x2="${LEFT}" y2="${TOP}" class="fig-ink" stroke-width="2"></line>` +
      strainTicks +
      `<text x="${(LEFT + RIGHT) / 2}" y="${BASE + 38}" font-size="16" text-anchor="middle" class="text-ink">strain / 10⁻³</text>` +
      `<text x="18" y="${(TOP + BASE) / 2}" font-size="16" text-anchor="middle" class="text-ink" ` +
      `transform="rotate(-90 18 ${(TOP + BASE) / 2})">stress / MPa</text>` +
      triangle +
      `<line x1="${LEFT}" y1="${BASE}" x2="${xFor(exitStrain).toFixed(1)}" ` +
      `y2="${yFor(exitStress).toFixed(1)}" class="fig-accent" stroke-width="3"></line>` +
      `<text x="${(xFor(exitStrain) - 6).toFixed(1)}" y="${(yFor(exitStress) + 16).toFixed(1)}" ` +
      `font-size="16" text-anchor="end" class="text-accent">gradient = E</text>` +
      marker;

    readout.innerHTML =
      `${material.name} has Young modulus <strong>${(E / 1e9).toFixed(0)} GPa</strong>. ` +
      `A force of <strong>${force} N</strong> on an area of ` +
      `<strong>${areaMm2.toFixed(1)} mm²</strong> gives a stress of ` +
      `<strong>${(stress / 1e6).toFixed(0)} MPa</strong> and a strain of ` +
      `<strong>${strainText(strain)}</strong>. ` +
      `The line is straight through the origin, so the gradient of the line is ` +
      `the Young modulus. Changing the force or the area moves the point along ` +
      `this line; choosing another material changes the line. ` +
      `<em>Before you change a control, predict whether a thicker wire changes ` +
      `the gradient.</em>`;
  }

  el.querySelectorAll("input, select").forEach((control) => {
    control.addEventListener("input", update);
    control.addEventListener("change", update);
  });
  update();
}
