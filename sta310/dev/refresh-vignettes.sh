#!/usr/bin/env bash

# Uppdaterar de färdigbyggda vignetterna i inst/doc/.
#
# inst/doc/ innehåller HTML-versionerna av vignetterna, incheckade i git. De gör
# att vignette(package = "sta310") och browseVignettes("sta310") fungerar även
# när paketet installeras utan att vignetterna byggs — vilket är standard för
# install_github() och alltså det studenterna möter. Själva källfilerna i
# vignettes/ är fortfarande den enda källan; R CMD build lägger kopior av dem i
# inst/doc/ när paketet byggs, så bara HTML-filerna behöver checkas in här.
#
# Användning:  dev/refresh-vignettes.sh
#
# Committa vignettes/ och inst/doc/ i samma commit, annars blir de incheckade
# HTML-filerna inaktuella. R-CMD-check-workflowet kontrollerar det.

set -euo pipefail

pkg="$(cd "$(dirname "$0")/.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

cd "$tmp"
R CMD build "$pkg" --no-manual >/dev/null
tar xzf sta310_*.tar.gz

mkdir -p "$pkg/inst/doc"
cp sta310/inst/doc/*.html "$pkg/inst/doc/"

echo "inst/doc uppdaterad:"
ls -lh "$pkg/inst/doc"
