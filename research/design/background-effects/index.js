// Prototype dispatcher: one entry point, one variant loaded on demand.
//
// The harness injects a single inline module that calls this with a variant
// name, so each measurement pays for exactly the variant it measures plus
// palette.js. That is what the byte numbers are taken from.

window.__bgErrors = window.__bgErrors || [];

const LOADERS = {
  fluid: () => import("./fluid.js").then((m) => m.mount),
  "field-gl": () => import("./field-gl.js").then((m) => m.mount),
  "field-2d": () => import("./field-2d.js").then((m) => m.mount),
  dots: () => import("./dots.js").then((m) => m.mount),
  "gradient-static": () => import("./gradient.js").then((m) => m.mountStatic),
  "gradient-animated": () => import("./gradient.js").then((m) => m.mountAnimated),
  "gradient-transform": () => import("./gradient.js").then((m) => m.mountTransform),
};

/** CSP probes: do not animate; they report whether the policy permits them. */
async function mountBlobWorker() {
  const source = `self.onmessage = (e) => self.postMessage({ ok: true, got: e.data });`;
  const url = URL.createObjectURL(new Blob([source], { type: "text/javascript" }));
  return new Promise((resolve) => {
    let worker = null;
    let settled = false;
    const done = (outcome) => {
      if (settled) return;
      settled = true;
      resolve({
        probe: "blob-worker",
        outcome,
        stop() { try { worker?.terminate(); } catch { /* ignore */ } URL.revokeObjectURL(url); },
        palette() { return null; },
        stats() { return { probe: "blob-worker", outcome }; },
      });
    };
    try {
      worker = new Worker(url, { type: "module" });
    } catch (err) {
      window.__bgErrors.push(`blob-worker: ${err}`);
      return done("constructor-threw");
    }
    worker.onmessage = () => done("ran");
    worker.onerror = (event) => { window.__bgErrors.push(`blob-worker error: ${event.message || "blocked"}`); done("blocked"); };
    try { worker.postMessage("ping"); } catch (err) { window.__bgErrors.push(`blob-worker post: ${err}`); return done("post-threw"); }
    setTimeout(() => done("no-response"), 1500);
  });
}

async function mountModuleWorker() {
  return new Promise((resolve) => {
    let worker = null;
    let settled = false;
    const done = (outcome) => {
      if (settled) return;
      settled = true;
      resolve({
        probe: "module-worker",
        outcome,
        stop() { try { worker?.terminate(); } catch { /* ignore */ } },
        palette() { return null; },
        stats() { return { probe: "module-worker", outcome }; },
      });
    };
    try {
      worker = new Worker("/__bg/worker.js", { type: "module" });
    } catch (err) {
      window.__bgErrors.push(`module-worker: ${err}`);
      return done("constructor-threw");
    }
    worker.onmessage = () => done("ran");
    worker.onerror = (event) => { window.__bgErrors.push(`module-worker error: ${event.message || "blocked"}`); done("blocked"); };
    worker.postMessage("ping");
    setTimeout(() => done("no-response"), 1500);
  });
}

/**
 * @param {object} options
 * @param {string} options.variant
 * @returns {Promise<object|null>}
 */
export async function mount(options = {}) {
  const { variant, ...rest } = options;
  window.__bgErrors = window.__bgErrors || [];
  try {
    if (variant === "blob-worker") return await mountBlobWorker();
    if (variant === "module-worker") return await mountModuleWorker();
    const loader = LOADERS[variant];
    if (!loader) return null;
    const factory = await loader();
    const handle = factory(rest);
    if (!handle) window.__bgErrors.push(`${variant}: unavailable (no WebGL2)`);
    return handle;
  } catch (err) {
    window.__bgErrors.push(`${variant}: ${err && err.message ? err.message : err}`);
    return null;
  }
}

export const VARIANTS = Object.keys(LOADERS).concat(["blob-worker", "module-worker"]);
