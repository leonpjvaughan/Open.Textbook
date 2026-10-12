// Guided investigation for the proof of the trapezium area formula.
//
// The proof is one picture: turn a second copy of the trapezium upside down, fit it
// to the first, and the parallelogram that appears has base (a + b) and height h,
// so one trapezium is half of it. The toggle is the proof step — a reader who
// presses it has performed the construction rather than read about it.
//
// Predict -> Test -> Explain per AGENTS.md P6: the page asks what shape the two
// copies will make before the toggle is pressed. Colours come from CSS classes, so
// the figure adapts to every bundle and both schemes; the readout is `aria-live`.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-trapezium-double" style="max-width:520px">
      <svg viewBox="0 0 420 250" width="100%" height="250" role="img"
           aria-label="A trapezium, and a second copy turned upside down to make a parallelogram whose base is the sum of the two parallel sides"></svg>
      <label style="display:block;margin:.5rem 0 .2rem">
        Top side: <input class="top" type="range" min="20" max="100" step="5" value="60"
               aria-label="Length of the shorter parallel side">
      </label>
      <label style="display:block;margin:.2rem 0 .2rem">
        Height: <input class="height" type="range" min="50" max="130" step="5" value="100"
               aria-label="Distance between the parallel sides">
      </label>
      <label style="display:block;margin:.2rem 0 .4rem">
        <input class="add" type="checkbox"> Add the second copy
      </label>
      <p class="readout" aria-live="polite" style="margin:.3rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const top = el.querySelector(".top");
  const height = el.querySelector(".height");
  const add = el.querySelector(".add");
  const readout = el.querySelector(".readout");

  // The longer parallel side is fixed so the picture stays still, and the shorter
  // one is the slider. `LEFT` and `BASE` are chosen so the joined parallelogram
  // fits the viewBox at every setting: the far corner is at `LEFT + BASE + a`.
  const BASE = 140;
  const LEFT = 40;
  const GROUND = 200;

  const text = (x, y, label, cls = "fig-ink") =>
    `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" text-anchor="middle" ` +
    `font-size="13" class="${cls}">${label}</text>`;

  function draw() {
    const a = Number(top.value); // the shorter parallel side
    const h = Number(height.value);
    const topY = GROUND - h;

    // The first trapezium: parallel sides a (on top) and BASE (on the floor),
    // centred so the shape looks like a trapezium rather than a wedge.
    const inset = (BASE - a) / 2;
    const T1 = [{ x: LEFT + inset, y: topY }, { x: LEFT + inset + a, y: topY },
                { x: LEFT + BASE, y: GROUND }, { x: LEFT, y: GROUND }];

    // The second copy is the first rotated through 180 degrees about the midpoint
    // of its right sloping side, so the two share that edge and the pair makes a
    // parallelogram. Rotating about a point: p -> 2M - p, and 2M = B + C.
    const B = { x: LEFT + BASE, y: GROUND };
    const C = { x: LEFT + inset + a, y: topY };
    const turned = (p) => ({ x: B.x + C.x - p.x, y: B.y + C.y - p.y });
    const T2 = T1.map(turned);

    const joined = add.checked;
    const path = (pts) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

    const second = joined
      ? `<polygon points="${path(T2)}" fill="none" stroke-width="2" class="fig-warn"></polygon>`
      : "";

    // The parallelogram the pair makes, drawn only once both are present: its
    // corners are the two ends of the floor and the two ends of the top.
    const D = T1[0];
    const A = T1[3];
    const A2 = turned(A);
    const D2 = turned(D);
    const outline = joined
      ? `<polygon points="${path([A, D2, A2, D])}" fill="none" stroke-width="2" ` +
        `stroke-dasharray="6 5" class="fig-good"></polygon>`
      : "";

    readout.textContent = joined
      ? `The pair makes a parallelogram. Its base is a + b = ${a} + ${BASE} = ` +
        `${a + BASE}, its height is ${h}, so its area is ${(a + BASE) * h}. Two ` +
        `identical trapezia make it, so one is half of that: ` +
        `${(((a + BASE) * h) / 2).toFixed(0)}.`
      : `One trapezium, with parallel sides ${a} and ${BASE} and height ${h}. ` +
        `Predict what shape two of them will make, then add the second copy.`;

    svg.innerHTML = `
      <line x1="16" y1="${GROUND}" x2="404" y2="${GROUND}" stroke-width="2" class="fig-grid"></line>
      <polygon points="${path(T1)}" fill="none" stroke-width="2.5" class="fig-accent"></polygon>
      ${second}
      ${outline}
      ${text(LEFT + BASE / 2, GROUND + 22, `b = ${BASE}`)}
      ${text(LEFT + inset + a / 2, topY - 9, `a = ${a}`)}
      ${text(LEFT - 24, GROUND - h / 2, `h = ${h}`)}
      <line x1="${LEFT - 10}" y1="${GROUND}" x2="${LEFT - 10}" y2="${topY}"
            stroke-width="2" class="fig-ink"></line>`;
  }

  top.addEventListener("input", draw);
  height.addEventListener("input", draw);
  add.addEventListener("change", draw);
  draw();
}
