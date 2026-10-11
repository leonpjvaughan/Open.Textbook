// Read the collection's own colour tokens at runtime.
//
// A page or a figure may not carry a colour (AGENTS.md), and a canvas cannot
// read a CSS custom property. So the token is read from the computed style and
// handed to the shader as a uniform — the same discipline as `var(--tb-accent)`
// in CSS, one layer down.
//
// The tokens live on `body` (see assets/stylesheets/themes.css, sections 3-4):
// the bundle and the subject tint both resolve there, so `body` is the element
// to read. `data-theme` is on `html` and `data-md-color-scheme` is on `body`.

const TOKENS = [
  "paper",
  "ink",
  "ink-soft",
  "rule",
  "accent",
  "accent-light",
  "accent-dark",
  "link",
  "fig-warn",
  "fig-good",
  "fig-grid",
];

const FALLBACK = {
  paper: "#faf9f5",
  ink: "#1f1e1b",
  "ink-soft": "#5c5a54",
  rule: "#e6e3da",
  accent: "#2f6690",
  "accent-light": "#4a7fae",
  "accent-dark": "#24506f",
  link: "#23577d",
  "fig-warn": "#a3402f",
  "fig-good": "#2c744a",
  "fig-grid": "#85837d",
};

let scratch = null;

/** Any CSS colour -> [r, g, b] in 0..1, via a 1x1 2D canvas. */
export function toRgb(color, fallback = [0, 0, 0]) {
  if (!scratch) {
    scratch = document.createElement("canvas");
    scratch.width = 1;
    scratch.height = 1;
  }
  const ctx = scratch.getContext("2d", { willReadFrequently: true });
  if (!ctx) return fallback;
  ctx.fillStyle = "#010203"; // in case `color` is not a valid CSS colour
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return [d[0] / 255, d[1] / 255, d[2] / 255];
}

/** The tokens as strings, straight from the cascade. */
export function readPalette(root = document.body || document.documentElement) {
  const cs = getComputedStyle(root);
  const out = {};
  for (const name of TOKENS) {
    out[name] = cs.getPropertyValue(`--tb-${name}`).trim() || FALLBACK[name];
  }
  return out;
}

/** The tokens as linear-ish RGB triples for a shader. */
export function readPaletteRgb(root) {
  const tokens = readPalette(root);
  const out = { tokens };
  for (const name of TOKENS) out[camel(name)] = toRgb(tokens[name], toRgb(FALLBACK[name]));
  return out;
}

function camel(name) {
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * Call `cb` whenever the reader changes bundle or scheme.
 *
 * The pipeline sets `data-theme` on `html` and `data-md-color-scheme` on `body`
 * before first paint, and the Settings runtime rewrites both. Nothing else
 * signals the change, so the two attributes are the observable.
 */
export function watchPalette(cb) {
  let queued = false;
  const fire = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      cb(readPaletteRgb());
    });
  };
  const observer = new MutationObserver(fire);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  if (document.body) {
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-md-color-scheme"] });
  }
  return () => observer.disconnect();
}

export { TOKENS };
