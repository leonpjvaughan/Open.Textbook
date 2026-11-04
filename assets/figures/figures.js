// Figure substrate for the book. A custom element that lazily imports the figure
// module named by `data-figure-src`, or by `data-figure` when the page was not
// built by `textbook.pipeline`.
//
// The two names are the same module at two addresses. `data-figure` is the slug an
// author writes and a reader's tools read; `data-figure-src` is the **content-
// addressed** filename the build wrote (`ch10-nth-term.a1b2c3d4.js`), so a module
// that did not change keeps its URL across a deploy and a cached copy is still the
// one that is served. Falling back to the slug is what keeps this file portable: it
// runs unchanged in the Quarto / MyST / MDX ports, where nothing has been hashed.
//
// **A label's width is its font's, so the frame has the last word.** Two labels written
// to fit the frame measured 28 and 53 units outside it on a machine whose font is wider
// than the site's, and `canvas` caught them only on the runner. `fitText` measures every
// `<text>` after it is drawn and, when its ink leaves the `viewBox`, shrinks it with
// `textLength` — the anchor the author chose stays put, the glyphs get narrower, and the
// height (which is what legibility is measured by) does not change. It runs again on
// every redraw, because a figure with a control replaces its own markup.
//
// Pure HTML + ES module, so it needs no bundler and no DOM polyfill.

/** Keep every label inside the frame it was drawn in, in whatever font is loaded. */
function fitText(svg) {
  const box = svg.viewBox && svg.viewBox.baseVal;
  const width = (box && box.width) || svg.clientWidth;
  const height = (box && box.height) || svg.clientHeight;
  if (!width || !height) return;
  for (const text of svg.querySelectorAll("text")) {
    text.removeAttribute("textLength");
    let ink = text.getBBox();
    if (!ink.width) continue;
    // Too low or too high: move it, since no amount of narrowing fixes a vertical miss.
    const dy = ink.y < 0 ? -ink.y : Math.max(0, ink.y + ink.height - height);
    if (dy > 0) {
      const y = Number(text.getAttribute("y") || 0);
      text.setAttribute("y", String(y - dy));
      ink = text.getBBox();
    }
    const over = Math.max(0, -ink.x) + Math.max(0, ink.x + ink.width - width);
    if (!over) continue;
    // Narrowing holds the anchor, so the ink moves in from whichever edge it crossed.
    text.setAttribute("textLength", String(Math.max(4, ink.width - over)));
    text.setAttribute("lengthAdjust", "spacingAndGlyphs");
  }
}
class MathsFigure extends HTMLElement {
  async connectedCallback() {
    const slug = (this.dataset.figure || "").trim();
    if (!/^[a-z0-9-]+$/.test(slug)) {
      this.textContent = `Invalid figure reference: ${slug}`;
      return;
    }
    // A filename, not a path: modules sit beside this loader, which is why a shared
    // module is copied flat rather than into a subdirectory. A value with a slash
    // or a scheme would import something this element never promised to reach.
    const src = (this.dataset.figureSrc || "").trim();
    const file = /^[a-z0-9][a-z0-9.-]*\.js$/.test(src) ? src : `${slug}.js`;
    try {
      const mod = await import(`./${file}`);
      mod.mount(this);
      // Observe the **host**, not the `svg`: a figure that re-panels on a control replaces
      // its own frame, and an observer on the old frame would be watching a detached node.
      const fit = () => {
        for (const svg of this.querySelectorAll("svg")) fitText(svg);
      };
      fit();
      new MutationObserver(fit).observe(this, { childList: true, subtree: true });
    } catch (err) {
      this.textContent = `Figure failed to load: ${slug}`;
      console.error(err);
    }
  }
}

if (!customElements.get("maths-figure")) {
  customElements.define("maths-figure", MathsFigure);
}
