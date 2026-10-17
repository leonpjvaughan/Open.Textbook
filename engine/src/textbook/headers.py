"""The HTTP response headers the deployed site must carry.

``site/`` is served by the Cloudflare Worker as static assets, and Workers read a
``_headers`` file from the asset root. No other part of a static deployment sets
a security header, so without this file the books ship with none: no content
security policy, no ``nosniff``, no referrer policy. This module generates it.

Three rules shape the file, and all three are easy to get wrong:

* **One splat per rule.** A pattern such as ``/*/assets/main.*.css`` is invalid.
  Every header here is site-wide, so one ``/*`` rule is enough.
* **A header set by two matching rules is joined with a comma**, which makes an
  invalid value. So this file declares **no** ``Cache-Control``: the Worker's own
  default (``public, max-age=0, must-revalidate`` with an ``ETag``) is what the
  site relies on for freshness, and re-declaring it would corrupt that.
* **HSTS belongs to the zone, not here.** Cloudflare's SSL/TLS toggle sends
  ``Strict-Transport-Security``. Sending it here as well would duplicate it, so
  it is deliberately absent — see DEPLOY.md.

The policy is written for what the site actually loads, which is little:

* inline scripts — the reader-preference hook in ``hooks/prefs.py`` and
  Material's own config block — and inline styles on the landing-page cards, so
  ``script-src`` and ``style-src`` need ``'unsafe-inline'``. There is no server,
  no user input and no cookie, so there is nothing for an injected script to
  steal; a nonce or hash policy is a later hardening step, not a gate.
* Material's search runs in a **same-origin** worker
  (``assets/javascripts/workers/search.*.min.js``), so ``worker-src 'self'``.
* no external origin at runtime. KaTeX runs at build time; fonts are the
  reader's own. The conditional ``unpkg.com`` fetches in Material's bundle are
  for Mermaid and a ``ResizeObserver`` polyfill — the site uses neither, and a
  policy that blocks them is a feature.

``_headers`` is generated, never hand-written, and ``site/`` itself is
build output. Edit this module, then run ``python -m textbook.portal``.
"""

from __future__ import annotations

from pathlib import Path

#: The content security policy, as one header value.
#:
#: `frame-ancestors` and `object-src` are the two directives doing real work
#: here: they stop the books being framed and stop plugin content, neither of
#: which the site needs and both of which a static host sets no defence against.
POLICY = "; ".join(
    (
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "worker-src 'self'",
        "manifest-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
    )
)

#: Headers applied to every path. Ordered as they read in the file.
#:
#: `X-Frame-Options` repeats `frame-ancestors` on purpose: the directive is the
#: current mechanism and the header covers browsers that predate it.
HEADERS: dict[str, str] = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), camera=(), microphone=()",
    "Content-Security-Policy": POLICY,
}

#: The only rule pattern. One splat, because `_headers` allows no more.
RULE = "/*"


def content() -> str:
    """The `_headers` file body, as Cloudflare Workers read it."""
    lines = [RULE]
    lines.extend(f"  {name}: {value}" for name, value in HEADERS.items())
    return "\n".join(lines) + "\n"


def write(site: Path) -> Path:
    """Write `_headers` at the asset root and return its path."""
    path = Path(site) / "_headers"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content(), encoding="utf-8")
    return path
