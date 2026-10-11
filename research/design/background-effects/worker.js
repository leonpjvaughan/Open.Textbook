// Same-origin module worker used by the CSP probe in index.js.
// `worker-src 'self'` permits this; a blob: worker is a different question.
self.onmessage = (event) => {
  self.postMessage({ ok: true, got: event.data });
};
