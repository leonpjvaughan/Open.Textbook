// Tier-1 guided investigation: density from mass and volume.
//
// Guided, not a sandbox: the page asks the reader to predict whether the ice
// block floats in water before the sliders are moved, then to explain the result
// with the particle model. The figure compares the density with the density of
// water, which is drawn as a marked line.
//
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes. No maths is injected at runtime: every value is plain text.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. The three preset buttons are not
// one of the kit's controls, so they are built here inside the kit's control
// column. What is left is the drawing and the sentences, which are the parts that
// differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A bar whose length shows the density of a chosen mass and volume, with a marked line for the density of water",
    width: 560,
    height: 190,
  });

  const massInput = slider(el, { show: false,
    id: "mass",
    label: "Mass (kg)",
    min: 0.2,
    max: 5,
    step: 0.1,
    value: 2.3,
  });
  const volumeInput = slider(el, { show: false,
    id: "volume",
    label: "Volume (cm cubed)",
    min: 200,
    max: 6000,
    step: 100,
    value: 2500,
  });

  // The presets sit in the same control column the kit's sliders use.
  const controls = el.querySelector(".fig-controls");
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
  const iceButton = preset("preset-ice", "Set the ice block");
  const waterButton = preset("preset-water", "Set liquid water");
  const aluminiumButton = preset("preset-aluminium", "Set aluminium");
  controls.append(presets);

  const WATER = 1000;
  const MAX_DENSITY = 3000;

  function draw(mass, volumeCm3) {
    const volumeM3 = volumeCm3 / 1e6;
    const density = mass / volumeM3;
    const barWidth = Math.min(430, (density / MAX_DENSITY) * 430);
    const waterX = 70 + (WATER / MAX_DENSITY) * 430;
    const floats = density < WATER;

    svg.innerHTML =
      `<line x1="70" y1="70" x2="520" y2="70" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="70" y1="70" x2="70" y2="30" class="fig-ink" stroke-width="2"></line>` +
      `<rect x="70" y="46" width="${barWidth.toFixed(1)}" height="24" class="fig-accent"></rect>` +
      `<line x1="${waterX.toFixed(1)}" y1="24" x2="${waterX.toFixed(1)}" y2="86" class="fig-warn" stroke-width="2" stroke-dasharray="4 4"></line>` +
      `${label({ x: waterX.toFixed(1), y: 18, text: `water 1000`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}` +
      `${label({ x: 70, y: 108, text: `density (kg/m3)`, anchor: "start", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: 70, y: 132, text: `${Math.round(density)} kg/m3`, anchor: "start", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: 70, y: 156, text: `${
        floats ? "floats in water" : "sinks in water"
      }`, anchor: "start", size: SIZE.heading, class: "text-ink" })}`;

    readout.innerHTML =
      `Mass <strong>${mass.toFixed(1)} kg</strong>. ` +
      `Volume <strong>${volumeCm3} cm3 = ${volumeM3.toExponential(2)} m3</strong>. ` +
      `Density <strong>${Math.round(density)} kg/m3</strong>. ` +
      `<em>Compare your density with the water line. Does the material float, ` +
      `and what does that tell you about its particles?</em>`;
  }

  function update() {
    draw(Number(massInput.value), Number(volumeInput.value));
  }

  // Setting a slider's value in script does not fire `input`, so the kit's own
  // number display would keep the old value. Dispatching it redraws and refreshes
  // the display in one step.
  const apply = (mass, volume) => {
    massInput.value = String(mass);
    volumeInput.value = String(volume);
    massInput.dispatchEvent(new Event("input"));
    volumeInput.dispatchEvent(new Event("input"));
  };

  iceButton.addEventListener("click", () => apply(2.3, 2500));
  waterButton.addEventListener("click", () => apply(1.0, 1000));
  aluminiumButton.addEventListener("click", () => apply(2.7, 1000));

  react([massInput, volumeInput], update);
}
