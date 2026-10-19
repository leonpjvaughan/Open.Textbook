// Tier-1 guided investigation: how the current is shared between parallel
// branches.
//
// Guided, not a sandbox: the page asks the reader to predict which branch
// carries the larger current, whether the other branch is affected, and whether
// the current from the supply is larger than either branch current, before a
// control is touched. The figure draws two resistors in parallel across an ideal
// supply and reads out the three currents and the equivalent resistance. Every
// wire is drawn thicker when it carries more current, and every value is also
// written out, so thickness is never the only signal.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to both
// schemes. No colour literal appears here, and no runtime LaTeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import {
  label,
  panel,
  quantity,
  react,
  slider,
  SIZE,
} from "./kit.js";

export function mount(el) {
  const SUPPLY = 12; // volts, held constant by an ideal supply
  const R_MIN = 2; // ohms
  const R_MAX = 20; // ohms
  const PEAK = SUPPLY / R_MIN + SUPPLY / R_MIN; // the largest total current, in amperes

  const { svg, readout } = panel(el, {
    label:
      "Two resistors in parallel across a twelve volt supply, with the current in each branch, the total current from the supply, and the equivalent resistance",
    width: 600,
    height: 330,
    max: 600,
  });

  const r1 = slider(el, { show: false,
    id: "r1",
    label: "Resistance in branch 1 (\u03a9)",
    min: R_MIN,
    max: R_MAX,
    step: 1,
    value: 10,
  });
  const r2 = slider(el, { show: false,
    id: "r2",
    label: "Resistance in branch 2 (\u03a9)",
    min: R_MIN,
    max: R_MAX,
    step: 1,
    value: 20,
  });

  // A wire is drawn thicker when it carries more current, so the path that
  // carries the total current stands out from a branch. The values are printed
  // too, so thickness is never the only signal.
  const wireWidth = (amps) => (2 + 4 * Math.sqrt(amps / PEAK)).toFixed(1);
  const arrow = (x, y, direction) => {
    if (direction === "right") {
      return `<polygon points="${x},${y} ${x + 12},${y - 7} ${x + 12},${y + 7}" class="fig-accent"></polygon>`;
    }
    if (direction === "left") {
      return `<polygon points="${x},${y} ${x - 12},${y - 7} ${x - 12},${y + 7}" class="fig-accent"></polygon>`;
    }
    return `<polygon points="${x},${y} ${x - 7},${y + 12} ${x + 7},${y + 12}" class="fig-accent"></polygon>`;
  };

  function update() {
    const ohms1 = Number(r1.value);
    const ohms2 = Number(r2.value);
    const current1 = SUPPLY / ohms1;
    const current2 = SUPPLY / ohms2;
    const total = current1 + current2;
    const equivalent = SUPPLY / total;

    svg.innerHTML =
      // The supply on the left, drawn as a cell with a long positive plate.
      `<line x1="88" y1="145" x2="132" y2="145" class="fig-ink" stroke-width="3"></line>` +
      `<line x1="98" y1="163" x2="122" y2="163" class="fig-ink" stroke-width="7"></line>` +
      `${label({ x: 80, y: 150, text: `12 V`, anchor: "end", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: 80, y: 166, text: `ideal`, anchor: "end", size: SIZE.value, class: "text-ink" })}` +
      // The left rail, the top rail and the bottom rail.
      `<line x1="110" y1="70" x2="110" y2="145" class="fig-ink" stroke-width="${wireWidth(total)}"></line>` +
      `<line x1="110" y1="163" x2="110" y2="250" class="fig-ink" stroke-width="${wireWidth(total)}"></line>` +
      `<line x1="110" y1="70" x2="270" y2="70" class="fig-ink" stroke-width="${wireWidth(total)}"></line>` +
      `<line x1="270" y1="70" x2="430" y2="70" class="fig-ink" stroke-width="${wireWidth(current2)}"></line>` +
      `<line x1="270" y1="250" x2="110" y2="250" class="fig-ink" stroke-width="${wireWidth(total)}"></line>` +
      `<line x1="430" y1="250" x2="270" y2="250" class="fig-ink" stroke-width="${wireWidth(current2)}"></line>` +
      // The two branches, each with a resistor.
      `<line x1="270" y1="70" x2="270" y2="130" class="fig-ink" stroke-width="${wireWidth(current1)}"></line>` +
      `<line x1="270" y1="190" x2="270" y2="250" class="fig-ink" stroke-width="${wireWidth(current1)}"></line>` +
      `<rect x="255" y="130" width="30" height="60" class="fig-accent"></rect>` +
      `${label({ x: 295, y: 154, text: `R1 = ${ohms1} Ω`, anchor: "start", size: SIZE.value, class: "text-ink" })}` +
      `<line x1="430" y1="70" x2="430" y2="130" class="fig-ink" stroke-width="${wireWidth(current2)}"></line>` +
      `<line x1="430" y1="190" x2="430" y2="250" class="fig-ink" stroke-width="${wireWidth(current2)}"></line>` +
      `<rect x="415" y="130" width="30" height="60" class="fig-accent"></rect>` +
      `${label({ x: 455, y: 154, text: `R2 = ${ohms2} Ω`, anchor: "start", size: SIZE.value, class: "text-ink" })}` +
      // The junction where the current splits and rejoins.
      `<circle cx="270" cy="70" r="3" class="fig-ink"></circle>` +
      `<circle cx="270" cy="250" r="3" class="fig-ink"></circle>` +
      // The direction of the current in each part of the circuit.
      arrow(190, 70, "right") +
      arrow(350, 70, "right") +
      arrow(270, 105, "down") +
      arrow(430, 105, "down") +
      arrow(350, 250, "left") +
      arrow(190, 250, "left") +
      // The current in each part, written out.
      `${label({ x: 190, y: 56, text: `${quantity(total, "A", 2)}`, anchor: "middle", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: 350, y: 56, text: `${quantity(current2, "A", 2)}`, anchor: "middle", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: 256, y: 100, text: `${quantity(current1, "A", 2)}`, anchor: "end", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: 444, y: 100, text: `${quantity(current2, "A", 2)}`, anchor: "start", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: 350, y: 270, text: `${quantity(current2, "A", 2)}`, anchor: "middle", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: 190, y: 270, text: `${quantity(total, "A", 2)}`, anchor: "middle", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: 350, y: 300, text: `12 V across each branch`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`;

    readout.innerHTML =
      `The supply is ideal, so the potential difference across each branch stays at ` +
      `<strong>12 V</strong>. Branch 1 carries <strong>${quantity(current1, "A", 2)}</strong> ` +
      `and branch 2 carries <strong>${quantity(current2, "A", 2)}</strong>. The two currents ` +
      `add to <strong>${quantity(total, "A", 2)}</strong> from the supply, so the equivalent ` +
      `resistance is <strong>${equivalent.toFixed(2)} &Omega;</strong>. ` +
      `<em>Change one resistance. Does the current in the other branch change?</em>`;
  }

  react([r1, r2], update);
}
