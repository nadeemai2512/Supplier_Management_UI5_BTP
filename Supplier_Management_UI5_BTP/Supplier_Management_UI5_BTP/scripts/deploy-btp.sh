#!/usr/bin/env bash
set -euo pipefail
npm install
npm install --global mbt
npx cds build --production
mbt build -t mta_archives
cf deploy mta_archives/supplier-management_1.0.0.mtar
