// Guided investigation for velocity-time graphs.
//
// A velocity-time graph with constant acceleration. Three sliders set the
// initial velocity u, the acceleration a and the time T. The line is drawn, the
// area between the line and the time axis is shaded, and the readout gives the
// acceleration as the gradient and the displacement as the signed area.
//
// Plain HTML, SVG and three range inputs, so it is keyboard-operable with no
// framework, and no colour of its own: the fig-* classes carry the theme. The
// runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

const LEFT = 60;
const RIGHT = 440;
const TOP = 40;
const BOTTOM = 220;
const T_MAX = 11;
const V_MIN = -25;
const V_MAX = 25;

function toPx(t) {
  return LEFT + (t / T_MAX) * (RIGHT - LEFT);
}

function toPy(v) {
  return BOTTOM - ((v - V_MIN) / (V_MAX - V_MIN)) * (BOTTOM - TOP);
}

function label(text, x, y) {
  return (
    `<text class="fig-ink" x="${x.toFixed(1)}" y="${y.toFixed(1)}" ` +
    `font-size="14">${text}</text>`
  );
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A velocity-time graph with a straight line, the shaded area between the line and the time axis, and the acceleration and displacement read out below",
    width: 480,
    height: 260,
  });

  const inputs = {
    u: slider(el, { show: false,
      id: "u",
      label: "Initial velocity u, m/s",
      min: -10,
      max: 20,
      value: 4,
    }),
    a: slider(el, { show: false,
      id: "a",
      label: "Acceleration a, m/s squared",
      min: -5,
      max: 5,
      step: 0.5,
      value: 3,
    }),
    t: slider(el, { show: false,
      id: "t",
      label: "Time T, seconds",
      min: 1,
      max: 10,
      value: 6,
    }),
  };

  function draw() {
    const u = Number(inputs.u.value);
    const a = Number(inputs.a.value);
    const T = Number(inputs.t.value);
    const v = u + a * T;
    const displacement = u * T + 0.5 * a * T * T;

    const axes =
      `<line class="fig-grid" x1="${LEFT}" y1="${toPy(0).toFixed(1)}" ` +
      `x2="${RIGHT}" y2="${toPy(0).toFixed(1)}" stroke-width="1"></line>` +
      `<line class="fig-grid" x1="${toPx(0).toFixed(1)}" y1="${TOP}" ` +
      `x2="${toPx(0).toFixed(1)}" y2="${BOTTOM}" stroke-width="1"></line>`;

    const shade =
      `<polygon class="fig-good" opacity="0.20" points="` +
      `${toPx(0).toFixed(1)},${toPy(0).toFixed(1)} ` +
      `${toPx(0).toFixed(1)},${toPy(u).toFixed(1)} ` +
      `${toPx(T).toFixed(1)},${toPy(v).toFixed(1)} ` +
      `${toPx(T).toFixed(1)},${toPy(0).toFixed(1)}"></polygon>`;

    let crossing = "";
    if ((u > 0 && v < 0) || (u < 0 && v > 0)) {
      const t0 = -u / a;
      crossing =
        `<circle class="fig-warn" cx="${toPx(t0).toFixed(1)}" ` +
        `cy="${toPy(0).toFixed(1)}" r="4"></circle>`;
    }

    const line =
      `<line class="fig-accent" x1="${toPx(0).toFixed(1)}" y1="${toPy(u).toFixed(1)}" ` +
      `x2="${toPx(T).toFixed(1)}" y2="${toPy(v).toFixed(1)}" stroke-width="3"></line>`;

    const guides =
      `<line class="fig-grid" x1="${toPx(T).toFixed(1)}" y1="${toPy(v).toFixed(1)}" ` +
      `x2="${toPx(T).toFixed(1)}" y2="${toPy(0).toFixed(1)}" stroke-width="1" ` +
      `stroke-dasharray="4 4"></line>` +
      label("t", RIGHT + 4, toPy(0) + 4) +
      label("v", toPx(0) - 16, TOP + 4);

    svg.innerHTML = axes + shade + line + crossing + guides;

    const rising = a > 0 ? "rising" : a < 0 ? "falling" : "horizontal";
    readout.textContent =
      `u = ${u} m/s, a = ${a} m/s squared, T = ${T} s. ` +
      `The line is ${rising}, so the acceleration is ${a} m/s squared, the ` +
      `gradient. The final velocity is v = u + aT = ${v} m/s. ` +
      `The signed area is the displacement: ${displacement.toFixed(1)} m.` +
      (crossing
        ? " The line crosses the time axis, so part of the area is negative."
        : "");

    svg.setAttribute(
      "aria-label",
      `Velocity-time graph with initial velocity ${u} metres per second, ` +
        `acceleration ${a} metres per second squared and time ${T} seconds. ` +
        `The final velocity is ${v} metres per second and the displacement is ` +
        `${displacement.toFixed(1)} metres.`
    );
  }

  react(Object.values(inputs), draw);
}
