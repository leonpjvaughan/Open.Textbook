// Guided investigation for the solution set of a quadratic inequality.
//
// The roots set where the parabola meets the x axis, and the inequality chooses
// the part above that axis or the part below it. That choice turns the solution
// set from one interval into a union, or back again, so the reader watches the
// set change on a number line. Predict, Test and Explain belong to the page.
//
// Pure HTML and SVG, an ES module, no colour of its own: the fig-* classes carry
// the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the chooser,
// the live readout and the redraw — comes from `kit.js`.
import { SIZE, chooser, label, panel, react, slider } from "./kit.js";

const WIDTH = 460;
const HEIGHT = 330;
const X_MIN = -7;
const X_MAX = 7;
const Y_MIN = -12;
const Y_MAX = 16;
const PLOT_TOP = 20;
const PLOT_H = 200;
const NL_Y = 288;

function xToPx(x) {
  return ((x - X_MIN) / (X_MAX - X_MIN)) * WIDTH;
}

function yToPx(y) {
  return PLOT_TOP + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * PLOT_H;
}

function nlToPx(x) {
  return xToPx(x);
}

function satisfies(mode, y) {
  if (mode === "gt") return y > 0;
  if (mode === "ge") return y >= 0;
  if (mode === "lt") return y < 0;
  return y <= 0;
}

// The intervals of x where the inequality holds, as data the drawing and the
// readout both read.
function solutionIntervals(lo, hi, mode) {
  if (lo === hi) {
    if (mode === "ge") return [{ a: -Infinity, b: Infinity, aClosed: false, bClosed: false }];
    if (mode === "gt") {
      return [
        { a: -Infinity, b: lo, aClosed: false, bClosed: false },
        { a: lo, b: Infinity, aClosed: false, bClosed: false },
      ];
    }
    if (mode === "le") return [{ a: lo, b: lo, aClosed: true, bClosed: true }];
    return [];
  }
  if (mode === "gt" || mode === "ge") {
    const closed = mode === "ge";
    return [
      { a: -Infinity, b: lo, aClosed: false, bClosed: closed },
      { a: hi, b: Infinity, aClosed: closed, bClosed: false },
    ];
  }
  const closed = mode === "le";
  return [{ a: lo, b: hi, aClosed: closed, bClosed: closed }];
}

function bracket(v, closed, side) {
  if (v === -Infinity || v === Infinity) return side === "left" ? "(" : ")";
  if (side === "left") return closed ? "[" : "(";
  return closed ? "]" : ")";
}

