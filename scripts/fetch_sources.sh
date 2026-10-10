#!/usr/bin/env bash
# Fetch the primary curriculum sources for the GCSE Mathematics book.
#
# The PDFs and extracted text are reference material and are deliberately
# git-ignored (see .gitignore). Re-run this script to restore them locally.
#
# Usage: scripts/fetch_sources.sh [outdir]   # default: sources/
set -euo pipefail

OUT="${1:-sources}"
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
mkdir -p "$OUT"
cd "$OUT"

fetch() { # url filename
  if [ -s "$2" ]; then echo "have $2"; else
    echo "fetch $2"
    curl -fsSL -m 120 -A "$UA" "$1" -o "$2"
  fi
}

# DfE subject content — the authoritative curriculum (OGL, Crown copyright).
fetch "https://assets.publishing.service.gov.uk/media/5a7cb5b040f0b6629523b52c/GCSE_mathematics_subject_content_and_assessment_objectives.pdf" dfe_content.pdf
# AQA 8300 specification.
fetch "https://www.aqa.org.uk/files/resources.mathematics.specifications.AQA-8300-SP-2015_PDF/ed86a99d3abbb2fff89fc83ee6046f9ae8e37c78.pdf" aqa_spec.pdf
# Pearson Edexcel 1MA1 specification and content guidance.
fetch "https://qualifications.pearson.com/content/dam/pdf/GCSE/mathematics/2015/specification-and-sample-assesment/gcse-maths-2015-specification.pdf" edexcel_spec.pdf
fetch "https://qualifications.pearson.com/content/dam/pdf/GCSE/mathematics/2015/teaching-and-learning-materials/GCSE_(9-1)_Mathematics_Content_Guidance.pdf" edexcel_content_guidance.pdf
# Cambridge OCR J560 specification.
fetch "https://www.ocr.org.uk/Images/168982-specification-gcse-mathematics.pdf" ocr_spec.pdf

command -v pdftotext >/dev/null || { echo "pdftotext not found; skipping text extraction" >&2; exit 0; }
for f in dfe_content aqa_spec edexcel_spec edexcel_content_guidance ocr_spec; do
  [ -s "$f.txt" ] || pdftotext -layout "$f.pdf" "$f.txt"
done
echo "done: $(pwd)"
ls -1 *.pdf *.txt
