#!/usr/bin/env bash
# Fetch the primary sources for a book into research/sources/<book>/.
#
# The manifest (books/<book>/sources.yaml) is tracked: it records what each
# source is and why it matters. The PDFs and extracted text are bulky and
# regenerable, so they are git-ignored reference material.
#
# Usage: scripts/fetch_sources.sh <book-id>
set -euo pipefail

BOOK="${1:-}"
if [ -z "$BOOK" ]; then
  echo "usage: scripts/fetch_sources.sh <book-id>" >&2
  echo "books: $(ls -1 "$(dirname "${BASH_SOURCE[0]}")/../books")" >&2
  exit 2
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST="$ROOT/books/$BOOK/sources.yaml"
OUT="$ROOT/research/sources/$BOOK"
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

[ -f "$MANIFEST" ] || { echo "no manifest at $MANIFEST" >&2; exit 1; }
mkdir -p "$OUT"

fetch() { # url filename
  if [ -s "$OUT/$2" ]; then echo "have $2"; else
    echo "fetch $2"
    curl -fsSL -m 180 -A "$UA" "$1" -o "$OUT/$2"
  fi
}

have_pdftotext=1
command -v pdftotext >/dev/null || have_pdftotext=0

# Each manifest download is "url<TAB>filename<TAB>1 if text should be extracted".
while IFS=$'\t' read -r url file want_text; do
  [ -n "$url" ] || continue
  fetch "$url" "$file"
  if [ "$want_text" = "1" ] && [ "$have_pdftotext" = "1" ]; then
    stem="${file%.pdf}"
    [ -s "$OUT/$stem.txt" ] || pdftotext -layout "$OUT/$file" "$OUT/$stem.txt"
  fi
done < <(python3 - "$MANIFEST" <<'PY'
import sys, yaml
data = yaml.safe_load(open(sys.argv[1], encoding="utf-8")) or {}
for item in data.get("downloads", []):
    print(f"{item['url']}\t{item['file']}\t{1 if item.get('text') else 0}")
PY
)

if [ "$have_pdftotext" = "0" ]; then
  echo "note: pdftotext not found, so no text was extracted" >&2
fi

echo "done: $OUT"
ls -1 "$OUT"
