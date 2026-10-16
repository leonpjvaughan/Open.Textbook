// Tier-2 guided tool: balancing a nuclear equation.
//
// The page asks the reader to predict the daughter's mass number and atomic
// number, then to change the parent or the emission and check, then to explain
// which total is conserved by which number. So the figure has to make the two
// conservation sums visible at once, and update them as the choice changes.
//
// It draws the parent, the emission and the daughter as labelled boxes with an
// arrow between them, and prints the two sums under them. Nothing here carries a
// colour; the three boxes use `fig-*` classes and text styles that survive a
// monochrome bundle.
//
// The scaffolding comes from `kit.js`. What is left is the drawing and the words.
import { SIZE, chooser, label, panel, react } from "./kit.js";

// The parents a reader meets in this chapter, with their mass number and atomic
// number. The element symbol for the daughter comes from `SYMBOLS` by atomic
// number, so the figure cannot pair the wrong name with a number.
const PARENTS = {
  "U-238": { a: 238, z: 92 },
  "C-14": { a: 14, z: 6 },
  "Am-241": { a: 241, z: 95 },
  "Rn-222": { a: 222, z: 86 },
  "P-32": { a: 32, z: 15 },
};

const EMISSIONS = {
  alpha: { name: "alpha particle", a: 4, z: 2, symbol: "He" },
  beta: { name: "beta particle", a: 0, z: -1, symbol: "e" },
  gamma: { name: "gamma ray", a: 0, z: 0, symbol: "" },
};

const SYMBOLS = {
  2: "He",
  6: "C",
  7: "N",
  15: "P",
  16: "S",
  84: "Po",
  86: "Rn",
  87: "Fr",
  90: "Th",
  92: "U",
  93: "Np",
  95: "Am",
};

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A parent nucleus, the emission and the daughter nucleus, with the mass numbers and atomic numbers that balance",
    width: 560,
    height: 240,
  });

  const parent = chooser(el, {
    id: "parent",
    label: "Parent nucleus",
    choices: Object.keys(PARENTS).map((key) => ({ value: key, label: key })),
    value: "U-238",
  });

  const emission = chooser(el, {
    id: "emission",
    label: "Emission",
    choices: [
      { value: "alpha", label: "Alpha" },
      { value: "beta", label: "Beta" },
      { value: "gamma", label: "Gamma" },
    ],
    value: "alpha",
  });

  function box(x, y, w, h, lines) {
    let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="none" class="fig-grid" stroke-width="2"></rect>`;
    lines.forEach((line, index) => {
      out += label({
        x: x + w / 2,
        y: y + 32 + index * 24,
        text: line,
        size: index === 0 ? SIZE.value : SIZE.label,
        class: index === 0 ? "text-ink" : "text-accent",
        weight: index === 0 ? 600 : undefined,
      });
    });
    return out;
  }

  function update() {
    const p = PARENTS[parent.value];
    const e = EMISSIONS[emission.value];
    const daughterA = p.a - e.a;
    const daughterZ = p.z - e.z;
    const symbol = SYMBOLS[daughterZ] || "?";

    let drawing = "";
    drawing += box(40, 46, 160, 88, [`A = ${p.a}`, `Z = ${p.z} (${SYMBOLS[p.z] || "?"})`]);
    drawing += `<line x1="214" y1="90" x2="336" y2="90" class="fig-ink" stroke-width="2.5"></line>`;
    drawing += `<path d="M336 90 l-12 -7 l0 14 z" class="fig-ink"></path>`;
    drawing += label({
      x: 275,
      y: 122,
      text: e.symbol ? `${e.name} (${e.symbol})` : e.name,
      size: SIZE.tick,
    });
    drawing += box(360, 46, 160, 88, [`A = ${daughterA}`, `Z = ${daughterZ} (${symbol})`]);

    // The two sums, kept apart so the reader can check each total.
    drawing += label({
      x: 280,
      y: 178,
      text: `mass number: ${p.a} = ${daughterA} + ${e.a}`,
      size: SIZE.value,
      class: "text-ink",
    });
    drawing += label({
      x: 280,
      y: 208,
      text: `atomic number: ${p.z} = ${daughterZ} + ${e.z}`,
      size: SIZE.value,
      class: "text-ink",
    });

    svg.innerHTML = drawing;

    readout.textContent = `${parent.value} emits ${e.name}. The daughter has mass number ${p.a} - ${e.a} = ${daughterA} and atomic number ${p.z} - ${e.z} = ${daughterZ}, so it is ${symbol}-${daughterA}. The mass number total and the atomic number total are each the same on both sides.`;
  }

  react([parent, emission], update);
}
