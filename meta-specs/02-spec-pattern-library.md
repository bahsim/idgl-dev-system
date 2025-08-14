# Component Spec: The Pattern Library

## 1. Objective
To define the catalog of advanced, reusable strategies available to an Architect. This component answers the question, "What are the tactical plays an Architect can run to solve complex, real-world problems?"

## 2. Rationale
The core IDGL workflows are the fundamental engine, but they are not sufficient to manage the complexity of large-scale projects. The Pattern Library provides the next level of abstraction: a set of powerful, situation-specific "plays" that an Architect can deploy.

This component serves as a formal catalog of these plays. It provides a central, organized reference that gives Architects a shared vocabulary and a set of proven solutions for common challenges like refactoring, dealing with legacy code, and scaling the IDGL across an organization.

## 3. Verification Criteria
This component is considered complete and correct if it consists of the following artifacts:

1.  **`05-patterns.md`**:
    *   **Purpose:** To serve as the master catalog and entry point for the Pattern Library.
    *   **Must contain:** A clear explanation of what patterns are and a categorized list of links to all individual pattern documents.

2.  **A complete set of individual pattern documents**, each defining a specific play. The library must include, at a minimum, the following plays:
    *   `01-Pattern-Spec-Compilation.md`
    *   `02-Pattern-Composable-Prompts.md`
    *   `03-Pattern-Decomposition.md`
    *   `04-Pattern-Legacy-Onboarding.md`
    *   `05-Pattern-Managed-Refactoring.md`
    *   `06-Pattern-Generation-Record.md`
    *   `07-Pattern-Directory-Structure.md`
    *   `10-Pattern-Rapid-Prototyping.md`
    *   `11-Pattern-Strategic-Adoption.md`
    *   `12-Pattern-Stealth-Adoption.md`
    *   `13-Pattern-Spec-Library.md`
