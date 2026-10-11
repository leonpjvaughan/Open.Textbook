// Tier-1 guided investigation: the image formed by a convex lens.
//
// Guided, not a sandbox: the page asks the reader to predict what happens to the
// image as the object moves closer, then to explain why. The slider sets the
// object distance. The image position is worked out internally so the rays are
// drawn correctly; the page does not teach that relationship and does not ask
// the reader to use it.
// Colours come from CSS classes so the figure adapts to dark mode and every
// bundle; the object, image and rays are also labelled.
export function mount(el) {
  const FOCAL = 8;      // cm
  const SCALE = 4;      // pixels per cm
  const LENS_X = 360;
  const AXIS_Y = 150;
  const OBJECT_HEIGHT = 5; // cm

  el.innerHTML = `
    <div class="fig-lens-image" style="font:14px system-ui;max-width:620px">
      <svg viewBox="0 0 640 300" width="100%" height="300" role="img"
           aria-label="A convex lens forming a real, inverted image of an arrow, with two rays drawn from the top of the object"></svg>
      <label style="display:block;margin:.6rem 0 .3rem">
        Object distance: <input class="distance" type="range" min="12" max="60" step="1" value="24">
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const slider = el.querySelector(".distance");
  const readout = el.querySelector(".readout");
  const px = (cm) => cm * SCALE;

  function update() {
    const u = Number(slider.value);
    const v = (u * FOCAL) / (u - FOCAL);
    const magnification = v / u;

    const objectX = LENS_X - px(u);
    const objectTop = AXIS_Y - px(OBJECT_HEIGHT);
    const imageX = LENS_X + px(v);
    const imageTop = AXIS_Y + px(OBJECT_HEIGHT * magnification);

    svg.innerHTML =
      // Principal axis and the lens.
      `<line x1="20" y1="${AXIS_Y}" x2="620" y2="${AXIS_Y}" class="fig-ink"></line>` +
      `<line x1="${LENS_X}" y1="${AXIS_Y - 110}" x2="${LENS_X}" y2="${AXIS_Y + 110}" ` +
      `class="fig-ink" stroke-width="2"></line>` +
      // The principal foci.
      `<circle cx="${LENS_X - px(FOCAL)}" cy="${AXIS_Y}" r="3" class="fig-grid"></circle>` +
      `<circle cx="${LENS_X + px(FOCAL)}" cy="${AXIS_Y}" r="3" class="fig-grid"></circle>` +
      `<text x="${LENS_X - px(FOCAL) - 6}" y="${AXIS_Y + 18}" font-size="11" ` +
      `class="fig-ink">F</text>` +
      `<text x="${LENS_X + px(FOCAL) - 2}" y="${AXIS_Y + 18}" font-size="11" ` +
      `class="fig-ink">F</text>` +
      // The object arrow: a vertical line with an arrowhead.
      `<line x1="${objectX}" y1="${AXIS_Y}" x2="${objectX}" y2="${objectTop}" ` +
      `class="fig-accent" stroke-width="2"></line>` +
      `<polygon points="${objectX - 4},${objectTop + 8} ${objectX + 4},${objectTop + 8} ` +
      `${objectX},${objectTop}" class="fig-accent"></polygon>` +
      `<text x="${objectX - 18}" y="${objectTop - 8}" font-size="11" ` +
      `class="fig-ink">object</text>` +
      // The image arrow, inverted and on the other side.
      `<line x1="${imageX}" y1="${AXIS_Y}" x2="${imageX}" y2="${imageTop}" ` +
      `class="fig-warn" stroke-width="2"></line>` +
      `<polygon points="${imageX - 4},${imageTop - 8} ${imageX + 4},${imageTop - 8} ` +
      `${imageX},${imageTop}" class="fig-warn"></polygon>` +
      `<text x="${imageX - 16}" y="${imageTop + 20}" font-size="11" ` +
      `class="fig-ink">image</text>` +
      // The ray parallel to the axis, then through the far focus.
      `<line x1="${objectX}" y1="${objectTop}" x2="${LENS_X}" y2="${objectTop}" ` +
      `class="fig-good" stroke-width="1.5"></line>` +
      `<line x1="${LENS_X}" y1="${objectTop}" x2="${imageX}" y2="${imageTop}" ` +
      `class="fig-good" stroke-width="1.5"></line>` +
      // The ray through the centre of the lens.
      `<line x1="${objectX}" y1="${objectTop}" x2="${imageX}" y2="${imageTop}" ` +
      `class="fig-good" stroke-width="1.5"></line>`;

    readout.innerHTML =
      `Object distance <strong>${u} cm</strong>. The image forms ` +
      `<strong>${v.toFixed(1)} cm</strong> from the lens, on the other side. ` +
      `Magnification <strong>${magnification.toFixed(2)}</strong>. ` +
      `The image is <strong>real and inverted</strong>. ` +
      `<em>Move the object closer to the lens. Does the image get bigger or smaller?</em>`;
  }

  slider.addEventListener("input", update);
  update();
}
