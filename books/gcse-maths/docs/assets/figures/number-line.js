// Tier-1 guided investigation: ordering numbers on a number line.
// Predict → Test → Explain: the page asks which is greater before the reader
// moves the sliders, then asks why a "longer" decimal is not always bigger.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-numberline" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 90" width="100%" role="img"
           aria-label="Number line from minus ten to ten with two marked values"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>a <input class="a" type="range" min="-10" max="10" step="0.1" value="-2.5"></label>
        <label>b <input class="b" type="range" min="-10" max="10" step="0.1" value="1.8"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const min = -10;
  const max = 10;
  const width = 560;
  const pad = 24;
  const X = (v) => pad + ((v - min) / (max - min)) * (width - 2 * pad);

  function update() {
    const a = Number(el.querySelector(".a").value);
    const b = Number(el.querySelector(".b").value);
    const ticks = [];
    for (let v = min; v <= max; v += 2) {
      ticks.push(
        `<line x1="${X(v)}" y1="44" x2="${X(v)}" y2="52" class="fig-ink"></line>` +
          `<text x="${X(v)}" y="68" font-size="16" text-anchor="middle" class="fig-ink">${v}</text>`,
      );
    }
    const mark = (v, label, cls) =>
      `<circle cx="${X(v)}" cy="34" r="6" class="${cls}"></circle>` +
      `<text x="${X(v)}" y="20" font-size="18" text-anchor="middle" class="fig-ink">${label} = ${v}</text>`;
    svg.innerHTML =
      `<line x1="${pad}" y1="34" x2="${width - pad}" y2="34" class="fig-ink"></line>` +
      ticks.join("") +
      mark(a, "a", "fig-accent") +
      mark(b, "b", "fig-warn");

    const rel = a === b ? "=" : a < b ? "<" : ">";
    readout.innerHTML =
      `a ${rel} b — because ${Math.min(a, b)} is to the left of ${Math.max(a, b)}. ` +
      `<em>Now try a = 0.3 and b = 0.29: why is the shorter decimal bigger?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
