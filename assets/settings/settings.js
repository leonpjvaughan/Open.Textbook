(() => {
  "use strict";

  const trigger = document.getElementById("tb-settings");
  const found = /** @type {HTMLDialogElement | null} */ (
    document.getElementById("tb-settings-dialog")
  );
  if (!trigger || !found) return;
  const dialog = found;

  const prefs = window.textbookPrefs || null;
  const SCHEME_KEY = (prefs && prefs.schemeKey) || "textbooks:scheme";
  const THEME_KEY = (prefs && prefs.themeKey) || "textbooks:theme";

  /**
   * @param {string} key
   * @param {string} value
   */
  function writeShared(key, value) {
    if (prefs && typeof prefs.write === "function") {
      prefs.write(key, value);
      return;
    }
    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
    }
  }

  function currentStyle() {
    const active = document.documentElement.getAttribute("data-style");
    if (active) return active;
    return (prefs && prefs.defaultStyle) || "";
  }

  /** @param {string} value  a layout id */
  function setStyle(value) {
    if (!value || !prefs || typeof prefs.setStyle !== "function") return;
    prefs.setStyle(value);
  }

  function currentScheme() {
    return document.body.getAttribute("data-md-color-scheme") === "slate"
      ? "slate"
      : "default";
  }

  function currentTheme() {
    const active = document.documentElement.getAttribute("data-theme");
    if (active) return active;
    return (prefs && prefs.defaultTheme) || "";
  }

  /** @param {string} value  a bundle id */
  function setTheme(value) {
    if (!value) return;
    if (prefs && typeof prefs.setTheme === "function") {
      prefs.setTheme(value);
      return;
    }
    writeShared(THEME_KEY, value);
    document.documentElement.setAttribute("data-theme", value);
  }

  /** @param {string} scheme  `default` or `slate` */
  function setScheme(scheme) {
    if (scheme !== "default" && scheme !== "slate") return;
    writeShared(SCHEME_KEY, scheme);
    // Material's hidden `input[name="__palette"]` is not driven: this writes the
    // scheme itself, and nothing has emitted that input since the MkDocs shell left.
    document.body.setAttribute("data-md-color-scheme", scheme);
  }

  function sync() {
    const scheme = /** @type {HTMLInputElement | null} */ (
      dialog.querySelector('input[name="tb-scheme"][value="' + currentScheme() + '"]')
    );
    if (scheme) scheme.checked = true;
    const theme = /** @type {HTMLInputElement | null} */ (
      dialog.querySelector('input[name="tb-theme"][value="' + currentTheme() + '"]')
    );
    if (theme) theme.checked = true;
    const style = /** @type {HTMLInputElement | null} */ (
      dialog.querySelector('input[name="tb-layout"][value="' + currentStyle() + '"]')
    );
    if (style) style.checked = true;
  }

  function open() {
    if (dialog.open) return;
    sync();
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    const first = /** @type {HTMLElement | null} */ (
      dialog.querySelector('input[name="tb-theme"]:checked') ||
        dialog.querySelector('input[name="tb-scheme"]:checked') ||
        dialog.querySelector("button")
    );
    if (first) first.focus();
  }

  trigger.addEventListener("click", open);
  dialog.addEventListener("close", () => trigger.focus());
  dialog.addEventListener("change", (event) => {
    const input = /** @type {HTMLInputElement | null} */ (event.target);
    if (!input || input.type !== "radio") return;
    if (input.name === "tb-theme") setTheme(input.value);
    else if (input.name === "tb-layout") setStyle(input.value);
    else if (input.name === "tb-scheme") setScheme(input.value);
  });
  // declaratively, and the browser does it without a listener. Safari does not support
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    /**
     * @param {PointerEvent} event
     */
    const outside = (event) => {
      const rect = dialog.getBoundingClientRect();
      return (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      );
    };
    let pressedOutside = false;
    dialog.addEventListener("pointerdown", (event) => {
      pressedOutside = outside(event);
    });
    dialog.addEventListener("pointerup", (event) => {
      if (pressedOutside && outside(event)) dialog.close();
    });
  }

  trigger.hidden = false;
})();
