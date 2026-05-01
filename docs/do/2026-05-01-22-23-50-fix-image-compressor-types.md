# Task Overview: Fix TypeScript Type Mismatch in Image Compressor

Resolved a TypeScript error in `image-compressor.vue` where image URLs were being assigned `null`, which is incompatible with the expected `string | undefined` type for the `src` attribute of `<img>` tags.

## Changes Made

- **Modified** [image-compressor.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/image-compressor.vue):
    - Changed the type definition of `originalUrl` and `compressedUrl` from `string | null` to `string | undefined`.
    - Updated the `reset` and `processFile` functions to set these values to `undefined` instead of `null`.

## Technical Decisions

- **TypeScript Compatibility**: In many Vue/Nuxt environments, DOM attributes like `src` are typed to accept `undefined` (which removes the attribute) rather than `null`. Switching to `undefined` satisfies the compiler while maintaining the same logical behavior in the UI.

## Verification

- The TypeScript error "Type 'null' is not assignable to type 'string | undefined'" is now resolved.
- Verified that the image preview and reset functionality continue to work correctly.
