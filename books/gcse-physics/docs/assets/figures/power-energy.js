// Tier-1 guided investigation: power, time and energy transferred.
//
// Guided, not a sandbox: the page asks the reader to predict which transfers more
// energy, a low-power device left on for a long time or a high-power device used
// briefly, before the sliders are moved. The figure reads out E = Pt in joules
// and in kilojoules or megajoules.
//
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes. Every value is printed as text.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. The two preset buttons are not
// one of the kit's controls, so they are built here inside the kit's control
// column. What is left is the drawing and the sentence, which are the parts that
// differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout, controls } = panel(el, {
    label:
      "A bar whose height shows the energy transferred by a device, for a chosen power and time.",
    width: 560,
    height: 170,
    max: 600,
  });

  const powerInput = slider(el, { show: false,
    id: "power",
    label: "Power (kW)",
    min: 0.1,
    max: 3,
    step: 0.1,
    value: 2,
    show: false,
  });
  const timeInput = slider(el, { show: false,
    id: "time",
    label: "Time (minutes)",
    min: 1,
    max: 60,
    step: 1,
    value: 1,
    show: false,
  });

  // The presets sit in the same control column the kit's sliders use.
  const presets = document.createElement("div");
  presets.style.cssText = "display:flex;gap:.5rem;flex-wrap:wrap";
  const preset = (id, text) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = id;
    button.textContent = text;
    presets.append(button);
    return button;
  };
  const lampButton = preset("preset-lamp", "Set the lamp (0.10 kW, 30 minutes)");
  const heaterButton = preset("preset-heater", "Set the heater (2.0 kW, 1.0 minute)");
  controls.append(presets);

  // The bar is scaled so the largest setting still fits.
  const MAX_ENERGY = 3000 * 3600;

  function formatEnergy(joules) {
    if (joules >= 1e6) return `${(joules / 1e6).toFixed(2)} MJ`;
    if (joules >= 1e3) return `${(joules / 1e3).toFixed(1)} kJ`;
    return `${Math.round(joules)} J`;
  }

  function update() {
    const kilowatts = Number(powerInput.value);
    const minutes = Number(timeInput.value);
    const watts = kilowatts * 1000;
    const seconds = minutes * 60;
    const energy = watts * seconds;

    const barHeight = Math.max(6, (energy / MAX_ENERGY) * 120);
    const barY = 140 - barHeight;

    svg.innerHTML =
      `<line x1="60" y1="140" x2="500" y2="140" class="fig-ink" stroke-width="2"></line>` +
      `<rect x="180" y="${barY.toFixed(1)}" width="90" height="${barHeight.toFixed(1)}" class="fig-accent"></rect>` +
      `<text x="225" y="${(barY - 8).toFixed(1)}" font-size="16" text-anchor="middle" class="fig-ink">${formatEnergy(energy)}</text>` +
      `<text x="225" y="158" font-size="16" text-anchor="middle" class="fig-ink">your setting</text>` +
      `<line x1="360" y1="140" x2="360" y2="20" class="fig-grid" stroke-width="2" stroke-dasharray="4 4"></line>` +
      `<text x="366" y="36" font-size="16" class="fig-ink">lamp: 0.10 kW for 30 min</text>` +
      `<text x="366" y="52" font-size="16" class="fig-ink">= 180 kJ</text>` +
      `<line x1="360" y1="80" x2="530" y2="80" class="fig-grid" stroke-width="2" stroke-dasharray="4 4"></line>` +
      `<text x="366" y="96" font-size="16" class="fig-ink">heater: 2.0 kW for 1.0 min</text>` +
      `<text x="366" y="112" font-size="16" class="fig-ink">= 120 kJ</text>`;

    readout.innerHTML =
      `Power <strong>${kilowatts.toFixed(2)} kW = ${watts} W</strong>. ` +
      `Time <strong>${minutes} minutes = ${seconds} s</strong>. ` +
      `Energy <strong>${formatEnergy(energy)}</strong> ` +
      `(${Math.round(energy)} J). ` +
      `<em>Compare your setting with the lamp and the heater. ` +
      `Which transfers the most energy, and why?</em>`;
  }

  // Setting a slider's value in script does not fire `input`, so dispatching it
  // redraws through the kit's own listeners.
  const apply = (power, minutes) => {
    powerInput.value = String(power);
    timeInput.value = String(minutes);
    powerInput.dispatchEvent(new Event("input"));
    timeInput.dispatchEvent(new Event("input"));
  };

  lampButton.addEventListener("click", () => apply(0.1, 30));
  heaterButton.addEventListener("click", () => apply(2, 1));

  react([powerInput, timeInput], update);
}
