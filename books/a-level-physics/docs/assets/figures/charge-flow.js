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
// is plain HTML. Every value is written out as text, so shape and size are never
// the only signal.
export function mount(el) {
  const ELEMENTARY = 1.6e-19; // coulombs, the charge on one electron
  const TIME_MAX = 60; // seconds
  const CURRENT_MAX = 5; // amperes

  el.innerHTML = `
    <div class="fig-charge-flow" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 600 340" width="100%" role="img"
           aria-label="A graph of current against time. The shaded rectangle has a height equal to the current and a width equal to the time, so its area is the charge transferred."></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Current (A)
          <input class="current" type="range" min="0.5" max="${CURRENT_MAX}" step="0.1" value="2"></label>
        <label>Time (s)
          <input class="time" type="range" min="5" max="${TIME_MAX}" step="5" value="30"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const current = el.querySelector(".current");
  const time = el.querySelector(".time");
  const readout = el.querySelector(".readout");

  const LEFT = 80;
  const RIGHT = 540;
  const TOP = 40;
  const BOTTOM = 260;

  const px = (seconds) => LEFT + (seconds / TIME_MAX) * (RIGHT - LEFT);
  const py = (amps) => BOTTOM - (amps / CURRENT_MAX) * (BOTTOM - TOP);

  // Standard form for the number of electrons, written as plain HTML.
  const sci = (value) => {
    const exponent = Math.floor(Math.log10(value));
    const mantissa = value / Math.pow(10, exponent);
    return `${mantissa.toFixed(2)} &times; 10<sup>${exponent}</sup>`;
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
        `<text x="${px(tick).toFixed(1)}" y="${BOTTOM + 18}" font-size="17" text-anchor="middle" class="text-ink">${tick}</text>`;
    }
    for (let tick = 0; tick <= CURRENT_MAX; tick += 1) {
      drawing +=
        `<line x1="${LEFT}" y1="${py(tick).toFixed(1)}" x2="${RIGHT}" y2="${py(tick).toFixed(1)}" class="fig-grid"></line>` +
        `<text x="${LEFT - 8}" y="${(py(tick) + 4).toFixed(1)}" font-size="17" text-anchor="end" class="text-ink">${tick}</text>`;
    }
    drawing +=
      `<text x="${RIGHT}" y="${BOTTOM + 36}" font-size="19" text-anchor="end" class="text-ink">time / s</text>` +
      `<text x="${LEFT}" y="${TOP - 14}" font-size="19" class="text-ink">current / A</text>`;

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
      `<text x="${(px(seconds) + (nearRight ? -8 : 8)).toFixed(1)}" y="${(top + 4).toFixed(1)}" ` +
      `font-size="21" text-anchor="${nearRight ? "end" : "start"}" class="text-ink">${charge.toFixed(1)} C</text>`;

    svg.innerHTML = drawing;

    readout.innerHTML =
      `A current of <strong>${amps.toFixed(1)} A</strong> for ` +
      `<strong>${seconds.toFixed(0)} s</strong> transfers a charge of ` +
      `<strong>${charge.toFixed(1)} C</strong>. That charge is carried by about ` +
      `<strong>${sci(electrons)}</strong> electrons. ` +
      `<em>Which transfers more charge: doubling the current, or doubling the time?</em>`;
  }

  current.addEventListener("input", update);
  time.addEventListener("input", update);
  update();
}
