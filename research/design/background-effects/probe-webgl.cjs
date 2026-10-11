// Probe: what WebGL implementation is available in this environment?
//
// This decides whether the frame-rate numbers are a GPU measurement or a
// software-rasteriser floor. Run:
//   node research/design/background-effects/probe-webgl.cjs
const PW = process.env.PLAYWRIGHT_PATH
  || "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright";
const { chromium } = require(PW);

const HEADLESS_SHELL = process.env.CHROME_PATH
  || "/home/leon/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";

async function probe(label, launch) {
  let browser;
  try {
    browser = await chromium.launch(launch);
  } catch (err) {
    console.log(`${label}: launch failed: ${err.message}`);
    return;
  }
  try {
    const page = await browser.newPage();
    const info = await page.evaluate(() => {
      const out = { webgl2: false, webgl1: false, renderer: null, vendor: null, floatExt: {}, err: null };
      const c = document.createElement("canvas");
      for (const name of ["webgl2", "webgl"]) {
        let gl = null;
        try { gl = c.getContext(name); } catch (e) { out.err = String(e); }
        if (!gl) continue;
        if (name === "webgl2") out.webgl2 = true; else out.webgl1 = true;
        const dbg = gl.getExtension("WEBGL_debug_renderer_info");
        out.renderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        out.vendor = dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR);
        out.maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        out.maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);
        out.floatExt = {
          colorBufferFloat: !!gl.getExtension("EXT_color_buffer_float"),
          halfFloat: !!gl.getExtension("OES_texture_half_float"),
          halfFloatLinear: !!gl.getExtension("OES_texture_half_float_linear"),
          floatLinear: !!gl.getExtension("OES_texture_float_linear"),
          renderHalfFloat: !!gl.getExtension("EXT_color_buffer_half_float"),
        };
        break;
      }
      return out;
    });
    console.log(`${label}:`, JSON.stringify(info, null, 2));
  } finally {
    await browser.close();
  }
}

(async () => {
  await probe("headless-shell (default args)", { executablePath: HEADLESS_SHELL });
  await probe("headless-shell + swiftshader allowed", {
    executablePath: HEADLESS_SHELL,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  await probe("google-chrome headless", { channel: "chrome" });
  await probe("google-chrome headed (real GPU, DISPLAY present)", {
    channel: "chrome",
    headless: false,
  });
})().catch((e) => { console.error(e); process.exit(1); });
