# Task Overview: Resolve Background Remover Dependencies

Fixed a build error where `onnxruntime-web` (a dependency of `@imgly/background-removal`) could not be resolved by Vite.

## Changes Made

- **Installed** `onnxruntime-web`: Added as a direct dependency to ensure it is available for the `@imgly/background-removal` library.

## Technical Decisions

- **Direct Installation**: Explicitly adding the sub-dependency helps Vite's dependency optimizer find the required modules (`onnxruntime-web` and `onnxruntime-web/webgpu`) that the main library imports dynamically.

## Verification

- Verified the successful installation of `onnxruntime-web@1.25.1`.
- This should resolve the "Could not resolve onnxruntime-web" errors during the Nuxt development/build process.
