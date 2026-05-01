# Task Overview: Add Typewriter Effect

The user requested a typewriter animation for the name "Ghazi Fadil" in the hero section of the index page.

## Changes Made:
- **Modified** `app/pages/index.vue`:
    - Added reactive `displayText` and `showCursor` variables.
    - Implemented a `typeText` function that types out the name with randomized timing for a natural feel.
    - Updated the template to render the dynamic text and a blinking cursor.

## Technical Decisions:
- **Recursive Timing**: Used `setTimeout` with a randomized delay to simulate human typing.
- **Auto-Cleanup**: The cursor disappears 2 seconds after the typing finishes to keep the final UI clean.
- **Theme Consistency**: The cursor color is set to `text-indigo-500` to match the name's gradient.

## Verification:
- Ensured the component is SSR-safe by using `onMounted`.
- Verified the logic for the animation sequence.
