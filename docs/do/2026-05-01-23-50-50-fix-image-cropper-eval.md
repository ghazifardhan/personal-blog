# Task Overview: Fix eval Error in Image Cropper

Resolved a TypeScript error in `image-cropper.vue` caused by using the global `eval` function within a Vue template to calculate aspect ratios.

## Changes Made

- **Modified** [image-cropper.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/image-cropper.vue):
    - **Removed `eval`**: Replaced the unsafe `eval(selectedRatio)` call in the template with a safe, reactive reference.
    - **Added Computed Property**: Implemented an `aspectRatio` computed property that explicitly checks each part of the ratio to satisfy strict TypeScript null checks and prevent division-by-zero errors.
    - **Updated Imports**: Added `computed` to the Vue imports.

## Technical Decisions

- **Safety and Performance**: Using `eval` is dangerous and slow. A computed property is the standard Vue way to handle derived state, providing better performance and full type safety.
- **Robust Parsing**: The new logic splits the ratio string and performs division, which is reliable and easy to maintain.

## Verification

- The TypeScript error "Property 'eval' does not exist" is now resolved.
- Verified that selecting different aspect ratios (1:1, 16:9, etc.) correctly updates the cropper's constraints.
