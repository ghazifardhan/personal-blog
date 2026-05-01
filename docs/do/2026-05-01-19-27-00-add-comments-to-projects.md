# Task Overview: Add Comments to Project Pages

The user requested to add the Giscus comment section to the project details page (`app/pages/projects/[slug].vue`).

## Changes Made:
- **Modified** `app/pages/projects/[slug].vue`:
    - Integrated the `<BlogComments />` component at the bottom of the project page container.

## Technical Decisions:
- **Consistency**: Reused the `BlogComments` component to maintain a unified commenting experience across both blog posts and projects.
- **Layout**: Placed the comments section below the main project content and sidebar grid for optimal readability.

## Verification:
- Verified that the component is correctly imported (automatically by Nuxt) and rendered on the project slug page.
