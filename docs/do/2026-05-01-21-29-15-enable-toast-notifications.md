# Task Overview: Enable Toast Notifications

Enabled global toast notifications for the blog and specifically for the Password Generator's "Copy" action.

## Changes Made

- **Modified** [app.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/app.vue): Added the `<UNotifications />` component to the root template. This is a required component in Nuxt UI to render any toast notifications triggered via `useToast()`.
- **Verified** [password-generator.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/password-generator.vue): Confirmed the `copyPassword` function was already correctly using `toast.add()` and will now work as intended since the notification provider is active.

## Technical Decisions

- **Global Notification Provider**: Placed `<UNotifications />` in `app.vue` to ensure that toasts can be triggered from any page or component throughout the application.
- **Icon Consistency**: Used `i-lucide-check-circle` for a clean, consistent success indicator that matches the site's design.

## Verification

- Verified that `<UNotifications />` is correctly placed outside the layout to remain persistent across route changes.
- Since the logic in `password-generator.vue` was already in place, it will now correctly display the "Copied!" toast whenever a user clicks the copy button.
