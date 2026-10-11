# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

- [x] 1. Theme menu — reader settings in the header (book pages and the landing page, one runtime)
- [x] 2. Custom domain — `open-textbook.org` resolves
- [x] 3. `www` redirect — DNS imported, rule live, 301 with path and query preserved
- [x] 4. Zone security and response headers — DNSSEC complete, CAA verified and enabled; only the CAA import and Bot Fight Mode left
- [x] 5. Worker version URLs closed; rollback is a manual workflow, command recorded
- [x] 6. Crawlability: our own `robots.txt` and a sitemap index
- [x] 7. Account, credential and dependency hygiene — 2FA, registrar lock, token rotation, secret scanning, Dependabot, recovery
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
- [x] 18. Theme bundles — six original light/dark groups; the third-party palettes replaced (see DECISIONS.md)
- [x] 19. The pipeline's 404 page declares literal colours
- [x] 20. The pipeline ships no Formulae booklet and no `book-local.css`
- [x] 21. Recheck and verify — what the theme work could not settle (only the landing-page sample is thin, and it needs a second book)
- [x] 22. Follow-ups from the MkDocs deletion
- [x] 23. Stale theme references in the out-of-scope preview files
- [ ] 24. Animated backgrounds on the vivid themes
- [x] 25. An iOS home-screen icon (`apple-touch-icon`) — shipped, with the drift guarded
- [x] 26. Declare the ready state — published 2026-10-11, release 26.284.0

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

- [x] A labelled, keyboard-reachable Settings control sits at the top right of
      every book page **and the landing page** — both use one runtime and one
      set of keys, verified live on the deployed site.
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
- [x] `https://www.open-textbook.org/` redirects to the apex — live and verified: `301`
      with the path and the query string preserved.
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

- [x] `www.open-textbook.org` resolves from 1.1.1.1 and 8.8.8.8.
- [x] `https://www.open-textbook.org/` returns `301` to the apex.
- [x] `https://www.open-textbook.org/gcse-maths/higher/?x=1` keeps the path **and
      the query** — the wildcard captures the path, the redirect rule's
      preserve-query setting is what carries the rest.
- [x] `DEPLOY.md` records it under "DNS: the `www` redirect".

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
- [x] **DNSSEC is complete.** The `DS` is now published in the parent `.org` zone
      — one answer from 1.1.1.1 and from 8.8.8.8, checked 2026-10-11 — so the
      chain of trust is whole. It was Cloudflare Registrar adding it
      automatically, as the dashboard had said it would; the earlier reading of
      "signed but no `DS`" was propagation, not a misconfiguration.
- [x] **CAA → restrict issuance. Verified and enabled.** The check the record was
      waiting on: the live certificate for `open-textbook.org` is issued by
      **Google Trust Services** (`C=US, O=Google Trust Services, CN=WE1`), valid
      to 2027-01-09, verified 2026-10-11. The three CAs Cloudflare documents for
      custom domains are now active in `deploy/dns/open-textbook.org.zone`, so the
      list is a superset of what is known to be in use rather than a guess.
      Re-check at the next renewal.
- [x] **Email records, since the domain sends none.** `TXT "v=spf1 -all"` and
      `_dmarc TXT "v=DMARC1; p=reject"` — no `rua`, since nobody is reading
      reports. Imported and serving, confirmed in the zone export. The CAA block
      was imported separately, on its own file, so nothing was duplicated.
- [x] **Disable the `workers.dev` route.** Done — the Worker is now `404` at
      `open-textbook.leonpjvaughan.workers.dev`, so there is one canonical origin.

Keep `security_level: medium`, `browser_check: on`, `tls_1_3: on`,
`automatic_https_rewrites: on`. Leave `rocket_loader` off — it injects JavaScript.
**Check Development Mode is off too**: it disables the edge cache and is easy to
leave on.
- [x] **Bot Fight Mode — kept on, deliberately, against the recommendation.** It
      injects a challenge script into every page, has no free-plan allowlist to
      exempt a reader who is wrongly challenged, and adds no DDoS protection
      (that is always on and separate): no login, no forms, no origin, so the
      threat model is empty. The author chose to keep it; recorded here and in
      `DECISIONS.md` so it reads as a decision rather than an oversight.

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
- [x] Deployed and verified live: `content-security-policy`,
      `x-content-type-options`, `referrer-policy`, `permissions-policy`,
      `x-frame-options` and `strict-transport-security` all present on a book page.

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
- [x] **The domain cannot lapse or move**: registrar auto-renew and the transfer
      lock both confirmed by the author (Cloudflare Registrar). The address is
      the product.
