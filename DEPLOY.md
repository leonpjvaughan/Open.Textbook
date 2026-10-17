# Deploying

The collection is static files, hosted on Cloudflare and served from
`https://open-textbook.org/`. There is no server. The runbook is short because
almost everything is already automated; this file exists so the parts that need a
human are written down.

For *why* this host, see SHAPE.md, "Deployment and platform targets".

## One-time setup

### 1. A Cloudflare API token

Cloudflare dashboard → **My Profile** → **API Tokens** → **Create Token** →
**Create Custom Token**:

- **Permissions**: `Account` → `Workers Scripts` → **Edit**
- **Account Resources**: include the account
- (The **Edit Cloudflare Workers** template grants the same, plus zone
  permissions this does not need.)

Copy the token — it is shown once.

### 2. The account ID

Dashboard → **Workers & Pages** → the right-hand sidebar shows **Account ID**.

### 3. Repository secrets

Repo → **Settings** → **Secrets and variables** → **Actions**:

| Secret | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | the token from step 1 |
| `CLOUDFLARE_ACCOUNT_ID` | the account ID from step 2 |

### 4. The domain

Dashboard → **Workers & Pages** → the `open-textbook` Worker → **Settings** →
**Domains & Routes** → **Add** → **Custom domain** → `open-textbook.org`. Add
`www` too, redirecting to the apex. DNS is already on Cloudflare, so the records
are created for you.

Done in the dashboard rather than by the token on purpose: it keeps the token
account-scoped, with no zone permissions to leak.

## Deploying

Push to `main`. The pipeline runs in order, and nothing later starts until the
earlier stages succeed:

| Stage | Job | main | other branches |
|---|---|---|---|
| 1 | `plan`, `generated`, `build`, `content`, `lint workflows` | ✔ | ✔ |
| 2 | **all checks** (`gate`) | ✔ | ✔ |
| 3 | `tag and release` | ✔ | — |
| 4 | `deploy to production` | ✔ | — |

Stages 3 and 4 require `refs/heads/main`, so they cannot run anywhere else. That
is what makes any other branch a safe place to push: you get the whole gate and
neither of the side effects.

### A merged pull request deploys — about two minutes later

Merging a pull request **does** trigger the pipeline, but not immediately: on
2026-10-11 a rebase merge updated `main` at 17:16:54 and the push run appeared at
17:18:53. That delay is long enough to look like nothing happened, and it has
already cost two confused minutes twice.

**Do not dispatch the workflow to hurry it along.** Both runs share the
concurrency group `verify-refs/heads/main` with `cancel-in-progress: true`, so the
delayed push run cancels a manual dispatch that started first — including one that
was already mid-deploy. The dispatch then reads as failed while the *push* run
quietly does the work, which is exactly the confusing pair of runs the second
merge produced.

So after merging:

```bash
# Give it two minutes, then look.
gh run list --branch main --limit 3
```

A `push` run should be there. If nothing has appeared after a few minutes, then
dispatch — that is what `workflow_dispatch` is for:

```bash
gh workflow run verify.yml --ref main
```

**Then confirm the site agrees with `main`**, because the failure worth fearing is
the one that looks like success — `main` moves, nothing deploys, and the release
tag and the live site describe different commits:

```bash
curl -s https://open-textbook.org/version.json   # the commit actually live
git log --oneline -1 origin/main
```

### `dev`

`dev` is the branch for work in progress. Push to it and the verification runs;
nothing is tagged and nothing is deployed. To verify every branch rather than the
named ones, change the workflow's `branches:` list to `'**'`.

There is deliberately no staging deploy on `dev`. If you want one, the pieces are
a second Worker name and a `--env`-style split in `wrangler.jsonc`; say so and it
is a small change.

You can also trigger it by hand from the Actions tab (**Run workflow**), which
runs the same pipeline on whatever is on `main`.

### Releases

Every push to `main` releases. Tags are `yy.<day of year>.<increment>`:

```
26.284.0    2026, day 284 — the first release that day
26.284.1     the second
26.285.0     the next day, back to zero
```

The increment is the point. A plain date collides the moment a second deploy lands
on the same day, and the previous scheme handled that badly: the job skipped when
the tag already existed, so the second deploy of the day deployed while silently
releasing nothing. Now every deploy gets its own tag and nothing is ever
overwritten.

The day is zero-padded to three digits so tags sort as text, and the date comes
from `Europe/London` rather than the runner's UTC, because a UK textbook dated
tomorrow is confusing.

`scripts/next-tag.sh` owns the scheme. It reads existing tags from the API rather
than a local clone, so it needs neither the history nor the tags fetched, and it
is covered by `tests/test_release.py`. Two consequences worth knowing: re-running
the workflow for a commit releases it again under a new increment, and deleting a
tag frees its number, since the count comes from the tags that actually exist.

