// The electromagnetic spectrum as one line, with the visible band marked and a marker
// the reader moves.
//
// Section 12.1 lists the seven families in order and gives c = f lambda. The order is
// a sentence a reader can repeat and still not place a wavelength on, and the visible
// band is so narrow that the table hides how narrow it is. So the figure draws the
// seven families as bands on a logarithmic wavelength axis, with the frequency running
// the other way along the top, and a marker whose wavelength and frequency are both
// given in the readout. The visible column is marked so the narrowness is visible
// before any number is read.
//
// Nothing here carries a colour. Every shape uses a fig-* class and every word a
// text-* class, so the figure follows the reader's theme in both schemes.
import { SIZE, circle, label, line, panel, react, rect, scale, sigfig, slider } from "./kit.js";

// The speed of light, in metres per second.
const C = 3.0e8;

// The seven families, from the longest wavelength at the top to the shortest at the
// bottom, matching the table on the page. The bounds are the base-ten logarithm of the
// wavelength in metres. Gamma rays run shorter than the edge of the drawing, so the
// band is cut there and the readout names them from the wavelength.
const FAMILIES = [
  { name: "radio", low: -1, high: 4 },
  { name: "microwave", low: -3, high: -1 },
  { name: "infrared", low: -6.155, high: -3 },
  { name: "visible", low: -6.398, high: -6.155, visible: true },
  { name: "ultraviolet", low: -8, high: -6.398 },
  { name: "X-ray", low: -11, high: -8 },
  { name: "gamma", low: -13, high: -11 },
];

// The span of the drawing, in log10 metres.
const DOMAIN = [-13, 4];

// The decades the axes are labelled at.
const TICKS = [-12, -9, -6, -3, 0, 3];

/** A length in metres, written with the unit that keeps the number small. */
function lengthLabel(logMetres) {
  const m = Math.pow(10, logMetres);
  if (logMetres >= 3) return `${sigfig(m / 1000, 3)} km`;
  if (logMetres >= 0) return `${sigfig(m, 3)} m`;
  if (logMetres >= -3) return `${sigfig(m * 1000, 3)} mm`;
  if (logMetres >= -6) return `${sigfig(m * 1e6, 3)} µm`;
  if (logMetres >= -9) return `${sigfig(m * 1e9, 3)} nm`;
  return `${sigfig(m * 1e12, 3)} pm`;
}

/** The family a wavelength belongs to. The bounds are the page's own table. */
function familyAt(logMetres) {
  if (logMetres < -11) return "gamma rays";
  if (logMetres < -8) return "X-rays";
  if (logMetres < -6.398) return "ultraviolet";
  if (logMetres < -6.155) return "visible light";
  if (logMetres < -3) return "infrared";
  if (logMetres < -1) return "microwaves";
  return "radio waves";
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "The electromagnetic spectrum from radio waves to gamma rays, with a movable marker",
    description:
      "A chart of the seven families of the electromagnetic spectrum. Each family is a horizontal " +
      "band, drawn on a logarithmic wavelength axis that runs from long radio waves on the left to " +
      "short gamma rays on the right. The frequency is labelled along the top, running the other " +
      "way. The narrow visible band is marked. A marker moves along the axis, and the wavelength " +
      "and the frequency at the marker are given in the readout.",
    prompt: "Predict which end of the spectrum has the higher frequency. Then move the marker and check.",
    width: 560,
    height: 300,
  });

  const position = slider(el, {
    id: "wavelength",
    label: "Wavelength",
    min: -13,
    max: 4,
    step: 0.02,
    value: -6.26,
    show: true,
    format: lengthLabel,
    name: "The wavelength of the wave, from gamma rays to radio waves",
  });

  const X0 = 118;
  const X1 = 536;
  const x = scale({ domain: DOMAIN, range: [X0, X1] });
  const TOP = 34; // the frequency axis
  const ROW_TOP = 48; // the first family row
  const ROW_H = 20;
  const ROW_GAP = 4;
  const BOTTOM = ROW_TOP + FAMILIES.length * (ROW_H + ROW_GAP) - ROW_GAP;
  const AXIS = BOTTOM + 20; // the wavelength axis

  function update() {
    const at = Number(position.value);
    const lambda = Math.pow(10, at);
    const frequency = C / lambda;

    let drawing = "";

    // The visible band, as a column through every row, so its narrowness is visible
    // before any number is read.
    drawing += rect({
      x: x(-6.398),
      y: ROW_TOP - 2,
      width: Math.max(2, x(-6.155) - x(-6.398)),
      height: BOTTOM - ROW_TOP + 4,
      class: "fig-warn",
      opacity: 0.22,
    });

    // The seven families.
    FAMILIES.forEach((family, index) => {
      const top = ROW_TOP + index * (ROW_H + ROW_GAP);
      const left = x(family.low);
      const width = x(family.high) - left;
      drawing += rect({
        x: left,
        y: top,
        width,
        height: ROW_H,
        class: family.visible ? "fig-warn" : "fig-accent",
        opacity: family.visible ? 0.55 : 0.3,
      });
      drawing += rect({ x: left, y: top, width, height: ROW_H, class: "fig-grid" });
      drawing += label({
        x: X0 - 10,
        y: top + ROW_H / 2 + 5,
        text: family.name,
        anchor: "end",
        size: SIZE.tick,
        class: family.visible ? "text-warn" : "text-ink",
      });
    });

    // The frequency axis, along the top, because the frequency runs the other way.
    drawing += line({ x1: X0, y1: TOP, x2: X1, y2: TOP, class: "fig-ink", width: 1.6 });
    drawing += label({ x: X0 - 10, y: TOP + 5, text: "frequency", anchor: "end", size: SIZE.tick, class: "text-ink" });
    for (const value of TICKS) {
      drawing += line({ x1: x(value), y1: TOP - 5, x2: x(value), y2: TOP, class: "fig-ink", width: 1.2 });
      drawing += label({ x: x(value), y: TOP - 10, text: `${sigfig(C / Math.pow(10, value), 1)} Hz`, size: SIZE.tick, class: "text-ink" });
    }

    // The wavelength axis, along the bottom.
    drawing += line({ x1: X0, y1: AXIS, x2: X1, y2: AXIS, class: "fig-ink", width: 1.6 });
    for (const value of TICKS) {
      drawing += line({ x1: x(value), y1: AXIS, x2: x(value), y2: AXIS + 6, class: "fig-ink", width: 1.2 });
      drawing += label({ x: x(value), y: AXIS + 24, text: lengthLabel(value), size: SIZE.tick, class: "text-ink" });
    }
    drawing += label({ x: X1, y: AXIS + 44, text: "wavelength", anchor: "end", size: SIZE.value, class: "text-ink" });

    // The marker, with its label kept inside the drawing.
    drawing += line({ x1: x(at), y1: TOP, x2: x(at), y2: AXIS, class: "fig-warn", width: 2, dash: "6 4" });
    drawing += circle({ cx: x(at), cy: AXIS, r: 5.5, class: "fig-warn" });
    const labelX = Math.min(Math.max(x(at), X0 + 34), X1 - 34);
    drawing += label({ x: labelX, y: AXIS - 10, text: lengthLabel(at), size: SIZE.value, class: "text-warn", weight: 600 });

    svg.innerHTML = drawing;

    readout.textContent =
      `A wavelength of ${lengthLabel(at)} is ${familyAt(at)}. ` +
      `Its frequency is ${sigfig(frequency, 3, { scientific: true })} Hz, because c = f λ. ` +
      `Visible light runs from 400 nm to 700 nm.`;
  }

  react([position], update);
}
