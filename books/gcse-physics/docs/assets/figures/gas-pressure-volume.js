// Tier-1 guided investigation: pressure and volume for a fixed mass of gas.
//
// Guided, not a sandbox: the page asks the reader to predict what happens to the
// pressure when the volume is halved, then to explain the result with the
// particle model. The reader sets the volume at a constant temperature; the
// figure draws the container and reads out the pressure and the value of pV.
//
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes. No maths is injected at runtime: every value is plain text.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. The two preset buttons are not
// one of the kit's controls, so they are built here inside the kit's control
// column. What is left is the drawing and the sentence, which are the parts that
// differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout, controls } = panel(el, {
    label:
      "A cylinder of gas with a movable piston, showing more particles per unit volume and a higher pressure as the gas is compressed",
    width: 560,
    height: 170,
  });

  const volumeSlider = slider(el, { show: false,
    id: "volume",
    label: "Volume (m cubed)",
    min: 0.2,
    max: 2,
    step: 0.05,
    value: 1,
    show: false,
  });

  // The presets sit in the same control column the kit's slider uses.
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
  const startButton = preset("preset-start", "Start (1.00 m3)");
  const halfButton = preset("preset-half", "Half the volume (0.50 m3)");
  controls.append(presets);

  const PV = 100; // the value of pV in kPa times cubic metres
  const V_MAX = 2.0;
  const LEFT = 60;
  const WIDTH_MAX = 420;
  const TOP = 30;
  const HEIGHT = 100;

  // Fixed particle positions, scaled to the container, so a smaller volume packs
  // the same number of particles into a smaller space.
  const PARTICLES = [];
  for (let i = 0; i < 28; i += 1) {
    PARTICLES.push({
      u: ((i * 0.618) % 1) * 0.94 + 0.03,
      v: ((i * 0.381 + 0.2) % 1) * 0.9 + 0.05,
    });
  }

  function update() {
    const volume = Number(volumeSlider.value);
    const pressure = PV / volume;
    const width = (volume / V_MAX) * WIDTH_MAX;

    let dots = "";
    PARTICLES.forEach((p) => {
      const x = LEFT + p.u * width;
      const y = TOP + p.v * HEIGHT;
      dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" class="fig-accent"></circle>`;
    });

    svg.innerHTML =
      `<rect x="${LEFT}" y="${TOP}" width="${width.toFixed(1)}" height="${HEIGHT}" class="fig-ink" fill="none" stroke-width="2"></rect>` +
      `<line x1="${(LEFT + width).toFixed(1)}" y1="${TOP - 18}" x2="${(LEFT + width).toFixed(1)}" y2="${TOP + HEIGHT + 18}" class="fig-warn" stroke-width="5"></line>` +
      `<line x1="${LEFT}" y1="${TOP + HEIGHT + 30}" x2="${LEFT + WIDTH_MAX}" y2="${TOP + HEIGHT + 30}" class="fig-ink" stroke-width="2"></line>` +
      `<text x="${(LEFT + width / 2).toFixed(1)}" y="${TOP + HEIGHT + 48}" font-size="16" text-anchor="middle" class="fig-ink">piston</text>` +
      dots;

    readout.innerHTML =
      `Volume <strong>${volume.toFixed(2)} m3</strong>. ` +
      `Pressure <strong>${pressure.toFixed(0)} kPa</strong>. ` +
      `p x V = <strong>${(pressure * volume).toFixed(1)} kPa m3</strong>. ` +
      `<em>Halve the volume and watch the pressure and the value of pV. ` +
      `Why does the pressure change, and why does pV stay the same?</em>`;
  }

  // Setting a slider's value in script does not fire `input`, so dispatching it
  // redraws through the kit's own listener.
  const apply = (volume) => {
    volumeSlider.value = String(volume);
    volumeSlider.dispatchEvent(new Event("input"));
  };

  startButton.addEventListener("click", () => apply(1.0));
  halfButton.addEventListener("click", () => apply(0.5));

  react(volumeSlider, update);
}
