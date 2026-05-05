# Task Overview: Update CI/CD for systemd Deployment

Updated the CI/CD pipeline to support deployment via `systemd` on the VPS.

## Changes Made

- **Modified**: `.github/workflows/deploy.yml` - Updated the SSH script to run `pnpm install`, `pnpm run build`, and `sudo systemctl restart personal-blog`.
- **New**: `personal-blog.service` - Created a systemd unit file template for the application.

## Technical Decisions

- **Systemd Integration**: Shifted from Docker/PM2 to a native systemd service for process management.
- **Remote Build**: The current workflow builds the project directly on the VPS via SSH to ensure all environment-specific binary dependencies are correctly resolved.
- **Sudo**: Added `sudo` to the `systemctl` command assuming the SSH user has permissions to restart the service.

## Verification

- Verified the systemd service file structure.
- The user needs to:
  1. Copy `personal-blog.service` to `/etc/systemd/system/` on the VPS.
  2. Run `sudo systemctl daemon-reload`.
  3. Run `sudo systemctl enable personal-blog`.
  4. Ensure the SSH user has sudo access for `systemctl restart personal-blog`.
