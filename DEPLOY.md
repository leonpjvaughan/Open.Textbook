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

| Stage | Job | What it does |
|---|---|---|
| 1 | `plan`, `generated`, `build`, `content`, `lint workflows` | banks, tests, voice, both tier builds, drift check, actionlint |
| 2 | **all checks** (`gate`) | one stable check name, so branch protection does not have to track the build matrix |
| 3 | `tag and release` | tags `YYYY.MM.DD` and publishes a release with generated notes |
| 4 | `deploy to production` | rebuilds `site/` and runs `wrangler deploy` |

You can also trigger it by hand from the Actions tab (**Run workflow**), which
runs the same pipeline on whatever is on `main`.

### Releases

Tags are dates in `Europe/London`, not the runner's UTC, because this is a UK
textbook and a release dated tomorrow would be confusing. Each release body
carries the live URL plus GitHub's generated notes.

**One release per day.** A second push the same day deploys but is not released:
today's tag already points at an earlier commit, and moving a tag to keep up
would be worse than not tagging. The job says so in its log rather than failing,
because a skipped release must not skip the deploy. If you would rather have one
release per deploy, change the tag to something like `$(date +%Y.%m.%d-%H%M)`.

A release is created *before* the deploy, so a version describes the content
rather than the hosting. If a deploy fails, the version still exists and you
re-run the deploy — which, the tag already being there, changes nothing else.

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
