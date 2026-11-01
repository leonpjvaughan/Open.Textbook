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
//
// The scaffolding — the surface, its accessible name, the controls, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider, toggle } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A trapezium, and a second copy turned upside down to make a parallelogram whose base is the sum of the two parallel sides",
    width: 420,
    height: 250,
    max: 520,
  });

  const top = slider(el, { show: false,
    id: "top",
    label: "Top side:",
    name: "Length of the shorter parallel side",
    min: 20,
    max: 100,
    step: 5,
    value: 60,
  });
  const height = slider(el, { show: false,
    id: "height",
    label: "Height:",
    name: "Distance between the parallel sides",
    min: 50,
    max: 130,
    step: 5,
    value: 100,
  });
  const add = toggle(el, {
    id: "add",
    label: "Add the second copy",
  });

  // The longer parallel side is fixed so the picture stays still, and the shorter
  // one is the slider. `LEFT` and `BASE` are chosen so the joined parallelogram
  // fits the viewBox at every setting: the far corner is at `LEFT + BASE + a`.
  const BASE = 140;
  const LEFT = 40;
  const GROUND = 200;

  const text = (x, y, words, cls = "text-ink") =>
    label({ x, y, text: words, size: SIZE.tick, class: cls });

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
      ? `<polygon points="${path(T2)}" style="fill:none" stroke-width="2" class="fig-warn"></polygon>`
      : "";

    // The parallelogram the pair makes, drawn only once both are present: its
    // corners are the two ends of the floor and the two ends of the top.
    const D = T1[0];
    const A = T1[3];
    const A2 = turned(A);
    const D2 = turned(D);
    const outline = joined
      ? `<polygon points="${path([A, D2, A2, D])}" style="fill:none" stroke-width="2" ` +
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
      <polygon points="${path(T1)}" style="fill:none" stroke-width="2.5" class="fig-accent"></polygon>
      ${second}
      ${outline}
      ${text(LEFT + BASE / 2, GROUND + 22, `b = ${BASE}`)}
      ${text(LEFT + inset + a / 2, topY - 9, `a = ${a}`)}
      ${text(LEFT + 10, GROUND - h / 2, `h = ${h}`)}
      <line x1="${LEFT - 10}" y1="${GROUND}" x2="${LEFT - 10}" y2="${topY}"
            stroke-width="2" class="fig-ink"></line>`;
  }

  react([top, height, add], draw);
}
