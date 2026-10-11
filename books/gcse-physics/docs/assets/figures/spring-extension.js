// Tier-1 guided investigation: force and extension for a spring.
//
// Guided, not a sandbox: the page asks the reader to predict the effect of
// doubling the force and of using a stiffer spring, then to explain why the
// graph is straight at first and curves past the limit of proportionality. The
// reader sets the force and the spring constant; the figure shows the spring,
// the force-extension graph and the energy stored.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-spring-extension" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 230" width="100%" height="230" role="img"
           aria-label="A hanging spring stretching under a force, beside a force-extension graph with a straight part and a curved part"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Force (N) <input class="force" type="range" min="0" max="40" step="1" value="10"></label>
        <label>Spring constant (N/m) <input class="spring" type="range" min="100" max="400" step="20" value="200"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const LIMIT = 30; // force at the limit of proportionality, in newtons
  const E_MAX = 0.40;
  const F_MAX = 42;

  const xPixel = (extension) => 70 + (extension / E_MAX) * 230;
  const yPixel = (force) => 200 - (force / F_MAX) * 165;

  function extension(force, k) {
    if (force <= LIMIT) return force / k;
    const extra = force - LIMIT;
    return LIMIT / k + (extra / k) * (1 + extra / (2 * LIMIT));
  }

  function energy(force, k) {
    const steps = 200;
    let total = 0;
    let previous = 0;
    for (let i = 1; i <= steps; i += 1) {
      const f = (force * i) / steps;
      const e = extension(f, k);
      total += ((e + previous) / 2) * (force / steps);
      previous = e;
    }
    return total;
  }

  function zigzag(cx, top, length, turns) {
    const amplitude = 16;
    const step = length / (turns * 2);
    let d = `M ${cx} ${top}`;
    for (let i = 0; i < turns * 2; i += 1) {
      const y = top + step * (i + 1);
      const x = cx + (i % 2 === 0 ? amplitude : -amplitude);
      d += ` L ${x} ${y}`;
    }
    return `${d} L ${cx} ${top + length}`;
  }

  function update() {
    const force = Number(el.querySelector(".force").value);
    const k = Number(el.querySelector(".spring").value);
    const e = extension(force, k);
    const stored = energy(force, k);
    const beyond = force > LIMIT;

    // The spring hangs from a support. Its natural length is 55 px, and the
    // extension is drawn to scale.
    const length = 55 + e * 240;
    const spring =
      `<line x1="380" y1="30" x2="500" y2="30" class="fig-ink" stroke-width="3"></line>` +
      `<path d="${zigzag(440, 30, length, 9)}" class="fig-accent" fill="none" stroke-width="2"></path>` +
      `<line x1="440" y1="${30 + length}" x2="440" y2="${30 + length + 22}" class="fig-grid" stroke-dasharray="3 3"></line>` +
      `<polygon points="440,${30 + length + 30} 432,${30 + length + 16} 448,${30 + length + 16}" class="fig-warn"></polygon>` +
      `<text x="470" y="${30 + length / 2}" font-size="11" class="fig-ink">spring</text>`;

    // The force-extension graph: a straight line up to the limit, then a curve.
    const points = [];
    for (let f = 0; f <= 40; f += 1) points.push([extension(f, k), f]);
    const straight = points.filter(([, f]) => f <= LIMIT);
    const curved = points.filter(([, f]) => f >= LIMIT);
    const path = (list) =>
      list.map(([ex, f], i) => `${i === 0 ? "M" : "L"} ${xPixel(ex).toFixed(1)} ${yPixel(f).toFixed(1)}`).join(" ");
    const axis =
      `<line x1="70" y1="200" x2="310" y2="200" class="fig-ink"></line>` +
      `<line x1="70" y1="200" x2="70" y2="30" class="fig-ink"></line>` +
      `<line x1="70" y1="${yPixel(LIMIT).toFixed(1)}" x2="310" y2="${yPixel(LIMIT).toFixed(1)}" class="fig-grid" stroke-dasharray="3 3"></line>` +
      `<text x="185" y="222" font-size="11" text-anchor="middle" class="fig-ink">extension (m)</text>` +
      `<text x="14" y="120" font-size="11" class="fig-ink" transform="rotate(-90 14 120)">force (N)</text>` +
      `<text x="300" y="${(yPixel(LIMIT) - 5).toFixed(1)}" font-size="10" text-anchor="end" class="fig-ink">limit</text>`;
    const graph =
      axis +
      `<path d="${path(straight)}" class="fig-accent" fill="none" stroke-width="3"></path>` +
      `<path d="${path(curved)}" class="fig-warn" fill="none" stroke-width="3"></path>` +
      `<circle cx="${xPixel(e).toFixed(1)}" cy="${yPixel(force).toFixed(1)}" r="5" class="fig-good"></circle>`;

    svg.innerHTML = spring + graph;

    readout.innerHTML =
      `Force <strong>${force} N</strong>, spring constant <strong>${k} N/m</strong>. ` +
      `Extension = <strong>${e.toFixed(3)} m</strong>. ` +
      `Energy stored = <strong>${stored.toFixed(2)} J</strong>. ` +
      (beyond
        ? `<em>The force is past the limit of proportionality, so the graph has curved.</em>`
        : `<em>Now double the force to ${Math.min(force * 2, 40)} N. What happens to the extension?</em>`);
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
