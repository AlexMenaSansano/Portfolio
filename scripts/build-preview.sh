#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."
export ASTRO_TELEMETRY_DISABLED=1
export PORTFOLIO_BASE_PATH=/Portfolio/
export PUBLIC_PORTFOLIO_PREVIEW=true

./node_modules/.bin/astro build --outDir .preview-dist
touch .preview-dist/.nojekyll
printf 'User-agent: *\nDisallow: /\n' > .preview-dist/robots.txt
