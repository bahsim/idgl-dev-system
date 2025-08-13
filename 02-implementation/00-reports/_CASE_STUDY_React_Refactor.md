# Case Study: The React Refactor Project

## 1. Objective
To provide a concrete, real-world example of an Architect using the IDGL to perform a common development task: refactoring a React component to extract embedded logic into a standalone, testable utility function.

## 2. Architect's Plays Demonstrated
This project is a practical demonstration of three critical plays from the Architect's playbook:

*   **[The Spec Compilation Play](../../01-patterns/01-Pattern-Spec-Compilation.md):** The core play for delegating the detailed work of `Spec` authoring to an AI.
*   **[The Composable Prompts Play](../../01-patterns/02-Pattern-Composable-Prompts.md):** The technical play for managing AI instructions in a scalable, DRY (Don't Repeat Yourself) manner.
*   **[The Managed Refactoring Play](../../01-patterns/05-Pattern-Managed-Refactoring.md):** The strategic play for executing a "Shallow Refactoring" with discipline and control.

## 3. The Process
The Architect followed a clear, strategic workflow:

1.  **Directive:** The Architect authored a short, high-level `Brief` describing the refactoring goal.
2.  **Compilation:** A "Spec Compiler" AI agent, guided by a composable prompt template, processed the `Brief` and the source code.
3.  **Contract:** The AI's output was a formal, detailed `Spec` that included a non-negotiable requirement for a comprehensive suite of unit tests ("Tests by Default").
4.  **Execution:** A second AI agent executed this formal `Spec` to produce the final, validated code, including the new utility function, the refactored component, and the passing unit tests.

## 4. Outcome
The project was a complete success. It proved that by using a sophisticated, pattern-based approach, an Architect can transform a simple `Brief` into a high-quality, professionally engineered, and fully tested software artifact with minimal human effort. The final system is a testament to the power of the IDGL, resulting in a workflow that is simultaneously efficient for the Architect, clear for the AI, and robust by design.
