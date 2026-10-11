// Tier-1 guided investigation: gravitational field strength and potential.
//
// A single slider moves a point outwards from the centre of the Earth. The curve
// is g = GM / r^2, and a marker sits at the chosen distance. The readout gives
// the field strength, its ratio to the surface value and the gravitational
// potential. Colours come from the fig-* classes, so the figure adapts to every
// bundle and to both schemes. The readout is plain HTML, never runtime maths.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-gravitational-field" style="font:14px system-ui;max-width:620px">
      <svg viewBox="0 0 620 320" width="100%" height="320" role="img"
           aria-label="Graph of gravitational field strength against distance from the centre of the Earth, with a movable marker"></svg>
      <label style="display:block;margin:.5rem 0">Distance from the centre (megametres)
        <input class="radius" type="range" min="6.4" max="38" step="0.1" value="6.8">
        <output class="radius-out">6.8</output>
      </label>
      <p class="readout" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const radius = el.querySelector(".radius");
  const radiusOut = el.querySelector(".radius-out");
  const readout = el.querySelector(".readout");

  const GM = 6.67e-11 * 5.97e24; // m^3 s^-2
  const R = 6.37e6; // m
  const G0 = GM / (R * R); // surface field strength, N/kg

  const LEFT = 70;
  const RIGHT = 580;
  const TOP = 40;
  const BOTTOM = 270;
  const R_MIN = 6.4e6;
  const R_MAX = 38e6;
  const G_MAX = 10;

  const px = (r) => LEFT + ((r - R_MIN) / (R_MAX - R_MIN)) * (RIGHT - LEFT);
  const py = (g) => BOTTOM - (g / G_MAX) * (BOTTOM - TOP);

  function update() {
    const r = Number(radius.value) * 1e6;
    radiusOut.textContent = Number(radius.value).toFixed(1);

    const g = GM / (r * r);
    const V = -GM / r;

    let axes =
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${LEFT}" y2="${TOP}" class="fig-ink"></line>` +
      `<text x="${LEFT}" y="${TOP - 12}" font-size="11" class="fig-ink">field strength g / (N kg-1)</text>` +
      `<text x="${RIGHT}" y="${BOTTOM + 18}" font-size="11" class="fig-ink" text-anchor="end">distance r / Mm</text>`;

    for (let tick = 10; tick <= 35; tick += 5) {
      const x = px(tick * 1e6);
      axes +=
        `<line x1="${x.toFixed(1)}" y1="${BOTTOM}" x2="${x.toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `<text x="${x.toFixed(1)}" y="${BOTTOM + 16}" font-size="10" class="fig-ink" text-anchor="middle">${tick}</text>`;
    }
    for (let tick = 0; tick <= G_MAX; tick += 2) {
      const y = py(tick);
      axes +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        `<text x="${LEFT - 8}" y="${(y + 4).toFixed(1)}" font-size="10" class="fig-ink" text-anchor="end">${tick}</text>`;
    }

    let curve = "";
    for (let index = 0; index <= 160; index += 1) {
      const sample = R_MIN + (index / 160) * (R_MAX - R_MIN);
      curve += `${px(sample).toFixed(1)},${py(GM / (sample * sample)).toFixed(1)} `;
    }

    const surface =
      `<line x1="${LEFT}" y1="${py(G0).toFixed(1)}" x2="${RIGHT}" y2="${py(G0).toFixed(1)}" class="fig-warn" stroke-width="2" stroke-dasharray="6 4"></line>` +
      `<text x="${LEFT + 6}" y="${(py(G0) - 6).toFixed(1)}" font-size="10" class="fig-ink">surface value 9.81</text>`;

    const marker =
      `<line x1="${px(r).toFixed(1)}" y1="${TOP}" x2="${px(r).toFixed(1)}" y2="${BOTTOM}" class="fig-ink" stroke-dasharray="4 3"></line>` +
      `<circle cx="${px(r).toFixed(1)}" cy="${py(g).toFixed(1)}" r="5" class="fig-accent"></circle>`;

    svg.innerHTML =
      axes +
      `<polyline points="${curve.trim()}" class="fig-accent" fill="none" stroke-width="3"></polyline>` +
      surface +
      marker;

    const ratio = g / G0;
    readout.innerHTML =
      `At ${Number(radius.value).toFixed(1)} megametres from the centre, ` +
      `g = <strong>${g.toFixed(2)} N kg<sup>-1</sup></strong>. ` +
      `That is <strong>${ratio.toFixed(3)}</strong> of the surface value. ` +
      `The gravitational potential is <strong>${(V / 1e6).toFixed(1)} MJ kg<sup>-1</sup></strong>. ` +
      `The dashed line is the surface field strength. ` +
      `<em>Find the distance where g is one quarter of the surface value. What is the ratio of the distances?</em>`;
  }

  radius.addEventListener("input", update);
  update();
}
