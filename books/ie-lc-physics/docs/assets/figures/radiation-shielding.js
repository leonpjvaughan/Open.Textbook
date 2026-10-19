// Tier-1 guided investigation: how much a shield reduces a count rate.
//
// The page asks the reader to predict the count rate behind a chosen thickness of
// lead, then to move the slider and check, then to explain why the count rate
// halves again for each further 10 mm. So the figure has to make the *halving*
// visible: the slab thickens as the slider moves, and the bar inside the detector
// shrinks by half for each 10 mm.
//
// The source is a gamma emitter, because gamma is the emission that needs real
// shielding; the readout says what alpha and beta would need instead. Nothing here
// carries a colour.
//
// The scaffolding comes from `kit.js`. What is left is the drawing and the words.
import { SIZE, fmt, label, panel, react, slider } from "./kit.js";

// The count rate with no shield, in counts per minute, and the thickness of lead
// that halves it.
const A0 = 800;
const HALVING_MM = 10;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A gamma source, a lead shield of a chosen thickness, and a detector whose count rate falls as the lead thickens",
    width: 560,
    height: 230,
  });

  const thickness = slider(el, {
    show: true,
    id: "thickness",
    label: "Thickness of lead",
    min: 0,
    max: 50,
    step: 5,
    value: 20,
    unit: "mm",
  });

  function update() {
    const mm = Number(thickness.value);
    const factor = Math.pow(2, -mm / HALVING_MM);
    const rate = A0 * factor;

    const BAR_BASE = 176;
    const BAR_TOP = 46;
    const barHeight = Math.max(0, (BAR_BASE - BAR_TOP) * factor);
    const slabWidth = 8 + mm * 2.6;

    let drawing = "";

    // The source and the beam.
    drawing += `<circle cx="42" cy="112" r="13" class="fig-warn"></circle>`;
    drawing += label({ x: 42, y: 146, text: "source", size: SIZE.tick });
    drawing += `<line x1="58" y1="112" x2="500" y2="112" class="fig-grid" stroke-width="2" stroke-dasharray="6 5"></line>`;

    // The lead shield, drawn as a solid slab that thickens with the slider.
    drawing += `<rect x="176" y="52" width="${slabWidth.toFixed(1)}" height="120" rx="3" class="fig-grid" stroke-width="2"></rect>`;
    drawing += label({ x: 176 + slabWidth / 2, y: 196, text: "lead", size: SIZE.tick });

    // The detector, with a bar whose height is the count rate.
    drawing += `<rect x="436" y="52" width="60" height="124" rx="6" style="fill:none" class="fig-accent" stroke-width="2.5"></rect>`;
    drawing += `<rect x="452" y="${(BAR_BASE - barHeight).toFixed(1)}" width="28" height="${barHeight.toFixed(1)}" class="fig-accent"></rect>`;
    drawing += label({ x: 466, y: 196, text: "detector", size: SIZE.tick });
    drawing += `<line x1="436" y1="${BAR_TOP}" x2="496" y2="${BAR_TOP}" class="fig-grid" stroke-width="1.5" stroke-dasharray="3 3"></line>`;
    drawing += label({ x: 520, y: BAR_TOP + 6, text: "no shield", size: SIZE.tick, anchor: "end" });

    svg.innerHTML = drawing;

    const halfLives = mm / HALVING_MM;
    readout.textContent =
      mm === 0
        ? `No shield: the detector records the full ${A0} counts per minute.`
        : `${mm} mm of lead is ${fmt(halfLives, 1)} halving thicknesses, so the count rate is divided by ${fmt(Math.pow(2, halfLives), 2)}: about ${fmt(rate, 3)} counts per minute. Alpha particles need only paper and beta particles only a few millimetres of aluminium; gamma needs lead.`;
  }

  react([thickness], update);
}
