// Guided investigation for the derivative as the gradient of the tangent.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

const X_MIN = -2.5;
const X_MAX = 2.5;
const SX = 72;
const SY = 20;
const CX = 200;
const CY = 150;

function f(x) {
  return x * x * x - 3 * x + 1;
}

function df(x) {
  return 3 * x * x - 3;
}

function xToPx(x) {
  return CX + x * SX;
}

function yToPx(y) {
  return CY - y * SY;
}

function curvePoints() {
  const points = [];
  for (let x = X_MIN; x <= X_MAX + 1e-9; x += 0.05) {
    points.push(`${xToPx(x).toFixed(1)},${yToPx(f(x)).toFixed(1)}`);
  }
  return points.join(" ");
}

function lineThrough(x, y, gradient, half) {
  const x1 = Math.max(X_MIN, x - half);
  const x2 = Math.min(X_MAX, x + half);
  const y1 = y + gradient * (x1 - x);
  const y2 = y + gradient * (x2 - x);
  return (
    `<line x1="${xToPx(x1).toFixed(1)}" y1="${yToPx(y1).toFixed(1)}" ` +
    `x2="${xToPx(x2).toFixed(1)}" y2="${yToPx(y2).toFixed(1)}" class="fig-accent"></line>`
  );
}

// The plot is 400 by 300. A chord from the point at a to the point at a + h can
// reach x = 3.9, past the right edge, so the segment is clipped to the frame and
// the end marker is drawn where the chord leaves it. Liang-Barsky, in pixels.
const FRAME_W = 400;
const FRAME_H = 300;
const FRAME_M = 3;

function clipSegment(x1, y1, x2, y2) {
  let t0 = 0;
  let t1 = 1;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const p = [-dx, dx, -dy, dy];
  const q = [x1 - FRAME_M, FRAME_W - FRAME_M - x1, y1 - FRAME_M, FRAME_H - FRAME_M - y1];
  for (let i = 0; i < 4; i += 1) {
    if (p[i] === 0) {
      if (q[i] < 0) return null;
    } else {
      const r = q[i] / p[i];
      if (p[i] < 0) {
        if (r > t1) return null;
        if (r > t0) t0 = r;
      } else {
        if (r < t0) return null;
        if (r < t1) t1 = r;
      }
    }
  }
  return {
    x1: x1 + t0 * dx,
    y1: y1 + t0 * dy,
    x2: x1 + t1 * dx,
    y2: y1 + t1 * dy,
  };
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A cubic curve with a movable point, a shrinking chord and the tangent at " +
      "the point",
    width: 400,
    height: 300,
    max: 520,
  });

  const aInput = slider(el, { show: false,
    id: "a",
    label: "Point x",
    min: -2.4,
    max: 2.4,
    step: 0.1,
    value: 1,
  });
  const hInput = slider(el, { show: false,
    id: "h",
    label: "Chord length h",
    min: 0.05,
    max: 1.5,
    step: 0.05,
    value: 1,
  });

  function axes() {
    return (
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(5)}" x2="${xToPx(0)}" y2="${yToPx(-5)}" class="fig-ink"></line>`
    );
  }

  function grid() {
    let lines = "";
    for (let x = X_MIN; x <= X_MAX; x += 0.5) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(5)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(-5)}" class="fig-grid"></line>`;
    }
    for (let y = -5; y <= 5; y += 1) {
      lines +=
        `<line x1="${xToPx(X_MIN)}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${xToPx(X_MAX)}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const a = Number(aInput.value);
    const h = Number(hInput.value);
    const fa = f(a);
    const fb = f(a + h);
    const chord = (fb - fa) / h;
    const tangent = df(a);

    const tangentLine = lineThrough(a, fa, tangent, 1);
    // The chord is clipped to the frame, and Q is drawn at the clipped end, so
    // a chord that runs off the plot never puts its marker outside it.
    const chordClip = clipSegment(xToPx(a), yToPx(fa), xToPx(a + h), yToPx(fb));
    const chordLine = chordClip
      ? `<line x1="${chordClip.x1.toFixed(1)}" y1="${chordClip.y1.toFixed(1)}" ` +
        `x2="${chordClip.x2.toFixed(1)}" y2="${chordClip.y2.toFixed(1)}" class="fig-warn"></line>`
      : "";
    const pointP = `<circle cx="${xToPx(a).toFixed(1)}" cy="${yToPx(fa).toFixed(1)}" r="4" class="fig-ink"></circle>`;
    const pointQ = chordClip
      ? `<circle cx="${chordClip.x2.toFixed(1)}" cy="${chordClip.y2.toFixed(1)}" r="4" class="fig-warn"></circle>`
      : "";
    const curve = `<polyline points="${curvePoints()}" class="fig-line"></polyline>`;

    svg.innerHTML = grid() + axes() + curve + chordLine + tangentLine + pointQ + pointP;

    const near =
      Math.abs(chord - tangent) < 0.05 ? "very close to" : "some way from";
    readout.textContent =
      `At x = ${a.toFixed(1)}, the value is ${fa.toFixed(2)}. ` +
      `The chord gradient is ${chord.toFixed(3)}. ` +
      `The tangent gradient is ${tangent.toFixed(3)}. ` +
      `The chord gradient is ${near} the tangent gradient.`;

    svg.setAttribute(
      "aria-label",
      `A cubic curve. A point is at x equals ${a.toFixed(1)}. ` +
        `The chord gradient is ${chord.toFixed(3)} and the tangent gradient ` +
        `is ${tangent.toFixed(3)}.`
    );
  }

  react([aInput, hInput], update);
}