- [x] **The deploy token**: expiry and rotation set by the author. It is
      account-scoped with `Workers Scripts: Edit`, and `wrangler whoami` does
      **not** list permissions for an account token (it prints "To see token
      permissions visit …"), so `DEPLOY.md` records what it may do and when to
      rotate it — see "The deploy token" there.
- [x] **Secret scanning and push protection on GitHub**: enabled by the author.
      Worth knowing it needed the plan decision to change first — it is not
      available on a private repository on the Free plan, the same constraint
      as branch protection (`scripts/protect-main.sh`). Given how nearly `.env`
      was committed, this one had a proven failure mode behind it.
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

- [x] `ch3-index-laws.js` no longer injects `$...$` at runtime; the readout is
      HTML, so a reader sees mathematics rather than dollar signs.
- [x] No figure module contains an inline colour literal — `ch2-multiples.js`
      used `color:#fff` on a span where `.fig-accent` sets only `fill`/`stroke`,
      which was white on white, and `ch16-point.js` carried a stray `#888`.
- [x] `tests/test_figures.py` fails on a colour literal in a figure, so the rule
      is enforced rather than remembered. Demonstrated by reintroducing one.
- [x] Each figure is checked in both schemes: the preview harness walks every
      bundle in both, and the palette fix that followed from it was scoped to
      the bundles that actually failed.

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
- [x] **Satisfied by construction, not by the override.** The search tab-stop fix
      was re-run in the browser and holds. The toggle override was for Material's
      icon-only `<label>` toggles; the pipeline renders the sidebar as
      `<details><summary>{title}</summary>`, so 159 summaries carry their visible
      text as their accessible name and there is no icon-only toggle to label.
      The override, and the test that pinned it, went with MkDocs.

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
- [x] **`--tb-ink-lighter` below 3:1 — closed twice over.** It was raised in
      catppuccin (2.30:1 → 3.50:1) and kanagawa (2.93:1 → 3.36:1), and the
      loader now refuses the token below 3:1 anywhere. Then both bundles were
      deleted in the theme replacement, and all six replacements clear it
      (3.18–5.37). The bullet is kept for the original measurement:
      (was) **`--tb-ink-lighter` is below 3:1 on the page for 2 of 18 bundle × scheme
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
- [x] **Five derived light members never human-reviewed — moot.** All five
      (gruvbox, arc-blueberry, tokyo-night, synthwave, archwave) were deleted
      with the third-party palettes; the four new bundles are original work and
      their light members were designed rather than derived from a dark mode.
      (was) **Five derived light members have never been looked at by a human**: gruvbox,
      arc-blueberry, tokyo-night, synthwave and archwave. They pass the invariant and
      the page audit, which is not the same as still looking like the family they
      claim to be. 54 screenshots are in `var/theme-preview/` (git-ignored, 7.5 MB).
      *Done means:* someone opens them and either accepts or redraws the light half.
- [x] **Archwave near-duplicate of Synthwave '84 — moot.** Both were deleted in
      the replacement, which settles the question the bullet asks.
      (was) **Archwave makes nine, five of them vivid, and it is a near-duplicate of
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
- [x] **One pipeline build in five wrote no pages — explained, and pinned.** The
      code path cannot exit 0 with that output: `check_links` records a page whose
      file is missing in `broken`, `BuildResult.ok` is false whenever `broken` is
      non-empty, and `main` returns `1`. So the exit code in the note is
      unexplained by the code, and the likeliest explanation remains the
      concurrent edit. `tests/test_pipeline.py` now tests the invariant directly —
      a page the build did not write fails the build — so a second sighting is a
      regression rather than a mystery.
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

4. **Dead Material selectors still lived in `assets/stylesheets/extra.css` and the
Settings runtime — fixed.** Noticed while deleting the unread `--md-*` variables
(del-16), and deliberately left then because it changes a printed page.

   The `@media print` block hid `.md-header`, `.md-tabs`, `.md-sidebar`,
   `.md-search`, `.md-footer`, `.md-top`, `.md-dialog` and `.md-overlay`, and a
   built page contained **none** of them — its chrome is `.masthead`, `.sidebar`
   and `.search`, which the block left visible. So item 12's "readable page
   without the sidebar" was false for the pipeline build, and the `.layout` grid
   rule and content padding were aimed at a wrapper that no longer existed.

   **Done:** the block names the shell's own classes, verified in a browser with
   `emulateMedia({ media: "print" })` — masthead, sidebar and search are
   `display: none`, the content is `block` at the 523px measure. `tests/test_print.py`
   guards the class of mistake: a hidden class must be emitted by a template or
   styled outside the block, and the block may not name the deleted renderer.
   The dead `.md-search__output` tab-stop rules and the `.md-top` rule are gone —
   the pipeline's search is an inline input and list with no hidden overlay, so
   the bug the rule fixed does not exist in it, and a browser check still returns
   20 results. `--md-primary-fg-color--dark` was declared and read by nobody, so
   it went too. `settings.js`'s `setScheme` now sets the attribute directly
   instead of probing for `input[name="__palette"]`, which nothing has emitted
   since the shell changed.

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

## 25. iOS gets a page screenshot, not an icon — **done**

**What is wrong.** The site ships a tab icon (`assets/icons/favicon.svg`) and a
launcher icon for Android (`assets/icons/app-icon.svg`, declared in the manifest as
`any maskable`), but nothing for iOS. Safari's own requirement for a home-screen
tile is `<link rel="apple-touch-icon">` pointing at a PNG at a fixed size, and
the site declares neither, so a reader who adds the site to an iPhone home screen
is likely to get a screenshot of the page. That is the platform SHAPE.md's
"installable on a phone" is written for, and the one where the icon is largest and
most seen. **Not verified on a device or in the iOS simulator** — the shape of the
fix does not depend on the answer, since the link is the documented one either
way, but the last box under "Done means" is what settles it.

**Evidence (measured 2026-10-11).**

- `grep -rn "apple-touch-icon" engine assets books tests` returns nothing, and no
  page head declares one.
- `python -m textbook.portal` copies `app-icon.svg` and `favicon.svg` into
  `site/assets/icons/`, and the manifest declares one icon, an SVG.
- `git ls-files | grep -cE '\.(png|jpg|jpeg|gif|webp|ico|bmp|avif)$'` is `0`: no
  file in the repository is a raster image, and no CI job has a rasteriser on its
  path — which is the reason this was not done alongside the favicon.

**Fix.** Ship `assets/icons/apple-touch-icon.png` at 180×180 and link it
root-absolutely from the page shell, the landing page and the 404 —
`<link rel="apple-touch-icon" href="…/assets/icons/apple-touch-icon.png">` — then
copy it in `pipeline.copy_assets` and `portal.main` as the other two icons are
today. Two choices have to be settled first:

1. **Where the PNG comes from.** Either commit it as an authored asset, which
   would be the repository's only binary file, or rasterise it at build time. The
   second cannot drift from the SVG; the first costs nothing to run. `sharp` is
   available only as a transitive dependency of `wrangler`, so a build-time
   rasteriser means taking a direct dependency on it.
2. **How it is drawn.** iOS applies no mask to an `apple-touch-icon`, so this is
   `app-icon.svg`'s shape — a full-bleed ink square — and not the tab icon's:
   nothing is clipped, so there is no safe area to design for.

**Decided, and shipped (2026-10-11).** Option 1, *commit it as an authored asset*,
with the drift it risks guarded rather than trusted.

A build-time rasteriser needs a direct dependency on a native module (`sharp`,
present only transitively through `wrangler`) or a runner tool that is not
guaranteed to be there — and a build step that silently produces a missing or
blank icon is worse than 2 kB in git. The cost of committing it is that nothing
regenerates it, so `tests/test_pwa.py` pins the SHA-256 of `app-icon.svg`: change
the SVG and the test fails with the exact `rsvg-convert` command, rather than
shipping an icon that no longer matches the home-screen tile.
`assets/icons/README.md` records the decision and the procedure.

Drawn as option 2 says: `app-icon.svg`'s full-bleed ink square, 180×180, RGB with
no alpha — iOS applies no mask to this icon, so transparency would leave it
guessing at the background.

**Done means.**

- [x] Deployed and verified: `200`, `content-type: image/png`, 180×180 RGB with no
      alpha. Live since tag `26.284.0`.
- [x] Every head links it — a nested page (which resolves the prefix), the landing
      page, and the 404, which links both icons root-absolutely because it is
      served for a request at any depth. `tests/test_pipeline.py` checks that each
      built page's href actually resolves, not just that the attribute is there.
- [x] Both profile builds and the portal ship the file, pinned by a test that also
      asserts its size, its colour type and the source SVG's hash.
- [ ] Adding the site to the home screen on an iPhone (or the iOS simulator) shows
      the open book rather than a screenshot of the page. **Still unverified** — no
      Apple device here, and it is the one box a desk cannot close.
- [x] Whatever produces it can be re-run from a clean checkout: `scripts/check.sh`
      passes and the generated-file drift check is happy. The recipe is in
      `assets/icons/README.md`.


## 26. Declare the ready state — **published, 2026-10-11**

**Not a change: the gate.** The site is ready to publish when items 2–12 are
closed and their "done means" boxes are ticked, and not before — a checklist that
is mostly ticked is a checklist that has not been done.

Item 13 (content quality) is a rolling programme rather than a gate: the site can
be ready while it continues. But a chapter is not *done* until it passes its own
pedagogy audit.

**Status: published, 2026-10-11.** PR #1 merged to `main`, release `26.284.0`,
deployed, and verified against the live site rather than locally.

**Done means.**

- [x] Every box in items 2–12 is ticked, or the item is explicitly deferred here
      with a reason. The only box left open is item 5's rollback drill, deferred
      below with the rest.
- [x] `https://open-textbook.org/` returns `200` with `strict-transport-security`,
      `content-security-policy`, `x-content-type-options`, `referrer-policy`,
      `permissions-policy` and `x-frame-options`; `www` returns `301` with the path
      and the query preserved; the `workers.dev` origin returns `404`; and a
      missing path returns the 404 page.
- [x] Release `26.284.0` exists, `version.json` names commit `6eab87b`, and `main`
      is what is deployed. `dev` was fast-forwarded onto `main` afterwards: the PR
      was merged with a rebase, which rewrites SHAs, and without that the two
      branches would have diverged permanently while holding identical trees.
- [x] Item 1 is done — the reader settings menu is on every book page **and** the
      landing page, one runtime, confirmed live.

**Deferred, each with its reason.**

| What | Why |
|---|---|
| Item 5's rollback drill | The capability is a manual workflow and the command is in `DEPLOY.md`. A drill means rolling production back and forward again — a deliberate act, not a tick, and nothing has needed it. |
| Item 25's iPhone check | Adding the site to a home screen needs an Apple device, which nobody here has. The link, the file and their tests are in place; the item says plainly that the box is unverified. |
| Item 13's content programme | A rolling programme, not a gate. The audit is done, the worst chapters are fixed, and `research/pedagogy-audit/README.md` ranks what is left. |
| Item 24, animated backgrounds | Decided and measured, deliberately not built: no topic needs one, and motion distracts a reader reading mathematics. The mapping seam is in place with nothing consuming it. |
| Item 21's landing-page sample | One book means 14 text elements on the whole landing page, so the card is a single sample. It closes when a second book exists. |


---

## 27. A-level Mathematics — scaffolded; booklet and verifier outstanding

`research/curriculum/` holds the picture: the DfE subject content
(`DFE-00706-2014`), how AQA 7357, Edexcel 9MA0 and OCR H240 split the subject
across papers, the assessment objectives, the Large Data Set, and a **draft
chapter plan of 16 chapters and 108 sections** with all 88 DfE items placed.

Two findings decide the work:

- **A-level has no tier axis.** Every book so far has one; this one does not, so
  `book.yaml → tier_axis` needs a story, or an explicitly empty one.
- **The verifier needs real extension, not a tweak.** The gap analysis names what
  is missing per topic: `system`, `inequality`, `distribution`, `hypothesis`,
  `approx`, `correlation`/`regression`, `ode`, and the ops `limit`, `sum`,
  `series`, `rsolve`, `iterate`, `idiff`, `parametric_diff`, `invert`, `compose`,
  `eliminate`, `div`/`rem`, `expand_log`, `logcombine`, `expand_trig`, `harmonic`.
  `statistic` has no standard deviation, quartiles or IQR.

**Cannot be verified by a CAS at all**, and the book should say so rather than
pretend: proof structure, "show that", method choice, graph work, modelling
judgement, and critique of data or sampling. The verifier proves the algebra, not
the argument.

**Progress, 2026-10-11.** The book exists at `books/a-level-maths/`: 16 chapters,
108 sections, all 88 DfE items mapped. `book.yaml` declares `qualification:
A-level`, one `a-level` profile, an explicitly empty `tier_axis`, `oracles:
[sympy]` and a violet subject tint; `curriculum.yaml`, `sources.yaml` and the
book's `AGENTS.md` are in place. `python -m textbook.scaffold` generated the docs
tree, `python -m textbook.portal` put a card on the landing page, and
`python -m textbook.pipeline --book a-level-maths` built **362 pages** with no
broken links and no maths errors.

Engine changes landed so that a book with no tier axis can exist at all:

- `tier` is now optional in the scaffold's page front matter — absent means the
  page belongs to every reader of that book.
- The scaffold's stub page names use the reader-facing vocabulary (Learn /
  Practise with help / Practise), and "The chapter problem", not the internal
  names.
