// Tier-1 guided investigation: the strength of an electromagnet.
//
// The page asks the reader to predict the effect of doubling the current, of
// adding turns, and of switching off the current, then to test with the sliders,
// then to explain why more turns strengthen the field. The figure reports a
// relative field strength, not a measured one, so the numbers teach proportion
// without pretending to be tesla. Colours come from CSS classes.
//
// The scaffolding — the surface, its accessible name, the controls, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider, toggle } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A solenoid coil wound on an iron core. The current and the number of turns can be changed, and a bar shows the relative field strength",
    width: 560,
    height: 180,
  });

  const currentInput = slider(el, { show: false,
    id: "current",
    label: "Current (A)",
    min: 0,
    max: 5,
    step: 0.5,
    value: 1,
  });
  const turnsInput = slider(el, { show: false,
    id: "turns",
    label: "Turns",
    min: 100,
    max: 1000,
    step: 100,
    value: 400,
  });
  const switchInput = toggle(el, { id: "switch", label: "current on", checked: true });

  function update() {
    const current = Number(currentInput.value);
    const turns = Number(turnsInput.value);
    const on = switchInput.checked;
    const strength = on ? turns * current : 0;
    const ratio = strength / 100;

    const core = `
      <rect x="120" y="70" width="320" height="30" rx="5" class="fig-ink" opacity="0.18"></rect>
      ${label({ x: 112, y: 92, text: `iron core`, anchor: "end", size: SIZE.tick, class: "text-ink" })}`;

    const loops = Math.max(1, Math.round(turns / 100));
    const gap = 280 / loops;
    let coil = "";
    for (let i = 0; i < loops; i += 1) {
      const x = 140 + i * gap;
      coil += `<rect x="${x.toFixed(1)}" y="62" width="10" height="46" rx="5" ` +
        `class="fig-accent" fill="none" stroke-width="3"></rect>`;
    }

    const barWidth = 400 * (strength / 5000);
    const bar = `
      <rect x="80" y="145" width="400" height="18" rx="4" class="fig-grid" opacity="0.4"></rect>
      <rect x="80" y="145" width="${barWidth.toFixed(1)}" height="18" rx="4" class="fig-accent"></rect>
      ${label({ x: 80, y: 138, text: `field strength`, anchor: "start", size: SIZE.tick, class: "text-ink" })}`;

    svg.innerHTML = core + coil + bar;

    const times = ratio.toFixed(1);
    readout.innerHTML = on
      ? `Current <strong>${current.toFixed(1)} A</strong>, turns <strong>${turns}</strong>. ` +
        `The field strength is <strong>${strength}</strong> in relative units. ` +
        `That is <strong>${times} times</strong> the field at 100 turns and 1.0 A. ` +
        `<em>Now double the current. What happens to the field?</em>`
      : `The current is switched off, so the field is <strong>zero</strong> and the ` +
        `crane would drop its load. <em>Switch the current on and watch the field return.</em>`;
  }

  react([currentInput, turnsInput, switchInput], update);
}
