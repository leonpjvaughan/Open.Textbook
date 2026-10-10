#!/usr/bin/env bash
# Build every prototype and assert the behaviour we care about.
#
# Usage: test/run.sh
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MKDOCS="$ROOT/.venv/bin/mkdocs"
SITE="$ROOT/test/site"
mkdir -p "$SITE"
pass=0
fail=0

ok()   { pass=$((pass + 1)); printf '  PASS  %s\n' "$1"; }
bad()  { fail=$((fail + 1)); printf '  FAIL  %s\n' "$1"; }

has()    { grep -qF "$2" "$1" 2>/dev/null; }
has_re() { grep -qE "$2" "$1" 2>/dev/null; }

build() { # config -> logs to test/site/<name>.build.log ; returns 0/1
  "$MKDOCS" build -f "$ROOT/test/configs/$1" --strict >"$SITE/$1.build.log" 2>&1
}

echo "== figure hooks =="

# --- raw HTML: portable substrate, no tooling, global loader -------------------
build fig-raw.yml && ok "fig-raw builds --strict" || bad "fig-raw build (see $SITE/fig-raw.yml.build.log)"
has "$SITE/fig-raw/figure-raw/index.html" '<maths-figure data-figure="gradient">' \
  && ok "raw: element passes through" || bad "raw: element missing"
has "$SITE/fig-raw/plain/index.html" 'assets/figures/figures.js' \
  && ok "raw: loader on every page (incl. Tier-0 plain)" || bad "raw: loader missing"
has "$SITE/fig-raw/figure-directive/index.html" ':::figure gradient' \
  && ok "raw: directive is NOT understood (left literal)" || bad "raw: directive unexpectedly expanded"

# --- macros plugin: shorthand, global loader -----------------------------------
build fig-macros.yml && ok "fig-macros builds --strict" || bad "fig-macros build (see $SITE/fig-macros.yml.build.log)"
has "$SITE/fig-macros/figure-jinja/index.html" '<maths-figure data-figure="gradient">' \
  && ok "macros: jinja marker expands to element" || bad "macros: element missing"
has "$SITE/fig-macros/figure-directive/index.html" ':::figure gradient' \
  && ok "macros: directive is NOT understood" || bad "macros: directive unexpectedly expanded"
if has "$SITE/fig-macros/plain/index.html" 'figures.js'; then
  ok "macros: loader on every page (global extra_javascript)"
else
  bad "macros: expected a global loader on the plain page"
fi

# --- native hook: shorthand, per-page loader, fails on unknown slug ------------
build fig-hook.yml && ok "fig-hook builds --strict" || bad "fig-hook build (see $SITE/fig-hook.yml.build.log)"
has "$SITE/fig-hook/figure-directive/index.html" '<maths-figure data-figure="gradient">' \
  && ok "hook: directive expands to element" || bad "hook: element missing"
has "$SITE/fig-hook/figure-directive/index.html" 'src="../assets/figures/figures.js"' \
  && ok "hook: page-relative loader injected" || bad "hook: loader path wrong"
if has "$SITE/fig-hook/plain/index.html" 'figures.js'; then
  bad "hook: loader leaks onto Tier-0 plain page"
else
  ok "hook: no figure JS on plain page"
fi
has "$SITE/fig-hook/figure-jinja/index.html" 'figure("gradient")' \
  && ok "hook: jinja marker left untouched (no hijack)" || bad "hook: jinja marker mishandled"
if build fig-hook-bad.yml; then
  bad "hook: unknown slug did NOT fail the build"
else
  ok "hook: unknown slug fails the build"
fi
echo "== tier strategies =="

build tier-foundation.yml && ok "foundation builds --strict" || bad "foundation build (see $SITE/tier-foundation.yml.build.log)"
if [ -e "$SITE/tier-foundation/higher-only/index.html" ]; then
  bad "foundation: Higher-only page was emitted"
else
  ok "foundation: Higher-only page dropped"
fi
if has "$SITE/tier-foundation/foundation-core/index.html" 'Higher extension'; then
  bad "foundation: in-page Higher block leaked"
else
  ok "foundation: in-page Higher block stripped"
fi
has "$SITE/tier-foundation/foundation-core/index.html" 'both tiers' \
  && ok "foundation: shared content retained" || bad "foundation: shared content lost"

build tier-higher.yml && ok "higher builds --strict" || bad "higher build (see $SITE/tier-higher.yml.build.log)"
has "$SITE/tier-higher/higher-only/index.html" 'Higher-only' \
  && ok "higher: Higher-only page present" || bad "higher: Higher-only page missing"
has "$SITE/tier-higher/foundation-core/index.html" 'Higher extension' \
  && ok "higher: in-page Higher block present" || bad "higher: in-page Higher block missing"

build tier-toggle.yml && ok "toggle builds --strict" || bad "toggle build (see $SITE/tier-toggle.yml.build.log)"
has "$SITE/tier-toggle/foundation-core/index.html" 'data-tier="higher"' \
  && ok "toggle: Higher block tagged for the switch" || bad "toggle: Higher block not tagged"
has "$SITE/tier-toggle/index.html" 'tier-toggle.js' \
  && ok "toggle: switch script present" || bad "toggle: switch script missing"

echo
echo "== summary =="
echo "  pass: $pass   fail: $fail"
[ "$fail" -eq 0 ]
