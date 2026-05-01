# Task Overview: Add Click Animation to Share Buttons

The user requested an animation effect when the share buttons are clicked on blog and project pages.

## Changes Made:
- **Modified** `app/assets/css/main.css`:
    - Added a `@keyframes click-bounce` for a smooth scale-up and scale-down effect.
    - Added a utility class `.animate-click`.
- **Modified** `app/pages/blog/[slug].vue` & `app/pages/projects/[slug].vue`:
    - Added `animatingBtn` reactive state.
    - Implemented `handleShare` function to trigger the animation and then execute the share logic.
    - Added `:class` binding to apply the animation class temporarily on click.

## Technical Decisions:
- **Global CSS**: Defined the animation globally in `main.css` to keep the code DRY and reusable.
- **Micro-interactions**: Chose a 0.4s bounce with a `cubic-bezier` for a "premium" elastic feel.
- **State Cleanup**: Used `setTimeout` to reset the animation state after 400ms, allowing the animation to re-trigger on subsequent clicks.

## Verification:
- Verified that the animation triggers correctly on all three share buttons.
- Ensured the actual share logic (opening links, copying) still works as expected.
