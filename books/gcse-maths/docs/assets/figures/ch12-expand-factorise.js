// Tier-1 guided investigation: expanding and factorising as areas.
//
// Guided, not a sandbox: the page asks the reader to predict which part of the
// rectangle gives the middle term, then to explain why the two middle areas
// combine. One rectangle carries both forms, because expanding and factorising
// are inverse operations on it. A shape paints with fig-* and a word paints with
// text-*, so the figure adapts to every bundle and both schemes.
export function mount(el) {
  const UNIT = 26;
  const X_DRAWN = 140;
  const LEFT = 90;
  const TOP = 40;

  el.innerHTML = `
    <div style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 520 360" width="100%" height="340" role="img"
           aria-label="A rectangle split into four smaller rectangles whose areas are the four terms of an expanded product"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>First number <input class="a" type="range" min="1" max="6" step="1" value="3"></label>
        <label>Second number <input class="b" type="range" min="1" max="6" step="1" value="4"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const aSlider = el.querySelector(".a");
  const bSlider = el.querySelector(".b");
  const readout = el.querySelector(".readout");

  function update() {
    const a = Number(aSlider.value);
    const b = Number(bSlider.value);

    const xw = X_DRAWN;
    const aw = a * UNIT;
    const bw = b * UNIT;
    const w = xw + aw;
    const h = xw + bw;

    const x1 = LEFT;
    const x2 = LEFT + xw;
    const x3 = LEFT + w;
    const y1 = TOP;
    const y2 = TOP + xw;
    const y3 = TOP + h;

    // A word is painted with text-*; the shape behind it is painted with fig-*.
    const text = (x, y, value, cls, anchor = "middle") =>
      `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="13" ` +
      `text-anchor="${anchor}" class="text-${cls}">${value}</text>`;

    const region = (rx, ry, rw, rh, value, cls) =>
      `<rect x="${rx.toFixed(1)}" y="${ry.toFixed(1)}" width="${rw.toFixed(1)}" ` +
      `height="${rh.toFixed(1)}" class="fig-${cls}" fill-opacity="0.14"></rect>` +
      (rw > 30 && rh > 24
        ? text(rx + rw / 2, ry + rh / 2 + 5, value, cls)
        : "");

    svg.innerHTML =
      region(x1, y1, xw, xw, "x²", "accent") +
      region(x2, y1, aw, xw, `${a}x`, "good") +
      region(x1, y2, xw, bw, `${b}x`, "good") +
      region(x2, y2, aw, bw, String(a * b), "warn") +
      `<line x1="${x2.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" ` +
      `y2="${y3.toFixed(1)}" class="fig-ink" stroke-width="1.5"></line>` +
      `<line x1="${x1.toFixed(1)}" y1="${y2.toFixed(1)}" x2="${x3.toFixed(1)}" ` +
      `y2="${y2.toFixed(1)}" class="fig-ink" stroke-width="1.5"></line>` +
      `<rect x="${x1.toFixed(1)}" y="${y1.toFixed(1)}" width="${w.toFixed(1)}" ` +
      `height="${h.toFixed(1)}" class="fig-accent" fill="none" stroke-width="2.5"></rect>` +
      text((x1 + x2) / 2, y1 - 10, "x", "accent") +
      text((x2 + x3) / 2, y1 - 10, String(a), "accent") +
      text(x1 - 12, (y1 + y2) / 2 + 5, "x", "accent", "end") +
      text(x1 - 12, (y2 + y3) / 2 + 5, String(b), "accent", "end");

    readout.innerHTML =
      `Width <strong>x + ${a}</strong> and height <strong>x + ${b}</strong>. ` +
      `The four areas are <strong>x²</strong>, <strong>${a}x</strong>, ` +
      `<strong>${b}x</strong> and <strong>${a * b}</strong>. ` +
      `They add to <strong>x² + ${a + b}x + ${a * b}</strong>, so ` +
      `<strong>(x + ${a})(x + ${b}) = x² + ${a + b}x + ${a * b}</strong>. ` +
      `The same rectangle shows the product and its two factors.`;
  }

  aSlider.addEventListener("input", update);
  bSlider.addEventListener("input", update);
  update();
}
