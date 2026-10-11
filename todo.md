# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

- [x] 1. Theme menu — reader settings in the header (book pages and the landing page, one runtime)
- [x] 2. Custom domain — `open-textbook.org` resolves
- [x] 3. `www` redirect — DNS imported, rule live, 301 with path and query preserved
- [ ] 4. Zone security and response headers (zone, headers and DNS shipped; DNSSEC, CAA and Bot Fight Mode left)
- [x] 5. Worker version URLs closed; rollback is a manual workflow, command recorded
- [x] 6. Crawlability: our own `robots.txt` and a sitemap index
- [ ] 7. Account, credential and dependency hygiene (2FA, Dependabot and recovery done; registrar, token rotation and secret scanning left)
- [x] 8. One site, two renderers — decided: the bespoke pipeline replaces MkDocs
- [x] 9. Nothing says which commit is live
- [x] 10. Accessibility: turn the claims into checks
- [x] 11. Licence, colophon and a way to report an error
- [x] 12. Installable and printable
- [ ] 13. Improve the maths book content — audits done and partly gated; the fixes are the programme
- [x] 14. Two figure modules break the figure contract
- [x] 15. `extra.css` and `portal.css` declare literal colours
- [x] 16. Material keyboard gaps found by the audit
- [x] 17. Text drawn on the accent is not AA
- [ ] 18. Theme bundles — six original light/dark groups; the third-party palettes replaced (see DECISIONS.md)
- [x] 19. The pipeline's 404 page declares literal colours
- [x] 20. The pipeline ships no Formulae booklet and no `book-local.css`
- [ ] 21. Recheck and verify — what the theme work could not settle
- [ ] 22. Follow-ups from the MkDocs deletion
- [x] 23. Stale theme references in the out-of-scope preview files
- [ ] 24. Animated backgrounds on the vivid themes
- [ ] 25. Declare the ready state

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
      every book page and the landing page. **Book pages done; the landing page
      keeps its own `<select>` (see the open questions).**
- [x] Opening it **does not change the URL** (no new path, no hash, no query).
- [x] Choosing a bundle updates the page immediately and persists to
      `textbooks:theme`; a new page or tab keeps it.
- [x] The panel works in both schemes with **no colour in the markup**: tokens and
      `fig-*` / `text-*` classes only. `tests/test_themes.py` stays green.
- [x] With JavaScript off, the site is unchanged and fully readable (the menu is an
      enhancement, not a dependency).
