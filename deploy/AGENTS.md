# AGENTS.md — deployment and DNS

`deploy/` holds the DNS records; deployment is static files served from Cloudflare
and assembled by the engine. `DEPLOY.md` is the runbook; `wrangler.jsonc`
declares the Worker serving the built `site/`. Read the root `AGENTS.md` first.

## What lives here

| Path | What it does |
|---|---|
| `deploy/dns/open-textbook.org.zone` | Importable BIND zone for the DNS records |
| `deploy/dns/open-textbook.org.caa.zone` | CAA records, separate so they re-import alone |
| `deploy/dns/open-textbook.org.exported.txt` | Cloudflare export, proving the import matched |
| `deploy/dns/open-textbook.org.exported2.txt` | Later export, second comparison point |
| `wrangler.jsonc` | Worker serving `site/` as static assets |

## Rules local to deployment

- **`DEPLOY.md` is the runbook**: credentials, domain, each stage, how to check a
  deploy. Read it before `scripts/deploy.sh`.
- **The zone is the source, the exports evidence.** Edit the importable zone in
  `deploy/dns/`, re-import, record the export proving the match. Never hand-edit
  an export.
- **Release and deploy run from `main` only**: the jobs require
  `refs/heads/main`, so pushing to `dev` verifies and stops.
- **A workflow change is inert until it reaches `main`**: the pipeline that runs
  is the one on the branch pushed, and pushing such a change straight to `main`
  deploys.
- **The DNS records are checked**: `tests/test_deploy.py` pins the zone, the CAA
  records and the rollback workflow.
- **Credentials never enter the repository**: `.env` (git-ignored) locally, or
  repository secrets in CI.

## Common tasks

- **Deploying** — `scripts/deploy.sh`, after `scripts/check.sh` passes.
- **Rolling back** — `rollback.yml`, or the recorded command in `DEPLOY.md`.
- **Changing DNS** — edit the importable zone, re-import, re-export.

## Read next

`DEPLOY.md`, then `.github/AGENTS.md` for the workflow.
