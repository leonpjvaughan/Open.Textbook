const INDEX = /** @type {string} */ ("/pagefind/pagefind.js");
const LIMIT = 20;
const DEBOUNCE = 120;

/**
 * @typedef {{ url: string, excerpt: string, meta: Record<string, string> }} Result
 */

const widget = /** @type {HTMLElement | null} */ (document.querySelector("[data-search]"));
const input = /** @type {HTMLInputElement | null} */ (
  document.querySelector("[data-search-input]")
);
const list = /** @type {HTMLUListElement | null} */ (
  input && input.getAttribute("aria-controls")
    ? document.getElementById(/** @type {string} */ (input.getAttribute("aria-controls")))
    : null
);
const panel = /** @type {HTMLElement | null} */ (
  document.querySelector("[data-search-panel]")
);
const liveRegion = /** @type {HTMLElement | null} */ (
  document.querySelector("[data-search-status]")
);

if (input && list && panel) {
  const field = input;
  const listbox = list;
  const sheet = panel;
  const live = liveRegion;

  if (widget) widget.hidden = false;

  const prefer = (widget && widget.dataset.searchPrefer) || "";

  /** @type {any} */
  let engine = null;
  let sequence = 0;
  let active = -1;
  let timer = 0;

  async function load() {
    if (!engine) engine = await import(INDEX);
    return engine;
  }

  /** @param {string} message */
  function announce(message) {
    if (live) live.textContent = message;
  }

  function hide() {
    sheet.hidden = true;
    listbox.replaceChildren();
    active = -1;
    field.removeAttribute("aria-activedescendant");
    announce("");
  }

  const narrow = window.matchMedia("(max-width: 48rem)");

  function place() {
    if (!narrow.matches) {
      sheet.style.removeProperty("top");
      return;
    }
    const bottom = field.getBoundingClientRect().bottom;
    sheet.style.top = `${Math.max(0, Math.round(bottom))}px`;
  }

  window.addEventListener("resize", () => {
    if (!sheet.hidden) place();
  });
  window.addEventListener(
    "scroll",
    () => {
      if (!sheet.hidden) place();
    },
    { passive: true }
  );

  /**
   * @param {Result} result
   * @param {number} index
   */
  function row(result, index) {
    const item = document.createElement("li");
    item.className = "tb-search__row";

    const link = document.createElement("a");
    link.className = "tb-search__link";
    link.id = `search-result-${index}`;
    link.href = result.url;

    const meta = document.createElement("span");
    meta.className = "tb-search__meta";

    const type = document.createElement("span");
    type.className = "tb-search__type";
    type.textContent = result.meta.type || "Page";
    meta.append(type);

    const book = [result.meta.book, result.meta.edition].filter(Boolean).join(" · ");
    if (book) {
      const source = document.createElement("span");
      source.className = "tb-search__book";
      source.textContent = book;
      meta.append(source);
    }
    link.append(meta);

    const title = document.createElement("span");
    title.className = "tb-search__title";
    title.textContent = result.meta.title || "Untitled page";
    link.append(title);

    const context = [];
    if (result.meta.chapter) context.push(`Chapter · ${result.meta.chapter}`);
    if (result.meta.section && result.meta.section !== result.meta.title) {
      context.push(`Section ${result.meta.section}`);
    }
    if (context.length) {
      const parent = document.createElement("span");
      parent.className = "tb-search__chapter";
      parent.textContent = context.join(" · ");
      link.append(parent);
    }

    const excerpt = document.createElement("span");
    excerpt.className = "tb-search__excerpt";
    excerpt.innerHTML = result.excerpt;
    link.append(excerpt);

    item.append(link);
    return item;
  }

  /** @param {string} term */
  function noResults(term) {
    const item = document.createElement("li");
    item.className = "tb-search__empty";
    item.textContent = `No results for “${term}”`;
    return item;
  }

  /**
   * @param {Result[]} results
   * @returns {Result[]}
   */
  function onePerPage(results) {
    /** @type {Map<string, Result>} */
    const seen = new Map();
    for (const result of results) {
      const key = [
        result.meta.book,
        result.meta.type,
        result.meta.title,
        result.meta.section,
        result.meta.chapter,
      ].join("\u0000");
      const existing = seen.get(key);
      if (!existing) {
        seen.set(key, result);
      } else if (prefer && result.url.startsWith(prefer) && !existing.url.startsWith(prefer)) {
        seen.set(key, result);
      }
    }
    return [...seen.values()];
  }

  /**
   * @param {Result[]} results
   * @param {string} term
   * @param {boolean} failed
   */
  function show(results, term, failed) {
    if (failed) {
      const item = document.createElement("li");
      item.className = "tb-search__empty";
      item.textContent = "Search is unavailable.";
      listbox.replaceChildren(item);
      place();
      sheet.hidden = false;
      announce("Search is unavailable.");
      return;
    }
    const rows = onePerPage(results);
    listbox.replaceChildren(
      ...(rows.length ? rows.map((result, index) => row(result, index)) : [noResults(term)])
    );
    place();
    sheet.hidden = false;
    active = -1;
    field.removeAttribute("aria-activedescendant");
    announce(
      rows.length ? `${rows.length} ${rows.length === 1 ? "result" : "results"}.` : `No results for ${term}.`
    );
  }

  /** @param {string} term */
  async function search(term) {
    const mine = ++sequence;
    announce("Searching…");
    try {
      const found = await (await load()).search(term);
      const raw = /** @type {any[]} */ (found.results.slice(0, LIMIT));
      /** @type {Result[]} */
      const results = await Promise.all(raw.map((result) => result.data()));
      if (mine !== sequence) return;
      show(results, term, false);
    } catch (error) {
      if (mine !== sequence) return;
      show([], term, true);
    }
  }

  function anchors() {
    return Array.from(listbox.querySelectorAll("a")).filter(
      (node) => node instanceof HTMLAnchorElement
    );
  }

  /** @param {number} next */
  function highlight(next) {
    const links = anchors();
    if (!links.length) return;
    active = (next + links.length) % links.length;
    links.forEach((link, index) => {
      link.classList.toggle("is-active", index === active);
    });
    const link = links[active];
    field.setAttribute("aria-activedescendant", link.id);
    link.scrollIntoView({ block: "nearest" });
  }

  field.addEventListener("input", () => {
    window.clearTimeout(timer);
    const term = field.value.trim();
    if (term.length < 2) {
      hide();
      return;
    }
    timer = window.setTimeout(() => void search(term), DEBOUNCE);
  });

  field.addEventListener("keydown", (event) => {
    if (sheet.hidden) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      highlight(active + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      highlight(active - 1);
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      const link = anchors()[active];
      if (link) window.location.assign(link.href);
    } else if (event.key === "Escape") {
      event.preventDefault();
      hide();
      field.focus();
    }
  });

  document.querySelectorAll("[data-search-close]").forEach((button) => {
    button.addEventListener("click", () => {
      hide();
      field.focus();
    });
  });

  document.addEventListener("pointerdown", (event) => {
    if (sheet.hidden) return;
    const target = event.target;
    if (target instanceof Node && (sheet.contains(target) || field.contains(target))) return;
    hide();
  });
}
