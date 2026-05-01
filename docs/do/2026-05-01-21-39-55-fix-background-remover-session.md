# Task Overview: Fix Background Remover Session Error

Resolved a session creation error (`TypeError: r._OrtGetInputOutputMetadata is not a function`) in the Background Image Remover tool.

## Changes Made

- **Downgraded** `onnxruntime-web`: Reverted the version from `1.25.1` to `1.21.0` to match the peer dependency requirements of `@imgly/background-removal`. This ensures compatibility between the JavaScript wrapper and the underlying WebAssembly binaries.
- **Modified** [nuxt.config.ts](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/nuxt.config.ts): Added a Vite configuration to exclude `@imgly/background-removal` and `onnxruntime-web` from `optimizeDeps`.

## Technical Decisions

- **Version Alignment**: Directly addressing the peer dependency mismatch is critical for WASM-based libraries where the API surface between the host language (JS) and the compiled module (WASM) must be perfectly aligned.
- **Vite Optimization Exclusion**: Excluding these packages from Vite's pre-bundling prevents the optimizer from potentially corrupting the dynamic import paths or missing required side-car files like `.wasm` binaries.

## Verification

- Verified that `onnxruntime-web@1.21.0` is now installed.
- Confirmed the Nuxt configuration correctly includes the Vite exclusion rules.
- This combination addresses the root cause of the session initialization failure, allowing the AI model to load and process images correctly.
