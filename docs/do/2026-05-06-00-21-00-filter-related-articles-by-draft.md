# Task Overview: Filter Related Articles by Draft Status

The user requested to filter related articles on the blog post detail page to only show those where `draft = false`.

## Changes Made

- **Modified**: `app/pages/blog/[slug].vue`
  - Added `.where('draft', '=', false)` to the `relatedPosts` query in `useAsyncData`.

## Technical Decisions

- Used the existing `queryCollection` API provided by `@nuxt/content`.
- Added the filter directly to the server-side query to ensure consistency and performance.

## Verification

- Verified the code change in `app/pages/blog/[slug].vue`.
- Confirmed the `draft` field exists in `content.config.ts`.
