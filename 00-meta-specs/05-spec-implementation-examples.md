# Component Spec: Implementation Examples

## 1. Objective
To provide concrete, hands-on proof of the IDGL framework in action. This component answers the question, "How does this work in the real world?"

## 2. Rationale
Theory is not enough. To be credible and useful, the IDGL must demonstrate its practical application. This component serves as the "evidence locker" for the entire system.

It provides a hands-on tutorial for new users (The Vanguard Project) and a set of case studies that showcase how the Architect's advanced plays are used to solve real-world problems. It also includes the supporting scripts and templates that power these examples, making the abstract concepts of the framework tangible and reproducible.

## 3. Verification Criteria
This component is considered complete and correct if it consists of the following artifacts, each fulfilling its specified role:

1.  **`README.md`**:
    *   **Purpose:** To serve as the master entry point for all implementation examples.
    *   **Must contain:**
        *   A prominent link to the End-to-End Tutorial as the primary starting point.
        *   A "Case Studies" section that links to other projects, explaining which specific "Plays" each one demonstrates.

2.  **`02-end-to-end-tutorial/`**:
    *   **Purpose:** To provide a guided, hands-on "first mission" for a new Architect.
    *   **Must contain:** A complete, self-contained walkthrough of a single generative task, from `Brief` to final validated `Artifact`, framed as "The Vanguard Project."

3.  **A collection of Case Study projects**, demonstrating various plays. At a minimum, this must include:
    *   **`01-react-refactor-with-tests/`**: A project demonstrating the `Spec Compilation` and `Managed Refactoring` plays.
    *   **`03-nestjs-sample/`**: A project demonstrating the `Decomposition` play for generating a multi-layered application.

4.  **`00-reports/`**:
    *   **Purpose:** To contain narrative-style "Case Study" summaries that explain the process and outcome of the example projects.
    *   **Must contain:** A markdown report for each case study project.

5.  **`scripts/`**:
    *   **Purpose:** To provide the operational scripts and prompt templates used to execute the examples.
    *   **Must contain:** The `idgl-template-engine.ps1` script and the `prompt-templates` used for the **Composable Prompts** play.