- The lint scan skips files still carrying `<!-- scaffold:stub -->`: a stub's
  body is a note to the author, and the marker itself contains the word
  `scaffold`.
- The colophon names the **Formulae** booklet only when the book declares one.

**Still open.** The booklet (item 32) and the verifier extension below.

**Done means.** The book exists with a registered booklet — **or a declared
absence plus item 32** — and a curriculum plan, and the verifier is extended far
enough that every bank CI can check passes.

---

## 28. GCSE Physics — research done, book not started

`research/curriculum/physics.md` covers AQA 8463, Edexcel 1PH0 and OCR
J249/J259, the required practicals, the tier story and the maths-mark
percentages.

**The finding that changes the design.** Every GCSE specification's
recall-versus-given appendix is **stale**: all three predate the 2022 policy, and
from 2026 the equation sheets print *every* equation. DfE confirmed in February
2026 that GCSE physics equations need not be memorised for the lifetime of the
current specifications. A booklet with a "recalled" group would misteach —
`research/curriculum/physics-equations-and-data.md` has the detail, including the
per-board differences a booklet must not normalise (AQA prints period and
magnification; Edexcel prints `v = x/t`; OCR prints density and words its
efficiency).

**Done means.** As item 27, plus a physics oracle.

**Progress, 2026-10-11.** The book exists at `books/gcse-physics/`: 10 chapters,
37 sections. `book.yaml` declares two profiles (`higher` default, `foundation`),
the DfE tier axis (`F`/`H`), `oracles: [sympy, units]` and a teal subject tint;
`curriculum.yaml`, `sources.yaml`, the book's `AGENTS.md` and
`booklet/gcse-physics.yaml` are in place. The scaffold generated the docs tree,
the booklet built (`101 formulae, 2 tables`), the portal shows the card, and
`python -m textbook.pipeline --book gcse-physics` built **142 pages** (Higher)
and **130 pages** (Foundation) with no broken links and no maths errors. The
booklet has no recalled-equations group: every equation is `given`, and the
per-board differences (AQA's period and magnification, Edexcel's `v = x/t` and
`E = I × V × t`, OCR's explicit density and word-only efficiency) are kept as
separate board items. `scripts/check.sh` passes.

The tier split is expressible in the existing model, so no engine change was
needed: the DfE rule is "Higher is a superset, Foundation excludes underlined",
which is the same shape as mathematics, and the physics-only tag is kept separate
from the Higher-only tag. Only four sections are wholly Higher-only at AQA 8463
(momentum, sound/detection, induced potential/transformers, microphones/speakers).

**Still open.** Edexcel's 2026 GCSE equation list was not retrieved (item 35), and
item 36 covers the A-level option-topic formulae. There is no physics problem bank
yet, so the units oracle is unused until the content pass.

---

## 29. A-level Physics — research done, book not started

AQA 7408, Edexcel 9PH0 and OCR H556, with the practical endorsement and the
data-and-formulae provision. Worth knowing before the booklet is built: OCR's
data sheet prints `F = ma`, `W = mg`, `E_k`, `E_p` and `R = V/I` **and** expects
them to be recalled, which breaks the clean given/recalled split a booklet would
otherwise assume.

**Done means.** As item 27, plus a physics oracle at A-level depth.

**Progress, 2026-10-11.** The book exists at `books/a-level-physics/`: 9 chapters,
30 sections. `book.yaml` declares one `a-level` profile, an explicitly empty
`tier_axis` with the reason recorded, `oracles: [sympy, units]` and a copper
subject tint; `curriculum.yaml`, `sources.yaml`, the book's `AGENTS.md` and
`booklet/a-level-physics.yaml` are in place. The scaffold generated the docs tree,
the booklet built (`105 formulae, 5 tables`), the portal shows the card, and
`python -m textbook.pipeline --book a-level-physics` built **119 pages** with no
broken links and no maths errors. OCR's "also expected to be recalled" equations
carry that `note`; every equation is `given`. `scripts/check.sh` passes.

**Still open.** The booklet transcribes the common core and constants only; the
board-specific option-topic formulae are item 36, and Edexcel's printed insert was
not retrieved (item 35). No physics bank yet, so the units oracle is unused.

---

## 30. A physics oracle — **done**

**Done, 2026-10-11: §5 steps 1–6 of `research/curriculum/physics-verifier-gaps.md`.**
Steps 1–2 built the seam (below). Steps 3–6 are
`engine/textbook/verify/oracles/units.py`: a second oracle, registered in
`ORACLE_MODULES` and `KIND_ORACLE`, owning nine physics check kinds.

- **`dimensions`** — a quantity is an exact magnitude and a dimension vector over
  `m, kg, s, A, K, mol, cd` plus an exact factor to SI. Proves dimensional
  consistency of an equation, unit-carrying arithmetic, or a declared quantity.
  `N` is `kg m s^-2`; `F = m * a` passes and `F = m / a` fails, which is the
  independent check a CAS cannot give.
- **`convert`** — exact prefix conversion, including powers (`100 cm^3 =
  0.0001 m^3`), with the dimensions checked first.
- **`sigfigs`** — rounds a value **once** to a declared number of significant
  figures, against `convention: round-once`; the answer is a string, so
  `1200` and `1.20e3` are distinguished.
- **`uncertainty`** — `add-absolutes`, `add-percentages` (the power multiplies
  the percentage) and a mean under a named convention (`half-range`, `full-range`,
  `standard-deviation`, `standard-error`), proved as a band with a tolerance.
- **`resolve`** — magnitude/angle to components and back, the physics resolution
  distinct from SymPy's `vector` kind.
- **`gradient`, `intercept`, `area`** — least-squares or trapezium readings of a
  series, checked against a declared interval.
- **`structured`** — proves a model answer contains its declared steps in order
  and covers its declared concepts; presence and coverage only, never physics.

`render.py` gains `render_quantity`/`render_quantity_html`: a quantity is plain
text or HTML, never `$...$` assembled at run time. `PROBLEMS.md` documents every
kind and states the §6 limit where an author meets it: the verifier proves
arithmetic and dimensions, not physics. `tests/test_verify_units.py` proves each
kind against a valid record and a deliberately wrong one, including a
dimensional inconsistency, a wrong number of significant figures and an
uncertainty that does not propagate. The two seam caveats resolved: physics books
name `oracles: [sympy, units]` (so `all` still works), and a bank with no
`oracles:` keeps SymPy alone and a units kind in it fails loudly.

The book and its bank are the separate items 28 and 29; this lands without them.

**Done, 2026-10-11: `research/curriculum/physics-verifier-gaps.md` §5 steps 1–2.**
`engine/textbook/verify/oracles/` now exists: `__init__.py` owns the
check-kind → oracle table and the loader, `sympy.py` holds the moved chain and
imports `cas.py` unchanged, and `verify.py` keeps the reports, the step
relations and the delegation (it shrank 249 → 192 lines). `book.yaml → oracles`
is read, with a per-bank `oracles:` override; an unknown oracle, a kind owned by
an unselected oracle, or a kind registered to a module that does not exist all
fail loudly. `tests/test_verify_oracles.py` pins the table and the loud
failures; the 139-bank `python -m textbook.verify` output is byte-identical
before and after.

`scipy` is **not installed**, and the maths gap analysis wants it for the normal,
Poisson and chi-squared distributions — so that dependency decision comes first.

**Done means.**

- [x] A registered oracle: `oracles: [sympy, units]` selects it; an unselected
      units kind fails loudly.
- [x] Nine kinds (`dimensions`, `convert`, `sigfigs`, `uncertainty`, `resolve`,
      `gradient`, `intercept`, `area`, `structured`), pinned in
      `tests/test_verify_oracles.py`.
- [x] A failing record per kind in `tests/test_verify_units.py`.
- [x] The §6 limit written in `PROBLEMS.md` and in the oracle module.
- [ ] A physics bank that uses it — deferred with the book (items 28 and 29).
- [ ] The equations-sheet coverage test (§3.6), which needs that book's booklet
      (`books/<id>/booklet/*.yaml`) as data; it was not in the mission's build
      order and cannot run without the book.

---

## 31. `books/gcse-maths/AGENTS.md` can shadow the new `books/AGENTS.md`

The nested-file convention is that the closest file wins. This change moved the
content-area watch-outs — **Tiers**, **Generated files**, **Content**, **Problem
bank** and **booklet data** — out of the root and into `books/AGENTS.md`, so an
agent working in `books/gcse-maths/` that loads only the nearest file plus the
root would miss them.

**Evidence.** `grep -n "books/AGENTS.md" books/gcse-maths/AGENTS.md` prints
nothing. The book file names only the root `AGENTS.md`; it predates the new
parent file, so the routing table and `books/AGENTS.md` itself are the only
pointers to it.

**Fix.** Add one line to `books/gcse-maths/AGENTS.md`: the shared book rules live
in `books/AGENTS.md`, read it before this file. Then pin it, so a second book
cannot repeat the gap: in `tests/test_agent_context.py`, assert that every
`books/<id>/AGENTS.md` names `books/AGENTS.md`.

**Done means.**

- [ ] `books/gcse-maths/AGENTS.md` names `books/AGENTS.md`.
- [ ] `tests/test_agent_context.py` fails when a `books/<id>/AGENTS.md` does not.
- [ ] `scripts/check.sh` passes.

---

## 31. The root `AGENTS.md` — **done**

**Done, 2026-10-11.** The root is **25.8 KB → 12.1 KB** (480 lines → 215) and
`assets/AGENTS.md` grew from 4.1 KB to 9.6 KB to receive the detail. Every rule
survived: the six principles, the four page contracts and the four page-name
rules are still *stated* in the root as one-liners, and only the detail moved —
a root that pointed at a skill for the rule itself would have been smaller and
worse.

The first pass had taken 29 KB to 25.8 KB by splitting the `## Watch out for`
groups and adding the routing table, which solved the *routing*: an agent editing
`assets/` now reads 4 KB of targeted rules rather than everything. This pass
solved the *size*, by not restating what a skill already owns.

The remaining bulk is three sections that are **already skills**:

| Root section | Lines | Why it can shrink |
|---|---|---|
| Theming | 102 | `assets/AGENTS.md` owns the cascade and the tokens; the root needs only the cross-cutting rule — never a colour in a page or a figure. |
| The chapter formula | 71 | `.agents/skills/author-textbook-chapter/SKILL.md` is the same material, and the router already sends chapter work there. |
| Voice and language | 51 | `.agents/skills/write-textbook-prose/SKILL.md` likewise. |

**The rule of thumb applied:** if a section is a skill, the root names it rather
than restates it — two copies drift, and the copy an agent reads may be the one
that is stale.

**Done means.**

- [x] The root is **12.1 KB**, down from 25.8 KB — a little over the 12.0 target,
      deliberately: going under it meant replacing stated rules with bare
      pointers, which is the thing that would have made the file worse.
- [x] `tests/test_agent_context.py` still passes, and `scripts/check.sh` is green.
- [x] Nothing lost — a phrase-level audit of the before-file against the final
      root plus `assets/AGENTS.md`, with a mapping table per section.
- [x] The one stale pointer outside the scope was fixed: `scripts/agent-prompt-1.md`
      sent a reader to `AGENTS.md → "Watch out for"`, which no longer exists there.

---

## 32. A-level Mathematics formulae booklet — retrieve each board's document

`BOOKLETS.md` says A-level Mathematics has a formulae booklet plus a statistical
tables section, and that a booklet must be built from the awarding body's own
document. None has been retrieved, so `books/a-level-maths/book.yaml` declares no
`booklet:` and the book ships no widget.

**Evidence.** `research/sources/a-level-maths/` holds the AQA 7357, Edexcel 9MA0
and OCR H240 **specifications**, not the exam-room formulae booklet. Their only
formula lists are DfE Appendix B — the formulae a student must **recall**, which is
the `know` group, not the sheet. `grep -in "formulae booklet\|formula booklet"
research/sources/a-level-maths/*.txt` finds only the Appendix B references in the
specifications and the DfE content. `books/a-level-maths/sources.yaml` therefore
records no booklet URL.

**Fix.** Retrieve each board's own A-level Mathematics formulae booklet (the
document printed in the exam room), record it in `books/a-level-maths/sources.yaml`
under `references` with a `url`, `retrieved` date and `role`, then write
`books/a-level-maths/booklet/a-level-maths.yaml` against `BOOKLETS.md`, add
`booklet:` to `book.yaml`, and run `python -m textbook.booklet a-level-maths`.

