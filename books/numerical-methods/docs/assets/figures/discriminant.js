// One point in the plane, and the directions the equation allows through it.
//
// The page states the test — Δ = B² − 4AC — works three equations by hand, and hands
// over a program that computes the sign. What a program cannot show is what the sign
// *looks* like, so this figure draws the count the test is really making: two real
// directions through a point for a hyperbolic equation, one for a parabolic one, none
// for an elliptic one. The empty plane in the elliptic case is the picture, not a
// drawing that failed to load.
//
// The three sliders are A, B and C — the coefficients of u_xx, u_xy and u_yy, in that
// order — and they move in whole numbers, so every value the figure prints is exact
// and the claim the readout makes is the claim the verifier checks.
import { SIZE, circle, fmt, label, line, panel, react, slider } from "./kit.js";

const WIDTH = 560;
const HEIGHT = 300;
/** The plane the directions are drawn in: centre and half-size, in viewBox units. */
const PLANE = { cx: 165, cy: 150, half: 110 };
/** Where the words go: to the right of the plane, on the same baseline set. */
const NOTE = 310;

/** A number as this figure prints it: a minus sign the reader recognises. */
const num = (value) => fmt(value, 0).replace("-", "\u2212");
/** A fraction of a slope, to two places, with the same minus sign. */
const dec = (value) => fmt(value, 2).replace("-", "\u2212");

/**
 * The real directions through the point: the roots of A m² − B m + C = 0.
 *
 * A direction is carried as a vector rather than a slope, because A = 0 leaves one
 * direction whose slope is infinite, and an infinite slope can be neither drawn nor
 * printed. `{ dx: 0, dy: 1, m: null }` is that direction, and `m` is what the
 * readout names when there is one.
 */
function directions(A, B, C) {
  const delta = B * B - 4 * A * C;
  if (A === 0 && B === 0 && C === 0) return { delta, dirs: [] };
  if (delta < 0) return { delta, dirs: [] };
  if (A !== 0) {
    const mid = B / (2 * A);
    const root = Math.sqrt(delta) / (2 * A);
    const slopes = delta === 0 ? [mid] : [mid + root, mid - root];
    return { delta, dirs: slopes.map((m) => ({ dx: 1, dy: m, m })) };
  }
  // A = 0 reads as -B·dx·dy + C·dx² = 0: dx = 0 is one direction, and (B, C) is the
  // other whenever B is not zero. With B = 0 the vertical direction is the only one,
  // which is the single direction the parabolic case asks for.
  const dirs = [{ dx: 0, dy: 1, m: null }];
  if (B !== 0) dirs.push({ dx: B, dy: C, m: C / B });
  return { delta, dirs };
}

/** The segment of one direction through the point, clipped to the plane. */
function segment(dir) {
  const t = Math.min(
    dir.dx === 0 ? Infinity : PLANE.half / Math.abs(dir.dx),
    dir.dy === 0 ? Infinity : PLANE.half / Math.abs(dir.dy),
  );
  return {
    x1: PLANE.cx - dir.dx * t,
    y1: PLANE.cy + dir.dy * t, // maths +y points up, an SVG's +y points down
    x2: PLANE.cx + dir.dx * t,
    y2: PLANE.cy - dir.dy * t,
  };
}

/** What the figure says beside the plane: the class, the count, the slopes. */
function reading(A, B, C) {
  const { delta, dirs } = directions(A, B, C);
  if (A === 0 && B === 0 && C === 0) {
    return {
      delta,
      dirs,
      verdict: "No class",
      count: "no second derivative to read",
      slopes: "",
      name: "no class",
    };
  }
  const verdict = delta > 0 ? "Hyperbolic" : delta === 0 ? "Parabolic" : "Elliptic";
  const count = delta > 0 ? "two directions" : delta === 0 ? "one direction" : "no real direction";
  const word = (dir) => (dir.m === null ? "vertical" : `m = ${dec(dir.m)}`);
  const slopes =
    dirs.length === 0 ? "" : `${dirs.length > 1 ? "slopes" : "slope"} ${dirs.map(word).join(" and ")}`;
  return {
    delta,
    dirs,
    verdict,
    count,
    slopes,
    name: verdict.toLowerCase(),
  };
}

