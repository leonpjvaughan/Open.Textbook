# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

- [ ] 1. Theme menu — reader settings in the header
- [x] 2. Custom domain — `open-textbook.org` does not resolve
- [ ] 3. `www` no longer resolves at all (NXDOMAIN) — fix the redirect
- [ ] 4. Zone security settings and response headers

---

## 1. Theme menu — reader settings in the header

**Request.** The theme (starting with `Editorial`) should be selectable from a
menu in the top right of the header. Research the best place for settings. Prefer
a settings menu that **overlays the page**, so changing a preference never
changes the page or the subpath.

### What exists today

| Surface | Theme menu? | Notes |
|---|---|---|
| Landing page (`engine/textbook/templates/portal.html`) | yes | a `<select id="theme-menu">` in the masthead, plus a dark-mode button. Writes the shared keys `textbooks:theme` / `textbooks:scheme`. |
| Books, MkDocs (what is deployed) | **no** | `engine/textbook/hooks/prefs.py` applies both keys before first paint. Material's own palette toggle changes light/dark. There is no control for the bundle. |
| Books, custom pipeline (`engine/textbook/templates/page.html`) | **no** | applies the theme before paint, no control either. |

So a reader can only change the bundle on the landing page. Reading a book, the
control is missing. That is the gap.

### UX research — placement (preliminary; confirm against the primary sources)

1. **Top-right is the conventional home for a global action.** Material's top app
   bar anatomy is left = navigation icon + title, right = action items
   (`m3.material.io`, top app bars). Settings is global and page-independent, so
   it belongs with the actions, not in the navigation.
2. **One action, not a menu of actions.** Material's app-bar guidance: "App bars
   should only have one action, two if necessary... Avoid placing an overflow menu
   in the app bar when possible" (`m3.material.io`, app bars > usage). A single
   settings control (gear) that opens one panel fits; a dropdown of menu items
   does not.
3. **Settings are not a destination.** Because the choice is origin-wide
   (`textbooks:theme` in `prefs.py`), it must not live behind a page or a subpath.
   An overlay keeps the reader exactly where they were and can be opened from any
   page, in any book, and from the landing page.
4. **A dialog has accessibility obligations** (WCAG 2.2): `role="dialog"` /
   `aria-modal`, a labelled title, focus moves into the panel on open and returns
   to the trigger on close, `Escape` closes it, and the page behind is inert.
5. **Fold the scheme in.** If a settings panel exists, light/dark is a setting
   too. Decide whether Material's palette toggle stays in the header or moves into
   the panel (see open questions).

**Sources to consult before building:** `m3.material.io` (app bars guidelines;
dialogs; navigation drawer vs modal), the GOV.UK Design System (progressive
disclosure, dialog patterns), and WCAG 2.2 for dialog focus management.

### Intended approach

- One settings control at the top right of the header on **every** page: the
  landing page and every book page, one implementation.
- It opens an **overlay** (a native `<dialog>` or Material's existing
  `data-md-component="dialog"`). No URL change, no navigation, no new path.
- Contents: theme bundle picker with each bundle's one-line description, the
  colour scheme (system / light / dark), and — if we add it — text size.
- One shared runtime, so the two build paths do not drift:
  `assets/settings/settings.js` plus a stylesheet in `assets/stylesheets/`,
  symlinked into each book by the scaffold. It reuses `window.textbookPrefs`
  exposed by `engine/textbook/hooks/prefs.py` and writes the same keys.
- MkDocs has **no `custom_dir` today**. Add `theme.custom_dir:
  renderers/mkdocs/overrides` in `renderers/mkdocs/base.yml`, then a
  `partials/actions.html` (or `header.html`) override for the trigger and the
  panel. The custom pipeline needs the same markup in
  `engine/textbook/templates/page.html`.
- Mark the menu chrome `data-pagefind-ignore` so it never enters the search
  index.

### Done means

- [ ] A labelled, keyboard-reachable Settings control sits at the top right of
      every book page and the landing page.
