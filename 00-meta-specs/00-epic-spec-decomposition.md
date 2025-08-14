# Epic Spec: The IDGL Documentation System

## 1. Objective
To reverse-engineer the existing `idgl-dev-system` documentation and formally define its structure and purpose through a set of canonical, interconnected `Specs`.

The ultimate goal is to make the assertion on Slide 13 of the presentation—"This entire IDGL framework is the product of its own process"—a verifiable reality.

## 2. Rationale
The IDGL framework has evolved organically into a comprehensive system. However, its structure is implicitly defined by the file system, not by a formal, top-down architectural plan.

By creating a "Spec for the Specs," we are dogfooding our own methodology at the highest level. This will:
*   Validate the robustness of the IDGL's patterns (Decomposition, Legacy Onboarding).
*   Create a canonical, machine-readable definition of the documentation architecture.
*   Serve as the ultimate proof of the system's validity and power.

## 3. Verification Criteria

This Epic `Spec` will be considered fulfilled when the following six Component `Specs` have been created, validated, and placed in the `/meta-specs/` directory:

1.  **`01-spec-core-philosophy.md`**: Defines the "Why" of IDGL.
2.  **`02-spec-pattern-library.md`**: Defines the catalog of "Architect's Plays."
3.  **`03-spec-agent-protocols.md`**: Defines the "engine" or operational instructions for AI partners.
4.  **`04-spec-user-onboarding.md`**: Defines the user's entry point and learning path.
5.  **`05-spec-implementation-examples.md`**: Defines the "proof" of the system's practical application.
6.  **`06-spec-presentation-suite.md`**: Defines the persuasive instruments for communicating the value of IDGL.

Each Component `Spec` must, in turn, define its constituent files and the purpose of each, fulfilling the requirements of the **Legacy Onboarding** pattern.
