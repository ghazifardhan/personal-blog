# Task Overview: Align App Icon Generator Export with IconKitchen Structure

Updated the App Icon Generator's export logic to match the professional folder structure and naming conventions used by `icon.kitchen`.

## Changes Made

- **Modified** [app-icon-generator.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/app-icon-generator.vue):
    - **Advanced Android Export**:
        - Created the `android/res` folder hierarchy with `mipmap-mdpi`, `hdpi`, `xhdpi`, `xxhdpi`, and `xxxhdpi` folders.
        - Implemented **Layered Export**: Each mipmap folder now contains the composite icon (`ic_launcher.png`), a standalone foreground (`ic_launcher_foreground.png`), and a standalone background (`ic_launcher_background.png`). This is required for modern Android Adaptive Icons.
        - Included the Play Store high-res icon (`play_store_512.png`).
    - **Professional iOS Export**:
        - Generated a full suite of icons (20pt, 29pt, 40pt, 60pt, 76pt, 83.5pt) with correct naming conventions (e.g., `@2x`, `@3x`).
        - Created the mandatory `Contents.json` file for Xcode integration.
        - Added the marketing icon (`AppIcon~ios-marketing.png`).
    - **Web & PWA Assets**:
        - Organized standard web icons (`icon-192.png`, `icon-512.png`).
        - Added Apple Touch Icon and high-res favicons.
    - **Archive Branding**: Renamed the output file to `IconKitchen-Output.zip` for consistency.

## Technical Decisions

- **Dynamic Layer Rendering**: The export process now performs multiple rendering passes for each size (composite, foreground only, background only) to satisfy Android's adaptive icon requirements.
- **Coordinate Transformation**: Added logic to scale the foreground XY offsets proportionally for each icon size, ensuring the icon stays centered exactly as seen in the preview.

## Verification

- Verified the ZIP structure matches the user's provided screenshots exactly.
- Confirmed that the `Contents.json` file is valid and contains the correct image mappings.
- Tested the download and verified that all sub-folders and files are present and correctly named.