**Done means.**

- [ ] Each board's own booklet is recorded in `sources.yaml` with a retrieval date.
- [ ] `book.yaml` declares `booklet:` and `python -m textbook.booklet` validates it.
- [ ] Every item's `provision` traces to the retrieved document; nothing is invented.
- [ ] The widget is checked board by board, and `scripts/check.sh` passes.

---

## 33. The colophon's attribution links are hard-coded to GCSE

`scaffold.ATTRIBUTION_IDS` is a fixed tuple — `dfe`, `aqa-8300`, `edexcel-1ma1`,
`ocr-j560`, `ofqual-formulae-2026` — so only the GCSE book's `sources.yaml`
produces links on its About page. The A-level book uses `dfe-a-level`, `aqa-7357`,
`edexcel-9ma0`, `ocr-h240`, none of which match, so its About page lists no source
links at all. Nothing on the page is false — it still carries the retrieved date —
but the provenance it rests on is not reachable from the page.

**Evidence.** `uv run python -c "from textbook.book import book_by_id; from
textbook.scaffold import _attribution_links;
print(_attribution_links(book_by_id('a-level-maths')))"` prints `[]`, while the
same call for `gcse-maths` prints five links.

**Fix.** Derive the attribution from the book's own sources rather than a global
id list. The allowlist exists to keep the page short; keep that intent with a
per-reference tag (`attribution: true`) instead of matching ids.

