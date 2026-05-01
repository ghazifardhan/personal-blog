# Task Overview: Create SQL Online Beautifier Tool

Implemented the fifth interactive tool: a multi-dialect SQL formatter and beautifier.

## Changes Made

- **Installed** `sql-formatter`: Integrated the industry-standard SQL formatting library to handle complex query parsing and restructuring.
- **Created** [sql-beautifier.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/sql-beautifier.vue):
    - **Dual-Pane Layout**: Side-by-side design for raw SQL input and beautified output.
    - **Dialect Support**: Supports multiple SQL flavors including Standard SQL, MySQL, PostgreSQL, SQLite, MariaDB, and Oracle PL/SQL.
    - **Advanced Formatting**: Configured the formatter to use tabular indentation and uppercase keywords for maximum readability.
    - **Quick Templates**: Includes sample queries for complex joins, CTEs, and subqueries to demonstrate the tool's capabilities.
    - **Export Features**: Added "Copy" and "Download as .sql" functionality.
- **Modified** [tools/index.vue](file:///Users/ghazifadil/Documents/Programming/Projects/linkar/personal-blog/app/pages/tools/index.vue): Integrated the SQL Online Beautifier into the "Development" category of the tools hub.

## Technical Decisions

- **Tabular Indentation**: Defaulted to `tabularLeft` indentation, which is a professional formatting style that aligns keywords and clauses for easier visual scanning.
- **Client-Side Formatting**: Ensured all formatting logic runs locally in the browser using the `sql-formatter` library, maintaining the privacy and performance standards of the tools section.
- **Dialect Reactivity**: The tool dynamically adjusts its formatting rules based on the selected SQL dialect.

## Verification

- Verified that the formatter correctly handles various SQL dialects and keywords.
- Confirmed that the "Beautify SQL" action updates the output pane instantly.
- Tested the template loading and file download features.
