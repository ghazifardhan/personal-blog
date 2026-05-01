# Task Overview: Fix Blank Live Preview

Resolved an issue where the HTML viewer's live preview appeared blank by switching from manual iframe document writing to the reactive `srcdoc` attribute.

## Changes Made

- **Modified** [html-viewer.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/html-viewer.vue):
    - Replaced the `updatePreview` function and `watch(htmlCode)` with a direct `:srcdoc="htmlCode"` binding on the preview iframe.
    - Removed the unused `previewFrame` ref.

## Technical Decisions

- **Reactive srcdoc**: Using `:srcdoc` is the most reliable way to handle iframe previews in a reactive framework like Vue/Nuxt. It eliminates timing issues where the code might be written before the iframe's internal document is ready, ensuring the preview is always in sync with the editor.
- **Simplified Logic**: Removing the manual DOM manipulation reduces the complexity of the component and avoids common pitfalls related to `iframe.contentDocument` availability.

## Verification

- The live preview now correctly displays the HTML content immediately upon page load and updates instantly as the user types.
- Confirmed that the templates correctly trigger the reactive update through the `srcdoc` binding.
