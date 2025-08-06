# The Composable Prompts Pattern

## 1. Context

As the instructions for AI agents ("meta-prompts") become more sophisticated, hardcoding them within automation scripts becomes inflexible and violates the Don't Repeat Yourself (DRY) principle. If multiple scripts need to share a common set of instructions (like a system preamble), this shared text would have to be duplicated, creating a maintenance burden.

## 2. Pattern

The **Composable Prompts** pattern addresses this by applying software engineering principles to prompt management. It establishes a system where prompt templates are external, declarative files that can import and compose reusable components.

This architecture requires two key components:

1.  **A Pre-processor Tool:** A script or build tool that is designed to understand a custom include directive (e.g., `@import "path/to/partial.md"`). Its primary job is to read a main template file, find all such directives, and recursively replace them with the content of the specified "partial" files. This process produces a single, fully "compiled" prompt string.

2.  **A Composable File Structure:** A dedicated directory for templates (e.g., `prompt-templates/`) that contains:
    *   **Main Templates:** These files define the high-level structure for a specific type of prompt (e.g., a `spec-compiler-prompt.md`). They are declarative and contain the include directives to compose the final prompt.
    *   **Partials (`_partials/`):** These files contain the reusable snippets of text (e.g., a `system-preamble.md`). They are the single source of truth for any instructional text that needs to be shared across multiple main templates.

## 3. Benefits

*   **Maintainability:** Shared instructions are defined in only one place. Updating a core definition requires editing only a single `_partial` file.
*   **Scalability:** New prompt templates can be easily and rapidly created by composing existing partials.
*   **Separation of Concerns:** The "engine" (the pre-processor tool) is cleanly separated from the "configuration" (the Markdown prompt templates), allowing prompt engineers to modify the AI's instructions without altering any code.

## 4. Implementation Example

This pattern is implemented in the `idgl-dev-system/02-implementation/scripts/` directory. The `idgl-template-engine.ps1` script serves as the pre-processor for the `@import` directive. The `prompt-templates/` directory contains the main `spec-compiler.md` template and its imported `_partials/preamble-spec-definition.md`.
