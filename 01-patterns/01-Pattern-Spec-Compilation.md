# The Spec Compilation Play

## 1. The Play
The Architect's most valuable asset is their strategic focus. Manually authoring a complete, formal `Spec` for every routine task can be a misuse of that focus. The **Spec Compilation** play is the Architect's solution to this problem.

This play delegates the labor-intensive work of writing the formal `Spec` to an AI agent. This keeps the Architect in a purely strategic role, focused on defining the high-level intent, not the granular details.

## 2. How to Run the Play
The workflow involves two key artifacts and a specialized AI agent:

1.  **The `Brief` (The Architect's Directive):** The Architect authors a short, high-level, and often informal document in natural language. The `Brief` describes the goal of the task without detailing the precise verification criteria.

2.  **The "Spec Compiler" (The AI Agent):** A specialized AI agent is invoked. Its role is to receive the Architect's `Brief` and the full context of any relevant source code.

3.  **The `Spec` (The AI-Generated Contract):** The "Spec Compiler" AI processes the `Brief` and the code context, and its output is the complete, formal, and verifiable `Spec` document. This generated `Spec` is then used by another AI agent to perform the final code generation.

## 3. The Critical Rule: Tests by Default
A non-negotiable rule of this play is the principle of **"Tests by Default."** The Architect must instruct the "Spec Compiler" AI to generate a `Spec` that includes a comprehensive verification and testing plan.

A properly compiled `Spec` **MUST** contain a `Verification Criteria` section that is divided into at least two sub-sections:

*   **Implementation Criteria:** A granular checklist for the main code artifact(s).
*   **Testing Criteria:** A granular checklist for a corresponding test file, defining a comprehensive suite of unit tests.

This enforces a high standard of quality and ensures that every generated artifact has a corresponding, AI-generated plan for its own validation.

## 4. Example in Action
This play is implemented in the `01-react-refactor-with-tests` example project. The `assemble-spec-prompt.ps1` script is a tool that prepares the input for the "Spec Compiler" AI, and its master prompt template (`spec-compiler.md`) contains the embedded instructions that enforce the "Tests by Default" principle.
