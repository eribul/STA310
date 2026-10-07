#!/usr/bin/env bash
# Render the questions and solutions PDFs from the single CS2.qmd source.
# Usage: ./render.sh
set -euo pipefail

cd "$(dirname "$0")"

# Solutions first: its intermediate PDF is renamed to -solutions.pdf, so it
# cannot clobber the questions PDF produced afterwards.
quarto render CS2.qmd --to typst --profile solutions -M solutions:true -o CS2-solutions.pdf
quarto render CS2.qmd --to typst

echo "Wrote CS2.pdf (questions) and CS2-solutions.pdf (solutions)"