- [ ] Opening it **does not change the URL** (no new path, no hash, no query).
- [ ] Choosing a bundle updates the page immediately and persists to
      `textbooks:theme`; a new page or tab keeps it.
- [ ] The panel works in both schemes with **no colour in the markup**: tokens and
      `fig-*` / `text-*` classes only. `tests/test_themes.py` stays green.
- [ ] With JavaScript off, the site is unchanged and fully readable (the menu is an
      enhancement, not a dependency).
- [ ] The dialog meets the accessibility points above (focus in, focus return,
      Escape, inert background).

### Open questions

- Does the header keep Material's palette toggle, or does light/dark move into the
  panel? Two controls for one idea is worse than one.
- Does the landing page keep its inline `<select>`, or gain the same settings
  control so there is one pattern everywhere?
- Should the panel also offer text size / line spacing? This book is written for
  mixed attainment and many EAL readers, so a reading-comfort control has a case.

---

## 2. Custom domain — `open-textbook.org` does not resolve — **done**

**Resolved 2026-10-11.** Both custom domains (apex + `www`, Production, zone
`open-textbook.org`) are attached to the Worker and serving. Verified through the
authoritative nameservers and directly against the Cloudflare proxy:

- `open-textbook.org` and `www.open-textbook.org` → A `104.21.67.29` /
  `172.67.211.150` (1.1.1.1 and 8.8.8.8 agree).
- `https://open-textbook.org/` → `200`, valid TLS.
- Canonical link reads `https://open-textbook.org/gcse-maths/higher/`.
- A missing path → `404` (the 404 page, not a connection error).

One local note: this workstation still fails to resolve the name, because its
resolver is holding an earlier negative answer. That is local, not the site —
`sudo resolvectl flush-caches` (or `sudo systemctl restart systemd-resolved`)
clears it. The original diagnosis follows.

**Symptom.** The site is only reachable at
`https://open-textbook.leonpjvaughan.workers.dev/`. `https://open-textbook.org/`
does not connect.

**Evidence (checked 2026-10-11).**

- The account has **no Worker custom domains**:
  `GET /accounts/{id}/workers/domains` returns `[]`.
- The zone `open-textbook.org` exists and is **active**, delegated to
  `benedict.ns.cloudflare.com` / `keira.ns.cloudflare.com`.
- Querying those authoritative nameservers directly:
  - `open-textbook.org` **A** → NODATA (the zone exists, the apex has no record).
  - `www.open-textbook.org` **A** → NXDOMAIN (no such name).
- `wrangler.jsonc` has no `routes`, so nothing in code attaches the domain.
- The `*.workers.dev` address works because the account subdomain
  (`leonpjvaughan`) is enabled, which is the default.

**Root cause.** The custom domain was never attached. `DEPLOY.md` step 4
("The domain") is a manual dashboard step and has not been done. Nothing is
broken in the build: `base_url` in `collection.yaml` is already
`https://open-textbook.org/`, so canonical links and the sitemap already point at
the right origin. The only missing piece is the binding from the domain to the
Worker.

**Fix (dashboard).** Workers & Pages → the `open-textbook` Worker → Settings →
Domains & Routes → Add → Custom domain → `open-textbook.org`. Add `www` too,
redirecting to the apex. DNS is already on Cloudflare, so the records are created
automatically. This is deliberately done in the dashboard rather than by the API
token, which is account-scoped with **no zone permissions** (`DEPLOY.md`,
"One-time setup"). Note that `GET /user/tokens/verify` reports "Invalid API Token"
for this token: that endpoint is for user-owned tokens only, and the token works
fine on account endpoints, so this is expected, not a second fault.

**Alternative (in code).** Add a custom-domain route to `wrangler.jsonc` and grant
the deploy token `Workers Custom Domains: Edit`. Confirm the minimum permission
first; if it also needs zone DNS edit, that widens the token and contradicts the
reason step 4 is manual. Decide before changing `DEPLOY.md`.

