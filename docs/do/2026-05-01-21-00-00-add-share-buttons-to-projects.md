# Task Overview: Add Share Buttons to Projects

The user requested to add social sharing buttons (Twitter, LinkedIn, and Copy Link) to the project details page sidebar.

## Changes Made:
- **Modified** `app/pages/projects/[slug].vue`:
    - Added a "Share Project" section to the sidebar.
    - Implemented sharing logic using `useRequestURL` and `window.open`.
    - Added a "Copy Link" feature with a toast notification using `useToast`.

## Technical Decisions:
- **Contextual Sharing**: Used `useRequestURL` to ensure the correct link is shared regardless of the environment.
- **Feedback Loop**: Integrated `useToast` to provide immediate visual feedback when a link is copied.
- **Icon Usage**: Used `simple-icons` for brand icons (X, LinkedIn) and `heroicons` for the link icon.

## Verification:
- Checked that the logic correctly encodes the project title and URL for sharing.
- Ensured the component structure follows the existing sidebar layout.
