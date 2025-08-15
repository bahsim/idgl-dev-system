# The Architect's Advanced Plays: A Catalog of IDGL Patterns

The core IDGL workflows provide the fundamental engine for generation and modification. **Patterns** are the next level. They are the Architect's advanced plays—a catalog of powerful, reusable strategies for taming complexity and scaling the IDGL process to large, real-world projects.

While the core workflows are universal, these plays are optional. The Architect selects the right play for the right situation, using them to orchestrate hundreds of generative tasks with precision and control.

---

## The Core Principle: Patterns are Blueprints for Automation

Crucially, these plays are not intended to be burdensome manual processes. They are the **architectural blueprints for an automated IDGL toolchain.**

Their true value is in serving as the `Spec` for the smart tooling that enables scale, governance, and predictability. They define the high-level behaviors that automation will handle, freeing the Architect to focus on strategy.

### Why Are Patterns Included in the AI's Configuration?

This is a critical distinction: **Protocols define the AI's behavior, while Patterns define the Architect's strategy.**

The patterns are included in the AI's boot configuration not for the AI to *execute* them, but for **contextual awareness**. By making the AI aware of the strategic playbook the Architect is using, it transforms from a simple tool into a more effective partner. When the Architect signals they are using a specific pattern (e.g., "Let's start the Legacy Onboarding play"), the AI understands the larger context and can provide more intelligent and anticipatory support throughout the multi-step workflow.

---

## The Plays

### I. Workflow Plays
*(For applying the IDGL lifecycle to common engineering scenarios)*

*   **[Spec Compilation](./01-patterns/01-Pattern-Spec-Compilation.md):** The primary workflow. A two-tiered system where a human-authored `Brief` is "compiled" into a formal `Spec` by an AI agent.
*   **[Decomposition](./01-patterns/03-Pattern-Decomposition.md):** A play for using an AI as a planning partner to break down a large, complex `Intent` into a series of smaller, validated sub-tasks.
*   **[Legacy Onboarding](./01-patterns/04-Pattern-Legacy-Onboarding.md):** A specific play for bringing existing, non-IDGL code under the management of the IDGL system by reverse-engineering a `Spec` from the code.
*   **[Managed Refactoring](./01-patterns/05-Pattern-Managed-Refactoring.md):** A workflow for performing large-scale refactoring against a formal `Spec` that defines the desired end-state.
*   **[Rapid Prototyping](./01-patterns/10-Pattern-Rapid-Prototyping.md):** A lightweight application of IDGL for generating multiple, partial solutions to accelerate client feedback and ensure alignment.

### II. Compositional Plays
*(For building complex `Specs` from smaller, reusable parts)*

*   **[Composable Prompts](./01-patterns/02-Pattern-Composable-Prompts.md):** A technical pattern for managing meta-prompts. It uses a pre-processor to resolve `@import` directives, allowing prompts to be composed from reusable partials.
*   **[Spec Library](./01-patterns/13-Pattern-Spec-Library.md):** The enterprise-level play for establishing a "Don't Repeat Yourself" (DRY) principle for `Specs`. It involves creating a canonical, version-controlled library of `Specs` for an organization's core components.

### III. Organizational Plays
*(For structuring the work, the artifacts, and the team)*

*   **[Directory Structure](./07-Pattern-Directory-Structure.md):** The recommended file system layout for organizing `Specs`, `Artifacts`, and their related documentation.
*   **[Task Orchestration](./09-Pattern-Task-Orchestration.md):** A formal play for defining and managing dependencies between multiple generative tasks.
*   **[Strategic Adoption](./11-Pattern-Strategic-Adoption.md):** A pragmatic, phased strategy for introducing and scaling the IDGL methodology within an organization.

### IV. Auditing & Governance Plays
*(For tracking and managing the outputs of the IDGL process)*

*   **[Generation Record](./01-patterns/06-Pattern-Generation-Record.md):** A formal play for creating an auditable record for each significant generative task, ensuring a complete history of the project's evolution.
