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

interface TextbookPrefs {
  schemeKey: string;
  themeKey: string;
  themes: string[];
  defaultTheme: string;
  read: (key: string) => string | null;
  write: (key: string, value: string) => void;
  setTheme: (value: string) => string;
  currentTheme: () => string;
  scheme: () => string;
  setScheme: (value: string) => string;
  reset: () => void;
  styleKey?: string;
  styles?: string[];
  defaultStyle?: string;
  setStyle?: (value: string) => string;
  currentStyle?: () => string;
}

/**
 * The Document Picture-in-Picture API, which `lib.dom` does not declare.
 *
 * Chromium-only, which is why `booklet.js` checks for it and keeps the in-page panel
 * as the baseline. The window it opens is a real `Window`, so its `document` is a
 * document and the panel can be moved into it.
 */
interface DocumentPictureInPicture {
  requestWindow: (options?: { width?: number; height?: number }) => Promise<Window>;
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
  skipWaiting: () => Promise<void>;
  clients: Clients;
}

/**
 * The two service-worker events `assets/sw.js` handles, which `lib.dom` does not declare.
 *
 * The platform dispatches an `ExtendableEvent` for `install` and `activate`, and a
 * `FetchEvent` for `fetch`. Neither type is in `lib.dom`, because that library describes
 * the page rather than the worker — and `self.addEventListener` is typed for the page
 * there, so the event arrives as a plain `Event` and the worker says what it really is.
 * Only the members `sw.js` uses are named, for the same reason as `ServiceWorkerScope`.
 */
interface WorkerEvent extends Event {
  waitUntil: (work: Promise<unknown>) => void;
}

interface WorkerFetchEvent extends WorkerEvent {
  request: Request;
  respondWith: (response: Promise<Response>) => void;
}

interface Window {
  textbookPrefs?: TextbookPrefs;
  documentPictureInPicture?: DocumentPictureInPicture;
}
