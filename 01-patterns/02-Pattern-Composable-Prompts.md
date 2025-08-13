# The Composable Prompts Play

## 1. The Play
As an Architect's instructions to their AI agents ("meta-prompts") become more sophisticated, hardcoding them within automation scripts becomes inflexible and violates the Don't Repeat Yourself (DRY) principle.

The **Composable Prompts** play solves this by applying software engineering principles to prompt management. It establishes a system where prompt templates are external, declarative files that can import and compose reusable components, just like source code.

## 2. How to Run the Play
This play requires two key components:

1.  **A Pre-processor Tool:** A script or build tool that understands a custom include directive (e.g., `@import "path/to/partial.md"`). Its job is to read a main template file, find all such directives, and recursively replace them with the content of the specified "partial" files. This process produces a single, fully "compiled" prompt string.

2.  **A Composable File Structure:** A dedicated directory for templates (e.g., `prompt-templates/`) that contains:
    *   **Main Templates:** Files that define the high-level structure for a specific prompt (e.g., a `spec-compiler-prompt.md`). They contain `@import` directives to compose the final prompt.
    *   **Partials (`_partials/`):** Files containing the reusable snippets of text (e.g., a `system-preamble.md`). They are the single source of truth for any instructional text shared across multiple main templates.

## 3. The Benefits
*   **Maintainability:** Shared instructions are defined in only one place.
*   **Scalability:** New prompt templates can be rapidly created by composing existing partials.
*   **Separation of Concerns:** The "engine" (the pre-processor) is cleanly separated from the "configuration" (the prompt templates), allowing the Architect to modify the AI's instructions without altering any code.

## 4. Example in Action
This play is implemented in the `idgl-dev-system/02-implementation/scripts/` directory. The `idgl-template-engine.ps1` script serves as the pre-processor for the `@import` directive. The `prompt-templates/` directory contains the main `spec-compiler.md` template and its imported `_partials/preamble-spec-definition.md`.
