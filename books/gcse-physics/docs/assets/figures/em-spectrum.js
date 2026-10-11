// Tier-1 guided investigation: the electromagnetic spectrum.
//
// Guided, not a sandbox: the page asks the reader to predict the link between
// frequency and wavelength before moving the slider, then to explain why a
// higher frequency means a shorter wavelength. The slider sets the frequency on
// a logarithmic scale, and the strip highlights the group it falls in.
// Colours come from CSS classes so the figure adapts to dark mode and every
// bundle; the group name is always shown, so colour is never the only signal.
export function mount(el) {
  const GROUPS = [
    { name: "radio", min: 0, max: 3e8 },
    { name: "microwave", min: 3e8, max: 3e11 },
    { name: "infrared", min: 3e11, max: 4.3e14 },
    { name: "visible", min: 4.3e14, max: 7.5e14 },
    { name: "ultraviolet", min: 7.5e14, max: 3e16 },
    { name: "X-ray", min: 3e16, max: 3e19 },
    { name: "gamma", min: 3e19, max: Infinity },
  ];

  el.innerHTML = `
    <div class="fig-em-spectrum" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 600 120" width="100%" height="120" role="img"
           aria-label="A strip of the seven groups of the electromagnetic spectrum, with the group chosen by the slider highlighted"></svg>
      <label style="display:block;margin:.6rem 0 .3rem">
        Frequency: <input class="freq" type="range" min="5" max="19" step="0.02" value="7">
      </label>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap">
        <button type="button" class="go-radio">Go to radio waves</button>
        <button type="button" class="go-visible">Go to visible light</button>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const slider = el.querySelector(".freq");
  const readout = el.querySelector(".readout");

  function groupFor(frequency) {
    return GROUPS.find((g) => frequency >= g.min && frequency < g.max) || GROUPS[0];
  }

  function formatLength(metres) {
    if (metres >= 1) return `${metres.toPrecision(2)} m`;
    if (metres >= 0.01) return `${(metres * 100).toPrecision(2)} cm`;
    if (metres >= 1e-6) return `${(metres * 1e6).toPrecision(2)} micrometres`;
    if (metres >= 1e-9) return `${(metres * 1e9).toPrecision(2)} nm`;
    return `${metres.toExponential(2)} m`;
  }

  function formatFrequency(hz) {
    if (hz >= 1e18) return `${(hz / 1e18).toPrecision(2)} x 10^18 Hz`;
    if (hz >= 1e15) return `${(hz / 1e15).toPrecision(2)} x 10^15 Hz`;
    if (hz >= 1e12) return `${(hz / 1e12).toPrecision(2)} x 10^12 Hz`;
    if (hz >= 1e9) return `${(hz / 1e9).toPrecision(2)} x 10^9 Hz`;
    if (hz >= 1e6) return `${(hz / 1e6).toPrecision(2)} MHz`;
    return `${hz.toPrecision(2)} Hz`;
  }

  function update() {
    const frequency = Math.pow(10, Number(slider.value));
    const wavelength = 3.0e8 / frequency;
    const current = groupFor(frequency).name;

    const width = 600 / GROUPS.length;
    const cells = GROUPS.map((group, index) => {
      const x = index * width;
      const cls = group.name === current ? "fig-accent" : "fig-grid";
      return (
        `<rect x="${x}" y="30" width="${width - 2}" height="34" class="${cls}" ` +
        `stroke-width="1"></rect>` +
        `<text x="${x + width / 2}" y="82" font-size="11" text-anchor="middle" ` +
        `class="fig-ink">${group.name}</text>`
      );
    }).join("");

    svg.innerHTML = cells;

    readout.innerHTML =
      `Frequency <strong>${formatFrequency(frequency)}</strong>. ` +
      `Wavelength <strong>${formatLength(wavelength)}</strong>. ` +
      `Group: <strong>${current}</strong>. ` +
      `<em>All seven groups travel at the same speed. What happens to the ` +
      `wavelength as the frequency goes up?</em>`;
  }

  slider.addEventListener("input", update);
  el.querySelector(".go-radio").addEventListener("click", () => {
    slider.value = "7";
    update();
  });
  el.querySelector(".go-visible").addEventListener("click", () => {
    slider.value = "14.85";
    update();
  });
  update();
}
