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

Push to `main`. Every other job must pass first — nothing ships that did not
verify — and the deploy job then rebuilds the site and runs `wrangler deploy`.
You can also trigger it by hand from the Actions tab (**Run workflow**), which
deploys whatever is on `main`.

To release only from tags instead, change the `deploy` job's `if:` to start with
`startsWith(github.ref, 'refs/tags/')`.

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

## What is deployed

```
site/
├── index.html                 the landing page        ← textbook.portal
├── 404.html                   the root 404            ← textbook.portal
├── assets/stylesheets/        themes.css, portal.css  ← copied by the portal
├── gcse-maths/higher/         one MkDocs build per book profile
└── gcse-maths/foundation/
```

`wrangler.jsonc` points the Worker's static assets at `site/`, so the Worker is
an asset server with no script of its own. Adding a book needs no change here:
the build matrix in `engine/textbook/plan.py` drives it.

## Caching

**No `_headers` file, deliberately.** Workers' default for static assets is
`Cache-Control: public, max-age=0, must-revalidate` with an `ETag`, which is what
we want: stale content is never served, so a deploy takes effect immediately, and
unchanged files come back as `304` rather than being re-sent. This is also the
thing GitHub Pages would not allow — it pins `max-age=600` on every asset, which
is what makes a service worker unsafe to ship there.

Two notes for when that changes:

- `_headers` supports **one splat per rule**, so a pattern such as
  `/*/assets/main.*.css` is invalid. Emit one rule per profile path instead — the
  engine knows them.
- A header set by two matching rules is **joined with a comma**, which produces an
  invalid `Cache-Control`. To override a broad rule, detach it first with
  `! Cache-Control` in the narrower block.

A `_headers` file will be worth adding when the PWA lands, for a content security
policy and for `sw.js`. Not before: a speculative cache rule is a way to serve
stale pages, and the default is already correct.

## Checking a deploy

```bash
curl -sI https://open-textbook.org/ | head -20          # headers, and the scheme
curl -s  https://open-textbook.org/gcse-maths/higher/ | grep -o '<link rel="canonical"[^>]*>'
curl -sI https://open-textbook.org/gcse-maths/higher/nope/ | head -3   # should be 404
```

The canonical link should read `https://open-textbook.org/gcse-maths/higher/`. If
it points at the old GitHub Pages URL, `base_url` in `collection.yaml` did not
follow the deploy — every profile's `site_url`, canonical links and sitemap derive
from it.
