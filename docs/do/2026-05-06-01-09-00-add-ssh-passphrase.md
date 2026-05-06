# Task Overview: Add SSH Passphrase Support

Added support for SSH key passphrases to the deployment workflow to resolve authentication errors.

## Changes Made

- **Modified**: `.github/workflows/deploy.yml`
  - Added `passphrase: ${{ secrets.SSH_PASSPHRASE }}` to the `appleboy/ssh-action` configuration.

## Technical Decisions

- **Security**: Used a GitHub Secret for the passphrase to ensure it is not exposed in the workflow logs or source code.
- **Flexibility**: Allowing a passphrase-protected key provides more options for users who prefer higher security for their CI/CD keys, though passphrase-less keys are generally more common in automated environments.

## Verification

- The user needs to add `SSH_PASSPHRASE` to their GitHub Repository Secrets if their private key is encrypted.
