// Guided investigation: how y = f(x + a) moves a graph.
//
// Guided, not a sandbox (AGENTS.md P6): the page asks the reader to predict which
// way the graph moves when `a` is positive, then to explain why the sign inside
// the bracket appears opposite to the movement. One control changes one thing,
// the value of `a`, and the readout reports where the turning point lands rather
// than stating the rule. Colours come from CSS classes, so the figure adapts to
// every bundle and both schemes.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A parabola and a copy of it that shifts left or right along the x axis as the value of a changes",
    width: 600,
    height: 300,
    max: 560,
  });

  const a = slider(el, { show: false,
    id: "shift",
    label: "Value of a in y = f(x + a):",
    name: "Value of a in y equals f of x plus a",
    min: -3,
    max: 3,
    value: 2,
    show: false,
  });

  const ORIGIN_X = 320;
  const ORIGIN_Y = 250;
  const X_SCALE = 55;
  const Y_SCALE = 21;

  const px = (x) => ORIGIN_X + x * X_SCALE;
  const py = (y) => ORIGIN_Y - y * Y_SCALE;

  // An unfilled polyline through the graph of f. `fill:none` is an inline style
  // because a class rule would override the presentation attribute.
  function curve(f, className, from, to) {
    let d = "";
    for (let i = 0; i <= 96; i += 1) {
      const x = from + ((to - from) * i) / 96;
      d += `${i === 0 ? "M" : "L"} ${px(x).toFixed(1)} ${py(f(x)).toFixed(1)} `;
    }
    return `<path d="${d}" style="fill:none" class="${className}" stroke-width="2.5"></path>`;
  }

  react(a, () => {
    const av = Number(a.value);
    const moved = Math.abs(av);
    const direction = av > 0 ? "left" : "right";
    const inside = av > 0 ? `x + ${av}` : `x - ${-av}`;

    const shiftLine =
      av === 0
        ? ""
        : `<line x1="${px(0)}" y1="${ORIGIN_Y}" x2="${px(-av)}" y2="${ORIGIN_Y}" ` +
          `style="fill:none" class="fig-warn" stroke-width="2" stroke-dasharray="5 4"></line>` +
          label({ x: (px(0) + px(-av)) / 2, y: ORIGIN_Y - 12, text: `${moved} ${direction}`, anchor: "middle", size: SIZE.value, class: "text-warn" });

    const shiftVertex =
      av === 0
        ? label({ x: px(0) + 10, y: py(0) - 10, text: "turning point", anchor: "start", size: SIZE.value, class: "text-ink" })
        : `<circle cx="${px(-av)}" cy="${py(0)}" r="6" class="fig-good"></circle>` +
          label({ x: px(-av) + 10, y: py(0) - 10, text: `(${-av}, 0)`, anchor: "start", size: SIZE.value, class: "text-good" });

    svg.innerHTML =
      `<line x1="40" y1="${ORIGIN_Y}" x2="580" y2="${ORIGIN_Y}" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${ORIGIN_X}" y1="40" x2="${ORIGIN_X}" y2="272" class="fig-ink" stroke-width="2"></line>` +
      label({ x: 586, y: ORIGIN_Y - 8, text: "x", anchor: "end", size: SIZE.value, class: "text-ink" }) +
      label({ x: ORIGIN_X + 10, y: 52, text: "y", anchor: "start", size: SIZE.value, class: "text-ink" }) +
      curve((x) => x * x, "fig-grid", -3.4, 3.4) +
      curve((x) => (x + av) * (x + av), "fig-accent", -3.4, 3.4) +
      shiftLine +
      `<circle cx="${px(0)}" cy="${py(0)}" r="4" class="fig-ink"></circle>` +
      shiftVertex +
      label({ x: px(2.4), y: py(6.4), text: "y = f(x)", anchor: "start", size: SIZE.value, class: "text-ink" }) +
      label({ x: px(1.4 - av), y: py(2.2), text: "y = f(x + a)", anchor: "start", size: SIZE.value, class: "text-accent" });

    readout.textContent =
      av === 0
        ? "a = 0, so the graph has not moved. Move the slider to compare the two curves."
        : `a = ${av}, so the rule is y = f(${inside}). The turning point moved from ` +
          `(0, 0) to (${-av}, 0): the graph moved ${moved} unit${moved === 1 ? "" : "s"} ` +
          `${direction}. Track the point at x = 0 on y = f(x) to check.`;
  });
}
