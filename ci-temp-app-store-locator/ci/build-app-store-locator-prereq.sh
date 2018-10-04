#!/bin/bash
set -e
cp -r app-store-locator ci-temp-app-store-locator
mkdir ci-temp-app-store-locator/@vodafone
cp -r core-app ci-temp-app-store-locator/@vodafone/core-app
cp -r core-redux ci-temp-app-store-locator/@vodafone/core-redux
cd ci-temp-app-store-locator
yarn reset
yarn remove crna-make-symlinks-for-yarn-workspaces
yarn remove metro-bundler-config-yarn-workspaces