- [x] The dialog meets the accessibility points above (focus in, focus return,
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
- [x] `DEPLOY.md` describes the domain step accurately, whatever route we choose —
      the `www` redirect is now written up under "DNS: the `www` redirect".

---

## 3. `www` no longer resolves at all (NXDOMAIN) — **done**

**Progress (2026-10-11).** The DNS half is written and importable:
`deploy/dns/open-textbook.org.zone` carries the `www` record with
`cf_tags=cf-proxied:true` (an import cannot be trusted to keep the orange cloud,
and a redirect rule cannot fire for a hostname Cloudflare does not proxy), plus
SPF and DMARC. `DEPLOY.md` → "DNS: the `www` redirect" has the two dashboard
steps. What remains is the import itself and the redirect rule — both dashboard
actions. `tests/test_deploy.py` holds the file's two invariants: `www` is proxied,
and no apex address record is imported.

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
- [ ] **CAA → restrict issuance.** Written but deliberately **commented out** in
      `deploy/dns/open-textbook.org.zone`: the three CAs Cloudflare documents for
      custom domains are listed there, and the block stays off until they are
      checked against the issuer of the live certificate. A CAA that omits the
      real issuer breaks renewal weeks later, which is worse than a permissive
      one.
- [ ] **Email records, since the domain sends none.** Written in the same file:
      `TXT "v=spf1 -all"` and `_dmarc TXT "v=DMARC1; p=reject"` — no `rua`, since
      nobody is reading reports. Pending the import.
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

- [x] `curl -sI https://open-textbook.leonpjvaughan.workers.dev/` no longer
      returns `200` — it is `404`.
- [x] Version URLs are disabled in `wrangler.jsonc` (`"preview_urls": false`
      alongside `"workers_dev": false`) and `DEPLOY.md` says which and why. Held
      by `tests/test_deploy.py`, because a deploy would otherwise reopen in config
      what the dashboard closed.
- [ ] One rollback has been performed. The capability is now a manual workflow
      (`.github/workflows/rollback.yml`, `workflow_dispatch`, confirm input) and the
      command is in `DEPLOY.md` under "Rolling back", so this is a dispatch away.
      It is deliberately not rehearsed against the live site.

---

## 6. Crawlability: our own `robots.txt` and a sitemap index — **done**

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

- [x] `/robots.txt` is ours, and includes a `Sitemap:` line — `portal.robots_txt()`,
      held by `tests/test_deploy.py`.
- [x] `/sitemap.xml` resolves and lists both book sitemaps —
      `portal.sitemap_index()`, one entry per profile, derived from the books.
- [x] The content-signal policy is a decision we recorded, not a default inherited
      by omission: allow everything, and name the sitemap index. Shipping our own
      file is what replaces Cloudflare's injected preamble.

---

## 7. Account, credential and dependency hygiene

Adjacent to the Worker rather than part of it, but these are the things that make
the rest recoverable, so they belong in the same gate.

- [x] **Two-factor authentication on the Cloudflare account and on GitHub.** Both
      own the deployment path; this is the highest-value item in the file. Done —
      the author confirmed 2FA on both.
- [x] **The domain cannot lapse or move**: registrar auto-renew confirmed by the
      author (Cloudflare Registrar). The transfer lock is the remaining half.
- [ ] **The deploy token**: set an expiry and a rotation date. It is account-scoped
      with `Workers Scripts: Edit`, and `wrangler whoami` does **not** list
      permissions for an account token (it prints "To see token permissions visit
      …"), so record in `DEPLOY.md` what it may do and when to rotate it.
- [ ] **Secret scanning and push protection on GitHub.** Not available on a
      private repository on the Free plan — the same plan decision as branch
      protection (`scripts/protect-main.sh`). Given how nearly `.env` was
      committed, this one has a proven failure mode behind it.
- [x] **Dependency updates**: `.github/dependabot.yml` covers `npm`, `uv` and
      `github-actions`, weekly and grouped, so the pinned toolchain does not
      silently age out of support. If GitHub rejects the `uv` ecosystem it will
      say so in the Dependabot tab; `pip` reads `pyproject.toml` but cannot update
      `uv.lock`.
- [x] **Recovery**: `site/` is regenerable and drift-checked, and the authored
      content — the only thing that cannot be regenerated — lives in git and is
      pushed to GitHub, so the repository is not a single copy. Residual risk: the
      remote is one private GitHub repository, so account loss is the exposure; a
      second remote or a periodic export is the mitigation if that matters.

---



## 8. One site, two renderers — **decided: the pipeline replaces MkDocs**

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

**Decision (2026-10-11) — `engine/textbook/pipeline.py` becomes the site. MkDocs
is retired.**

Signed off by the author. The bespoke renderer is the one we control: no
third-party theming to be rewritten under us when MkDocs 2.0 lands, no plugin
system to lose, no licence notice, and one place to change the shell instead of
two. The cost is the migration below, paid once.

**Migration, in order.** The pipeline already renders the book, builds Pagefind
search, checks links, rewrites source links, and emits a sitemap and a 404 per
profile. What it does not yet have is everything the last day added to the MkDocs
shell:

| Gap | Where |
|---|---|
| The Settings overlay: trigger, dialog, `settings.js`, `settings.css` | `templates/page.html`, `css/shell.css`, `pipeline.copy_assets` |
| The PWA: manifest link and service-worker registration | same |
| `<meta name="build">` on book pages | same |
| Copying `book.css`, `shell.css`, `settings.*`, `sw.js`, the manifest, the icons | `pipeline.copy_assets` |
| The build matrix, CI and the local gate | `plan.py`, `deploy.sh`, `check.sh`, `verify.yml` |
| The figure-hook and tier evaluation (24 assertions) | **done** — `tests/test_render_hooks.py`, replacing `test/run.sh` + `test/configs/` |
| The Formulae booklet widget and `book-local.css` | **done** — item 20 |
| Retiring MkDocs | `renderers/`, `scaffold.py`'s nav-to-YAML, `pyproject.toml` |

MkDocs was deleted once the pipeline had built and served the site in CI, so at
no point did the deploy point at nothing. The deletion landed in del-14: the
pipeline is the only renderer, `renderers/` is gone, and the MkDocs and Material
dependencies are out of `pyproject.toml` and `uv.lock`.

**Done means.**

- [x] The pipeline builds the site for every profile, with the settings overlay,
      the PWA and the build identity on every page.
- [x] The figure-hook and tier evaluation is pytest (`tests/test_render_hooks.py`),
      and `test/run.sh` and its fixtures are deleted.
- [x] CI builds and deploys with the pipeline; `check.sh` does too.
- [x] MkDocs is deleted, and `DEPLOY.md`, `AGENTS.md` and `SHAPE.md` describe the
      pipeline only.

---

## 9. Nothing says which commit is live — **done**

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

- [x] `curl https://open-textbook.org/version.json` names the tag and the commit.
      `portal.build_identity()` writes the commit, the short commit, the tag when
      there is one, and the origin; the landing page and the 404 also carry
      `<meta name="build">`.
- [x] The deployed commit can be compared with `main` in one command. CI wires it:
      the `release` job publishes its tag as an output and the `deploy` job passes
      `BUILD_TAG` and `BUILD_COMMIT`; git is the local fallback. **Book pages do
      not carry the meta yet** — `version.json` is the site-wide answer.

---

## 10. Accessibility: turn the claims into checks

Colour contrast is tested (`tests/test_themes.py`, every bundle × book × scheme).
Almost nothing else is.

- **Six of the 28 figure modules set no accessible name.** 22 carried
  `role="img"` with an `aria-label`; the rest were announced as nothing.
  `assets/figures/figures.js` does not add a role or name to the host element
  either, so the default is silence. **Done:** all 28 now carry a name, and
  `tests/test_figures.py` discovers every module from the filesystem and fails
  when one lacks `role="img"` or a plain-English `aria-label`.
- **Nothing tests the no-JavaScript claim.** `AGENTS.md` and SHAPE.md both assert
  the site is readable without scripting — maths is build-time MathML, so that is
  probably true — but it is an assertion. The only related test checks that the
  landing toggle is hidden. **Done:** `tests/test_no_javascript.py` renders a page
  through the engine, removes every `<script>`, and asserts the prose, the MathML
  and the `application/x-tex` annotation survive; the browser confirms it with
  `javaScriptEnabled: false` (39 `<math>`, 1566 words).
- **No keyboard or focus audit.** The theme menu in item 1 will be the first
  interactive chrome; the booklet, the figures and the search all need checking
  for focus order, focus visibility and Escape behaviour. **Done:** the audit in
  `research/accessibility.md` §2 covers all four. The Settings dialog, the
  search, the booklet and the figure pass; the two Material-level gaps are
  item 16.
- **Maths read aloud is unresolved.** KaTeX emits MathML, which screen readers
  support unevenly and without a speech rule engine. **Done:** the position is
  recorded in `research/accessibility.md` §3 — build-time MathML, no runtime SRE,
  known limitations, not a fix.
- **The figure palette is not contrast-checked.** `fig-warn`, `fig-good` and
  `fig-grid` are outside the invariant in `tests/test_themes.py`. Still open; it
  belongs in `tests/test_themes.py`, which this task does not own.

**Done means.**

- [x] Every figure has an accessible name, and a test fails if a new one does not.
- [x] A test renders a page with scripting disabled and asserts the prose and the
      maths are present (`tests/test_no_javascript.py`).
- [x] Keyboard-only pass over a book page, the booklet, a figure and search
      (`research/accessibility.md` §2).
- [x] A recorded position on how maths is read aloud
      (`research/accessibility.md` §3).
- [x] Figure tokens are inside the contrast invariant (`tests/test_themes.py`),
      along with `accent_ink` on the accent — the two blind spots the audit found.

---

## 11. Licence, colophon and a way to report an error

**Verified before this change.** There was no `LICENSE`, no licence statement
anywhere, no colophon page and no contact route. `books/gcse-maths/docs/` had no
about page. The attribution and reporting parts are now done; the licence is not.

**Why it matters.** This is a public, free textbook that reproduces material with
provenance — the DfE subject content is Crown copyright under the Open Government
Licence, the specification quotes are the boards', and the formula sheets are
theirs. `sources.yaml` records where each claim came from, which is most of the
attribution work, but nothing tells a reader or a reuser what they may do with the
result. A teacher asking "may I print this and hand it out?" has no answer.

**Fix.** One reader-facing page: what this is, who made it, what licence it is
under, that answers are machine-checked, how to report a mistake, and the
attribution the sources require. Then a `LICENSE` file, and a link in the footer.

**State (2026-10-11).** The reader-facing page landed:
`books/gcse-maths/docs/colophon.md`, generated by `scaffold.colophon_page()` and
linked from both profiles' nav as **About this book**. It carries the attribution
(DfE Crown copyright under the Open Government Licence v3.0; the AQA 8300, Pearson
Edexcel 1MA1 and OCR J560 specifications; the boards' formulae sheets and the
Ofqual 2025–2027 decision), states that **Practise** answers are machine-checked
with SymPy, and gives the reporting route. It reads `licence:` from
`collection.yaml` and renders a licence section only when that key is set (a
string, or `{name, url}`), so choosing a licence is a one-line data change rather
than a content edit. No `LICENSE` file was added, deliberately: the licence is the
author's decision and no placeholder was written.

**Reporting route — decision.** `open-textbook.org` sends and receives no mail
(SPF is `v=spf1 -all`), so `mailto:` would be dead. The page uses the GitHub issue
form (`https://github.com/leonpjvaughan/Open.Textbook/issues/new`), and says
plainly that it needs a free GitHub account and that the project has no email
address. A no-account route (a form endpoint or a feedback Worker) is deliberately
not built yet; adding one means updating the page and this note.

**Done means.**

- [x] A licence is chosen, recorded in `LICENSE`, and stated on a reader-facing
      page that also carries the required attribution. **CC BY 4.0** for the book;
      `LICENSE-CODE` (MIT) for the engine, because Creative Commons recommends
      against its licences for software; third-party material keeps its own terms.
      The colophon renders the licence from `collection.yaml → licence`.
- [x] A reader can report an error without a GitHub account, or the lack of one is
      a recorded decision. The lack is recorded above and on the page.

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

- [x] A book can be added to a phone's home screen and opened offline.
      `assets/manifest.webmanifest` and `assets/sw.js` are generated into `site/`
      by `textbook.portal`; driven in Chromium with the network off, the page still
      renders with its maths.
- [x] `curl -sI` shows the manifest, and the service worker's caching is
      deliberate rather than incidental: network-first for navigations (so a deploy
      still takes effect immediately), cache-first for static assets, a versioned
      cache, and the old cache deleted on activation.
- [x] Printing a Walkthrough gives a readable page without the sidebar. A
      `@media print` block in `assets/stylesheets/extra.css` hides the chrome,
      keeps the measure, and keeps a worked example off a page break. Closed
      `<details>` print closed on purpose: paper cannot be clicked. **Verified by
      inspection, not in a rendered print preview.**
- [x] A page's weight and request count are recorded in `DEPLOY.md` — 16 requests,
      ~1.62 MB, and `search_index.json` at ~917 kB is the bulk of it. That last
      number is its own follow-up.

## 13. Improve the maths book content

**This is the product.** Every other item in this file is about shipping it; this
one is about the thing being shipped. `AGENTS.md` states the chapter formula,
`research/pedagogy.md` maps each principle to its evidence, and `.agents/skills/`
now carries the method as five skills: `author-textbook-chapter`,
`write-textbook-prose`, `build-practice-set`, `build-guided-figure` and
`verify-textbook-change`.

**State (checked 2026-10-11).** The book is structurally complete, so this is not
about coverage:

- 25 chapters, 133 sections, with 133 Walkthrough / Guided problems / Problems
  pages and 25 Reviews. No `<!-- scaffold:stub -->` markers remain.
- 138 `:::problems` / `:::answers` marker pairs, 139 verified banks.
- **`textbook.lint` already enforces the structure.** Every chapter has
  `## The chapter problem` and `By the end of this chapter`; every Walkthrough has
  `You should now be able to` and `Watch out`; every Guided problems page has
  `Warm-up: remember`; every Problems page has both markers.
- All 133 Walkthroughs do carry a `> **Watch out.**` misconception callout.

So the gap is exactly the part a linter cannot see — the **pedagogy audit** in
`verify-textbook-change`, which is manual by design.

**What is unchecked, and is the work.**

- **Fade (P1).** Lint proves a hint block exists, not that support *withdraws*:
  worked example → partial example → hint → independent. It also cannot see a
  Walkthrough that opens with an unguided task a novice cannot start.
- **The chapter problem (P2).** Lint proves one is *stated*. It cannot prove it is
  *returned to* at 2–3 checkpoints and *resolved* on the Review page.
- **Relevance (P3).** Whether the chapter asks the reader to construct their own
  connection, or merely asserts the topic is useful.
- **Interleaving (P5).** Whether later Problems pages mix earlier topics and ask
  "which method applies, and why?".
- **Guided figures (P6).** Only **27 `:::figure` uses across 25 chapters** — about
  one per chapter — and nothing checks the Predict → Test → Explain shape.
  **`ch5-map-scale` is wired to no `:::figure` directive at all.**
- **Correctness.** The verifier proves the bank algebra, not the method and not
  the teaching.

**Method.** Work chapter by chapter, with the skills in order:

1. `verify-textbook-change` — run its pedagogy audit over the chapter, unmodified,
   and record the findings. The measurement comes before any edit.
2. `author-textbook-chapter` — revise against the two arcs and the six principles.
3. `write-textbook-prose` for the voice, `build-practice-set` for the practice and
   its bank, `build-guided-figure` where a figure is missing or unguided.
4. Re-run the audit, then `scripts/check.sh`.

**Cheapest first pass:** the audit across all 25 chapters, recorded in one place,
so the fixes are chosen by evidence rather than by mood. Then rebuild the worst
chapter end to end as the reference for the rest.

**Where it lands.** This is a programme, not a single change: it re-runs on the
next book (physics, then A-level). Anything the audit finds more than once should
become a lint rule or a test, so the floor rises and the manual audit shrinks.

**Done means.**

- [x] The pedagogy audit has been run over all 25 chapters, findings recorded in
      one place — `research/pedagogy-audit/`, two reports plus a README that ranks
      the work.
- [ ] Every finding is fixed, or deferred with a reason. **Deferred, ranked in the
      audit README:** Chapters 19, 23, 24, 5 and 15 need rewrites; Chapter 7's
      chapter problem is not solvable as set.
- [ ] The worst chapter has been rebuilt end to end and stands as the reference.
- [ ] Every `:::figure` follows Predict → Test → Explain, and `ch5-map-scale` is
      either wired up or deleted. Five of twelve render above their own Predict
      prompt.
- [x] Anything the audit found more than once is now a lint rule or a test: the
      `DfE coverage` and `Guided problems` leaks are gated by
      `tests/test_content_hygiene.py`, and a chapter that repeats one warm-up
      across its sections is reported as `structure:guided-warmup-repeated`.

---

## 14. Two figure modules break the figure contract

**Verified** while adding the accessible names. Two modules in
`books/gcse-maths/docs/assets/figures/` break rules `AGENTS.md` states plainly,
and no test catches either.

- **Runtime LaTeX.** `ch3-index-laws.js` builds its readout with
  `readout.innerHTML = ... $a=${a}$ ...`. The maths hook runs at build time, so a
  reader sees literal dollar signs rather than rendered mathematics. `AGENTS.md`
  lists this under "Hooks": never put `$...$` in text a figure injects at runtime.
  Fix: write the readout in HTML (`<sup>`, `×`, `÷`) or in words.
- **A hard-coded colour, and it may be invisible.** `ch2-multiples.js` marks the
  multiples with `<span class="fig-accent" style="color:#fff">`. `.fig-accent`
  sets only `fill` and `stroke` (`assets/stylesheets/extra.css:109`), which do
  nothing for text in HTML, so the only highlight is the inline `#fff` — white
  text on the light scheme's paper. The rule is never a colour in a page or a
  figure. Fix: use a text-colour class such as `.text-accent` with a contrasting
  treatment, not an inline colour.

`grep -n 'color:#\|fill="#\|stroke="#' books/gcse-maths/docs/assets/figures/*.js`
finds both, plus an `#888` in the gradient in `ch16-point.js`.

**Done means.**

- [ ] `ch3-index-laws.js` injects no `$...$` at runtime; a reader sees
      mathematics, not dollar signs.
- [ ] No figure module contains an inline colour literal.
- [ ] `tests/test_figures.py` (or lint) fails on a colour literal in a figure, so
      the rule is enforced rather than remembered.
- [ ] Each figure is checked in both schemes.

---

## 15. `extra.css` and `portal.css` declare literal colours

**Found while adding the print rules.** `assets/stylesheets/extra.css` contains
literal colours — `.math-error { color: #b3261e; }`, and `#fff` / `rgb()` values in
the booklet widget styles. `AGENTS.md` says a colour declared in this layer is
exactly the mistake that silently outranks every bundle, and the test meant to
catch it only checks that no `--tb-*` token *name* appears. So `.math-error` is
the same red for a reader on `clean`, `gruvbox` or `editorial`, in both schemes,
and nothing fails.

**Fix.** Move each literal to a bundle token (or a `fig-*` / `text-*` class), then
strengthen `tests/test_themes.py` to fail on a hex, `rgb()`/`hsl()` or named
colour in `extra.css` — not only on a token name. The strengthened test is the
point: the current one passes while the rule is broken.

**Done means.**

- [x] No literal colour in `assets/stylesheets/extra.css`. (Done by del-4; the
      strengthened scanner below holds it.)
- [x] `tests/test_themes.py` fails on a hex, `rgb()`/`hsl()` or named colour in
      `extra.css`.
- [x] The same class of bug in `assets/stylesheets/portal.css` is fixed: its
      `--tb-shadow` used a literal `rgb(0 0 0 / …)`, so the landing-page card's
      elevation was identical under every bundle. It is now `color-mix` over
      `--tb-ink`, and `test_the_portal_stylesheet_defines_no_colour` holds the
      file to the same rule.
- [x] `.math-error` and the booklet widget are checked in every bundle, both
      schemes.

---

## 16. Material keyboard gaps found by the audit

**Verified** by the keyboard audit in `research/accessibility.md` §2. Both are in
Material's generated markup and CSS, so they cannot be fixed in the files the
audit task owns. Both were reproduced on
`/gcse-maths/higher/Chapter 1/Section 1.1/Walkthrough/` at commit `3bc6594`.

- **An invisible Tab stop in the closed search.** `Tab` x4 lands on
  `.md-search__scrollwrap` (`tabindex="0"`), whose parent `.md-search__output`
  has `opacity: 0` while the search is closed. The fix belongs in
  `assets/stylesheets/extra.css`. The candidate rule below was injected in the
  browser and verified to remove the stop and keep the 26 results visible when
  `/` opens the search:

  ```css
  .md-search__output { visibility: hidden; }
  [data-md-toggle="search"]:checked ~ .md-header .md-search__output {
    visibility: visible;
  }
  ```

  A naive `visibility: hidden` without the second selector hides the results;
  that was checked too.
- **Unnamed sidebar expand/collapse toggles.** Material's
  `partials/nav-item.html` (the `navigation.indexes` branch) renders an
  icon-only `<label tabindex="0">` with no text and no `aria-label`; all 133
  toggles on the page measured an empty accessible name (`ariaSnapshot` returned
  `""`). The empty label is also the `aria-labelledby` target of the submenu
  `<nav>`, so this is a WCAG 4.1.2 failure, not only a nicety. The fix is a
  `renderers/mkdocs/overrides/partials/nav-item.html` override that adds
  `aria-label="{{ render_title(nav_item) | striptags }}"` to that label.

**Done means.**

- [x] With the search closed, no `.md-search__scrollwrap` (or other transparent
      child) is reachable by `Tab`; with the search open, results are visible.
      Re-checked in the browser with the repository's `extra.css`: the baseline
      lands on `.md-search__scrollwrap` at the fourth `Tab`, the fix skips it,
      and `/` still returns 26 results
      (`/tmp/pi-delegate/del-8/search-tabcheck.cjs`, JSON beside it).
- [x] Every sidebar expand/collapse toggle has a non-empty accessible name, and a
      check fails if a new one does not. `partials/nav-item.html` is now a
      faithful override carrying the `aria-label` on the icon-only label;
      `tests/test_a11y_shell.py` pins the name and fails if the override drifts
      from the installed Material template.
- [ ] Both fixes pass the audit in `research/accessibility.md` §5. The search fix
      was re-run in the browser; the toggle override needs the next shared build
      before the rendered audit can be re-run, because the check is structural
      until then.

---

## 17. Text drawn on the accent is not AA

**Verified** by del-4 while fixing the literal colours. The booklet bar knocks its
label out in `var(--md-default-bg-color)` (the paper). That passes for the
current book, whose accent the subject tints, but a bundle's *own* accent makes
the paper 4.34:1 (omarchy light) and 4.40:1 (gruvbox light) on it — below AA for
text. No token expressed "text on the accent".

**Fix.** Added an `accent_ink` token to `SCHEME_TOKENS` in
`engine/textbook/book.py`, a value per bundle in both schemes, and used it for
text drawn on the accent: `extra.css` (`.bk-fab`, `.bk-bar`, the pressed chip)
and `portal.css` (the card chip). `engine/textbook/themes.py` now checks
`accent_ink` on the accent at 4.5:1, and `tests/test_themes.py` checks the
bundle's own accent as well, so the palette is safe with no subject tint.

**Done means.**

- [x] Every bundle names an `accent_ink` in both schemes, and it reads on the
      accent at ≥4.5:1.
- [x] Text drawn on the accent uses the token, not the paper.
- [x] The invariant checks `accent_ink` on the accent, and can fail:
      reverting omarchy light's `accent_ink` to its paper fails
      `test_accent_ink_reads_on_the_bundles_own_accent[default-omarchy]` at
      4.34:1.

---

## 18. Theme bundles: make each one a light/dark group

> **Superseded 2026-10-11.** The third-party groups described below were deleted
> and replaced by six original bundles. See `DECISIONS.md`; the sections below are
> kept as the record of how the older set was built and what the preview found.

**Request.** "For the omarchy themes, I meant look up https://omarchy.org/themes/.
Do not call a theme omarchy but use it for inspiration. Look at VS Code and other
sources for theme ideas — mostly for ideas about colour. Use OpenDesign skills to
enhance your knowledge. For now just research and work out how you want to make
existing styles fit our light/dark group requirement."

**The requirement.** Every bundle must be a complete light *and* dark palette;
`tests/test_themes.py` already enforces it. The four bundles were assembled from
sources that do not ship pairs, and one of them is named after the distribution
rather than the palette.

**Research is written up in [`research/design/theme-groups.md`](research/design/theme-groups.md).**
The findings that decide the work:

- **Omarchy is a distribution of palettes, not a palette.** 140 themes on the
gallery page; 22 stock themes on this machine, of which **17 are dark-only and 5
light-only** (`tomllib` over `/usr/share/omarchy/themes/*/colors.toml`). Each
`colors.toml` carries one `mode`. So `id: omarchy` names the wrong thing, and the
gallery can supply at most one member of a pair. The bundle is really
**Catppuccin** (Latte + Mocha).
- **A group is two palettes, not one inverted.** VS Code's paired "Light
Modern"/"Dark Modern" re-picks the accent per mode (`#005FB8` light, `#0078D4`
dark) and makes the dark link lighter than the dark accent (`#4daafc` vs
`#0078D4`); APCA is polarity-sensitive for the same reason; the `color-expert`
references say dark mode wants **less chroma** and **more luminance contrast**.
- **The contrast invariant is one-sided.** `MIN_CONTRAST` applies the same WCAG
ratio in both schemes, which is the symmetry APCA exists to criticise — stricter
than needed in light, weaker than needed in dark.
- **The families worth drawing from are Solarized, Flexoki, Rosé Pine,
Everforest, Catppuccin, Gruvbox and Kanagawa**, all of which publish both
members. Arc Blueberry is dark-only (`mode = "dark"`) and would need a derived
light.

**What landed** (all of the above except the enforcement, which is still to do).

1. `themes/omarchy.yaml` → `themes/catppuccin.yaml`; `id`/`title` Catppuccin, with
   the provenance kept (the hexes *were* read from Omarchy's copy).
2. `themes/gruvbox.yaml`: "a second member of the Omarchy family" is gone; Omarchy
   is a catalogue, not a family.
3. Every bundle now carries `mood: calm|vivid`, `family:`, and a `provenance:`
   block with a `name`, `source` and `observed: true|false` per variation, plus a
   `note` on every derived member. (Landing as `family`/`provenance` rather than a
   nested `group:`, which is flatter to read.)
4. Eight groups: **calm** — Editorial, Clean, Catppuccin, Gruvbox; **vivid** — Arc
   Blueberry, Tokyo Night, Synthwave '84, Kanagawa. `collection.yaml` orders them
   calm first and says so. Solarized and Flexoki were the near misses and are the
   first candidates if a calm group is swapped; three of the four vivid lights are
   **derived**, because that is what those projects publish.
5. `themes.css`, both per-book MkDocs configs and the landing page regenerated in
   the same change.

**Four defects the preview found, all fixed.** The palette tests could not see
any of them, which is the point of running the built page:

1. An accent that fails only with **no subject tint** — catppuccin light 4.34:1,
   gruvbox light 4.40:1. Fixed in the palettes; guarded by the new
   `test_every_bundle_is_readable_with_no_subject_tint`.
2. **`ink_soft` on the landing card** (`color-mix(ink 4%, paper)`) — catppuccin
   light 4.13:1, kanagawa light 4.24:1. Fixed in the palettes; `contrast_problems`
   now measures `ink_soft` against the card, pinned to `portal.css`.
3. **Material's palette CSS beat our link mapping in dark mode**.
   `[data-md-color-scheme=slate][data-md-color-primary=indigo]` is (0,2,0) and our
   `[data-md-color-scheme]` is (0,1,0), so `--md-typeset-a-color` stayed Material's
   indigo `#5488e8` for every bundle — 4.26:1 on gruvbox's dark page, 4.41:1 on
   Synthwave's — and the bundle's `link` token was ignored. Fixed in `extra.css`
   by tying at (0,2,0), which `extra.css` wins on load order.
4. **The header title was white on the accent** (2.54:1 on a light accent, which
   the dark scheme's subject tint is). `--md-primary-bg-color` now maps to
   `accent_ink` — the token item 17 added for text drawn on the accent, which the
   header had never been given.

**The preview harness** is `test/theme-preview.cjs` (documented in `test/README.md`).
It seeds both origin-wide keys, asserts `data-theme` and `data-md-color-scheme`
reached the page, checks the token ratios, and with `--audit` walks **every text
element on the page** against the first ancestor that painted a background.
Current result: 8 themes × 2 schemes × 2 routes, 582 text elements per book page,
zero below WCAG AA.

**Still to do.** `load_bundle` does not yet *require* the provenance fields, so a
`note` can be dropped silently; `omarchy` is not yet asserted absent; and the APCA
check on the dark member is not written.

**Done means.**

- [x] No bundle is named after a distribution; the id names the palette family.
- [x] Every bundle has a `family` and a `name`/`source`/`observed` per variation,
      and every derived member says so in a `note`.
- [x] The palettes are readable with no subject tint, on the card, and with the
      book composed in — the first two are newly checked.
- [x] The built page is clean: links and the header use the bundle's own tokens,
      and the whole-page text audit passes in both schemes for all eight.
- [x] `themes.css` and the landing page are regenerated in the same change. (The
      per-book MkDocs configs no longer exist: the pipeline is the site.)
- [x] `load_bundle` rejects a bundle with no `family`/`provenance`, and rejects a
      derived member with no `note`. It also gained an explicit way to say a
      palette is **original**, because forcing that claim through
      `observed: false` conflates "ours" with "derived from someone else's mode" —
      the distinction the enforcement exists to make.
- [x] A test asserts `omarchy` is not a bundle id.
- [x] The APCA check exists, is documented next to the WCAG thresholds, and its
      threshold was chosen from what it found on the existing palettes rather
      than picked in advance.
- [x] `python -m pytest tests/ -q` and `scripts/check.sh` are green.

---

## 19. The pipeline's 404 page declares literal colours

**Noticed while bringing the bespoke shell to parity (del-11).** `NOT_FOUND` in
`engine/textbook/pipeline.py` inlines a `<style>` with six literal colours:
`#faf9f5`, `#1f1e1b`, `#23577d`, `#171614`, `#e9e7e1` and `#8cc0e8`. It
therefore ignores the reader's bundle entirely — a reader on Catppuccin gets
Editorial's paper on the 404, and one on Clean gets a blue link. This is the
same class of bug item 15 fixed for `extra.css` and `portal.css`.

Evidence:

    grep -nE '#[0-9a-fA-F]{3,8}' engine/textbook/pipeline.py

It is deliberately self-contained: a 404 can be served for a request at any
depth, so its comment argues linked stylesheets have no reliable base. That is
true of a *relative* link, but the collection is served from the origin root, so
a root-absolute `/assets/stylesheets/themes.css` resolves at any depth. The
per-profile copy could link `${prefix}assets/stylesheets/...` instead.

**Fix.** Replace the inline literal-colour `<style>` with the same root-absolute
themes stylesheet `portal.not_found()` loads, or keep it inline and read the
`--tb-*` tokens from a link to `themes.css`. Then assert in
`tests/test_pipeline.py` that `NOT_FOUND` declares no literal colour (strip
comments before scanning), as the new page-shell test does for `shell.css`.

**Done means.**

- [x] `grep -nE '#[0-9a-fA-F]{3,8}' engine/textbook/pipeline.py` finds no colour
      outside a comment. The 404 now reuses `portal.not_found()`.
- [x] The 404 renders in the reader's bundle in both schemes — checked in the
      browser with two bundles. **Partially:** verified from the built page (it
      loads the bundle stylesheet and applies the reader's own keys) and gated by
      the shell scan in `tests/test_themes.py`; a visual two-bundle comparison of
      the 404 itself was not run.
- [x] A test fails if a literal colour returns to the 404 —
      `test_the_pipeline_shell_defines_no_colour`, over `shell.css`, `page.html`,
      `portal.html`, `pipeline.py` and `portal.py`.

---

## 20. The pipeline ships no Formulae booklet and no `book-local.css` — **done**

**Found while porting `test/run.sh` to pytest (del-13).** `engine/textbook/pipeline.py`
is the site — CI and the deploy build with it — but it never loads the two shell
features the MkDocs path does. Both are reader-visible or documented extension
points, so deleting MkDocs would remove the only renderer that has them.

**Evidence (measured 2026-10-11).**

- The MkDocs shell loads both: `renderers/mkdocs/base.yml:52` lists
  `assets/stylesheets/book-local.css` in `extra_css`, and
  `renderers/mkdocs/gcse-maths.higher.yml:677` lists `assets/booklet/booklet.js`
  in `extra_javascript` for a book that declares `booklet:` in `book.yaml`.
- The pipeline has neither: `grep -in booklet engine/textbook/templates/page.html`
  and `grep -in booklet` inside `pipeline.copy_assets` return nothing, and
  `book-local.css` appears in neither `SHARED_CSS` nor the page template.
- The built output follows:

  ```
  $ uv run python -m textbook.pipeline --book gcse-maths --profile higher --out /tmp/out --chapter 1 --no-index
  assets     themes.css, extra.css, portal.css, settings.css, shell.css, book.css,
             settings.js, service-worker.js, manifest.webmanifest, sw.js,
             app-icon.svg, figures.js, 29 figure modules   # no booklet
  $ ls /tmp/out/assets/booklet
  ls: cannot access '/tmp/out/assets/booklet': No such file or directory
  $ grep -rl 'booklet.js' /tmp/out --include='*.html'      # no page references it
  ```

`books/gcse-maths/book.yaml` declares `booklet: booklet/gcse-maths.yaml`, so the
widget is expected for this book; `assets/stylesheets/book-local.css` is empty
for GCSE Mathematics today, but SHAPE.md calls it the per-book component escape
hatch, so a second book would need it and the pipeline would silently drop it.

**Why this blocks deleting MkDocs.** The mission for del-13 says: if deleting
MkDocs would remove a capability the pipeline does not have — anything a reader
would notice — stop and report rather than proceed. A Formulae booklet is such a
capability. MkDocs is therefore left in place until the pipeline reaches parity.
(The ship path already lost the booklet when CI moved to the pipeline in del-12;
this item is the repair, not a fresh regression.)

**Fix.** In `pipeline.copy_assets`, when `book.booklet_name` is set, copy
`assets/booklet/booklet.js` and the generated
`book.docs/assets/booklet/booklet.json`. Add a `$booklet` slot to
`engine/textbook/templates/page.html`, filled by `render_page`/`build` only when
the book has a booklet, and a `book-local.css` copy beside `book.css` linked
after it. Then rewrite
`tests/test_collection.py::test_booklet_widget_is_loaded_only_where_there_is_a_booklet`
to read the built page instead of the generated config.

**Done means.**

- [x] A built profile for a book that declares `booklet:` links
      `assets/booklet/booklet.js` and ships `booklet.json`; a book that declares
      none ships neither.
- [x] A built page links `book-local.css`, and the file is copied into the output.
- [x] A test fails if either link or asset disappears.
- [x] `renderers/` can then be deleted, and item 8 closed.

**Done (del-14).** `pipeline.booklet_widget()` emits the deferred `<script>` only
when `book.booklet_name` is set, and `copy_assets` copies the widget and
`booklet.json` together; `book-local.css` is copied and linked after `book.css`.
Pinned by `test_pipeline.py` (the built page and the shipped assets),
`test_collection.py` (the no-booklet branch), and a real-browser run in which the
button appears, the panel opens, and the formulae render as MathML.

---

## 21. Recheck and verify — what the theme work could not settle

Everything here was measured; none of it is fixed. Each line says what is
unverified and what would close it. Nothing is repeated from item 18, whose
provenance enforcement and APCA check are still open there.

- [x] **The renderer changed mid-verification.** The theme work was verified twice
      — against MkDocs, where the four defects were found, and against the
      pipeline, where the final 9 × 2 × 3 audit ran. The pipeline is the site now,
      so the preview's routes are `chapter-1/section-1.1/learn/`; the MkDocs routes
      (`Chapter%201/Section%201.1/Walkthrough/`) exist only if MkDocs is un-parked.
      The two really are different: `plan --configs` now emits pipeline arguments,
      and feeding those to `mkdocs build -f` exits 2 with `Invalid value for '-f'`,
      which is what the old `check.sh` line did. *Done means:* the preview states
      the layout it expects and fails loudly when routes no longer resolve, so a
      renderer swap cannot leave it passing on 404 pages — it did exactly that
      once, auditing 738 "text elements" of a `not found` body.
      **Done (del-17):** `test/theme-preview.cjs` declares the layouts it knows
      (`pipeline`, `mkdocs`), checks the layout's own witness page and resolves
      every route *before* a browser starts, and exits 2 naming the layout it
      expected when one does not. The route handler no longer serves a `not found`
      body: a miss during the run is recorded and fails it. Both directions were
      shown failing — the MkDocs routes against the pipeline site, and
      `--layout mkdocs` against it.
- [x] **`extra.css` declares six `--md-*` variables nothing reads.** Measured: of
      the 13 it declares, only `--md-default-{bg,fg}-color`, `--md-default-fg-color--light`,
      `--lighter`, `--lightest` and `--md-primary-fg-color` / `--dark` are consumed
      by its own components. `--md-accent-fg-color`, `--md-code-bg-color`,
      `--md-primary-bg-color`, `--md-primary-bg-color--light`,
      `--md-primary-fg-color--light` and `--md-typeset-a-color` existed for Material.
      Two of them are the previous commit's fixes — the dark-mode link and the
      header's ink on the accent — which are correct for MkDocs and now unexercised
      by the site. *Done means:* they are either kept behind a comment naming the
      parked renderer, or deleted; the file says which.
      **Done (del-16): deleted.** Five had no reader anywhere in `assets/`,
      `engine/` or a book's own assets; `--md-accent-fg-color` was read only by
      `settings.css`'s `var(--md-accent-fg-color, var(--tb-accent))`, whose
      fallback is the same value the declaration supplied, so the computed style
      is identical. The `(0,2,0)` restatement block that beat Material's
      specificity went with them. The fixes it carried survive where they are now
      made: shell.css paints links from `--tb-link` (`a { color: var(--tb-link) }`)
      and the masthead title from `--tb-ink`, straight from the bundle. The
      `data-md-color-scheme` attribute stays, because `themes.css` keys its tokens
      off `body[data-md-color-scheme]`.
- [ ] **`--tb-ink-lighter` is below 3:1 on the page for 2 of 18 bundle × scheme
      pairs**, and it paints one visible control: `.sidebar summary::marker`
      (`shell.css:164`, and the built sidebar does contain a `<summary>`; `.sidebar`
      paints no background of its own, so the marker is on the paper). The two are
      catppuccin light at 2.30:1 and kanagawa light at 2.93:1 — under WCAG 1.4.11's
      3:1 for a non-text component. Measured across all 18: the range is 2.30 to
      5.04. (On the *figure* panel it is below 3:1 for 8 pairs, one of them 2.05:1,
      but nothing draws this token inside a figure.) The page audit missed it because
      a `::marker` is a pseudo-element, not an element with a text node.
      *Done means:* the token is raised in the failing bundles, or the marker gets a
      token of its own with its own threshold, and the audit either covers
      pseudo-elements or records that it does not.
- [x] **The audit cannot see pseudo-elements, placeholders or SVG `fill`.** It walks
      elements that own a text node, so `::marker`, `::before`/`::after` content,
      `input::placeholder` and icon fills are invisible to it — the reason the
      `summary` marker above was not caught. *Done means:* the script's header says
      so, or the check grows.
      **Done (del-17): documented.** The harness's header and `test/README.md` §3
      name all three, with the `summary` marker as the worked example, and say
      plainly that this is a limit rather than coverage. Growing the check was
      rejected here: it means reading pseudo-element computed styles and SVG
      presentation attributes as well, which is a separate piece of work.
- [ ] **Five derived light members have never been looked at by a human**: gruvbox,
      arc-blueberry, tokyo-night, synthwave and archwave. They pass the invariant and
      the page audit, which is not the same as still looking like the family they
      claim to be. 54 screenshots are in `var/theme-preview/` (git-ignored, 7.5 MB).
      *Done means:* someone opens them and either accepts or redraws the light half.
- [ ] **Archwave makes nine, five of them vivid, and it is a near-duplicate of
      Synthwave '84** — magenta-and-cyan on deep aubergine, pastels against neon. No
      measurement prefers either. *Done means:* one is dropped, or the nine are kept
      with the overlap written down as deliberate.
- [x] **The preview harness is in no gate.** It is the only thing that catches the
      pseudo-element gap, the two Material defects and a bundle whose accent fails
      only with no subject tint. It needs Chrome, so it is not in `pytest` or CI, and
      `test/run.sh` no longer exists. *Done means:* it runs somewhere — a mise task,
      a CI job with a browser, or a documented manual step in `test/README.md`.
      **Done (del-17): a CI job with a browser, with a named task in front of it.**
      The `preview` job in `.github/workflows/verify.yml` runs
      `scripts/preview-themes.sh` (build every profile and the portal, then the
      9 × 2 × 3 audit) on every push and pull request, and the `gate` job requires
      it. It installs the Playwright client with the browser download skipped and
      drives the runner's Google Chrome, so no browser is downloaded.
      `scripts/preview-themes.sh` is the same entry point locally; the reason it is
      not in `pytest` or `scripts/check.sh` is still Chrome.
- [ ] **One pipeline build in five wrote no pages.** The only evidence is one run
      that printed `…/learn/: page was not written` for several routes, and exited 0;
      three consecutive reruns afterwards were clean. It happened while
      `engine/textbook/pipeline.py` was being edited, which is the likeliest cause,
      but that is a guess and not a measurement. *Done means:* reproduced with a
      command, or explained.
- [ ] **The landing-page audit is thin.** One book means 14 text elements on the
      whole page, so the card's body, subject and facts are one sample each. The
      card is where the `ink_soft` fix landed, so it is the sample that matters most.
      *Done means:* re-run once a second book exists.

---

## 22. Follow-ups from the MkDocs deletion

**Found while completing the deletion (del-14).** Small, none a capability loss,
all cheaper to fix while the context is fresh.

1. **`DEPLOY.md`'s performance budget was measured against the MkDocs shell.** The
table ("Material bundle 115 kB", "at most 7 render-blocking stylesheets") predates
the pipeline, which loads no Material bundle and links six stylesheets, so the
numbers are not the shipped page. **Fix:** re-measure with Playwright against a
locally served `site/` (the method is described in the same section) and replace
the table. **Done means:** every number names a resource the pipeline actually
loads, and the totals are reproduced by one recorded command.
**Done (del-17).** Re-measured with the new task `scripts/measure-budget.cjs`,
which binds a local server on an ephemeral port (request interception reports
`transferSize` as 0), loads the route in Playwright and sums the navigation entry
with `performance.getEntriesByType("resource")`. The shipped page is 13 requests,
~153 kB, document ~83 kB, 6 render-blocking stylesheets, largest resource
`assets/stylesheets/themes.css` at ~19 kB, DOMContentLoaded ~200 ms — and no
search index, because Pagefind fetches it only on a search. Table and method
replaced in `DEPLOY.md`'s performance-budget section.

2. **`engine/textbook/hooks/prefs.py`'s `snippet()`/`on_post_page()` are now
unreachable.** The MkDocs shell was their only caller; the pipeline's before-paint
script lives in `templates/page.html` and sets the keys directly, so the two can
drift. `test_prefs.py` still pins the snippet. **Fix:** either make the page
template carry `prefs.snippet(config)` (which would also restore the
`window.textbookPrefs` store on book pages) or delete the dead half and keep the
key constants. **Done means:** one implementation of the before-paint script, and
a test that fails if the two disagree.
**Done (del-16).** `prefs.snippet(config)` is the only implementation. It is
Material-free — no `__md_set`, no palette — and the page templates carry
`$prefs_script`, filled by `pipeline.render_page` and `portal.render`;
`portal.not_found` carries it too, so all three reader surfaces render one
script. `on_post_page` (an MkDocs-only entry point) is deleted and
`hooks/__init__.py` no longer composes it. Book pages regain
`window.textbookPrefs`, so the Settings runtime's fallback is never needed, and
an unknown stored bundle id now falls back to the default instead of setting an
unmatched `data-theme`. `tests/test_prefs.py` renders a real page and asserts the
bytes match `prefs.snippet`, and fails if either template holds a second copy.

3. **The shared-asset symlinks under `books/<id>/docs/assets/` are now
vestigial.** `pipeline.copy_assets` reads the shared bytes from `assets/`
directly; the symlinks exist because MkDocs served only `docs_dir`. Two tests
still require them. **Fix:** decide whether to keep them as the book's
self-describing view or drop them from `scaffold.ensure_shared_assets` and the
two tests together.
**Decided (del-16): keep them.** The links are no longer the build's source, so
they stay as the book's self-describing view of which shared stylesheets, figure
loader, settings runtime and booklet widget it uses, beside its own files.
Dropping them would also break the out-of-scope `tests/test_themes.py` (and
`test_figures.py`, `test_settings.py`), which read the links as that contract.
The rationale is recorded in `scaffold.ensure_shared_assets`, and
`test_collection.py::test_shared_assets_are_symlinked_not_copied` is now the
resolution check that replaces the build which used to walk `docs_dir`.

4. **Dead Material selectors still live in `assets/stylesheets/extra.css` and the
Settings runtime.** Noticed while deleting the unread `--md-*` variables (del-16),
and deliberately not fixed with them because it changes a printed page. Measured
on a built pipeline page: the `@media print` block hides `.md-header`, `.md-tabs`,
`.md-sidebar`, `.md-search`, `.md-footer`, `.md-top`, `.md-dialog` and
`.md-overlay`, and the page contains **none** of them — its chrome is
`.masthead`, `.sidebar` and `.search`, which the block leaves visible. So item
12's "readable page without the sidebar" is not yet true for the pipeline build;
the block's generic rules (the measure, `break-inside`, link underlines) do still
apply. The same file hides `.md-search__output` and moves `.md-top` for Material
controls that no longer exist (`grep` finds neither in a built page), and
`assets/settings/settings.js`'s `setScheme` still looks for a Material
`input[name="__palette"]` before its fallback (`__palette` is in no built page).
**Fix:** point the print block and the search rule at the pipeline shell's own
classes (or delete them), and drop the Material branch from `setScheme`; then
check a rendered print preview. **Done means:** printing a pipeline page hides the
masthead, sidebar and search; no Material-only chrome selector remains in
`extra.css`; and the Settings dialog still switches the scheme.

---

## 23. Stale theme references in the out-of-scope preview files — **done**

The bundles were replaced by six originals on 2026-10-11 (see `DECISIONS.md`),
but two files this workstream may not edit still name the deleted ids and the old
count:

- `scripts/preview-themes.sh` — the matrix comment says "9 bundles x 2 schemes x
  3 routes = 54 pages"; the harness discovers bundles from the generated
  `themes.css`, so it now runs 6 x 2 x 3 = 36. The number is prose, not a check.
- `test/README.md` — the worked example is
  `node test/theme-preview.cjs --themes synthwave ...`, and `synthwave` no longer
  exists, so a reader copying it gets an empty run. Its "catppuccin and kanagawa
  light" audit note is history and can stay if marked as such.

**Fix.** Update the comment and the example to a shipped bundle id (for example
`neon`) and the count to six. `test/README.md`'s paragraph on the four defects
can stay as the record it is.

**Done means.** `grep -rn "synthwave\|9 bundles" scripts/ test/` returns nothing
runnable; `scripts/preview-themes.sh` still passes on the six bundles.

---

## 24. Animated backgrounds on the vivid themes

**Decided, not built.** `DECISIONS.md` (2026-10-11) and the measurements in
`research/design/background-effects.md` settle the shape: opt-in, remembered per
reader, on the three vivid themes, and **never a CSS animation** — the CSS
gradient was the worst citizen measured, because it cannot stop (180 ms/s idle,
435 ms/s throttled to 4× CPU), while a WebGL field and a fluid solver idle below
the baseline. The prototypes and the harness are in
`research/design/background-effects/`.

**What remains.** Nothing of it is shipped:

- The effect module, mounted like a figure — a Tier-1 pure-JS module, not a
  plugin, and it must fail to nothing with scripting off (measured: it does).
- A reader preference, alongside `textbook:theme` and `textbook:scheme`, with the
  same origin-wide key discipline, and a control in the Settings overlay.
- `prefers-reduced-motion`, `visibilitychange` and an `IntersectionObserver`, all
  of which the prototypes already do.
- A budget check: the fluid is +22 kB and the field +12 kB, and
  `DOMContentLoaded` must not move.
- The three vivid bundles are `neon`, `phosphor` and `glass`.

**Not a gate.** The site is publishable without it, and the honest prior is that
motion distracts a reader reading mathematics — which is the whole argument for
opt-in.

**Done means.**

- [ ] A reader on a vivid theme can turn a background on from Settings, and it
      survives a reload on the origin-wide key.
- [ ] It stops on `prefers-reduced-motion`, when offscreen, and when the tab is
      hidden; the page is complete without it.
- [ ] The measured addition stays inside ~25 kB and `DOMContentLoaded` does not
      regress against `scripts/measure-budget.cjs`.
- [ ] `scripts/preview-themes.sh` covers the themes that gain it.

---

## 25. Declare the ready state

**Not a change: the gate.** The site is ready to publish when items 2–12 are
closed and their "done means" boxes are ticked, and not before — a checklist that
is mostly ticked is a checklist that has not been done.

Item 13 (content quality) is a rolling programme rather than a gate: the site can
be ready while it continues. But a chapter is not *done* until it passes its own
pedagogy audit.

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

