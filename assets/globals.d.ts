/* The globals the browser runtime uses, declared where TypeScript cannot see them.
 *
 * These are not types for a `.ts` file: they are the **facts about the platform** the
 * shared widgets rely on that `lib.dom` does not carry. Three of them are new APIs a
 * browser has and the DOM library has not, and one is the store `prefs.py` writes.
 *
 * A JSDoc cast at the point of narrowing is the fix for a `.js` file — see the
 * `document.getElementById` line in `settings.js` — but a cast needs a type to cast
 * *to*, and there is no `DocumentPictureInPicture` in `lib.dom` to name. So the
 * declarations live here, once for every book, and the widgets stay plain JavaScript.
 *
 * `tsconfig.json` includes `assets/**\/*.d.ts` so that this file is in the program.
 * Nothing here ships: only the files `scaffold.SHARED_FILES` names are copied into a
 * book's tree, and this is not one of them.
 */

/**
 * The store `engine/src/textbook/hooks/prefs.py` exposes on `window` before paint.
 *
 * Both preferences are the reader's and are origin-wide, so `assets/settings/settings.js`
 * writes them through this and never through a key of its own.
 */
interface TextbookPrefs {
  /** The origin-wide key holding the scheme, `textbooks:scheme`. */
  schemeKey: string;
  /** The origin-wide key holding the bundle id, `textbooks:theme`. */
  themeKey: string;
  /** Every bundle id `themes/` declares, in the menu order `collection.yaml` gives. */
  themes: string[];
  /** The bundle applied when nothing is stored, or the stored id is unknown. */
  defaultTheme: string;
  /** Read a key, `null` when storage is unavailable. */
  read: (key: string) => string | null;
  /** Write a key; a storage failure is silent, because the page still works. */
  write: (key: string, value: string) => void;
  /** Set the bundle and return the one actually applied. */
  setTheme: (value: string) => string;
  /** Re-apply the stored bundle, and return it. */
  currentTheme: () => string;
}

/**
 * The Document Picture-in-Picture API, which `lib.dom` does not declare.
 *
 * Chromium-only, which is why `booklet.js` checks for it and keeps the in-page panel
 * as the baseline. The window it opens is a real `Window`, so its `document` is a
 * document and the panel can be moved into it.
 */
interface DocumentPictureInPicture {
  /** Open a picture-in-picture window, sized in CSS pixels. */
  requestWindow: (options?: { width?: number; height?: number }) => Promise<Window>;
  /** The window this API has open, if any. */
  window: Window | null;
}

/**
 * The two members of the service worker's global scope that `assets/sw.js` uses, which
 * `lib.dom` does not declare.
 *
 * `sw.js` is installed as a worker, so `self` there is a `ServiceWorkerGlobalScope`
 * rather than a `Window` — it has `skipWaiting()` and `clients`, and none of the page's
 * DOM. The worker says so with a cast at the two places it uses them, rather than every
 * page pretending to have them. The scope is named for what is used, not for the whole
 * interface, because a full `ServiceWorkerGlobalScope` does not overlap `Window` and the
 * cast would be rejected.
 */
interface ServiceWorkerScope {
  /** Take over from the old worker now, rather than when every tab closes. */
  skipWaiting: () => Promise<void>;
  /** The clients this worker is able to control, for `claim()`. */
  clients: Clients;
}

interface Window {
  /** Set by `prefs.py` before first paint; absent only if its script failed. */
  textbookPrefs?: TextbookPrefs;
  /** Document Picture-in-Picture, in the browsers that have it. */
  documentPictureInPicture?: DocumentPictureInPicture;
}