A release is created *before* the deploy, so a version describes the content
rather than the hosting. If a deploy fails the version still stands and re-running
the deploy changes nothing about it.

To release only from tags instead of every push, change the `deploy` job's `if:`
to start with `startsWith(github.ref, 'refs/tags/')`.

## Protecting `main`

Requiring the **all checks** check, and refusing force pushes and deletions:

```bash
scripts/protect-main.sh          # apply
scripts/protect-main.sh --check  # report
```

**This needs GitHub Pro.** Protected branches are available on public
repositories with GitHub Free, and on public *and private* repositories with Pro,
Team or Enterprise. This repository is private on a Free plan, so the API refuses
and the script says so instead of failing with an HTTP code. Either make the
repository public — which a free, open textbook probably wants anyway — or upgrade
the account, then run it.

Two deliberate choices once it is available:

- **Pull requests stay optional.** Their pipeline is built on pushing to `main`,
  and requiring a PR for every change would break it.
- **Admins may bypass.** The required check gates pull requests. It does not gate
  a direct push from an admin, which is what makes the push-triggered pipeline
  work. If you would rather checks block direct pushes too, set
  `enforce_admins` to `true` in the script and work through pull requests.

Note what that leaves: on a solo repository, protection mostly buys "no force
pushes" and "no deletions". The verification itself is enforced by the pipeline
being ordered, not by the branch rule.

### Locally

```bash
cp .env.example .env     # then fill in CF_ACCOUNT_ID and CF_API_TOKEN
scripts/deploy.sh        # build, guard, deploy
scripts/deploy.sh --dry-run   # build and check, without uploading
```

`.env` is git-ignored, and `.env.example` is not. Never commit the token.

Wrangler also reads `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` directly;
the `CF_*` names still work but Wrangler warns that they are deprecated, so
`scripts/deploy.sh` maps them across. Renaming them in `.env` removes the warning.

## Rolling back

Production is rolled back by hand, from **Actions → rollback → Run workflow**. It
is deliberately not automatic: a rollback is what you reach for when a deploy is
wrong, and that is not the moment to be discovering an automated path for the
first time.

| Input | Meaning |
|---|---|
| `version_id` | The Worker version to roll back to. Leave empty for the previous version. |
| `confirm` | Type `rollback`. A dispatch button is one click away, and this is not a thing to discover you have done. |

The workflow prints the recent versions first, so a dispatch with no input doubles
as the way to get an id. It runs in the `production` environment, so there is an
audit record of who rolled back and when, and it never cancels a rollback in
flight: a half-applied rollback is worse than either state.

The same command from a laptop, when GitHub is the thing that is broken:

```bash
npx wrangler versions list          # find the version id
npx wrangler rollback <version-id> -y
```

**A rollback changes what is deployed, not what is committed.** Afterwards the
live `version.json` is not the tip of `main`, and the site stays on the old build
until the next push to `main` deploys. Fix forward and push, rather than leaving
the release tag and the live site disagreeing. Check what is live with
`curl -s https://open-textbook.org/version.json`.

## What is deployed

```
site/
├── index.html                 the landing page        ← textbook.portal
├── 404.html                   the root 404            ← textbook.portal
├── _headers                   response headers        ← textbook.headers
├── robots.txt                 ours, not Cloudflare's  ← textbook.portal
├── sitemap.xml                a sitemap index         ← textbook.portal
├── version.json               which commit is live    ← textbook.portal
├── manifest.webmanifest       the web app manifest    ← textbook.portal
├── sw.js                      the service worker      ← textbook.portal
├── assets/stylesheets/        themes.css, portal.css, settings.css
├── assets/settings/           the Settings runtime, the registration
├── assets/icons/              the home-screen icon
├── gcse-maths/higher/         one pipeline build per book profile
└── gcse-maths/foundation/
```

`wrangler.jsonc` points the Worker's static assets at `site/`, so the Worker is
an asset server with no script of its own. Adding a book needs no change here:
the build matrix in `engine/src/textbook/plan.py` drives it. `--configs` emits the
arguments for `python -m textbook.pipeline`, one `--book <id> --profile <profile>`
per build, and CI and `scripts/deploy.sh` run that list. The pipeline's link
checker is the strict build: every internal link must resolve to a
built file and the build exits non-zero when one does not.

`workers_dev` and `preview_urls` are both `false`, so there is exactly one
origin. Both settings are public copies of the site otherwise — `workers_dev`
serves the whole collection at `open-textbook.<account>.workers.dev`, and a
version URL publishes every build uploaded before promotion. They are closed in
config as well as in the dashboard because a deploy would otherwise reopen what
the dashboard closed.

### Who is live

