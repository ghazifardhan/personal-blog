# Task Overview: Create HTML Online Viewer Tool

Implemented the third interactive tool: a real-time HTML, CSS, and JavaScript editor and previewer.

## Changes Made

- **Created** [html-viewer.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/html-viewer.vue):
    - **Split-Screen Editor**: Features a side-by-side layout with a source code editor on the left and a live preview iframe on the right.
    - **Real-Time Updates**: The preview updates instantly as the user types, providing immediate feedback.
    - **Interactive Templates**: Includes three high-quality "Quick Start" templates (Basic Landing, Interactive Button, Modern Form) to help users get started instantly.
    - **Utility Features**: Added "Clear", "Copy", "Download", and "Popout" (open in new tab) functionality for a complete development experience.
    - **Responsive Design**: Optimized for desktop with a large, comfortable workspace.
- **Modified** [tools/index.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/index.vue): Integrated the HTML Online Viewer into the main tools hub under the "Development" category.

## Technical Decisions

- **Iframe Sandboxing**: Used an iframe with `sandbox="allow-scripts"` for the live preview. This allows JavaScript to run within the preview while keeping the main application secure.
- **Dynamic Blob URLs**: Used `Blob` and `URL.createObjectURL` for the "Popout" and "Download" features, allowing users to interact with their code as real files without any server-side processing.
- **Pure Vue Reactivity**: Leveraged Vue's `watch` and `ref` for the live synchronization between the editor and the preview frame.

## Verification

- Verified the layout is functional and responsive on large screens.
- Confirmed that all templates load correctly and trigger the live preview update.
- Tested the download and copy features to ensure they produce the expected output.
