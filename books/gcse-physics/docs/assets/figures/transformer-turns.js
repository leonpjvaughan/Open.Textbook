// Tier-1 guided investigation: how the turns of a transformer set the output.
//
// The page asks the reader to predict whether more secondary turns raise or
// lower the output, then to test, then to explain why the potential difference
// per turn is the same in both coils. The figure assumes a 100% efficient
// transformer, which the page states. Colours come from CSS classes.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A transformer with a primary coil and a secondary coil on a closed iron core. The turns and the primary potential difference can be changed, and the secondary potential difference is shown",
    width: 560,
    height: 260,
  });

  const npInput = slider(el, { show: false,
    id: "np",
    label: "Primary turns",
    min: 100,
    max: 1000,
    step: 100,
    value: 400,
  });
  const nsInput = slider(el, { show: false,
    id: "ns",
    label: "Secondary turns",
    min: 100,
    max: 1000,
    step: 100,
    value: 100,
  });
  const vpInput = slider(el, { show: false,
    id: "vp",
    label: "Primary p.d. (V)",
    min: 12,
    max: 240,
    step: 12,
    value: 240,
  });

  function formatVolts(value) {
    const rounded = Math.round(value * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  }

  function update() {
    const np = Number(npInput.value);
    const ns = Number(nsInput.value);
    const vp = Number(vpInput.value);
    const vs = (vp * ns) / np;

    const core = `
      <rect x="180" y="50" width="200" height="14" class="fig-ink" opacity="0.2"></rect>
      <rect x="180" y="196" width="200" height="14" class="fig-ink" opacity="0.2"></rect>
      <rect x="180" y="50" width="14" height="160" class="fig-ink" opacity="0.2"></rect>
      <rect x="366" y="50" width="14" height="160" class="fig-ink" opacity="0.2"></rect>
      ${label({ x: 280, y: 38, text: `iron core`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}`;

    function coil(x, turns, cls) {
      const loops = Math.max(1, Math.round(turns / 100));
      const gap = 110 / loops;
      let out = "";
      for (let i = 0; i < loops; i += 1) {
        const y = 80 + i * gap;
        out += `<rect x="${x}" y="${y.toFixed(1)}" width="58" height="9" rx="4" ` +
          `class="${cls}" fill="none" stroke-width="3"></rect>`;
      }
      return out;
    }

    const primary = coil(158, np, "fig-accent");
    const secondary = coil(344, ns, "fig-warn");

    const labels = `
      ${label({ x: 150, y: 222, text: `primary ${np} turns`, anchor: "middle", size: SIZE.value, class: "text-accent" })}
      ${label({ x: 410, y: 222, text: `secondary ${ns} turns`, anchor: "middle", size: SIZE.value, class: "text-warn" })}
      ${label({ x: 150, y: 240, text: `${vp} V`, anchor: "middle", size: SIZE.value, class: "text-ink" })}
      ${label({ x: 410, y: 240, text: `${formatVolts(vs)} V`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`;

    svg.innerHTML = core + primary + secondary + labels;

    let kind = "step-down";
    if (ns > np) kind = "step-up";
    if (ns === np) kind = "same";
    readout.innerHTML =
      `Primary <strong>${vp} V</strong> with <strong>${np}</strong> turns; ` +
      `secondary <strong>${ns}</strong> turns. ` +
      `So the secondary p.d. is <strong>${formatVolts(vs)} V</strong>, and this is a ` +
      `<strong>${kind}</strong> transformer. ` +
      `<em>Now make the secondary turns larger than the primary turns.</em>`;
  }

  react([npInput, nsInput, vpInput], update);
}
