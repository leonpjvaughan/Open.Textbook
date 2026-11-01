// Tier-1 guided investigation: the gradient of a stress-strain graph is the
// Young modulus.
//
// Guided, not a sandbox: the page asks the reader to predict whether changing
// the size of the wire changes the gradient, then to explain why it does not.
// The line belongs to the material, and its gradient is the Young modulus. The
// force and the area move the point along that line but never change it, while a
// different material changes the line. Colours come from CSS classes, so the
// figure adapts to every bundle and to both schemes.
//
// The scaffolding — the surface, its accessible name, the controls, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, chooser, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label:
      "A stress-strain graph for a wire. The line is straight through the origin, and its gradient is the Young modulus of the material",
    width: 560,
    height: 262,
    max: 600,
  });

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

  const select = chooser(el, {
    id: "material",
    label: "Material",
    choices: MATERIALS.map((m) => ({ value: m.name, label: m.name })),
  });
  const forceSlider = slider(el, { show: false,
    id: "force",
    label: "Force / N",
    min: 0,
    max: 100,
    step: 5,
    value: 40,
  });
  const areaSlider = slider(el, { show: false,
    id: "area",
    label: "Area / mm²",
    min: 0.3,
    max: 1.2,
    step: 0.1,
    value: 0.4,
  });

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
          `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>${label({ x: LEFT - 9, y: (y + 4).toFixed(1), text: `${value * 100}`, anchor: "end", size: SIZE.tick, class: "text-ink" })}`
        );
      })
      .join("");

    const strainTicks = [0, 2, 4, 6]
      .map((value) => {
        const x = xFor(value * 1e-3);
        return (
          `<line x1="${x.toFixed(1)}" y1="${BASE}" x2="${x.toFixed(1)}" y2="${BASE + 5}" class="fig-ink"></line>${label({ x: x.toFixed(1), y: BASE + 18, text: `${value}`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}`
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
        ? `<polygon points="${LEFT},${BASE} ${pointX.toFixed(1)},${BASE} ${pointX.toFixed(1)},${pointY.toFixed(1)}" class="fig-good" fill-opacity="0.16"></polygon>`
        : "";

    const marker =
      stress > 0 && strain > 0
        ? `<circle cx="${pointX.toFixed(1)}" cy="${pointY.toFixed(1)}" r="5" class="fig-warn"></circle>`
        : "";

    svg.innerHTML =
      stressTicks +
      `<line x1="${LEFT}" y1="${BASE}" x2="${RIGHT}" y2="${BASE}" class="fig-ink" stroke-width="2"></line><line x1="${LEFT}" y1="${BASE}" x2="${LEFT}" y2="${TOP}" class="fig-ink" stroke-width="2"></line>` +
      strainTicks +
      `${label({ x: (LEFT + RIGHT) / 2, y: BASE + 33, text: `strain / 10⁻³`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}${label({ x: 18, y: (TOP + BASE) / 2, text: 'stress / MPa', anchor: "middle", size: SIZE.tick, class: "text-ink", rotate: -90 })}` +
      triangle +
      `<line x1="${LEFT}" y1="${BASE}" x2="${xFor(exitStrain).toFixed(1)}" y2="${yFor(exitStress).toFixed(1)}" class="fig-accent" stroke-width="3"></line>${label({ x: (xFor(exitStrain) - 6).toFixed(1), y: (yFor(exitStress) + 16).toFixed(1), text: `gradient = E`, anchor: "end", size: SIZE.tick, class: "text-accent" })}` +
      marker;

    // Two numbers are worked out and printed: the stress (force over area) and the strain
    // (stress over the Young modulus). The strain is printed in standard form, which the
    // verifier reads as a label, so its own value is what the second claim proves.
    claim([
      {
        label: "stress in megapascals, force over area",
        expression: "force / (area_mm2 * 1e-6) / 1000000",
        values: { force, area_mm2: areaMm2 },
        answer: stress / 1e6,
        shown: (stress / 1e6).toFixed(0),
      },
      {
        label: "strain, stress over the Young modulus",
        expression: "stress / E",
        values: { stress, E },
        answer: strain,
        shown: strainText(strain),
      },
    ]);
    readout.innerHTML =
      `${material.name} has Young modulus <strong>${(E / 1e9).toFixed(0)} GPa</strong>. A force of <strong>${force} N</strong> on an area of <strong>${areaMm2.toFixed(1)} mm²</strong> gives a stress of <strong>${(stress / 1e6).toFixed(0)} MPa</strong> and a strain of <strong>${strainText(strain)}</strong>. The line is straight through the origin, so the gradient of the line is the Young modulus. Changing the force or the area moves the point along this line; choosing another material changes the line. <em>Before you change a control, predict whether a thicker wire changes the gradient.</em>`;
  }

  react([select, forceSlider, areaSlider], update);
}
