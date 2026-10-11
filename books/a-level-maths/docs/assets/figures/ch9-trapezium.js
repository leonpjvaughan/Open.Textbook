// Guided investigation for the trapezium rule: more strips, smaller error, and
// which side of the true area the estimate falls.
//
// Section 9.4 teaches the rule, the over/under test from the bend of the curve,
// and rectangle bounds. The figure lets the reader see all three: choose a
// curve, change the number of strips, and watch the estimate close on the true
// area from one side. Two curves bend upwards and one bends downwards, so the
// direction of the error is not the same every time.
//
// Plain HTML, SVG, a select and one range input, so it is keyboard-operable with
// no framework, and no colour of its own: the fig-* classes carry the theme.
// Runtime text is plain text, never TeX.

const MAPS = [
  {
    id: "square",
    label: "y = x squared, from 0 to 2",
    f: (x) => x * x,
    a: 0,
    b: 2,
    exact: 8 / 3,
    exactText: "8/3 = 2.6667",
    xMin: 0,
    xMax: 2,
    yMax: 4.4,
  },
  {
    id: "root",
    label: "y = the square root of x, from 0 to 4",
    f: (x) => Math.sqrt(x),
    a: 0,
    b: 4,
    exact: 16 / 3,
    exactText: "16/3 = 5.3333",
    xMin: 0,
    xMax: 4,
    yMax: 2.4,
  },
  {
    id: "reciprocal",
    label: "y = 1 divided by (1 + x), from 0 to 1",
    f: (x) => 1 / (1 + x),
    a: 0,
    b: 1,
    exact: Math.log(2),
    exactText: "ln 2 = 0.6931",
    xMin: 0,
    xMax: 1,
    yMax: 1.15,
  },
];

const LEFT = 42;
const RIGHT = 372;
const TOP = 20;
const BOTTOM = 300;

function short(value, places = 5) {
  return value.toFixed(places);
}

function trapezium(map, n) {
  const h = (map.b - map.a) / n;
  let sum = map.f(map.a) + map.f(map.b);
  for (let i = 1; i < n; i += 1) {
    sum += 2 * map.f(map.a + i * h);
  }
  return (h / 2) * sum;
}

export function mount(el) {
  const options = MAPS.map((m) => `<option value="${m.id}">${m.label}</option>`).join("");

  el.innerHTML = `
    <div class="fig-controls">
      <label class="fig-field">Curve
        <select data-role="map">${options}</select>
      </label>
      <label class="fig-field">Number of strips
        <input data-role="strips" type="range" min="2" max="16" step="1" value="4">
      </label>
    </div>
    <svg viewBox="0 0 400 320" width="100%" role="img"
         aria-label="Curve with straight-topped trapezia drawn beneath it, and a readout of the estimate and the true area"></svg>
    <p class="fig-readout" data-role="readout" aria-live="polite"></p>
    <p class="fig-note" data-role="verdict"></p>
  `;

  const select = el.querySelector('[data-role="map"]');
  const slider = el.querySelector('[data-role="strips"]');
  const readout = el.querySelector('[data-role="readout"]');
  const verdict = el.querySelector('[data-role="verdict"]');
  const svg = el.querySelector("svg");

  function currentMap() {
    return MAPS.find((m) => m.id === select.value) || MAPS[0];
  }

  function draw() {
    const map = currentMap();
    const n = Number(slider.value);
    const h = (map.b - map.a) / n;
    const px = (x) => LEFT + ((x - map.xMin) / (map.xMax - map.xMin)) * (RIGHT - LEFT);
    const py = (y) => BOTTOM - (y / map.yMax) * (BOTTOM - TOP);

    const estimate = trapezium(map, n);
    const error = estimate - map.exact;

    const axes =
      `<line class="fig-grid" x1="${LEFT}" y1="${py(0).toFixed(1)}" ` +
      `x2="${RIGHT}" y2="${py(0).toFixed(1)}" stroke-width="1"></line>`;

    const curvePoints = [];
    for (let i = 0; i <= 200; i += 1) {
      const x = map.xMin + ((map.xMax - map.xMin) * i) / 200;
      curvePoints.push(`${px(x).toFixed(1)},${py(map.f(x)).toFixed(1)}`);
    }
    const curve =
      `<polyline class="fig-accent" fill="none" points="${curvePoints.join(" ")}"></polyline>`;

    // Each strip: a translucent trapezium and its straight top.
    let stripLayer = "";
    for (let i = 0; i < n; i += 1) {
      const x1 = map.a + i * h;
      const x2 = x1 + h;
      const y1 = map.f(x1);
      const y2 = map.f(x2);
      const corners = [
        `${px(x1).toFixed(1)},${py(0).toFixed(1)}`,
        `${px(x1).toFixed(1)},${py(y1).toFixed(1)}`,
        `${px(x2).toFixed(1)},${py(y2).toFixed(1)}`,
        `${px(x2).toFixed(1)},${py(0).toFixed(1)}`,
      ].join(" ");
      stripLayer += `<polygon class="fig-accent" opacity="0.14" points="${corners}"></polygon>`;
      stripLayer +=
        `<line class="fig-good" x1="${px(x1).toFixed(1)}" y1="${py(y1).toFixed(1)}" ` +
        `x2="${px(x2).toFixed(1)}" y2="${py(y2).toFixed(1)}" stroke-width="1.6"></line>`;
    }

    svg.innerHTML = axes + curve + stripLayer;

    readout.textContent =
      `With ${n} strips the estimate is ${short(estimate)}. The true area is ` +
      `${map.exactText}, so the error is ${error >= 0 ? "+" : ""}${short(error)}.`;

    if (Math.abs(error) < 1e-6) {
      verdict.textContent =
        "The estimate has reached the true area to the accuracy of this display.";
    } else if (error > 0) {
      verdict.textContent =
        "This estimate is too large. The curve bends upwards here, so each " +
        "straight top lies above the curve.";
    } else {
      verdict.textContent =
        "This estimate is too small. The curve bends downwards here, so each " +
        "straight top lies below the curve.";
    }
  }

  select.addEventListener("change", draw);
  slider.addEventListener("input", draw);
  draw();
}