**Done means.**

- [x] `https://open-textbook.org/` returns `200`.
- [x] The canonical link reads `https://open-textbook.org/...`.
- [ ] `https://www.open-textbook.org/` redirects to the apex — **not yet, see item 3.**
- [x] A missing path returns the 404 page, not a connection error.
- [ ] `DEPLOY.md` still describes the domain step accurately, whatever route we
      choose.

---

## 3. `www` no longer resolves at all (NXDOMAIN) — fix the redirect

**Symptom (checked 2026-10-11, after the `www` custom domain was replaced by a
`*.open-textbook.org/*` route).** `www.open-textbook.org` is **NXDOMAIN** from
the authoritative nameservers and from 1.1.1.1 and 8.8.8.8. Anyone typing `www`
gets a browser DNS error. This is worse than before, when `www` at least served
the content.

**Why.** A Worker **route** only fires for a hostname that already has a
**proxied DNS record**. The `www` custom domain was removed, which removed its
DNS record, and the `*.open-textbook.org/*` route was then removed too. So `www`
has no DNS record, resolves nowhere, and no rule or route can fire for it.
(Tests: `test123.open-textbook.org` and `anything.open-textbook.org` are NXDOMAIN
too, so there is no wildcard DNS record either.)

**The redirect is not DNS and not a Worker setting.** A DNS record cannot return
an HTTP `301`; the mechanism is a **zone Redirect Rule**. But the rule needs a
DNS prerequisite: Cloudflare only sees a request for a hostname that resolves to
its edge. So there are two steps, neither of them a Worker setting.

**Fix (dashboard, no code).**

1. **DNS → Records:** add a **proxied** record for `www` — `AAAA` to `100::` (the
   conventional dummy), proxy on. The address is never contacted; the rule
   answers first.
2. **Rules → Redirect Rules:** when the hostname is `www.open-textbook.org`,
   redirect to `https://open-textbook.org$1`, `301`, preserve the query string.
3. Leave `www` out of the Worker entirely: no custom domain, no route. (The apex
   custom domain is correct and stays.)

The inert `*.open-textbook.org/*` route has already been removed. A CNAME to the
apex is **not** a substitute: it resolves and *serves* the book (`200`), which is
duplicate content, not a redirect. Bulk Redirects, a Page Rule (legacy), or a
small Worker script all do the same job; a Redirect Rule is the smallest.

If `www` should not exist at all, say so and close this item — NXDOMAIN is a
valid choice, just less friendly. Record the decision in `DEPLOY.md` either way.

**Done means.**

- [ ] `www.open-textbook.org` resolves (rcode 0) from 1.1.1.1 and 8.8.8.8.
- [ ] `curl -sI https://www.open-textbook.org/` returns `301` with
      `location: https://open-textbook.org/`.
- [ ] `curl -sI https://www.open-textbook.org/gcse-maths/higher/` keeps the path.
- [ ] `DEPLOY.md` records whether `www` redirects or is deliberately absent.

---

## 4. Zone security settings and response headers

**State (read from the API, 2026-10-11).** The zone is on `ssl: strict`,
`min_tls_version: 1.2`, `always_use_https: on`, `automatic_https_rewrites: on`,
`tls_1_3: on`, `security_level: medium`, `browser_check: on`, HSTS **enabled**
(`max-age=15552000`, `includeSubDomains`, `nosniff`), `waf: off`, **Bot Fight Mode
on**. The site still sends no CSP / `Referrer-Policy` / `Permissions-Policy`.

**Verified findings.** `http://open-textbook.org/` now returns `301` to HTTPS
(path preserved); HTTPS returns `200`. Minimum TLS is 1.2. The `workers.dev`
origin is switched off (now `404`). Bot Fight Mode injects Cloudflare's
`challenge-platform` script into every page.

