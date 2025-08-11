# IDGL Patterns: An Architectural Overview

## I. Introduction: From Atomic Tasks to Scalable Systems

The **[Core Methodology](../03-the-artifact-lifecycle.md)** provides the universal, atomic engine of the IDGL system. While this engine is powerful for individual **[Generative Tasks](../03-the-artifact-lifecycle.md#2-anatomy-of-a-generative-task)**, it is not sufficient on its own to manage the complexity of a large-scale Digital Product.

This is the role of **IDGL Patterns**.

Patterns are the essential bridge from atomic execution to scalable architecture. They are a catalog of optional, reusable, and formalized solutions to the recurring challenges of orchestrating hundreds of Generative Tasks. They represent the codified, expert-level "best practices" for applying IDGL to real-world projects.

## II. The Core Principle: Blueprints for Automation

Crucially, Patterns are the **architectural blueprints for an automated IDGL toolchain.**

They are not intended to be burdensome manual processes. Instead, they define the high-level behaviors that smart tools will understand, enabling them to automate away tedious work, enforce dependencies, and manage complex workflows. Their true value is in serving as the `Spec` for the automation that enables scale, governance, and predictability.

## III. A Catalog of IDGL Patterns

### 3.1. Workflow Patterns
*(Solutions for applying the IDGL lifecycle to common engineering scenarios)*

*   **[Pattern 01: Spec Compilation](./01-patterns/01-Pattern-Spec-Compilation.md):** The primary workflow pattern. A two-tiered system where a human-authored `Brief` is "compiled" into a formal `Spec` by an AI agent.
*   **[Pattern 03: Decomposition](./01-patterns/03-Pattern-Decomposition.md):** A pattern for using an AI as a planning partner to break down a large, complex `Intent` into a series of smaller, validated sub-tasks.
*   **[Pattern 04: Legacy Onboarding](./01-patterns/04-Pattern-Legacy-Onboarding.md):** A specific workflow for bringing existing, non-IDGL code under the management of the IDGL system by reverse-engineering a `Spec`.
*   **[Pattern 05: Managed Refactoring](./01-patterns/05-Pattern-Managed-Refactoring.md):** A workflow for performing large-scale refactoring against a formal `Spec` that defines the desired end-state.
*   **[Pattern 09: Task Orchestration](./01-patterns/09-Pattern-Task-Orchestration.md):** A pattern for defining and managing dependencies between multiple Generative Tasks.
*   **[Pattern 10: Rapid Prototyping](./01-patterns/10-Pattern-Rapid-Prototyping.md):** A lightweight application of IDGL for generating multiple, partial solutions to accelerate client feedback and ensure alignment.

### 3.2. Compositional Patterns
*(Solutions for building complex `Specs` and prompts from smaller, reusable parts)*

*   **[Pattern 02: Composable Prompts](./01-patterns/02-Pattern-Composable-Prompts.md):** A technical pattern for managing meta-prompts. It uses a pre-processor tool to resolve `@import` directives, allowing prompts to be composed from reusable partials.

### 3.3. Organizational Patterns
*(Solutions for structuring the work and the artifacts)*

*   **[Pattern 07: Directory Structure](./01-patterns/07-Pattern-Directory-Structure.md):** A recommended file system layout for organizing `Specs`, `Artifacts`, and their related documentation.
*   **[Pattern 08: Lifecycle Phases](./01-patterns/08-Pattern-Lifecycle-Phases.md):** A pattern for grouping related Generative Tasks into sequential or parallel phases (e.g., "Design," "Implementation," "Testing").
*   **[Pattern 11: Strategic Adoption](./01-patterns/11-Pattern-Strategic-Adoption.md):** A pragmatic, phased strategy for introducing and scaling the IDGL methodology within an organization.

### 3.4. Auditing & Governance Patterns
*(Solutions for tracking and managing the outputs of the IDGL process)*

*   **[Pattern 06: Generation Record](./01-patterns/06-Pattern-Generation-Record.md):** A pattern for creating a formal, auditable record for each significant Generative Task.
