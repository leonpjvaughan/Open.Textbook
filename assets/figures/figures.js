// to fit the frame measured 28 and 53 units outside it on a machine whose font is wider
// height (which is what legibility is measured by) does not change. It runs again on

/**
 * @param {SVGSVGElement} svg
 */
function fitText(svg) {
  const box = svg.viewBox && svg.viewBox.baseVal;
  const width = (box && box.width) || svg.clientWidth;
  const height = (box && box.height) || svg.clientHeight;
  if (!width || !height) return;
  for (const text of svg.querySelectorAll("text")) {
    text.removeAttribute("textLength");
    let ink = text.getBBox();
    if (!ink.width) continue;
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
    const src = (this.dataset.figureSrc || "").trim();
    const file = /^[a-z0-9][a-z0-9.-]*\.js$/.test(src) ? src : `${slug}.js`;
    try {
      const mod = await import(`./${file}`);
      mod.mount(this);
      const figure = this.closest("figure");
      const caption = figure && figure.querySelector("[data-figure-caption]");
      if (caption && !caption.textContent.trim()) {
        const named = this.querySelector("svg[aria-label]");
        if (named) caption.textContent = named.getAttribute("aria-label") || "";
      }
      // Observe the **host**, not the `svg`: a figure that re-panels on a control replaces
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
