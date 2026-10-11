"""The engine's page hooks, composed in an explicit order.

Several hooks want the same event, so the order cannot be expressed by listing
files — it is stated once, here, and tested.

Order matters:

1. ``tier`` strips Higher-only blocks before anything else expands;
2. ``toc`` expands ``:::chapters`` from the curriculum;
3. ``figures`` expands ``:::figure`` and injects the loader;
4. ``problems`` expands ``:::problems`` / ``:::answers`` from the verified bank;
5. ``maths`` renders the ``$...$`` those hooks emitted — last, because it runs
   on rendered HTML rather than markdown.

The reader-preference script is not a hook: ``prefs.snippet`` generates it and
both page templates carry the result, so the pipeline and the portal share one
implementation rather than a MkDocs hook that no renderer calls.
"""

from __future__ import annotations

from . import figures, maths, problems, tier, toc

__all__ = ["on_files", "on_page_markdown", "on_page_content"]


def on_files(files, config, **kwargs):
    return tier.on_files(files, config)


def on_page_markdown(markdown, page, config, files):
    for hook in (tier, toc, figures, problems):
        markdown = hook.on_page_markdown(markdown, page, config, files)
    return markdown


def on_page_content(content, page, config, files):
    return maths.on_page_content(content, page, config, files)