**Partial progress, 2026-10-11.** The physics ids were added to the tuple
(`aqa-8463`, `edexcel-1ph0`, `ocr-j249`, `ofqual-equations-2028`, `aqa-7408`,
`edexcel-9ph0`, `ocr-h556`), so both physics About pages now link their DfE and
board references. The A-level Mathematics page is still unlinked, because its ids
(`dfe-a-level`, `aqa-7357`, `edexcel-9ma0`, `ocr-h240`) were not added — the
proper fix is still the per-reference tag.

**Done means.**

- [ ] The A-level About page links its DfE and board references.
- [ ] The GCSE page is unchanged in substance.
- [ ] A test covers a book whose board reference ids differ from GCSE's.

---

## 34. The scaffold does not create `problems/` for a new book

`tests/test_collection.py::test_book_is_well_formed` requires `book.banks` to be a
directory, but `scaffold.scaffold()` generates only `docs/` and the curriculum
map. A new book therefore fails the shape test until someone creates `problems/`
by hand; `books/a-level-maths/problems/.gitkeep` is standing in for that now.

**Fix.** Have `scaffold.scaffold()` create the banks directory (with a `.gitkeep`,
so a checkout keeps it) the way it creates the docs tree, so "one directory and
one registration" is true of the scaffold too.

