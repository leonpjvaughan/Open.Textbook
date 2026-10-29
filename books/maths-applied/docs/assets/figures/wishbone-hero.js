// The hero: the front suspension seen from in front of the car, with the wheel
// moving and every question the chapter asks answered in the readout.
//
// The reader moves the wheel up and down, because that is the quantity a car has:
// "40 mm of bump" means something, "five degrees of lower-arm rotation" does not.
// The model turns travel into the lower arm's angle, so the control and the
// mathematics each keep their own vocabulary.
//
// **The tyre is drawn as its cross-section, not as a circle.** A wheel seen from
// the front is 0.2 m wide and 0.4 m across, so it draws as a rectangle — and a
// rectangle *leans* when the wheel's camber changes, which a circle cannot show. The
// first version of this figure drew the wheel as a disc and then had to claim a
// camber the drawing could not display.
//
// Nothing here carries a colour, and every number comes from
// `data/mechanism.js` — the same model the rest of the chapter and the other
// figures use.
import { SIZE, label, line, panel, react, slider } from "./kit.js";
import { FRONT, GEOMETRY, GROUND, pose, thetaFor } from "../data/mechanism.js";

// The view is the whole corner: one scale in both directions, because a front view
// with two scales would misreport every angle in it.
const VIEW = { x0: 0.24, x1: 0.98, z0: GROUND - 0.02, z1: 0.56 };
const WIDTH = 520;
const SCALE = WIDTH / (VIEW.x1 - VIEW.x0);
const HEIGHT = Math.round((VIEW.z1 - VIEW.z0) * SCALE);
const HALF_WIDTH = 0.09; // the tyre's half-width, in metres

/** A number as the prose writes it: a true minus sign, not a hyphen. */
const num = (value, places) => value.toFixed(places).replace("-", "\u2212");

/** A model point, in drawing units. */
function at(p) {
  return { x: (p[0] - VIEW.x0) * SCALE, y: (VIEW.z1 - p[1]) * SCALE };
}

/** Where the line from `from` towards `to` leaves the left edge of the drawing. */
function toLeftEdge(from, to) {
  const dx = to[0] - from[0];
  if (Math.abs(dx) < 1e-9) return null;
  const t = (VIEW.x0 - from[0]) / dx;
  return Number.isFinite(t) && t > 0 ? [VIEW.x0, from[1] + (to[1] - from[1]) * t] : null;
}

/**
 * The tyre's cross-section: a rectangle that leans with the camber.
 *
 * Four lines rather than a filled shape, because a `fig-*` class paints with
 * `fill: currentColor` and a filled 0.64 m rectangle hides the whole mechanism.
 */
