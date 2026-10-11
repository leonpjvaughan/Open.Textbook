// Figure substrate for the book. A custom element that lazily imports the figure
// module named by `data-figure`. Pure HTML + ES module, so it also works in the
// Quarto / MyST / MDX ports without change.
class MathsFigure extends HTMLElement {
  async connectedCallback() {
    const slug = (this.dataset.figure || "").trim();
    if (!/^[a-z0-9-]+$/.test(slug)) {
      this.textContent = `Invalid figure reference: ${slug}`;
      return;
    }
    try {
      const mod = await import(`./${slug}.js`);
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
