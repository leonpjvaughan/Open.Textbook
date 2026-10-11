"""The MkDocs hooks, composed in an explicit order.

MkDocs collects hooks by looking for event-named callables in the namespace of
each file listed under ``hooks:``. Several of our hooks want the same event, so
the order cannot be expressed by listing files — it is stated here, once, and
tested. The MkDocs-facing file (``renderers/mkdocs/hooks/entry.py``) re-exports
only these three functions.

Order matters:

1. ``tier`` strips Higher-only blocks before anything else expands;
2. ``toc`` expands ``:::chapters`` from the curriculum;
3. ``figures`` expands ``:::figure`` and injects the loader;
4. ``problems`` expands ``:::problems`` / ``:::answers`` from the verified bank;
5. ``maths`` renders the ``$...$`` those hooks emitted — last, because it runs
   on rendered HTML rather than markdown;
6. ``scheme`` runs on the finished page, bridging the collection-wide light/dark
   preference into Material's storage before the first paint.
"""

from __future__ import annotations

from . import figures, maths, problems, scheme, tier, toc

__all__ = ["on_files", "on_page_markdown", "on_page_content", "on_post_page"]


def on_files(files, config, **kwargs):
    return tier.on_files(files, config)


def on_page_markdown(markdown, page, config, files):
    for hook in (tier, toc, figures, problems):
        markdown = hook.on_page_markdown(markdown, page, config, files)
    return markdown


def on_page_content(content, page, config, files):
    return maths.on_page_content(content, page, config, files)


def on_post_page(output, page, config):
    return scheme.on_post_page(output, page, config)
