# Task Overview: Loop Typewriter Effect

The user requested that the typewriter effect for the hero title should run in a continuous loop.

## Changes Made:
- **Modified** `app/pages/index.vue`:
    - Updated `typeText` to handle both typing and backspacing logic.
    - Added state to track whether the animation is currently deleting text.
    - Added pauses after typing completion (2s) and after deletion (1s) to make the loop feel natural.

## Technical Decisions:
- **State Management**: Used `isDeleting` boolean to toggle direction.
- **Timing**: Deletion speed is significantly faster (50ms) than typing speed (150ms) to maintain user interest.
- **Recursion**: Kept the recursive `setTimeout` approach for simple and reliable looping.

## Verification:
- Verified the loop logic: types "Ghazi Fadil", waits, deletes, waits, and restarts.