`site/version.json` carries the commit and the tag, and every generated page
carries `<meta name="build" content="…">`. This is what turns "I saw a wrong
answer" into a comparison:

```bash
curl -s https://open-textbook.org/version.json
```

CI supplies both values: the `release` job publishes the tag it created as an
output, and the `deploy` job passes it as `BUILD_TAG` with `BUILD_COMMIT`. `git`
is the local fallback, so a local `scripts/deploy.sh` is stamped too. Nothing here
can fail a build: an approximate identity beats none, so an unavailable value is
simply absent.

## Caching and response headers

**`site/_headers` carries the security headers, and deliberately declares no
`Cache-Control`.** It is generated by `engine/src/textbook/headers.py` and emitted by
`python -m textbook.portal`. It adds a content security policy, `nosniff`, a
referrer policy, `Permissions-Policy` and `X-Frame-Options` to every path. No
other part of a static deployment sets these, so without it the books would ship
with none.

It does **not** set `Cache-Control`. Workers' default for static assets is
`Cache-Control: public, max-age=0, must-revalidate` with an `ETag`, which is what
we want: stale content is never served, so a deploy takes effect immediately, and
unchanged files come back as `304` rather than being re-sent. This is also the
thing GitHub Pages would not allow — it pins `max-age=600` on every asset, which
is what makes a service worker unsafe to ship there. Declaring `Cache-Control`
here would not replace that default; the two rules would be joined (see below).

Two rules govern any header added here:

- `_headers` supports **one splat per rule**, so a pattern such as
  `/*/assets/main.*.css` is invalid. Every header is site-wide, so the single
  `/*` rule is enough; a narrower rule is needed only to detach or override a
  broad one.
- A header set by two matching rules is **joined with a comma**, which produces an
  invalid `Cache-Control`. To override a broad rule, detach it first with
  `! Cache-Control` in the narrower block.

**HSTS is set at the zone, not here.** Cloudflare's SSL/TLS → Edge Certificates →
HSTS sends `Strict-Transport-Security`; sending it here as well would duplicate
the header. See "One-time setup".

The file's shape and its policy are held by `tests/test_deploy.py`. Edit
`engine/src/textbook/headers.py`, never `site/_headers`.

## Installable and offline

`site/manifest.webmanifest` and `site/sw.js` are emitted at the deployment root
by `python -m textbook.portal`. The root is what gives the service worker the
whole collection for free: a worker's scope defaults to its own directory, and
`site/` is ours, so no `Service-Worker-Allowed` header is needed. Every page —
the landing page and each book page — links the manifest and loads one shared
registration script (`site/assets/settings/service-worker.js`), so there is a
single registration site-wide. `engine/src/textbook/templates/page.html` adds both
to the book pages.

The manifest carries no `theme_color` and no `background_color`. Those cannot
follow the reader's bundle or colour scheme, and a fixed value would contradict
the theming model for the sake of a splash screen. There is one icon, drawn in
the house ink and paper and declared `any maskable`, so the same file works
whatever a launcher masks it with.

**With JavaScript off nothing here runs**, and the site is unchanged: the prose
and the build-time MathML are in the HTML. Offline reading is an enhancement,
never a dependency.

### The service-worker caching decision

The worker must not undo the guarantee above, so its strategy is deliberately
one-directional:

| Request | Strategy | Why |
|---|---|---|
| Navigation (`mode === "navigate"`) | **network-first** | Online, the network always wins, so a reader is never served a page from before a fix. The cache answers only when the network cannot. |
| Static asset (style/script/font/image) | **cache-first** | The bytes do not change under a stable name. |
| Anything else | network-first | Same reason as a navigation. |
| Non-GET, or another origin | not intercepted | A worker that intercepts everything breaks something. |

Only `/` and `/manifest.webmanifest` are precached, and nothing else: a failed
precache fails the whole install, so the list stays tiny. Every other page is
cached as it is visited, and an uncached navigation falls back to the front door
rather than to the browser's error page.

**The update path is explicit rather than hoped for.** `assets/sw.js` carries the
placeholder `__TB_BUILD__`, and the portal stamps the build label (the release
tag, or the commit) into the cache name. Every deploy therefore ships a
byte-different worker. Because Workers revalidates `sw.js` on request, the
browser installs it, `skipWaiting()` activates it without waiting for every tab
to close, `clients.claim()` takes over pages that are already open, and
`activate` deletes every cache named `open-textbook-*` other than the current
one. A stale asset cannot outlive a deploy.

The whole loop was driven in Chromium, not assumed: an initial cache
(`open-textbook-<build>`), then a byte-different worker served under the same
URL, after which the new cache was present **and the old one gone**. With a
single build the cache key is stable, so a cache with no git and no CI variables
falls back to `open-textbook-dev`.

### Performance budget