**Bot Fight Mode — recommend OFF.** It adds no DDoS protection (that is always on
and separate), it is zone-wide with **no allowlist on the free plan**, and it
injects a challenge script into every page of a site built to need no runtime JS.
The threat model is empty: no login, no forms, no origin. It can only challenge
real students, on school networks and CGNAT, with no way to exempt them.

### Zone settings (dashboard, one click each)

**Items 1-3 are all on one page: SSL/TLS → Edge Certificates** (not the Overview
page, which holds the encryption mode). Direct link:
`https://dash.cloudflare.com/?to=/:account/open-textbook.org/ssl-tls/edge-certificates`.
The dashboard quick search jumps straight there by label.

- [x] **Always Use HTTPS → ON.** Done — `always_use_https: "on"`; `http://…`
      returns `301` to HTTPS, path preserved. Stop serving the book over plaintext.
- [x] **Minimum TLS version → 1.2.** Done — `min_tls_version: "1.2"`.
- [x] **HSTS → ON.** Done — enabled at `max-age=15552000`, `includeSubDomains` on,
      `preload` off, `nosniff` on. Live header:
      `strict-transport-security: max-age=15552000; includeSubDomains`. Raise the
      max-age and consider preload once HTTPS is confirmed on every hostname.
- [x] **SSL/TLS mode → Full (strict).** Done — live value `ssl: "strict"`. Moot
      for a Workers-only site (there is no origin), but correct if one is added.
