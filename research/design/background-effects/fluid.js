// Prototype: a stable-fluids solver in a fragment shader, pointer-driven.
//
// The shape is the one at https://mofu-dev.com/en/blog/stable-fluids/ and in
// Pavel Dobryakov's WebGL-Fluid-Simulation (MIT): advect, project (Jacobi
// pressure), subtract the gradient, advect the dye, display. Written from
// scratch for this measurement and reduced to one file.
//
// Design points that the collection's rules force:
//
// * **No colour in the module.** The dye carries a scalar density and a scalar
//   hue selector; the display shader turns them into a palette colour from a
//   uniform. So the same simulation recolours instantly when the reader changes
//   bundle or scheme, and `tests/test_themes.py` has nothing new to police.
// * **Fail to nothing.** With no WebGL2 (or no float render target) `mount`
//   returns a stopped handle and adds nothing to the page.
// * **Stop when it costs.** `prefers-reduced-motion: reduce`, a hidden document,
//   an offscreen canvas, or `idleMs` without input all stop the loop. It
//   restarts on input.

import { readPaletteRgb, watchPalette } from "./palette.js";

const VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAG_ADVECTION = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
out vec4 fragColor;
void main () {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  vec4 result = texture(uSource, coord);
  float decay = 1.0 + dissipation * dt;
  fragColor = result / decay;
}`;

const FRAG_DIVERGENCE = `#version 300 es
precision highp float;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uVelocity;
out vec4 fragColor;
void main () {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }
  float div = 0.5 * (R - L + T - B);
  fragColor = vec4(div, 0.0, 0.0, 1.0);
}`;

const FRAG_CLEAR = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
out vec4 fragColor;
void main () {
  fragColor = value * texture(uTexture, vUv);
}`;

const FRAG_PRESSURE = `#version 300 es
precision highp float;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
out vec4 fragColor;
void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  fragColor = vec4(pressure, 0.0, 0.0, 1.0);
}`;

const FRAG_GRADIENT = `#version 300 es
precision highp float;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
out vec4 fragColor;
void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  fragColor = vec4(velocity, 0.0, 1.0);
}`;