function tyre(centre, camberDeg, cls, width, dash) {
  const angle = (-camberDeg * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const corners = [
    [-HALF_WIDTH, -GEOMETRY.tyreRadius],
    [HALF_WIDTH, -GEOMETRY.tyreRadius],
    [HALF_WIDTH, GEOMETRY.tyreRadius],
    [-HALF_WIDTH, GEOMETRY.tyreRadius],
  ].map(([dx, dz]) => at([centre[0] + dx * cos - dz * sin, centre[1] + dx * sin + dz * cos]));
  return corners
    .map((corner, index) => {
      const next = corners[(index + 1) % corners.length];
      return line({ x1: corner.x, y1: corner.y, x2: next.x, y2: next.y, class: cls, width, dash });
    })
    .join("");
}

export function mount(el) {
  const { svg, readout, caption, claim } = panel(el, {
    label:
      "A front suspension seen from the front, with the wheel moving under a control",
    description:
      "Two wishbones join the chassis to an upright, which carries the wheel. The control sets " +
      "the wheel's travel, and the upper arm and upright follow it. Dashed lines run through each " +
      "arm towards the point where they would meet, and a line from the contact patch runs the " +
      "same way.",
    prompt:
      "Predict first: as the wheel rises, does the top of the wheel lean further out, or further in?",
    width: WIDTH,
    height: HEIGHT,
    max: 520,
  });

  const travel = slider(el, {
    id: "travel",
    label: "Wheel travel",
    min: -40,
    max: 40,
    step: 1,
    value: 0,
    show: true,
    unit: "mm",
  });

  caption.textContent =
    "The solid tyre is where it is now; the dashed one is where it sits at rest. The " +
    "thin dashed lines run to the instant centre, which is off the drawing.";

  // From the model, not typed twice: the arm lines have to end where the solver's
  // axes are, or the drawing is of a different car.
  const [A, B] = [FRONT.A, FRONT.B];
  const design = pose(0);

  function draw() {
    const metres = Number(travel.value);
    const theta = thetaFor(metres);
    const state = pose(theta);
    const left = at([VIEW.x0, GROUND]);
    const right = at([VIEW.x1, GROUND]);
    const ground = left.y;
    const C = at(state.C);
    const D = at(state.D);
    const Apx = at(A);
    const Bpx = at(B);
    const patch = at(state.P);
    let drawing = "";

    // The ground the tyre stands on.
    drawing += line({
      x1: left.x,
      y1: ground,
      x2: right.x,
      y2: ground,
      class: "fig-grid",
      width: 2,
    });
    drawing += label({
      x: right.x,
      y: ground - 10,
      text: "ground",
      anchor: "end",
      size: SIZE.tick,
      class: "text-ink",
    });

    // The vertical the camber is measured from: one degree of lean is eight pixels
    // over a tyre's height, which nobody sees without a reference line beside it.
    const upright = at([state.W[0], state.W[1] - GEOMETRY.tyreRadius]);
    const uprightTop = at([state.W[0], state.W[1] + GEOMETRY.tyreRadius]);
    drawing += line({
      x1: upright.x,
      y1: upright.y,
      x2: uprightTop.x,
      y2: uprightTop.y,
      class: "fig-grid",
      width: 1.4,
      dash: "3 4",
    });

    // The wheel at rest, dashed, so the movement is visible rather than only
    // described; then where it is now, leaning by its camber.
    drawing += tyre(design.W, design.camber, "fig-grid", 1.5, "5 5");
    drawing += tyre(state.W, state.camber, "fig-ink", 3);
    drawing += label({
      x: uprightTop.x + 8,
      y: uprightTop.y + 16,
      text: `${num(Math.abs(state.camber), 1)}°`,
      anchor: "start",
      size: SIZE.tick,
      class: "text-warn",
    });

    // The two wishbones, then the line through each and its inner pivot: those
    // lines meet at the instant centre, off this drawing, so they run to the edge.
    drawing += line({ x1: Apx.x, y1: Apx.y, x2: C.x, y2: C.y, class: "fig-accent", width: 3.5 });
    drawing += line({ x1: Bpx.x, y1: Bpx.y, x2: D.x, y2: D.y, class: "fig-accent", width: 3.5 });
    for (const [pivot, outer] of [
      [A, state.C],
      [B, state.D],
    ]) {
      const edge = toLeftEdge(pivot, outer) ?? state.ic ?? outer;
      const from = at(pivot);
      const to = at(edge);
      drawing += line({
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
        class: "fig-grid",
        width: 1.4,
        dash: "5 5",
      });
    }
    // Above the arm, not below it: at 0.2 m the tyre is shorter, the ground moves up
    // to meet it, and the label that used to sit under the arm landed on the ground
    // line. Found by looking at the capture.
    drawing += label({
      x: Apx.x + 18,
      y: Apx.y - 12,
      text: "lower arm",
      anchor: "start",
      size: SIZE.tick,
      class: "text-accent",
    });
    drawing += label({
      x: Bpx.x + 14,
      y: Bpx.y - 30,
      text: "upper arm",
      anchor: "start",
      size: SIZE.tick,
      class: "text-accent",
    });

    // The upright: one rigid body carrying both ball joints and the hub.
    drawing += line({ x1: C.x, y1: C.y, x2: D.x, y2: D.y, class: "fig-ink", width: 4 });
    const hub = at(state.W);
    drawing += `<circle cx="${C.x.toFixed(1)}" cy="${C.y.toFixed(1)}" r="5" class="fig-ink"></circle>`;
    drawing += `<circle cx="${D.x.toFixed(1)}" cy="${D.y.toFixed(1)}" r="5" class="fig-ink"></circle>`;
    drawing += `<circle cx="${hub.x.toFixed(1)}" cy="${hub.y.toFixed(1)}" r="6" class="fig-ink"></circle>`;

    // The line the roll centre is defined by, and the contact patch it starts from.
    if (state.ic) {
      const edge = toLeftEdge(state.P, state.ic);
      if (edge) {
        const to = at(edge);
        drawing += line({
          x1: patch.x,
          y1: patch.y,
          x2: to.x,
          y2: to.y,
          class: "fig-warn",
          width: 1.6,
          dash: "7 5",
        });
      }
    }
    drawing += line({
      x1: patch.x - 14,
      y1: patch.y,
      x2: patch.x + 14,
      y2: patch.y,
      class: "fig-warn",
      width: 5,
    });

    svg.innerHTML = drawing;

    const change = state.camber - design.camber;
    const lean = state.camber < 0 ? "inboard" : "outboard";
    const rollCentre = state.rc ? (state.rc[1] - GROUND) * 1000 : null;
    const track = (state.W[0] - design.W[0]) * 1000;

    readout.textContent =
      `At ${num(metres, 0)} mm of travel the lower arm has turned through ` +
      `${num((theta * 180) / Math.PI, 2)} degrees. Camber is ` +
      `${num(Math.abs(state.camber), 2)} degrees ${lean} of vertical, ` +
      `which is ${num(Math.abs(change), 2)} degrees ` +
      `${
        Math.abs(change) < 0.005
          ? "from where it sits at rest"
          : `${change < 0 ? "further in" : "further out"} than at rest`
      }. The instant centre is ${num(Math.abs(state.ic ? state.ic[0] : 0), 2)} m ` +
      `inboard of the car's centreline and ${num(state.ic ? state.ic[1] - GROUND : 0, 2)} m above the ground, so the ` +
      `roll centre is ` +
      `${rollCentre === null ? "not defined" : `${num(rollCentre, 0)} mm above the ground`}. ` +
      `The track has moved by ${num(track, 1)} mm.`;

    // The one piece of arithmetic the readout states, declared so it cannot drift
    // from the model that computed it. The claim is on the **size** of the change:
    // the readout prints the number and says which way, and a claim whose `shown`
    // the readout does not contain is a claim the checker cannot check.
    claim([
      {
        label: "camber change since the rest position",
        expression: "abs(camber - design)",
        values: { camber: state.camber, design: design.camber },
        answer: Math.abs(change),
        shown: Math.abs(change).toFixed(2),
      },
    ]);
  }

  react(travel, draw);
}
