# Task Overview: Update Build Command in CI/CD

Updated the build command in the GitHub Actions workflow to use `build:prod` instead of `build`.

## Changes Made

- **Modified**: `.github/workflows/deploy.yml`
  - Changed the build step on the GitHub Runner to use `pnpm run build:prod`.

## Technical Decisions

- **Consistency**: The user previously updated the remote build command on the VPS; this change ensures the local build check in the CI pipeline also uses the same production-optimized build script.
