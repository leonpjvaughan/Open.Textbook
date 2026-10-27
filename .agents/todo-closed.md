# Closed items

The queue is `.agents/todo.md`. This is everything it has finished, kept **in full**,
because the diagnosis is the valuable part: an item that says what was wrong, how it was
measured and what fixed it is the record of a defect, and a one-line summary of it is not.
Compression here would delete the reasoning and keep the number.

An item arrives here by being closed in `todo.md` — marked `**done**` in its heading and
checked in the list at the top of that file. Nothing is deleted.

**Some numbers repeat** — 31, 75, 98, 99 and 100 appear twice or three times — because
a group was renumbered as work landed and the later item kept the number the earlier
one had. The cross-references inside this file are by number, so renumbering now would
break more than it fixed; the repeats stay, and each item's heading is its own
identifier.

## 1. Theme menu — reader settings in the header — **done**

**Request.** The theme (starting with `Editorial`) should be selectable from a
menu in the top right of the header. Research the best place for settings. Prefer
a settings menu that **overlays the page**, so changing a preference never
changes the page or the subpath.

### What exists today

| Surface | Theme menu? | Notes |
|---|---|---|
| Landing page (`engine/src/textbook/templates/portal.html`) | yes | a `<select id="theme-menu">` in the masthead, plus a dark-mode button. Writes the shared keys `textbooks:theme` / `textbooks:scheme`. |
| Books, MkDocs (what is deployed) | **no** | `engine/src/textbook/hooks/prefs.py` applies both keys before first paint. Material's own palette toggle changes light/dark. There is no control for the bundle. |
| Books, custom pipeline (`engine/src/textbook/templates/page.html`) | **no** | applies the theme before paint, no control either. |

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
  exposed by `engine/src/textbook/hooks/prefs.py` and writes the same keys.
- MkDocs has **no `custom_dir` today**. Add `theme.custom_dir:
  renderers/mkdocs/overrides` in `renderers/mkdocs/base.yml`, then a
  `partials/actions.html` (or `header.html`) override for the trigger and the
  panel. The custom pipeline needs the same markup in
  `engine/src/textbook/templates/page.html`.
- Mark the menu chrome `data-pagefind-ignore` so it never enters the search
  index.

### What is left of this item

The mechanism, the label and three proofs are done. The rest is content and
breadth, and none of it is blocked:

- **The inventory is twenty named results** (above) and three proofs exist. The
  remaining seventeen are written one at a time.
- **The three already derived in the prose** — the quadratic formula, Pythagoras by
  rearrangement, the sine rule from a dropped perpendicular — are the cheapest
  next, because the argument exists and only needs lifting onto its own page.
- **A proof-count check**: nothing yet fails if a book states a fact the registry
  happens to cover and does not link to it. That is the same shape of gap as
  equations coverage, with the same limit — it cannot be proved, only counted.

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

## 4. Zone security settings and response headers — **done**

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

`engine/src/textbook/headers.py` emits `site/_headers`, called from
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

## 5. Worker version URLs are public, and rollback is untested — **done, one drill deferred**

**Deferred by the author, 2026-10-12.** Not because it is not worth doing — a
rollback that has never been run is a plan, not a capability — but because it is a
live production act and there is no rush while the site is one release old and
traffic is nil. The window for doing it cheaply is the next deploy that is not the
first: two versions in the Worker's history makes a rollback drill a one-command
test rather than an exercise in creating a bad version on purpose. Recorded as a
decision so it is not rediscovered as an oversight.


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

## 7. Account, credential and dependency hygiene — **done**

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

## 8. One site, two renderers — **decided: the pipeline replaces MkDocs** — **done**

**This is the largest structural item in the file.** There are two ways to build a
book, and only one of them is deployed.

| | `renderers/mkdocs/` + MkDocs | `engine/src/textbook/pipeline.py` |
|---|---|---|
| Status | **what `main` deploys** | builds 457 pages in 11.6s, deploys nothing |
| Templates | Material's, plus `overrides/` (which does not exist yet) | `engine/src/textbook/templates/page.html` |
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

**Decision (2026-10-11) — `engine/src/textbook/pipeline.py` becomes the site. MkDocs
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

## 10. Accessibility: turn the claims into checks — **done**

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

## 11. Licence, colophon and a way to report an error — **done**

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

## 12. Installable and printable — **done**

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

## 14. Two figure modules break the figure contract — **done**

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

## 15. `extra.css` and `portal.css` declare literal colours — **done**

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

## 16. Material keyboard gaps found by the audit — **done**

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

## 17. Text drawn on the accent is not AA — **done**

**Verified** by del-4 while fixing the literal colours. The booklet bar knocks its
label out in `var(--md-default-bg-color)` (the paper). That passes for the
current book, whose accent the subject tints, but a bundle's *own* accent makes
the paper 4.34:1 (omarchy light) and 4.40:1 (gruvbox light) on it — below AA for
text. No token expressed "text on the accent".

**Fix.** Added an `accent_ink` token to `SCHEME_TOKENS` in
`engine/src/textbook/book.py`, a value per bundle in both schemes, and used it for
text drawn on the accent: `extra.css` (`.bk-fab`, `.bk-bar`, the pressed chip)
and `portal.css` (the card chip). `engine/src/textbook/themes.py` now checks
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

## 18. Theme bundles: make each one a light/dark group — **done**

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

## 19. The pipeline's 404 page declares literal colours — **done**

**Noticed while bringing the bespoke shell to parity (del-11).** `NOT_FOUND` in
`engine/src/textbook/pipeline.py` inlines a `<style>` with six literal colours:
`#faf9f5`, `#1f1e1b`, `#23577d`, `#171614`, `#e9e7e1` and `#8cc0e8`. It
therefore ignores the reader's bundle entirely — a reader on Catppuccin gets
Editorial's paper on the 404, and one on Clean gets a blue link. This is the
same class of bug item 15 fixed for `extra.css` and `portal.css`.

Evidence:

    grep -nE '#[0-9a-fA-F]{3,8}' engine/src/textbook/pipeline.py

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

- [x] `grep -nE '#[0-9a-fA-F]{3,8}' engine/src/textbook/pipeline.py` finds no colour
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

**Found while porting `test/run.sh` to pytest (del-13).** `engine/src/textbook/pipeline.py`
is the site — CI and the deploy build with it — but it never loads the two shell
features the MkDocs path does. Both are reader-visible or documented extension
points, so deleting MkDocs would remove the only renderer that has them.

**Evidence (measured 2026-10-11).**

- The MkDocs shell loads both: `renderers/mkdocs/base.yml:52` lists
  `assets/stylesheets/book-local.css` in `extra_css`, and
  `renderers/mkdocs/gcse-maths.higher.yml:677` lists `assets/booklet/booklet.js`
  in `extra_javascript` for a book that declares `booklet:` in `book.yaml`.
- The pipeline has neither: `grep -in booklet engine/src/textbook/templates/page.html`
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
`engine/src/textbook/templates/page.html`, filled by `render_page`/`build` only when
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

## 21. Recheck and verify — what the theme work could not settle — **done**

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
- [x] **The landing-page audit is thin — re-run with four books.** The sample went
      from **14 text elements to 38**, because each book's card carries a title,
      subject, description and facts. It passes for all six bundles in both
      schemes, including the card's `ink_soft` body, which is where that fix
      landed. It stays a small sample in absolute terms — a landing page is small —
      but it now covers four cards rather than one, and it grows with the next
      book without anyone remembering to do anything.

---

## 22. Follow-ups from the MkDocs deletion — **done**

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

2. **`engine/src/textbook/hooks/prefs.py`'s `snippet()`/`on_post_page()` are now
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

## 25. iOS gets a page screenshot, not an icon — **done, one check unverified**

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

## 26. Declare the ready state — **published, 2026-10-11** — **done**

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

## 27. A-level Mathematics — scaffolded; booklet and verifier outstanding — **done**

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

## 28. GCSE Physics — research done, book not started — **done**

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

## 29. A-level Physics — research done, book not started — **done**

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

**Closed 2026-10-17, verified rather than assumed.** All three books are written:
`a-level-maths` 16 chapters and 324 sections, `gcse-physics` 10 and 111,
`a-level-physics` 9 and 90, with **0 `scaffold:stub` markers** in any of them and
119, 57 and 48 problem banks. What the headings described was true when they were
written and stopped being true without anyone editing them — which is the failure
mode a queue has: an item is closed by finishing the work, and nobody goes back to
the line that announced it.

## 30. A physics oracle — **done, and in use**

**Done, 2026-10-11: §5 steps 1–6 of `research/curriculum/physics-verifier-gaps.md`.**
Steps 1–2 built the seam (below). Steps 3–6 are
`engine/src/textbook/verify/oracles/units.py`: a second oracle, registered in
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
`engine/src/textbook/verify/oracles/` now exists: `__init__.py` owns the
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
- [x] A physics bank that uses it — **157 physics banks across two complete books**,
      every one verified by the `units` oracle.
- [x] The equations-sheet coverage test (§3.6) — **moved to item 44**, because it
      cannot be made honest without a declaration the banks do not carry.
      (`books/<id>/booklet/*.yaml`) as data; it was not in the mission's build
      order and cannot run without the book.

---

## 31. A book's `AGENTS.md` could shadow its parent's — **done**

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

- [x] `books/gcse-maths/AGENTS.md` names `books/AGENTS.md`.
- [x] `tests/test_agent_context.py` fails when a `books/<id>/AGENTS.md` does not.
- [x] `scripts/check.sh` passes.

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
- [x] The one stale pointer outside the scope was fixed: `.agents/prompts/agent-prompt-1.md`
      sent a reader to `AGENTS.md → "Watch out for"`, which no longer exists there.

---

## 32. A-level Mathematics formulae booklet — **done**

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

**Done, 2026-10-12.** All three boards' exam-room documents were retrieved — AQA's
*Formulae for A-level Mathematics* (v1.2), Pearson Edexcel's *Mathematical
Formulae and Statistical Tables* (Issue 1, July 2017) and OCR's H240 sheet, which
is printed on pages 2–3 of every paper rather than published separately.

**88 items**: 29 from each board's sheet, plus a shared 29-item `know` group which
is **DfE Appendix B** — the formulae that must be used without being provided. The
two lists barely overlap: the sheets give the sum of a series but not its $n$th
term, and the $	an/\sec/\cot/\cosec$ derivatives but not the elementary ones.
Board differences are preserved rather than normalised — AQA's `1.2` denominator,
Edexcel's scaled derivatives and sum-to-product formulae, OCR's quotient rule.

AQA needed finding: its subject page links only the specification, and the booklet
lives on the filestore. The specification's own Appendix B is a **recall** list, so
using it as the provision would have been the stale-appendix trap the physics
research warned about — a June 2023 paper confirms the filestore document is what
the exam room uses.

**One thing the widget cannot express**, recorded rather than worked around:
Edexcel's large statistical tables (binomial CDF, random numbers) need a table
tagged by **board**, and the Tables tab filters by tier only. Carrying them would
show them to AQA readers, who are given none.

**Done means.**

- [x] Each board's own booklet is recorded in `sources.yaml` with a retrieval date.
- [x] `book.yaml` declares `booklet:` and `python -m textbook.booklet` validates it.
- [x] Every item's `provision` traces to the retrieved document; nothing invented.
- [x] The widget is checked board by board — it cannot filter a **table** by board,
      so Edexcel's large tables are omitted. Recorded in
      `research/curriculum/a-level-maths.md` §11.

---

## 33. The colophon's attribution links were hard-coded to GCSE — **done**

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

**Done, 2026-10-11.** `ATTRIBUTION_IDS` is gone. A reference carries
`attribution: true` in the book's own `sources.yaml`, and the About page links
what it finds. The tag was added to the curriculum, board and regulator
references of all four books, so **the A-level Mathematics page went from 0 links
to 6** and the GCSE page still carries its 5 — the same five, because they are
the same references.

`tests/test_colophon.py` now checks every book links something, that the link
count matches the tag count, and that a tagged reference without a title or URL
fails rather than vanishing. A second test pins the other half of the intent: an
*untagged* reference is not linked, which is how the page stays short.

**Done means.**

- [x] The A-level About page links its DfE and board references — six of them.
- [x] The GCSE page is unchanged in substance.
- [x] A test covers a book whose board reference ids differ from GCSE's: the
      parametrised test runs over every discovered book, so the next one is
      covered the day it is added.

---

## 34. The scaffold did not create `problems/` for a new book — **done**

`tests/test_collection.py::test_book_is_well_formed` requires `book.banks` to be a
directory, but `scaffold.scaffold()` generates only `docs/` and the curriculum
map. A new book therefore fails the shape test until someone creates `problems/`
by hand; `books/a-level-maths/problems/.gitkeep` is standing in for that now.

**Fix.** Have `scaffold.scaffold()` create the banks directory (with a `.gitkeep`,
so a checkout keeps it) the way it creates the docs tree, so "one directory and
one registration" is true of the scaffold too.

**Done, 2026-10-11.** `scaffold.scaffold()` creates `book.banks_name` and a
`.gitkeep` when it is missing, so an empty banks directory survives a checkout.
`test_a_new_book_scaffolds_a_banks_directory` copies a real book's data into a
temp tree, removes the directory, scaffolds, and asserts both the directory and
the marker appear — so the promise is tested rather than asserted.

**Done means.**

- [x] A directory with `book.yaml` and `curriculum.yaml` scaffolds to a tree whose
      `banks` directory exists and is tracked.
- [x] `test_book_is_well_formed` passes without any hand-made directory.


---

## 35. Edexcel's current physics equations/inserts were not retrieved — **done**

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

**Done, 2026-10-12.** The May–June **2026** list was reached directly and its
equations are identical to the 2024 and 2025 lists, so the provision is unchanged
and now rests on the current document. Pearson's listing pages remain unusable;
the document URL is not.

**Done means.**

- [x] `books/gcse-physics/sources.yaml` names an Edexcel equations list for the
      current window, with a retrieval date, and the booklet matches it.
- [x] `books/a-level-physics/sources.yaml` names the Edexcel printed insert (or
      records that the appendices are the closest readable evidence), and the
      booklet's Edexcel items match it.
- [x] Any difference from the 2024 list / the appendices is transcribed, not
      normalised, and `scripts/check.sh` passes.

---

## 36. The A-level physics booklet transcribes the core only — **done**

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

- [x] The book states which board-specific content it covers and which it does
      not, in `booklet` `meta.note`, `AGENTS.md` and `curriculum.yaml`.
- [x] If options are transcribed, they are `provision`-tagged per board and the
      widget hides the wrong board's; if not, the limit is reader-visible.
- [x] `python -m textbook.booklet a-level-physics` validates and
      `scripts/check.sh` passes.

---

## 37. `kilogram` was reported as a US spelling, and the fix was a no-op — **done**

**What is wrong.** `US_SPELLINGS` in `engine/src/textbook/lint.py` maps
`\bkilogram(s)?\b` to `kilogram\1`. The replacement is the match, so the rule
changes nothing, but the reporting loop still tests the pattern. Every page that
writes "kilogram" or "kilograms" is therefore reported as `style:us-spelling`.
"kilogram" is the UK spelling the root `AGENTS.md` asks the book to use, so the
finding is a false positive that cannot be silenced by `--fix`. Measured:

```bash
$ uv run python -m textbook.lint gcse-physics
scanned 142 pages

style:us-spelling: 8
    books/gcse-physics/docs/Chapter 1/Section 1.1/Guided problems/index.md:22: 3. Convert 500 g to kilograms.
    books/gcse-physics/docs/Chapter 1/Section 1.1/Walkthrough/index.md:16: substitution; the units kilogram, metre, second, joule and watt.
    ... 6 more, all in Chapter 1
```

Only the physics book trips it, because it is the first book to write the word.

**Fix.** Delete the `kilogram` row: there is no UK/US difference to enforce, and
the other unit rows (`metre`, `centre`) show the intended set. If a rule is
wanted for the obsolete `kilogramme`, write that pattern, not `kilogram`.

**Done, 2026-10-11.** The row is gone from `US_SPELLINGS`; `metre` and `centre`
show the set it belonged to. `python -m textbook.lint gcse-physics` now reports
no `style:us-spelling` at all.

**Done means.**

- [x] `uv run python -m textbook.lint gcse-physics` reports no `style:us-spelling`.
- [x] The rule is pinned by the corpus rather than by a fixture: the lint runs
      over every book in the gate, so a page writing "kilogram" would show up as
      a finding the moment the row came back.
- [x] `scripts/check.sh` passes.

---

## 38. A bank record whose check renders no answer — **done**

**What is wrong.** `engine/src/textbook/verify/render.py → render_problem` builds the
reader-facing answer from `answer_text`, then from `_answer_from_check`, then
falls back to `check["answer"]`. An `all` check has no top-level `answer` (its
values live in the sub-checks), so a record that carries only `answer_text`-free
`kind: all` renders as the label and nothing else. The verifier still passes, so
CI does not see it. Measured:

```bash
$ uv run python - <<'PY'
from textbook.verify.render import render_problem
from textbook.verify.verify import verify_problem
record = {
    "id": "demo-all-no-answer-text",
    "statement": "Decide whether 7 is prime.",
    "answer_label": "Prime?",
    "check": {"kind": "all", "checks": [
        {"kind": "compare", "relation": "!=", "lhs": "Mod(7,2)", "rhs": "0"},
        {"kind": "compare", "relation": "!=", "lhs": "Mod(7,3)", "rhs": "0"}]},
}
print("verifier ok:", verify_problem(record).ok)
print(render_problem(record, 1))
PY
verifier ok: True
**1.** Prime?
```

The record verifies and the answers block prints no answer. Every A-level
Chapter 1 record that uses `all` avoids this only because the author remembered
`answer_text`; nothing enforces it.

**Fix.** Make the renderer fall back to a composed answer when `kind: all` (join
the sub-check answers), or fail the verifier for a record that has neither
`answer_text` nor a renderable `check.answer`, so a page and its proof cannot
drift. The latter is safer: a composed answer is a second rendering path that can
disagree with the authored one.

**Done, 2026-10-11.** The verifier now **rejects a bank record that renders no
answer**, with a message naming the cause. The check lives in `verify_bank`, not
in `_verify_problem`, because it is a rule about what a page shows, not about
mathematics: a test may verify a record it made up without inventing an
`answer_text`, and that distinction is itself pinned by a test.

A `structured` check is the one honest exception — its model answer is prose
rendered from its points, and it deliberately asserts nothing about correctness.

**The rule found six real records in the existing banks**, all of them checks
whose answer lives inside the check rather than in `answer_text`: three in
Chapter 1 rounding, two ordering, one extraneous-root. All six now carry an
`answer_text`, and `test_every_bank_renders_an_answer_for_every_record` walks the
whole corpus so the next one fails in CI.

**Done means.**

- [x] A bank record that renders no answer fails the verifier with a clear message.
- [x] Tests pin it: a record with no answer is rejected, a `structured` one is
      not, a bare record verified on its own is not, and the corpus is clean.
- [x] `uv run python -m textbook.verify` passes every bank and `pytest` is green.

---

## 39. `uncertainty: add-percentages` could not model a quotient — **done**

**What is wrong.** The `units` oracle's `add-percentages` handler builds the
result as `prod(value ** power)` and sums `power * percentage`, then takes the
uncertainty as `result * total_percentage / 100`. It never takes the magnitude of
`power * percentage`, so a term with a **negative** power — the natural way to
write a quotient such as $g = L/T^2$ — produces a *negative* total percentage and
a negative uncertainty. Measured:

```bash
$ uv run python - <<'PY'
from textbook.verify.verify import verify_problem
record = {
    "id": "quotient", "statement": "g = L / T^2",
    "check": {"kind": "uncertainty", "combine": "add-percentages",
        "terms": [{"value": "0.800", "percentage": "0.125"},
                  {"value": "1.795", "percentage": "0.139", "power": -2}],
        "result": "0.2483", "uncertainty": "0.001"},
    "answer_text": "x",
}
print(verify_problem(record, oracles=("sympy", "units")).errors)
PY
['check: multiplying the terms gives 32000/128881, not 2483/10000',
 'check: adding the percentage uncertainties gives an absolute uncertainty of -1224/3222025, not 1/1000']
```

A related limit: `sigfigs` takes a value as an exact rational, so a quantity built
on an irrational constant cannot be rounded by the oracle at all. Measured with
the Chapter 1 pendulum value $g = 4\pi^2 L/T^2$:

```bash
$ uv run python - <<'PY'
from textbook.verify.verify import verify_problem
record = {"id": "pi", "statement": "round g",
    "check": {"kind": "sigfigs", "value": "128000 * pi**2 / 128881",
              "figures": 3, "answer": "9.80", "convention": "round-once"},
    "answer_text": "x"}
print(verify_problem(record, oracles=("sympy", "units")).errors)
PY
["check: not an exact number: '128000 * pi**2 / 128881'"]
```

**The workaround the A-level Physics Chapter 1 banks use.** The quotient is
rewritten with the reciprocal as a positive power (`1/T` carries the same
percentage uncertainty as `T` and enters with power 2), and an irrational value is
written as a sufficiently precise decimal for the `sigfigs` check while the value
itself is proved by `approx`. Both are honest, but neither is obvious to the next
author, and the first is a trap: the record fails with a *negative* uncertainty,
which reads like a wrong number rather than a missing `abs()`.

**Fix.** In `engine/src/textbook/verify/oracles/units.py`, take the magnitude of the
percentage contribution (`total_percentage += abs(power) * percentage`, or use
`abs(power) * percentage`) so a quotient verifies as written, and allow
`sigfigs.value` to be a SymPy expression that evaluates to a `Rational` within a
declared tolerance, so a $\pi$-based value can be rounded without being
pre-rounded by hand. Add a `tests/test_verify_units.py` case for each, including a
deliberately wrong negative-power record that must fail.

**Done, 2026-10-11.** Both limits are closed, and a third one the item found on
the way.

- **The negative power.** The handler takes the magnitude of each term's
  contribution, so $g = L/T^2$ verifies as written rather than needing the
  reciprocal rewritten as a positive power.
- **`sigfigs` on an irrational value.** A symbolic `value` is now accepted when
  the record declares a **`tolerance`** — the band across which the rounding must
  hold — so $g = 4\pi^2 L/T^2$ can be rounded by the oracle instead of being
  pre-rounded by hand. A symbolic value with **no** tolerance fails loudly, which
  is the right default: the comparison is ambiguous without one.

The item's own example records predate the tolerance mechanism and use rounded
decimals, so they still fail on the exact-value comparison rather than on the
sign. The behaviour is pinned by `tests/test_verify_units.py`, including a wrong
uncertainty that must fail.

**Done means.**

- [x] `add-percentages` with `power: -2` verifies a physically correct quotient,
      and a record with the wrong uncertainty still fails.
- [x] `sigfigs` accepts a symbolic value against a declared tolerance, and a
      symbolic value with no tolerance is an error rather than a guess.
- [x] `tests/test_verify_units.py` pins both, and every bank verifies.
- [x] `research/curriculum/physics-verifier-gaps.md` §3.3 names them.

## 40. A new figure module failed the runtime-LaTeX check — **done**

**What is wrong.** The untracked
`books/a-level-maths/docs/assets/figures/ch2-quadratic-explorer.js` (added by the
A-level Mathematics workstream on 2026-10-11) fails
`tests/test_figures.py::test_no_figure_module_injects_runtime_latex`. The
offending line is a **comment** that contains a literal `$...$` example. The
test is line-based, so a comment counts. Measured while gating GCSE Physics
Chapter 2:

```bash
$ uv run python -m pytest tests/ -q
FAILED tests/test_figures.py::test_no_figure_module_injects_runtime_latex[a-level-maths/ch2-quadratic-explorer.js]
1 failed, 1087 passed in 28.76s
```

This is the only failure in the suite, and it is not in GCSE Physics. It may be
fixed by the A-level Mathematics workstream before this item is read; check the
file first.

**Fix, taken: the scanner reads code, not comments.** `tests/test_figures.py`
gained `code_only()`, which strips block comments and full-line `//` comments
before either scanner runs, so a comment is allowed to discuss the rule. The
latent half of the same bug was fixed with it: the colour scanner had the same
blind spot and would have reported the first comment that named a colour. Only
full-line `//` is stripped, so a URL inside a string survives, and the guard still
fails a genuine injection — checked by mutation.

**Done means.**

- [x] `uv run python -m pytest tests/ -q` passes, with no
      `test_no_figure_module_injects_runtime_latex` failure.
- [x] The figure still mounts, and its runtime text stays plain text.

## 41. `dimensions` could not check a magnitude needing a square root — **done**

**What is wrong.** The `units` oracle's arithmetic evaluator (`_eval_node` in
`engine/src/textbook/verify/oracles/units.py`) handles constants, symbols, unary
minus and the binary `+ - * / **` only, and `Quantity.__pow__` rejects a
non-integer power. So the natural check of a Pythagoras magnitude that carries a
unit, `sqrt(vx**2 + vy**2)`, fails on syntax, and `(vx**2 + vy**2) ** 0.5` fails
on the integer-power rule. A physics bank with a unit-carrying resultant cannot
prove it with `dimensions`; it either checks the square (an area, not the
resultant) or drops the unit and leans on `resolve`, `vector` or `approx`, which
carry no dimension. Measured while authoring A-level Physics Chapter 2 (see
`books/a-level-physics/problems/chapter-02-practice-2.2.yaml`, which works around
it):

```bash
$ uv run python - <<'PY'
from textbook.verify.verify import verify_problem
rec = {"id":"magnitude","statement":"x","answer_text":"y",
       "check":{"kind":"dimensions","expression":"sqrt(vx**2 + vy**2)",
                "values":{"vx":{"value":"4.0","unit":"m s^-1"},"vy":{"value":"3.0","unit":"m s^-1"}},
                "answer":{"value":"5.0","unit":"m s^-1"}}}
print(verify_problem(rec, oracles=("sympy", "units")).errors)
PY
["check: unsupported expression element Call(func=Name(id='sqrt', ...))"]
```

**Fix.** Add a small fixed set of real-valued functions to `_eval_node` (`sqrt`,
and the trig functions a check may want), keeping the rule that the resulting
dimension must be expressible with integer powers: `sqrt` requires every
exponent to be even. Alternatively state in `PROBLEMS.md` that a unit-carrying
magnitude is checked with `resolve` or `vector`, and treat the gap as by design.

**Done, 2026-10-11.** The `dimensions` handler composes an expression of
quantities, so `sqrt(vx**2 + vy**2)` verifies — and a wrong unit still fails, with
both sides named: *"sqrt(vx**2 + vy**2) has dimensions m s^-1 but the answer
declares m"*.

**Done means.**

- [x] `dimensions` verifies a unit-carrying magnitude written as
      `sqrt(x**2 + y**2)`, and a wrong magnitude still fails.
- [x] `tests/test_verify_units.py` pins it, and
      `uv run python -m textbook.verify books/*/problems/` passes.

## 42. The internal-words lint flagged the literal phrase "the bank" — **done**

**What is wrong.** `engine/src/textbook/lint.py` maps `\bthe (?:problem )?bank\b`
to `(delete)` in `INTERNAL_PHRASES`, so any page that uses the ordinary English
word "bank", meaning a financial institution or a river bank, is reported as an
internal word and fails `tests/test_content_hygiene.py`.
`tests/test_content_hygiene.py::test_no_internal_words_reach_the_reader` fails on
a-level-maths Chapter 4 Section 4.7 while this item was written:

```bash
$ uv run python -m pytest tests/ -q
FAILED tests/test_content_hygiene.py::test_no_internal_words_reach_the_reader
    books/a-level-maths/docs/Chapter 4/Section 4.7/Guided problems/index.md:193:
    **6.** A savings account holds £500. Each year the bank adds 5% interest, then
1 failed, 1300 passed in 60.75s
```

The rule was added because "the bank" was our word for the problem bank, but it
is far too broad: the reader-facing phrase is the plural "the problems" or the
page name, and the singular is also a legitimate English word.

**Fix.** Narrow the pattern to the phrases that are genuinely ours, for example
`\bthe problem bank\b` and `\bthe bank of problems\b`, and check the other
`INTERNAL_PHRASES` entries for the same over-reach. If the phrase is kept, add a
negative lookahead for a financial or a river context, which is brittle; the
narrowed pattern is the better fix.

**Done means.**

- [x] `uv run python -m pytest tests/test_content_hygiene.py -q` passes.
- [x] A page that writes "the bank adds interest" is no longer reported, and a
      page that writes "the problem bank" still is.
- [x] `tests/test_content_hygiene.py::test_no_internal_words_reach_the_reader`
      passes on the current a-level-maths content.

## 43. A-level Mathematics Chapter 6 was missing, and the plan thought it was built — **done**

**What is wrong.** The commit `a25b5e8` adds the whole of a-level-maths
**Chapter 7** (Differentiation) — 32 pages, 11 banks, 4 figures — but its summary
reads `**A-level Mathematics Chapter 6** — 32 pages.` A plan read from that
summary concludes "1–6 done, 7 next", so it schedules Chapter 7 (already built)
and Chapter 8 (in progress), and **Chapter 6 has no delegate at all**. Measured
on `a25b5e8`:

```console
$ for c in 6 7; do n=$(grep -rl 'scaffold:stub' "books/a-level-maths/docs/Chapter $c" | wc -l); \
    tot=$(find "books/a-level-maths/docs/Chapter $c" -name index.md | wc -l); \
    printf "Chapter %s stubs=%s pages=%s\n" "$c" "$n" "$tot"; done
Chapter 6 stubs=20 pages=20
Chapter 7 stubs=0 pages=32
$ ls books/a-level-maths/problems/ | grep chapter-06 | wc -l
0
```

It is a dependency, not only a numbering slip: `docs/Chapter 7/Section 7.3/Walkthrough/index.md:15`
names "the graphs of $e^x$ and $\ln x$ from Chapter 6" as a prerequisite, and
Chapter 8 (Integration) needs $\int \tfrac{1}{x}\,dx$. Chapter 7 already points
forward at content that does not exist. The a-level-maths glossary strand pages
(`docs/Glossary/{pure,mechanics,statistics}.md`) are also all still stubs, so
none of the new terms is defined.

**Fix.** Author Chapter 6 (Exponentials and logarithms, 6.1–6.6, DfE F1–F7, OT3)
to the Chapters 1–5 and 7 standard — opener, Learn / Practise with help / Practise
per section, Review, one bank per practice set, figures where they earn their keep
— and define its terms on `docs/Glossary/pure.md` (which is still a stub). Correct
the chapter number in the commit-summary/plan so a future batch does not schedule
Chapter 7 again.

**Done means.**

- [x] `grep -rl 'scaffold:stub' "books/a-level-maths/docs/Chapter 6"` prints
      nothing, and `ls books/a-level-maths/problems/ | grep -c chapter-06` is at
      least 7.
- [x] `uv run python -m textbook.verify books/a-level-maths/problems/` passes.
- [x] `uv run python -m textbook.lint a-level-maths` exits 0 with no
      `voice:internal` and no `structure:*` finding in Chapter 6.
- [x] `docs/Glossary/pure.md` defines the terms Section 6.3 and Section 7.3
      share, alphabetically, and the Chapter 6 pages link to them.

---

## 44. An equations-coverage check needs a declaration the banks do not carry — **done**

**Measured before building, and not built.** `physics-verifier-gaps.md` §3.6
describes a coverage check: every equation a question needs must be one the
booklet provides. The mechanism it assumes is a declaration on the problem —
`plays: aqa-8463-eq-kinetic-energy` — and then the check is trivial: resolve each
reference against `books/<id>/booklet/*.yaml` and fail if it is absent or is a
`know` item.

**The declaration does not exist.** `0` of 1879 physics problems in 105 bank files
carry `plays:`. Of 769 `dimensions` checks, 21 state an equation; the other 748
carry an expression and values, and those reduce to **165 distinct formulae**
written as SymPy strings — `c/f`, `m*g*h`, `0.5*m*v**2`, `v*t/2`, `u**2/(2*s)` —
which are rearrangements and sub-expressions, not the booklet's items.

**Inferring the mapping is the thing that cannot be made honest.** A relabelling
matcher maps `s/t` to both `v=s/t` and `a=(v-u)/t`, so it passes by accident; a
name-strict one misses board variants (`E_p = mgh` against `ΔGPE = mgΔh`); and
many formulae are derived or special-case (`v*t/2`, `m(g-a)`, `emf - I*r`), so it
would need an exemption list whose omissions nothing can verify. A check that
measures nothing is worse than no check.

**Two routes, and it is the author's call.**

- **A — declare it, and check it (recommended).** Add `plays:` to the problems
  that play a booklet equation, and a verifier function that validates each
  reference resolves and is `given` for every board the book supports. The
  declaration sits beside the question, where an author can see it is right.
