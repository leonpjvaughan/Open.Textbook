// Tier-1 guided investigation: a fission chain reaction and its control.
//
// Guided, not a sandbox: the page asks the reader to predict what happens when
// two or three neutrons from each fission continue the chain, then to explain
// why a reactor holds the number at one. The top drawing shows one fission
// event; the chart counts the neutrons released in each generation as the reader
// moves the slider. Colours come from CSS classes, so the figure adapts to every
// bundle and both schemes, and every shape is also labelled in words.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "One neutron striking a uranium-235 nucleus, which splits into two smaller nuclei and releases three neutrons, above a chart of the neutrons released in each generation",
    width: 620,
    height: 370,
    max: 620,
  });

  const multiplyInput = slider(el, { show: false,
    id: "multiply",
    label: "Neutrons from each fission that cause the next fission:",
    min: 0,
    max: 3,
    step: 1,
    value: 2,
  });

  function update() {
    const r = Number(multiplyInput.value);

    // Generation 1 is the first fission. With r neutrons continuing, the
    // neutrons released are 3, 3r, 3r squared for the first three generations.
    const generations = [1, 2, 3];
    const counts = generations.map((g) => 3 * r ** (g - 1));
    const TOP = 200;
    const BOTTOM = 310;
    const LEFT = 70;
    const RIGHT = 560;
    const MAX = 27;
    const slot = (RIGHT - LEFT) / generations.length;
    const barWidth = slot * 0.5;
    const names = ["first", "second", "third"];

    const bars = generations
      .map((g, i) => {
        const count = counts[i];
        const height = (count / MAX) * (BOTTOM - TOP);
        const x = LEFT + slot * i + (slot - barWidth) / 2;
        const y = BOTTOM - height;
        const centre = x + barWidth / 2;
        return (
          `${label({ x: centre.toFixed(1), y: (y - 6).toFixed(1), text: `${count}`, anchor: "middle", size: SIZE.heading, class: "text-ink" })}` +
          `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth.toFixed(1)}" ` +
          `height="${Math.max(height, 0).toFixed(1)}" class="fig-accent"></rect>` +
          `${label({ x: centre.toFixed(1), y: BOTTOM + 18, text: `${names[i]}`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`
        );
      })
      .join("");

    const steadyY = BOTTOM - (3 / MAX) * (BOTTOM - TOP);

    const schematic =
      // The incoming neutron and the nucleus it strikes.
      `<circle cx="34" cy="65" r="7" class="fig-warn"></circle>` +
      `${label({ x: 34, y: 90, text: `neutron`, anchor: "middle", size: SIZE.value, class: "text-ink" })}` +
      `<line x1="46" y1="65" x2="72" y2="65" class="fig-ink" stroke-width="2"></line>` +
      `<polygon points="76,65 66,59 66,71" class="fig-ink"></polygon>` +
      `<circle cx="112" cy="65" r="24" class="fig-accent"></circle>` +
      `${label({ x: 112, y: 104, text: `U-235`, anchor: "middle", size: SIZE.heading, class: "text-ink" })}` +
      // The split into two smaller nuclei.
      `<line x1="138" y1="65" x2="168" y2="42" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="138" y1="65" x2="168" y2="88" class="fig-ink" stroke-width="2"></line>` +
      `<circle cx="196" cy="38" r="16" class="fig-good"></circle>` +
      `${label({ x: 196, y: 18, text: `Ba`, anchor: "middle", size: SIZE.value, class: "text-ink" })}` +
      `<circle cx="196" cy="92" r="16" class="fig-good"></circle>` +
      `${label({ x: 196, y: 122, text: `Kr`, anchor: "middle", size: SIZE.value, class: "text-ink" })}` +
      // The three neutrons released.
      `<circle cx="288" cy="24" r="7" class="fig-warn"></circle>` +
      `<circle cx="288" cy="65" r="7" class="fig-warn"></circle>` +
      `<circle cx="288" cy="106" r="7" class="fig-warn"></circle>` +
      `${label({ x: 306, y: 69, text: `three neutrons`, anchor: "start", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: 30, y: 160, text: `A neutron strikes the nucleus. The nucleus splits and releases three neutrons.`, anchor: "start", size: SIZE.heading, class: "text-ink" })}`;

    const chart =
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `${label({ x: LEFT - 8, y: TOP + 4, text: `neutrons`, anchor: "end", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: RIGHT, y: BOTTOM + 36, text: `generation`, anchor: "end", size: SIZE.value, class: "text-ink" })}` +
      `<line x1="${LEFT}" y1="${steadyY.toFixed(1)}" x2="${RIGHT}" y2="${steadyY.toFixed(1)}" ` +
      `class="fig-grid" stroke-dasharray="4 4"></line>` +
      `${label({ x: RIGHT + 4, y: (steadyY + 4).toFixed(1), text: `steady`, anchor: "start", size: SIZE.value, class: "text-ink" })}` +
      bars;

    svg.innerHTML = schematic + chart;

    const growth =
      r === 0
        ? "the chain reaction stops"
        : r === 1
          ? "the chain reaction runs at a steady rate"
          : "the chain reaction grows";
    readout.innerHTML =
      `Each fission releases three neutrons. With <strong>${r}</strong> neutron${r === 1 ? "" : "s"} ` +
      `from each fission causing the next fission, the neutrons released in each ` +
      `generation are <strong>${counts.join(", ")}</strong>. So ${growth}. ` +
      (r === 1
        ? `<em>This is the setting a reactor keeps. Why must the average be exactly one neutron?</em>`
        : `<em>Move the slider to one. What happens to the chain reaction?</em>`);
  }

  react(multiplyInput, update);
}
