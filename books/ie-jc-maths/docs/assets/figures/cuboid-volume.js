// Tier-1 guided investigation: a cuboid in three dimensions, and where its volume and
// surface area come from.
//
// The page asks the reader to predict what doubling one dimension does to the volume
// and to the surface area, then to test, then to explain why the two answers differ. So
// the figure has to show a solid the reader can *turn* and resize, with its hidden edges
// dashed the way a textbook draws it — which is the whole reason `camera3d()` exists: a
// net, a prism and a stack of layers cannot be drawn in a flat SVG, and volume and
// surface area are both about a shape in space.
//
// The dimensions are labelled on the drawing as well as in the readout, so the reader
// can see which length is which without matching colours.
import {
  camera3d,
  fmt,
  label,
  panel,
  quantity,
  react,
  slider,
  SIZE,
} from "./kit.js";

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label:
      "A cuboid whose length, width and height can be changed, drawn with its hidden edges dashed. The volume and the surface area are given below",
    description:
      "A box seen from one corner. Its three dimensions are set with the controls and printed beside the " +
      "edges they belong to, and the dashed edges are the ones behind the solid.",
    width: 560,
    height: 330,
  });

  const make = (id, labelText, value, max) =>
    slider(el, { id, label: labelText, min: 1, max, step: 1, value, show: true, unit: "cm" });
  const length = make("length", "Length", 6, 12);
  const width = make("width", "Width", 4, 12);
  const height = make("height", "Height", 3, 12);

  const cam = camera3d({ width: 560, height: 330, yaw: -34, pitch: 20 });

  function update() {
    const L = Number(length.value);
    const W = Number(width.value);
    const H = Number(height.value);
    // Halved, because the camera looks at the origin and the solid sits astride it.
    const [l, w, h] = [L / 2, W / 2, H / 2];

    const vertices = [
      [-l, -h, -w], [l, -h, -w], [l, -h, w], [-l, -h, w],
      [-l, h, -w], [l, h, -w], [l, h, w], [-l, h, w],
    ];
    const faces = [
      { indices: [0, 1, 2, 3] },
      { indices: [4, 5, 6, 7] },
      { indices: [0, 1, 5, 4] },
      { indices: [3, 2, 6, 7] },
      { indices: [1, 2, 6, 5] },
      { indices: [0, 3, 7, 4] },
    ];
    const pairs = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    const edges = pairs.map((between) => ({ between }));

    let drawing = cam.drawMesh({ vertices, faces, edges, fill: true });

    // Each dimension is written beside the edge it measures, on an edge that faces the
    // camera, so the reader does not have to work out which length is which from the
    // readout alone. With this camera the visible faces are the left, the top and the
    // front, and vertex 1 is the hidden one — so `3-2` is the length, `0-3` the width
    // and `0-4` the height.
    const mid = (a, b) => {
      const p = cam.project(vertices[a]);
      const q = cam.project(vertices[b]);
      return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    };
    const lengthAt = mid(3, 2);
    drawing += label({ x: lengthAt.x, y: lengthAt.y + 20, text: `${quantity(L, "cm")}`, size: SIZE.tick, class: "text-accent" });
    const widthAt = mid(0, 3);
    drawing += label({ x: widthAt.x - 6, y: widthAt.y + 16, text: `${quantity(W, "cm")}`, size: SIZE.tick, class: "text-accent", anchor: "end" });
    const heightAt = mid(0, 4);
    drawing += label({ x: heightAt.x - 8, y: heightAt.y + 5, text: `${quantity(H, "cm")}`, size: SIZE.tick, class: "text-accent", anchor: "end" });

    const volume = L * W * H;
    const surface = 2 * (L * W + L * H + W * H);
    // The layers are the explanation: a prism's volume is the area of its base times
    // its height, so a cuboid is `L × W` squares stacked `H` deep.
    const layers = L * W;
    readout.textContent =
      `${quantity(L, "cm")} by ${quantity(W, "cm")} by ${quantity(H, "cm")}. Volume = ${fmt(L)} × ${fmt(W)} × ${fmt(H)} = ${fmt(volume)} cm³, ` +
      `which is ${fmt(layers)} one-centimetre cubes in each layer and ${fmt(H)} layers. ` +
      `Surface area = 2(${fmt(L * W)} + ${fmt(L * H)} + ${fmt(W * H)}) = ${fmt(surface)} cm².`;

    svg.innerHTML = drawing;

    // The three products and the two totals, declared rather than left in the sentence.
    // The layer count is the explanation the page makes, so it is claimed in its own
    // right: a volume that is right beside a layer count that is not is still wrong.
    claim([
      { label: "volume", expression: "L * W * H", values: { L, W, H }, answer: volume, shown: fmt(volume) },
      { label: "one layer", expression: "L * W", values: { L, W }, answer: layers, shown: fmt(layers) },
      { label: "front and back", expression: "L * H", values: { L, H }, answer: L * H, shown: fmt(L * H) },
      { label: "two ends", expression: "W * H", values: { W, H }, answer: W * H, shown: fmt(W * H) },
      {
        label: "surface area",
        expression: "2 * (L * W + L * H + W * H)",
        values: { L, W, H },
        answer: surface,
        shown: fmt(surface),
      },
    ]);
  }

  react([length, width, height], update);
}
