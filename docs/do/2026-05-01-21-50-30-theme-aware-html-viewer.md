# Task Overview: Theme-Aware HTML Viewer Container

Updated the HTML Online Viewer's preview container to dynamically adapt to light and dark modes, ensuring visual consistency with the rest of the site's theme.

## Changes Made

- **Modified** [html-viewer.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/html-viewer.vue):
    - Replaced hardcoded `bg-white` and `bg-gray-50` classes with theme-aware CSS variables like `var(--color-surface)` and `var(--color-bg)`.
    - Updated the header text color to `var(--color-text-primary)` for perfect readability in both modes.
    - Unified the styling of both the editor and preview panes to create a balanced, symmetrical UI.

## Technical Decisions

- **Selective Theming**: While the *container* and *header* of the preview pane now adapt to dark mode, the actual `iframe` content area remains white by default. This is a deliberate choice to ensure that standard HTML (which defaults to black text on a white background) is rendered as intended by the user, avoiding "accidental" dark mode styles that could obscure their code.
- **Consistent Surfaces**: Used `var(--color-bg)/50` for the header backgrounds to create a subtle depth effect that works perfectly across all theme preferences.

## Verification

- Verified that the preview pane's header and borders correctly transition between light and dark modes.
- Confirmed that the "Live Preview" label and icons remain clearly visible in both states.
