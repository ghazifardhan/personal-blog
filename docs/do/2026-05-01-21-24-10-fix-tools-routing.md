# Task Overview: Fix Tools Routing

Resolved a routing conflict where the `/tools` page was overriding its children, preventing access to the Password Generator.

## Changes Made

- **Moved** `app/pages/tools.vue` to [app/pages/tools/index.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/index.vue).

## Technical Decisions

- **Nuxt Routing Consistency**: In Nuxt, if a file named `tools.vue` and a directory named `tools/` both exist, `tools.vue` is treated as a parent layout for the directory's contents. If it doesn't contain a `<NuxtPage />` component, the children won't render. By moving `tools.vue` to `tools/index.vue`, I've followed the established pattern used for the `blog` and `projects` sections, ensuring that `/tools` and `/tools/password-generator` are treated as independent routes.

## Verification

- Verified the directory structure now follows the `index.vue` pattern for all main sections (blog, projects, tools).
- This change restores the correct routing behavior in Nuxt, allowing both the tools list and individual tools to render correctly.
