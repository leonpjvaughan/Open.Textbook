// Guided investigation for the change-of-sign test: an interval, and whether its
// two ends agree.
//
// The section teaches the intermediate value theorem's practical form — two
// opposite signs mean a root lies between — and its two traps: an even number of
// crossings, and a function that is not continuous. This figure lets the reader
// find both rather than be told about them: slide the ends until the signs agree
// while the curve still crosses twice.
//
// Plain HTML, SVG and two range inputs, so it is keyboard-operable with no
// framework, and no colour of its own: the fig-* classes carry the theme. Runtime
// text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. The verdict line is the figure's
// own text, so it stays here.
import { panel, slider, react } from "./kit.js";

const X_MIN = -2.5;
const X_MAX = 2.5;
const Y_MIN = -3.5;
const Y_MAX = 4.5;
const LEFT = 40;
const RIGHT = 376;
const TOP = 18;
const BOTTOM = 340;

function f(x) {
  return x * x * x - 3 * x + 1;
}

function toPx(x) {
  return LEFT + ((x - X_MIN) / (X_MAX - X_MIN)) * (RIGHT - LEFT);
}

function toPy(y) {
  const clamped = Math.max(Y_MIN, Math.min(Y_MAX, y));
  return BOTTOM - ((clamped - Y_MIN) / (Y_MAX - Y_MIN)) * (BOTTOM - TOP);
}

function curve() {
  const points = [];
  for (let i = 0; i <= 240; i += 1) {
    const x = X_MIN + ((X_MAX - X_MIN) * i) / 240;
    points.push(`${toPx(x).toFixed(1)},${toPy(f(x)).toFixed(1)}`);
  }
  return `<polyline class="fig-accent" fill="none" points="${points.join(" ")}"></polyline>`;
}

function sign(v) {
  if (Math.abs(v) < 0.005) return "zero";
  return v > 0 ? "positive" : "negative";
}

function short(v) {
  return v.toFixed(3);
}

export function mount(el) {
  const { root, svg, readout } = panel(el, {
    label:
      "Curve of x cubed minus three x plus one, with an interval marked " +
      "between two movable ends and the sign of the function shown at each end",
    width: 400,
    height: 366,
  });

  const aInput = slider(el, { show: false,
    id: "a",
    label: "Left end, a",
    min: -2.4,
    max: 2.2,
    step: 0.1,
    value: -2,
  });
  const bInput = slider(el, { show: false,
    id: "b",
    label: "Right end, b",
    min: -2.2,
    max: 2.4,
    step: 0.1,
    value: 2,
  });

  const verdict = document.createElement("p");
  verdict.className = "fig-note";
  root.append(verdict);

  function draw() {
    let a = Number(aInput.value);
    let b = Number(bInput.value);
    if (a > b) [a, b] = [b, a];

    const fa = f(a);
    const fb = f(b);

    const axes =
      `<line class="fig-grid" x1="${toPx(X_MIN)}" y1="${toPy(0)}" ` +
      `x2="${toPx(X_MAX)}" y2="${toPy(0)}" stroke-width="1"></line>` +
      `<line class="fig-grid" x1="${toPx(0)}" y1="${toPy(Y_MIN)}" ` +
      `x2="${toPx(0)}" y2="${toPy(Y_MAX)}" stroke-width="1"></line>`;

    const band =
      `<rect class="fig-grid" x="${toPx(a).toFixed(1)}" y="${TOP}" ` +
      `width="${Math.max(0, toPx(b) - toPx(a)).toFixed(1)}" height="${BOTTOM - TOP}" ` +
      `opacity="0.18"></rect>`;

    const ends =
      `<circle class="fig-ink" cx="${toPx(a).toFixed(1)}" cy="${toPy(fa).toFixed(1)}" r="4"></circle>` +
      `<circle class="fig-ink" cx="${toPx(b).toFixed(1)}" cy="${toPy(fb).toFixed(1)}" r="4"></circle>`;

    svg.innerHTML = axes + band + curve() + ends;

    readout.textContent =
      `With a = ${short(a)} and b = ${short(b)}: f(a) = ${short(fa)}, which is ` +
      `${sign(fa)}; f(b) = ${short(fb)}, which is ${sign(fb)}.`;

    const differ = fa * fb < 0;
    let message;
    if (fa === 0 || fb === 0) {
      message = "One end is the root itself, so the interval is closed at that end.";
    } else if (differ) {
      message =
        "The signs differ, so there is a root between a and b. This is the " +
        "change-of-sign test working.";
    } else {
      // The trap: two crossings inside one interval leave the ends agreeing.
      let crossings = 0;
      const steps = 400;
      let previous = f(a);
      for (let i = 1; i <= steps; i += 1) {
        const x = a + ((b - a) * i) / steps;
        const current = f(x);
        if (previous * current < 0) crossings += 1;
        previous = current;
      }
      message =
        crossings >= 2
          ? `The signs are the same, yet the curve crosses the axis ${crossings} ` +
            "times between a and b. Two crossings can agree at the ends, which is " +
            "why the test is a sufficient condition and not a necessary one."
          : "The signs are the same and the curve does not cross between a and b, " +
            "so this interval gives you no root.";
    }
    verdict.textContent = message;
  }

  react([aInput, bInput], draw);
}
