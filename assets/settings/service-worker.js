/* Register the service worker. Shared by every page: the landing page and every
 * book page load this one file, so there is one registration and one scope.
 *
 * The worker itself is emitted at the deployment root (`site/sw.js`) so its scope
 * is the whole collection for free: a service worker's scope defaults to its own
 * directory, and `site/` is ours. No `Service-Worker-Allowed` header is needed.
 *
 * This is an enhancement. With JavaScript off nothing runs, and the site is
 * unchanged and fully readable — the prose and the build-time MathML are in the
 * HTML. Load it with `defer`, so it never delays the page.
 */
(function () {
  "use strict";

  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker.register("/sw.js").catch(function () {
    // Offline support failing must never affect the page the reader asked for.
  });
})();
