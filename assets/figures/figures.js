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
// Pure HTML + ES module, so it needs no bundler and no DOM polyfill.
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
    } catch (err) {
      this.textContent = `Figure failed to load: ${slug}`;
      console.error(err);
    }
  }
}

if (!customElements.get("maths-figure")) {
  customElements.define("maths-figure", MathsFigure);
}