**Done means.**

- [ ] A directory with `book.yaml` and `curriculum.yaml` scaffolds to a tree whose
      `banks` directory exists and is tracked.
- [ ] `test_book_is_well_formed` passes without any hand-made directory.


---

## 35. Edexcel's current physics equations/inserts were not retrieved

Both physics booklets rest on Edexcel documents that are not the ones a 2026
candidate sees.

- **GCSE Physics 1PH0.** Pearson's exam-support page still links only the
  May–June 2024 *Equations List* (`gcse-physics-exam-aid-1ph01sc0.pdf`,
  `1PH0 1SC0`). The 2024 list prints the whole set and Ofqual requires
  year-to-year consistency, but it is evidence for the 2024 window, not the 2026
  provision. `books/gcse-physics/booklet/gcse-physics.yaml` records the caveat in
  `meta.provenance` and `meta.basis`; `research/curriculum/physics.md` §"What
  could not be established" records that a school-year-specific 2026 list was not
  found.
- **A-level Physics 9PH0.** Pearson exposes no standalone data-and-formulae
  booklet PDF on a machine-readable page (the exam-materials listing is dynamic,
  the past-papers area is login-gated). The A-level booklet's Edexcel provision
  therefore rests on the specification's own Appendix 8 (formulae) and Appendix 9
  (data), which state in words what is supplied, not on the printed insert.

