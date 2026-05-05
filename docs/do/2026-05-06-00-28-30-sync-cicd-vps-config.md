# Task Overview: Sync CI/CD with Real VPS Config

Updated the local `personal-blog.service` and the GitHub Actions workflow to match the actual configuration running on the user's VPS.

## Changes Made

- **Modified**: `personal-blog.service`
  - Updated `User`/`Group` to `ubuntu`.
  - Updated `WorkingDirectory` to `/var/www/html/personal-blog`.
  - Updated `ExecStart` to the specific NVM Node path: `/home/ubuntu/.nvm/versions/node/v22.22.2/bin/node`.
  - Added `NITRO_HOST=127.0.0.1`.
- **Modified**: `.github/workflows/deploy.yml`
  - Updated the default `cd` path in the SSH script to `/var/www/html/personal-blog`.

## Technical Decisions

- **Consistency**: Keeping the local service file in sync with the server ensures that any future changes to the unit file can be safely tracked and deployed if needed.
- **Path Accuracy**: Using the absolute path for Node via NVM ensures that the service starts correctly regardless of the shell's environment.

## Verification

- Verified the paths and user/group settings against the information provided by the user.