function intervalText(iv) {
  const a = iv.a === -Infinity ? "-∞" : `${iv.a}`;
  const b = iv.b === Infinity ? "∞" : `${iv.b}`;
  return `${bracket(iv.a, iv.aClosed, "left")}${a}, ${b}${bracket(iv.b, iv.bClosed, "right")}`;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A parabola crossing the x axis at its two roots, with the part that " +
      "satisfies the inequality highlighted and the solution set marked on a " +
      "number line below",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });

  const r1Input = slider(el, {
    id: "r1",
    label: "First root:",
    name: "First root",
    min: -6,
    max: 6,
    step: 1,
    value: -2,
    show: false,
  });
  const r2Input = slider(el, {
    id: "r2",
    label: "Second root:",
    name: "Second root",
    min: -6,
    max: 6,
    step: 1,
    value: 3,
    show: false,
  });
  const modeInput = chooser(el, {
    id: "mode",
    label: "Inequality:",
    choices: [
      { value: "gt", label: "f(x) > 0" },
      { value: "ge", label: "f(x) ≥ 0" },
      { value: "lt", label: "f(x) < 0" },
      { value: "le", label: "f(x) ≤ 0" },
    ],
  });
  // `chooser()` has no `name` option, so the longer accessible name the module
  // carried is kept here.
  modeInput.setAttribute("aria-label", "Inequality direction");

  function draw() {
    const r1 = Number(r1Input.value);
    const r2 = Number(r2Input.value);
    const mode = modeInput.value;
    const lo = Math.min(r1, r2);
    const hi = Math.max(r1, r2);
    const value = (x) => (x - lo) * (x - hi);

    const samples = [];
    for (let x = X_MIN; x <= X_MAX + 0.001; x += 0.1) {
      samples.push({ x, y: value(x), good: satisfies(mode, value(x)) });
    }

    const base = samples
      .map((s) => `${xToPx(s.x).toFixed(1)},${yToPx(s.y).toFixed(1)}`)
      .join(" ");

    // Every run of samples that satisfies the inequality becomes a thick piece of
    // curve with the region between it and the axis shaded.
    let highlights = "";
    let run = [];
    const flush = () => {
      if (run.length > 1) {
        const line = run
          .map((s) => `${xToPx(s.x).toFixed(1)},${yToPx(s.y).toFixed(1)}`)
          .join(" ");
        const first = run[0];
        const last = run[run.length - 1];
        const region =
          `${xToPx(first.x).toFixed(1)},${yToPx(0).toFixed(1)} ` +
          `${line} ` +
          `${xToPx(last.x).toFixed(1)},${yToPx(0).toFixed(1)}`;
        highlights +=
          `<polygon points="${region}" class="fig-good" style="stroke:none" fill-opacity="0.12"></polygon>` +
          `<polyline points="${line}" class="fig-good" style="fill:none" stroke-width="2.5"></polyline>`;
      }
      run = [];
    };
    for (const sample of samples) {
      if (sample.good) run.push(sample);
      else flush();
    }
    flush();

    const axes =
      `<line x1="0" y1="${yToPx(0).toFixed(1)}" x2="${WIDTH}" y2="${yToPx(0).toFixed(1)}" class="fig-ink"></line>`;
    const curve = `<polyline points="${base}" class="fig-ink" style="fill:none" stroke-width="1.5"></polyline>`;

    // The number line below the parabola.
    const intervals = solutionIntervals(lo, hi, mode);
    let numberLine =
      `<line x1="${nlToPx(X_MIN)}" y1="${NL_Y}" x2="${nlToPx(X_MAX)}" y2="${NL_Y}" ` +
      `class="fig-ink" stroke-width="1.5"></line>`;
    for (let x = Math.ceil(X_MIN); x <= X_MAX; x += 1) {
      const px = nlToPx(x);
      numberLine +=
        `<line x1="${px.toFixed(1)}" y1="${NL_Y - 4}" x2="${px.toFixed(1)}" y2="${NL_Y + 4}" ` +
        `class="fig-ink"></line>` +
        // The end ticks are anchored inwards: a centred label at the end of the line hangs
        // half of itself outside the drawing, which is the defect the `canvas` check found.
        label({
          x: px,
          y: NL_Y + 20,
          text: x,
          anchor: px < 12 ? "start" : px > 448 ? "end" : "middle",
          size: SIZE.tick,
          class: "text-ink",
        });
    }
    for (const iv of intervals) {
      const a = iv.a === -Infinity ? X_MIN : Math.max(iv.a, X_MIN);
      const b = iv.b === Infinity ? X_MAX : Math.min(iv.b, X_MAX);
      if (b < X_MIN || a > X_MAX) continue;
      const x1 = nlToPx(a);
      const x2 = nlToPx(b);
      if (x2 - x1 > 0.5) {
        numberLine +=
          `<line x1="${x1.toFixed(1)}" y1="${NL_Y}" x2="${x2.toFixed(1)}" y2="${NL_Y}" ` +
          `class="fig-good" stroke-width="6"></line>`;
      }
    }
    for (const iv of intervals) {
      for (const [v, closed] of [
        [iv.a, iv.aClosed],
        [iv.b, iv.bClosed],
      ]) {
        if (v === -Infinity || v === Infinity) continue;
        if (v < X_MIN - 0.001 || v > X_MAX + 0.001) continue;
        const px = nlToPx(v);
        numberLine +=
          `<circle cx="${px.toFixed(1)}" cy="${NL_Y}" r="5" class="fig-good" ` +
          `${closed ? "" : 'style="fill:none" '}stroke-width="3"></circle>`;
      }
    }

    svg.innerHTML = axes + curve + highlights + numberLine;

    const rootText =
      lo === hi ? `The root is x = ${lo}.` : `The roots are x = ${lo} and x = ${hi}.`;
    let setText;
    if (intervals.length === 0) {
      setText = "No value of x satisfies the inequality, so the solution set is empty.";
    } else {
      const pieces = intervals.length === 1 ? "one piece" : "two separate pieces";
      setText =
        `The solution set is x ∈ ${intervals.map(intervalText).join(" ∪ ")}. ` +
        `The set has ${pieces}.`;
    }
    readout.textContent = `${rootText} ${setText}`;

    svg.setAttribute(
      "aria-label",
      `A parabola that meets the x axis at ${lo} and ${hi}, with the part that ` +
        `satisfies the inequality highlighted, and the solution set marked on a ` +
        `number line below.`
    );
  }

  react([r1Input, r2Input, modeInput], draw);
}
