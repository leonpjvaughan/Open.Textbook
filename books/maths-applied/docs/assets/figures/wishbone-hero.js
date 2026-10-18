// The hero: the front suspension seen from in front of the car, with the wheel
// moving and every question the chapter asks answered in the readout.
//
// The reader moves the wheel up and down, because that is the quantity a car has:
// "40 mm of bump" means something, "five degrees of lower-arm rotation" does not.
// The model turns travel into the lower arm's angle, so the control and the
// mathematics each keep their own vocabulary.
//
// Nothing here carries a colour, and every number comes from
// `data/mechanism.js` — the same model the rest of the chapter and the other
// figures use.
import { SIZE, fmt, label, line, panel, react, slider } from "./kit.js";
import { GEOMETRY, pose, thetaFor } from "../data/mechanism.js";

// The view is the whole corner. One scale in both directions, because a front view
// with two scales would misreport every angle in it.
const VIEW = { x0: 0.26, x1: 1.1, z0: -0.02, z1: 0.66 };
const WIDTH = 560;
const SCALE = WIDTH / (VIEW.x1 - VIEW.x0);
const HEIGHT = Math.round((VIEW.z1 - VIEW.z0) * SCALE);

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

/** A circle through the kit's class, drawn open: a wheel is a rim, not a dot. */
function rim(centre, radius, cls, width = 2, dash = "") {
  const { x, y } = at(centre);
  const style = dash ? ` stroke-dasharray="${dash}"` : "";
  return (
    `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(radius * SCALE).toFixed(1)}" ` +
    `class="${cls}" fill="none" stroke-width="${width}"${style}></circle>`
  );
}

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label:
      "A front suspension seen from the front, with the lower arm's angle set by a control",
    description:
      "Two wishbones join the chassis to an upright, which carries the wheel. The lower arm's " +
      "angle is set with the control, and the upper arm and upright follow it. A dashed line " +
      "through each arm shows where the two would meet: that meeting point is the instant " +
      "centre, and a line from the contact patch through it crosses the middle of the car at " +
      "the roll centre.",
    prompt:
      "Predict first: as the wheel rises, does the top of the wheel lean further out, or further in?",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
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

  const A = [0.3, 0.155];
  const B = [0.38, 0.449];
  const design = pose(0);

  function draw() {
    const metres = Number(travel.value);
    const theta = thetaFor(metres);
    const state = pose(theta);
    const ground = at([0, 0]);
    const left = at([VIEW.x0, 0]);
    const right = at([VIEW.x1, 0]);
    const C = at(state.C);
    const D = at(state.D);
    const Apx = at(A);
    const Bpx = at(B);
    const patch = at(state.P);
    let drawing = "";

    // The ground the tyre stands on.
    drawing += line({
      x1: left.x,
      y1: ground.y,
      x2: right.x,
      y2: ground.y,
      class: "fig-grid",
      width: 2,
    });
    drawing += label({
      x: left.x + 6,
      y: ground.y - 8,
      text: "ground",
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    });

    // The wheel where it sits at rest, dashed, so the movement is visible rather
    // than only described; and where it is now.
    drawing += rim(design.W, GEOMETRY.tyreRadius, "fig-grid", 1.5, "4 4");
    drawing += rim(state.W, GEOMETRY.tyreRadius, "fig-ink", 2);
    const hub = at(state.W);
    drawing += label({
      x: hub.x,
      y: hub.y - GEOMETRY.tyreRadius * SCALE + 16,
      text: "wheel",
      size: SIZE.tick,
      class: "text-ink",
    });

    // The two wishbones, then the line through each and its inner pivot: they meet
    // at the instant centre, which is off this drawing, so the lines run to the
    // edge and say where they are going.
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
    drawing += label({
      x: Apx.x + 8,
      y: Apx.y + 22,
      text: "lower arm",
      anchor: "start",
      size: SIZE.tick,
      class: "text-accent",
    });
    drawing += label({
      x: Bpx.x + 8,
      y: Bpx.y - 10,
      text: "upper arm",
      anchor: "start",
      size: SIZE.tick,
      class: "text-accent",
    });

    // The upright: one rigid body carrying both ball joints and the hub.
    drawing += line({ x1: C.x, y1: C.y, x2: D.x, y2: D.y, class: "fig-ink", width: 4 });
    drawing += `<circle cx="${C.x.toFixed(1)}" cy="${C.y.toFixed(1)}" r="5" class="fig-ink"></circle>`;
    drawing += `<circle cx="${D.x.toFixed(1)}" cy="${D.y.toFixed(1)}" r="5" class="fig-ink"></circle>`;

    // The line the roll centre is defined by: contact patch to instant centre,
    // and where it crosses the middle of the car.
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
        drawing += label({
          x: to.x + 8,
          y: to.y - 10,
          text: "to the instant centre",
          anchor: "start",
          size: SIZE.tick,
          class: "text-warn",
        });
      }
    }
    drawing += line({
      x1: patch.x - 14,
      y1: patch.y,
      x2: patch.x + 14,
      y2: patch.y,
      class: "fig-warn",
      width: 4,
    });
    drawing += label({
      x: patch.x + 18,
      y: patch.y - 6,
      text: "contact patch",
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    });

    svg.innerHTML = drawing;

    const change = state.camber - design.camber;
    const rollCentre = state.rc ? state.rc[1] * 1000 : null;
    const track = (state.W[0] - design.W[0]) * 1000;

    readout.textContent =
      `At ${fmt(metres, 0)} mm of travel the lower arm has turned through ` +
      `${fmt((theta * 180) / Math.PI, 2)} degrees. Camber is ${fmt(state.camber, 2)} degrees, ` +
      `which is ${fmt(Math.abs(change), 2)} degrees ` +
      `${change < 0 ? "further in" : "further out"} than at rest. ` +
      `The instant centre is ${fmt(Math.abs(state.ic ? state.ic[0] : 0), 2)} m inboard of the hub ` +
      `and ${fmt(state.ic ? state.ic[1] : 0, 2)} m above the ground, so the roll centre is ` +
      `${rollCentre === null ? "not defined" : `${fmt(rollCentre, 0)} mm above the ground`}. ` +
      `The track has moved by ${fmt(track, 1)} mm.`;

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
        shown: fmt(Math.abs(change), 2),
      },
    ]);
  }

  react(travel, draw);
}
