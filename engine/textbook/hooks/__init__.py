"""The engine's page hooks, composed in an explicit order.

Several hooks want the same event, so the order cannot be expressed by listing
files — it is stated once, here, and tested.

Order matters:

1. ``tier`` strips Higher-only blocks before anything else expands;
2. ``toc`` expands ``:::chapters`` from the curriculum;
3. ``figures`` expands ``:::figure`` and injects the loader;
4. ``proofs`` expands ``:::prove`` into a link to the shared proof book;
5. ``problems`` expands ``:::problems`` / ``:::answers`` from the verified bank;
6. ``maths`` renders the ``$...$`` those hooks emitted — last, because it runs
   on rendered HTML rather than markdown.

The reader-preference script is not a hook: ``prefs.snippet`` generates it and
both page templates carry the result, so the pipeline and the portal share one
implementation rather than a MkDocs hook that no renderer calls.
"""

from __future__ import annotations

from . import figures, maths, problems, proofs, tier, toc

__all__ = ["MARKDOWN_HOOKS", "on_files", "on_page_markdown", "on_page_content"]

#: The markdown hooks, in the order they run. **The only copy.** The pipeline used
#: to keep a second tuple of its own, so the chain that actually ran was not the
#: chain this docstring described — adding `proofs` here alone changed nothing, and
#: a reader would have found the order stated in two places with no test comparing
#: them. `pipeline.MARKDOWN_HOOKS` is this object, and
#: `tests/test_render_hooks.py` fails if the two ever part company again.
MARKDOWN_HOOKS = (tier, toc, figures, proofs, problems)


def on_files(files, config, **kwargs):
    return tier.on_files(files, config)


def on_page_markdown(markdown, page, config, files):
    for hook in MARKDOWN_HOOKS:
        markdown = hook.on_page_markdown(markdown, page, config, files)
    return markdown


def on_page_content(content, page, config, files):
    return maths.on_page_content(content, page, config, files)
