// Tier-1 guided investigation: the zero-product rule.
//
// Guided, not a sandbox: the page asks the reader to predict the two solutions
// before touching a control and to explain the sign change afterwards. The two
// straight lines are the factors and the curve is their product, so the product
// is zero exactly where a factor line meets the horizontal axis. A shape paints
// with fig-* and a word paints with text-*.
export function mount(el) {
  const CX = 280;
  const CY = 165;
  const UX = 30;
  const UY = 7.5;
  const XMIN = -8;
  const XMAX = 8;

  el.innerHTML = `
    <div style="font:14px system-ui;max-width:620px">
      <svg viewBox="0 0 560 320" width="100%" height="300" role="img"
           aria-label="Two straight lines for the factors and a curve for their product, meeting the horizontal axis at the two solutions"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>First bracket number <input class="m" type="range" min="-6" max="6" step="1" value="2"></label>
        <label>Second bracket number <input class="n" type="range" min="-6" max="6" step="1" value="3"></label>
      </div>
      <p class="legend" style="margin:.4rem 0 0"></p>
      <p class="readout" aria-live="polite" style="margin:.3rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const mSlider = el.querySelector(".m");
  const nSlider = el.querySelector(".n");
  const legend = el.querySelector(".legend");
  const readout = el.querySelector(".readout");

  const cx = (x) => CX + x * UX;
  const cy = (y) => CY - y * UY;
  const bracket = (v) => (v === 0 ? "x" : `x ${v > 0 ? "+" : "-"} ${Math.abs(v)}`);

  function expanded(m, n) {
    const b = m + n;
    const c = m * n;
    let shape = "x²";
    if (b !== 0) {
      const size = Math.abs(b) === 1 ? "" : Math.abs(b);
      shape += ` ${b > 0 ? "+" : "-"} ${size}x`;
    }
    if (c !== 0) shape += ` ${c > 0 ? "+" : "-"} ${Math.abs(c)}`;
    return shape;
  }

  function update() {
    const m = Number(mSlider.value);
    const n = Number(nSlider.value);

    const curve = [];
    for (let x = XMIN; x <= XMAX + 1e-9; x += 0.2) {
      curve.push(`${cx(x).toFixed(1)},${cy((x + m) * (x + n)).toFixed(1)}`);
    }

    const factorLine = (k, cls, dash) =>
      `<line x1="${cx(XMIN).toFixed(1)}" y1="${cy(XMIN + k).toFixed(1)}" ` +
      `x2="${cx(XMAX).toFixed(1)}" y2="${cy(XMAX + k).toFixed(1)}" ` +
      `class="${cls}" stroke-width="1.5" ${dash}></line>`;

    const rootMark = (value, side) =>
      `<circle cx="${cx(value).toFixed(1)}" cy="${cy(0).toFixed(1)}" r="5" ` +
      `class="fig-accent"></circle>` +
      `<text x="${cx(value).toFixed(1)}" y="${(cy(0) + side).toFixed(1)}" ` +
      `font-size="12" text-anchor="middle" class="text-accent">x = ${value}</text>`;

    const roots =
      m === n
        ? rootMark(-m, 22)
        : rootMark(-m, 22) + rootMark(-n, -12);

    svg.innerHTML =
      `<defs><clipPath id="zp-clip"><rect x="38" y="42" width="484" height="252"></rect></clipPath></defs>` +
      `<line x1="38" y1="${cy(0).toFixed(1)}" x2="522" y2="${cy(0).toFixed(1)}" ` +
      `class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${cx(0).toFixed(1)}" y1="42" x2="${cx(0).toFixed(1)}" y2="294" ` +
      `class="fig-ink" stroke-width="2"></line>` +
      `<g clip-path="url(#zp-clip)">` +
      factorLine(m, "fig-good", "") +
      factorLine(n, "fig-warn", 'stroke-dasharray="7 5"') +
      `<polyline points="${curve.join(" ")}" class="fig-accent" fill="none" stroke-width="2.5"></polyline>` +
      `</g>` +
      roots +
      `<text x="526" y="${(cy(0) - 6).toFixed(1)}" font-size="12" class="text-ink">x</text>` +
      `<text x="${(cx(0) + 8).toFixed(1)}" y="52" font-size="12" class="text-ink">y</text>`;

    legend.innerHTML =
      `<span class="text-good">${bracket(m)}</span> is the solid factor line and ` +
      `<span class="text-warn">${bracket(n)}</span> is the dashed one. ` +
      `<span class="text-accent">(${bracket(m)})(${bracket(n)})</span> is the product curve.`;

    const solutions =
      m === n
        ? `Both factors are zero at the same value, x = ${-m}.`
        : `So x = ${-m} or x = ${-n}.`;

    readout.innerHTML =
      `The product <strong>(${bracket(m)})(${bracket(n)})</strong> is zero only when a factor is zero. ` +
      `Each factor gives one value of x. ${solutions} ` +
      `Expanding the factors gives <strong>${expanded(m, n)}</strong>.`;
  }

  mSlider.addEventListener("input", update);
  nSlider.addEventListener("input", update);
  update();
}
