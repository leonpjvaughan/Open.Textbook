// Tier-1 guided investigation: current-potential difference characteristics.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. The reader chooses a component and a potential difference, and the
// figure draws the I-V graph for that component and marks the current working
// point. The point of the investigation is the shape of the graph: a fixed
// resistor gives a straight line, a filament lamp bends because its resistance
// rises, and a diode conducts in one direction only.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the
// readout is plain HTML.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-i-v" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 600 300" width="100%" role="img"
           aria-label="A current against potential difference graph for a resistor, a filament lamp or a diode, with a marked working point"></svg>
      <label style="display:block;margin:.5rem 0">Component
        <select class="component">
          <option value="resistor">Fixed resistor (5 ohm)</option>
          <option value="lamp">Filament lamp</option>
          <option value="diode">Diode</option>
        </select>
      </label>
      <label style="display:block;margin:.3rem 0">Potential difference
        <input class="pd" type="range" min="-4" max="4" step="0.1" value="2">
        <output class="pd-out">2.0</output> V
      </label>
      <p class="readout" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const component = el.querySelector(".component");
  const pd = el.querySelector(".pd");
  const pdOut = el.querySelector(".pd-out");
  const readout = el.querySelector(".readout");

  const LEFT = 60;
  const RIGHT = 560;
  const TOP = 30;
  const BOTTOM = 250;
  const V_MAX = 4; // volts
  const I_MAX = 1.2; // amperes

  const px = (v) => LEFT + ((v + V_MAX) / (2 * V_MAX)) * (RIGHT - LEFT);
  const py = (i) => (TOP + BOTTOM) / 2 - (i / I_MAX) * ((BOTTOM - TOP) / 2);

  function current(name, v) {
    if (name === "resistor") return v / 5;
    if (name === "lamp") return v / (2 + 0.5 * Math.abs(v));
    if (v <= 0.6) return -0.005;
    return 0.1 * Math.pow(v - 0.6, 2);
  }

  function update() {
    const name = component.value;
    const v = Number(pd.value);
    pdOut.textContent = v.toFixed(1);

    // Axes, grid and labels.
    let axes =
      `<line x1="${LEFT}" y1="${(TOP + BOTTOM) / 2}" x2="${RIGHT}" y2="${(TOP + BOTTOM) / 2}" class="fig-ink"></line>` +
      `<line x1="${px(0).toFixed(1)}" y1="${TOP}" x2="${px(0).toFixed(1)}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<text x="${RIGHT}" y="${(TOP + BOTTOM) / 2 - 8}" font-size="19" class="fig-ink" text-anchor="end">pd / V</text>` +
      `<text x="${px(0) + 8}" y="${TOP - 4}" font-size="19" class="fig-ink">current / A</text>`;

    for (let tick = -4; tick <= 4; tick += 2) {
      axes +=
        `<line x1="${px(tick).toFixed(1)}" y1="${TOP}" x2="${px(tick).toFixed(1)}" y2="${BOTTOM}" class="fig-grid"></line>` +
        `<text x="${px(tick).toFixed(1)}" y="${BOTTOM + 16}" font-size="17" class="fig-ink" text-anchor="middle">${tick}</text>`;
    }
    for (let tick = -1; tick <= 1; tick += 0.5) {
      if (tick === 0) continue;
      axes +=
        `<line x1="${LEFT}" y1="${py(tick).toFixed(1)}" x2="${RIGHT}" y2="${py(tick).toFixed(1)}" class="fig-grid"></line>` +
        `<text x="${LEFT - 6}" y="${(py(tick) + 4).toFixed(1)}" font-size="17" class="fig-ink" text-anchor="end">${tick}</text>`;
    }

    // The characteristic, sampled across the range.
    let points = "";
    for (let s = -4; s <= 4.0001; s += 0.1) {
      const value = Math.max(-I_MAX, Math.min(I_MAX, current(name, s)));
      points += `${px(s).toFixed(1)},${py(value).toFixed(1)} `;
    }
    const curve = `<polyline points="${points.trim()}" fill="none" class="fig-accent" stroke-width="3"></polyline>`;

    const i = Math.max(-I_MAX, Math.min(I_MAX, current(name, v)));
    const marker = `<circle cx="${px(v).toFixed(1)}" cy="${py(i).toFixed(1)}" r="6" class="fig-warn"></circle>`;

    svg.innerHTML = axes + curve + marker;

    let message;
    if (name === "resistor") {
      message = `The graph is a straight line through the origin, so the resistance is constant at 5 ohm. At ${v.toFixed(1)} V the current is ${i.toFixed(2)} A.`;
    } else if (name === "lamp") {
      const r = v !== 0 ? (v / i) : 0;
      message = `The graph bends. At ${v.toFixed(1)} V the current is ${i.toFixed(2)} A, so the resistance is ${Math.abs(r).toFixed(1)} ohm. A larger pd makes the filament hotter and the resistance larger.`;
    } else if (v <= 0.6) {
      message = `In this direction the diode blocks the current, so the current is almost zero. The pd is ${v.toFixed(1)} V.`;
    } else {
      message = `Above about 0.6 V the diode conducts. At ${v.toFixed(1)} V the current is ${i.toFixed(2)} A, and it rises quickly as the pd increases.`;
    }
    readout.innerHTML = `${message} <em>Which component gives a straight line, and why?</em>`;
  }

  component.addEventListener("change", update);
  pd.addEventListener("input", update);
  update();
}
