"""``{{ figure("slug") }}`` via mkdocs-macros-plugin (evaluated in test/).

Kept only as a comparison point. The macro has no page context by default, so
the figure script is loaded site-wide via ``extra_javascript`` rather than
injected per page.
"""

from __future__ import annotations

KNOWN = {"gradient"}


def define_env(env):
    @env.macro
    def figure(slug: str) -> str:
        if slug not in KNOWN:
            raise ValueError(f"figure(): unknown slug '{slug}'")
        return f'<maths-figure data-figure="{slug}"></maths-figure>'
