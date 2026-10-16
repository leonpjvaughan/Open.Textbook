// Tier-1 guided investigation: where a converging lens forms its image, and how
// the image changes as the object moves.
//
// The page asks the reader to predict the image when the object is beyond twice
// the focal length, then to move the object inside the focal length and explain
// why the image becomes virtual. So the figure has to draw the *rays*: two rays
// leave the top of the object, and the image forms where they meet, or where
// their backward extensions meet. A slider moves the object and the whole
// diagram is redrawn from the lens formula, so the numbers and the drawing
// cannot disagree.
//
// Nothing here carries a colour. The rays, the lens, the arrows and the focal
// marks use the fig-* and text-* classes, and a virtual image is drawn with a
// dashed backward extension as well as a different class, so the distinction
// survives a monochrome bundle.
//
// The scaffolding — the panel, its accessible name, the slider, the readout and
// the redraw — comes from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, fmt, label, panel, react, scale, slider } from "./kit.js";

// The focal length of the lens, in centimetres, and the object height.
const F = 12.0;
const OBJECT_HEIGHT_PX = 30;
// The drawing is 560 units wide and the lens sits at its centre, so 4 units per
// centimetre keeps the focal points and a 36 cm object distance on the page.
const PX_PER_CM = 4;
const LENS_X = 280;
const AXIS_Y = 150;
// Past this the image is off the drawing, so the figure says so instead of
// drawing an arrow at a place it does not belong.
const MAX_DRAW_V = 62;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A ray diagram for a converging lens, with a slider that moves the object and shows where the image forms",
    width: 560,
    height: 280,
  });

  const objectInput = slider(el, {
    id: "object-distance",
    label: "Object distance",
    show: true,
    min: 6,
    max: 36,
    step: 0.5,
    value: 18,
    unit: "cm",
  });

  // The lens is the origin. The object is to the left; a real image is to the
  // right and a virtual image is to the left. `scale` maps a distance in
  // centimetres to an SVG x, and it maps a negative distance to the other side.
  const sxRight = scale({ domain: [0, 70], range: [LENS_X, LENS_X + PX_PER_CM * 70] });
  const sxLeft = scale({ domain: [0, 70], range: [LENS_X, LENS_X - PX_PER_CM * 70] });

  // The y of a line through two points, at a given x. The refracted rays are
  // straight lines, so two points fix each of them.
  const yAt = (x1, y1, x2, y2, x) => y1 + ((y2 - y1) / (x2 - x1)) * (x - x1);

  function update() {
    const u = Number(objectInput.value);
    const objectX = sxLeft(u);
    const objectTopY = AXIS_Y - OBJECT_HEIGHT_PX;
    const focusRight = sxRight(F);
    const focusLeft = sxLeft(F);

    // The lens formula, in the real-is-positive convention. A virtual image has
    // a negative image distance.
    const reciprocal = 1 / F - 1 / u;
    const nearFocus = Math.abs(reciprocal) < 0.004;
    const v = nearFocus ? Infinity : 1 / reciprocal;
    const real = v > 0;
    const drawable = Number.isFinite(v) && Math.abs(v) <= MAX_DRAW_V;
    const m = Number.isFinite(v) ? v / u : Infinity;

    // The principal axis, the lens and the two focal marks.
    const axis =
      `<line x1="10" y1="${AXIS_Y}" x2="550" y2="${AXIS_Y}" class="fig-grid" stroke-width="1.5"></line>` +
      `<ellipse cx="${LENS_X}" cy="${AXIS_Y}" rx="9" ry="70" class="fig-line"></ellipse>` +
      `<circle cx="${focusRight}" cy="${AXIS_Y}" r="3.5" class="fig-ink"></circle>` +
      `<circle cx="${focusLeft}" cy="${AXIS_Y}" r="3.5" class="fig-ink"></circle>` +
      label({ x: focusRight + 4, y: AXIS_Y + 20, text: "F", anchor: "start", size: SIZE.tick }) +
      label({ x: focusLeft - 4, y: AXIS_Y + 20, text: "F'", anchor: "end", size: SIZE.tick }) +
      label({ x: LENS_X, y: 36, text: "lens", size: SIZE.tick });

    // Ray 1: from the object top, parallel to the axis, then through the far
    // focus. Ray 2: from the object top straight through the centre of the lens.
    const refracted1End = yAt(LENS_X, objectTopY, focusRight, AXIS_Y, 550);
    const refracted2End = yAt(objectX, objectTopY, LENS_X, AXIS_Y, 550);
    const rays =
      `<line x1="${objectX}" y1="${objectTopY}" x2="${LENS_X}" y2="${objectTopY}" class="fig-accent" stroke-width="2"></line>` +
      `<line x1="${LENS_X}" y1="${objectTopY}" x2="550" y2="${refracted1End.toFixed(1)}" class="fig-accent" stroke-width="2"></line>` +
      `<line x1="${objectX}" y1="${objectTopY}" x2="${LENS_X}" y2="${AXIS_Y}" class="fig-accent" stroke-width="2"></line>` +
      `<line x1="${LENS_X}" y1="${AXIS_Y}" x2="550" y2="${refracted2End.toFixed(1)}" class="fig-accent" stroke-width="2"></line>`;

    // The object, drawn as an arrow standing on the axis.
    const object =
      `<line x1="${objectX}" y1="${AXIS_Y}" x2="${objectX}" y2="${objectTopY}" class="fig-ink" stroke-width="2.5"></line>` +
      `<polygon points="${objectX},${objectTopY} ${objectX - 5},${objectTopY + 10} ${objectX + 5},${objectTopY + 10}" class="fig-ink"></polygon>` +
      label({ x: objectX, y: AXIS_Y + 20, text: "object", size: SIZE.tick });

    let image = "";
    if (drawable) {
      const imageX = sxRight(v);
      const imageTopY = AXIS_Y + (v / u) * OBJECT_HEIGHT_PX;
      // A virtual image is found by extending the diverging rays backwards, so
      // the extensions are dashed and drawn to the left of the lens.
      const extensions = real
        ? ""
        : `<line x1="${LENS_X}" y1="${objectTopY}" x2="10" y2="${yAt(LENS_X, objectTopY, focusRight, AXIS_Y, 10).toFixed(1)}" class="fig-warn" stroke-width="1.5" stroke-dasharray="6 5"></line>` +
          `<line x1="${LENS_X}" y1="${AXIS_Y}" x2="10" y2="${yAt(objectX, objectTopY, LENS_X, AXIS_Y, 10).toFixed(1)}" class="fig-warn" stroke-width="1.5" stroke-dasharray="6 5"></line>`;
      const tip = imageTopY < AXIS_Y ? imageTopY + 10 : imageTopY - 10;
      image =
        extensions +
        `<line x1="${imageX}" y1="${AXIS_Y}" x2="${imageX}" y2="${imageTopY.toFixed(1)}" class="fig-warn" stroke-width="2.5"></line>` +
        `<polygon points="${imageX},${imageTopY.toFixed(1)} ${imageX - 5},${tip.toFixed(1)} ${imageX + 5},${tip.toFixed(1)}" class="fig-warn"></polygon>` +
        label({ x: imageX, y: AXIS_Y + 20, text: "image", size: SIZE.tick });
    }

    svg.innerHTML = `${axis}${rays}${object}${image}`;

    if (!drawable) {
      readout.textContent = `u = ${fmt(u, 1)} cm. The object is at the focal point, so the rays leave the lens parallel and there is no image on the screen.`;
    } else if (real) {
      readout.textContent = `u = ${fmt(u, 1)} cm, v = ${fmt(v, 1)} cm, magnification = ${fmt(
        Math.abs(m),
        2,
      )}. The image is real and inverted, and it forms on the far side of the lens.`;
    } else {
      readout.textContent = `u = ${fmt(u, 1)} cm, v = ${fmt(v, 1)} cm, magnification = ${fmt(
        Math.abs(m),
        2,
      )}. The image is virtual and upright, on the same side of the lens as the object.`;
    }
  }

  react([objectInput], update);
}
