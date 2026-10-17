// Tier-1 guided investigation: force and extension for a spring.
//
// Guided, not a sandbox: the page asks the reader to predict the effect of
// doubling the force and of using a stiffer spring, then to explain why the
// graph is straight at first and curves past the limit of proportionality. The
// reader sets the force and the spring constant; the figure shows the spring,
// the force-extension graph and the energy stored.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A hanging spring stretching under a force, beside a force-extension graph with a straight part and a curved part",
    width: 560,
    height: 230,
  });

  const forceInput = slider(el, { show: false,
    id: "force",
    label: "Force (N)",
    min: 0,
    max: 40,
    step: 1,
    value: 10,
  });
  const springInput = slider(el, { show: false,
    id: "spring",
    label: "Spring constant (N/m)",
    min: 100,
    max: 400,
    step: 20,
    value: 200,
  });

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
    const force = Number(forceInput.value);
    const k = Number(springInput.value);
    const e = extension(force, k);
    const stored = energy(force, k);
    const beyond = force > LIMIT;

    // The spring hangs from a support. Its natural length is 55 px, and the
    // extension is drawn to scale.
    const length = 55 + e * 240;
    const spring =
      `<line x1="380" y1="30" x2="500" y2="30" class="fig-ink" stroke-width="3"></line><path d="${zigzag(440, 30, length, 9)}" class="fig-accent" fill="none" stroke-width="2"></path><line x1="440" y1="${30 + length}" x2="440" y2="${30 + length + 22}" class="fig-grid" stroke-dasharray="3 3"></line><polygon points="440,${30 + length + 30} 432,${30 + length + 16} 448,${30 + length + 16}" class="fig-warn"></polygon>${label({ x: 470, y: 30 + length / 2, text: `spring`, anchor: "start", size: SIZE.value, class: "text-ink" })}`;

    // The force-extension graph: a straight line up to the limit, then a curve.
    const points = [];
    for (let f = 0; f <= 40; f += 1) points.push([extension(f, k), f]);
    const straight = points.filter(([, f]) => f <= LIMIT);
    const curved = points.filter(([, f]) => f >= LIMIT);
    const path = (list) =>
      list.map(([ex, f], i) => `${i === 0 ? "M" : "L"} ${xPixel(ex).toFixed(1)} ${yPixel(f).toFixed(1)}`).join(" ");
    const axis =
      `<line x1="70" y1="200" x2="310" y2="200" class="fig-ink"></line><line x1="70" y1="200" x2="70" y2="30" class="fig-ink"></line><line x1="70" y1="${yPixel(LIMIT).toFixed(1)}" x2="310" y2="${yPixel(LIMIT).toFixed(1)}" class="fig-grid" stroke-dasharray="3 3"></line>${label({ x: 185, y: 222, text: `extension (m)`, anchor: "middle", size: SIZE.value, class: "text-ink" })}${label({ x: 14, y: 120, text: 'force (N)', anchor: "start", size: SIZE.value, class: "text-ink", rotate: -90 })}${label({ x: 300, y: (yPixel(LIMIT) - 5).toFixed(1), text: `limit`, anchor: "end", size: SIZE.tick, class: "text-ink" })}`;
    const graph =
      axis +
      `<path d="${path(straight)}" class="fig-accent" fill="none" stroke-width="3"></path><path d="${path(curved)}" class="fig-warn" fill="none" stroke-width="3"></path><circle cx="${xPixel(e).toFixed(1)}" cy="${yPixel(force).toFixed(1)}" r="5" class="fig-good"></circle>`;

    svg.innerHTML = spring + graph;

    readout.innerHTML =
      `Force <strong>${force} N</strong>, spring constant <strong>${k} N/m</strong>. Extension = <strong>${e.toFixed(3)} m</strong>. Energy stored = <strong>${stored.toFixed(2)} J</strong>. ` +
      (beyond
        ? `<em>The force is past the limit of proportionality, so the graph has curved.</em>`
        : `<em>Now double the force to ${Math.min(force * 2, 40)} N. What happens to the extension?</em>`);
  }

  react([forceInput, springInput], update);
}