One page is budgeted at **under 1.7 MB and no more than 16 requests, with the
document under 350 kB and at most 7 render-blocking stylesheets.** Re-measured on
2026-10-11 in Chromium (Playwright, driving the runner's Google Chrome) against a
local server that reproduces Workers' `Cache-Control: public, max-age=0,
must-revalidate`, for `gcse-maths/higher` → `chapter-1/section-1.1/learn/`:

| Measure | Value |
|---|---|
| Requests (document + resources) | 13 |
| Transferred bytes | ~153 kB |
| Document | ~83 kB |
| Stylesheets | 6, all render-blocking |
| Scripts | booklet 16 kB, settings 4 kB, one figure module 3 kB, service-worker registration 1 kB, figures loader 1 kB |
| Largest single resource | `assets/stylesheets/themes.css`, ~19 kB |
| DOMContentLoaded / load | ~200 ms |

The page uses a fifth of the byte budget and is three requests under the request
budget. There is no font request and no third-party origin. Unlike the MkDocs
shell these numbers replace, the pipeline loads no Material bundle and no eagerly
fetched search index: Pagefind fetches its index only when the reader searches,
so the largest single resource is now the theme palette. Routes differ by the
document's own size and, on a page with a figure, by one figure module — across
the pages measured here (the landing page, a chapter landing page, a Learn page
and a practise page) the range is 7–13 requests, 47–153 kB and a document of
11–86 kB.

Re-measure with:

```bash
node scripts/measure-budget.cjs site /gcse-maths/higher/chapter-1/section-1.1/learn/
```

It binds a local server on an ephemeral port rather than serving through request
interception, because an intercepted response reports `transferSize` as 0 and the
budget would read as far too small. The server sends the files with no compression
(the method above, and what the previous numbers used); `--compress` shows what a
CDN in front of the Worker would add. The totals are the `transferSize` of the
navigation entry plus the sum over `performance.getEntriesByType("resource")`, so
they are bytes over the wire on the first load and include the service worker's
registration script. The `sw.js` it registers is fetched by the browser outside
the page's resource timings, so it is not counted. Like the theme preview, the
script needs Chrome and the Playwright client (see `tests/README.md`).

## Checking a deploy

```bash
curl -sI https://open-textbook.org/ | head -20          # headers, and the scheme
curl -s  https://open-textbook.org/version.json         # which commit is live
curl -s  https://open-textbook.org/robots.txt           # ours, and names the sitemap
curl -s  https://open-textbook.org/sitemap.xml | head   # a sitemap index
curl -s  https://open-textbook.org/gcse-maths/higher/ | grep -o '<link rel="canonical"[^>]*>'
curl -sI https://open-textbook.org/gcse-maths/higher/nope/ | head -3   # should be 404
curl -sI http://open-textbook.org/ | head -3            # should be 301 to https
curl -sI https://open-textbook.org/manifest.webmanifest | head -3   # application/manifest+json
curl -s  https://open-textbook.org/sw.js | head -3      # the versioned cache name
```

## DNS: the `www` redirect

`www.open-textbook.org` does not resolve. Fixing it is two steps in the
Cloudflare dashboard, and neither of them is a Worker setting:

1. **DNS → Records → Import and Export → Import DNS records.** Upload
   `deploy/dns/open-textbook.org.zone`. Leave **Proxy imported DNS records**
   ticked — a redirect rule cannot fire for a hostname Cloudflare does not proxy,
   and the file's `cf_tags=cf-proxied:true` enforces it either way. The file also
   carries the SPF and DMARC records for a domain that sends no mail; its CAA
   block is commented out on purpose (below).
2. **Rules → Redirect Rules.** When the hostname is `www.open-textbook.org`,
   redirect to `https://open-textbook.org` with a **301**, preserving the path and
   query string.

The file names the apex only for `TXT` records. **Never import an apex `A`,
`AAAA` or `CNAME`**: the apex belongs to the Worker's custom domain, and importing
an address record there collides with it.

**Why CAA is enabled now.** A CAA record restricts which certificate
authorities may issue for the domain. It is real hardening with a delayed
failure mode: if the list omits the CA Cloudflare actually uses, nothing breaks
on the day and the certificate fails to **renew** weeks later. It was therefore
held back until the issuer could be checked. Checked 2026-10-11: the live
certificate is issued by **Google Trust Services** (`CN=WE1`), valid to
2027-01-09. The three CAs in the file are the ones Cloudflare documents for
custom domains, so the list is a superset of what is known to be in use. Re-check
it when that certificate comes up for renewal.

The canonical link should read `https://open-textbook.org/gcse-maths/higher/`. If
it points at the old GitHub Pages URL, `base_url` in `collection.yaml` did not
follow the deploy — every profile's `site_url`, canonical links and sitemap derive
from it.