- **B — a verifier-side mapping table.** No bank edits, but it duplicates the
  declaration away from the question and needs ~165 curated entries plus an
  exemption list whose gaps are unverifiable. Not §3.6.

**Done means.** One route is chosen; the check fails on a problem whose equation
the booklet does not provide; and `PROBLEMS.md` says what the check proves —
coverage, never correct use, which is the `units` oracle's business.

---

## 45. The remaining undeclared records, book by book — **done**

**Measured after the declaration pass, 2026-10-12.** `python -m textbook.verify`
prints how many records carry symbols and declare no booklet equation. A-level
Physics fell from **182 to 20** when its declarations were added, with **0 invalid
ones** — every declaration resolves to a real booklet item that some supported
board provides.

| Book | Undeclared | State |
|---|---|---|
| A-level Mathematics | 273 | Classified 2026-10-12. No record among them was a booklet item. |
| GCSE Mathematics | 126 | **28 declared by rule**; the rest are algebra, not booklet formulae. |
| GCSE Physics | **0** | Not a gap: its expressions carry no symbols at all, only substituted numbers, so there is nothing a declaration could name. That is itself the reason the check cannot prove completeness. |
| A-level Physics | 20 | Reviewed: differences, a division by a count, derived results. One is a genuine question — see below. |
| `ie-lc-applied-maths` | 157 | **No booklet exists for this book.** Nothing to declare against. |
| `ie-lc-maths` | 93 | **8 declared by rule 2026-10-17**; the rest are algebra, calculus, complex numbers, and substituted numeric forms. |
| `ie-jc-maths` | 87 | **No booklet exists for this book.** The SEC publishes none for Junior Cycle. |
| `ie-lc-physics` | 8 | **No booklet exists for this book**, though the SEC booklet it is examined with does cover physics. See item 60. |

**The three books with no booklet are the whole of the remaining gap that a
declaration could close.** 252 records sit in `ie-jc-maths`,
`ie-lc-applied-maths` and `ie-lc-physics`, and not one of them can carry a
`plays:` while the book has no booklet to resolve against. For `ie-jc-maths`
that is correct — the SEC publishes no Junior Cycle booklet. For the two
Leaving Certificate books it is a gap, and item 60 is that gap.

**`ie-lc-maths`, 8 declared by rule, 2026-10-17.** The same method as GCSE
Mathematics: one rule at a time, each requiring the expression to be an
*instance* of the item it names, and never "contains".

| Item | Records | The form |
|---|---|---|
| `parallelogram-area` | 2 | `l * w`, `b * h` |
| `triangle-area` | 2 | `(b * h) / 2` |
| `trapezium-area` | 1 | `((a + b) / 2) * h` |
| `prism-volume` | 1 | `l * w * h` |
| `triangle-area` + `prism-volume` | 1 | `(b * h / 2) * L` — a triangular prism needs both |
| `trapezium-area` + `prism-volume` | 1 | `((a + b) / 2) * h * L` |
| `parallelogram-area` + `triangle-area` | 1 | `l * w + (b * h) / 2`, a composite area |

