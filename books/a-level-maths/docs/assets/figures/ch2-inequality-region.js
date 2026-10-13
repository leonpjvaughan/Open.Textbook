// Guided investigation for the solution set of a quadratic inequality.
//
// The roots set where the parabola meets the x axis, and the inequality chooses
// the part above that axis or the part below it. That choice turns the solution
// set from one interval into a union, or back again, so the reader watches the
// set change on a number line. Predict, Test and Explain belong to the page.
//
// Pure HTML and SVG, an ES module, no colour of its own: the fig-* classes carry
// the theme. Runtime text is plain text, never TeX.

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
  el.innerHTML = `
    <div style="max-width:560px">
      <label style="display:block;margin:.2rem 0">
        First root:
        <input class="r1" type="range" min="-6" max="6" step="1" value="-2"
               aria-label="First root">
      </label>
      <label style="display:block;margin:.2rem 0">
        Second root:
        <input class="r2" type="range" min="-6" max="6" step="1" value="3"
               aria-label="Second root">
      </label>
      <label style="display:block;margin:.2rem 0 .6rem">
        Inequality:
        <select class="mode" aria-label="Inequality direction">
          <option value="gt">f(x) &gt; 0</option>
          <option value="ge">f(x) ≥ 0</option>
          <option value="lt">f(x) &lt; 0</option>
          <option value="le">f(x) ≤ 0</option>
        </select>
      </label>
      <svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" role="img"
           aria-label="A parabola crossing the x axis at its two roots, with the part that satisfies the inequality highlighted and the solution set marked on a number line below"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const r1Input = el.querySelector(".r1");
  const r2Input = el.querySelector(".r2");
  const modeInput = el.querySelector(".mode");
  const readout = el.querySelector(".readout");

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
        `<text x="${px.toFixed(1)}" y="${NL_Y + 20}" text-anchor="middle" ` +
        `font-size="13" class="text-ink">${x}</text>`;
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

  r1Input.addEventListener("input", draw);
  r2Input.addEventListener("input", draw);
  modeInput.addEventListener("change", draw);
  draw();
}
