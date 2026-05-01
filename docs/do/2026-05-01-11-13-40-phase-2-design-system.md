# Task Overview
Implement Phase 2 (Design System) of the Personal Branding Website.

# Changes Made
- Created `app/assets/css/main.css` containing Tailwind CSS v4 setup and custom CSS variables mapping to the PRD's color palette and typography tokens.
- Updated `nuxt.config.ts` to include the `css: ['~/assets/css/main.css']` property.
- Scaffolded standard application components:
  - `app/layouts/default.vue` (Global Layout structure)
  - `app/components/AppHeader.vue` (Responsive navigation, sticky header with backdrop blur, color mode toggle)
  - `app/components/AppFooter.vue` (Copyright and social links)
- Adjusted `app/app.vue` to leverage `<NuxtLayout>` and `<NuxtPage>` for proper page routing.

# Technical Decisions
- Used `@theme` block in standard Tailwind v4 CSS file to inject design tokens.
- Integrated Nuxt UI v4 primitives (like `<UButton>`) combined with raw Tailwind classes for granular layout control.
- Leveraged `@nuxtjs/color-mode` for dark/light mode switching logic directly inside the Header.

# Verification
- The layout components structurally reflect the PRD, featuring the required responsive breakpoints and semantic HTML.