- [ ] **DNSSEC — half-configured; do not tick yet.** The zone is **signed** (its
      nameservers return `DNSKEY`, 2 answers) but there is **no `DS` in the parent
      `.org` zone**, so the chain of trust is broken and resolvers fall back to an
      *insecure delegation* — no protection, no breakage. Compare
      `leonpjvaughan.com`, which has both `DNSKEY` and a `DS`. Fix: if
      `open-textbook.org` is not a Cloudflare Registrar domain, add the `DS`
      (shown on Cloudflare's DNSSEC page) at the registrar; if it is, wait for
      propagation. Done means `DS@parent` returns an answer, not `0 answers`.
- [ ] **CAA → restrict issuance** to the CAs Cloudflare actually uses for
      Universal SSL. Check which before writing the record and re-check at the
      next renewal: a CAA that omits the real issuer breaks renewal, which is
      worse than a permissive one.
- [ ] **Email records, since the domain sends none.** `TXT` `v=spf1 -all` and
      `_dmarc` `TXT` `v=DMARC1; p=reject; rua=mailto:…`. A textbook has no reason
      to send mail, so this closes domain spoofing cheaply.
- [x] **Disable the `workers.dev` route.** Done — the Worker is now `404` at
      `open-textbook.leonpjvaughan.workers.dev`, so there is one canonical origin.

Keep `security_level: medium`, `browser_check: on`, `tls_1_3: on`,
`automatic_https_rewrites: on`. Leave `rocket_loader` off — it injects JavaScript.
**Check Development Mode is off too**: it disables the edge cache and is easy to
leave on.
- [ ] **Turn Bot Fight Mode OFF.** Currently **on**; it injects a challenge
      script into every page and has no free-plan allowlist. It adds no DDoS
      protection (that is always on and separate). No login, no forms, no origin —
      the threat model is empty.

Skip Turnstile: there are no forms and no user input. WAF managed rules are
optional here.

### Response headers — **implemented**

`engine/textbook/headers.py` emits `site/_headers`, called from
`python -m textbook.portal`. It declares **no** `Cache-Control` (Workers' default
is what keeps a deploy immediate; a second rule would be joined with a comma and
corrupt it) and **no** HSTS (Cloudflare's SSL/TLS toggle already sends it).
`tests/test_deploy.py` holds the file's shape and its policy, so drift fails
`scripts/check.sh`.

Emitted content:

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; worker-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
```

Three directives were added to the first draft after checking what the site
actually loads: `worker-src 'self'` (Material's search runs in a same-origin
worker, so a `blob:` worker never appears), `manifest-src 'self'` (the PWA
manifest), and `X-Frame-Options` beside `frame-ancestors` for older browsers.

Other notes:

- `script-src` and `style-src` need `'unsafe-inline'`: the `prefs` hook, the
  landing page and Material all use inline scripts and styles. There is no server
  and no user input, so the XSS surface is small; a nonce/hash CSP is a later
  hardening step, not a blocker.
- `frame-ancestors 'none'` is the clickjacking fix.
- `_headers` is **emitted by the build**, like every other generated file — never
  hand-written into `site/`. A zone Transform Rule (Modify Response Header) is the
  no-code alternative, but then the header set lives in the dashboard, not the
  repository.

**Done means.**

- [x] `python -m textbook.portal` writes `site/_headers`.
- [x] `tests/test_deploy.py` holds the shape, the policy and the two exclusions
      (`Cache-Control`, HSTS), so a regression fails `scripts/check.sh`.
- [x] The CSP is served on every response and the site still works with it: driven
      in Chromium with the real header attached — landing page, a book page, a
      Walkthrough with a figure and the 404 — with **no** `securitypolicyviolation`
      and Material's search still returning results.
- [ ] Deployed: `curl -sI https://open-textbook.org/` shows the header set once a
      build with this change is live.

---

## 5. Worker version URLs are public, and rollback is untested

**Why item 4's checkbox is worth doing rather than a preference.** Cloudflare's
own documentation, on Version URLs (formerly preview URLs): *"If Version URLs are
enabled, the URL is public and available after version creation."* Every version
uploaded before promotion is therefore a publicly reachable copy of the site —
unlisted, not private. Item 4 closes the `workers.dev` origin and puts Access in
front of previews; `"workers_dev": false` and `"preview_urls": false` in
`wrangler.jsonc` are the code-side equivalents if the dashboard route is
preferred the other way.

**Rollback is a plan, not a capability.** `wrangler rollback` exists and versions
are retained, but nobody has run it. Exercise it once — a drill counts — and put
the exact command in `DEPLOY.md`. The recovery path is the worst thing to discover
during an incident.

**Done means.**

- [ ] `curl -sI https://open-textbook.leonpjvaughan.workers.dev/` no longer
      returns `200`.
- [ ] Version URLs are either disabled or restricted, and `DEPLOY.md` says which.
- [ ] One rollback has been performed and the command is recorded.

---

## 6. Crawlability: our own `robots.txt` and a sitemap index

**What is wrong.**

- `/robots.txt` returns `200`, but it is **not ours**: it is Cloudflare's injected
  content-signals preamble. It contains no `Sitemap:` line, and it is a policy
  about AI crawlers and content signals that we have never actually chosen.
- `/sitemap.xml` returns `404`. The per-book sitemaps exist and are fine —
  `/gcse-maths/higher/sitemap.xml` and `/gcse-maths/foundation/sitemap.xml` both
  return `200` — but **nothing links to them**, so a crawler will not find them.

**Fix.** Emit a root `robots.txt` and a `sitemap.xml` index from
`textbook.portal`, which already owns the deployment root: the index lists the
per-book sitemaps and the robots file points at the index. Then read Cloudflare's
content-signals defaults and either keep them deliberately or replace them,
rather than inheriting a policy by omission.

**Done means.**

- [ ] `/robots.txt` is ours, and includes a `Sitemap:` line.
- [ ] `/sitemap.xml` resolves and lists both book sitemaps.
- [ ] The content-signal policy is a decision we recorded, not a default inherited
      by omission.

---

## 7. Account, credential and dependency hygiene

Adjacent to the Worker rather than part of it, but these are the things that make
the rest recoverable, so they belong in the same gate.

- [ ] **Two-factor authentication on the Cloudflare account and on GitHub.** Both
      own the deployment path; this is the highest-value item in the file.
- [ ] **The domain cannot lapse or move**: registrar auto-renew confirmed, and the
      transfer lock on. The address is the product.
- [ ] **The deploy token**: set an expiry and a rotation date. It is account-scoped
      with `Workers Scripts: Edit`, and `wrangler whoami` does **not** list
      permissions for an account token (it prints "To see token permissions visit
      …"), so record in `DEPLOY.md` what it may do and when to rotate it.
- [ ] **Secret scanning and push protection on GitHub.** Not available on a
      private repository on the Free plan — the same plan decision as branch
      protection (`scripts/protect-main.sh`). Given how nearly `.env` was
      committed, this one has a proven failure mode behind it.
- [ ] **Dependency updates**: Dependabot for `npm` and `uv`, so the pinned
      toolchain does not silently age out of support.
- [ ] **Recovery**: confirm the repository is not the only copy of anything that
      cannot be regenerated. `site/` is regenerable and drift-checked, so the
      answer should be yes — verify rather than assume.

---



## 8. One site, two renderers — decide which is the site

**This is the largest structural item in the file.** There are two ways to build a
book, and only one of them is deployed.

| | `renderers/mkdocs/` + MkDocs | `engine/textbook/pipeline.py` |
|---|---|---|
| Status | **what `main` deploys** | builds 457 pages in 11.6s, deploys nothing |
| Templates | Material's, plus `overrides/` (which does not exist yet) | `engine/textbook/templates/page.html` |
| Navigation | generated nav lists in `renderers/mkdocs/<book>.<profile>.yml` | built in code |
| Link checking | MkDocs `--strict` | `check_links()` |
| Search | Material's index | Pagefind |
| Front matter | Material reads it | `textbook/frontmatter.py` |

Everything the pipeline does, MkDocs also does, differently. So each change to
the shell has two answers, and only one of them is tested by the deploy — the
pipeline is covered by `tests/test_pipeline.py` but nothing reaches a reader.

**Also unresolved:** MkDocs 2.0 removes the plugin system and rewrites theming, and
Material 9.7.7 carries a notice that it is unlicensed for production. That was on
record before the pipeline existed; the pipeline may be its answer, which makes
this decision more urgent rather than less.

**Decide:** the pipeline replaces MkDocs, or MkDocs stays and the pipeline goes.
Not both, and not for long — the cost is paid on every change to the page shell.

**Done means.**

- [ ] One renderer is the site, and the other is deleted or explicitly parked with
      a reason and an owner.
- [ ] `DEPLOY.md`, `AGENTS.md` and `SHAPE.md` describe that renderer only.
- [ ] CI builds the site with it.

---

## 9. Nothing says which commit is live

**Verified.** Neither `site/index.html` nor `site/version.json` carries a build
identity. Asked "what is deployed right now?", the only honest answers are "the
last push to `main` that deployed" and "check the Cloudflare dashboard" — which
does not name a commit either.

**Why it matters.** A release named `26.284.3` and a deployed site are two facts
with no link between them. Diagnosing a reported error means guessing whether the
reader is seeing the fix.

**Fix.** Emit the release tag and commit SHA into the deployed output from the
engine — a `version.json` at the site root, and a `<meta name="build" content="…">`
for the browser — and print it in the footer or the 404 page. Then a screenshot or
a reader's report identifies a build. `$GITHUB_SHA` and the tag are already known
to the release job.

**Done means.**

- [ ] `curl https://open-textbook.org/version.json` names the tag and the commit.
- [ ] The deployed commit can be compared with `main` in one command.

---

## 10. Accessibility: turn the claims into checks

Colour contrast is tested (`tests/test_themes.py`, every bundle × book × scheme).
Almost nothing else is.

- **Six of the 28 figure modules set no accessible name.** 22 carry
  `role="img"` with an `aria-label`; the rest are announced as nothing.
  `assets/figures/figures.js` does not add a role or name to the host element
  either, so the default is silence.
- **Nothing tests the no-JavaScript claim.** `AGENTS.md` and SHAPE.md both assert
  the site is readable without scripting — maths is build-time MathML, so that is
  probably true — but it is an assertion. The only related test checks that the
  landing toggle is hidden.
- **No keyboard or focus audit.** The theme menu in item 1 will be the first
  interactive chrome; the booklet, the figures and the search all need checking
  for focus order, focus visibility and Escape behaviour.
- **Maths read aloud is unresolved.** KaTeX emits MathML, which screen readers
  support unevenly and without a speech rule engine.
- **The figure palette is not contrast-checked.** `fig-warn`, `fig-good` and
  `fig-grid` are outside the invariant in `tests/test_themes.py`.

**Done means.**

- [ ] Every figure has an accessible name, and a test fails if a new one does not.
- [ ] A test renders a page with scripting disabled and asserts the prose and the
      maths are present.
- [ ] Keyboard-only pass over a book page, the booklet, a figure and search.
- [ ] A recorded position on how maths is read aloud.
- [ ] Figure tokens are inside the contrast invariant.

---

## 11. Licence, colophon and a way to report an error

**Verified.** There is no `LICENSE`, no licence statement anywhere, no colophon
page and no contact route. `books/gcse-maths/docs/` has no about page.

**Why it matters.** This is a public, free textbook that reproduces material with
provenance — the DfE subject content is Crown copyright under the Open Government
Licence, the specification quotes are the boards', and the formula sheets are
theirs. `sources.yaml` records where each claim came from, which is most of the
attribution work, but nothing tells a reader or a reuser what they may do with the
result. A teacher asking "may I print this and hand it out?" has no answer.

**Fix.** One reader-facing page: what this is, who made it, what licence it is
under, that answers are machine-checked, how to report a mistake, and the
attribution the sources require. Then a `LICENSE` file, and a link in the footer.

**Done means.**

- [ ] A licence is chosen, recorded in `LICENSE`, and stated on a reader-facing
      page that also carries the required attribution.
- [ ] A reader can report an error without a GitHub account, or the lack of one is
      a recorded decision.

---

## 12. Installable and printable

**Verified.** There is no `manifest.webmanifest` and no `<link rel="manifest">`, so
the progressive web app described in SHAPE.md's "Deployment and platform targets"
does not exist yet. There is no `@media print` rule in any stylesheet, so printing
a page gives browser defaults.

**Why it matters.** A student on a phone in a classroom with poor signal is the
reader this describes, and a teacher will print pages whatever we do about it.
Both are cheap compared with writing the book.

**Fix.** A manifest and a service worker, emitted by the engine like the booklet
widget — no plugin, as SHAPE.md argues. The service worker's scope is the whole
site for free, because `site/` is ours. Then a print stylesheet: drop the chrome,
keep the measure, avoid breaking a worked example across a page.

While there, measure and record a performance budget for one page — weight,
render-blocking requests, layout shift from the preference script — so it can be
watched rather than felt.

**Done means.**

- [ ] A book can be added to a phone's home screen and opened offline.
- [ ] `curl -sI` shows the manifest, and the service worker's caching is
      deliberate rather than incidental.
- [ ] Printing a Walkthrough gives a readable page without the sidebar.
- [ ] A page's weight and request count are recorded in `DEPLOY.md`.

## 13. Declare the ready state

**Not a change: the gate.** The site is in a ready state when items 2–12 are closed
and their "done means" boxes are ticked, and not before — a checklist that is
mostly ticked is a checklist that has not been done.

**Done means.**

- [ ] Every box in items 2–12 is ticked, or the item is explicitly
      deferred here with a reason.
- [ ] `curl -sI https://open-textbook.org/` returns `301`/`200` as appropriate
      with `strict-transport-security` present, and the `www` and `workers.dev`
      origins both redirect or refuse.
- [ ] A release exists for the commit that is live, and `main` is what is
      deployed.
- [ ] Item 1 (the reader settings menu) is done or explicitly deferred. It is a
      feature, not a gate — the site can be ready without it.

