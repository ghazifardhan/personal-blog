# Task Overview: Add Giscus Comment Section

The user requested to add a comment section to their blog. Giscus was selected and implemented using the provided GitHub repository details.

## Changes Made:
- **Created** `app/components/BlogComments.vue`: A reusable component that wraps `@giscus/vue`.
- **Modified** `app/pages/blog/[slug].vue`: Integrated the `<BlogComments />` component at the bottom of the article section.

## Technical Decisions:
- **Theme Reactivity**: Used `useColorMode()` and a computed property to ensure the Giscus theme (light/dark) always matches the user's site theme.
- **Lazy Loading**: Set `loading="lazy"` on Giscus to improve page performance.
- **Component Separation**: Kept Giscus logic in its own component for better maintainability.

## Verification:
- Checked file contents to ensure IDs and repository information match the user's provided script.
- Verified placement in the blog post layout.
