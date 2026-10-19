// Tier-1 guided investigation: charge as current multiplied by time.
//
// Guided, not a sandbox: the page asks the reader to predict what doubling the
// current, and then doubling the time, does to the charge, before a slider is
// touched. The figure draws current against time, and the shaded rectangle has a
// height equal to the current and a width equal to the time, so its area is the
// charge transferred. The readout also gives the number of electrons, so the
// step from charge to charge carriers is visible.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the readout
// the only signal.
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
  const ELEMENTARY = 1.6e-19; // coulombs, the charge on one electron
  const TIME_MAX = 60; // seconds
  const CURRENT_MAX = 5; // amperes

  const { svg, readout, claim } = panel(el, {
    label:
      "A graph of current against time. The shaded rectangle has a height equal to the current and a width equal to the time, so its area is the charge transferred.",
    width: 600,
    height: 340,
    max: 600,
  });

  const current = slider(el, { show: false,
    id: "current",
    label: "Current (A)",
    min: 0.5,
    max: CURRENT_MAX,
    step: 0.1,
    value: 2,
  });
  const time = slider(el, { show: false,
    id: "time",
    label: "Time (s)",
    min: 5,
    max: TIME_MAX,
    step: 5,
    value: 30,
  });

  const LEFT = 80;
  const RIGHT = 540;
  const TOP = 40;
  const BOTTOM = 260;

  const px = (seconds) => LEFT + (seconds / TIME_MAX) * (RIGHT - LEFT);
  const py = (amps) => BOTTOM - (amps / CURRENT_MAX) * (BOTTOM - TOP);

  // Standard form for the number of electrons. Two spellings of one number: `sci` is
  // the HTML the reader sees, and `sciText` is the same number as plain text, which is
  // what a claim has to name — the check compares against the readout's text, where a
  // superscript has already become `^`.
  const standard = (value) => {
    const exponent = Math.floor(Math.log10(value));
    const mantissa = value / Math.pow(10, exponent);
    return { mantissa: mantissa.toFixed(2), exponent };
  };
  const sci = (value) => {
    const { mantissa, exponent } = standard(value);
    return `${mantissa} &times; 10<sup>${exponent}</sup>`;
  };
  const sciText = (value) => {
    const { mantissa, exponent } = standard(value);
    return `${mantissa} \u00d7 10^${exponent}`;
  };

  function update() {
    const amps = Number(current.value);
    const seconds = Number(time.value);
    const charge = amps * seconds;
    const electrons = charge / ELEMENTARY;

    // The axes and their grid.
    let drawing =
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>`;
    for (let tick = 0; tick <= TIME_MAX; tick += 10) {
      drawing +=
        `<line x1="${px(tick).toFixed(1)}" y1="${TOP}" x2="${px(tick).toFixed(1)}" y2="${BOTTOM}" class="fig-grid"></line>` +
        `${label({ x: px(tick).toFixed(1), y: BOTTOM + 18, text: `${tick}`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`;
    }
    for (let tick = 0; tick <= CURRENT_MAX; tick += 1) {
      drawing +=
        `<line x1="${LEFT}" y1="${py(tick).toFixed(1)}" x2="${RIGHT}" y2="${py(tick).toFixed(1)}" class="fig-grid"></line>` +
        `${label({ x: LEFT - 8, y: (py(tick) + 4).toFixed(1), text: `${tick}`, anchor: "end", size: SIZE.value, class: "text-ink" })}`;
    }
    drawing +=
      `${label({ x: RIGHT, y: BOTTOM + 36, text: `time / s`, anchor: "end", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: LEFT, y: TOP - 14, text: `current / A`, anchor: "start", size: SIZE.heading, class: "text-ink" })}`;

    // The rectangle whose area is the charge: current times time.
    const top = py(amps);
    drawing +=
      `<rect x="${LEFT}" y="${top.toFixed(1)}" width="${(px(seconds) - LEFT).toFixed(1)}" ` +
      `height="${(BOTTOM - top).toFixed(1)}" class="fig-accent" fill-opacity="0.2" stroke-width="2"></rect>` +
      `<line x1="${LEFT}" y1="${top.toFixed(1)}" x2="${px(seconds).toFixed(1)}" y2="${top.toFixed(1)}" class="fig-grid" stroke-dasharray="4 3"></line>` +
      `<line x1="${px(seconds).toFixed(1)}" y1="${top.toFixed(1)}" x2="${px(seconds).toFixed(1)}" y2="${BOTTOM}" class="fig-grid" stroke-dasharray="4 3"></line>`;

    // The area, written out beside the rectangle.
    const nearRight = px(seconds) > RIGHT - 110;
    drawing +=
      `${label({ x: (px(seconds) + (nearRight ? -8 : 8)).toFixed(1), y: (top + 4).toFixed(1), text: `${charge.toFixed(1)} C`, anchor: nearRight ? "end" : "start", size: SIZE.heading, class: "text-ink" })}`;

    svg.innerHTML = drawing;

    // The rectangle's area is the charge and the charge is the electron count, so both
    // are declared. The count is printed in standard form, which the verifier reads as
    // a label rather than a number — but the *answer* is still proved exactly, because
    // `1.6e-19` is 1/6250000000000000000 and not a double.
    claim([
      {
        label: "charge transferred",
        expression: "I * t",
        values: { I: amps, t: seconds },
        answer: charge,
        shown: charge.toFixed(1),
      },
      {
        label: "number of electrons",
        expression: "charge / ELEMENTARY",
        values: { charge, ELEMENTARY },
        answer: electrons,
        shown: sciText(electrons),
      },
    ]);
    readout.innerHTML =
      `A current of <strong>${quantity(amps, "A", 1)}</strong> for ` +
      `<strong>${quantity(seconds, "s", 0)}</strong> transfers a charge of ` +
      `<strong>${charge.toFixed(1)} C</strong>. That charge is carried by about ` +
      `<strong>${sci(electrons)}</strong> electrons. ` +
      `<em>Which transfers more charge: doubling the current, or doubling the time?</em>`;
  }

  react([current, time], update);
}
