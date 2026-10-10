# Figure, authored with a Jinja macro

This variant exists only to compare against `mkdocs-macros-plugin`, whose
natural syntax is a Jinja call. That syntax is MkDocs-plugin-specific and, as
the harness shows, any literal double-brace sequence in prose or maths is treated
as an expression and can abort the build.

{{ figure("gradient") }}
