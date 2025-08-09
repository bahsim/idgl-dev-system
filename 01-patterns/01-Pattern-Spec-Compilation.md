# The Spec Compilation Pattern

## 1. Context

For many routine development tasks, the process of manually authoring a complete, formal `Spec` can be overly verbose and time-consuming, creating a human bottleneck. However, the rigor and clarity of a formal `Spec` are essential for reliable AI-driven code generation.

## 2. Pattern

To resolve this tension, the **Spec Compilation** pattern introduces a two-tiered workflow that separates the strategic `Intent` from the detailed `Spec`. This pattern delegates the labor-intensive work of authoring the formal `Spec` to an AI agent, keeping the human practitioner in a purely strategic role.

The workflow is as follows:

1.  **The `Brief` (Human Authored):** The IDGL Practitioner authors a short, high-level, and often informal document in natural language. The `Brief` describes the goal of the task without detailing the precise verification criteria.

2.  **The "Spec Compiler" (AI Agent):** A specialized AI agent is invoked. Its role is to receive the human's `Brief` and the full context of any relevant source code.

3.  **The `Spec` (AI Generated):** The "Spec Compiler" AI processes the `Brief` and the code context, and its output is the complete, formal, and verifiable `Spec` document. This generated `Spec` is then used by the "Worker AI" to perform the final code generation.

### 2.1. Core Requirement: "Tests by Default"

A critical requirement of the Spec Compilation pattern is the principle of **"Tests by Default."** The "Spec Compiler" AI must be explicitly instructed to generate a `Spec` that includes a comprehensive verification and testing plan.

A properly compiled `Spec` **MUST** contain a `Verification Criteria` section that is divided into at least two sub-sections:
*   **Implementation Criteria:** A granular checklist for the main code artifact(s).
*   **Testing Criteria:** A granular checklist for a corresponding test file, defining a comprehensive suite of unit tests.

This enforces a high standard of quality and ensures that every generated artifact has a corresponding, AI-generated plan for its own validation.

## 3. Implementation Example

This pattern is implemented in the `01-react-refactor-with-tests` example project. The `assemble-spec-prompt.ps1` script is a tool that prepares the input for the "Spec Compiler" AI, and its master prompt template (`spec-compiler.md`) contains the embedded instructions that enforce the "Tests by Default" principle.
