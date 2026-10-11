# AGENTS.md — deployment and DNS

`deploy/` holds the DNS records. The deployment itself is static files served
from Cloudflare, assembled by the engine; `DEPLOY.md` is the runbook, and
`wrangler.jsonc` declares the Worker that serves the built `site/`.

Read the root `AGENTS.md` first. The root's **Branches and releases**, **Build
and verify** and **Toolchain** still apply. This file adds what is particular to
deployment.

## What lives here

| Path | What it does |
|---|---|
| `deploy/dns/open-textbook.org.zone` | The importable BIND zone file for the DNS records |
| `deploy/dns/open-textbook.org.caa.zone` | The CAA records, kept separately so they can be re-imported alone |
| `deploy/dns/open-textbook.org.exported.txt` | The zone as exported from Cloudflare, the check that the import matched |
| `deploy/dns/open-textbook.org.exported2.txt` | A later export, kept as the second point of comparison |
| `wrangler.jsonc` | The Worker that serves `site/` as static assets |

## Rules local to deployment

- **`DEPLOY.md` is the runbook.** One-time credentials, the domain, what each
  stage does, and how to check a deploy. Read it before running
  `scripts/deploy.sh`.
- **The zone file is the source; the exports are evidence.** Edit the importable
  zone in `deploy/dns/`, re-import it, and record the export that proves the
  import matched. Do not edit the exported files by hand.
- **A release and a deploy only run from `main`.** The release and deploy jobs
  require `refs/heads/main`, so a push to `dev` verifies and stops. That is what
  makes `dev` safe to push to; see the root's **Branches and releases**.
- **A workflow change is inert until it reaches `main`.** The pipeline that runs
  is the one on the branch being pushed. Pushing such a change straight to
  `main` deploys, because that is what pushing to `main` does.
- **The DNS records are checked.** `tests/test_deploy.py` pins the zone, the CAA
  records and the rollback workflow, so a rename here fails locally rather than
  live.
- **Credentials never enter the repository.** They come from `.env`
  (git-ignored) locally, or the repository secrets in CI.

## Common tasks

- **Deploying** — `scripts/deploy.sh`, after `scripts/check.sh` passes.
- **Rolling back** — the `rollback.yml` workflow, or the recorded command in
  `DEPLOY.md`.
- **Changing DNS** — edit the importable zone, re-import, then re-export.

## Read next

`DEPLOY.md` for the whole runbook, `.github/AGENTS.md` for the workflow, and the
root's **Branches and releases**.