export function mount(el) {
  const { svg, readout, caption, claim } = panel(el, {
    label: "The class of a second-order equation drawn as directions through one point",
    description:
      "A plane with one point marked at its centre and the directions the equation " +
      "allows through that point: two straight lines when the discriminant is above " +
      "zero, one when it is exactly zero, none when it is below. Three sliders set A, " +
      "B and C, the coefficients of the three second derivatives, and beside the plane " +
      "the class is named with the count of directions and the slopes. Under the " +
      "drawing a line of arithmetic gives B squared minus four A C and the class it " +
      "names.",
    prompt:
      "Set A = 1, B = 0 and C = 1, the coefficients of Laplace's equation. Before you " +
      "move anything: how many directions will the point show, and what will the class be?",
    width: WIDTH,
    height: HEIGHT,
  });

  const A = slider(el, {
    id: "coef-a",
    label: "A",
    name: "A, the coefficient of the second derivative in x",
    min: -3,
    max: 3,
    step: 1,
    value: 1,
    show: true,
  });
  const B = slider(el, {
    id: "coef-b",
    label: "B",
    name: "B, the coefficient of the mixed second derivative",
    min: -6,
    max: 6,
    step: 1,
    value: 0,
    show: true,
  });
  const C = slider(el, {
    id: "coef-c",
    label: "C",
    name: "C, the coefficient of the second derivative in y",
    min: -3,
    max: 3,
    step: 1,
    value: 1,
    show: true,
  });

  const draw = () => {
    const [a, b, c] = [A, B, C].map((control) => Number(control.value));
    const { delta, dirs, verdict, count, slopes, name } = reading(a, b, c);
    const marks = [
      // The two axes of the plane, drawn through the point the directions share.
      line({
        x1: PLANE.cx - PLANE.half,
        y1: PLANE.cy,
        x2: PLANE.cx + PLANE.half,
        y2: PLANE.cy,
        class: "fig-grid",
      }),
      line({
        x1: PLANE.cx,
        y1: PLANE.cy - PLANE.half,
        x2: PLANE.cx,
        y2: PLANE.cy + PLANE.half,
        class: "fig-grid",
      }),
      label({
        x: PLANE.cx + PLANE.half - 6,
        y: PLANE.cy + 24,
        text: "x",
        anchor: "end",
        size: SIZE.tick,
      }),
      label({ x: PLANE.cx + 14, y: PLANE.cy - PLANE.half + 20, text: "y", size: SIZE.tick }),
      ...dirs.map((dir) => {
        const s = segment(dir);
        return line({ ...s, class: "fig-line", width: 2.5 });
      }),
      circle({ cx: PLANE.cx, cy: PLANE.cy, r: 5, class: "fig-accent" }),
      // The words beside the plane: what the count means, and what the roots are.
      label({ x: NOTE, y: 96, text: verdict, size: SIZE.heading, weight: 600, anchor: "start" }),
      label({ x: NOTE, y: 130, text: count, size: SIZE.tick, anchor: "start" }),
      ...(slopes
        ? [label({ x: NOTE, y: 158, text: slopes, size: SIZE.tick, anchor: "start" })]
        : []),
    ];
    svg.innerHTML = marks.join("");

    if (a === 0 && b === 0 && c === 0) {
      readout.textContent = "A = B = C = 0: the equation has no second derivative, so there is no class.";
      caption.textContent = "The test reads the second derivatives, so it needs at least one of them.";
      claim([]);
      return;
    }
    const term = 4 * a * c;
    const arithmetic = term >= 0 ? `${num(b * b)} − ${num(term)}` : `${num(b * b)} + ${num(-term)}`;
    readout.textContent =
      `B² − 4AC = ${arithmetic} = ${num(delta)} → ${name}: ${count}`;
    caption.textContent = "Why does one direction appear exactly when B² − 4AC is zero?";
    claim([
      {
        label: "the discriminant",
        expression: "B**2 - 4*A*C",
        values: { A: a, B: b, C: c },
        answer: delta,
        shown: num(delta),
      },
    ]);
  };

  react([A, B, C], draw);
}
