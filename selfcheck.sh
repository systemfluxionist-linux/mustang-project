#!/usr/bin/env bash
# Self-check script: runs npm install && npm run build in the app directory

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${SCRIPT_DIR}/../app"

if [[ ! -f "${APP_DIR}/package.json" ]]; then
    echo "ERROR: package.json not found at ${APP_DIR}/package.json"
    exit 1
fi

cd "${APP_DIR}"

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Self-check passed!"