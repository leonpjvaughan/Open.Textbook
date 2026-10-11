/* Reader Settings: the theme bundle and the colour scheme in one dialog.
 *
 * A native <dialog>, so opening it never changes the URL, Escape closes it, the
 * background is inert and the trigger/panel label relationship is the browser's
 * job. The reader's choices are the origin-wide keys that hooks/prefs.py already
 * owns (window.textbookPrefs), so a choice made here follows the reader into
 * every book and the landing page.
 *
 * Loaded site-wide via extra_javascript. It renders nothing but the trigger
 * until first opened. Loaded scripts run at the end of <body>, so the elements
 * it needs are already parsed.
 */
(() => {
  "use strict";

  const trigger = document.getElementById("tb-settings");
  const dialog = document.getElementById("tb-settings-dialog");
  if (!trigger || !dialog) return;

  // prefs.py exposes the store; fall back to the same two keys if the bridge
  // ever fails to run, so the control is not silently coupled to it.
  const prefs = window.textbookPrefs || null;
  const SCHEME_KEY = (prefs && prefs.schemeKey) || "textbooks:scheme";
  const THEME_KEY = (prefs && prefs.themeKey) || "textbooks:theme";

  function writeShared(key, value) {
    if (prefs && typeof prefs.write === "function") {
      prefs.write(key, value);
      return;
    }
    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
      /* storage unavailable: the choice still applies to this page */
    }
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

  function setTheme(value) {
    if (!value) return;
    if (prefs && typeof prefs.setTheme === "function") {
      prefs.setTheme(value);
      return;
    }
    writeShared(THEME_KEY, value);
    document.documentElement.setAttribute("data-theme", value);
  }

  function setScheme(scheme) {
    if (scheme !== "default" && scheme !== "slate") return;
    writeShared(SCHEME_KEY, scheme);
    // `themes.css` keys every token off `body[data-md-color-scheme]`, which the
    // before-paint script sets and this keeps in step. There used to be a branch
    // here that drove Material's hidden palette input instead, so that Material
    // would swap its own variables; Material is gone with the MkDocs shell, and
    // nothing has emitted `input[name="__palette"]` since.
    document.body.setAttribute("data-md-color-scheme", scheme);
  }

  function sync() {
    const scheme = dialog.querySelector(
      'input[name="tb-scheme"][value="' + currentScheme() + '"]'
    );
    if (scheme) scheme.checked = true;
    const theme = dialog.querySelector(
      'input[name="tb-theme"][value="' + currentTheme() + '"]'
    );
    if (theme) theme.checked = true;
  }

  function open() {
    if (dialog.open) return;
    sync();
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    const first =
      dialog.querySelector('input[name="tb-theme"]:checked') ||
      dialog.querySelector('input[name="tb-scheme"]:checked') ||
      dialog.querySelector("button");
    if (first) first.focus();
  }

  trigger.addEventListener("click", open);
  // The dialog moves focus itself; returning it to the trigger is explicit so
  // the reader lands back where they opened it, in every browser.
  dialog.addEventListener("close", () => trigger.focus());
  dialog.addEventListener("change", (event) => {
    const input = event.target;
    if (!input || input.type !== "radio") return;
    if (input.name === "tb-theme") setTheme(input.value);
    else if (input.name === "tb-scheme") setScheme(input.value);
  });
  // A click on the backdrop lands on the dialog element itself.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Enhance, do not depend: the trigger is inert (hidden) until we are here.
  trigger.hidden = false;
})();
