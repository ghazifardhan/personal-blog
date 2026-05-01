# Task Overview: Add Share Buttons to Blog Posts

The user requested to add social sharing buttons (Twitter, LinkedIn, and Copy Link) to the blog details page sidebar.

## Changes Made:
- **Modified** `app/pages/blog/[slug].vue`:
    - Added a "Share Article" section to the sidebar, below the Table of Contents.
    - Implemented sharing logic using `useRequestURL`, `window.open`, and `useToast`.

## Technical Decisions:
- **Layout Alignment**: Placed the share section in the sidebar for consistency with the projects page and to keep the main article content clean.
- **Sticky Positioning**: Offset the sticky share section so it doesn't overlap with the Table of Contents on long pages.
- **Visual Feedback**: Used `useToast` to notify the user when a link is copied.

## Verification:
- Verified that the buttons are correctly positioned in the sidebar.
- Checked that sharing URLs are correctly encoded.
