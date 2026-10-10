// Portable figure substrate.
//
// A tiny custom element that lazily imports the figure module named by
// `data-figure`. Because it is plain HTML + a standard ES module, it works in
// MkDocs, Quarto, MyST/Jupyter Book and Astro/MDX without modification; only the
// authoring shorthand differs per renderer.
const MODULES = {
  gradient: () => import("./gradient.js"),
};

class MathsFigure extends HTMLElement {
  async connectedCallback() {
    const slug = this.dataset.figure;
    const loader = MODULES[slug];
    if (!loader) {
      this.textContent = `Unknown figure: ${slug}`;
      return;
    }
    try {
      const mod = await loader();
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
