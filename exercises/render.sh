#!/usr/bin/env bash
# Render questions + solutions PDFs from each chapter's single .qmd source.
# Usage:
#   ./render.sh chapter-NN    render one chapter
#   ./render.sh               render all chapters
set -euo pipefail

cd "$(dirname "$0")"

render_one() {
  local ch="$1"
  (
    cd "$ch"
    # Solutions first: its intermediate PDF is renamed to -solutions.pdf, so it
    # cannot clobber the questions PDF produced afterwards.
    quarto render "$ch.qmd" --to typst --profile solutions -M solutions:true -o "$ch-solutions.pdf"
    quarto render "$ch.qmd" --to typst
  )
  echo "Wrote $ch.pdf (questions) and $ch-solutions.pdf (solutions)"
}

if [[ $# -gt 0 && "$1" != "all" ]]; then
  render_one "$1"
else
  shopt -s nullglob
  for d in chapter-*/; do
    ch="${d%/}"
    [[ -f "$ch/$ch.qmd" ]] && render_one "$ch"
  done
fi
