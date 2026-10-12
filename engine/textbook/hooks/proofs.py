"""Expand the line-anchored ``:::prove <id>`` directive into a link to the proof.

A fact stated as fact should lead to its proof. The page says *where* a claim is
made; the proof book owns the proof, once, so a reader meets the same page whether
they arrived from GCSE Mathematics or from A level.

The directive emits a plain ``<a>``. There is no script and nothing to load: the
proof is a page, the link is a link, and the whole affordance works with
scripting off — which is the Tier-0 rule this collection holds itself to, and the
reason a dialog was the wrong answer to "make it clickable".

**The label is the point.** ``proofs.beyond_course`` compares the proof's
``qualifications`` against the book the reader is in, and a proof outside their
course carries a note saying so. The same proof is inside the course when it is
linked from the book that teaches it and outside it when linked from one that does
not, and only the build knows which — which is why this runs as a hook rather than
being written into the page.

An unknown id fails the build, the same way an unknown ``:::figure`` slug does.
"""

from __future__ import annotations

import html
import re

from .. import config as cfg
from .. import proofs as proofbook
from ._fences import transform_outside_fences

MARKER = re.compile(r"^:::[ \t]*prove[ \t]+([a-z0-9-]+)[ \t]*$", re.M)


def qualification(config) -> str:
    """The qualification of the book being built, which is never the reference work."""
    raw = cfg.extra(config).get("qualification")
    return str(raw or cfg.book(config).qualification)


def render(entry: dict, beyond: bool) -> str:
    """The affordance: one anchor, and a note when the proof is out of course."""
    note = ""
    if beyond:
        note = (
            f'<p class="prove__note">'
            f'<span class="prove__badge">{html.escape(proofbook.BEYOND_LABEL)}</span> '
            f"{html.escape(proofbook.BEYOND_NOTE)}</p>"
        )
    return (
        f'<aside class="prove">'
        f'<a class="prove__link" href="{html.escape(entry["url"], quote=True)}">'
        f'<span class="prove__ask">Prove it to me</span>'
        f'<span class="prove__title">{html.escape(str(entry.get("title") or ""))}</span>'
        f"</a>{note}</aside>"
    )


def on_page_markdown(markdown, page, config, files):
    entries = proofbook.entries(config)
    qualification_id = qualification(config)
    used: set[str] = set()

    def replace(match: re.Match[str]) -> str:
        proof_id = match.group(1)
        entry = entries.get(proof_id)
        if entry is None:
            raise ValueError(
                f"proofs: unknown proof '{proof_id}' in {page.file.src_path} "
                f"(known: {', '.join(sorted(entries)) or 'none'})"
            )
        used.add(proof_id)
        return render(entry, proofbook.beyond_course(entry, qualification_id))

    return transform_outside_fences(markdown, lambda text: MARKER.sub(replace, text))
