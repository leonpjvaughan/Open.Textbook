// Tier-1 guided investigation: a net folding up into its solid.
//
// Section 16.4 defines a net as a flat pattern that folds into a solid, and the whole
// difficulty is that a flat drawing and a solid are two different pictures of the same
// object. So the figure folds one into the other. The net is six rectangles lying flat;
// each one turns about the edge it shares with its neighbour until the six meet as the
// faces of a cuboid. Nothing is added or removed on the way, which is why the area of
// the net and the surface area of the solid are the same number.
//
// The four side faces each turn about a base edge, and the top face turns about the far
// edge of one of them — so it turns twice as far, which is why it ends up lying flat on
// top. That is the geometry, not an animation trick.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { animate, camera3d, fmt, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A flat net of six rectangles folding up along its edges into a closed box",
    description:
      "The six rectangles of the net lie flat at the start and fold along the edges they share. Each " +
      "side face turns about an edge of the base, and the top face turns about the far edge of the front " +
      "face, so it comes to rest on top. The flat net and the finished box cover the same area.",
    prompt: "Predict which rectangle will end up on top, then move the fold control and check.",
    width: 560,
    height: 420,
  });

  const length = slider(el, { id: "length", label: "Length", min: 2, max: 5, step: 1, value: 4, show: true, unit: "cm" });
  const width = slider(el, { id: "width", label: "Width", min: 2, max: 5, step: 1, value: 3, show: true, unit: "cm" });
  const height = slider(el, { id: "height", label: "Height", min: 2, max: 5, step: 1, value: 2, show: true, unit: "cm" });
  const turn = slider(el, { id: "turn", label: "Turn the drawing", min: -80, max: 80, step: 5, value: -30, show: true, unit: "\u00b0" });

  function draw(t) {
    const L = Number(length.value);
    const W = Number(width.value);
    const H = Number(height.value);
    const theta = (t * Math.PI) / 2;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    const cos2 = Math.cos(2 * theta);
    const sin2 = Math.sin(2 * theta);

    // The four side faces each turn about one edge of the base. `u` is the distance
    // out from the hinge, so `u = 0` is the hinge and `u = H` is the far edge.
    const front = (x, u) => [x, -u * cos, u * sin];
    const back = (x, u) => [x, W + u * cos, u * sin];
    const left = (u, y) => [-u * cos, y, u * sin];
    const right = (u, y) => [L + u * cos, y, u * sin];
    // The top face turns about the front face's far edge, which has itself moved, so it
    // turns through twice the angle.
    const top = (x, w) => [x, -H * cos - w * cos2, H * sin + w * sin2];

    const quads = [
      [[0, 0, 0], [L, 0, 0], [L, W, 0], [0, W, 0]],
      [front(0, 0), front(L, 0), front(L, H), front(0, H)],
      [back(0, 0), back(L, 0), back(L, H), back(0, H)],
      [left(0, 0), left(0, W), left(H, W), left(H, 0)],
      [right(0, 0), right(0, W), right(H, W), right(H, 0)],
      [top(0, 0), top(L, 0), top(L, W), top(0, W)],
    ];

    const vertices = quads.flat();
    const faces = [];
    const edges = [];
    quads.forEach((quad, f) => {
      const base = f * 4;
      faces.push({ indices: [base, base + 1, base + 2, base + 3], class: "fig-accent", opacity: 0.15 });
      for (let i = 0; i < 4; i += 1) {
        edges.push({ between: [base + i, base + ((i + 1) % 4)], hidden: false });
      }
    });

    // Four corners of the flat net, never drawn and never part of a face. They fix the
    // camera's fit for every frame, so the drawing does not zoom as the net folds.
    vertices.push([-H, -(H + W), 0], [L + H, -(H + W), 0], [L + H, W + H, 0], [-H, W + H, 0]);

    const cam = camera3d({ width: 560, height: 420, yaw: Number(turn.value), pitch: 22, zoom: 0.92 });
    svg.innerHTML = cam.drawMesh({ vertices, faces, edges, fill: true });

    const surface = 2 * (L * W + L * H + W * H);
    if (t < 0.02) {
      readout.textContent =
        `The net lies flat. Its six rectangles are the six faces: two ${fmt(L)} cm by ${fmt(W)} cm, ` +
        `two ${fmt(W)} cm by ${fmt(H)} cm, and two ${fmt(L)} cm by ${fmt(H)} cm. ` +
        `Their area is ${fmt(surface)} cm\u00b2, and that is the surface area of the box.`;
    } else if (t > 0.98) {
      readout.textContent =
        `Folded up, the net is a box ${fmt(L)} cm long, ${fmt(W)} cm wide and ${fmt(H)} cm tall. ` +
        `The top rectangle has folded over to close the box. No paper was added or removed, so the area ` +
        `is still ${fmt(surface)} cm\u00b2 \u2014 the net's area and the surface area are the same number.`;
    } else {
      readout.textContent =
        `Folding: ${fmt(Math.round(t * 100), 0)}% of the way up. The side faces are turning about the ` +
        `edges of the base, and the top rectangle is turning twice as far, because it turns about an ` +
        `edge that is itself moving.`;
    }
  }

  const { scrub } = animate(el, { onFrame: draw, label: "Fold the net", duration: 4000, still: 1 });
  react([length, width, height, turn], () => draw(Number(scrub.value)));
}
