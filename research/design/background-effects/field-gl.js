// Prototype: a vector-field visualisation in one fragment shader.
//
// This is the one that would matter for the Physics book, where a field is the
// content rather than decoration. It draws the field lines of a 2D electric
// dipole by using the *stream function* of the field:
//
//   psi(x) = sum_i q_i * theta_i(x)        (theta_i = angle from charge i)
//
// Away from the charges the electrostatic field is divergence-free in 2D and
// satisfies E = (dpsi/dy, -dpsi/dx), so the level sets of psi are exactly the
// field lines and the sign of E is the direction the bands travel. It is one
// full-screen pass with no framebuffer — no pressure solve, no advection — so
// it is the cheap end of "WebGL background".
//
// Palette comes in as uniforms, read from --tb-* (palette.js), so the line
// colour follows the reader's bundle and scheme.

import { readPaletteRgb, watchPalette } from "./palette.js";

const VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform float uAspect;
uniform float uTime;
uniform float uSeparation;
uniform float uDensity;
uniform float uWidth;
uniform float uSpeed;
uniform vec3 uLine;
uniform float uOpacity;
out vec4 fragColor;

float wrapPi(float a) {
  return atan(sin(a), cos(a));
}

void main () {
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.0;
  vec2 c1 = vec2(-uSeparation, 0.0);   // +q
  vec2 c2 = vec2( uSeparation, 0.0);   // -q

  float t1 = atan(p.y - c1.y, p.x - c1.x);
  float t2 = atan(p.y - c2.y, p.x - c2.x);
  float psi = (t1 - t2) / 6.2831853;   // turns, so uDensity is lines per turn

  // Bands travel along the field lines; the direction of travel is the
  // direction of E, which is what a reader is meant to see.
  float band = abs(fract(psi * uDensity - uTime * uSpeed) - 0.5);
  float line = 1.0 - smoothstep(0.0, uWidth, band);

  float r1 = length(p - c1);
  float r2 = length(p - c2);
  line *= smoothstep(0.0, 0.05, min(r1, r2));

  // A faint field-strength wash so the lines sit in something.
  float wash = 0.10 / (1.0 + 40.0 * min(r1, r2));
  float a = clamp(line * 0.75 + wash, 0.0, 1.0) * uOpacity;
  fragColor = vec4(uLine, a);
}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`shader: ${log}`);
  }
  return shader;
}

/**
 * @param {object} [opts]
 * @param {number} [opts.density=7] field lines per turn of the stream function
 * @param {number} [opts.width=0.28] line half-width, in band units
 * @param {number} [opts.speed=0.12] turns per second along the lines
 * @param {number} [opts.opacity=0.9]
 * @param {number} [opts.idleMs=2500]
 */
export function mount(opts = {}) {
  const {
    density = 7,
    width = 0.28,
    speed = 0.12,
    opacity = 0.9,
    idleMs = 2500,
    className = "tb-bg-field",
  } = opts;

  const canvas = document.createElement("canvas");
  canvas.className = className;
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "-1",
    display: "block",
  });

  const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false, antialias: false });
  if (!gl) return null;

  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  } catch (err) {
    if (window.__bgErrors) window.__bgErrors.push(String(err));
    return null;
  }
  gl.useProgram(program);
  const loc = (n) => gl.getUniformLocation(program, n);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  const index = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  (document.body || document.documentElement).appendChild(canvas);

  let palette = readPaletteRgb();
  const unwatch = watchPalette((next) => { palette = next; });

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();

  function render(timeSeconds) {
    gl.useProgram(program);
    gl.uniform1f(loc("uAspect"), canvas.width / canvas.height);
    gl.uniform1f(loc("uTime"), timeSeconds);
    gl.uniform1f(loc("uSeparation"), 0.42 + 0.06 * Math.sin(timeSeconds * 0.35));
    gl.uniform1f(loc("uDensity"), density);
    gl.uniform1f(loc("uWidth"), width);
    gl.uniform1f(loc("uSpeed"), speed);
    gl.uniform3f(loc("uLine"), ...palette.accent);
    gl.uniform1f(loc("uOpacity"), opacity);
    gl.disable(gl.BLEND);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }

  const start = performance.now();
  let raf = 0;
  let running = false;
  let hidden = false;
  let lastInput = performance.now();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const passes = [];

  function frame(now) {
    raf = 0;
    const t0 = performance.now();
    render((now - start) / 1000);
    passes.push(performance.now() - t0);
    if (passes.length > 600) passes.shift();
    schedule();
  }
  function schedule() {
    if (!running || hidden || reduced.matches) return;
    if (performance.now() - lastInput > idleMs) return; // idle: stopped
    raf = requestAnimationFrame(frame);
  }
  function startLoop() {
    if (running) return;
    running = true;
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function stopLoop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }
  function poke() { lastInput = performance.now(); startLoop(); }
  function onVisibility() { hidden = document.hidden; if (hidden) stopLoop(); else startLoop(); }
  function onReduced() { if (reduced.matches) { stopLoop(); render(0); } else poke(); }

  window.addEventListener("pointermove", poke, { passive: true });
  window.addEventListener("pointerdown", poke, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  reduced.addEventListener("change", onReduced);

  let intersection = null;
  if (typeof IntersectionObserver !== "undefined") {
    intersection = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) startLoop(); else stopLoop();
    });
    intersection.observe(canvas);
  }

  render(0);
  if (!reduced.matches) startLoop();

  return {
    canvas,
    stop() {
      stopLoop();
      unwatch();
      intersection?.disconnect();
      window.removeEventListener("pointermove", poke);
      window.removeEventListener("pointerdown", poke);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReduced);
      canvas.remove();
    },
    palette() { return palette; },
    stats() {
      const sorted = [...passes].sort((a, b) => a - b);
      return { passes: passes.length, running, looping: raf !== 0, hidden, reducedMotion: reduced.matches,
        submitMsMean: sorted.length ? sorted.reduce((a, b) => a + b, 0) / sorted.length : 0 };
    },
  };
}
