# Task Overview: Fix SQL Formatter API Compatibility

Resolved a TypeScript error in `sql-beautifier.vue` where the `uppercase` property was used instead of the correct `keywordCase` property required by the latest version of `sql-formatter`.

## Changes Made

- **Modified** [sql-beautifier.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/sql-beautifier.vue):
    - Replaced `uppercase: true` with `keywordCase: 'upper'` in the `format` function options.

## Technical Decisions

- **API Alignment**: The `sql-formatter` library updated its options schema in recent versions. Aligning with the current type definitions (`keywordCase: 'upper'`) ensures the tool remains functional and passes TypeScript validation.

## Verification

- The TypeScript error "Object literal may only specify known properties" is now resolved.
- Verified that the "Beautify SQL" feature still correctly uppercases SQL keywords as intended.
