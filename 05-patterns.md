# IDGL Patterns: An Architectural Overview

## 1. Introduction: From Atomic Tasks to Scalable Systems

The **[Core Methodology](./03-the-artifact-lifecycle.md)** provides the universal, atomic engine of the IDGL system. While this engine is powerful for individual **[Generative Tasks](./03-the-artifact-lifecycle.md#2-anatomy-of-a-generative-task)**, it is not sufficient on its own to manage the complexity of a large-scale Digital Product.

This is the role of **IDGL Patterns**.

Patterns are the essential bridge from atomic execution to scalable architecture. They are a catalog of optional, reusable, and formalized solutions to the recurring challenges of orchestrating hundreds of Generative Tasks. They represent the codified, expert-level "best practices" for applying IDGL to real-world projects.

## 2. The Core Principle: Blueprints for Automation

Crucially, Patterns are the **architectural blueprints for an automated IDGL toolchain.**

They are not intended to be burdensome manual processes. Instead, they define the high-level behaviors that smart tools will understand, enabling them to automate away tedious work, enforce dependencies, and manage complex workflows. Their true value is in serving as the `Spec` for the automation that enables scale, governance, and predictability.

## 3. A Catalog of IDGL Patterns

### 3.1. Workflow Patterns
*(Solutions for applying the IDGL lifecycle to common engineering scenarios)*

*   **[Spec Compilation](./01-patterns/01-spec-compilation-pattern.md):** The primary workflow pattern. A two-tiered system where a human-authored `Brief` is "compiled" into a formal `Spec` by an AI agent. This pattern includes the "Tests by Default" principle.
*   **Task Orchestration:** A pattern for defining and managing dependencies between multiple Generative Tasks.
*   **Legacy Onboarding:** A specific workflow for bringing existing, non-IDGL code under the management of the IDGL system.
*   **Managed Refactoring:** A workflow for performing large-scale refactoring against a formal `Spec` that defines the desired end-state.

### 3.2. Compositional Patterns
*(Solutions for building complex `Specs` and prompts from smaller, reusable parts)*

*   **[Composable Prompts](./01-patterns/02-composable-prompts-pattern.md):** A technical pattern for managing meta-prompts. It uses a pre-processor tool to resolve `@import` directives, allowing prompts to be composed from reusable partials.
*   **Composite Specs:** A pattern for creating a high-level "meta-Spec" that composes or references smaller, granular `Specs`.
*   **Reusable Spec Templates:** A pattern for creating standardized templates for common types of `Specs` (e.g., a "New API Endpoint Spec," a "Bug Fix Spec").

### 3.3. Organizational Patterns
*(Solutions for structuring the work and the artifacts)*

*   **Lifecycle Phases:** A pattern for grouping related Generative Tasks into sequential or parallel phases (e.g., "Design," "Implementation," "Testing").
*   **Standard Directory Structure:** A recommended file system layout for organizing `Specs`, `Artifacts`, and their related documentation.

### 3.4. Auditing & Governance Patterns
*(Solutions for tracking and managing the outputs of the IDGL process)*

*   **The Generation Record:** A pattern for creating a formal, auditable record for each significant Generative Task.
