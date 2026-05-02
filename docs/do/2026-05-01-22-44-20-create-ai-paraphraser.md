# Task Overview: Create AI Paraphraser Tool

Implemented the tenth interactive tool: a privacy-first, browser-based AI paraphraser using state-of-the-art transformer models.

## Changes Made

- **Installed** `@xenova/transformers`: Integrated the JavaScript port of the Transformers library, enabling high-performance AI inference directly in the browser using ONNX Runtime.
- **Created** [paraphraser.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/paraphraser.vue):
    - **Local AI Inference**: Features the T5-small model running entirely on the user's hardware.
    - **Progress Tracking**: Implemented a detailed loading state that shows the model download progress (~100MB) to ensure a transparent user experience.
    - **Interactive Editor**: Split-pane layout for raw input and rephrased output with real-time status updates.
    - **Offline Capability**: Once the model is cached in the browser's IndexedDB, the tool works completely offline.
    - **Privacy Guarantee**: Guaranteed that no text data is ever sent to a server, adhering to the site's strict "Client-Side Only" policy.
- **Modified** [tools/index.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/index.vue): Integrated the Paraphraser into the "Utility" category.

## Technical Decisions

- **T5-Small Model**: Selected the `Xenova/t5-small` model as it offers a great balance between paraphrasing quality and download size (~100MB), making it feasible for browser use.
- **Dynamic Imports**: Used dynamic imports for the Transformers library to prevent it from bloating the main application bundle.
- **Prompt Engineering**: Configured the model with a `paraphrase: ` prefix and specific sampling parameters (temperature 0.7, top-k 50) to produce natural and varied rephrasing results.

## Verification

- Verified that the model downloads and initializes correctly on the first run.
- Confirmed that the paraphrasing logic produces coherent and rephrased versions of the input text.
- Tested the tool's performance and confirmed that all processing happens locally on the client.
