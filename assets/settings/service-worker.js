(function () {
  "use strict";

  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker.register("/sw.js").catch(function () {
  });
})();
