# Task Overview: Create QRCode Generator Tool

Implemented the eighth interactive tool: a highly customizable, real-time QRCode generator.

## Changes Made

- **Installed** `qrcode`: Integrated the industry-standard library for generating QR codes in the browser.
- **Created** [qr-generator.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/qr-generator.vue):
    - **Real-Time Generation**: Updates the QR code instantly as the user types or changes settings.
    - **Deep Customization**:
        - **Dimension Control**: Adjustable size from 128px up to 1024px.
        - **Quiet Zone**: Configurable margin around the QR code.
        - **Color Picking**: Full control over foreground and background colors.
    - **Theme Presets**: Includes one-click presets for classic, ocean, royal, emerald, and night themes.
    - **High-Quality Export**: Enabled downloading the generated QR code as a high-resolution PNG file.
- **Modified** [tools/index.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/index.vue): Integrated the QRCode Generator into the new "Utility" category.

## Technical Decisions

- **Canvas-Based Rendering**: Used the `toCanvas` method from the `qrcode` library to provide a high-performance, reactive preview that scales smoothly.
- **Error Correction**: Set the default error correction level to 'H' (High), ensuring the QR code remains scannable even if part of it is damaged or obscured.
- **Debounced Updates**: While the generation is fast, the reactive structure ensures the UI remains fluid during rapid input.

## Verification

- Verified that the QR code updates correctly in response to text input and setting changes.
- Confirmed that the "Download PNG" action generates a valid, high-resolution image.
- Tested all theme presets to ensure colors are applied correctly.