const FRAG_SPLAT = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
out vec4 fragColor;
void main () {
  vec2 p = vUv - point.xy;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture(uTarget, vUv).xyz;
  fragColor = vec4(base + splat, 1.0);
}`;

// The palette lives here, not in the simulation. `hue` selects between two
// tokens, so a scheme switch is a uniform update and every frame of dye that is
// already on screen is recoloured with it.
const FRAG_DISPLAY = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTexture;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;
out vec4 fragColor;
void main () {
  vec4 d = texture(uTexture, vUv);
  float density = clamp(d.r, 0.0, 1.0);
  float hue = clamp(d.g, 0.0, 1.0);
  vec3 c = mix(uColorA, uColorB, hue);
  fragColor = vec4(c, density * uOpacity);
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

function makeProgram(gl, fragSource) {
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`link: ${gl.getProgramInfoLog(program)}`);
  }
  const uniforms = new Map();
  return {
    program,
    use() {
      gl.useProgram(program);
      return this;
    },
    loc(name) {
      if (!uniforms.has(name)) uniforms.set(name, gl.getUniformLocation(program, name));
      return uniforms.get(name);
    },
  };
}

function createFBO(gl, w, h, internalFormat, format, type, param) {
  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    throw new Error("framebuffer incomplete");
  }
  gl.viewport(0, 0, w, h);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return {
    texture,
    fbo,
    width: w,
    height: h,
    texelSizeX: 1 / w,
    texelSizeY: 1 / h,
    attach(id) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    },
  };
}

function createDoubleFBO(gl, w, h, internalFormat, format, type, param) {
  let front = createFBO(gl, w, h, internalFormat, format, type, param);
  let back = createFBO(gl, w, h, internalFormat, format, type, param);
  return {
    get read() { return front; },
    get write() { return back; },
    swap() { const t = front; front = back; back = t; },
    width: w,
    height: h,
  };
}

function getResolution(gl, resolution, aspect) {
  let w = gl.drawingBufferWidth;
  let h = gl.drawingBufferHeight;
  if (w > h) { w = Math.round(resolution * aspect); h = resolution; }
  else { w = resolution; h = Math.round(resolution / aspect); }
  return { width: w, height: h };
}

/**
 * Mount one fluid background.
 *
 * @param {object} [opts]
 * @param {number} [opts.simResolution=96] grid used for velocity and pressure
 * @param {number} [opts.dyeResolution=384] grid used for the dye
 * @param {number} [opts.idleMs=2500] stop after this long without input
 * @param {number} [opts.autoSplatMs=0] if non-zero, inject a splat on this
 *   interval so the background animates with no pointer (the decorative case)
 * @param {number} [opts.opacity=1] dye opacity
 * @param {string} [opts.className="tb-bg-fluid"] the class on the canvas
 * @returns {{stop: function, palette: function, stats: function}|null}
 */
export function mount(opts = {}) {
  const {
    simResolution = 96,
    dyeResolution = 384,
    idleMs = 2500,
    autoSplatMs = 0,
    opacity = 0.9,
    className = "tb-bg-fluid",
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

  const gl =
    canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false, depth: false, stencil: false, antialias: false }) ||
    null;
  if (!gl) return null;
  const ext = gl.getExtension("EXT_color_buffer_float");
  if (!ext) return null;

  const half = gl.HALF_FLOAT;
  const format = gl.RGBA;
  const internal = gl.RGBA16F;
  const linear = gl.LINEAR;
  const nearest = gl.NEAREST;

  let advection, divergence, clear, pressure, gradient, splat, display;
  try {
    advection = makeProgram(gl, FRAG_ADVECTION);
    divergence = makeProgram(gl, FRAG_DIVERGENCE);
    clear = makeProgram(gl, FRAG_CLEAR);
    pressure = makeProgram(gl, FRAG_PRESSURE);
    gradient = makeProgram(gl, FRAG_GRADIENT);
    splat = makeProgram(gl, FRAG_SPLAT);
    display = makeProgram(gl, FRAG_DISPLAY);
  } catch (err) {
    if (window.__bgErrors) window.__bgErrors.push(String(err));
    return null;
  }

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  const index = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  function blit(target) {
    if (target == null) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }

  // The canvas must be sized before the simulation grid, or the grid takes its
  // aspect from the default 300x150 backing store.
  (document.body || document.documentElement).appendChild(canvas);
  {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
  }

  const aspect = () => canvas.width / canvas.height;
  const simRes = getResolution(gl, simResolution, aspect());
  const dyeRes = getResolution(gl, dyeResolution, aspect());
  const velocity = createDoubleFBO(gl, simRes.width, simRes.height, internal, format, half, linear);
  const dye = createDoubleFBO(gl, dyeRes.width, dyeRes.height, internal, format, half, linear);
  const divergenceFBO = createFBO(gl, simRes.width, simRes.height, internal, format, half, nearest);
  const pressureFBO = createDoubleFBO(gl, simRes.width, simRes.height, internal, format, half, nearest);

  let palette = readPaletteRgb();
  const unwatch = watchPalette((next) => { palette = next; });

  const displayUniforms = () => {
    display.use();
    gl.uniform3f(display.loc("uColorA"), ...palette.accent);
    gl.uniform3f(display.loc("uColorB"), ...palette.figWarn);
    gl.uniform1f(display.loc("uOpacity"), opacity);
  };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width === w && canvas.height === h) return;
    canvas.width = w;
    canvas.height = h;
  }

  function splatAt(x, y, dx, dy, hue, strength) {
    splat.use();
    gl.uniform1i(splat.loc("uTarget"), velocity.read.attach(0));
    gl.uniform1f(splat.loc("aspectRatio"), aspect());
    gl.uniform2f(splat.loc("point"), x, y);
    gl.uniform3f(splat.loc("color"), dx, dy, 0);
    gl.uniform1f(splat.loc("radius"), 1 / 220);
    blit(velocity.write);
    velocity.swap();

    splat.use();
    gl.uniform1i(splat.loc("uTarget"), dye.read.attach(0));
    gl.uniform1f(splat.loc("aspectRatio"), aspect());
    gl.uniform2f(splat.loc("point"), x, y);
    gl.uniform3f(splat.loc("color"), strength, hue, 0);
    gl.uniform1f(splat.loc("radius"), 1 / 220);
    blit(dye.write);
    dye.swap();
  }

  function step(dt) {
    gl.disable(gl.BLEND);

    advection.use();
    gl.uniform1i(advection.loc("uVelocity"), velocity.read.attach(0));
    gl.uniform1i(advection.loc("uSource"), velocity.read.attach(0));
    gl.uniform2f(advection.loc("texelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
    gl.uniform1f(advection.loc("dt"), dt);
    gl.uniform1f(advection.loc("dissipation"), 0.28);
    blit(velocity.write);
    velocity.swap();

    divergence.use();
    gl.uniform1i(divergence.loc("uVelocity"), velocity.read.attach(0));
    gl.uniform2f(divergence.loc("texelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
    blit(divergenceFBO);

    clear.use();
    gl.uniform1i(clear.loc("uTexture"), pressureFBO.read.attach(0));
    gl.uniform1f(clear.loc("value"), 0.8);
    blit(pressureFBO.write);
    pressureFBO.swap();

    pressure.use();
    gl.uniform2f(pressure.loc("texelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
    gl.uniform1i(pressure.loc("uDivergence"), divergenceFBO.attach(0));
    for (let i = 0; i < 20; i++) {
      gl.uniform1i(pressure.loc("uPressure"), pressureFBO.read.attach(1));
      blit(pressureFBO.write);
      pressureFBO.swap();
    }

    gradient.use();
    gl.uniform1i(gradient.loc("uPressure"), pressureFBO.read.attach(0));
    gl.uniform1i(gradient.loc("uVelocity"), velocity.read.attach(1));
    gl.uniform2f(gradient.loc("texelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
    blit(velocity.write);
    velocity.swap();

    advection.use();
    gl.uniform1i(advection.loc("uVelocity"), velocity.read.attach(0));
    gl.uniform1i(advection.loc("uSource"), dye.read.attach(1));
    gl.uniform2f(advection.loc("texelSize"), dye.read.texelSizeX, dye.read.texelSizeY);
    gl.uniform1f(advection.loc("dt"), dt);
    gl.uniform1f(advection.loc("dissipation"), 0.9);
    blit(dye.write);
    dye.swap();

    displayUniforms();
    gl.uniform1i(display.loc("uTexture"), dye.read.attach(0));
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    blit(null);
    gl.disable(gl.BLEND);
  }

  let pointer = null;
  let lastInput = performance.now();
  let running = false;
  let raf = 0;
  let lastTime = performance.now();
  let autoSplatTimer = 0;
  const frames = [];
  let hidden = false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  function frame(now) {
    raf = 0;
    const dt = Math.min((now - lastTime) / 1000, 1 / 30);
    lastTime = now;
    const start = performance.now();

    if (autoSplatMs > 0 && now - autoSplatTimer > autoSplatMs) {
      autoSplatTimer = now;
      const x = 0.2 + Math.random() * 0.6;
      const y = 0.2 + Math.random() * 0.6;
      splatAt(x, y, (Math.random() - 0.5) * 900, (Math.random() - 0.5) * 900, Math.random(), 0.7);
    }
    step(dt);
    frames.push(performance.now() - start);
    if (frames.length > 600) frames.shift();
    schedule();
  }

  function schedule() {
    if (!running || hidden || reduced.matches) return;
    if (performance.now() - lastInput > idleMs && autoSplatMs === 0) return; // idle: stopped
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    lastTime = performance.now();
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function onPointer(event) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;
    if (pointer) {
      splatAt(x, y, (x - pointer.x) * 2400, (y - pointer.y) * 2400, 0, 0.9);
    }
    pointer = { x, y };
    lastInput = performance.now();
    start();
  }

  function onVisibility() {
    hidden = document.hidden;
    if (hidden) stop();
    else start();
  }

  function onReduced() {
    if (reduced.matches) { stop(); step(0.016); }
    else { lastInput = performance.now(); start(); }
  }

  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("pointerdown", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  reduced.addEventListener("change", onReduced);

  // Offscreen: stop paying for a background nobody can see.
  let intersection = null;
  if (typeof IntersectionObserver !== "undefined") {
    intersection = new IntersectionObserver((entries) => {
      const visible = entries.some((e) => e.isIntersecting);
      if (!visible) stop(); else start();
    });
    intersection.observe(canvas);
  }

  window.addEventListener("resize", resize, { passive: true });

  // Make one frame so the canvas is never left blank, then honour the motion
  // preference: `reduce` draws the one frame and stops there.
  hidden = document.hidden;
  step(0.016);
  if (!reduced.matches) {
    lastInput = performance.now();
    start();
  }

  const handle = {
    canvas,
    stop() {
      stop();
      unwatch();
      intersection?.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReduced);
      window.removeEventListener("resize", resize);
      canvas.remove();
    },
    palette() { return palette; },
    stats() {
      const sorted = [...frames].sort((a, b) => a - b);
      return {
        frames: frames.length,
        // CPU time spent submitting the GL calls, not GPU time — SwiftShader
        // and a real GPU both return here almost immediately. Read the frame
        // interval for the cost that includes the GPU.
        submitMsMean: sorted.length ? sorted.reduce((a, b) => a + b, 0) / sorted.length : 0,
        submitMsP95: sorted.length ? sorted[Math.floor(sorted.length * 0.95)] : 0,
        running,
        looping: raf !== 0,
        hidden,
        reducedMotion: reduced.matches,
      };
    },
  };
  return handle;
}
