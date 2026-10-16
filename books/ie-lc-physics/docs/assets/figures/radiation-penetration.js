// Tier-1 guided investigation: how far each emission travels through air, and how
// the ionising power goes the other way.
//
// The page asks the reader to predict which emission reaches a detector, then to
// move the detector and check, then to explain why the shortest track carries the
// most ionisation. So the figure has to show the *range* and the *density of
// ionisation* in one picture: the track is drawn only as far as the emission
// travels, and the marks along it are spaced by the ionising power, so the reader
// can see that the alpha track is short and crowded while the gamma track is long
// and almost empty.
//
// Nothing here carries a colour. The track, the ionisation marks and the detector
// use different `fig-*` classes and different line styles, so the distinction
// survives a monochrome bundle.
//
// The scaffolding — the panel, its accessible name, the controls, the readout and
// the redraw — comes from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, chooser, label, panel, react, scale, slider } from "./kit.js";

// Range in air and ionising power, both rounded to the order of magnitude a reader
// can hold: alpha stops in a few centimetres and ionises densely, gamma crosses the
// whole scale and ionises sparsely.
const EMISSIONS = {
  alpha: { name: "Alpha", range: 5, perMm: 10000, note: "stopped by a sheet of paper" },
  beta: { name: "Beta", range: 100, perMm: 100, note: "stopped by a few millimetres of aluminium" },
  gamma: { name: "Gamma", range: 120, perMm: 1, note: "reduced by several centimetres of lead" },
};

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A source and a detector at a chosen distance, showing how far each emission travels through air",
    width: 560,
    height: 230,
  });

  const which = chooser(el, {
    id: "emission",
    label: "Emission",
    choices: [
      { value: "alpha", label: "Alpha" },
      { value: "beta", label: "Beta" },
      { value: "gamma", label: "Gamma" },
    ],
    value: "alpha",
  });

  const distance = slider(el, {
    show: true,
    id: "distance",
    label: "Detector distance",
    min: 0,
    max: 120,
    step: 1,
    value: 20,
    unit: "cm",
  });

  const x = scale({ domain: [0, 120], range: [62, 520] });
  const TRACK_Y = 112;

  function update() {
    const key = which.value;
    const emission = EMISSIONS[key];
    const cm = Number(distance.value);
    const reached = cm <= emission.range;

    let drawing = "";

    // The scale of distances, drawn first so everything else sits over it.
    drawing += `<line x1="${x(0)}" y1="${TRACK_Y + 46}" x2="${x(120)}" y2="${TRACK_Y + 46}" class="fig-grid" stroke-width="1.5"></line>`;
    for (let tick = 0; tick <= 120; tick += 20) {
      drawing += `<line x1="${x(tick)}" y1="${TRACK_Y + 46}" x2="${x(tick)}" y2="${TRACK_Y + 52}" class="fig-grid" stroke-width="1.5"></line>`;
      drawing += label({ x: x(tick), y: TRACK_Y + 68, text: String(tick), size: SIZE.tick });
    }
    drawing += label({ x: 290, y: TRACK_Y + 88, text: "distance through air / cm", size: SIZE.tick });

    // The source.
    drawing += `<circle cx="34" cy="${TRACK_Y}" r="11" class="fig-warn"></circle>`;
    drawing += label({ x: 34, y: TRACK_Y + 30, text: "source", size: SIZE.tick });

    // The track the emission actually travels. Ionisation marks sit above it and
    // their spacing is the ionising power, so the shortest track is the densest.
    const end = Math.min(emission.range, 120);
    drawing += `<line x1="${x(0)}" y1="${TRACK_Y}" x2="${x(end)}" y2="${TRACK_Y}" class="fig-ink" stroke-width="3"></line>`;
    const spacing = key === "alpha" ? 0.6 : key === "beta" ? 5 : 20;
    for (let at = spacing / 2; at < emission.range; at += spacing) {
      drawing += `<circle cx="${x(at).toFixed(1)}" cy="${TRACK_Y - 13}" r="2.4" class="fig-accent"></circle>`;
    }
    if (emission.range < 120) {
      drawing += `<line x1="${x(emission.range)}" y1="${TRACK_Y - 9}" x2="${x(emission.range)}" y2="${TRACK_Y + 9}" class="fig-warn" stroke-width="2" stroke-dasharray="3 3"></line>`;
      drawing += label({
        x: x(emission.range),
        y: TRACK_Y - 24,
        text: `stops at ${emission.range} cm`,
        size: SIZE.tick,
        class: "text-warn",
      });
    }

    // The detector, at the distance the reader chose.
    drawing += `<line x1="${x(cm)}" y1="${TRACK_Y - 36}" x2="${x(cm)}" y2="${TRACK_Y + 36}" class="fig-accent" stroke-width="2.5"></line>`;
    drawing += label({ x: x(cm), y: TRACK_Y - 46, text: "detector", size: SIZE.tick, class: "text-accent" });

    svg.innerHTML = drawing;

    readout.textContent = reached
      ? `${emission.name}: range about ${emission.range} cm in air, and about ${emission.perMm.toLocaleString()} ion pairs per millimetre. At ${cm} cm the detector still records this emission. It is ${emission.note}.`
      : `${emission.name}: range about ${emission.range} cm in air. At ${cm} cm the detector records nothing from this emission, because the particles stopped before they reached it. It is ${emission.note}.`;
  }

  react([which, distance], update);
}