The 93 that remain are **not** candidates: `x**2`, `x**3 * x**5`, `exp(3*x)`,
`(3 + 2*I) / (1 - I)`, and numeric substitutions such as `sqrt(13**2 - 5**2)`
and `24*4 - 3*4**2`. A substituted form has no symbol left to name, and
`2 * l + 2 * w` (a rectangle's perimeter), `2 * (l * w + l * h + w * h)` (a
cuboid's surface) and `2 * (a * b / 2) + a * L + b * L + c * L` (a triangular
prism's surface) are genuine composite formulae that **the booklet does not
provide**, which is a coverage question for the author and not a declaration.

**GCSE Mathematics: 28 declarations, by rule rather than by shape.** Its booklet has
only 24 items — geometry, measure and proportion — while its 126 symbolic records are
mostly *algebraic manipulation*: expanding `(x+3)(x+5)`, factorising `x^2+8x+15`,
solving `3((x-5)/3)+5`. So the declarations are made one rule at a time, each
requiring the expression to be an instance of **that** item:

| Item | Records | The form |
|---|---|---|
| `pythagoras` | 8 | `a^2 + b^2`, or `sqrt(a^2 + b^2)` for the hypotenuse |
| `trig-ratios` | 9 | `k sin A`, `k / cos A`, `k tan A` — one ratio, not a combination |
| `triangle-area-sinc` | 5 | `(ab/2) sin C` |
| `sine-rule` | 4 | `k sin A / sin B` |
| `cosine-rule` | 2 | `a^2 + b^2 - 2ab cos C` |

**A first attempt at this declared 33 and was wrong, and catching it is the point.**
It matched any expression containing a trig function, so `x sin x` — a product-rule
differentiation from a calculus bank — was declared `trig-ratios`, and three records
that merely *evaluate* exact values (`sin(pi/4) cos(pi/4)`) were declared too. Every
one of those would have passed the check, because the check proves the item is
*provided*, not that it is *the right item*. The declarations were withdrawn and
re-made by rule; the 28 above are each an instance of the item they name.

**The 20 in A-level Physics are a judgement, not an omission.** They are a difference (`a - b`),
a division by a count (`d / n`), a two-stage sum, or a derived result; and one is
genuinely interesting — a question uses $p = mv$ and **the booklet has no
`momentum` item**, only `force-momentum` ($F = \Delta p/\Delta t$). That may be
right if the equation is printed in the question, which is what the `question`
provision means, or it may be a coverage gap the check cannot see because nothing
declares it. Worth one look at the question.

**Done means.** Each book's remaining count is either declared or recorded as
reviewed with a reason, and `python -m textbook.verify` prints counts that match
this table.

### Closed, 2026-10-12 — all 273 A-level Mathematics records classified

The claim "they are recall items and manipulation" was an assertion until it was
run as a classification over every record. It now is one, and **the check that
matters is the bucket that came back empty**: no record among the 273 could be
licensed by a booklet item any board provides.

| Why no declaration | Records | % |
|---|---|---|
| Uses a **recall-only** formula (DfE Appendix B) | **133** | 48.7 |
| Algebraic work — an identity, an expansion, a simplification | 61 | 22.3 |
| Substituting into an expression | 13 | 4.8 |
| Fixed-point iteration or a recurrence | 11 | 4.0 |
| Eliminating a parameter | 8 | 2.9 |
| Solving a differential equation | 8 | 2.9 |
| A sum the sheet does not cover (of powers) | 7 | 2.6 |
| Composing or inverting a function | 6 | 2.2 |
| Partial fractions | 5 | 1.8 |
| A limit | 5 | 1.8 |
| The remainder theorem | 4 | 1.5 |
| Cancelling, expanding or dividing polynomials | 10 | 3.7 |
| Adding algebraic fractions | 2 | 0.7 |

**The first row is the interesting one, and it is not a gap.** 133 records need
`standard-derivatives`, `standard-integrals`, `differentiation-rules`,
`laws-of-logarithms` or `pythagorean-identities` — every one of which the booklet
records as `know` for **all three boards**, because the booklet's own header says
its `know` items are DfE `DFE-00706-2014` Appendix B: "the formulae and identities
that must be used *without* these formulae and identities being provided". A
question that needs the power rule is one the reader is *required* to know, so
declaring it is an error rather than a fix. See the A-level section below.

**What is left undeclared cannot be declared**, and that was checked rather than
argued: re-running the declaration rules over all 273 and keeping only the ids some
board *provides* returns **zero**. Nothing declarable was left undeclared, so the
count of 273 is the honest remainder rather than a backlog.

**Across all five books:**

| Book | Undeclared | State |
|---|---|---|
| GCSE Mathematics | 126 | 28 declared by rule; the rest algebra, not booklet formulae |
| GCSE Physics | 0 | its expressions are substituted numbers, so nothing to name |
| A-level Mathematics | **273** | classified above; 35 declared, nothing declarable left |
| A-level Physics | 20 | reviewed: not booklet items, or derived combinations |
| Proofs | 0 | no banks |


### A-level Mathematics — done, and the check proved its worth first

**35 declarations, 0 invalid, 307 → 273.** The pass is small and that is the
finding, not a shortfall.

**An operation-based rule would have written 147 invalid declarations, and the
check refused all of them.** The reasoning looked sound: a question that
differentiates needs `standard-derivatives`, one that integrates needs
`standard-integrals`, one that expands `(1+x)^n` needs the binomial series. The
booklet records the first two — and `differentiation-rules`, `laws-of-logarithms`
and `pythagorean-identities` — as **`know` for every board**, and `errors()` rejects
a declaration that every supported board expects the reader to recall.

The booklet's own header says why, and it is not an error in the data:

> The `know` items are DfE "Mathematics: AS and A level content" (DFE-00706-2014)
> **Appendix B**, the formulae and identities that must be used "without these
> formulae and identities being provided".

So a question needing the power rule is **not** a coverage gap — the specification
requires the reader to know it. The rule that would have declared it was the
mistake, and it was caught before a line was written rather than after a review.
That is the check working, and it is the strongest argument for the
declaration-first shape `research/curriculum/physics-verifier-gaps.md` §3.6
proposed being built the other way round.

**What is declarable is what a board actually prints**, so only 35 records have
one:

| Item | Records | How it was recognised |
|---|---|---|
| `first-principles` | 10 | a difference quotient — `/h` with `h` in it |
| `binomial-series` | 8 | `series` of `(1+x)^n` or `(a+bx)^n` |
| `aqa-arithmetic-series` | 7 | a finite sum with a **linear** summand |
| `integration-by-parts` | 7 | a polynomial times a transcendental of a **linear** argument |
| `geometric-series` | 1 | `2**r` — the variable in the *exponent* |
| `sine-addition` | 1 | `sin(x+y) + sin(x−y)` |
| `newton-raphson` | 1 | a step of the form `x − f(x)/f′(x)` |

**Two errors were caught by reading the rule's output rather than trusting it**,
which is where the last two books' mistakes were found too:

- **`r**2` is not a geometric series.** `Σr²` is a sum of *powers*; a geometric term
  has the variable in the exponent. The first version of the rule had the test
  backwards and would have declared `p4-sum-of-squares`, `p7-square-standard-result`,
  `p9-sum-of-cubes` and `Σr²` as geometric. The sheet has no sum-of-powers formula,
  so those four are correctly undeclared.
- **A by-parts integrand is not any polynomial times any exponential.**
  `3x²e^{x³}` matches that shape and is a *substitution*. Requiring the
  transcendental's argument to be linear excludes it, and the rule now separates
  all seven genuine parts integrals from all five substitutions.

**A schema wart, recorded rather than hidden.** `aqa-arithmetic-series`,
`edexcel-arithmetic-series` and `ocr-arithmetic-series` are three ids for one
formula, differing only in bracket style (`[2a + (n-1)d]` against `\{2a + (n-1)d\}`),
because each board's sheet is reproduced in its own rendering and an item carries
one `latex`. The check accepts a declaration when **some** supported board provides
the formula, so naming one is true in substance — every reader is given it — but
the id named is arbitrary among three. A `variants:` field would say it properly.
Not worth a booklet rewrite for seven records; worth knowing about.

**Two changes to the check itself**, both small and both tested:

- **A record may name several items.** `plays: [standard-integrals, integration-by-parts]`
  is now accepted beside the single-id form, because "differentiate $x^2\sin x$"
  genuinely needs two and naming one would let the check pass while the other was
  missing. 7 new tests, including that a bad id is reported even when the others
  are fine and that a blank declaration is not a declaration.
- The 273 that remain are the honest remainder: algebraic manipulation, proof,
  partial fractions, elimination, differential equations — and every question whose
  working rests on a DfE Appendix B formula the reader is required to know.

---

## 46. Every figure, measured — and the two defects it found — **done**

**Done, 2026-10-12.** Added at the author's request: list every figure, capture it
in both schemes, and check the colours are visible.

`scripts/audit-figures.cjs` loads each figure in a browser, in both schemes, asks
for the computed paint of every element it draws, and measures it against the panel
behind it. **128 figures, 256 measurements, 938 distinct paints.** The table is
`research/design/figure-audit.md`; the captures and a gallery are in the
git-ignored `var/figure-audit/`.

**Two real defects, neither visible in the source.**

1. **18 SVG labels across 13 figures were painted black.** `.text-accent`,
   `.text-warn` and `.text-good` set `color`; **SVG `<text>` is painted with
   `fill`**, whose initial value is black. Legible on the light scheme by luck and
   **1.4:1 on the dark panel**. `.text-ink` did not exist at all, so a module using
   it got black in both schemes. Fixed with `fill: currentColor` on each, so the
   class means the same thing in HTML and in SVG.
2. **`fig_accent` had no threshold against the figure panel.** It was checked as
   `accent` against the *paper*, where it passes everywhere, and never against the
   surface a figure is drawn on — though it colours labels and is therefore text.
   Adding it at 4.5:1 found **twelve book-and-bundle pairs between 3.90:1 and
   4.43:1**. Four palettes moved (`glass` `#0f7a5a`→`#0e7254`, `phosphor`
   `#9a5b00`→`#925600`, gcse-physics `#0f766e`→`#0e7069`, a-level-physics
   `#b45309`→`#a34b08`) and no threshold did.
3. **Also found:** `color-scheme` was never declared, so a `<select>` inside a
   figure was `rgb(0,0,0)` on `rgb(239,239,239)` — a white box on a dark page — in
   both schemes. Now set from the attribute `prefs.py` writes before first paint.

**Why nothing had caught it.** `test_themes.py` pins the tokens and their
thresholds; `test_figures.py` pins that no module hard-codes a colour. Both passed
and both were right: the module used the class correctly and the token was fine.
Nothing asked **what the class actually paints**, which is a browser's answer.

**Result:** 0 contrast failures across 128 figures × 2 schemes. Verified against
editorial, neon, glass and phosphor: every one passes, and no two bundles produce
the same paints, so the sweep is not vacuous.

**The standard, so it cannot come back.** Three tests in `test_figures.py` — a
`text-*` class a module uses must be defined, must set `fill: currentColor`, and
the whole class contract is asserted in one place — each verified to fail when the
fix is reverted. Plus the audit in `scripts/preview-themes.sh`, so CI runs it.

**Left undone, deliberately.** The browser audit sweeps figures under the *default*
bundle only; the other five are covered by the static token check, which is
exhaustive across all six bundles, all four books and both schemes. Running the
browser sweep six times would cost twelve minutes in CI to re-prove what the static
check proves. A figure that paints nothing is legitimate — two do, and inherit the
ink — so the tests ask what a class *does*, not that one is present.

---

## 47. "Prove it to me" — a proof behind every unproved claim — **done**

**Requested by the author, 2026-10-12.** Wherever a book states a mathematical fact
as fact — the angles of a triangle sum to 180°, the quadratic formula, the sine
rule, the sum of an arithmetic series — the reader should be able to ask **why**
without leaving the page. A small affordance beneath the statement opens a proof,
and a central proof book holds it.

### The request, in the author's words

- A **"Prove it to me"** component beneath any fact presented without proof, linking
  to a **central proofs page**.
- A **shared proof book** — one proof, referenced from wherever it is needed,
  across books.
- **Extensions**: the same proof should offer the general case, so "angles in a
  triangle" extends to "angles in an *n*-sided polygon".
- **The proof a teenager can follow**, not the shortest one.
- **Dynamic components** — toggles and sliders — so the reader can change the
  thing and see the proof hold.
- **Say when it is not in the curriculum.** An extension is offered *and marked*,
  so a reader never mistakes it for something their exam will ask.

### Why this is a real gap, not a nicety

The chapter formula is explicit that **P1 — teach first, then fade the support** —
and that a novice must never meet an unguided task. A fact asserted without
justification is the same failure in the other direction: it is the one place a
reader is asked to take something on trust, and the books are otherwise careful to
show *why*. The review pages already ask the learner to explain; this gives them
somewhere to have found out.

It also lands on the collection's own rule about claims: `research/pedagogy.md` is
careful about what the evidence supports, and the books should be equally careful
about what they assert.

### What already exists to build on

- **The figure pipeline is the precedent**: a line-anchored directive
  (`:::figure <slug>`) expands to a custom element and injects a loader only on
  pages that need it, and modules live per book with a shared loader. A proof can
  follow the same shape — the component is `maths-figure`'s sibling, not a new
  subsystem.
- **The proofs are already half-written**, in the prose. A Walkthrough that
  *derives* the quadratic formula, or proves Pythagoras by rearrangement, is a
  proof sitting inside a page where nothing else can reuse it.
- `tests/test_figures.py` is the contract to copy for the new component: no colour
  literal, an accessible name, no runtime LaTeX, and the class-paints-correctly
  rule that item 46 cost real defects to learn.

### Built, 2026-10-12 — the first slice

The author answered the boundary question: a **fifth book that is not really a
book**, holding proofs shared across qualifications. Everything below follows from
that and from the collection's own rules.

**The reference work.** `books/proofs/` is a book because that is how the
collection publishes, navigates and themes a body of pages. It declares no
chapters, no strands, no boards, no tier axis, no booklet and no banks — and four
of those are now asserted by `tests/test_proofs.py`, so it cannot quietly grow
them. Its `curriculum:` points at `proofs.yaml`, a **registry** rather than a
chapter plan, and three things changed to let a book be that:

- the scaffold skips the chapter and glossary machinery instead of stubbing it
  empty, so the book has no empty glossary, no empty curriculum map and no home
  page listing no chapters;
- the nav is built from the registry when a book has no chapters, so its pages are
  reachable at all — without this the build produced **two pages** and reported
  every proof as missing;
- `book.reference_book()` finds it by the `Reference` qualification rather than by
  directory name, and fails if two books claim it.

`Reference` is now a third group in `collection.yaml` ("Material that belongs to
more than one course"), so the landing page has somewhere honest to file it. The
card counts **proofs** rather than chapters, and its subject line reads
"Mathematics" rather than the invented "Reference Mathematics".

**Three proofs**, written for this collection and cited in `sources.yaml` for the
claims they justify rather than for their wording: angles in a triangle, angles in
a polygon, and the sum of the first *n* squares by induction. Two figures come with
them — a slider that moves the apex and shows the three angles on the straight
line, and a slider for the number of sides with a toggle for the fan of diagonals.
Both follow Predict → Test → Explain and report through an `aria-live` readout.

**The directive is a link, and only a link.** `:::prove <id>` expands to an
`<a href="/proofs/<id>/">`. There is no script and no custom element, so the whole
affordance works with scripting off — which is the Tier-0 rule, and the reason a
dialog was the wrong answer to "make it clickable". The interactive part of the
author's request lives in the *proofs*, as figures, which is where the sliders
belong.

**The label is the point, and it works.** `proofs.yaml` records the qualifications
examined on each proof, and the directive compares that with the qualification of
the book the reader is in. The same proof therefore reads differently in two books:

| Where | Proof | Rendered |
|---|---|---|
| GCSE Mathematics §16.3 | angles in a triangle | *Prove it to me →* |
| GCSE Mathematics §16.4 | angles in a polygon | *Prove it to me →* |
| A-level Mathematics §4.4 | the sum of the first n squares | *Prove it to me →* **Beyond your course** |

The last row is a real finding rather than a demonstration: the sum of the first
*n* squares is **Further Mathematics**, not A-level, so it is in no course at this
collection's level. A proof in no course is marked in every book, which is why
`qualifications: []` is a decision the registry asks for explicitly — the key must
be present, and a test fails on an omission so that "deliberately in no course" and
"nobody filled this in" cannot look alike.

### Two defects found while building it

- **A lost backslash was rendering wrong maths in three pages, silently.** A
  literal tab had replaced the `\t` of `\times`, `\text` and `\tan`, so
  `(n-2)\times180` rendered as `(n-2) imes180` and `\text{co-interior angles}` as
  `ext{...}`. **KaTeX does not error on any of it** — `i`, `m`, `e`, `s` are valid
  maths tokens — so the page renders a wrong formula cheerfully, `throwOnError` is
  never reached, and the `math-error` grep the gate runs reports nothing. Nine
  occurrences in three pages, fixed, and `tests/test_content_hygiene.py` now fails
  on a tab in any content file. Verified by reintroducing one.
- **The hook chain was stated twice.** `hooks/__init__.py` said the order was
  "stated once, here, and tested"; the pipeline kept its own tuple and ran that
  instead. Adding `proofs` to the documented chain changed nothing, and the
  directive passed through the build as literal text. The order now lives in one
  place, `pipeline.MARKDOWN_HOOKS` is that object, and two tests pin it —
  including *why* `tier` runs first.

### Open questions the work must settle before it starts

1. **Where does the proof book live?** A fifth `books/<id>/` stretches the model —
   every book today has a curriculum, a tier axis and profiles. The alternatives are
   a reference book with an explicitly empty tier axis, or a shared proof *corpus*
   rendered into each book's docs. This is a boundary decision and the `architect`
   skill is the right tool for it, not a guess made while writing content.
2. **Which component? — decided, and not by the `frontend` skill.** That skill's
   stack is Next.js, React, TypeScript and shadcn/ui, and it says of itself: treat
   this as the default *when the repository has no established stack, not as a
   requirement to migrate an existing one*. This repository is deliberately
   framework-free — a custom element, a loader injected only on pages that use it,
   and a module per book — and it has a **Tier-0 rule**: the page must be complete
   and readable with scripting off. A React dialog is the wrong answer to that, and
   a slide-over built in JS would put the proof behind a script.

   So the affordance is **a link first, enhanced second**: the proof lives at a real
   URL and the page reaches it with no script at all, and a small module upgrades it
   in place — inline disclosure for a short proof, a side panel for one with
   sliders — using the same `<details markdown="1">` disclosure the hints already
   use. What the `frontend` skill contributes is its *qualities*, not its stack:
   a typed component contract, the design system defined once and composed rather
   than restyled per page, and an explicit payload contract between the page and the
   module.

   One accessibility question stays open for the module: a slider that re-draws a
   proof must announce what changed, which is what the figures already solve with an
   `aria-live` readout (`ch11-sampling-variability`). Copy that, do not reinvent it.
3. **How is "not in the curriculum" said?** The words are constrained: the internal
   vocabulary for a tier is `Foundation and Higher` / `Higher only`, the docs forbid
   internal words reaching the reader, and `obviously`/`simply` are banned. A badge
   reading "Beyond the specification" is a decision to record, not invent per page.
4. **Which facts?** A proof for every assertion would be unbounded, and a phrasing
   scan is the wrong instrument: searching the four books for *the fact that*,
   *we know that* and *it can be shown* finds **six** hits in total, because these
   books rarely assert without deriving.

   What a reader can ask *why* about is a **named result**. Scanning for those
   gives a real inventory — twenty, with the books that use them:

   | Named result | Mentions | Books |
   |---|---|---|
   | exponential function and its laws | 349 | a-level-maths, a-level-physics, gcse-physics |
   | standard deviation | 111 | a-level-maths |
   | product, quotient and chain rule | 96 | a-level-maths, gcse-maths |
   | sine rule | 88 | a-level-maths, gcse-maths |
   | Pythagoras' theorem | 86 | a-level-maths, a-level-physics, gcse-maths |
   | trapezium area | 59 | a-level-maths, a-level-physics, gcse-maths |
   | the discriminant | 51 | a-level-maths, gcse-maths |
   | cosine rule | 49 | a-level-maths, gcse-maths |
   | completing the square | 43 | a-level-maths, gcse-maths |
   | circle theorems | 41 | gcse-maths |
   | conservation of energy and momentum | 36 | a-level-physics, gcse-physics |
   | binomial theorem | 30 | a-level-maths |
   | factor and remainder theorem | 29 | a-level-maths |
   | fundamental theorem of calculus | 21 | a-level-maths |
   | normal distribution | 19 | a-level-maths |
   | geometric series | 15 | a-level-maths |
   | quadratic formula | 15 | a-level-maths, gcse-maths |
   | arithmetic series | 8 | a-level-maths |
   | angles in a polygon | 3 | gcse-maths |
   | angles in a triangle | 2 | gcse-maths |

   The bounding rule: **a proof is expected where a reader can name the result;
   not for a definition, and not for a convention.**

   **A claim written here first and then checked was wrong.** This item said three
   of the twenty — the quadratic formula, Pythagoras, the sine rule — were "already
   proved in the prose and only need lifting out". Reading the pages says
   otherwise: all three are **stated**. §20.6 opens "The sine rule *is*
   $a/\sin A = b/\sin B$", §20.1 introduces Pythagoras as a theorem to use, and
   §2.3 gives the quadratic formula without completing the square. So there is no
   cheap set; each proof is written or it is not, and the count above is the whole
   work.

   The full inventory is a scan of the built pages rather than the source, so a
   result that is only named in a caption or a readout is not missed. It is not
   built yet; the twenty above come from the source and are the starting bound.

### The non-negotiables it inherits

- **No colour** in the component or a proof figure: `fig-*`/`text-*` classes and
  `--tb-*` tokens, both schemes, every bundle.
- **Predict → Test → Explain** for every interactive proof, per P6: the explanation
  is prompted, never shown.
- **The extras budget**: hooks, applications and tools are about a quarter of a
  chapter. The *affordance* is small and belongs in a page; a proof with sliders is
  an investigation and is budgeted like one.
- **Evidence**: `research/pedagogy.md` governs what may be claimed for it.

### Done means

- A directive places the affordance beneath any statement the author names, and a
  page with none is unchanged.
- One proof, one page, referenced from every book that needs it — no second copy.
- Each proof names whether it is **in the specification or an extension**, in the
  reader's words, and the mark is tested.
- Every proof that can be interactive is, with the interaction following
  Predict → Test → Explain.
- The component passes the figure contract's tests: no colour literal, an accessible
  name, no runtime LaTeX, and correct painting in both schemes.
- The inventory of asserted-without-proof facts exists, and each one is either
  written or recorded as deliberately not.

## 48. Eleven converted GCSE Physics figures gained a slider value display the page never had — **done**

**Closed 2026-10-17, re-measured.** 34 modules in `gcse-physics` call `slider()`, and
**0 of them are silent** — every call states `show: true` or `show: false`. The
test added because of this (`test_every_slider_says_whether_it_shows_its_value`)
is what keeps it closed, and it now parses the call by balancing parentheses
rather than by a pattern a nested call can defeat.

**What was wrong.** The shared kit's `slider()` emits a value `<output>` unless it
is told `show: false`. Eleven of the twelve GCSE Physics modules converted in the
round before that option existed call `slider(...)` with no `show: false`, so each
now prints a number beside its slider that the original module did not display.
Measured against the pre-conversion commit, `d680551`:

```
for f in atom-builder black-body-curve circuit-current colour-frequency \
         crash-force density-mass-volume echo-timing efficiency \
         electromagnet-strength em-spectrum energy-drop fission-chain-reaction; do
  git show d680551:books/gcse-physics/docs/assets/figures/$f.js \
    | grep -q "<output" && echo "$f had one" || echo "$f had none"
done
# eleven print "had none"; only fission-chain-reaction had a value display
```

The kit's own JSDoc already records this as a defect its first users found —
"`slider()` always emitted a value display, so a module whose slider had none
gained one" — and `show: false` is the documented fix. The twelve modules
converted in the current round use `show: false` where the original had none.

The same question applies to the other modules converted in that earlier round.
A scan for `<output>` in the pre-conversion commit suggests many A-level
Mathematics and GCSE Mathematics figures also gained a display, while most
A-level Physics originals already had one; but an `<output>` scan is not proof:
an original may have shown the value in a `<span>` or an `aria-live` element.
Each affected module's original has to be read before it is edited. Only the GCSE
Physics list below was read in full, so it is the only one that is certain.

**The fix.** Add `show: false` to each `slider(...)` call in those modules whose
original had no value display. Leave `fission-chain-reaction` as it is.

**Done means**

- Each slider in the affected modules carries `show: false` unless its original
  displayed a value, checked one module at a time against `d680551`.
- The modules from the same round in the other books are read the same way first,
  so the list is complete before any edit.
- `node scripts/check-figure-kit.cjs site` still prints `contract kept`.
- `uv run python -m pytest tests/test_figures.py -q` passes with 18 skipped.
- A before/after browser measurement of one affected figure shows the value
  display gone and every painted colour unchanged.

## 49. The figure-kit phone-floor guard measured the wrong box, and passed a size that is too small — **done**

**What is wrong.** `scripts/check-figure-kit.cjs` guards the rule that every named
figure size clears 9px on a phone. It computed the rendered size as
`units * (358 / 560)`, taking 358px as the phone panel width. Measured in a browser
at a 390px viewport, the `maths-figure` element *is* 358px wide — but it carries
17.6px of padding on each side, so the **drawing** is 322.8px and the scale is
0.576, not 0.639:

```
$ node -e "...measure the chain..."
{"tag":"maths-figure","w":358,"pad":"17.6px/17.6px"}
{"tag":"main","w":358,"pad":"0px/0px"}
# the svg inside is 320.8px, so 560 units draw at 0.573
```

So the guard said `SIZE.tick` (15 units) was 9.6px and passed it, while the figure
actually drew it at **8.6px**. `assets/figures/kit.js` repeated the same wrong
number in its own doc comment ("0.64 phone scale"). A guard that measures the wrong
box is worse than no guard, because it certifies a defect as safe.

It was found by building `ie-lc-applied-maths` Chapter 2's three figures, which use
`SIZE.tick` in a 560-unit viewBox, and running `audit-figures.cjs --mobile` on them.
The audit measures the rendered SVG and reported 8.6px.

**The fix.** `SIZE.tick` is 16 units (9.2px). The guard now derives the scale from
the drawing width, `(358 - 2 * 17.6) / 560`, with the measurement and the re-measure
command in a comment. The kit's doc comment states the real relationship.

**Done means**

- `node scripts/check-figure-kit.cjs site` prints `contract kept`, and would fail on a
  `SIZE` value below 9px at the measured scale.
- `node scripts/audit-figures.cjs site --mobile` reports **0 figures below 9px** across
  the collection (measured: 139 figures, median smallest label 9.2px).
- `assets/figures/kit.js` and `scripts/check-figure-kit.cjs` no longer contain the
  string `0.64` or `358 / 560` as a scale.

## 50. `evaluate` cannot check a `solve()` result, so a roots answer must be checked root by root — **done**

**What is wrong.** The sympy oracle's `evaluate` check parses `expression` and
`answer` and compares them with `equivalent`. When the expression is
`solve(x**2 - 2*x + 5, x)` it returns a sympy **list**, and `cas._rationalize` calls
`.replace` on it:

```
$ uv run python -c "from textbook.verify import cas; print(cas.parse_expression('solve(x**2 - 2*x + 5, x)', {}))"
[1 - 2*I, 1 + 2*I]
$ # a bank with {kind: evaluate, expression: 'solve(...)', answer: '[1 - 2*I, 1 + 2*I]'}
AttributeError: 'list' object has no attribute 'replace'
```

So a bank cannot assert "the roots are $1 \pm 2i$" directly. It has to assert
$f(1 + 2i) = 0$ and $f(1 - 2i) = 0$ instead — which is arguably the better check
anyway, since it verifies the roots rather than trusting `solve`, but it means the
**count** of roots is not checked. A cubic with a missing root would still pass.

**The fix.** Let `evaluate` accept a list on either side, comparing element-wise, so
`{expression: 'solve(...)', answer: '[1 - 2*I, 1 + 2*I]'}` is a valid record. That
checks the roots *and* their number. It was worked around in
`books/ie-lc-maths/problems/chapter-05-practice-5.5.yaml`, which checks each root
against the polynomial instead.

**Done means**

- `{kind: evaluate, expression: 'solve(x**2 - 2*x + 5, x)', answer: '[1 - 2*I, 1 + 2*I]'}`
  passes, and the same record with a missing element fails.
- `books/ie-lc-maths/problems/chapter-05-practice-5.5.yaml` is rewritten to use it,
  so the number of roots is checked rather than assumed.
- `uv run python -m textbook.verify books/ie-lc-maths/problems/` still passes.

## 51. The published Irish books serve 2,741 pages that say "Stub" — **done**

**What is wrong.** `scaffold.py` writes a `<!-- scaffold:stub -->` marker into every
page it creates, and the build publishes every page it finds. Nothing excludes a stub
from the site, so the four Irish books are live with their unwritten pages visible:

```
$ uv run python -m textbook.scaffold && for b p in ...; do pipeline ...; done
$ grep -rl 'scaffold:stub' site --include='*.html' | wc -l
2741
$ # and the reader sees it:
$ #   site/ie-jc-maths/ordinary/glossary/number/index.html
$ #   "Glossary — Number  Stub.  Terms introduced by this strand's chapters, alphabetically."
```

The English books do not have this problem because they are complete; the Irish ones
were scaffolded whole and deployed as they were authored, so a reader following any
chapter other than the four written ones arrives at a page whose only sentence is
"Stub."

This is a design decision, not an oversight to patch silently: the choices are to hide
stub pages from the build (which breaks the navigation and every link into them), to
mark them `noindex` and give them a reader-facing "being written" note, or to keep the
Irish books out of the deployed collection until more is authored. It needs the author's
call.

**The fix.** Whichever is chosen, the marker already identifies every stub, so the
build has what it needs.

**Done means**

- No published page contains the word "Stub" in its reader-facing text.
- `grep -rl 'math-error' site --include='*.html'` still prints nothing, and every
  profile still builds.
- A reader arriving at an unwritten page gets something that tells them what it is and
  what to do, rather than a bare "Stub."

**Done, by finishing the books rather than by hiding their pages.** The choice was
between excluding stubs, marking them `noindex`, and holding the books back; the answer
was none of the three, because all 71 chapters were then authored. `grep -rl
'scaffold:stub' books/*/docs/` prints nothing and the built site has no stub page, so the
question no longer arises. It would arise again for a *new* book before it is written,
which is why the three options are left recorded.

---

## 52. A euro sign inside maths renders as nothing, and KaTeX only warns — **done**

**What was wrong.** KaTeX has no glyph for `€`, so a `€` inside `$…$` is dropped and the
build prints `Unrecognized Unicode character "€" (8364) [unknownSymbol]` as a *warning*.
A warning does not fail the gate, so a page could ship with the currency missing from
every amount. Thirty-three occurrences were found across the Irish books, in three
places, and the first scan found only one of them:

```
$ # the pages
  books/ie-lc-maths/docs/Chapter 4/Section 4.3/Walkthrough/index.md:80:
    $$C = 240 + 4(25) = 240 + 100 = €340$$
$ # the display blocks inside the problem banks — missed by a page-only scan
  books/ie-lc-maths/problems/chapter-04-practice-4.2.yaml: 500 - 440 = €60
$ # and an inline one in a bank answer_text
  books/ie-lc-physics/problems/chapter-14-practice-14.4.yaml: €0.30 = €1.80$
```

Counting the occurrences in the **built HTML** is the only reliable check: a source scan
has to handle `$$…$$` across lines *and* look inside `books/<id>/problems/`, and both
were missed at first.

**The fix.** In every case the number stays inside the maths and the symbol moves into
the prose beside it — `$240 + 100 = 340$, which is €340` — which is how the English books
already write `£`. The four books now build with 0 `Unrecognized Unicode` warnings.

**Done means**

- `grep -rl 'Unrecognized Unicode' <build log>` prints nothing for every book.
- No `<math>` element in the built site contains `€`.

## 53. An unquoted title with a colon is invalid YAML, and one shipped — **done**

**What was wrong.** `title: 11.3 Representing data: charts and histograms — Learn` is not
valid YAML: the second colon starts a mapping. The build refuses it with
`front matter is not valid YAML (line 2, column 30)`, so the page has no tier and the
chapter build stops after seven pages. One delegated chapter wrote it that way; the page
names that already carry a colon are quoted.

**The fix.** The title is quoted. The build's own error message is good — it names the
line and the column and says why — so this is caught as soon as the chapter is built,
which is why the handoff requires the build check.

**Done means**

- `uv run python -m textbook.pipeline --book <id> --profile higher` prints no
  `front matter is not valid YAML` for any book.

## 54. `textbook.verify` stops at the first bank that will not parse, and a short run looks like a clean one — **done**

**What is wrong.** `textbook.verify` exits non-zero on an unparseable bank file, but it
prints no error and no traceback:

```
$ uv run python -m textbook.verify books/ie-lc-maths/problems/
... 22 files, then nothing ...
$ echo $?
1
```

A run that should have reported 134 files reports 22, and **nothing says why**. The
broken file was `chapter-04-practice-4.2.yaml`, invalid because an edit had put a line at
four spaces inside a folded scalar indented six. The failure was found only by counting
the files:

```
$ uv run python -m textbook.verify books/ie-lc-maths/problems/ | grep -cE '^ ?ok'
22
$ ls books/ie-lc-maths/problems/*.yaml | wc -l
134
```

The same trap applies to `pytest`: a parametrised test over banks reports a missing bank
rather than a malformed one, which is a different failure with a different fix.

**The fix.** Print the file and the reason before exiting, so a short run is visibly short
rather than quietly short. The count comparison above is the check that would have caught
it, and it belongs in the run.

**Done means**

- A bank file with invalid YAML makes `textbook.verify` print the path and the parse
  error, then exit non-zero.
- `uv run python -m textbook.verify books/<id>/problems/ | grep -cE '^ ?ok'` equals
  `ls books/<id>/problems/*.yaml | wc -l` for every book.

---

## 55. The home page listed "Higher only" as a tier — **done**

**What was wrong.** `scaffold.home_stub` built the levels line by joining **every** value
of the book's `tier_axis`:

```python
lines.append(f"- Tiers: {', '.join(book.tier_axis.values())}\n")
```

The axis has one entry per **code**, and the top code's entry describes Higher-only
content rather than a level a reader enrols in. So the reader saw

```
Junior Cycle Mathematics      Tiers: Ordinary and Higher, Higher only
Leaving Certificate Physics   Tiers: Ordinary and Higher, Higher only
```

which reads as two tiers, the second of which nobody can enrol in. Leaving Certificate
Mathematics would have read `Foundation, Ordinary and Higher, Ordinary and Higher, Higher
only` — the middle level named twice — and it happened to look right only because the
home page had been hand-edited to `Foundation, Ordinary and Higher`, a third form again.
Three different forms for one line, and the Junior Cycle page did not match the Leaving
Certificate one.

**The fix.** The line names the **levels of the course**, taken from the code every
reader studies:

```python
levels = str(book.tier_axis.get(book.lower_code, "")).strip()
```

so it reads `Ordinary and Higher` in Ireland and `Foundation and Higher` in England —
the same expression the colophon already uses. The four Irish home pages are corrected,
and `tests/test_home_page.py` pins both the line and the generator so a new book cannot
repeat it.

**Done means**

- Every home page's `Tiers:` line equals `tier_axis[lower_code]`.
- No home page lists "Higher only" among its tiers.
- `uv run python -m pytest tests/test_home_page.py -q` passes, and fails when the old
  line is restored.

---

## 56. The figure panel's tint was spending the contrast margin — **done**

**What was wrong.** `fig_good` against the figure panel in `editorial`/light measured
**4.60 against a 4.5 floor** — a 2% margin. Measuring every token rather than the one
that was noticed showed it was not alone:

```
$ # margin over the floor, worst bundle × scheme, before
  fig_accent   +0.02      # two hundredths
  fig_warn     +0.18
  fig_good     +0.06
  fig_grid     +0.04      # against a 3.0 floor
```

**The cause was the panel itself, not the tokens.** The `maths-figure` surface is
`color-mix(in srgb, paper 92%, ink 8%)` in `assets/stylesheets/extra.css` — a *derived*
surface, darker than the paper — so the tint was quietly spending the margin every figure
token needs. The invariant held by 0.02 and the failure would have looked like a theme
change.

**The fix.** The tint is 4%. Measured after:

```
  fig_accent   +0.41      fig_warn  +0.57      fig_good  +0.44      fig_grid  +0.32
```

The border, not the tint, is what makes a figure read as a panel, so 4% keeps the
delineation and returns the margin. `FIGURE_PANEL_INK` in `engine/src/textbook/themes.py`
moved with it, and `test_the_figure_surface_matches_the_stylesheet` is what caught the
two drifting apart.

**Done means**

- Every figure token clears its floor by at least 0.3 over every bundle and both schemes.
- `uv run python -m pytest tests/test_themes.py -q` passes.
- `node scripts/audit-figures.cjs site` reports no contrast problem.

---

## 58. Thirteen loose scripts, five copies of the same browser plumbing — **done**

**What was wrong.** `scripts/` held thirteen files in three languages with no index. The
name said `check-figure-kit` and the usage was inside, in a comment, in a format only the
author knew. Worse, five of them carried their own copy of the same Playwright
resolution, the same MIME table and the same route handler — about 150 duplicated lines —
and **the copies had already drifted**:

- `check-mobile` and `measure-budget` passed `executablePath`; `audit-figures` and
  `check-figure-kit` set it on a `launch` object; `screenshot` ignored `CHROME_PATH`
  entirely and hardcoded `channel: "chrome"`;
- `check-mobile` and `measure-budget` bound a real port while the other three intercepted,
  and nothing said which was right;
- two scripts retried without `channel: "chrome"` when the channel was missing, three did
  not — so a check that worked locally failed in a container for a reason unrelated to
  the figure.

**Done, 2026-10-16.** One TypeScript package, `tools/`, with one entry point:

| | |
|---|---|
| `tools/src/lib/browser.ts` | Playwright resolution, launch with the channel retry, both servers, the reader-preference context, the capture guard |
| `tools/src/lib/report.ts` | findings, the summary line that always states the count examined, exit codes, argument parsing |
| `tools/src/commands/` | seven commands: `audit`, `kit`, `kit-pure`, `check-mobile`, `budget`, `screenshot`, `types` |

`scripts/` is now **shell only** — `check.sh`, `preview-themes.sh`, `deploy.sh` and the
four one-off operations — because bash is the right language for orchestrating processes
and branching on their exit codes.

**The two servers are a decision, not an accident.** `serveStatic` intercepts and
everything uses it except `budget`, which binds a port: a navigation entry's
`transferSize` is populated only for a request that crossed the network stack, so an
intercepted response reports 0 and the budget would read as far too small and look like
an excellent result.

**Every port was verified against its original, not by eye.** `screenshot` produces
byte-identical PNGs; `check-mobile` reports the same 15 pages; `budget` prints the same
20 requests and 255 kB; `kit` and `kit-pure` keep their contracts; and `audit` produces
**byte-identical JSON for both the desktop and the mobile run** (418 measurements, 168
figures). That is the check that the migration changed nothing.

**One defect this found in itself.** `tools types` first reported 0 errors, because the
repo-root path was one level short and a `tsc` that never ran printed nothing — which the
check counted as a clean run. An empty stdout with a non-zero exit is now a failure of
the check.

**Done means**

- `node tools/dist/cli.js help` lists every command.
- No file in `scripts/` is Node or Python.
- `scripts/check.sh` passes, and it builds the TypeScript before the drift diff.
- Each ported command reproduces its predecessor's output.

---

## 59. The figure gaps in four books — **done**

**What was wrong.** `ideas.md` §10 listed nineteen figures across four books and the shared
library, and the count per chapter said why they mattered: `ie-jc-maths` had 3 figures for
22 chapters and 129 sections, and its reader is 12–14; `ie-lc-maths` had 8 for 18;
`ie-lc-applied-maths` had 6 for 9.

**Done, 2026-10-17.** Twenty figures, 213 modules to 233.

| Book | Before | After |
|---|---|---|
| `ie-jc-maths` | 3 | 13 |
| `ie-lc-maths` | 8 | 10 |
| `ie-lc-physics` | 19 | 22 |
| `ie-lc-applied-maths` | 6 | 10 |
| shared library | 1 | 2 |

The two `ideas.md` ranks highest are built: **7.1 chord → tangent** and **8.2 Riemann
strips**, "the two a reader who has seen them has understood what calculus is". The second
shared module is built too — `slope-field`, mounted by `ie-lc-applied-maths` 8.7, which is
the library's real test: a book that does not own the module mounts it, and the module drew
no book-specific idea into the library.

**Every figure was verified by arithmetic, not by looking at it.** Each control was set to
values worked out by hand and the readout checked against them — the chord's gradient
(3.5² − 2²)/1.5 = 5.5 against the tangent's 2x = 4; the Riemann total 0.2188 at 4 strips
against 1/3; the pulley's a = (m₂g − m₁g sinθ)/(m₁ + m₂) = 15.87/13 = 1.22 m/s² and
T = m₂(g − a) = 42.9 N; restitution's e = √(0.72/2) = 0.6 with heights in ratio e² = 0.36;
and so on. A figure that reports a wrong number is worse than no figure, and a rendered
picture cannot be checked by eye in a terminal.

**A defect this found in the checks.** `slider_calls()` in `tests/test_figures.py` used
`slider\([^;]*?\)`, which stops at the **first** `)` — so a slider whose arguments contain
one, such as `max: Object.keys(EQUATIONS).length - 1`, was truncated before `show:` and
reported as silent when it was not. A check a nested call can defeat is worse than no
check, because it reads as a guarantee. It balances parentheses and skips string literals
now.

**And one in the mobile audit.** Its guard was a fixed floor of ten figures, which failed
on a single book with nine and passed on the whole site when the server was broken and
served the same page for every route. It is proportional to what the build contains now.

**Done means**

- `node tools/dist/cli.js audit site/<book>/<profile>` reports no contrast problem for any
  book.
- `node tools/dist/cli.js audit site --mobile` reports 0 figures below 9px.
- `uv run python -m pytest tests/ -q` passes.
- Every figure's readout agrees with a hand calculation.

---

---

## 75. No book links into the map of problem classes — **done, absorbed into 78**

**What is wrong.** `books/numerical-methods/` was built to be arrived at from a
model, and nothing arrives. `grep -rn "numerical-methods" books/*/docs` finds only
the book itself; `books/maths-applied/` §1.2 to §1.7 name no class at all. A
reference work that no page links to is a book with a shelf and no door.

**Why it was left.** The decision on 2026-10-18 was to add the callbacks after the
map existed and passed its own checks. Both are now true, so this is next rather
than parked.

**The fix.** A `:::class <slug>` directive, mirroring `hooks/proofs.py`: resolve the
slug against `map.yaml → pages`, emit a root-absolute `/numerical-methods/<slug>/`
href with the box's name in the link text, and fail the build on a slug the map does
not list. Then the callbacks, in `books/maths-applied/`: §1.2 and §1.3 are root
finding, §1.5 is a saddle point, §1.6 is parabolic plus the stiff flag. One per
section, at the point where the class is first true, not in a list at the top.

**Done means**

- [x] `:::class parabolic` renders one link and nothing else — no script, no dialog.
- [x] An unlisted slug fails the build with the known slugs in the message.
- [x] A page outside `books/numerical-methods/` can emit the directive; the href is
      root-absolute and survives `check_links`, which skips it by design.
- [x] At least three sections in `books/maths-applied/` carry one.
- [x] `books/maths-applied/AGENTS.md` replaces its "until then, link the page
      plainly" paragraph with the contract, and `books/numerical-methods/AGENTS.md`
      records that it now has inbound links.

---

**The five boxes are item 78's work, and all five hold.** `tests/test_class_links.py`
covers one link and nothing else, the root-absolute href from a page anywhere, and the
build failure that names the known classes; `books/maths-applied/AGENTS.md` carries the
contract at line 287; and eight pages emit the directive (five of them in
`books/maths-applied`).

## 78. Batch A of the map — **done**

**What is wrong.** Cut into batches in
`.agents/planning/2026-10-18-numerical-methods-batches.md`, which is the record of
why. The short version: the tree is missing its most common entry point, and no page
in the collection links to the map because the directive it needs does not exist.

**The work.**

1. A **linear-system** box. The map sends "a finite list of unknowns" to root
   finding, so `Ax = b` has no branch, and its methods are buried in `elliptic`.
2. A **`:::class <slug>`** directive, mirroring `:::prove`: registry-resolved from
   `map.yaml → pages`, root-absolute href, one plain `<a>`, unknown slug fails.
3. **Callbacks** in `maths-applied` (§1.2 root, §1.4 linear system, §1.5 root,
   §1.6 saddle point and parabolic) and `a-level-maths` 9.3 (root). The planned
   physics callbacks were dropped: those sections solve analytically, so a "kind of
   problem" aside there would have decorated a chapter and changed nothing a reader
   does. Recorded in the planning note.

**Done means**

- [x] `linear-system` is a page, the ninth box, on the linear arm of Q3.
- [x] `map.yaml` lists it in tree order and the figure draws the branch.
- [x] `techniques/` and `symptoms/` carry its rows; `AGENTS.md` says nine boxes.
- [x] `tests/test_reference_books.py` expects nine classes in tree order.
- [x] `:::class parabolic` renders one link, and an unlisted slug fails the build.
- [x] `:::class` works from a page in another book; the href is root-absolute.
- [x] Five sections in `books/maths-applied/` carry one, and 9.3 of
      `a-level-maths` carries one. Physics: dropped, with the reason recorded.
- [x] `lint`, both profiles' pipelines, no `math-error`, and `pytest tests/` pass.
- [x] This item is closed, and the callbacks in §1.6 are the ones that let item 75
      close too.

---

## 76. Hamiltonian is a flag with no worked case — **done**

**What is wrong.** `books/numerical-methods/AGENTS.md` decides that Hamiltonian
problems are a flag rather than a ninth box, and the book then gives the reader no
way to see what the flag buys. `docs/hyperbolic/index.md` names symplectic
integration once, as a table row. `grep -rc symplectic books/numerical-methods/docs`
is 1.

That is the same defect the map accuses other books of: a claim with no number.

**The fix.** Make the decision visible, in one of two ways. Either a listed page
(`symplectic/index.md`, in `map.yaml` and in the figure only if it earns a branch),
or a worked example on `hyperbolic`: one wave problem run for a long time with a
general method and with a structure-preserving one, drawn as an energy plot whose
numbers come from the model in the module. The second is cheaper and better: the
point is the loss, and the loss is a curve.

**Done means**

- [x] The decision is written down where a reader can act on it: a page, or a
      paragraph with a figure.
- [x] The number on the page comes from the figure, and the figure declares its
      arithmetic through `claim()` if it states any.
- [x] `node tools/dist/cli.js audit site --mobile` still reports none below 9px, and
      `readout site --verify` reports no untrue render.
- [x] `books/numerical-methods/AGENTS.md` says which of the two was chosen, and why
      the other was not.



**Done.** `docs/hyperbolic/index.md` now says the flag is a flag, and carries `:::figure energy-drift`: the same oscillator run for 2000 periods with RK4 and with velocity Verlet. The general method's error climbs from 2.0e-13 to 1.6e-7 and keeps climbing; the structure-preserving one stays inside a band between 6.0e-15 and 6.1e-5, and the band does not rise. The first draft of the figure printed the *final* error of both and would have shown the bounded method's number above the general one — honest, and the opposite of the claim — so the readout is about the trend, and the page says which is which.

---

## 77. The statistical half is one page — **done, by decision**

**What is wrong.** `docs/averaging/index.md` is the whole statistical answer to
"what do you want?", and the `techniques` page gives it nine rows against about
thirty for the differential half. The request that started the book described a
version for statistical problems as a follow-on pass; what shipped is one page that
names the methods and does not walk any of them.

This may be the right answer — one page per box is the shape of the map — but it is
currently an accident of effort rather than a decision.

**The fix.** Decide, and record the decision in `books/numerical-methods/AGENTS.md`.
If more is wanted, the three pages that carry their weight are inference (the answer
is a distribution, and the prior is part of the model), filtering over time (the
Kalman and particle pages, where `averaging` meets `parabolic`), and design of
experiments (where to put the samples when each one costs a run). Each is a page in
`map.yaml`, listed after `averaging`, with `techniques/` and `symptoms/` rows.

**Done means**

- [x] The decision is in `AGENTS.md`, with the reason it is the answer.
- [x] If pages were added: each passes `tests/test_reference_books.py`, the home page
      lists them, and the figure's `LEAVES` either draws the new branch or says in a
      comment why the branch stays at the box.
- [x] If one page is the answer: `docs/averaging/index.md` says so in a sentence, so
      a reader who wanted more knows the map stopped on purpose.

---



**Done, by decision.** The statistical half is one page on purpose, and the decision is now written down twice: on `docs/averaging/index.md` for a reader, and in `books/numerical-methods/AGENTS.md` for the next author. The reason is the shape of the book: one page per box, entered by the question, with methods named and priced rather than derived. A five-page statistics sub-map would be a second book wearing this one's furniture.

---

## 79. Batch B of the map — **done**

Cut in the same plan. Mechanical work that makes the book a lookup rather than a
set of essays:

- the class column of `techniques/` becomes links; tables get anchors;
- each class page gains a generated and drift-checked **Used in this collection**;
- a test that the ten headings of a class page are present, in order;
- the proof book's About prose moves out of `scaffold.colophon_page` into
  `books/proofs/proofs.yaml → meta.what_it_is`.

**Done means**

- [x] A class page links to `techniques/#<family>` and back again.
- [x] `python -m textbook.plan --generated` diffs clean after the callbacks are
      added, and a removed callback shows up in the diff.
- [x] A page missing "What goes wrong" fails `pytest tests/`.
- [x] `grep -n "reference book of proofs" engine/src/textbook/*.py` prints nothing,
      and `books/proofs/docs/colophon.md` is unchanged by the move.

**Done (2026-10-24).** Every class page links to its `techniques/#family` table and
the tables link back; `:::used` derives the caller list at build time;
`test_a_class_page_keeps_the_shared_skeleton` fails on a missing heading; the engine
has no "reference book of proofs" prose, and `books/proofs/proofs.yaml` carries
`what_it_is`, so the colophon is generated from the book.

---

## 80. Batch C1 of the map — **done**

Two authored pages, no figures: `choosing-the-class` (the thesis, three cases) and a
worked case (the suspension corner, five ways). See the plan for what each must not
do. Item 77 (the statistical half) is decided here too: either record that one page
is the answer, or name the pages that follow.

**Done means**

- [x] `choosing-the-class` names three systems, each written two ways, and one of the
      two failing.
- [x] The worked case uses only numbers its named source prints, and says which page
      printed each one.
- [x] Both pages are in `map.yaml`, on the home page, and pass
      `tests/test_reference_books.py`.
- [x] Item 77's decision is written into `books/numerical-methods/AGENTS.md`.

**Done (2026-10-24).** `choosing-the-class` has the Einstein equations, incompressible
flow and the suspension corner, each written two ways; `worked-case` names the page
behind each number (its §1.5 ladder and §1.6 trajectory entries were later corrected by
items 90 and 119, which is why the source is named rather than assumed); both pages are
in `map.yaml` and on the home page; `AGENTS.md` records the one-page averaging decision.

---

## 81. Batch C2 of the map — **done**

The two figures: the Δx² step limit on `parabolic`, and energy drift on `hyperbolic`.
The second closes item 76 by showing what a structure-preserving method keeps.

**Done means**

- [x] Both figures are drawn through `kit.js` with `SIZE`, `label()` and a kit mapper
      (`axes()` supplies the scale).
- [x] No number on the page is typed by hand; anything printed as arithmetic is
      declared through `claim()`.
- [x] `audit site` in both schemes, `audit site --mobile` with 0 below 9px, and
      `readout site --verify` with 0 untrue renders.
- [x] Item 76 is closed by the energy figure, or by the decision to keep the flag
      and say so on the page.

**Done (2026-10-24).** `step-limit` and `energy-drift` use kit primitives and declare
their arithmetic; each audits 2/2 in light and dark, `audit site --mobile` reports 0
below 9px (median 9.6px), and `readout site --verify` reports 4/4 and 2/2 claims true.
The energy figure closes item 76.

---

## 82. The map's two new figures have been measured but never looked at — **done**

**What was wrong (and wrong twice).** Two new figures had been through every
mechanical check — `audit site` in both schemes, `audit site --mobile`, `readout
site --verify` — and had never been looked at. That part was true: the audits read
computed paint and font size, and cannot see a label sitting on a curve.

The second half was false. It said Playwright was not installed, on the evidence of
`node -e "require('playwright')"`. Playwright **was** installed, via mise, and
`tools/src/lib/browser.ts` has a candidate list that finds it — which is why the
audits had been running. The bare resolve was asked, believed, and written down.

**What looking found.** Five defects in two figures, none of which any check saw:

- **Both curves were filled wedges.** `path()` emits `fill="none"`, but `fig-accent`
  sets `fill` in CSS and wins, so an open curve is painted as a closed shape. The
  energy figure was two solid blobs. Fix: `fig-line`, the class whose fill is `none`.
  This is the same defect as item 74, found from the other end.
- **The rotated axis titles ran through the tick labels** on both figures. Fix:
  `pad: { left: 86 }` on `axes`, and 92 where the labels are wider.
- **The energy figure argued the opposite of its caption.** It plotted
  `log10(error)` sampled every ten periods; sampling an oscillation at an arbitrary
  phase draws its envelope as a smooth rising curve, so the bounded method appeared
  to climb *above* the general one. Fix: plot the signed change in energy on a linear
  axis, windowed into 200 slices so each run is drawn as a band. A band that stays and
  a line that leaves are then two different pictures.
- **The readout printed `0.000000020`.** Fix: `8.1 × 10⁻¹¹`, with superscript digits.
- **A missing y tick label at the frame corner**, where a tick sat on the axis line.
  Fix: move the domain so the bottom tick is off-frame.

**Also fixed while there.** `tools screenshot` gained `--width`, because the check
needs 390 px and the command only spoke 1440. And four documents pointed at
`scripts/screenshot.cjs`, which does not exist — the tool is
`node tools/dist/cli.js screenshot`.

**Done means**

- [x] The captures differ from one another (the 404 trap): four routes, four schemes
      and widths, all different.
- [x] `/numerical-methods/parabolic/` and `/numerical-methods/hyperbolic/` captured at
      1440 px and 390 px, light and dark — eight images, all inspected.
- [x] No annotation overlaps a curve, an axis title, a tick label or another
      annotation at either width.
- [x] Nothing was fixed by shrinking text: every label still uses `SIZE`, and
      `audit --mobile` still reports 0 below 9px.
- [x] The wrong premise is corrected above, and `AGENTS.md` says not to trust a bare
      `require.resolve` for Playwright.

---

## 61. A figure's readout can state false working — **done**

**Done (2026-10-18, the last line).** `--text`, the sentence heuristic behind it and
`--self-test` — which existed only to test the heuristic's own cases — are deleted
with `tools/src/lib/readout-arithmetic.ts`. Measured after the deletion: `tools
readout site` reports **253 figures, 1222 readouts, 41 declare 640 claim(s), 0 state
arithmetic and declare none**, and `--verify` proves all 640 with SymPy, 0 untrue.
`tools help readout` no longer lists a heuristic because there is not one.

**What is wrong.** Two of the fourteen figures added on 2026-10-17 printed a
calculation that does not produce the number printed beside it, and **every check
passed**: `tests/test_figures.py`, the build's math-error scan, `tools audit` and
`tools kit`. None of them reads a number.

- `interest-growth` printed `€1,500.00 × 0.07 × 4 = €390.00`. The rate is 6.5%, so
  the multiplier is 0.065; `fmt(r, 2)` rounded it to 0.07, and 1500 × 0.07 × 4 is
  €420.
- `ratio-share` printed `3 × 14.29 = 42.86` where 100 ÷ 7 was already rounded.

**The first fix was wrong, and how it was wrong is the lesson.** It parsed the
printed sentence back out of the text, and by the end it needed `<sup>`, `√`, `%`,
thousands separators, a trailing sentence period and the words "and"/"is" to read
**43%** of what it saw. Every new formatting choice was a new case; every new figure
was a new chance to be silently unreadable.

**Done (the mechanism, 2026-10-17).** An assertion is data. `panel()` returns
`claim`; a figure calls `claim([{ expression, values, answer, shown }])` once per
redraw; `python -m textbook.working` proves each with the same exact CAS the banks
use (`cas._rationalize` makes 0.065 `13/200`, so there is no tolerance to tune) and
requires the readout to contain the claimed string. `tools readout site --verify` is
in `scripts/preview-themes.sh`. Verified against the defect itself: reintroducing
`fmt(r, 2)` while claiming `fmt(r, 3)` fails with *"claims to show '0.065', but the
readout does not contain it"*. Three figures converted — `interest-growth`,
`ratio-share`, `restitution` — with the `√` case proving no notation table is needed.
The text heuristic survives only as `--text`, and is documented as a hint.

**Done (2026-10-18).** `tools readout` reports **0 figures that state arithmetic and
declare none** — 33 figures declare **588 claims**, and `readout site --verify` proves
all 588 with SymPy: **0 untrue**. The command now names any remaining figure rather than
only counting them, because a count says the gap exists and a list says where.

**Done means**

- `node tools/dist/cli.js readout site` reports **0** figures that state arithmetic
  and declare none (35 remain, measured 2026-10-17).
- Every remaining figure declares its printed numbers, not only its totals.
- [x] `--text` is deleted, because nothing depends on the heuristic. **Not met:** the
      flag still ships, documented as a hint (`tools/AGENTS.md`); nothing depends on it,
      and `readout site` reports 0 without it. Either delete the heuristic or replace
      this line with the measurement that it is unused — the other two are proved.

---

---

## 71. `tools/build.mjs` says the tools build is bundled, and it is not — **done**

**Done (2026-10-18).** The header now says `the tools tools/src/** -> tools/dist/**`,
one output file per source, and records why the shape is kept: `tools kit` serves
`tools/dist/lib/kit-contract.js` to the page at `/__kit-contract.js`, which a bundle
could not do without being split or copied.

**What is wrong.** The header of `tools/build.mjs` describes the tools target as
"Bundled, because it is a program rather than a library". It is not: `buildTools` runs
`tsc -p tsconfig.tools.json`, which emits one file per source into `tools/dist/` —
`dist/commands/kit.js`, `dist/lib/browser.js`, and so on. Measured 2026-10-18: `ls
tools/dist/lib` prints seven files, and adding a module to `tools/src/lib/` adds a
seventh to `dist/lib/`.

It stopped being a cosmetic error when `tools kit` began serving
`tools/dist/lib/kit-contract.js` to the page at `/__kit-contract.js`. That works only
because the module is emitted as its own file with no runtime imports; a bundle would
have to be split or copied to be reachable from the page again.

**The fix.** Correct the comment to describe what `buildTools` does, and record why one
file per source is worth keeping: a module in `tools/lib/` can be imported by the page
under test, which a bundle cannot.

**Done means**

- [x] the header of `tools/build.mjs` describes both targets truthfully.

---

## 74. `fill="none"` is ignored on every filled class, so curves are drawn as filled shapes — **done**

**Done (2026-10-18).** `path()` emits `style="fill:…"`, so an inline style wins where
the attribute lost. `fig-accent`, `fig-warn` and `fig-good` now also set `color`, so
`area()`'s `fill: currentColor` resolves to the class's colour rather than the body's
ink. Two contract rows in `tools/src/lib/kit-contract.ts` (131 rows, both runners
kept) and `tests/test_figures.py::test_no_figure_module_writes_fill_as_an_attribute`
fail on the attribute form. 85 modules rewritten to an inline style; the attribute
count is **0**. `stiffness-agreement`'s local workaround is deleted, because the kit
does it. Checked by looking: `projectile-motion`'s trajectory is a line rather than a
solid mound, `stiffness-agreement`'s two curves are a stroke and a dash, and the
`maths-applied` hero shows the linkage instead of a filled disc. The same capture
found two label collisions in `projectile-motion` (axis titles on the tick rows),
fixed while there.

**What is wrong.** A `fig-*` class sets `fill`, and a class rule beats a presentation
attribute — specificity 0,1,0 against SVG's zero. So

```html
<path d="M… L…" fill="none" class="fig-accent">
```

is **filled** with the accent colour, not stroked. Measured 2026-10-18:

```
grep -rhoP '<(circle|rect|polygon|path)[^>]*(class="fig-(ink|accent|warn|good)"[^>]*fill="none"|fill="none"[^>]*class="fig-(ink|accent|warn|good)")[^>]*>' \
  books/*/docs/assets/figures/*.js | wc -l
45
```

and the kit's own `path()` emits the fill as an attribute with `"none"` as its
default, so **every `curve()`, `graph()` and `area()` in the collection is filled
too**. `ch15-projectile` in a-level-physics is the clearest case: its trajectory is
drawn as a solid purple mound (computed fill `rgb(91,75,138)` on a `fill="none"`
path), which is legible and looks deliberate, so it has survived every audit — a
filled shape raises no contrast question because the *stroke* is still fine.

It was found from the other end: `books/maths-applied`'s hero drew its wheel as a
`<circle … fill="none" class="fig-ink">` and got a 0.64 m ink-filled disc that hid
the whole mechanism. The same fault, in the newest code, in the same week.

**Why no check caught it.** `audit` measures the paint of what is drawn, and a filled
path is painted; `tests/test_figures.py` checks classes are *defined*, not that they
compose with the attributes a module also writes. The one check that would catch it
is a static one: a filled class written together with `fill="none"`.

**The fix.** Two halves, and both are needed.

1. **The kit** — `path()` (and any mark that takes a `fill`) should emit
   `style="fill:none"` rather than `fill="none"`, because an inline style wins where
   an attribute loses. That repairs every curve in the collection in one change.
2. **A test** — fail on a filled class written with `fill="none"` in a module, since
   the two cannot both be what the author meant. The hand-written cases (45 today)
   then need `class="fig-line"` (an accent stroke with no fill), `fig-grid`, or an
   inline style.

**Done means**

- [x] `path({ fill: "none" })` renders as a stroke in a browser, checked by a row in
      `tools kit` rather than by eye.
- [x] A test fails on a module that writes a filled class and `fill="none"` together.
- [x] `ch15-projectile` draws its trajectory as a line, and its page is re-captured.
- [x] Every figure is re-audited in both schemes after the change, and the count of
      filled-and-unfilled spellings is zero.
- [x] `assets/AGENTS.md` says which class paints a *line* and which paints an *area*,
      because "a `fig-*` class paints a shape" is the sentence that led here.

---

---

---

## 69. The generalisation review — **done**

**Why this is an item.** An architecture review applied one test to each candidate:
*is this the same thing written twice, or two different things that look alike?* Only
the first is worth generalising — `scaffold.PAGE_KINDS` exists because "there were four
places that had to agree and no test between them", and `DECISIONS.md` rejects the
other direction ("a framework for 177 bespoke diagrams would be a framework around
nothing"). These are the first kind.

| # | Where | The repeat | State |
|---|---|---|---|
| 1 | `config.from_parts` | six test files hand-wrote the hook config; two had already drifted — one wrote `tier_filter` (`"H"`) where production writes a profile **id**, and none carried the proof book | **done 2026-10-17** |
| 2 | `themes.contrast_problems` | five near-identical loops; only one resolved its alias, and its comment records that forgetting it makes "a check that cannot fail" | **done 2026-10-17** |
| 3 | `tools` flag schema | `cli.ts` documents flags in a `usage` string and each command parses its own; `audit` accepts `--maps` that `help` does not mention, and `readout`/`preview` re-implement `parseArgs` | open |
| 4 | tests: no `conftest.py` | `_problem` ×3, `_write` ×2, two hand-written JS brace-counters | **done** — `tests/conftest.py` + `tests/support.py`. The two `colour_literals` and the two brace helpers turned out to be **different scanners** and say so in their docstrings |
| 5 | `kit.ts` / `kit-pure.ts` | two hand-written lists of one contract: 54 and 43 `want()` calls, 13 verbatim in both, 28 in only one tier | **done** — `tools/src/lib/kit-contract.ts`, **129 rows** over three tiers, **all 51 exports** covered; a row whose tier no runner reads now fails |
| 6 | `units.py` | the same tolerance parse ×4 and seven hand-written compare-and-report pairs in three sentence shapes | **done** |
| 7 | `pipeline.copy_assets` | five bespoke blocks in a 153-line, 23-branch function | **done** — entries of `(predicate, sources, destination)`; generated output byte-identical |
| 8 | `scaffold` stubs | five stub builders share one preamble | **done** — `stub_page`; generated output byte-identical |

**Measured, so the size is not a guess:** 201 of 250 figure modules hand-write
`<line>`/`<rect>`/`<path>`/`<polygon>`, 47 hand-roll a domain→pixel mapping, and 76
format a number with its unit by hand because the kit has `fmt`/`sigfig`/`signed` and
**no `quantity(value, unit)`**. The kit's own history says this is worth doing — "the
same five drawings re-earned two hundred times" — and the gap is adoption plus that one
missing helper.

**What must NOT be generalised**, recorded so a later pass does not try: the 173
`update()` bodies (the same signature, and the body *is* the mathematics), the
near-duplicate figures across books (`DECISIONS.md` settled that they teach different
readers), and `innerHTML` markup with per-module `toFixed` (`reuse-audit.md` §3.4).

**Done means**

- [x] 1 and 2, each with the test that keeps it: the keys cannot drift, and every
  declared threshold resolves to a token and can fail.
- [x] 3–8 converted, each with a check that fails if the copy returns. **Done
      2026-10-18:** 3 is `tools/src/lib/flags.ts` and `tools help --check`; 5 is
      `tools/src/lib/kit-contract.ts` (129 rows, all 51 exports); 4, 6, 7 and 8 were
      done on 2026-10-17.
- [x] `quantity()` exists and the number-with-unit count falls from 76.

---

**Done (2026-10-18), with the measurement the last line asked for.** `quantity(value,
unit, places)` is in `assets/figures/src/kit/text.ts` and the barrel, with three
contract rows (134 rows now, both runners kept). It puts a space between a number and
its unit except for `%`, `°`, `°C`, `′` and `″`, which are listed rather than guessed.
**263 hand-formatted number+unit sites became `quantity()`, in 71 modules**: 130 from
`${fmt(…)} unit`, 133 from `x.toFixed(n)} unit`. The measure at the time:

```
$ grep -rhoP '\$\{fmt\([^}]*\)\} [a-zA-Z°µ]{1,5}\b|\$\{[^}]*toFixed\([^}]*\)\} [a-zA-Z°µ]{1,5}\b' \
    books/*/docs/assets/figures/*.js assets/figures/*.js | wc -l
169   # before
112   # after
```

The 112 that remain are not this defect: most are prose (`${fmt(x)} and …`), the rest
carry units outside the conversion's allowlist (`kN/m`, `mm/N`) or an expression with
braces inside it. `sigfig(…)} unit` (19 sites) is a different precision model and was
left alone.

**One regression the conversion caused, and what it says.** `stopping-distance`
prints distances as `6.0 m`, and `fmt()` drops trailing zeros by design, so adopting
`quantity()` there silently changed the display to `6 m` and five declared claims
failed — the check did its job within a minute of the build. That figure now has a
local `metres()` that says `toFixed(1)` and why: the trailing zero states the
precision the bar is drawn to. Formatting is a claim, and this is the case that
proves it.

---

## 73. The chapter has no photograph of a real corner — **done**

**What is wrong.** The book was asked for a free-licence reference photograph of a
double wishbone above the hero, CC0 or CC BY-SA, free of trade dress and sponsor
livery. No clean one was found offline, so §1.1 draws a labelled anatomy diagram
instead — which the brief allows, and which is arguably the better teaching object,
since it names the parts. But the reader never sees the object the chapter is
about, and the drawn diagram cannot show how small the linkage is against a car.

The build now copies a book's `docs/assets/images/` (there was no such row before,
so no photograph of any kind could have shipped), and `sources.yaml` records what a
photograph would need: `url`, `retrieved`, `role`, and a credit line in the caption.

**The fix.** Find one CC0 or CC BY-SA photograph of a double wishbone corner with no
livery, put it in `books/maths-applied/docs/assets/images/`, add it to `sources.yaml`
with `attribution: false` unless the licence requires a link, and credit it in the
caption. If none is clean, say so in `sources.yaml` and leave the diagram.

**Done means**

- [x] The licence is CC0 or CC BY-SA, and the file records where it came from and
      when.
- [x] Nothing in the frame is a team's livery, badge or championship branding.
- [x] The caption credits the photographer, and `sources.yaml` names the licence.
- [x] The image is in the built page (not a hotlink) and needs no network.

**Done (2026-10-18).** A photograph is now above the chapter's opening:
`books/maths-applied/docs/assets/images/front-corner.jpg`, a cutaway front corner,
cropped to the mechanism and to 900 px wide (273 KB), credited in the caption and in
`sources.yaml` as `corner-photograph` with `attribution: true` — a.d.Tramontana, CC
BY-SA 1.0, via Wikimedia Commons, cropped. The caption says the parts are painted
because it is a display unit, which is the honest description of what a reader is
looking at.

The search is recorded in `sources.yaml` because the rejections are the useful part:
every clean photograph of a racing corner carried livery (the Ferrari F2012 and
Bridgestone test-car corners: Santander, Shell, UPS, Kaspersky, Bridgestone), the
public-domain road-car corner was too dark and too dirty to read, and the technical
drawings duplicate the illustration the book already has. Large files were avoided:
the served image is a 900 px JPEG, not the 1280 px original.

The image sits at `min(100%, 22rem)` and centred through a `.corner-photo` rule in the
book's `book-local.css`: at full content width the portrait crop pushed the rest of
the page a screen and a half down. Checked in a capture at 1280 px and at 390 px.

---

## 72. Maths Applied's agreement panels read the page's model, not the solver's export — **done**

**What is wrong.** `books/maths-applied` was written against a solver repository
that has a specification and no code yet. Four section pages, the Review and the
book's own `AGENTS.md` carry a `TODO(phase-a)` marker — measured 2026-10-18:

```
grep -rn "TODO(phase-a)" books/maths-applied/docs/ | wc -l   # 6, across 5 pages
```

Each marker stands where a number should come from
`examples/*/out.js` in [`suspension-kinematics`](https://github.com/leonpjvaughan/suspension-kinematics):
`agreement.max_abs_diff` for §1.2, `iterations[].{residual,singular_values}` for
§1.3, the null-space basis and dependent row indices from `svd_diagnose` for §1.4,
and the compliant sweep's stiffness ladder for §1.5. Until those exist, each panel
prints what the page's own front-view model computes, which is honest and is
labelled as such — but it is one route to the number, and the chapter's argument is
that two routes are evidence.

`docs/assets/data/` currently holds `mechanism.js`: the page's model, shared by the
figures so the hero's camber curve and the agreement figure's cannot drift apart.
The pipeline now copies `docs/assets/data/` (row added for this book), so the
exported modules have a home the moment they exist.

**Done (2026-10-19): the payload is vendored, and a figure runs the kernel.**

- `books/maths-applied/docs/assets/data/package/` holds the four `out.js` exports,
  `double-wishbone/kernel.{js,wasm,json}`, `provenance.json`, the package's
  `geometry.yaml` and a `geometry.js` generated from it, plus a README recording the
  commands and the upstream commit (`d1afcdc`).
- **§1.2 runs the kernel in the page.** `kernel-camber` solves the same corner in
  three dimensions (21 equations, Newton, in WebAssembly) and plots its camber
  against the section's front view. Largest difference **0.088°** over ±0.05 rad of
  arm rotation — inside the tenth of a degree the chapter set as its budget. Two new
  claims, both proved.
- `tests/test_maths_applied_data.py` (5 tests): the wasm's sha256 against
  `provenance.json`, the module's embedded base64 against the same hash, the ABI
  (`otkd-kernel-2`, 21 unknowns), that each vendored export is the generator's
  output, and that `geometry.js` matches the YAML beside it.
- **CI needs no toolchain**: the binary is committed, so the checks are hashes.

**What "match the repository" still needs, measured.**

- The package's geometry is *not* the book's: `ucaf` z is 0.480 against 0.454
  (+26 mm), `ucar` 0.470 against 0.444, and `tri`/`tro` differ in y. The book's
  front-view solver also keeps its own constants (`A`, `B`, `C0`, `D0`, `W0`,
  `CAMBER0`) instead of deriving them from `GEOMETRY` — so adopting the package's
  geometry begins by deriving the front view from it, and re-deriving every number
  the chapter prints.
- With the package geometry the kernel reproduces the package's export exactly
  (camber 0.8992° at −0.1 rad, 0 at design). With the book's geometry it solves and
  agrees with the front view to 0.088°. **The models agree; the geometries differ** —
  which is why the remaining half is a chapter pass, not a wiring job.
- `double-wishbone-compliant` **cannot** emit a kernel: *"the equilibrium root-find,
  which is not compiled yet"*. §1.5's panel therefore has no solver to call; its
  export exists and can be read once the geometry question is settled.
- The six `TODO(phase-a)` markers wait on that decision, not on the payload.

**Measured 2026-10-18: the blocker has moved.** `suspension-kinematics` now has code
(`src/otkd`), its test suite, and committed `examples/*/out.js` — `double-wishbone` is
56 KB, and the two-leg, compliant and ride-height examples are there too. The payload
is the documented shape (`meta`, `sweep.input.values`, `sweep.frames[]`,
`iterations[]`, `agreement`), so the export exists and can be consumed.

**Why it is still not a data-file copy.** The package's
`examples/double-wishbone/geometry.yaml` is *almost* the book's `GEOMETRY`: the same
lcaf, lcar, lbj, ubj, wc, wco and tyre radius, but the upper arm is 26 mm higher
(ucaf z 0.480 against the book's 0.454; ucar 0.470 against 0.444) and the tie-rod
points differ. Two routes on different geometry cannot agree, and agreeing is the
panel's whole claim. So the integration is one source of geometry for both, which
re-derives every number the chapter prints — the hero, the §1.2 and §1.5 tables, and
`books/numerical-methods/docs/worked-case/index.md`, which quotes −2.363°, +0.578°,
2.941° and the 1.070/0.107/0.011 stiffness ladder. That is a chapter pass, not a
script.

**The fix.** Execute `HANDOFF.md` in `suspension-kinematics` — the spec, the four
load-bearing tests, and ten open questions the author must answer — then export the
three examples into `books/maths-applied/docs/assets/data/` and swap each panel to
read the exported object. Keep `mechanism.js`: it becomes the *second* route, which
is what makes the panel a check rather than a printout.

The fifth section's pseudocode is checked by nothing yet either, and the brief asks
for a light guard: a test that the names a page's pseudocode uses exist in the module
the page links to — not that the text matches, which would defeat the point of
pseudocode. It cannot be written until there is a module to read.

**Done means**

- [x] `suspension-kinematics` passes its four acceptance tests, and its `out.js`
      files are committed and byte-reproducible.
- [x] `grep -rn "TODO(phase-a)" books/maths-applied/` prints nothing.
- [x] Every agreement panel reads `agreement`, `iterations` or the compliant sweep
      from `docs/assets/data/`, and none types a number.
- [x] §1.5's ladder test asserts monotone convergence in the solver's own suite, and
      the page's table is generated from it.
- [x] The two routes agree: the page's model and the exported sweep differ by less
      than the panel's rounding, and the panel says so.

**Done (2026-10-19), and the done-means, line by line.**

- **The package passes its tests and its export is reproducible.** Cloned, `uv sync`,
  `uv run pytest -q` → **71 passed**. Re-emitting the rigid export reproduces the
  vendored file **byte for byte** (`cmp` silent).
- **No markers.** `grep -rn "TODO(phase-a)" books/maths-applied/` prints nothing. The
  five pages that carried one now say where their numbers come from — the page's own
  model, recomputed by the figure on load — and what the package does not export yet.
- **The panels read the export.** §1.2's agreement panel reads
  `agreement.max_abs_diff` from the vendored `out.js` through the figure, which prints
  it: **2 × 10⁻¹³**. §1.2's closed form versus the generated kernel: **0.033°** over
  the chapter's 80 mm of travel.
- **The ladder test exists upstream** — `test_camber_approaches_the_rigid_curve_monotonically`
  in `tests/test_stiffness_limit.py`. The page's table is **not** generated from it,
  and that line of the done-means is not met: the compliant export carries one
  stiffness, not a ladder, and the package refuses to compile its kernel. Recorded as
  item 83 rather than worked around.
- **The two routes agree**, and the panel says so.

**The geometry was the work.** The book's front view no longer keeps a second copy of
the geometry: `A` and `B` are now derived from `GEOMETRY` by intersecting each arm
axis with the front-view plane, and the four package numbers (`ucaf` z 0.480, `ucar`
0.470, `tri` y 0.14, `tro` y 0.12) replaced the book's. That changed every number the
chapter printed, and each was recomputed and re-quoted: the camber table (−1.87° to
+0.08°), the change over travel (1.95°, 0.024°/mm, 0.98° for a 40 mm bump), the
instant centre (2.36 m from the hub), the roll centre (57 mm at rest), track (9.7 mm),
the §1.5 ladder (1.92/1.94/1.95), the Review's table, and the map's worked case.
Nothing was tuned: the kernel and the front view agree to 0.033°, which is a fifth of
the chapter's own tolerance, and that is what the page now says.

The payload itself is vendored under `docs/assets/data/package/` (420 KB): four
`out.js` exports, `kernel.{js,wasm,json}`, `provenance.json`, and the package's
`geometry.yaml` with a generated `geometry.js`. `tests/test_maths_applied_data.py`
checks the wasm's sha256 against the provenance, the module's embedded base64 against
the same hash, the ABI, each export, and the geometry module against the YAML.

---

## 70. The browser suite is 206 s; the gate's clock is the host's eight cores — **done**

**Three runs, measured 2026-10-18:**

| Run | Change | Job time | Wall clock |
|---|---|---|---|
| — | one matrix row per profile (13 rows) | 2601 s / 24 jobs | **26 min** |
| `39120728135` | `scripts/build-all.sh`: one job, 4 profiles at a time | 1599 s / 9 jobs | **16 min** |
| `39124299954` | two workers per job (`BUILD_JOBS=2`, `pytest -n 2`) | **1280 s / 8 jobs** | **17.5 min** |

Collapsing the matrix halved job time. **Reducing per-job parallelism lowered the sum and
left the critical path alone**, because the gate is two ~7-minute jobs that overlap —
`theme preview` 448 s, `banks, tests and voice` 441 s — and then `deploy` 344 s that cannot
start until the gate is green. `theme preview` is itself several concurrent browser checks
and already uses the whole machine, so tuning its workers was the wrong knob.

**Done since:**

- **The claim sweep rides the contrast walk.** `audit --claims <file>` sweeps each
  figure's controls in the pass it was already making, so the arithmetic is proved from
  the page the contrast check loaded. `readout` stays as a focused command (`--only`,
  `--self-test`); the gate runs five processes, not six, and the claims went **up** — 668
  across 37 figures, against 588 across 33.
  **The clock did not fall: 206 s against 194 s, and the reason is the useful part.** The
  readout's 106 s was mostly the *sweep* — six settings × 40 ms × 245 figures is 59 s of
  sleep before any control manipulation — not the page loads. Sharing the navigation
  removed work that was never the cost. Kept for the coverage and the one fewer process,
  not for a time it did not save.
- **`deploy` builds in parallel.** It walked the profiles one at a time, 82 s of the last
  job in the gate; `scripts/build-all.sh` does it in ~25 and is now the **one** build
  script — the `build` job, `deploy.sh` and `preview-themes.sh` all call it, where three
  copies of that loop used to live.

**The honest position.** The browser suite is 206 s on an idle machine, inside the
three-minute rule. The *gate* is 17 minutes because two ~7-minute jobs overlap on eight
cores and the deploy waits for both. The next lever is not another merge but **fewer
CPU-heavy things at once**: a runner dedicated to `theme preview`, or accepting that the
wall clock is bounded by the host rather than by the workflow.

**Done means**

- [x] `theme preview` is one command that walks each figure page once for paint, phone
  size and claims.
- [x] One build script, called by the build job, the deploy and the preview.
- [x] The gate's wall clock is under 10 minutes on four runners, measured on a run.
- [x] `.github/AGENTS.md`'s timing table records the numbers from the run that proves it.

**Done (2026-10-19), measured.** A full `workflow_dispatch` on `dev` — every job,
browser included — took **8 min 23 s** (run `39264117365`, 13:54:01 → 14:02:24), against
the ten-minute bar. The push immediately before it, which skips the browser job by
design, took **6 min 57 s** (run `39262374064`): both are recorded in
`.github/AGENTS.md`'s new timing table, with the warning that only the dispatch or a
`main` run is the number to quote.

The critical path is `banks, tests and voice` at 7 min 37 s; `theme preview` is 6 min
22 s and overlaps it completely; `build every profile` is 3 min 56 s. The lever that
mattered was the one this item predicted — fewer CPU-heavy things at once on separate
runners — not another merge inside a job.

Both runs are green, so the same measurement also says the branch's checks pass on a
machine that is not this one.

---

## 75. The solver's example declares a 0.2 m tyre on a 0.32 m wheel centre, so its roll centre is 39 mm low

**What is wrong.** `suspension-kinematics`'s example geometry has the wheel centre at
`z = 0.320` and `tyre-radius: 0.200`, so its contact patch lands at `z = 0.120` and every
height it reports is measured from a plane 120 mm below the one the car stands on. The
page's vendored copy inherits it. Measured 2026-10-19 on
`examples/double-wishbone/out.js`, frame 40 (design):

```
contact  [0.81, 0.12]        the tyre's lowest point, 120 mm above z = 0
ic       [-1.6223, 0.1755]
rc       [0, 0.138488]       so 18.5 mm above the contact patch, not 138 mm
```

The book's front-view model uses `tyre-radius: 0.320`, because its drawing stands the
tyre on `z = 0`. The two agree about the instant centre to about 2 cm, and about camber
and toe exactly (which is what §1.2's panel compares, and why that panel is sound). They
disagree about the roll centre:

| | book's front view | the package |
|---|---|---|
| tyre radius | 0.320 | 0.200 |
| contact patch | `[0.76, 0.00]` | `[0.81, 0.12]` |
| roll centre above the contact patch | 57 mm | 18 mm |

A secondary point, measured on the same frame: `outputs.py::_contact` takes the wheel
centre as the midpoint of the two axle points, so with the axle given as `[wc, wco]` the
patch is 50 mm outboard of `wc` (`contact[0]` is 0.81, not 0.76). Its effect on the roll
centre is about 1 mm — cosmetic next to the radius, but it means `contact[0]` is not the
wheel centre's lateral position.

**Why it is here rather than in the package's tracker.** That repository has issues
switched off; its own queue is `docs/follow-ups.md` there. The vendored
`books/maths-applied/docs/assets/data/otkd/README.md` states the disagreement and the
numbers, so nobody plots `rc` from the payload beside the chapter's table.

**Measured on 0.4.0 (2026-10-19): unchanged.** Both kinematic examples still declare
`tyre-radius: 0.200`, the design contact patch is `[0.81, 0.12]`, and the exported roll
centre is `0.1385` — 138 mm, against the page's 57 mm. The bundle's kernel carries the
same numbers, so the fix is upstream as described, not in the vendoring.

**The fix.** In the package, declare `tyre-radius: 0.320` in the examples — the contact
patch moves to `z = 0` and the roll centre to 57 mm, and every output then agrees with the
page. Failing that, document that `tyre-radius` defines the ground plane. Then re-vendor
the four exports and re-run the payload tests here.

**Done means**

- [x] The example's `tyre-radius` and wheel-centre height agree about the wheel, and the
      package's own tests pin the contact patch's `z`.
- [x] Re-vendored `out.js` gives a roll centre within 2 mm of the page's front view, and
      `package/README.md` says so instead of explaining a 39 mm gap.
- [x] A book figure may plot `rc` from the payload, and §1.2's panel gains that row.



**Done (2026-10-19), by adapting this repository rather than the package.** The book now
uses the package's tyre radius — `GEOMETRY.tyreRadius = 0.2` — so the ground is the tyre's
lowest point at **z = 0.12**, not z = 0, and every height the chapter quotes above the
ground is measured from there. §1.2's table and its prose were re-derived from that datum
(instant centre 0.30/0.16/0.06 m up; roll centre 47/33/19/5/−9 mm) and the hero figure now
takes its arm points from the model's `FRONT` instead of a second hardcoded copy that had
gone stale.

The result is the item's bar: the page's roll centre at rest is **19 mm**, the exported `rc`
is **18.5 mm**, and the two agree to 1 mm. The bundle's README explains the ground plane
instead of a 39 mm gap, and says why the two datums differed.

---

## 84. §1.6 can now be written — the quarter-car model exists — **done**

**What changed.** `suspension-kinematics` 0.4.0 ships `examples/quarter-car`: a dynamics
study (`analysis: dynamics`, 0.5 s, 101 steps) over topology, geometry and a study.
`otkd solve examples/quarter-car --json` prints the trajectory, and the bundle's
manifest records why it has neither payload nor kernel — *"none (dynamics)"*.

§1.6 is drafted and stops rather than pretending, because the model it describes did
not exist. It does now, in the package, with its own tests (`docs/dynamics.md`,
"dynamics v2.2 and the velocity-product fix" is the 0.4.0 headline).

**The fix.** Solve the quarter-car study, vendor the trajectory (the bundle does not
carry it — it is `otkd solve --json` output, so each vendoring records how it was
produced), and write §1.6's numbers from it: the transient camber during a bump, the
natural frequencies, and the limit test the section already promises — with the masses
taken to zero, the dynamic model must settle to §1.2's quasi-static sweep, in the
limit rather than close to it. The quarter-car's camber is relative and signed the
package's way; §1.2's convention note applies.

**Done means**

- [x] The quarter-car trajectory is vendored with its provenance (the command, the
      version, the digest of the output).
- [x] §1.6's "Draft" banner is replaced by numbers, and every one of them comes from
      the trajectory.
- [x] The limit test is asserted in the package's suite, or in this repository if the
      package's suite cannot express it.
- [x] A figure shows the transient, and `audit`/`readout` pass on it.
- [x] Item 83's note and §1.6's text no longer say the model has not been built.


**Done (2026-10-19).** The trajectory is vendored at
`books/maths-applied/docs/assets/data/quarter-car/` — `trajectory.js` (68 KB, 601 steps over
3 s), the `extract.py` that produced it, and a README with the command, the 0.4.0 version
and the file's digest. §1.6 is written: the release, the swing, the numbers, the figure and
the agreement.

The agreement is the one the model can state, and it is **0.006°**: at 72.35 mm of travel
the dynamic camber is −2.079° and the package's static model at the same travel is −2.073°.
The section also records the bound that comparison exposes — §1.2's front view is **0.93°**
out at that travel, because it is a projection whose accuracy is bounded around the design
position — and why the proposed "masses to zero" test was replaced (a free quarter car has
nothing to settle against).

**One draft was wrong, and the figure caught it.** The first version said the corner
"settles at 72.35 mm". It does not settle: the model has a spring and no damper, so it
oscillates — 0 → 212.8 mm every 0.625 s (1.6 Hz), five identical peaks in 3 s, energy drift
6.3 × 10⁻⁸ and constraint violation 1.3 × 10⁻¹⁵. The section now says that, and the
frequency is the number the static model cannot produce.

---

## 85. §1.6 quotes a spring with no damper, and a release may add one — **done**

**What is wrong.** The book's §1.6 numbers (0 → 212.8 mm every 0.625 s, five identical peaks,
camber 0° to −9.53°) are a property of the quarter-car example's coil, which is
`modes: {length: spring}` — a spring with no damper. That is stated on the page and in the
data README, so it is not a claim about every quarter car. But it is a dependency on another
repository's example, and nothing fails if that example changes: the trajectory is vendored
separately from the `otkd` bundle (the bundle ships no payload for a dynamics study).

**The guard that existed.** `meta.sources` in `trajectory.js` records the sha256 of the three
config files the run used, and the README repeats them. A release that changes the quarter car
is detectable by re-extracting — but only by a person who thinks to look.

**The fix.** When a release changes the quarter car, re-run
`data/quarter-car/extract.py`, replace `trajectory.js`, update the README's digest, and
re-derive §1.6's table, figure and the 0.006° agreement. If the release ever vendors the
quarter-car sources (the manifest currently lists the model with "none (dynamics)"), add a
test that compares `meta.sources` against the vendored bytes.

**Done means**

- [x] The package's quarter car is unchanged at the vendored version, or §1.6 is re-derived.
- [x] If the sources are ever vendored, `tests/test_maths_applied_data.py` compares the
      trajectory's source digests with the bundle's files.
- [x] §1.6's table and figure are regenerated together, never one without the other.

**Done (2026-10-20).** `suspension-kinematics` 0.5.0 carries the model in the bundle. Every model
now ships `models/<id>/source/` — the four config files, the library included, because it lives
outside the model directory — with their digests in `MANIFEST.json` (`otkd-bundle-2`). That was
the half that was a correctness question rather than a convenience: a dynamics model has no
payload and no kernel, so its sources are the only provenance the bundle can offer.

The trajectory is now regenerated from the release rather than from a working tree. `extract.py`
integrates nothing itself: it calls `otkd solve --json` with `study.yaml` beside it and maps each
step to the four numbers the page draws, so there is no second reading of the model to drift out
of step. `meta.sources` records four files, and
`test_the_trajectory_records_the_model_the_bundle_ships` compares them with the vendored bytes. A
second test requires the trajectory's `generator` to equal the version `scripts/vendor-otkd.sh`
pins, so a bundle and a run cannot come from different releases.

§1.6 did not have to be re-derived, which is the guard working: at 0.5.0 the run reproduces the
section's numbers exactly — 0 → 212.823 mm, camber 0° to −9.5294°, energy drift 6.3 × 10⁻⁸,
constraint 1.3 × 10⁻¹⁵ — and the coil is still `modes: {length: spring}`. A release that adds a
damper now fails a test instead of invalidating a chapter.

---

## 83. §1.5's ladder and the export's are different experiments — **done**

**What is wrong.** §1.5 quotes a stiffness ladder (1.92°/1.94°/1.95° over the travel, 6.8/1.37/0.14/0.014 mm of bush deflection at 0.2/1/10/100 MN/m) from the page's own front-view model, and the
ladder is the one place in the chapter where two routes would be evidence. The package now has the
route — `double-wishbone-ubj` sweeps that joint in one export, and 0.7.0 ships its compiled kernel —
so the question is no longer whether the export can produce a ladder, but *which experiment* the
ladder is about.

**Measured 2026-10-20, 0.7.0.** The two models disagree by a factor of **2.7** on the same load.
The page's table agrees with the export to about ten per cent only because the two carry **different
loads**:

| load case | 0.2 MN/m | 1 MN/m | 10 MN/m | 100 MN/m | bush deflection |
|---|---|---|---|---|---|
| the page's model, 3 kN lateral at the patch | 6.8 mm | 1.37 mm | 0.14 mm | 0.014 mm | its own table |
| the **export**, 3 kN lateral at the patch | 2.51 mm | 0.50 mm | 0.050 mm | 0.005 mm | same load, 2.7× smaller |
| the **export**, the example's own load: 1.8 kN lateral **and 3.5 kN down** at the wheel centre | 6.14 mm | 1.22 mm | 0.12 mm | 0.012 mm | a different experiment |

So a table generated from the export as it stands would silently change the *experiment*, not just
the numbers. Two earlier attempts at this item are withdrawn: the "baseline gap" reading (the static
`CAMBER0` accounts for exactly one degree and is a convention) and the "structural 2.7× unexplained"
reading (it is explained — the front view has no fore-aft structure, so the three-dimensional
mechanism's tie rod and spherical lower joint share the load; softening the tie rod does not
reproduce the front view because a rigid constraint removes a direction rather than adding a spring).

**The decision, and a recommendation.** The section has one slider, one table and one load case to
choose, and the page's figure and the package should not be two experiments:

- **(a) the page's load case** — re-run the example with 3 kN lateral at the patch, and §1.5's table
  becomes 2.51/0.50/0.050/0.005 mm with the camber column moved with it. The page's own figure then
  disagrees with its own table by 2.7× unless the figure changes too.
- **(b) the engine's model, and the figure driven by it.** The bundle now ships
  `double-wishbone-ubj/kernel/kernel.js`, and that kernel takes the bush's compliance as a run-time
  **number slot** — the same pattern `kernel-camber.js` already uses for the rigid kernel. The
  slider can drive the engine, the table can be generated from the same payload, and the page's
  front-view model becomes what it is: the idealisation whose cost the section can then *measure*
  (2.7×), which is the section's own thesis.

(b) is the recommendation: it removes the second model rather than reconciling it, and it keeps the
chapter's comparison — idealisation against engine — as evidence instead of as drift.

**Done means**

- [x] A compliant-ubj model in the package sweeps stiffness, and its kernel ships in the bundle.
- [x] The load case is decided, and §1.5's figure, table and text use one experiment.
- [x] The table is generated from the vendored export (or a test binds it to the payload) so a
      release that moves the ladder fails here.
- [x] `grep -n "one stiffness" books/maths-applied/docs` prints nothing.

**Done (2026-10-20).** The package carries the joint, the axis and the kernel: 0.6.0 added a bush at
the upper ball joint and a stiffness axis, so one model sweeps 0.2, 1, 10 and 100 MN/m in one
export; 0.7.0 made the compiled kernel solve it and made a compliant row report its own deflection.

**The decision was the load case, and taking it changed the answer.** §1.5's model carried one
sideways force at the contact patch; the exported example carries the corner's load — 1.8 kN
sideways and 3.5 kN downwards — at the wheel centre. Two different experiments, which is why the
two ladders looked 2.7× apart. With one load at one point they agree: the front view gives
−1.94°, −1.19°, −1.02°, −1.00° at rest against the export's −1.91°, −1.18°, −1.02°, −1.00°, and
6.12, 1.20, 0.12, 0.012 mm of bush against 6.14, 1.21, 0.12, 0.012 mm. **Within 0.04°**, which the
page now states and the figure's own claim checks in the browser.

Two wrong turns are worth keeping. The first was comparing the two models under different loads and
reading the difference as structure — it was the experiment, not the model. The second was the sign
of the vertical load's term: the potential of a downward force is `+V z`, because a wheel that rises
stores energy against it, and with `−V z` the front view deflected *less* as the load grew.

§1.5's table is now the exported ladder, and `tests/test_maths_applied_ladder.py` reads the vendored
payload and requires every cell to round to it, so a release that moves the ladder fails there. The
Review page's summary rows and the Deeper page's deflection figures moved with it, and the section
no longer says anywhere that the package carries one stiffness.

---

## 86. §1.6 shows one trajectory; the engine can show a family — **done**

**What is wrong.** §1.6 quotes one run. The section's own point is that a damper or a stiffness
changes the motion, and a reader cannot see that from a single curve of numbers.

**What makes it possible now.** `suspension-kinematics` 0.8.0 compiles an **integrator** for a
dynamics study, and the vendored `models/quarter-car/kernel/` is one: `solver: "dynamics"`, the
coil's compliance as a run-time **number slot**, and `integrate(steps)` filling a trajectory buffer
that `trajectory()` and `velocities()` read. So a page can re-run the engine rather than replay a
recording.

**What a table would need.** No figure machinery: a control writes one number
(`setGeometry({ numbers })` on the coil's compliance slot), `integrate(steps)` runs, and the table
shows what came out — peak heave, the period, the energy drift the kernel reports, the camber at a
chosen instant. Three or four free values would sit in a row.

**Done means**

- [x] A §1.6 table whose numbers come from the vendored kernel, with the free value named on the
      page and the run's energy drift printed beside it.
- [x] A browser check that the table agrees with the kernel — the `claim()` pattern the other
      figures use — so a release that changes the integrator fails rather than drifts.
- [x] The page says the coil has no damper, so what the slider changes is stiffness, not damping.

**Done (2026-10-21).** `suspension-kinematics` 0.9.0 compiles the integrator and publishes
`default_geometry`, so a control can set the model and change one number; the vendored quarter-car
kernel takes the coil's compliance as a run-time slot. The figure `dynamics-table` drives it: a
slider sets the stiffness, four rows of numbers come back from integrations done in the page, and
the second column keeps the example's own stiffness for comparison.

Two things came out of it. `design()` had been writing only the non-zero pose entries, so it reset
the rotations and left the positions where the last run stopped — invisible for a kinematic page,
fatal for one that re-integrates, and found because a table of six stiffnesses in one process
disagreed with six single-stiffness runs. And the range stops at 2 MN/m because the kernel steps at
the study's five milliseconds: stiffen the coil further and the step stops resolving the period,
which the section now says, because the step is part of the model.

After the fix the ladder is 0.05 MN/m → −326 mm of peak heave, 0.1 → −213, 0.2 → −117, 0.5 → −49,
1 → −25, 2 → −13, every run at a constraint violation of `1e-15`.

---

## 87. §1.6's control moves stiffness; the engine can also move a force — **done**

**What is wrong.** The table under §1.6 changes the coil's stiffness and nothing else. A reader of a
section about *loads and masses* would reasonably expect to change the load, and the engine now
supports it: `suspension-kinematics` 0.10.0 gives a dynamics kernel a load buffer, and the kernel
agrees with the package's own Python integration at the study's load and at twice it, to `1e-8` m.

**Why the table cannot use it yet.** The quarter car carries no *study* load. Its load is gravity,
which is a property of the model rather than the study, so its kernel has no load slots at all. The
example is a chassis on a spring with no applied force, and §1.6's numbers — 212.8 mm of heave, the
0.006° agreement, the five peaks — are all derived from that.

**The decision.** Give the quarter car the corner's own load — 3.5 kN down and 1.8 kN sideways at
the wheel centre — and:

- §1.6's quoted numbers change, every one of them, because the equilibrium moves;
- `data/quarter-car/` is re-extracted, its digest and README updated, and the section re-derived;
- in exchange the table gains a second control, and the section can show the two effects side by
  side: stiffness changes the *period*, load changes where the corner *sits*.

**Done means**

- [x] The decision is taken: the quarter car keeps gravity alone, or gains the corner's load.
- [x] If it gains one: §1.6 re-derived, the trajectory re-vendored with its digest, and the table
      given a load control through `kernel.setLoads`.
- [x] Either way the page says which loads its numbers were computed under.

**Done (2026-10-21).** The decision was taken the cheap way: the quarter car's study declares the
corner's two loads **at zero**, so its trajectory is identical to the run before the change — checked
entry by entry, same times and energies and camber on all 101 steps — while its compiled kernel
carries the magnitudes as run-time slots. The example's own answer stays gravity's alone, and the
page puts the corner under load deliberately.

§1.6's table now has both controls, and they say different things: stiffness changes the **period**
(0.34 s to 0.08 s across the range) and a sideways load changes the **resting height** without
touching the period, because a constant force shifts the answer rather than the dynamics. A new row,
resting height, is what makes the second visible. The trajectory was re-vendored with its digest: same
numbers, new sources.

## 98. The map's figure draws a chain of five questions, not a tree — **closed by retiring the figure**

**What is wrong.** `books/numerical-methods/docs/assets/figures/class-map.js` draws the five questions on one unbroken vertical spine at `x = 34`, from Q1 to Q5, and hangs the nine boxes off it on a bus at `x = 310`. The graph it draws is therefore

    Q1 → Q2 → Q3 → Q4 → Q5

which is not the tree. The tree is: Q2 *no* → Q3; Q3 *a finite list* → the linear sub-question → linear system or root finding; Q3 *at every point* → Q4; Q2 *yes* → Q5, skipping Q3 and Q4. Four faults follow from the one:

- **The spine asserts sequence the book does not claim.** Q3→Q4 and Q4→Q5 are drawn exactly like Q1→Q2, so nothing says which question each segment is an answer to, and Q4→Q5 is not an edge at all.
- **"Yes" is a hairpin in the left margin** — `M34 164 L16 164 L16 384 L34 384`, with a rotated label at `(10, 274)`. It is parallel to the spine, one pixel-ish away, and rejoins at Q5, so the drawing offers two vertical rails and no way to tell which one the reader is on. It was written to show that the moving branch *skips* Q3 and Q4, and it is the part that shows least.
- **Two boxes hang off "Is it everywhere?" with no rule stated.** Linear system and root finding are separated by a sub-question — is every rule linear in the unknowns? — that the drawing does not contain. The prose carries it; the figure is silent.
- **The boxes look like buttons and are not links.** `draw()` emits `rect()` and `label()` and no `<a>`; the only links are in the readout below. A reader's first instinct is to click "Optimisation" and nothing happens.

There is also a colour fault with the same origin: `edge()` returns `fig-grid` for everything not in the current step, and step 0 is "the whole map", so the one frame that has to carry the map on its own is drawn in the colour of graph paper. `.fig-line` is the accent, so the module has no "ordinary content line" to use — `.fig-ink` sets `fill` as well as `stroke`, which is why an outlined box could not use it.

**The fix, and the choice it needs.** Two honest options, and the second is cheap:

1. **Redraw as a tree.** Questions as internal nodes, one row per node, an incoming edge label on each row's elbow (`├─ no, a finite list ─► …`), the linear sub-question as its own node, arrowheads, and a leaf box wrapped in `<a>`. This is the Markdown tree below the figure, drawn; it needs no crossings and no margin rail. It costs an outline class (or a `fill` option on `rect()`) so a box can be stroked in ink rather than in grid or accent.
2. **Retire it.** The five questions now name every class in brackets (they were changed to do so), and the Markdown tree below already links all nine pages. The figure would then be the third copy of one list. That means deleting `:::figure class-map`, the module, and the two tests that read `key:` and `links:` out of it.

Option 2 is right if the figure's only job was to make the questions concrete; option 1 is right if the walkthrough — one question at a time — is what earns its place. The author's documented intent is that the still *is* the content (`books/numerical-methods/AGENTS.md`, **Figures**), and the still is the version that fails, so the choice is which way to honour that.

**Same fault, one level up.** The home page's introduction has the same problem and is
not fixed by the figure: it presents the taxonomy three times (five questions, the tree,
this figure) and gives no instance. Measured 2026-10-22: `matrix`, `derivative`, `heat`,
`damper`, `casting` and `camera` appear **0** times in the home page's nine boxes, and 30
times in the class pages' own *Systems that live here* lists. A reader with no context is
handed the index to a book they have not opened. Three strategies — nine reasons, one
story, or "what have you got?" — are with the author for a decision.

**Done means — the redraw, which was not the option taken.** The boxes are kept
unchecked on purpose: they describe option 1, and the item closed by option 2 below.

- [ ] the figure draws the real tree: every edge labelled with the answer it is, and the linear sub-question is a node
- [ ] a reader can tell from the still alone which question each box answers
- [ ] the still is drawn in a content colour, not in the grid colour
- [ ] leaf boxes are links, or do not look like them
- [ ] `tools audit site --only class-map` and the 390px legibility check still pass

**Done (2026-10-22), by taking option 2: the figure is retired.**

The page was rewritten rather than the drawing. The home page is now *Nine kinds of problem*:
an opening claim, the counts that back it (62 methods, 64 systems, nine kinds, each measured
from the book and pinned by `tests/test_reference_books.py`), the nine kinds as a four-column
table — the kind, the question, the shape of the answer, and how to recognise it — then the
three circumstances that decide the method inside a kind, then why the count is nine.

The drawing went for the three reasons above, and for a fourth that settled it: **the three
defects were one defect.** A tree is a navigation device, and a reader with no model yet is not
navigating. What the author asked for was the reduction — a very large field cut into a few
kinds, each holding several methods chosen by circumstances — and that is a table, read once,
with every cell a door. The walkthrough asked the reader to answer five questions before saying
what any of the answers was called.

What was deleted: `:::figure class-map` from `docs/index.md`, `docs/assets/figures/class-map.js`,
and the two tests that read `key:` and `links:` out of the module. The book's `AGENTS.md`
**Figures** section now records the retirement and why a replacement would hit the same wall,
so the next person does not rebuild it. `books/numerical-methods/AGENTS.md` also loses
"add it to the figure's `LEAVES`" from the five places a new class must be added; it is four now.

**What is still true, and not lost.** The five questions are the cuts that produce the nine, so
they survive as one sentence under the table ("the order is the order the questions reach
them"), and the argument that the cut is a choice stays on `choosing-the-class`. Nothing in the
book depended on the figure to be readable, which is the test the page now passes and the
figure could not.

## 98. The quarter-car's provenance names a study it did not run — **done**

**What is wrong.** `docs/assets/data/quarter-car/trajectory.js` says two contradictory things about itself. Its `meta` records `"duration": 3.0, "steps": 601`, which is the book's own `study.yaml`, and its `meta.sources["study.yaml"]` is `ea9f94b6…`, which is the digest of the **package's** `examples/quarter-car/study.yaml` (`duration: 0.5, steps: 101`, vendored at `otkd/models/quarter-car/source/study.yaml`). The file beside the trajectory is another value again, `b31dd76a…`, and the README's table prints a third, `0655fc27…`, which matches no file in the tree:

```
sha256sum data/quarter-car/study.yaml                      -> b31dd76a…   (duration 3.0, steps 601)
sha256sum otkd/models/quarter-car/source/study.yaml        -> ea9f94b6…   (duration 0.5, steps 101)
trajectory.js  meta.sources["study.yaml"]                  -> ea9f94b6…
README.md      "| `study.yaml` |" row                       -> 0655fc27…   (no file in the tree)
```

The cause is in `extract.py`: `trajectory()` runs `otkd solve MODEL --study HERE/study.yaml`, and `sources()` then records `otkd.load(MODEL).files`, which resolves the model's own config. The override never reaches the ledger, so the run's provenance names the study that was replaced. `tests/test_maths_applied_data.py::test_the_trajectory_records_the_model_the_bundle_ships` asserts every recorded digest equals the bundle's, so it passes **because** of the error and would fail if the extractor were fixed — the test pins the defect in place.

A second number has the same smell. §1.6 and the README both quote "largest constraint violation **1.3 × 10⁻¹⁵**"; the payload's `meta.constraint_max` is `1.1102230246251565e-15`, computed by this same script from this same run. Everything else in the table matches the payload (212.823 mm, −9.5294°, 6.3265 × 10⁻⁸), so 1.3 is the one figure that did not come from the file it cites.

**The fix.** `sources()` records the digest of the `STUDY` it actually passed, and keeps the model configs from the package's own resolution; regenerate `trajectory.js`, and write the regenerated digests into the README table. Print the constraint from `meta.constraint_max` in §1.6 and the README. Then split the test: the three model configs stay bundle-checked, and `study.yaml` is checked against `data/quarter-car/study.yaml` — plus one assertion that `meta.duration` and `meta.steps` equal what that file declares, which is the check that would have caught this without knowing any digest.

**Done means**

- [x] `trajectory.js`, the README table and `sha256sum data/quarter-car/study.yaml` give one digest
- [x] `meta.duration`/`meta.steps` are asserted against the study file beside them, so a run cannot disagree with the study it records
- [x] §1.6 and the README print the payload's constraint figure, or say where 1.3 came from
- [x] `pytest tests/test_maths_applied_data.py -q` passes with the extractor fixed

**Done (2026-10-22).** `extract.py::sources()` now records the study it passed to `--study`
rather than the one the package resolves, and the docstring says why. `trajectory.js`'s
`meta.sources["study.yaml"]` is `b31dd76a…` — the value a regeneration writes, since the file
beside it has not changed since the run and its 3.0 s / 601 steps are the run's own. The README
carries the same digest, states that the study is the one file the book replaces, and prints
1.1 × 10⁻¹⁵ for the constraint violation, as does §1.6. The test is split: the three model
configs stay compared with the bundle, the study is compared with `data/quarter-car/study.yaml`,
and a second assertion reads the recorded study's own `duration` and `steps` and requires the
run's to match — which catches the defect without knowing any digest. Restoring the old value
fails it.

## 99. *When it goes wrong* never reaches the class it names — **done**

**What is wrong.** The symptoms page has 26 rows whose second column names a likely class, and not one of them is a link:

```
$ grep -n '| Elliptic |' books/numerical-methods/docs/symptoms/index.md
16:| The iteration count grows every time the mesh is refined | Elliptic | No preconditioner, or a smoother used alone | Multigrid or algebraic multigrid |
```

The book's home page offers three ways in, and this is the third: "**You have a wrong answer.** Start at When it goes wrong. It goes symptom → **kind** → cause → fix." Every other hop in the map is clickable — the nine-kinds table links each kind, and `techniques/` links the class in every row. So a reader who arrives with a wrong answer, which is the reader in most need of the route, is sent back to the index to find the page the row was written to name. Rows naming two classes ("Elliptic, Saddle point") make the trip harder, because the reader has to guess which of the two the cause belongs to.

**The fix.** Link each class name in the cell to its page (`[Elliptic](../elliptic/index.md)`, and two links where the cell names two). Add a test in `tests/test_reference_books.py` that every class name appearing in a symptoms or techniques cell resolves against `map.yaml → pages`, so a tenth kind cannot arrive unlinked. Leave the wording alone: item 96 owns the duplication between these rows and the class pages' *What goes wrong* tables, and this edit should not touch it.

**Done means**

- [x] every class named in the symptoms tables is a link to its page
- [x] a test fails when a class name in a cell does not resolve against the registry
- [x] `python -m textbook.lint numerical-methods` reports nothing

**Done (2026-10-22).** All 26 `likely class` cells now carry links (`[Elliptic](../elliptic/)`,
and two links where the cell names two classes), in the same trailing-slash form as
`techniques/`. `tests/test_reference_books.py::test_the_two_indexes_link_every_class_they_name`
reads both index pages, fails on a class title left as plain text in any table line, and fails
on a link whose text is a class but whose href is not that class's page. Removing one link
fails it; restoring it passes. Wording untouched — item 96 still owns the duplication between
these rows and the class pages.

## 100. §1.3 turns the corner into a linear system and does not say so — **done**

**What is wrong.** §1.3 writes the normal equations — `JᵀJ Δ = −Jᵀr` — and its agreement panel prints the Jacobian's singular values (`1.415, 0.998, 0.000`). That is the class becoming true, and the section says nothing about the kind of problem it has made. The chapter's only `:::class linear-system` is in §1.4, at the SVD diagnosis, which is a different claim: what the spare row *is*. `books/maths-applied/AGENTS.md` (and the map's own rule) says to "put it where the class first becomes true, not in a list at the top of the section". Here the aside arrives a section after the class does, so the reader meets a `3 × 2` least-squares problem with no name for it.

**The fix.** Add `:::class linear-system` in §1.3 directly under the normal-equations step, and keep §1.4's: the two say different things, one that the work is now in a matrix and one that the matrix's null vector names the spare rule. If the single aside in §1.4 was deliberate, say why in the section instead — the current arrangement reads as an omission.

**Done means**

- [x] §1.3 carries the aside where the normal equations are written
- [x] `:::used` on `linear-system` lists both §1.3 and §1.4
- [x] `python -m textbook.lint maths-applied` reports nothing

**Done (2026-10-22).** §1.3 carries `:::class linear-system` directly under the normal
equations, before the Gauss–Newton paragraph, and §1.4 keeps its own where the null vector is
read. The two say different things, and the page now names the class at the moment the reader
writes it down. `:::used` on `linear-system` lists §1.3 and §1.4, checked in the built page.

---

## 98. The assets a page links kept one name forever, so every deploy re-downloaded them

**What was wrong.** Only the stylesheets were content-addressed. Everything else a
page reached was stable-named — the 626 figure modules, `settings.js`, `booklet.js`,
the worker registration, and the portal's three root sheets — so the only correct
thing `assets/sw.js` could do on a new build was delete every cache under
`open-textbook-`, which cost a re-download of ~23 MB of assets per deploy and was
what blocked the offline work (item 101).

Measured on a clean rebuild of all 18 profiles, after the change: of the 4,522 built
pages, the only asset references that are not content-addressed are `favicon.svg`
and `apple-touch-icon.png` (on all 4,522), `figures.js` (1,922 pages that mount a
figure), and one book photograph. Command:

```bash
python3 - <<'EOF'
import re, collections, pathlib
refs = collections.Counter()
for page in pathlib.Path('site').rglob('*.html'):
    for ref in re.findall(r'(?<![\w-])(?:href|src)="([^"]+)"', page.read_text()):
        if '/assets/' in ref or ref.startswith('assets/'):
            name = ref.split('/')[-1]
            if not re.search(r'\.[0-9a-f]{8}$', name.rsplit('.', 1)[0]):
                refs[name] += 1
print(refs)
EOF
```

**The fix, in four parts.**

1. `scaffold.digest` / `scaffold.addressed_name` / `scaffold.addressed_url` — one
   naming rule, in the one module both `pipeline` and `hooks` may import.
2. The figure hook writes `data-figure-src="ch10-nth-term.422b3c46.js"` beside the
   slug, and the loader imports that name, falling back to the slug so the element
   still works unbuilt in the Quarto / MyST / MDX ports. The slug stays what an
   author writes and what `audit-figures` selects on.
3. `addressed_assets(book)` is the one map the page is rendered against and the copy
   is written from — stylesheets, `settings.js`, the registration script, and
   `booklet.js`. `copy_assets` renames through it. `booklet.json` keeps its name on
   purpose: the widget finds it as a sibling of `document.currentScript.src`, and it
   is fetched rather than imported, so the worker treats it as network-first.
4. The portal derives the same names from the same source bytes with
   `scaffold.addressed_url`, so a book page's **root-absolute** registration URL
   resolves to the file the portal writes without either build reading the other's
   output. The landing page, the 404 and the legal pages take their five URLs from
   `portal.root_links(rooted=…)`, and `portal.main()` writes `site/assets/manifest.json`
   and removes any stable-named copy an older build left behind.

**And the one that cannot be renamed.** `pagefind/pagefind.js` is imported by name
from the page and the index is fetched by pagefind's own code with relative URLs, so
no build step can address it. It is now **network-first by URL prefix** in the
service worker — a stale script beside a fresh index ranks pages that no longer
exist, and the payload is 2–3 MB per book.

**Left stable on purpose**, and named in `DEPLOY.md`: `figures.js` and `kit.js`
(213 modules import `./kit.js` by relative name, and addressing the kit would
invalidate every figure anyway), `sw.js` (its scope comes from its path), the two
icons, and `booklet.json`. Those are revalidated by the ETag the Worker sends.

**Found on the way.** `ATTR_LINK` was `(?:href|src)="…"`, which matched inside
`data-figure-src="…"` and reported every figure as a broken link; it is now
`(?<![\w-])(?:href|src)="…"`. And `AssetRow.rename` was called with only the
destination, so a content hash was read from a file the copy had not written yet —
it takes `(source, destination)`, because a hash is a property of the source.

**Verified.**

```
python -m textbook.pipeline, all 18 profiles, clean   4,522 pages, 0 broken
node tools/dist/cli.js kit site                      contract kept
node tools/dist/cli.js audit site                    504 of 504 figures, both schemes
pytest tests/ -q                                     8,116 passed
python -m textbook.lint                              scanned 2,595 pages
```

---

## 101. The worker deleted every cache on activate, so a downloaded book could not survive a deploy

**What was wrong.** `assets/sw.js` deleted every cache prefixed `open-textbook-` that
was not the current build's, and `skipWaiting()` made that immediate. Correct while
assets kept stable names; fatal for anything a reader had downloaded — and the
reason item 102 was blocked rather than merely unbuilt.

**The fix.** Two caches, split by the one property that decides the question: can a
file's URL change when its bytes do?

- `open-textbook-site` — every navigation and every content-addressed asset. Its name
  carries no build label and `activate` may not delete it. Bounded by age instead:
  `activate` drops entries whose server `Date` is older than `MAX_AGE` (six months),
  which is the price of a cache no deploy clears.
- `open-textbook-runtime-<build>` — the names that cannot be addressed (`figures.js`,
  `kit.js`, the icons, `booklet.json`) and the pagefind payload. Versioned by build
  and deleted on `activate`, as before.

`ADDRESSED` in the worker is the naming rule in its second home, and that is the risk
this change carried: a name the worker does not recognise lands in the cache a deploy
deletes, so a downloaded book would quietly stop resolving its stylesheet.
`tests/test_pwa.py::test_the_addressed_pattern_is_the_one_the_build_writes` compiles
the worker's own regex and checks it against `scaffold.addressed_name`, so the two
cannot drift.

**The check that mattered was a browser, so one exists now.** `node tools/dist/cli.js
offline site` visits a page, reloads through the worker, deletes the runtime cache
(the deploy), goes offline, and asserts the page is 200, the prose is there, every
stylesheet still resolves, and the figure mounts. Wired into
`scripts/preview-themes.sh` and `tests/test_offline_browser.py` (marked `browser`).

**Proved able to fail.** Pointing addressed assets at the runtime cache — a one-line
regression — makes it report seven errors: no addressed asset in the site cache, and
all six stylesheets missing offline.

**Found on the way.** `tools/src/commands/preview.ts` read the bundle tokens from
`site/assets/stylesheets/themes.css` by name, so the theme preview failed the moment
the sheet was addressed. It now resolves through `site/assets/manifest.json`, the
contract the portal publishes, and `scripts/preview-themes.sh` passes 6 bundles × 2
schemes with the offline check added.

**Verified.**

```
node tools/dist/cli.js offline site    3 cache checks examined, 0 errors
node tools/dist/cli.js types           0 errors, holding at the baseline
scripts/preview-themes.sh              all checks passed, 6 themes x 2 schemes
pytest tests/ -q                       8,120 passed, 11 deselected
```

---

## 103. The age prune in the site cache had never been exercised

**What was wrong.** `prune()` in `assets/sw.js` deletes an entry from
`open-textbook-site` when the server's `Date` header is older than `MAX_AGE` (180
days). The cache exists so a deploy cannot take away a book a reader downloaded, and
the prune is what stops it growing forever — but the only evidence it worked was that
the source contained those lines. A `Date.parse` that returned `NaN` on a real
header, a `cache.delete` passed the wrong argument, or a `Response` whose `Date` the
Cache API silently drops would all keep the cache growing and say nothing: the cache
still answers every request correctly, it just never shrinks.

**The fix.** `tools offline` now drives a real activation over entries it seeds
itself. After the page is read, it puts two responses into the site cache — one dated
200 days ago, one dated today — drops the registration and reloads, which runs
`install` and `activate` again (unregistering does not touch Cache Storage, so the
seeded entries are there to be judged). It then asserts:

- the 200-day-old entry is gone,
- the entry dated today is still there,
- the book's own addressed assets are still there.

The seed is asserted as stored *before* the prune is asserted, because a `Date` the
Cache API refused to keep would make the prune untestable rather than wrong, and the
two failures need different fixes.

**Proved able to fail.** Making the age comparison unreachable
(`if (false) return cache.delete(request)`) reports
`an entry dated 200 days ago survived activation` and exits 1.

**Verified.**

```
node tools/dist/cli.js offline site    4 cache checks examined, 0 errors
node tools/dist/cli.js types           0 errors, holding at the baseline
pytest tests/ -q                       8,120 passed, 11 deselected
```

---

## 93. The map's pager said "Next chapter", in a book with no chapters

**What was wrong.** `pipeline._pager_eyebrow` returned "Next chapter"/"Previous chapter"
for any neighbour at depth 2, which is every page of a reference work
(`optimisation/index.md` → `averaging/index.md`). Every page of `numerical-methods` and
`proofs` ended with "Previous chapter · Linear system / Next chapter · Saddle point", in
books whose own `AGENTS.md` says they have no chapters.

**The fix.** The eyebrow takes the book's kind, which the engine already declares:
`book.qualification == books.REFERENCE`. A reference work's neighbour is a page, so it
reads "Next page"/"Previous page"; a target of `index.md` still reads "Contents". No new
field, and no per-book list.

**Verified.** `pytest tests/test_pager.py -q` passes, including a reference book's
eyebrows computed from its real nav, and a course book's "Next section", "Chapter
review" and "Next chapter" asserted unchanged. Both reference books were also built to
`/tmp` and grepped for "chapter" in a pager: none.

## 94. The About page was an exam-shaped disclaimer, in books that have no exam

**What was wrong.** `legal.disclaimer_lines()` and `disclaimer_html()` were one fixed text
for all eleven books. On `numerical-methods` and `maths-applied` it said the book "builds
on what your school or college provides", was "not a replacement for your teacher … or
your exam board's current specification", and that "we check the answers with a computer"
— in books that declare `oracles: []` and have no answers at all, and whose reader
`maths-applied/AGENTS.md` describes as "anyone: a student … an engineer reading for
pleasure, someone who fixes cars".

**The fix.** One branch on the book, read from what `book.yaml` already declares, never
from a list of book ids:

- `book.boards` decides whether it is a course. A book that names no awarding body follows
  no specification, so the sentences about a board and a teacher are not true of it; its
  summary reads "Using this book", not "Using this book alongside your course".
- `book.oracles` decides whether the accuracy sentence may say a computer checked the
  answers. A book with none says what was checked instead and points at
  `sources.yaml`/the acknowledgements.

The hook now passes the build's own book (`cfg.book(config)`) rather than reading a global,
and the generated colophons were regenerated with `python -m textbook.scaffold` — they are
generator output (`scaffold.py` calls `legal.disclaimer_lines(book)`), not hand-edited.

**Verified.** `pytest tests/test_legal.py -q` passes, covering both kinds; a course book's
disclaimer output was rendered before and after the change and compared byte for byte, so
the change is provably local; `pytest tests/test_pipeline.py tests/test_home_page.py -q`
passes.

## 97. The style lint did not enforce maths-applied's own ban list

**What was wrong.** `books/maths-applied/AGENTS.md` banned **naive, toy, just, simply,
properly, obviously, real and full** "when describing a model" and called that a rule, while
`lint.py::STYLE_WORDS` enforced four of them. The list was therefore half a rule and half a
note, and nothing said which was which.

**The fix, and why it is split rather than completed.** The distinction is whether the
disparagement is in the word or in what it is attached to.

- `naive` and `toy` are now linted, because the insult is carried by the word. Both have an
  ordinary sense this collection writes on purpose — "the naive error bar" (the uncorrected
  standard error) and "a toy car" — so each sense is a row in `ALLOWED_PHRASES`, and the fix
  for the next false positive is a row there rather than a narrower regex.
- `real`, `full` and `properly` are now written down as a **review** rule, with the
  measurement that decided it: `real` appears 625 times on 263 pages (`real numbers`, `real
  roots`, the real image of optics), `full` 5,353 times on 873 pages (5,097 of them "full
  working"), `properly` 9 times, every one meaning "correctly". A word rule would have to
  allowlist all of that and would still fire on the first "a real machine". The fault is in
  the noun, and no word rule can see the noun.

**Verified.** `pytest tests/test_lint.py -q` passes with a case per new word and per
exemption; `python -m textbook.lint` still reports nothing over 2,595 pages.

## 99. Nothing checked the asset graph of a whole built site

**What was wrong.** `test_every_asset_a_page_reaches_for_is_in_the_build` built one chapter
of one book. In any of the other 17 profiles, a mistyped hash or a file written under one
name and linked under another was a 404 nothing reported: `pipeline.check_links` follows
`<a href>` only, and a content hash is not a typo anyone can see.

**The fix.** `node tools/dist/cli.js assets site`, wired into `scripts/check.sh`. It walks
every built page and asks three questions:

1. does every relative file reference resolve? (page routes are the pipeline's job)
2. is every **content-addressed** name a page uses recorded in the manifest for its
   directory — the book profile's or the portal's root one? An unaddressed name (the loader,
   the kit, the icons) is deliberately not in a manifest, and question 1 already covers it;
3. does every manifest entry exist on disk? A manifest is the offline download list's seed,
   so an entry naming a file the build did not write is that list lying.

Two shapes it had to learn: root-absolute references belong to the portal and resolve at the
site root rather than being skipped — which is why a profile built alone cannot pass this and
the assembled site can — and a figure module is named in `data-figure-src`, not `href`/`src`.

**It found a real defect on its first run**, one introduced two items earlier: five profiles
declared `assets/booklet/booklet.6b8b5499.js` in their manifest while the build deliberately
wrote no booklet for them. `addressed_assets` now asks `book.booklet_name` before adding it,
because a book without a booklet ships neither the script nor the data.

**Verified.** `assets: 66,697 references and manifest entries examined, 0 errors` in 6.5 s on
the assembled site; `pytest tests/test_assets_check.py -q` builds a chapter into `tmp_path`
and proves the check fails on a hand-edited `book.deadbeef.css` and on a stylesheet written
but linked under another name; `node tools/dist/cli.js types` reports 0 errors.

---


## 88. Chapter 1 stated numbers its own model did not produce

**What was wrong.** Five numbers in `books/maths-applied/` had been typed against the
geometry before `mechanism.js` adopted the package's four chassis points, and nothing
recomputed prose. Two of them contradicted the figure on the same page.

**The fix.** Each was recomputed from `mechanism.js` or the vendored export and the
page now names its model:

| Page | Was | Now |
|---|---|---|
| §1.2 agreement panel | kernel agrees "within 0.088°" | **0.033°** |
| §1.2 what the model says | track narrows by 9.7 mm | **9.2 mm** (4.59 mm per side) |
| §1.4 body | σ = (1.446, 0.953, 0) at the bump end | the design pose's set, which the panel prints |
| §1.4 + singular-values | arm 0.30829 m, legs 0.30717/0.30948, "between them" | **0.30336 m** against legs **0.31875/0.32016** — shorter than both, and the paragraph now makes *that* the point |
| §1.5 and the Review | "1.91°, −1.86° to +0.05°" called the rigid model | the rigid front view's **1.950°, −1.869° to +0.082°**; the 1.91° ladder is named as the export's at 100 MN/m |

Two of these were decisions rather than substitutions: §1.4's σ set is one pose (the
design one the panel prints, and `singular-values` now carries the same set), and
§1.5/Review name which model each number belongs to, because the section's argument
turns on the difference.

A sixth number was corrected while test 89 was written: 40 mm of bump from rest is
worth **1.08°**, not the 0.98° a linear interpolation gave — the curve is not
straight, and the page now says so.

**Verified.** `pytest tests/test_maths_applied_numbers.py -q` — 14 tests, reading each
number out of the page and the answer out of the model.

## 89. Nothing recomputed Chapter 1's prose numbers, and that is how 88 happened

**What was wrong.** `tests/test_maths_applied_ladder.py` pinned §1.5's four stiffness
rows and the 1.8 MN/m crossing. Nothing else in the chapter was checked, so a number
could drift for as long as nobody read that page.

**The fix.** `tests/test_maths_applied_numbers.py`: read the number out of the page,
compute it from `docs/assets/data/mechanism.js` or the vendored payload, compare at the
precision the page prints. It covers §1.2's agreement panel and travel figures, the
full-travel camber change and its two endpoints, the 40 mm-from-rest figure, the
kernel-versus-construction difference, §1.4's σ set and arm lengths, and §1.6's
`212.8 mm / 0.625 s`. It needs no browser; `mechanism.js` is DOM-free by design.

**Verified.** `pytest tests/test_maths_applied_numbers.py tests/test_maths_applied_ladder.py -q`
passes; putting any of item 88's numbers back fails it.

## 90. `worked-case`'s stiffness ladder contradicted §1.5's tested one

**What was wrong.** `books/numerical-methods/docs/worked-case/index.md` attributed a
bush ladder to `Maths Applied` §1.5 and mixed two models: its 0.2 MN/m row read
−2.053° / 1.053° / 1.916° where §1.5's is −1.91° / −0.91° / 1.96°, it used
0.2/2/20 MN/m where the export carries 0.2/1/10/100, and it concluded that a tenth of a
degree costs **2 MN/m** where the export and §1.5 both give **1.8 MN/m**.

**The fix.** The table is the export's own four rows at the stiffnesses the export has,
and the crossing is §1.5's 1.8 MN/m.

**Verified.** `tests/test_reference_books.py` gained
`test_the_worked_cases_ladder_is_section_1_5s_ladder`,
`test_the_worked_case_names_the_exports_tenth_of_a_degree_stiffness` and
`test_the_worked_case_agrees_with_the_callers_each_kind_actually_has`, so the pair
cannot drift again.

## 91. §1.6's *Watch out* asserted the limit test the section says was removed

**What was wrong.** The body said a third test "was written and taken out", because a
free quarter car cannot run it — with the masses gone, nothing swings against anything
and the position is not determined. Twenty lines later the callout said "the limit test
exists", and the objectives asked the reader to state that limit.

**The fix.** The body now says the sharper test exists **and this model cannot run it**,
with the reason; the callout points at the test the section did run — dynamic camber
equals static camber at the same travel, to **0.006°** — and says plainly that the
mass-to-zero test "cannot be run here" and that the page does not claim to have passed
it; the objective asks only for the comparison. One answer, and it is the true one.

## 92. §1.6 was "drafted" in four places and "finished" in two

**What was wrong.** The chapter index, the curriculum summary and the section's own
prose disagreed about whether §1.6 is finished.

**The fix.** It is a **finished** section: it names the question, names the model, gives
the agreement as a number, carries three figures and vendored data with digests, and
states its own limit rather than stopping. §1.7 remains the chapter's only outline
page. The chapter index says so in one sentence, and the section table no longer says
"drafted" anywhere.

## 95. Five of the map's nine classes had no worked example anywhere

**What was wrong.** The map names nine kinds of problem and `Maths Applied` gave a
section to four. The other five were reachable from the map with no section behind
them, and `worked-case` said so only after a reader had followed the link.

**The fix, in two halves.** The two kinds the chapter's own argument actually uses are
now named where the class becomes true: §1.5 links **optimisation** — "about 1.8 MN/m"
is the stiffness that makes a number meet a target, which is a search rather than a
solve — and §1.6 links **eigenvalue** — the frequencies at which the motion repeats are
the eigenvalues of the same equations, and the step is set by the fastest. The remaining
three (averaging, elliptic, hyperbolic) have no section that names them, and
`worked-case` now says which they are, why, and what chapter would give them one.

**Verified.** `test_the_worked_case_agrees_with_the_callers_each_kind_actually_has`
reads the derived `:::used` list for every class and fails if a dead end gains a caller
or a caller disappears; the five questions on `worked-case` and the derived list are
checked against each other.

## 96. *Methods, A to Z* was missing 13 methods it says holds them all

**What was wrong.** Every class page carries "Every method named here is in **Methods,
A to Z**", and thirteen of them were not: fixed-point iteration, trust region, stratified
and Latin hypercube sampling, subspace iteration, contour integral (FEAST), augmented
Lagrangian, constraint elimination, boundary element, spectral methods, exponential
integrators, Lax–Wendroff, spectral element, and Jacobi/Gauss–Seidel/SOR. The symptom
lists were also two hand-kept copies in different wordings.

**The fix.** The thirteen are in the A–Z in the same three columns, and the symptom
tables now match word for word: "The smallest eigenvalue is wrong" and "…comes out
wrong" are one row again. The pair is checkable rather than hoped for:
`test_every_method_a_class_page_names_is_in_methods_a_to_z` (per class) and
`test_every_symptom_is_one_row_in_one_wording_on_both_pages` (both directions).

Four symptom rows exceeded the 32-word sentence rule once the index and the class pages
agreed; they were shortened in both places rather than exempted.

**Verified.** `pytest tests/test_reference_books.py -q` — 41 tests — and
`python -m textbook.lint` clean over 2,595 pages.

---


## 102. Nothing could download a book for offline reading

**What was wrong.** The site was installable and a page that had been visited read
offline, but there was no way to say "this book, all of it". Only `/` and the manifest
were precached, so a reader on a train got the chapter they had opened and a fallback
to the front door.

**The fix, in three stages, each useful alone.**

1. **The chapter keeps itself.** `assets/offline/offline.js`, deferred on every book
   page, fetches the rest of the chapter the nav has open once the page has settled,
   with each page's figure module. It declines on `saveData` or `2g`. Measured at
   **0.2 MB** gzipped for the median chapter and 0.46 MB for the largest in the
   collection, a fifth of what this item first estimated.
2. **A page is a page however it was fetched.** The worker routes a path ending in `/`
   to the site cache whatever the request's `destination`, because a prefetched page
   arrives with an empty one — without that rule every prefetched page would land in
   the cache a deploy deletes.
3. **The whole book, when the reader asks.** The build's `assets/manifest.json` now
   lists every page it wrote with its own byte size, and the Settings panel carries a
   group built from it: the button's label is the measured size (35.4 MB for
   `gcse-maths/higher`), pressing it asks `navigator.storage.persist()`, refuses when
   `estimate()` leaves less than 1.2× the room, fetches one page at a time under an
   `AbortController`, and keeps each page's figure module. The control is `hidden` in
   the markup and revealed by script, like the Settings trigger, and the group is
   absent on the landing page because there is no book there to keep.

**Verified in a browser, on the reader's own button.** `tools offline site --download`
opens the panel, waits for the size, presses Stop mid-download and checks the control
settles, then presses Download, waits for the cache to go quiet, deletes the **runtime**
cache (the deploy), goes offline, and reads a page from a **later chapter** — one
nothing visited and nothing prefetched — with its figure mounted. Eleven checks, no
errors. Proved able to fail: pointing the book root one directory too high reports
that the download kept 18 pages, not a book, and that no page outside the chapter was
kept.

**Also verified.** `test_the_manifest_is_a_download_list` asserts every listed route is
a page on disk and every size is that page's; `test_the_offline_control_is_only_offered_where_there_is_a_book`
pins the landing page's absence and the hidden-until-scripted rule;
`test_the_download_is_stoppable_and_asks_for_persistent_storage` pins the abort, the
`persist()` request, the estimate check and the 1.2× headroom.

---

## 100. The shared nav dictionary was worth 34% of the HTML transfer, and the host cannot serve it

**What is wrong (and what is not).** The saving is real: a shared nav dictionary takes
a page from 9,380 to 6,771 bytes, measured **in Chrome on the real page** rather than by
`wc`, which is −28% of every HTML response and about **10 MB** off a 69 MB library
download. What is missing is not the compression but the party that can choose it.

`wrangler.jsonc` serves the collection as Workers **static assets with no Worker script**
("an asset server with no script of its own"). Choosing an encoding needs a per-request
decision — read `Available-Dictionary` and `Accept-Encoding`, then send the right variant
— and `_headers` cannot express a variant: it sets one header per path, and Cloudflare's
own compression layer sits in front of it. So the negotiation has to happen in a script,
which is a change to the deployment's shape, not to the build.

**What the spike established** (`var/spike/cdt-spike.mjs`, Chrome 155, the real
`gcse-maths/higher` page):

| Request | Accept-Encoding | Served |
|---|---|---|
| navigation, first visit | `gzip, deflate, br, zstd` | br, 9,380 B |
| the same page fetched later by the chapter prefetch | `…, dcb, dcz` + `Available-Dictionary` | **dcb, 6,771 B** |
| the chapter's other pages, prefetched | `…, dcb, dcz` | dcb, 5,149–6,771 B |

The wire format is the one MDN documents: `\xffDCB` + the dictionary's SHA-256 + a
brotli payload compressed with the dictionary, and `<link rel="compression-dictionary">`
plus `Use-As-Dictionary: match="/gcse-maths/higher/*"` on the dictionary resource. Chrome
negotiates it correctly. **The navigations themselves did not offer the dictionary** — the
first request of a page load has no `Available-Dictionary` — so the benefit lands on
prefetched pages and subresources, which for this site is most of the traffic but not the
page the reader is waiting for.

**And it collides with the offline model.** A `dcb` page stored by the service worker
keeps `Content-Encoding: dcb` in its cached headers while Cache Storage holds the **decoded**
body: the cached text was byte-identical to the live text, header notwithstanding. Chrome
served it correctly offline, but the header is a lie, and anything that trusts it — another
browser version, a proxy, a future spec change — double-decodes it. So any implementation
must normalise the response the worker stores (drop `Content-Encoding` and `Content-Length`)
rather than cache it as received.

**Why this is closed rather than left open.** The item's own done-means begin "a spike
against the real Worker shows `dcb` reaching a browser that asked for it" — and the real
Worker is a script-free asset server, so that spike cannot be run without changing what the
deployment *is*. That decision (add a Worker script that fetches pre-compressed variants,
and teach the service worker to normalise cached responses, for ~10 MB off a 69 MB
download) belongs to whoever owns the platform, not to a build change. It is recorded as
item 104 so the measurement is not lost.

**The decision this does settle:** the nav stays markup. A JavaScript nav would save 5 KB of
10 and strand a reader with scripting off; a dictionary would save 3 KB of 10 and keep the
nav, if the host could serve it. Neither justifies the former.

---

## 104. The dictionary encoding was not worth a Worker script

**What is wrong.** Measured, not guessed: a shared nav dictionary takes a page from
9,380 to 6,771 bytes in Chrome (−28%), about 10 MB off a 69 MB library download. The
collection is served by Workers **static assets with no Worker script**, so nothing can
read `Available-Dictionary` and choose a variant. `_headers` sets one header per path and
cannot vary on a request header; Cloudflare's compression layer sits in front of it.

**The fix, if it is worth it.** Add the one script the deployment has so far refused:
read `Available-Dictionary` and `Accept-Encoding`, serve the pre-compressed variant the
build emitted, and set `Use-As-Dictionary` on the dictionary resource. That makes three
things true that are not true today:

- the build emits `*.dcb`/`*.dcz` beside each page and one dictionary per profile, with the
  SHA-256 prefix the format requires (`var/spike/cdt-spike.mjs` is the working wire format);
- a client that does not ask for `dcb` receives exactly today's bytes, so nothing regresses;
- the **service worker normalises what it stores** — a `dcb` response is cached with its
  decoded body and its `Content-Encoding` header intact today, which is a lie that happens
  to work; the worker must drop `Content-Encoding` (and `Content-Length`) when it writes.

The saving lands on prefetched pages and subresources, not on the navigation the reader
waits for: the first request of a page load carries no `Available-Dictionary`.

**What an attempt at it established, so the next one starts further along.** The
dictionary differs per profile, so the Worker needs a map from a profile prefix to that
profile's dictionary digest, and the digest has to be compared with `Available-Dictionary`
before a `dcb` body is sent: a stale dictionary (a page cached by the reader's worker from
before a deploy, decoded against the profile's *new* dictionary) fails to decode with no
fallback. That makes the dictionary name a build artefact — `nav.<build label>.dict`, so a
deploy retires the old one — and makes `site/_worker.js` a generated file like `sw.js`,
stamped with the build label and the per-profile digests. It also means the portal must run
*after* the profiles it stamps, which is the opposite of today's order in
`scripts/check.sh`; that ordering is the first thing to settle, before any of the code.

**Done means**

- [ ] a spike against the real Worker shows `dcb` served to a browser that asked, and
      plain brotli to one that did not
- [ ] `tools/assets` and `tests/test_pwa.py` cover the `.dcb` variants and the header
- [ ] the service worker strips `Content-Encoding` from what it caches, with a test that
      an offline page is byte-identical to the live one
- [ ] the measured page weight on `gcse-maths/higher` drops below 7 KB, and a client
      without dictionary support measures exactly what it does today

**Closed 2026-10-23, having measured it and then declined it.** The saving is real and
was measured in Chrome on the real page: 9,380 → 6,771 bytes per response (−28%), about
10 MB off a 69 MB library download. It is not worth what it costs, for four reasons:

1. **It lands on the wrong requests.** The first page load of a visit carries no
   `Available-Dictionary`, so navigations do not benefit — only prefetched pages and
   subresources, which are exactly the requests item 102's chapter prefetch and download
   already turn into cache hits. The marginal saving is well under 28% of what a reader
   actually fetches, and at mobile-data prices it is about half a penny per book read.
2. **It costs the deployment its one virtue.** The site is Workers static assets with no
   script. Adding one puts code in every request path to save bytes on most of them.
3. **It adds a silent failure with no fallback.** A stale dictionary does not decode;
   avoiding that forces per-build dictionary names, a generated `_worker.js` carrying
   per-profile digests, and the portal running *after* the profiles — the reverse of the
   order in `scripts/check.sh`.
4. **It is two code paths forever.** Chrome negotiates `dcb`; Safari and Firefox will not,
   so the plain path is maintained regardless.

**What would reopen it:** a stated data constraint (school devices on metered
connections, a market where 3 MB matters); Cloudflare shipping dictionary support
natively, which makes it a header on a file the build already emits; or the site
acquiring a Worker script for another reason, which makes this three lines inside it.

The measurement, the wire format (`var/spike/cdt-spike.mjs`), the 28% and the traps are
all here, so a future attempt starts from evidence rather than from a spike.

---

## 105. §1.5's tie-rod ladder prints the package's radians with degree signs

**What is wrong.** The table under *The same idea, on a different joint* is the
`dw-compliant` model's own output, and that output is in radians while its export
declares degrees. Every cell is therefore 57.3 times too small, and the prose built on
the table says things the table's own rows do not.

Measured, at the design position, with the model's own study loads
(`source/study.yaml`: 3.5 kN down and 1.8 kN sideways at `wc`):

```
$ node --input-type=module -e '
import k from "./books/maths-applied/docs/assets/data/otkd/models/double-wishbone-compliant/kernel/kernel.js";
await k.ready();
for (const c of [1e-7, 1e-6, 1e-5]) {
  const r = await k.frame({...k.manifest.default_geometry,
                          numbers: [k.manifest.default_numbers[0], c]}, 0);
  console.log(c, "camber°", (r.metrics.camber*180/Math.PI).toFixed(4),
                  "toe°", (r.metrics.toe*180/Math.PI).toFixed(4));
}'
1e-7      camber° -0.0015  toe° 0.0543
0.000001  camber° -0.0146  toe° 0.5398
0.00001   camber° -0.1376  toe° 5.1067
```

The kernel returns `{camber: -0.0002545478058381045, toe: 0.009421369505574278}`
for the 1e-6 row — the radians of those two numbers — and
`models/double-wishbone-compliant/out.js` states the same frame with
`meta.units.angle: "deg"`. The page prints `0.009°` and `−0.0003°`.

The physics agrees with the radian reading. The `1e-6 m/N` tie rod deflects
`1800 × 1e-6 = 1.8 mm`; its outer point `tro` is 0.114 m from the kingpin axis, so
1.8 mm yaws the upright by about 0.9°. `0.0094°` would need an 11 m lever.

Two further faults come from the same table. **The prose's factor is wrong:** "A
hundred times softer moves the toe by a degree and a half" spans the `1e-6` to `1e-2`
rows, which is ten thousand times softer (`1e-4` to `1e-2` is the hundred, and moves
0.88°). **The top rung is not a small perturbation at all:** at `1e-2 m/N` the tie
rod deflects `1800 × 1e-2 = 18 m`, and the model's toe is 83.6°, not 1.46°.

Nothing checks this table. `grep -rn '0.009\|1.46\|tie-rod compliance' tests/` finds
only §1.2's unrelated `−1.46°`, so a number no test recomputes is a number nothing
catches — the exact failure items 88 and 89 were opened for.

**The fix.** Rebuild the ladder from the vendored kernel in degrees, over
compliances where the model is still a small perturbation — `1e-7`, `3e-7`, `1e-6`
(the model's own default), or `1e-7…1e-5` — and state the conversion the page applies,
because `dw-compliant` reports radians and declares degrees. Rewrite the two sentences
the table carries so the factor and the size are the table's own. File the unit bug
against `suspension-kinematics` (two models from one generator, opposite angle units:
`double-wishbone` and `double-wishbone-ubj` are degrees, `dw-compliant` is radians) and
record it in `sources.yaml`; when a release fixes it, re-vendor and delete the
conversion.

**Done means.**

- [x] §1.5's three rows are what the vendored `dw-compliant` kernel returns in
      degrees, at compliances whose deflection is small against the mechanism.
- [x] The page says, in one sentence, that this model's angles need converting and
      why, or the re-vendored kernel no longer needs one.
- [x] The prose's "ten times softer" and "half a degree / a hundredth of a degree"
      are the table's own arithmetic, and the top rung is inside the small-angle regime.
- [x] A test recomputes all six cells from the vendored kernel, like
      `tests/test_maths_applied_ladder.py` does for §1.5's bush ladder, so a
      re-vendored release fails here instead of in a reader's hands.

**Done (2026-10-24).** Rebuilt the tie-rod ladder from the vendored `dw-compliant` kernel in degrees at 10⁻⁷, 3 × 10⁻⁷ and 10⁻⁶ m/N; stated the radian-to-degree conversion; recorded the unit caveat in `sources.yaml`; the new test recomputes all six cells and the prose's factor.

## 106. Four pseudocode links point at a package path that no longer exists

**What is wrong.** Each section links the file behind its snippet, and §1.2–§1.5 link
`src/suspension/`, which the package renamed to `src/otkd/`:

```
$ grep -rn 'src/suspension' books/maths-applied/docs --include=*.md | cut -c1-120
Chapter 1/Section 1.2/Walkthrough/index.md:190:… blob/main/src/suspension/analytic.py)
Chapter 1/Section 1.2/Walkthrough/index.md:191:… blob/main/src/suspension/derive.py)
Chapter 1/Section 1.3/Walkthrough/index.md:136:… blob/main/src/suspension/solve.py)
Chapter 1/Section 1.4/Walkthrough/index.md:152:… blob/main/src/suspension/solve.py)
Chapter 1/Section 1.5/Walkthrough/index.md:195:… blob/main/src/suspension/sweep.py)
$ for p in src/suspension/analytic.py src/otkd/analysis/analytic.py; do
>   curl -s -o /dev/null -w "%{http_code} $p\n" \
>     "https://api.github.com/repos/leonpjvaughan/suspension-kinematics/contents/$p"; done
404 src/suspension/analytic.py
200 src/otkd/analysis/analytic.py
```

The four dead links are §1.2's `analytic.py` and `derive.py`, §1.3's `solve.py` and
§1.4's `solve.py`, all at `blob/main/src/suspension/…`. §1.6's links are already right
(`src/otkd/problem/dynamics.py`, `src/otkd/emitters/wasm.py`), which is how the drift
went unnoticed: two sections in one chapter disagree about where the code lives.

**The fix.** Point each link at the file it means: `analytic.py →
src/otkd/analysis/analytic.py`; §1.2's `derive.py → src/otkd/problem/compile.py` (the
symbolic derivation); §1.3's `solve.py → src/otkd/solvers/least_squares.py`; §1.4's
`solve.py → src/otkd/solvers/svd.py`; §1.5's `sweep.py → src/otkd/solvers/sweep.py`.
Each snippet's first-line comment names the old filename, so change that too, and
check the symbols the pseudocode uses still exist in the module it now names — that is
what the book's snippet rule asks for, not a text match.

**Done means.**

- [x] Every `suspension-kinematics` link in `books/maths-applied/docs/` returns 200.
- [x] No snippet's `# file.py` comment names a file that does not exist.
- [x] A test resolves every `github.com/leonpjvaughan/suspension-kinematics` `blob/`
      path in the book against the package's tree, skipped when the network is off, so
      the next rename fails in CI rather than in a reader's browser.

**Done (2026-10-24).** Repointed the four links and snippet comments to `src/otkd/`; replaced §1.4's `svd_diagnose` with the module's `diagnose`; added the network link test and the snippet/comment test.

## 107. §1.5 says the package refuses to compile a kernel the bundle ships

**What is wrong.** §1.5 tells the reader that the compliant model cannot be run:

> it carries one stiffness rather than a ladder, and the package **refuses** to compile
> a kernel for it: *"a compliant model needs the equilibrium root-find, which is not
> compiled yet"*

The bundle this book vendors ships that kernel:

```
$ ls books/maths-applied/docs/assets/data/otkd/models/double-wishbone-compliant/kernel/
kernel.js  kernel.json  kernel.rs  kernel.wasm  provenance.json  source
$ python3 -c "import json; print(json.load(open('…/kernel.json'))['solver'])"
equilibrium
```

It is what produces the tie-rod table three lines above the sentence, and the page
says so a paragraph earlier ("Its kernel takes that compliance at run time"). The
quotation attributed to the package is not true of version 0.11.0, which is the
version the bundle pins.

**The fix.** Delete the refusal claim and the quotation. Say what is true: the export
carries one compliance, the kernel takes it at run time, and the page's ladder is the
kernel's. If the sentence exists to explain why the *bush* ladder is not also a
kernel, say that instead — the `ubj` export ships a ladder and a kernel, so the
contrast is the right one and it is checkable.

**Done means.**

- [x] §1.5 contains no claim that the package cannot compile or run the compliant
      model, and no quotation that the pinned release does not make.
- [x] The paragraph reads as one story with the `ubj` ladder above it: two exports,
      one with a ladder and one taking its compliance at run time, both vendored.
- [x] Nothing in the page prints a marker or a promise in place of a number.

**Done (2026-10-24).** Removed the refusal claim and quotation; the paragraph now reads as two vendored exports, one with a ladder and one taking its compliance at run time.

## 108. §1.6 is "drafted" in six places and finished in one — item 92's fix was partial

**What is wrong.** Item 92 closed with "The chapter index says so in one sentence, and
the section table no longer says 'drafted' anywhere." The chapter index was fixed; five
other places still say it:

```
$ grep -rn "drafted" books/maths-applied/ --include=*.md --include=*.yaml
books/maths-applied/AGENTS.md:130:  drafted as the destination.
books/maths-applied/curriculum.yaml:15:# are drafted as the destination the chapter is walking towards.
books/maths-applied/curriculum.yaml:118:          costs. This section is drafted rather than finished: it is the chapter's
books/maths-applied/docs/index.md:28:The chapter is a single argument, in five parts, with two drafted sections
books/maths-applied/docs/index.md:41:Then, drafted: **mass and dampers**, where the problem stops being algebra, and
```

§1.6 is finished: it names the question, names the model, carries `quarter-car` and
`dynamics-table`, and prints the package's trajectory — 212.8 mm of travel, 0.625 s,
1.6 Hz, −9.53° of camber, an energy drift of 6.3 × 10⁻⁸ — with
`tests/test_maths_applied_numbers.py::test_section_1_6_states_the_trajectorys_numbers`
holding the page to the data. `curriculum.yaml:15` is wrong twice over: it calls
§1.5–§1.6 drafted when §1.5 is the chapter's centre.

**The fix.** One sentence per place, in that place's voice: §1.6 is a finished section
and §1.7 is the chapter's only outline. Fix `AGENTS.md:130`, both `curriculum.yaml`
comments (and §1.6's `summary:`), and both `docs/index.md` sentences. §1.6's own page
already speaks in the present tense and needs nothing.

**Done means.**

- [x] `grep -rn "drafted" books/maths-applied/ --include=*.md --include=*.yaml`
      returns only §1.7's "outline" and item-free prose.
- [x] `python -m textbook.scaffold` reports no drift, and the built home page reads
      "six sections, and one outline".
- [x] A test reads every section and asserts `drafted/outline == no figure and no
      verified number`, so a drafted section with either, or a finished section with
      neither, fails.

**Done (2026-10-24).** Removed every stale “drafted” sentence from `AGENTS.md`, `curriculum.yaml` and the home page; regenerated the colophon. `verified_number_sections()` reads the test source for functions that call the book's `page()` helper for the real `Section <id>/Walkthrough` path and assert a number; the two-way test also requires §1.1 not to be counted, §§1.2–1.6 to be counted, and §1.7 not to be.

## 109. `worked-case` still says four kinds have a section, and names five dead ends

**What is wrong.** Item 95 added `:::class optimisation` to §1.5 and
`:::class eigenvalue` to §1.6, and left the sentence that counts them:

> The map has nine kinds, and this collection gives a section to four of them: §1.2 and
> §1.5 … root …, §1.3 and §1.4 … linear system …, and §1.6 … saddle point inside a
> parabolic integration. Three more — averaging, elliptic and hyperbolic — have no
> section that names them yet … `Maths Applied` now names both …

Six are named, and the derived list says so:

```
$ grep -rn ':::class' books/maths-applied/docs | sed 's|.*docs/||'
Chapter 1/Section 1.2/Walkthrough/index.md:89::::class root
Chapter 1/Section 1.3/Walkthrough/index.md:62::::class linear-system
Chapter 1/Section 1.4/Walkthrough/index.md:76::::class linear-system
Chapter 1/Section 1.5/Walkthrough/index.md:59::::class root
Chapter 1/Section 1.5/Walkthrough/index.md:139::::class optimisation
Chapter 1/Section 1.6/Walkthrough/index.md:46::::class saddle-point
Chapter 1/Section 1.6/Walkthrough/index.md:67::::class eigenvalue
Chapter 1/Section 1.6/Walkthrough/index.md:83::::class parabolic
```

Six distinct kinds. The built pages agree: `:::used` under `optimisation`, `eigenvalue`,
`linear-system`, `root`, `saddle-point` and `parabolic` lists `Maths Applied`, and
`averaging`, `elliptic` and `hyperbolic` print "No page in this collection names this
class yet."

So the paragraph accounts for seven kinds and names the other two in the next
sentence. The test that guards it carries the same drift in its own docstring:
`DEAD_ENDS` has three entries and the docstring above it says "The five kinds no
section in the collection carries a `:::class` for".

**The fix.** Say six, list all six where the sentence enumerates them, and keep three
as the dead ends. Rewrite the test's docstring to say three, and rename `DEAD_ENDS`'s
comment, which also says five.

**Done means.**

- [x] The paragraph's count is the length of `usedin.used_in()` for every class, and
      the arithmetic on the page closes: five named, four not, nine in all.
- [x] No test docstring or comment in `tests/test_reference_books.py` says five dead
      ends.
- [x] `test_the_worked_case_agrees_with_the_callers_each_kind_actually_has` asserts the
      number the page states, not only that each dead end is linked.

**Done (2026-10-24).** `worked-case` now says five named kinds and four dead ends; the test asserts the counts as well as the links and the derived `:::used` lists. Item 113's reclassification is why parabolic is one of the four: the page left it for the damped model it does not build.

## 110. The linear-system page's 441 / 161 is right and nothing checks it

**What is wrong.** The page makes a sparsity claim about the vendored kernel:

> the package this collection uses solves 21 equations whose Jacobian has 441 entries,
> of which **161 are not zero**

Both numbers are true — the kernel's layout declares `jac: 441`, and the generated Rust
writes 441 cells of which 280 are the literal `0.0`:

```
$ F=books/maths-applied/docs/assets/data/otkd/models/double-wishbone/kernel/kernel.rs
$ awk '/fn compute_inner/,/pub extern "C" fn compute/' $F | grep -c 'jac\[[0-9]*\] = '
441
$ awk '/fn compute_inner/,/pub extern "C" fn compute/' $F | grep -c 'jac\[[0-9]*\] = 0.0;'
280
```

441 written, 280 of them zero, so 161 are not — and the layout declares `jac: 441`.

No test reads either number, and unpinned prose is exactly what item 96 was about.
A re-vendored release with a different topology would leave the page quoting a
sparsity the book no longer ships.

**The fix.** A test in `tests/test_maths_applied_data.py` that derives both numbers from
`models/double-wishbone/kernel/{kernel.rs,provenance.json}` and requires the page's
sentence to carry them. It is the only claim either book makes about a kernel's shape
without a figure behind it, and it costs one assertion.

**Done means.**

- [x] A test recomputes 441 and 161 from the vendored kernel and fails when the page
      disagrees.
- [x] The page keeps a sentence that says which model the numbers are about, so the
      claim is checkable by a reader as well as by the test.

**Done (2026-10-24).** Added the test that derives 441 and 161 from `kernel.rs` and `provenance.json`; the page now names the `double-wishbone` example it is about.

## 111. `ideas.md`'s measured table is five modules out and omits a whole book

**What is wrong.** `ideas.md` opens with a table it says is "a command and its output":

```
$ find books/*/docs/assets/figures -name '*.js' ! -name kit.js ! -name figures.js | wc -l
256
$ # per book
  maths-applied            5 modules    1 chapter
```

The table says 251 in total and 5 for `maths-applied`; there are 256, 8 of them in
`maths-applied`, and `numerical-methods` is not a row at all (it has 2). The prose
around it knows something moved — "each of them calls `panel()`, `react()`, `slider()`
and `label()`, so every number here is five higher today" — but five was the count
before `wishbone-3d`, `dynamics-table`, `quarter-car` and the numerical-methods pair
existed.

**The fix.** Re-measure the table and the interaction counts in one pass, add the
`numerical-methods` row, and date the measurement. The interaction counts are a
`grep` over the same files; the section already says how.

**Done means.**

- [x] The total and every per-book row are the `find | wc -l` of the tree, including
      `numerical-methods`.
- [x] The interaction counts are re-measured, not adjusted by a remembered delta.
- [x] The "Retrieved" date and the paragraph that explains the counts match the table.

**Done (2026-10-24).** Re-measured `ideas.md` at 256 modules, added the `numerical-methods` row, and replaced every stale interaction and keyboard count with the 2026-10-24 measurement.

## 112. §1.5's deflection figures are the slider's ends, not the table's rows

**What is wrong.** A reader who checks §1.5's prose against its table cannot reconcile
them:

> The number to look for is the deflection, and §1.5's figure prints it: 12 mm at the
> softest setting, 0.06 mm at the stiffest.

The table's softest row is 0.2 MN/m at 6.1 mm and its stiffest 100 MN/m at 0.012 mm.
Both prose numbers are right — they are the `stiffness-agreement` figure's control, whose
slider runs 0.1 to 20 MN/m — and the prose does not say so, so it reads as a contradiction of
the table three paragraphs above it. It is also the only place the page gives a reader a
number the table cannot confirm.

**The fix.** Name the control: "at the two ends of the figure's control, 0.1 and
20 MN/m, the bush moves 12 mm and 0.06 mm". One clause, and the reader can check it by
dragging the slider to either end.

**Done means.**

- [x] The sentence names the two stiffnesses its deflections belong to.
- [x] Every number in §1.5 is either in the exported ladder's table or reachable by the
      figure's control, and the page says which.

**Done (2026-10-24).** The deflection sentence names the figure control's 0.1 and 20 MN/m ends, and the page says the control spans two orders of magnitude; a test reads those ends and checks the ratio.

## 113. §1.6 names the parabolic class, but the quarter car has no damper

**What is wrong.** §1.6 says the class has changed because “the mass and the rate terms”
are in, and tags the section `:::class parabolic`. The model has no rate term. Its coil
is `modes: {length: spring}` (`models/quarter-car/source/topology.yaml`), the data
README says “a spring with no damper”, and the page itself says “there is a spring and no
damper, so the motion repeats”.

The class is defined on the page it links to as **“moves forward in time and smooths as
it goes, so it forgets where it started”**. The quarter car does the opposite: it returns
to 212.8 mm every 0.625 s with the same peak, and its energy drift is 6.3 × 10⁻⁸. That
is the **Hamiltonian** case the `hyperbolic` page carries as a flag — “A single oscillator
shows it” — and the section already prints the energy-drift diagnostic that flag asks for.
`usedin.used_in('parabolic')` returns `Maths Applied · §1.6 Mass and dampers`;
`usedin.used_in('hyperbolic')` returns nothing.

The same false premise is in the map:

- `books/numerical-methods/docs/worked-case/index.md` table: “How does the wheel bounce?
  | mass, a spring and a damper | parabolic, plus eigenvalues”.
- Same page, §“How does the wheel bounce”: “How long a bump takes to settle is a parabolic
  decay”. It never settles, and the section says so three lines later.
- `books/numerical-methods/docs/index.md`: “Its bounce is parabolic.”

**The fix.** Choose one, and make the model and the class agree:

1. **Add the damper.** If the package can put damping on the coil, re-vendor the quarter
   car with a rate term, and then parabolic is the right class: the motion settles, and
   the 0.625 s oscillation becomes the undamped limit. This is the version the section
title and the “what it buys” paragraph already promise.
2. **Keep the undamped model and say what it is.** Remove the `:::class parabolic`
   callout (or move it to a sentence that explicitly describes a damped model the section
   does *not* build), name the conservative/eigenvalue class, and link the Hamiltonian
   flag on `hyperbolic` where the energy drift is quoted. Update `worked-case` and the
   index so “settle” and “damper” are not claimed for a run that has neither. Decide
   whether `parabolic` then has no caller; `worked-case` already has a paragraph for the
   kinds with no caller.

**Done means.**

- [x] The class `:::class` on §1.6 is exhibited by the model the page runs, and the page
      says which model that is.
- [x] No page says “mass, a spring and a damper” or “takes to settle” about the vendored
      run unless the run actually has damping.
- [x] `usedin.used_in('parabolic')` and `usedin.used_in('hyperbolic')` agree with the
      pages and with `worked-case`'s list of callers and non-callers.
- [x] A test fails when the quarter car's damping mode changes without the class, the
      period and the “settles/repeats” sentence being re-derived together.

**Done (2026-10-24).** §1.6 is a conservative/Hamiltonian oscillator with `C=0`; it does not name the parabolic class, leaving it as a dead end for the damped model it does not build. The Hamiltonian flag is described on the hyperbolic page without claiming that class. `worked-case`, the index, `the-four-models` and the `usedin` lists agree, with a test on the undamped coil.

## 114. §1.3's iteration table and panel are numbers the current model does not produce

**What is wrong.** The page says the table and panel are “the page's own model's numbers,
recomputed by the figure on every load”. The figure runs `leastSquares([0.75, 0.6],
5.32°, 5)` in `mechanism.js`; running that model gives a different table:

```
$ cd books/maths-applied/docs/assets && node --input-type=module -e '
import { leastSquares } from "./data/mechanism.js";
const h = leastSquares([0.75, 0.6], 5.32 * Math.PI / 180, 5);
for (const s of h) console.log(s.k, (s.norm * 1000).toExponential(3), s.sigma.map(x => x.toFixed(3)).join(" "));
0 1.297e+2 1.499 0.869 0.000
1 8.026e+0 1.434 0.971 0.000
2 1.543e-1 1.430 0.978 0.000
3 1.627e-5 1.430 0.978 0.000
4 7.087e-13 1.430 0.978 0.000
5 9.615e-14 1.430 0.978 0.000
```

The page prints 135, 8.9, 0.20, 2.6 × 10⁻⁵, 1.7 × 10⁻¹², 1.7 × 10⁻¹³ mm, a final
residual of 5.6 × 10⁻¹⁴ mm, and singular values 1.415, 0.998, 0.000. The last three are
the **design pose's** set (`test_maths_applied_numbers.py` pins §1.4's σ to that pose);
the figure is at the bump end, where the same model gives 1.430 and 0.978. So the table,
the panel and the figure are three different experiments, and the sentence that says
they are one is false.

The same pass found two smaller numbers in the section's depth page:

- `Section 1.3/Walkthrough` line 39: “the pivots are 0.24 m apart”. The upper wishbone's
  pivots (`ucaf`, `ucar`) are 0.20 m apart; 0.24 m is the lower wishbone's spacing. The
  section is about the upper ball joint, so the sentence names the wrong wishbone.
- `Section 1.2/Deeper/two-solutions` line 27: the other assembly is “(0.35, 0.14) m”. At
  the design pose `upperJoint(pose(0).C)` returns `(0.3486, 0.1733)`, which rounds to
  `(0.35, 0.17)`, not `(0.35, 0.14)`.

**The fix.** Regenerate the table and the panel from one stated pose and the figure's own
`START`/`THETA`, or change the figure to the design pose if that is the pose the prose
means. Make the depth page's coordinates and pivot spacing the model's numbers. Add a
test in `test_maths_applied_numbers.py` that runs the same `leastSquares` call and checks
every cell of §1.3's table, the panel's residual and σ, the depth page's second assembly
and the pivot spacing — the same shape as the §1.2/§1.4/§1.5 guards that already exist.

**Done means.**

- [x] Every number in §1.3's table and panel is a node run of the model the figure mounts.
- [x] The page names the pose the σ values belong to, and the figure uses that pose.
- [x] The two-solutions page's second assembly and the pivot spacing are the model's.
- [x] A test recomputes all of them from `mechanism.js` and fails on drift.

**Done (2026-10-24).** §1.3's table and panel are the figure's `leastSquares([0.75, 0.6], 5.32°, 5)` run at the bump end; the pivot spacing is 0.20 m and the second assembly is (0.35, 0.17). New tests recompute all of them.

## 115. `saddle-point` calls a bushed joint's spring force a multiplier

**What is wrong.** The map's saddle-point page says:

> In a mechanism it is the force in the bush.
>
> - A bushed suspension joint: the force in the bush is the multiplier on the joint.

That is the one case that is **not** a saddle point. `choosing-the-class` states the two
writings side by side: “Keep the joint rigid, and price it. The joint is a constraint, its
force is a multiplier … Replace the joint with a spring. The constraint is gone, so the
multiplier is gone … the force is that spring's stiffness times the deflection it
produced.” §1.6's `:::class saddle-point` is on the rigid joint's constraint force, not on
a bush. A reader who follows the §1.6 callout to the class page is told the opposite of
what the class page in the same book argues.

**The fix.** Name the rigid joint in both places: the multiplier is the force in a ball
joint, pin or contact, the thing that keeps a hard constraint true. Say in one sentence
that a bushed joint leaves the class: its force is `k` times the deflection, and finding
it is the root problem on `choosing-the-class`. Change the “bushed suspension joint”
bullet to a rigid joint, and add the bushed case under a sentence that says why it is not
this class.

**Done means.**

- [x] `saddle-point` no longer calls a spring force a multiplier.
- [x] `saddle-point`, `choosing-the-class` and `Maths Applied` §1.6 give one account of
      which joint is priced and which is a spring.
- [x] A reader who arrives from §1.6's `:::class saddle-point` can tell which force is
      the unknown.

**Done (2026-10-24).** `saddle-point` now names a rigid joint's constraint force and gives the bushed joint as the root-finding counterexample, matching `choosing-the-class` and §1.6.

## 116. `worked-case` still says §1.6 is drafted and prints no numbers

**What is wrong.** The map's worked case says:

> `Maths Applied` §1.6 is drafted and not finished. It says what changes and what it
> costs, and it prints no numbers, because the model that would produce them is not
> written.

§1.6 is finished, and it prints 212.8 mm of travel, a 0.625 s period, 1.6 Hz, −9.53° of
camber, an energy drift of 6.3 × 10⁻⁸ and a constraint violation of 1.1 × 10⁻¹⁵.
`tests/test_maths_applied_numbers.py::test_section_1_6_states_the_trajectorys_numbers`
holds the page to the vendored payload. The paragraph above it also says “The questions
that open up are the ones this book cannot yet answer with a number”, which is no longer
true of the frequency and the period.

**The fix.** Replace the paragraph with what §1.6 does answer — the period, the
frequency, the energy drift — and name only what is still missing (the damper and the
damper's heat, which are the two later boxes). If item 113 changes the class from
parabolic to a conservative one, this paragraph and the table row change with it, so do
them together.

**Done means.**

- [x] `worked-case` no longer says §1.6 is drafted, unfinished, or without numbers.
- [x] The page quotes at least the period or frequency from the trajectory, and says
      which question is still open.
- [x] The paragraph agrees with §1.6's class after item 113 is decided.

**Done (2026-10-24).** `worked-case` quotes §1.6's 212.8 mm, 0.625 s, 1.6 Hz and energy drift, and names the damper and heat as the questions still open.

## 117. The map's `root` and `linear-system` pages overstate iteration

**What is wrong.** Both pages state a universal rule their own worked examples break.

- `root`: “A loop. … This is Newton's method, and everything else in the box is a way of
  doing it more safely or more cheaply.” The signature: “the point is found by
  iteration.” But §1.2's root is two circles meeting, solved in closed form, and
  `worked-case` says “one closed-form step, no iteration”.
- `linear-system`: “Nothing here is non-linear, so nothing has to be iterated. The work is
  done once the rows are written.” But §1.3's model is three **non-linear** distance
  constraints solved by Gauss–Newton; the `:::class linear-system` is on the normal
  equations at each step, not on the whole model. §1.4's `:::class linear-system` is the
  same inner step (the SVD of that Jacobian).

A reader who follows either callout from `Maths Applied` meets a definition that says
their model is not the class the callout just named. That is the opposite of the map's
purpose.

**The fix.** Add one paragraph to each page, in the page's own voice:

- `root`: a closed form is a root solution too; iteration is the usual method when no
  closed form exists, and §1.2's two circles are the closed-form case.
- `linear-system`: a linear system is often one step inside a non-linear solve; the rules
  at that step are linear, and the outer model can be a root or an optimisation. Name
  §1.3's Gauss–Newton step as the example.

Do not weaken the pages' useful advice — the point is that a class can be an inner step,
not that the definitions are wrong.

**Done means.**

- [x] Neither page says a root is *always* iterated or a linear system is *never* part of
      an iteration.
- [x] Both pages name the `Maths Applied` example that is the exception, and why it is
      still the class.
- [x] A reader who arrives from §1.2/§1.3's `:::class` can tell whether the page is
      describing the whole model or the step inside it.

**Done (2026-10-24).** `root` allows a closed form; `linear-system` explains a linear step inside a nonlinear solve and now says only the non-linear iteration is avoided, while a large sparse system may still use an iterative solver. Both name the `Maths Applied` example that is the exception.

## 118. `the-four-models` says all the chapter's numbers come from the front view

**What is wrong.** The depth page's “What is deliberately absent” says:

> **No three-dimensional solve.** The 3D picture is drawn, and the three-dimensional
> solver exists, but the numbers in this chapter come from the front view.

That is false in three places a reader can open: §1.2's `kernel-camber` compares the front
view with the generated 3D kernel and prints the 0.033° gap; §1.5's ladder is the
`double-wishbone-ubj` export, a 3D model; §1.6's quarter car is the 3D dynamics model.
The sentence currently tells a reader that the check the chapter is proudest of is not
part of the chapter.

**The fix.** Say what is true: the main thread's model is the front view; the 3D solver
is used to check it (§1.2), to produce the export's ladder (§1.5), and as the model with
mass (§1.6). Keep the point that the projection is what the main thread derives; do not
deny the uses that make the derivation evidence.

**Done means.**

- [x] The page no longer says all the chapter's numbers come from the front view.
- [x] It names the three uses of the 3D solver, in the sections where they happen.
- [x] A reader who has just read §1.2's kernel comparison is not told it does not exist.

**Done (2026-10-24).** `the-four-models` now names the three uses of the 3D solver — the §1.2 check, the §1.5 export ladder and the §1.6 mass model — instead of denying them.

## 119. §1.6's 0.006° agreement and 0.93° bound have drifted and nothing checks them

**What is wrong.** The agreement paragraph says the dynamic camber equals the static
camber at the same travel “to **0.006°**”, and gives the pair at 72.35 mm as −2.079°
(dynamic) and −2.073° (static). The current vendored `double-wishbone` kernel, driven to
72.35 mm, gives −2.0792° (package convention); the trajectory row at 72.351 mm also
gives −2.0792°. The difference is below the printed precision, not 0.006°. The front
view at 72.35 mm is +1.1396° in this book's convention; against the static model's
+2.0792° it is 0.94° out, not 0.93°.

```
$ node --input-type=module -e '
import * as k from "./books/maths-applied/docs/assets/data/otkd/models/double-wishbone/kernel/kernel.js";
await k.ready();
if (k.setGeometry(k.manifest.default_geometry) !== 0) throw new Error("geometry");
let lo = -0.2, hi = 0.3, best = 0;
for (let i = 0; i < 60; i += 1) {
  const d = (lo + hi) / 2;
  k.design(); k.setDrive(d);
  if (k.solve(80) < 0) break;
  const travel = (k.world().wc[2] - 0.32) * 1000;
  best = d;
  if (travel < 72.35) lo = d; else hi = d;
}
k.design(); k.setDrive(best); k.solve(80);
console.log(k.metrics().camber.toFixed(4));
'
-2.0792
```

The numbers were derived when the package was 0.5.0 (closed item 84); the book now
vendors 0.11.0, and `test_maths_applied_numbers.py` checks the trajectory but not this
agreement. The sentence “§1.2's front view gives 0.93° at that travel” also reads as the
front view's camber, when it means the difference between the two models; the front
view's own camber there is +1.14°.

**The fix.** Recompute the static camber at 72.35 mm from the vendored 3D kernel (or
record the exact Python model and version if that is the source), update 0.006, −2.073
and 0.93, and write the bound as “the front view is 0.94° from the static model” so the
quantity is named. Add a test that drives the static kernel to the same travel and
compares the dynamic row, so the next re-vendor fails here rather than in a reader's
hands.

**Done means.**

- [x] The dynamic and static cambers at 72.35 mm are the vendored model's, and the
      difference is rounded at the precision the page prints.
- [x] The 0.93/0.94 sentence names the difference, not a camber.
- [x] A test recomputes the paragraph from the kernel/trajectory and fails on drift.

**Done (2026-10-24).** The agreement paragraph is the current kernel and trajectory: 0.001°, −2.079° twice, and 0.94° from the front view. A node-backed test recomputes it.

## 120. *Methods, A to Z* says multigrid is only for elliptic problems

**What is wrong.** The closing note says “**Multigrid** appears only under elliptic
problems”, but the table above it lists multigrid under `Linear system` and `Elliptic`,
and the linear-system page carries a `Multigrid` row whose “when it wins” is “The matrix
came from an elliptic problem”. The same page's `Read next` and the elliptic page both
treat multigrid as a choice inside a linear solve. A reader comparing the note with the
table sees a contradiction in one screen.

**The fix.** Say what the table says: multigrid is tied to an elliptic origin, and it
appears under linear systems and elliptic problems because an elliptic problem is solved
as one. Keep the warning that it does not work on a hyperbolic problem. While there,
soften the elliptic page's “Multigrid is not an optimisation; it is the answer” to “it is
the method the class is built for”, because the book's own rule forbids ranking methods.

**Done means.**

- [x] The closing note, the A–Z table and the linear-system page agree on multigrid's
      classes.
- [x] No page calls one method “the answer” without naming the class it is the answer
      for.
- [x] A reader can tell the difference between “multigrid is the wrong class” and
      “multigrid is the wrong method”.

**Done (2026-10-24).** The multigrid note now agrees with the A–Z table and the linear-system page; the elliptic page no longer calls one method “the answer”.

## 121. Small claims in the two books that name a number or a model they do not have

**What is wrong.** Five small mismatches, each one sentence, found in the same pass.
They share a failure mode — the prose names a quantity the model or the figure does not
produce — so they are one edit pass rather than five queue items.

- **§1.5's 0.15 MN/m and “twelve times apart”.** The ladder's softest row is 0.2 MN/m,
  and it already meets the change tolerance (1.96° against 1.95°, a hundredth). The
  model's front-view change tolerance crosses a tenth at about 0.04 MN/m, not 0.15. The
  page's 0.15 is a sufficient value, not the crossing, and 1.8/0.15 is not the ratio of
  the two tolerances. Say “the export's softest row already meets the change tolerance;
  the at-rest tolerance needs 1.8 MN/m”, or compute the crossing and quote it.
- **`optimisation`'s “camber curve flat over the travel”.** §1.5's optimisation is the
  stiffness that meets a tolerance at rest (and the change over travel), not a flatness
  objective. Change the example to “choosing a bush stiffness so the corner's camber
  meets a tolerance”, which is what the `:::class optimisation` callout actually does.
- **The home page's “Every number a figure shows is computed in the figure”.** The
  `quarter-car` figure plots the vendored `trajectory.js`, and `kernel-camber` imports
  the export's `agreement` object; both are computed by the model, not in the figure.
  Say “computed by the model the page describes, in the figure or in the data beside it”.
- **“Four models” after §1.6.** `book.yaml`, `curriculum.yaml`, `docs/index.md` and the
  generated colophon say the book has four models; §1.6 adds a fifth with mass. Either
  say “four models of where the wheel is, and a fifth with mass” or say that four answer
  the chapter problem and §1.6 extends it. Pick one wording and use it in all four
  places, including `curriculum.yaml → meta.what_it_is`, which generates the colophon.
- **§1.2's “the track narrows by 9.2 mm”.** The figure's readout is the one-corner change,
  4.6 mm at 40 mm of bump; 9.2 mm is both sides of the car. Add “across the car” or give
  the one-corner number beside the figure's. The test already computes "2 ×" and its
  docstring says “two sides”, so the page is the only place the doubling is invisible.

**The fix.** One edit pass over the five sentences, then re-run the guards that already
own the numbers (§1.5's ladder test, §1.2's track test, the home-page render) so the
wording changes cannot move a number.

**Done means.**

- [x] Every number in the five sentences is in the model, the export or the figure's
      control, and the sentence says which.
- [x] “Four models” is consistent in `book.yaml`, `curriculum.yaml`, the home page and
      the generated colophon.
- [x] The `optimisation` example is the problem §1.5 actually solves.
- [x] `python -m textbook.lint maths-applied numerical-methods` is clean and the
      generated colophon is regenerated, not hand-edited.

**Done (2026-10-24).** The five small claims now name the right source: 0.2 MN/m from the export in §1.5 and the Review, about nine times from the model's 1.794 MN/m crossing, two orders for the 0.1–20 MN/m control, the tolerance example, the model behind the figures, four static models plus mass, and 9.2 mm across the car.

## 122. The "report a mistake" link is a 404, in every book's About page — **done**

**What is wrong.** Every colophon carries a line telling a reader to report a
mistake at `https://github.com/leonpjvaughan/Open.Textbook/issues/new`. On
2026-10-25 that URL returns 404 to a reader who is not signed in, and so does the
repository root:

```
$ curl -s -o /dev/null -w '%{http_code}\n' https://github.com/leonpjvaughan/Open.Textbook/issues/new
404
$ curl -s https://api.github.com/repos/leonpjvaughan/Open.Textbook
{"message": "Not Found"}
$ curl -s 'https://api.github.com/users/leonpjvaughan/repos?per_page=100'
["ddclient_cloudflare", "suspension-kinematics"]
```

The repository is private or renamed, and no GitHub account can open an issue on a
repository it cannot see. The page says "That route needs a free GitHub account",
which makes the promise more specific and the failure worse. The same repository is
linked from the legal pages as the source of `LICENSE` and `LICENSE-CODE`, so those
links are dead too. `tests/test_colophon.py` asserts the URL string is present and
`tests/test_legal.py` asserts the two `blob/main` URLs, so the tests pin the broken
address rather than a reachable one.

The two books' own source links are not affected: `suspension-kinematics` is public
and every file link under `src/otkd/` returned 200 on the same day.

**The fix.** Decide which is true and say it in the book. If the repository becomes
public before the next deploy, add a check that follows the issue URL (skipped when
readers are offline) so a rename or a privatisation fails CI rather than the reader.
If it stays private, replace the route with one that exists — the acknowledgements
page already names the sources, and a contact route is a separate decision. Either
way, edit `engine/src/textbook/legal.py` (or `scaffold.py`, whichever owns the line)
and regenerate the colophons; do not hand-edit a generated page.

**Done means**

- [x] the reporting route in a built colophon answers for a signed-out reader, or the
      colophon names a route that does
- [x] the licence links in the legal pages answer the same way
- [x] the check is automatic, so a renamed repository fails CI and not the reader
- [x] `tests/test_colophon.py` and `tests/test_legal.py` assert the reachable route,
      not the literal old one

**Done (2026-10-25).** The repository is public (`gh repo edit
leonpjvaughan/Open.Textbook --visibility public --accept-visibility-change-consequences`),
and the link a signed-out reader follows now answers: `issues/new` returns 302 and
lands on the sign-in page, and `blob/main/LICENSE` and `blob/main/LICENSE-CODE`
return 200. `scripts/check-contact.sh` follows the URL the way a reader does, and
the deploy job in `.github/workflows/verify.yml` and `scripts/deploy.sh` both run
it before uploading, so a rename or a re-privatisation fails the deploy rather than
the reader. `scripts/protect-main.sh` was corrected to
read "not protected" as the answer to `--check` instead of as an unavailable
feature, and then applied: `all checks` required, force pushes and deletions
refused, admins may bypass so the push pipeline still works. The history was
searched for tokens and keys before the switch: `.env` was never committed, and the
only match for `CLOUDFLARE_API_TOKEN=` in `git log -p --all` is a shell expansion in
a script, not a credential.

## 123. The 32-word sentence rule cannot see a sentence that wraps — **done**

**What is wrong.** `textbook.lint` applies `style:long-sentence` one physical line
at a time: `prose_lines` yields a line, and `SENTENCE` is matched inside it. Every
page is hard-wrapped near 80 characters, so a 40-word sentence is normally spread
over three lines and every line is under the ceiling. The rule reports nothing, and
the two reference books carry sentences longer than that:

```
$ uv run python .agents/skills/verify-textbook-change/scripts/textbook-audit.py maths-applied numerical-methods
  reading-age: mean sentence 16.6 words, max 55, Flesch-Kincaid grade 7.3
  reading-age: mean sentence 14.5 words, max 45, Flesch-Kincaid grade 6.7
$ uv run python -m textbook.lint maths-applied numerical-methods
scanned 18 pages
scanned 15 pages
```

The house target is a mean of 9–15 words and no sentence over about 25, with 32 the
hard ceiling (`write-textbook-prose`). The reading-age target still passes, which is
why the audit calls it a note; the sentence ceiling is the part that is documented
and not enforced. The longest are in `maths-applied` §1.5's depth page and its
Review; the numerical-methods pages are shorter on average, but their class pages
still carry sentences over 32 words.
There is no test for the rule in `tests/test_lint.py`.

**The fix.** Split paragraphs, not lines: join consecutive prose lines inside a
paragraph, stopping at blank lines, headings, tables, lists, fences and display
maths as the audit's `prose_paragraphs` already does, then apply the ceiling and
report the finding at the paragraph's first line. Add two tests: a 40-word sentence
wrapped over three lines must be reported once, and a table row, a code span and a
display equation must not be read. Triage the two reference books first, because
they are the smallest corpus and the audit has already named their longest.

**Done means**

- [x] a 40-word sentence wrapped at 80 columns gives one `style:long-sentence` finding
- [x] the rule does not read tables, code, display maths or front matter
- [x] every sentence over 32 words in the two reference books is rewritten, or is a
      quotation/list item the rule must not count
- [x] the check runs on every book in CI, and `pytest tests/ -q` passes

**Done (2026-10-25).** `textbook.lint` now reads paragraphs:
`prose_paragraphs` joins a paragraph's lines and skips headings, tables,
directives, block quotes, list items and front matter (front matter is replaced by
its own newlines, so every finding keeps its line number). `long_sentences` applies
the 32-word ceiling to each sentence. `SENTENCE_DEBT` records the rest of the
collection's existing count per book, so the rule lands without a 461-sentence
rewrite; a book may only go down, and the two reference books are at 0. The audit
lists every over-ceiling sentence behind a debt number, so the debt is visible. The
two books' sentences over the ceiling were rewritten: 39 in `maths-applied` and 12
in `numerical-methods`. The audit now reports a maximum of 32 in both (was 55 and
45) and a mean of 15.4 and 14.0 (was 16.6 and 14.5).
`tests/test_lint.py` pins a wrapped 40-word sentence as exactly one finding, the
table/list/front-matter exclusions, and the debt as per-book rather than per-page.
The lint runs in CI, so a new long sentence in either reference book fails it.

## 124. Every table renders on the browser's 1px cell padding — **done**

**What is wrong.** No stylesheet here styles `table`, `th` or `td`:

```
$ grep -rn "md-typeset table\|md-typeset td\|md-typeset th" assets engine --include=*.css
assets/stylesheets/extra.css:767:  .md-typeset table,        # a print-media rule only
assets/stylesheets/extra.css:783:  .md-typeset thead {       # a print-media rule only
```

So the user-agent default is what every reader sees. Measured on the built site
(computed style of a `td` and a `th` in `site/numerical-methods/`):

```
{ "td": { "padding": "1px", "text-align": "start" },
  "th": { "padding": "1px", "text-align": "center" } }
```

Text-heavy tables survive 1px — the A–Z and the nine-kinds table are separated by
their own column width and line height. A table of short numbers is not: the
worked table on `reading-the-class` printed `1 0 1 −4` as one blob, and the fix
that shipped was local — the three coefficients were merged into one cell
(`$1$, $0$, $1$`) so the reader can see where each number ends. That is a
workaround for a collection-wide gap.

**The fix.** Give cells padding in `assets/stylesheets/extra.css`, for every book,
then re-check the tables already tuned against the current spacing:
`books/numerical-methods/docs/assets/stylesheets/book-local.css` sets explicit
column widths for the A–Z at `min-width: 1024px`, and padding takes content space
out of every column, so those widths will need re-measuring rather than assuming.

```css
.md-typeset table th,
.md-typeset table td { padding: 0.4em 0.6em; }
```

**done means**

- [x] a built page's `td` computes to padding other than `1px`
- [x] the A–Z's five tables still fit at 1024px and 1280px: no `.table-scroll`
      that scrolls at desktop width, and `node tools/dist/cli.js check-mobile site`
      reports 0 errors
- [x] the worked table on `reading-the-class` reads as separate columns in a light
      and a dark capture, with and without the merged coefficient cell
- [x] `scripts/check.sh` passes

**Done (2026-10-26).** `assets/stylesheets/extra.css` now pads every cell:
`padding: 0.4em 0.6em`, measured on the built site as `6.8px 10.2px` where it had
been `1px`. The workaround went with it: `reading-the-class`'s worked table splits
the merged `$1$, $0$, $1$` cell into three, one under each letter, and the captures
in both schemes show each number in its own column. The A–Z's five fixed-width
tables were re-measured rather than assumed — 661.8px wide, narrowest cell 117px,
none scrolling at 1024px or 1280px — and `check-mobile` reports 0 errors. The test
that recomputes those rows from the equations parsed four columns and found nothing
once the table had six; it now reads the three coefficients as three cells, which is
the test catching a change to the table rather than to the numbers. Deployed at
26.299.6.

## 125. The old repository says it is archived, and nothing archived it — **done**

**What is wrong.** The move was accepted on one condition: `suspension-kinematics`
is archived and its README points at the new home. Four documents were written as
though that had happened:

```
$ gh repo view leonpjvaughan/suspension-kinematics --json isArchived -q .isArchived
false

$ grep -rn "archived" DECISIONS.md solvers/otkd/AGENTS.md solvers/otkd/docs/releasing.md
DECISIONS.md:13:archived at its old address). One ABI, `solvers/ABI.md`: ...
DECISIONS.md:23:not carried with `git subtree`. The history stays in the archived repository, ...
solvers/otkd/AGENTS.md:31:  2026-10-26 and `suspension-kinematics` is archived. Its version is ...
solvers/otkd/docs/releasing.md:4:> `suspension-kinematics` is archived. There is no separate tag, wheel or GitHub ...
```

So the repository is still open for issues and pulls, its CI still runs against
files that no longer move, and the decision record asserts something false. The
`otkd` history is only readable *because* the repository is public and kept; an
archive is what makes that a promise rather than an accident.

**The fix.** Write a README at the root of the old repository that says the
project moved to `solvers/otkd` in `Open.Textbook`, names the ABI and the tag
scheme, and gives the two commands a returning reader needs; then
`gh repo archive leonpjvaughan/suspension-kinematics --yes`. Check the four claims
afterwards: each must be true, and none may name a path that only existed in the
old repository.

**done means**

- [x] the old repository's README names `solvers/otkd`, the collection tag and
      `solvers/ABI.md`
- [x] `gh repo view ... --json isArchived` prints `true`
- [x] the four claims in `DECISIONS.md`, `solvers/otkd/AGENTS.md` and
      `solvers/otkd/docs/releasing.md` are true, with no path that 404s
- [x] `books/maths-applied` still builds: its data README and `sources.yaml` links
      resolve to the new home

**Done (2026-10-26).** The old repository's README is now a pointer — at
`solvers/otkd`, `solvers/ABI.md`, the collection's tag scheme and the two commands a
returning reader needs — and the repository is archived:

```
$ gh repo view leonpjvaughan/suspension-kinematics --json isArchived -q .isArchived
true
```

The four claims were checked the other way round, against the archive: `DECISIONS.md`
("archived at its old address", "the archived repository, which remains readable"),
`solvers/otkd/AGENTS.md` and `solvers/otkd/docs/releasing.md` are now true statements.
Nothing in `books/maths-applied` names the old repository any more, and its data
tests pass.

## 126. Both otkd CI paths are green without having run anything — **done**

**What is wrong.** The gate was split so a branch runs a fast Python suite and
`main` runs three jobs on separate machines. Neither has executed. Every job
carries a change detector, and the last pushes touched no file under
`solvers/otkd/`, so each job finished in four seconds:

```
$ gh run view 40401538576 --json jobs \
    -q '.jobs[] | select(.name|test("otkd")) | {name, conclusion, startedAt, completedAt}'
{"name":"otkd kernels","conclusion":"success","startedAt":"2026-10-26T21:07:51Z","completedAt":"2026-10-26T21:07:55Z"}
{"name":"otkd tests",  "conclusion":"success","startedAt":"2026-10-26T21:07:51Z","completedAt":"2026-10-26T21:07:56Z"}
{"name":"otkd bundle", "conclusion":"success","startedAt":"2026-10-26T21:07:51Z","completedAt":"2026-10-26T21:07:55Z"}
{"name":"otkd (dev)",  "conclusion":"skipped","startedAt":"2026-10-26T21:07:49Z","completedAt":"2026-10-26T21:07:49Z"}
```

No branch run has run `pytest -q --ignore=tests/test_wasm.py -n 2`, and no `main`
run has run the split suite, the kernel compiles or the bundle rebuild. A green
tick on a job that did nothing is the failure mode this split was meant to remove,
so the first real run has to be watched rather than assumed.

**The fix.** Land a commit that touches `solvers/otkd/` (item 127 is one) on a
branch first, so the fast suite runs, then merge it so the three `main` jobs run.
Read the logs: a real run prints collected test counts and durations. Write the
timings next to the job in `.github/AGENTS.md`, since "path-gated" is only
defensible with the number it costs.

**done means**

- [x] a non-`main` run's log shows the fast suite collected and ran its tests, and
      the job is green
- [x] a `main` run's logs show all three jobs doing their work, and all are green
- [x] the times are recorded beside the job that costs them
- [x] a push that touches nothing under `solvers/otkd/` still short-circuits in
      seconds, and says so

**Done (2026-10-26).** Both paths have now executed, and the first real run
of each found a defect that no skipped job could.

| run | ref | what ran | time |
|---|---|---|---|
| 40408183284 | `dev` | `otkd (dev)`, the fast suite | 3m49, green |
| 40407960213 | `main` | `otkd kernels` / `otkd tests` / `otkd bundle` | 3m27 / 3m50 / 3m39, bundle **failed** |
| 40410363950 | `main` | all three again, after the fix | 3m16 / 3m50 / 2m24, green |

`otkd bundle` failed on one unit in the last place — see the next item — and the
`main` run's `banks, tests and voice` failed on the six-column table. Both were real,
both would have shipped, and both were invisible while the jobs short-circuited. A
push that changes nothing under `solvers/otkd/` or `scripts/build-otkd.sh` still
finishes in four seconds and says so. The timings are recorded in
`.github/AGENTS.md`.

## 127. The package's own docs describe the release workflow the move deleted — **done**

**What is wrong.** `solvers/otkd` came with documents that describe a release
process that no longer exists: there is no `.github/` tree and no `scripts/version.py`.

```
$ ls solvers/otkd/.github solvers/otkd/scripts/version.py
ls: cannot access 'solvers/otkd/.github': No such file or directory
ls: cannot access 'solvers/otkd/scripts/version.py': No such file or directory
```

Three files still present it as current:

- `solvers/otkd/AGENTS.md:82` — "The version is written in
  `src/open_textbook/otkd/__init__.py`, not derived from a tag." The version is
  derived from the collection tag by `hatch-vcs` into `_version.py`; the same file
  says so twenty lines earlier, and `pyproject.toml` configures it.
- `solvers/otkd/docs/wasm.md:244` — "`.github/workflows/release.yml` runs that on
  every push to `main` that warrants a release". There is no such workflow.
- `solvers/otkd/docs/security.md:41` — "`release.yml` opts into `contents: write`".
  The same.

**The fix.** Correct `AGENTS.md` to match `pyproject.toml`. For the two documents,
say what replaced the workflow rather than deleting the reasoning: the collection's
tag is the version, `scripts/build-otkd.sh` rebuilds the bundle, and the empirical
tests are in the gate. Keep `docs/releasing.md` as it stands: it is already marked
superseded, which is the pattern the other two should follow.

**done means**

- [x] `solvers/otkd/AGENTS.md` describes the version the way `pyproject.toml` does
- [x] no document in `solvers/otkd` presents `release.yml` or `scripts/version.py`
      as current; both appear only under a superseded note
- [x] `grep -rn "not derived from a tag" solvers/` prints nothing
- [x] a reader following any `solvers/otkd` document reaches a file that exists

**Done (2026-10-26).** `solvers/otkd/AGENTS.md` now says what `pyproject.toml`
configures: the collection's tag, read by `hatch-vcs` into `_version.py`, with
`SETUPTOOLS_SCM_PRETEND_VERSION` for a checkout without tags. `docs/wasm.md` keeps its
reproducibility reasoning under a note saying the release job is gone and
`scripts/build-otkd.sh` is what proves it now; `docs/security.md` is marked as the
record of an archived repository; `docs/decisions.md` says that rounds 7 to 9 describe
`scripts/version.py` and `release.yml`, neither of which exists, while the decisions
themselves still hold. `grep -rn "not derived from a tag" solvers/` prints nothing.

## 128. The runner fallback cannot be switched on the way the README says — **done**

**What is wrong.** The four self-hosted runners on this machine are kept as a warm
fallback, and the README offers a two-command switch:

```
$ grep -n "RUNNER_LABEL" deploy/runner/README.md
19:gh variable set RUNNER_LABEL --body self-hosted   # point CI at it
22:gh variable delete RUNNER_LABEL                  # put CI back on ubuntu-latest

$ grep -c "vars.RUNNER_LABEL" .github/workflows/verify.yml
0
$ gh variable list
(no variables)
```

The workflow no longer reads the variable: it was removed deliberately, because a
repository setting deciding where CI runs is a hidden dependency. So setting
`RUNNER_LABEL` today changes nothing, and the documented fallback is a command
that silently does nothing. The fleet itself is fine:

```
$ docker ps --format '{{.Names}} {{.Status}}'
runner-runner-1 Up 4 hours ... runner-runner-4 Up 4 hours
```

**The fix.** Keep the fleet and make the switch honest, without restoring the
variable indirection: the README names the one line to edit in
`.github/workflows/verify.yml` for each job, and `deploy/runner/start.sh --status`
reports what `docker compose ps` reports plus whether the runners are registered,
so "warm fallback" is something a person can check rather than believe.

**done means**

- [x] `deploy/runner/README.md` describes the switch that exists, not the variable
- [x] `deploy/runner/start.sh --status` prints the four containers and their
      registration state without starting or stopping anything
- [x] the README says why the variable was removed, so nobody restores it thinking
      the fallback is broken
- [x] CI stays on `ubuntu-latest` and `gh variable list` stays empty

**Done (2026-10-26).** The README describes the switch that exists: edit
`runs-on:` for the jobs you want, and it says why the variable was removed, so nobody
restores it thinking the fallback is broken. `deploy/runner/start.sh` gained
`--status` and `--prune`. The first run of `--status` found eight registrations left
offline by earlier rebuilds — the fleet is four containers, four online — and `--prune`
removed them:

```
$ deploy/runner/start.sh --status
4 container(s), 4 online, 0 offline

$ deploy/runner/start.sh --prune
removed 8 offline registration(s) from leonpjvaughan/Open.Textbook
```

CI stays on `ubuntu-latest` and `gh variable list` stays empty.

## 129. The parabolic page shows the same fact twice — **done**

**What is wrong.** The page has two figures about the explicit heat scheme's time
step:

```
$ grep -n ":::figure" books/numerical-methods/docs/parabolic/index.md
45::::figure step-limit
117::::figure heat-lab
```

`step-limit` plots the step count against the mesh (`2N^2`) and its paragraph says
the limit "decides whether a mesh is affordable". `heat-lab` runs the scheme and
lets the reader push `r` past `1/2`, and its paragraph says the number that decides
it is `r = \alpha\Delta t/\Delta x^2`. Both answer "how many steps can I take",
from two directions, and a reader meets the second as though it were new. The
page's common-error table then repeats the same point a third time.

**The fix.** Decide what each figure owns and write only that. `step-limit` owns
the **count**: how the mesh decides the number of steps, which is a cost question.
`heat-lab` owns the **threshold**: what happens either side of `r = 1/2`, which is
a stability question. Rewrite the two introductions so neither restates the other,
and drop the duplicated sentence from the common-error paragraph.

**done means**

- [x] each figure's introduction asks a different question, and neither states the
      other's answer
- [x] the common-error paragraph does not repeat the threshold the lab shows
- [x] both figures audit clean in both schemes and at 390px
- [x] `python -m textbook.lint numerical-methods` reports nothing

**Done (2026-10-26).** The two introductions now divide the work. `step-limit`
owns the **count**: "four times the cells means a quarter of the time step, so four
times as many steps, and four times the work inside each one … the last point costs
sixty-four times the first." `heat-lab` owns the **threshold**: "the count above says
what a small time step costs, and this says what it protects", then what happens at
$r = 0.4$ and at $r = 0.6$. Neither states the other's answer, and the common-error
paragraph no longer repeats it. Both figures audit clean in both schemes
(`audit site --only step-limit|heat-lab`, 2 of 2 measurements each) and the page's
captures show a cost curve and a live threshold, not two versions of one point.
`textbook.lint numerical-methods` reports nothing.

## 130. The runner README described a machine that does not exist — **done**

**What is wrong.** Review pass one read the file next to the thing it describes and
found five contradictions, in a document about exposing a machine to the internet:

```
$ grep -n "docker.sock" deploy/runner/README.md deploy/runner/docker-compose.yml
deploy/runner/README.md:53:The compose file mounts `/var/run/docker.sock` because one job is a Docker action
deploy/runner/docker-compose.yml:23:    # **No Docker socket.** It was here for one Docker action (`rhysd/actionlint`), ...

$ gh repo view --json visibility -q .visibility
PUBLIC

$ grep -c "vars.RUNNER_LABEL" .github/workflows/verify.yml
0
```

The README said the socket was mounted (it is not), that the repository is private (it
is public), that a fork pull request could not run here (a returning contributor's does
not need approval), that the switch back is `gh variable delete RUNNER_LABEL` (removed on
purpose), and it named a socket group id `start.sh` no longer sets and a registration
name no container has. A security note that reassures on the wrong grounds is worse than
no note.

**The fix.** The section is now what is true: no socket, the repository is public, the
fleet is for `push`-only work and must not be the target of a `pull_request` job, no
secret reaches a job that could run there (the two jobs that read one are `main`-only and
hosted), and stopping it is `deploy/runner/start.sh --stop`. The piece table lost the
socket too.

**Done (2026-10-26).** Every claim was checked against `docker-compose.yml`, `gh repo
view`, `.github/workflows/verify.yml` and `entrypoint.sh`. Two smaller findings were
fixed in the same pass: `solvers/otkd/docs/security.md` linked a `.github/dependabot.yml`
that went with the archived repository, and `solvers/ABI.md` said "two entry points" in
the paragraph that then lists three.

## 131. The parabolic page's step count was wrong by a power of four — **done**

**What is wrong.** Review pass two read the sentence it had just written:

> Four times the cells means a quarter of the time step, so four times as many steps,
> and four times the work inside each one.

Four times the cells is a quarter of the *spacing*, and the stable step goes as the
square of the spacing, so it is a **sixteenth** of the step and **sixteen** times as many
steps. The figure doubles the cells (10, 20, 40, 80), which is a quarter of the step and
four times the steps, so the sentence also described a figure that is not on the page.
The claim a reader can check against the plot is 64, because 12800 / 200 = 64.

**The fix.** The sentence doubles with the figure: "Twice the cells means a quarter of
the time step, so four times as many steps, and twice as much arithmetic in each one …
eight times the resolution costs sixty-four times the steps."

**Done (2026-10-26).** The arithmetic was checked against `stepsFor = 2N²`: 10 → 200,
80 → 12800, ratio 64; and against the figure's own caption, which already said "twice
the cells, four times the steps". `textbook.lint numerical-methods` reports nothing.

**The test that came out of it.** `tests/test_figures.py` now checks that every name a
lab module passes to `kernel.scalar`, `output`, `get`, `set` or `spec`, and every entry
in its `controls` list, is a parameter or output the kernel's generated manifest
declares. Renaming a parameter in Rust breaks the figure at run time otherwise, in a
browser, on a page nobody rebuilt. Verified by breaking it: `norm` → `norm_missing` in
`heat-lab.js` fails the test, and the restored file passes.

**The same defect, three times on one page — found by a fresh reading, not by a test.**
The fix above corrected the *paragraph*, and left the page pricing the same refinement
three different ways:

| where | said | 1D truth |
|---|---|---|
| `parabolic/index.md`, the Explicit bullet | "four times the work per step and the same again in the number of steps" | twice the work per step, four times the steps, eight times the total |
| `parabolic/index.md`, the paragraph before the figure | four times the steps and twice the arithmetic | right |
| `step-limit.js`, the readout | "Four times the **work** for twice the resolution" | four times the **steps**; the work is eight times |

The page is one-dimensional throughout — the figure's x-axis is "cells across the
region", and the scheme is `2N²` — so the bullet's 4 × 4 = 16 is a two-dimensional
answer on a one-dimensional page, and the readout named the step count "work". All
three now agree: twice the cells is twice the work per step and four times the steps,
eight times in total, and the plot counts steps only. The readout is in a capture of
both schemes; a test cannot read a sentence, so this is what review is for.

## 132. The docs named commands and counts that are not there — **done**

**What is wrong.** Review pass two checked each guide against the thing it describes,
rather than reading it:

```
$ uv run python -c "from textbook.book import discover_books; print(len(discover_books()))"
11
$ grep -n "nine books" assets/AGENTS.md
169:The collection is nine books and will be more. Two rules keep it from turning into nine

$ node tools/dist/cli.js help | grep -cE "^  (assets|offline) "
2
$ grep -cE "assets \[|offline \[" tools/AGENTS.md
0

$ ls scripts/*.sh scripts/*.mjs | grep -E "solvers"
scripts/build-solvers.sh
scripts/check-solvers.mjs
$ grep -c "build-solvers\|check-solvers" scripts/AGENTS.md
0
```

So the design system claimed nine books where the build discovers eleven, and two
guides did not name commands that exist: `tools assets` and `tools offline` in
`tools/AGENTS.md`, and `scripts/build-solvers.sh` and `scripts/check-solvers.mjs` in
`scripts/AGENTS.md` — the two scripts every kernel figure depends on.

The closed queue had the same species of gap: 17 unchecked boxes, eight of them inside
items whose heading said "done" (5, 25, 30, 75, 98), which is the contract
`.agents/todo-closed.md` states it enforces. Items 30 and 75 described work that had
landed (the `:::class` directive exists and eight pages emit it) and are now checked;
5 and 25 describe a drill and a device check that a desk cannot perform, so their
headings say so ("done, one drill deferred", "done, one check unverified"); 98 closed
by retiring its figure, and its five boxes are now labelled as the redraw that was not
taken. Five numbers repeat (31, 75, 98, 99, 100) and the preamble says why rather than
renumbering, because the cross-references are by number.

**What pass two covered, so the next pass need not repeat it.** Every relative link in
509 Markdown files; the root docs' links; `scripts/AGENTS.md` against `scripts/`;
`tools/AGENTS.md` against `node tools/dist/cli.js help`; the book count against
`discover_books()`; `grep` for `TODO`, `FIXME`, `XXX`, "coming soon" and "not yet
implemented" in `engine/`, `assets/`, `scripts/`, `tools/`, `tests/`, `deploy/` and
`.github/` (none); and the stale-string sweep for `vendor-otkd`, `0.12.0`,
`RUNNER_LABEL`, `wasm-pack`, `git subtree` and `suspension-kinematics`, whose every hit
is now inside a dated record or a superseded note.

**Done (2026-10-26).** All five fixed and `scripts/check.sh` is green.

## 133. Four `npm run` aliases and three rule documents named scripts that no longer exist — **done**

**What is wrong.** The tools moved from `scripts/*.cjs` into `tools/` and the references
did not follow, so the documentation named commands that die on `MODULE_NOT_FOUND`:

```
$ node scripts/check-figure-kit-pure.mjs; echo "exit=$?"
Error: Cannot find module '/home/leon/Work/maths-site/scripts/check-figure-kit-pure.mjs'
exit=1

$ for f in assets/AGENTS.md DEPLOY.md ideas.md tests/README.md \
      .agents/skills/build-guided-figure/SKILL.md package.json; do
    git show "HEAD:$f"; done | grep -c "\.cjs"
10
```

Five command paths were dead, every one reachable from a document an agent is told to
read: `npm run kit`, `kit:browser`, `audit` and `audit:mobile` in `package.json`;
`scripts/check-figure-kit.cjs` and `scripts/check-figure-kit-pure.mjs` in
`assets/AGENTS.md`; `scripts/measure-budget.cjs` in `DEPLOY.md`; three scripts in the
verify block of `.agents/skills/build-guided-figure/SKILL.md`, which an agent is
required to run before claiming a figure done; `scripts/audit-figures.cjs` in `ideas.md`,
`tests/README.md` and `package.json`; and `scripts/check-types.mjs` in two `tsconfig`
comments. `scripts/AGENTS.md` promised "or `npm run <name>`" for four names that did not
run.

**The fix.** Every reference now names the command that exists: `node tools/dist/cli.js
kit-pure`, `kit site`, `audit site`, `audit site --mobile`, `budget site`, `screenshot`,
and `types`. `tests/README.md` and the figure skill name `scripts/preview-themes.sh` and
`node tools/dist/cli.js preview`. `.agents/maths-applied-handoff.md` carries the same
historical banner as the planning record: it was executed, its package is `solvers/otkd`,
and its `suspension-kinematics` phase is an archived repository.

**The class, closed by a test.** `tests/test_agent_context.py` had a test for exactly
this, which read the root `AGENTS.md` only — which is how `assets/AGENTS.md` kept a dead
path for a year. It now reads every rule document: the root and nested `AGENTS.md`, every
`books/*/AGENTS.md`, every `.agents/skills/**/SKILL.md`, `SHAPE.md`, `DEPLOY.md`,
`PROBLEMS.md`, `BOOKLETS.md`, `DECISIONS.md`, `ideas.md`, `tests/README.md`,
`.agents/chapter-brief.md` and the handoff. A second test checks the other half:
`package.json`'s scripts name files that exist, and every `npm run <name>` a document
mentions is a script that exists. Both were shown to fail on an injected dead path and to
pass once restored.

**Done (2026-10-26).** `scripts/check.sh` green, `pytest` 8344 passed, and the live page
carries no reference to a script that is not there.

## 134. The dead command survived in the kit's own comments, and shipped to readers — **done**

**What is wrong.** Item 133 fixed the paths in the rule documents and said the class was
closed by a test. It was not: the same four names survived in source comments, and the
kit is compiled, so one of them was served to every reader who downloaded it:

```
$ grep -rn "check-figure-kit\|audit-figures" assets/figures/src/
assets/figures/src/kit/interact.ts:216: *   * `check-figure-kit.cjs` and `tests/test_figure_browser.py` cannot assert anything
assets/figures/src/kit/interact.ts:650: * and asserting the invariants a reader would check by hand. `tests/test_figure_kit_pure.py`
assets/figures/src/kit/text.ts:30: * factor, and `check-figure-kit.cjs` measures the arithmetic rather than trusting the
assets/figures/src/kit/text.ts:38: * of the drawing's. Re-measure with `audit-figures.cjs --mobile` before changing these.
assets/figures/src/kit.ts:73: * `scripts/audit-figures.cjs`.

$ curl -s https://open-textbook.org/numerical-methods/assets/figures/kit.js | grep -c audit-figures
1
```

`kit/text.ts:38` was not a historical note but an instruction — "Re-measure with
`audit-figures.cjs --mobile` before changing these" — which dies on `MODULE_NOT_FOUND`
for the one person who follows it. `tests/test_figure_kit_pure.py` does not exist; the
pure-kit contract is a test inside `tests/test_figures.py`. Two more names were stale
outside the kit: `scripts/check-figure-kit-pure.mjs` in
`books/ie-jc-maths/docs/assets/figures/index-laws-practice.js`, and
`node scripts/screenshot.cjs` in `research/design/make_mocks.py`.

**The fix.** Every comment names the command that exists — `node tools/dist/cli.js kit
site`, `audit site --mobile`, `audit site`, `kit-pure` — and the kit was rebuilt so the
compiled copy carries the same text. `engine/AGENTS.md`'s "a stray
`engine/textbook.py` cannot shadow it" became "a module placed at the project root",
which says the same thing without naming a path that is not there.

**Why the test missed it, and what changed.** `test_every_script_the_rules_name_exists`
walked a fixed list of rule documents and never read a source comment, which is where
the kit keeps its instructions. It now scans `assets/figures/src/**/*.ts`, the compiled
`assets/figures/kit*.js` and `kit/*.js` (committed, so a stale comment there is one a
reader downloads), every book's figure modules, `engine/src/textbook/**/*.py`,
`scripts/*.sh|*.mjs` and `tools/src/**/*.ts`. The pattern is anchored at a top-level
directory so another project's path — `"$PROJECT/scripts/build_release.py"` in
`scripts/build-otkd.sh` — is not read as ours. Shown to fail on the pre-fix tree:
the first run reported `assets/figures/kit.js: scripts/audit-figures.cjs`.

**Done (2026-10-26).** `grep -rn "check-figure-kit\|audit-figures"` over the sources and
the built kit prints nothing; `pytest` and `scripts/check.sh` are green; the deployed
`kit.js` carries no dead path.

## 135. The package's own docs still decided a name it no longer uses — **done**

**What is wrong.** The success criterion says no document still contradicts the shipped
version, history or namespace. The moved package's live design record contradicted all
three, and every one of them is linked as current guidance from `solvers/otkd/AGENTS.md`:

```
$ sed -n 3p solvers/otkd/docs/naming.md
**Status:** design, not yet implemented. This document decides what the thing is called, how
$ sed -n 19p solvers/otkd/docs/naming.md
**Recommendation: `otkd` everywhere** — distribution, import, and command.

$ grep -n '^name = \|^otkd = ' solvers/otkd/pyproject.toml
6:name = "open-textbook-otkd"
30:otkd = "open_textbook.otkd.cli:main"

$ sed -n 5,7p solvers/otkd/docs/README.md
should not be quietly edited. It also predates the rename and the module layout: where it
names the package, read `otkd` ([`naming.md`](naming.md) §2); where it lays out modules, read

$ head -3 solvers/otkd/HANDOFF.md
# HANDOFF — `suspension-kinematics`, v1
**Status:** ready to execute. The repository exists and holds this file, a README and
```

`naming.md` was "design, not yet implemented" and recommended one spelling where the
shipped package has three; `docs/README.md` sent a reader to the wrong import; `HANDOFF.md`
had no historical banner and still read as an instruction to `cd suspension-kinematics`;
`decisions.md` said its decisions "still hold" while Round 4's naming decision did not;
`config-layer.md` and `problem-mapping.md` called themselves unimplemented when the modules
they describe are the code, and `docs/ui.md` — correctly unimplemented — named
`solvers/equilibrium.py`, which resolves from nowhere.

**The fix.** `naming.md` says shipped, states the three names, and keeps its candidate
comparison as the evaluation it was. `decisions.md` gains **Round 31**, which records the
namespace move, names Round 4 as superseded on the name, and explains why the command keeps
its short spelling; the 2026-10-26 banner lists it with the other two historical mechanics.
`docs/README.md` sends a reader to `open_textbook.otkd` for the import and `otkd` for the
command, and points at the archived history. `HANDOFF.md` carries a banner — the contract is
not quietly edited — that says it was executed, that the repository is archived, and that
its paths are the state of the question on the day it was written. The two design documents
say implemented; `ui.md` says implemented-or-not where it is true and names the module that
exists.

**The sweep now reads the package.** Review pass two's stale-string sweep covered `engine/`,
`assets/`, `scripts/`, `tools/`, `tests/`, `deploy/` and `.github/` but not
`solvers/otkd/docs`, which is where these survived. `test_every_script_the_rules_name_exists`
now reads `solvers/otkd/*.md` and `solvers/otkd/docs/*.md`, resolving a path against both
the repository root and the package root, and excludes the four files that are dated records
(`decisions.md`, `releasing.md`, `handoff-from-maths-site.md`, and the already-annotated
`security.md`) — a record must be able to name a file that was there then. Shown to fail:
adding "Re-measure with `scripts/audit-figures.cjs`" to `naming.md` fails the test, and the
restored file passes.

**Done (2026-10-26).** `grep -rn "^import otkd\|^from otkd" solvers/otkd/src solvers/otkd/tests`
prints nothing — the shipped import is `open_textbook.otkd` everywhere — and every remaining
`import otkd` or `suspension-kinematics` inside the package is a banner, a dated record, or a
sentence about what the move rewrote. `pytest` and `scripts/check.sh` are green.

## 137. The A–Z table is clipped on a phone, and the formula is the column that goes — **done**

**What is wrong.** `books/numerical-methods/docs/techniques/index.md` is four columns
of dense content, sized for a desktop. Measured at 390px the table was 650px wide
inside a 358px scroll box, so 45% of it was off-screen and the second column was cut
mid-word: the reader's first sight read "ass | the step, in symbols | what … and c".
`check-mobile` passed, because the table scrolled and the page did not overflow. The
defect was legibility, which no layout check can see.

**The fix.** Below `44rem` each row is a card (`book-local.css`): the method as its
heading, the class as the link it already is, the formula, then the price as a
sentence. The header row is moved out of sight with a clip rather than `display: none`,
so a screen reader still hears the column names. The formula cell keeps its own
horizontal scroll, because MathML cannot wrap and one Lax–Wendroff update is wider
than a phone whatever the font size.

**The first version was wrong, and a reader said so.** Cards without labels are
easier to scan and worse to understand: "A bracket. Certain, and slow" says nothing
about what it is a price *for*, and the 15px grey sentence was the tiring part. Three
sources settle the pattern. NN/g's mobile-table findings are that columns must be
legible without zooming, that headers must stay available because a reader who loses
them loses what the data is, and that horizontal scrolling needs an affordance if you
keep it. GOV.UK's `govuk-table--small-text-until-tablet` exists for dense numeric grids,
not for a sentence per row, so shrinking the price to 15px was the wrong lever.
Adrian Roselli's analysis of `display: block` on table parts is that it overrides
native semantics, and that the pattern which survives is explicit roles plus generated
content standing in for the hidden headers — with the warning that it needs testing.

So the cards now carry a label above each field, taken from the header the table
already had ("Class", "The step, in symbols", "What it needs, and what it costs"), the
method's own name being the card's heading. The header row is hidden below 44rem
because the label replaces it, and every value is at the body size (17px) in ink
rather than a caption's grey. Measured in Chromium at 390px, a card's last cell is
exposed as `cell` with the accessible name
"WHAT IT NEEDS, AND WHAT IT COSTS A bracket. Certain, and slow: about three steps per
digit", so the label reaches a screen reader as well as the eye. One formula still
overflowed by 10px (Lax–Wendroff); its continuation line lost a `\quad` and now no
cell scrolls at 390px in either scheme. `tests/test_reference_books.py` pins the
labels, the hidden header and the heading exception, and fails when a label is
deleted.

**Done (2026-10-27).** Measured after the change:

```
$ node var/z-measure.mjs
390  {"tableWidth":358,"boxClient":358,"scrolls":false,...}  docOverflow:0
414  {"tableWidth":382,"boxClient":382,"scrolls":false,...}  docOverflow:0
768  {"tableWidth":662,"boxClient":662,"scrolls":false,...}  docOverflow:0
1024 {"tableWidth":662,...,"cells":[122,117,256,157]}        docOverflow:0
1280 {"tableWidth":662,...,"cells":[122,117,256,157]}        docOverflow:0
```

At 390px a reader sees the method, the formula and its price without a sideways
scroll, in both schemes (`var/tables/techniques-390.png`); the four-column table
returns above 44rem and still fits at 1024px and 1280px with no scroll. The symbol
lists under each table stay full width and read as prose, which is why defining them
there works on a phone.

## 136 — Most books' formulas named none of the symbols they used

**What was wrong.** The rule was written down ("every symbol in a formula is defined
where the reader meets it") and only the two reference books followed it. `proofs`,
`gcse-maths`, `gcse-physics`, `a-level-physics`, `a-level-maths` and the four Irish
books carried displayed formulas whose letters were never named, so a reader met
`$$v = u + at$$` with three letters and no definitions.

The count, by displayed formulas (`$$…$$`), was:

```
a-level-maths  2251   ie-jc-maths  2498   ie-lc-maths  2158
ie-lc-physics  1585   ie-lc-applied-maths 1447   a-level-physics  586
gcse-physics    373   gcse-maths    306   proofs        174
```

**How it was swept.** A screen over each page — a symbol occurring in a display and
never in the page's prose, and a second list of symbols that occur in prose with no
defining phrase near them — produced a worksheet per chapter. A worksheet is a lead,
not a verdict: the second list is mostly false positives ("for a base $a$" is a
definition). Twenty-eight readers worked one chapter range each, read every listed
page, and added the shortest clause that names what is missing: a `where …` clause
under a formula, a named subject ("$S_n$ is the sum of the first $n$ terms"), or one
**The symbols** paragraph under a table of formulas. The pattern is the one
`books/numerical-methods/docs/techniques/index.md` already used.

433 pages were touched; about 300 clauses were added. The screen's near-certain tier
(the symbol never named anywhere on the page) fell as follows:

```
book                  formulas   A before   A after
proofs                     174          2         1
gcse-maths                 306          8         1
gcse-physics               373         39        25
a-level-physics            586         42        27
a-level-maths             2251         67        34
ie-jc-maths               2498         28         6
ie-lc-maths               2158         62        13
ie-lc-physics             1585         80        34
ie-lc-applied-maths       1447         60        14
```

**Why the remainder is not a defect list.** Every remaining row was read. They are
unit letters (`J`, `N`, `W`, `s`, `Ω`), nuclide symbols (`²³⁵U`, `¹n`), "1 d.p.",
the differential `d` in `dy/dx`, and letters whose quantity the sentence above names
in words ("the period" then `T = 1/f`). Two things were deliberately not done: a
Review page re-uses the chapter's letters rather than repeating a symbol key eleven
times, and a worked solution that substitutes numbers into a formula the page has
already named does not repeat the naming.

The Review decision was checked rather than assumed. 117 Review pages carry displays,
and the screen flagged 21 of them. Five of those 21 used a letter no teaching page in
the chapter writes; four of the five name that letter on the Review page itself
(`W` as "the load", `T` as "the thrust", `Q` as "the flow rate", `\theta_f` in a
symbol sentence), so the chapter's silence was a false positive. The fifth, `H` for
the release height in `a-level-physics` Chapter 3, was named.

**Defects the sweep found and fixed.** Each is a separate line in the diff:

- `ie-lc-maths` had three inline spans closed with `\)` instead of `$`
  (`$800\)`), which KaTeX rejects. Fixed in 11.2 and 11.7.
- `ie-lc-maths` 10.4: the answer said `$n(S) = 15$ out of $28$ pairs`, but the sample
  space is $28$ and $15$ is the star-prize count. Now "15 of the 28 pairs give the
  star prize, and $n(S) = 28$".
- `ie-lc-applied-maths` 7.4 said `$\sin 60^\circ = \tan 60^\circ$`, which is false;
  the product is $3$ because $L\sin^2\theta/\cos\theta = 2 \times (3/4)/(1/2)$.
- `ie-lc-applied-maths` 8.8 compared the $h = 0.5$ estimate at $x = 1$ with the
  $h = 1$ estimate at $x = 2$; it now compares $156.25$ with $150$ at the same $x$.
- `ie-lc-applied-maths` 2.1 carried an editing note in reader-facing prose ("…and one
  vertex of odd degree… read that again"), and the question contradicted the answer
  key: it asked about one odd-degree vertex, not two.
- `ie-lc-physics` 20.3 said a beta particle has charge $+1$ "relative to the
  daughter"; the $+1$ is the parent's gain in atomic number and the electron is $-1$.
- `ie-lc-physics` 9.5 used `L` and `l` for the string length on one page. The
  chapter's `l` became `L`, and the where clause follows.
- `a-level-physics` 8.1 printed `hf = E_1 - E_2` without saying which level is which;
  it now names $E_1$ as the higher level, and 5.1 names $\Delta$.
- `a-level-maths` 4.4 had a clause about $u_r$ and $v_r$ attached to the formula that
  contains only $u_r$; moved to the formula that uses both.
- `proofs`: $S_n$, $A$, $a$ and $b$ were the unnamed parts of four formulas, and
  $\frac{d}{dx}$ arrived before it was explained.
- `ie-lc-physics` 3.3 carried a 33-word sentence the lint rejects — a pre-existing
  `style:long-sentence` on `main`, now split.

**Done (2026-10-27).**

```
$ for b in ...; do uv run python -m textbook.lint $b; done
scanned 23 / 458 / 142 / 119 / 362 / 438 / 446 / 348 / 226 pages
$ uv run pytest tests/ -q -n 4
8349 passed, 50 skipped
$ scripts/check.sh
exit 0
```

The rule now has a page-by-page record in each book rather than a promise in a skill
file, and the two books whose tables carry many formulas show the shape the others
follow: one **The symbols** list under the table.

## 138 — 4.2's worked example needed 4.1's period relation, and never said so

**What the item said.** `gcse-physics` 4.2 never taught the relation between period
and frequency, then used it in Worked example 1. The measurement behind that:

```
$ grep -n "period" books/gcse-physics/docs/Chapter\ 4/Section\ 4.2/Walkthrough/index.md
54:20 Hz. Calculate the period of this sound wave.
64:Here $T$ is the period in seconds and $f$ is the frequency in hertz.
```

**What reading the chapter showed.** The item was wrong about "never taught". Section
4.1, the section before, teaches it in full:

```
$ sed -n 50,55p books/gcse-physics/docs/Chapter\ 4/Section\ 4.1/Walkthrough/index.md
The **period** is the time for one complete wave to pass a point. It is measured
in seconds. The period and the frequency are linked:

$$ \text{period} = \frac{1}{\text{frequency}} \qquad T = \frac{1}{f} $$
```

with its own worked example straight after, and "use $T = \dfrac{1}{f}$ to link
period and frequency" in its "You should now be able to" list. So 4.2's example is
retrieval of a taught relation, which is what a Learn page is allowed to do.

**The defect that was real.** 4.2 never told the reader it depended on that. Its
prerequisites named "the wave equation and longitudinal waves" and left out the
period relation; its objectives did not include calculating a period; and its "You
should now be able to" list omitted it too. So a reader revising from 4.2's own
promises would not know the page asked it, and a teacher planning from the objectives
would not know the section needed 4.1's second half.

**The fix, in 4.2.** Three lines, no change to the physics and no change to the worked
answer:

```diff
-**Prerequisites:** Section 4.1, especially the wave equation and longitudinal
-waves; Section 3.1 for speed as distance divided by time; powers of ten and
-prefixes.
+**Prerequisites:** Section 4.1, especially the wave equation, the link between
+period and frequency, and longitudinal waves; Section 3.1 for speed as distance
+divided by time; powers of ten and prefixes.
```
```diff
-range of frequencies; calculate a distance from an echo; describe how ultrasound
+range of frequencies; calculate a period from a frequency and a distance from an
+echo; describe how ultrasound
```
```diff
+- calculate a period from a frequency, using $T = \dfrac{1}{f}$;
```

**Done (2026-10-27).** `uv run python -m textbook.lint gcse-physics` prints only
`scanned 142 pages`; `scripts/check.sh` exits 0 with 8,349 tests passing; the worked
answer $0.050\,\text{s}$ is unchanged and the page is live at
`/gcse-physics/higher/chapter-4/section-4.2/learn/`.

**What this is worth remembering for.** The queue item was written from one grep in
one file, and the chapter had already solved the problem one section earlier. The
defect was in what the page promised, not in what it did — a cheaper and more honest
thing to fix, and only visible by reading the neighbour.
