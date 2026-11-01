// Tier-1 guided investigation: the size of the SI prefixes.
//
// Guided, not a sandbox: the page asks the reader to predict where a micrometre
// sits before moving the slider, and to explain the spacing afterwards. The
// slider walks the prefixes the section lists, and the drawing is a logarithmic
// ruler of length in metres from a nanometre to a gigametre. Each prefix carries
// a familiar object, so the reader meets the scale rather than reading it from a
// table, and the gaps between the marks show that a step is usually a factor of
// 1000 but sometimes only 10.
//
// Colours come from CSS classes, so the figure follows every bundle and both
// schemes. No colour literal appears here, and no runtime LaTeX: the readout is
// plain HTML with Unicode superscripts.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const PREFIXES = [
    {
      name: "nano",
      symbol: "n",
      exponent: -9,
      factor: "10⁻⁹",
      unit: "1 nm",
      value: "0.000 000 001",
      object: "a water molecule",
    },
    {
      name: "micro",
      symbol: "µ",
      exponent: -6,
      factor: "10⁻⁶",
      unit: "1 µm",
      value: "0.000 001",
      object: "a bacterium",
    },
    {
      name: "milli",
      symbol: "m",
      exponent: -3,
      factor: "10⁻³",
      unit: "1 mm",
      value: "0.001",
      object: "a grain of sand",
    },
    {
      name: "centi",
      symbol: "c",
      exponent: -2,
      factor: "10⁻²",
      unit: "1 cm",
      value: "0.01",
      object: "a fingernail",
    },
    {
      name: "no prefix",
      symbol: "m",
      exponent: 0,
      factor: "1",
      unit: "1 m",
      value: "1",
      object: "a person",
    },
    {
      name: "kilo",
      symbol: "k",
      exponent: 3,
      factor: "10³",
      unit: "1 km",
      value: "1000",
      object: "a small town",
    },
    {
      name: "mega",
      symbol: "M",
      exponent: 6,
      factor: "10⁶",
      unit: "1 Mm",
      value: "1 000 000",
      object: "a country",
    },
    {
      name: "giga",
      symbol: "G",
      exponent: 9,
      factor: "10⁹",
      unit: "1 Gm",
      value: "1 000 000 000",
      object: "the Sun",
    },
  ];

  const E_MIN = -9;
  const E_MAX = 9;
  const LEFT = 70;
  const RIGHT = 620;
  const AXIS = 150;

  const { svg, readout } = panel(el, {
    label:
      "A logarithmic ruler of length in metres from a nanometre to a gigametre, with a marker that moves to the prefix you choose and a familiar object at every prefix",
    width: 660,
    height: 220,
    max: 660,
  });

  const prefixInput = slider(el, { show: true,
    id: "prefix",
    label: "Prefix",
    name: "Choose an SI prefix",
    min: 0,
    max: 7,
    step: 1,
    value: 4,
    format: (value) => {
      const chosen = PREFIXES[Number(value)];
      return Number(value) === 4
        ? "the metre itself"
        : `${chosen.name} (${chosen.symbol})`;
    },
  });

  const xFor = (exponent) =>
    LEFT + ((exponent - E_MIN) / (E_MAX - E_MIN)) * (RIGHT - LEFT);

  function update() {
    const selected = Number(prefixInput.value);
    const chosen = PREFIXES[selected];

    // A faint mark on every decade, so the uneven spacing of the prefixes is
    // visible: milli to centi is one step but only one decade.
    let decades = "";
    for (let exponent = E_MIN; exponent <= E_MAX; exponent += 1) {
      const x = xFor(exponent).toFixed(1);
      decades +=
        `<line x1="${x}" y1="${AXIS - 3}" x2="${x}" y2="${AXIS + 3}" class="fig-grid"></line>`;
    }

    // One named prefix mark, its symbol below the axis and its object above.
    // The object labels alternate between two rows so that neighbours do not
    // collide.
    let marks = "";
    PREFIXES.forEach((prefix, index) => {
      const x = xFor(prefix.exponent).toFixed(1);
      const row = index % 2 === 0 ? 104 : 74;
      const state = index === selected ? "text-accent" : "text-ink";
      marks +=
        `<line x1="${x}" y1="${AXIS - 8}" x2="${x}" y2="${AXIS + 8}" class="fig-ink" stroke-width="1.5"></line>` +
        `${label({ x: x, y: AXIS + 22, text: `${prefix.symbol}`, anchor: "middle", size: SIZE.heading, class: state })}` +
        `${label({ x: Math.max(84, Math.min(x, 538)), y: row, text: `${prefix.object}`, anchor: "middle", size: SIZE.heading, class: state })}`;
    });

    // The factor between each pair of neighbours.
    let gaps = "";
    for (let index = 0; index < PREFIXES.length - 1; index += 1) {
      const mid = xFor(
        (PREFIXES[index].exponent + PREFIXES[index + 1].exponent) / 2,
      ).toFixed(1);
      const power = PREFIXES[index + 1].exponent - PREFIXES[index].exponent;
      const text = power === 1 ? "×10" : power === 2 ? "×100" : "×1000";
      gaps +=
        `${label({ x: mid, y: AXIS + 40, text: `${text}`, anchor: "middle", size: SIZE.heading, class: "text-ink" })}`;
    }

    const markerX = xFor(chosen.exponent).toFixed(1);
    const markerRow = selected % 2 === 0 ? 104 : 74;
    const marker =
      `<line x1="${markerX}" y1="${AXIS}" x2="${markerX}" y2="${markerRow + 6}" ` +
      `class="fig-accent" stroke-dasharray="3 3"></line>` +
      `<circle cx="${markerX}" cy="${AXIS}" r="6" class="fig-accent"></circle>`;

    svg.innerHTML =
      decades +
      `<line x1="${LEFT}" y1="${AXIS}" x2="${RIGHT}" y2="${AXIS}" class="fig-ink"></line>` +
      marks +
      gaps +
      marker +
      `${label({ x: RIGHT, y: AXIS + 62, text: `length in metres, on a logarithmic scale`, anchor: "end", size: SIZE.heading, class: "text-ink" })}`;

    const sentence =
      selected === 4
        ? `With no prefix the unit is the metre itself. One metre is the base unit of length, about the height of a person.`
        : `<strong>${chosen.name}</strong> (${chosen.symbol}) multiplies a unit by <strong>${chosen.factor}</strong>. ` +
          `So ${chosen.unit} is ${chosen.value} m, about ${chosen.object}.`;
    readout.innerHTML =
      sentence +
      ` <em>Which two neighbouring marks differ by a factor of 10, not 1000?</em>`;
  }

  react(prefixInput, update);
}
