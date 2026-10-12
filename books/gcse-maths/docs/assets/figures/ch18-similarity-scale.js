// Guided investigation for similar shapes: a length scale factor k raises the area
// by k squared and the volume by k cubed. The reader counts the small squares in
// the big square and the small cubes in the big cube, so the two multipliers are
// read off the drawing rather than trusted. A single still picture shows one size;
// the slider is the growth.
//
// Predict -> Test -> Explain per AGENTS.md P6: the page asks for both multipliers
// before the slider is moved. Colours come from CSS classes, so the figure adapts
// to every bundle and both schemes, and the readout is `aria-live`.
export function mount(el) {
  const S = 24;
  const SQ_X = 70;
  const CUBE_X = 320;
  const BASE = 250;
  const DX = 9;
  const DY = -7;

  el.innerHTML = `
    <div class="fig-similarity-scale" style="max-width:560px">
      <svg viewBox="0 0 520 300" width="100%" height="300" role="img"
           aria-label="A square and a cube grow with the length scale factor; the square is divided into small squares and the cube into small cubes"></svg>
      <label style="display:block;margin:.6rem 0 .2rem">
        Length scale factor:
        <input class="factor" type="range" min="1" max="3" step="1" value="1"
               aria-label="Length scale factor, from 1 to 3">
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const slider = el.querySelector(".factor");
  const readout = el.querySelector(".readout");

  const seg = (x1, y1, x2, y2, cls, width) =>
    `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="${cls}" stroke-width="${width}"></line>`;

  // The square: side k, cut into k by k cells, so the cell count is the area
  // multiplier and each cell is the original square.
  function squarePanel(k) {
    const side = k * S;
    const top = BASE - side;
    const grid = [];
    for (let i = 1; i < k; i++) grid.push(seg(SQ_X + i * S, BASE, SQ_X + i * S, top, "fig-grid", 1));
    for (let j = 1; j < k; j++) grid.push(seg(SQ_X, BASE - j * S, SQ_X + side, BASE - j * S, "fig-grid", 1));
    return (
      grid.join("") +
      `<rect x="${SQ_X}" y="${top}" width="${side}" height="${side}" class="fig-line"></rect>` +
      `<text x="${SQ_X}" y="44" class="text-ink" font-size="14">Area</text>` +
      `<text x="${SQ_X}" y="${BASE + 26}" class="text-accent" font-size="13">area × ${k * k}</text>`
    );
  }

  // The cube: side k, drawn in oblique projection with the three visible faces cut
  // into k by k cells. The front face shows k squared cells and the depth is k
  // cells, so the solid holds k cubed small cubes.
  function cubePanel(k) {
    const side = k * S;
    const top = BASE - side;
    const bx = k * DX;
    const by = k * DY;
    const grid = [];
    // Front face.
    for (let i = 0; i <= k; i++) grid.push(seg(CUBE_X + i * S, BASE, CUBE_X + i * S, top, "fig-grid", 1));
    for (let j = 0; j <= k; j++) grid.push(seg(CUBE_X, BASE - j * S, CUBE_X + side, BASE - j * S, "fig-grid", 1));
    // Top face.
    for (let t = 0; t <= k; t++) {
      grid.push(seg(CUBE_X + t * DX, top + t * DY, CUBE_X + side + t * DX, top + t * DY, "fig-grid", 1));
    }
    for (let i = 0; i <= k; i++) {
      grid.push(seg(CUBE_X + i * S, top, CUBE_X + i * S + bx, top + by, "fig-grid", 1));
    }
    // Right face.
    for (let t = 0; t <= k; t++) {
      grid.push(seg(CUBE_X + side + t * DX, BASE + t * DY, CUBE_X + side + t * DX, top + t * DY, "fig-grid", 1));
    }
    for (let j = 0; j <= k; j++) {
      grid.push(seg(CUBE_X + side, BASE - j * S, CUBE_X + side + bx, BASE - j * S + by, "fig-grid", 1));
    }

    const FBL = [CUBE_X, BASE];
    const FBR = [CUBE_X + side, BASE];
    const FTL = [CUBE_X, top];
    const FTR = [CUBE_X + side, top];
    const BBR = [FBR[0] + bx, FBR[1] + by];
    const BTR = [FTR[0] + bx, FTR[1] + by];
    const BTL = [FTL[0] + bx, FTL[1] + by];
    const edges = [
      [FBL, FBR], [FBR, BBR], [BBR, BTR], [BTR, BTL], [BTL, FTL], [FTL, FBL],
      [FTL, FTR], [FTR, FBR], [FTR, BTR],
    ];
    const ink = edges.map((pair) => seg(pair[0][0], pair[0][1], pair[1][0], pair[1][1], "fig-ink", 2)).join("");

    return (
      grid.join("") +
      ink +
      `<text x="${CUBE_X}" y="44" class="text-ink" font-size="14">Volume</text>` +
      `<text x="${CUBE_X}" y="${BASE + 26}" class="text-warn" font-size="13">volume × ${k * k * k}</text>`
    );
  }

  function draw() {
    const k = Number(slider.value);
    svg.innerHTML = squarePanel(k) + cubePanel(k);
    readout.textContent =
      `Length scale factor ${k}. Area scale factor ${k} × ${k} = ${k * k}, so the big square holds ${k * k} small squares. ` +
      `Volume scale factor ${k} × ${k} × ${k} = ${k * k * k}, so the big cube holds ${k * k * k} small cubes.`;
  }

  slider.addEventListener("input", draw);
  draw();
}
