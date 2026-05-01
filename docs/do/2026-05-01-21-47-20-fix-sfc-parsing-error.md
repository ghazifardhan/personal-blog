# Task Overview: Fix SFC Template Parsing Error

Resolved an "Invalid end tag" error in `html-viewer.vue` caused by an embedded `</script>` tag within a JavaScript template literal.

## Changes Made

- **Modified** [html-viewer.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/html-viewer.vue):
    - Escaped the `</script>` tag within the "Interactive Button" template using `<\/script>`.

## Technical Decisions

- **SFC Compiler Limitation**: Vue Single File Component (SFC) compilers scan for `</script>` to determine the end of the script block. Even when contained within a string literal, the presence of this tag can confuse the parser.
- **Escaping Strategy**: Used the backslash escape (`<\/script>`) which is a standard JavaScript technique to include script closing tags in strings without triggering HTML parser terminations. This allows the string to remain a valid template for the iframe while satisfying the Vue compiler.

## Verification

- The "Invalid end tag" error is now resolved, and the component will compile and render correctly.
- Confirmed that the "Interactive Button" template still functions as expected within the live preview.
