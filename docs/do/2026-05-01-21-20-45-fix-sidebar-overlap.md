# Task Overview: Fix Sidebar Overlap

Fixed a UI issue where the "Share Article" button was overlapping the "Table of Contents" on blog post pages when scrolling.

## Changes Made

- **Modified** [blog/[slug].vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/blog/[slug].vue):
    - Removed separate sticky positioning from TOC and Share sections.
    - Wrapped both sections in a single sticky container (`sticky top-24`).
    - Added spacing between sections using `space-y-12`.
    - Simplified the layout by using a common parent for all sidebar elements.

## Technical Decisions

- **Single Sticky Container**: By wrapping both sections in one sticky parent, they now move together as a single unit. This fundamentally prevents them from ever overlapping, regardless of the Table of Contents length.
- **Vertical Spacing**: Used `space-y-12` to ensure a clean separation between the TOC and the Share section, even when they are both visible.

## Verification

- Verified the layout structure in `blog/[slug].vue` to ensure the sticky behavior is applied to the entire sidebar content.
- Confirmed that the `top-[calc(24px+200px)]` hack was removed in favor of a more robust flexbox/spacing approach.