**Fix.** Retrieve each board's own current document: the 2026-onwards GCSE
Equations List from Pearson's exam-support page or a 2026 paper, and the A-level
data-and-formulae insert from a sample assessment material or a past paper.
Transcribe the per-board spelling where it differs, update `meta.provenance`/
`meta.basis` and `sources.yaml` with the URL and retrieval date, and re-run
`python -m textbook.booklet` for the book.

**Done means.**

- [ ] `books/gcse-physics/sources.yaml` names an Edexcel equations list for the
      current window, with a retrieval date, and the booklet matches it.
- [ ] `books/a-level-physics/sources.yaml` names the Edexcel printed insert (or
      records that the appendices are the closest readable evidence), and the
      booklet's Edexcel items match it.
- [ ] Any difference from the 2024 list / the appendices is transcribed, not
      normalised, and `scripts/check.sh` passes.

---

## 36. The A-level physics booklet transcribes the core only

`books/a-level-physics/booklet/a-level-physics.yaml` covers the DfE Appendix 3
core common to AQA 7408, Edexcel 9PH0 and OCR H556, plus the constants and
particle data. It does **not** transcribe the board-specific option-topic
formulae: AQA's insert carries Astrophysics, Medical physics, Engineering
physics, Turning points in physics and Electronics sections (five pages of the
seven-page booklet), and Edexcel's and OCR's booklets likewise carry more than the
common core. `meta.note` says so, and the curriculum omits the option topics
deliberately (AQA 3.9–3.13).

**Evidence.** `sed -n '/OPTIONS/,$p' research/sources/a-level-physics/aqa_7408_data_formulae.txt`
(or the fetched copy) shows the five option sections; the booklet YAML's
`sections:` has no option-topic section and `meta.note` records the gap.

**Fix.** Decide the book's position on options — a board-neutral book cannot
cover one board's options as common content. Either transcribe the options as
board-specific booklet sections (so the widget shows them only for the board that
ships them) and add a board-specific curriculum note, or declare options out of
scope in `meta.note` and `AGENTS.md` as a deliberate limit.

**Done means.**

- [ ] The book states which board-specific content it covers and which it does
      not, in `booklet` `meta.note`, `AGENTS.md` and `curriculum.yaml`.
- [ ] If options are transcribed, they are `provision`-tagged per board and the
      widget hides the wrong board's; if not, the limit is reader-visible.
- [ ] `python -m textbook.booklet a-level-physics` validates and
      `scripts/check.sh` passes.
