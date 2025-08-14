# The Anatomy of a Spec: The Architect's Executable Contract

The Architect does not code; they author a `Spec`. This is the single most important artifact in the IDGL, as it is the primary instrument of control over the AI. It is not "documentation" in the traditional sense; it is an **executable contract** that serves as the blueprint for generation. More than that, it is a **discipline for forcing clarity of thought**—a skill that is essential for both human and AI communication.

The quality of the `Spec` is the single greatest predictor of the quality of the final result. A vague contract will produce a chaotic result. A precise contract will produce a predictable one.

This document defines the anatomy of that contract.

---

## The Three Pillars of a Professional Contract

A professional `Spec` is designed for two audiences: the **AI** that must generate the artifact and the **human Architect** who must validate it. It achieves this by resting on three pillars that translate strategic intent into an unambiguous, verifiable plan.

### 1. The Objective: Defining the "What"
The contract must begin with a clear, explicit, and concise statement of the primary objective. This is the Architect's clear directive.

> **Example:**
>
> Create a reusable React hook named `useDebounce` that takes a value and a delay time, and returns the debounced value.

### 2. The Rationale: Explaining the "Why"
The contract must provide the necessary context and constraints. This section is where the Architect establishes the AI's persona and defines the non-negotiable boundaries of the work.

*   **Business Rationale:** The user value that justifies the task.
*   **Technical Constraints:** Required libraries, frameworks, coding standards, or architectural patterns.

> **Example:**
>
> The hook will be used in our application's search bar to prevent excessive API calls while the user is typing. It must be written in TypeScript, use modern functional component patterns, and must not rely on any external libraries for the debouncing logic.

### 3. Verification Criteria: Specifying the "Proof"
This is the most critical pillar. It is what makes the `Spec` an **executable contract** rather than a hopeful request. The criteria must be a clear, verifiable checklist that defines exactly what a "successful" outcome looks like. This is the proof the AI must provide.

> **Example:**
>
> *   The hook must accept a generic `value` of type `T` and a `delay` in milliseconds.
> *   It must return a value of type `T`.
> *   The returned value must only update after the `delay` has passed without the input `value` changing.
> *   On the initial render, the returned value must be equal to the initial input value.
> *   If the component unmounts, any pending debounced updates must be cancelled.

---

## The Principle of Enrichment: From Vague to Verifiable

The core discipline of the Architect is **enrichment**: the practice of providing a level of detail in the `Verification Criteria` that leaves no room for ambiguity. This is the most direct way to control the AI's output and guarantee a consistent, reliable result.

**More detail equals more control.**

An enriched Spec forces the Architect to think through the complete behavior of the desired artifact, including edge cases and error conditions, *before* generation begins. This is the essence of shifting from reactive debugging to proactive design.

---

## Spec Anti-Patterns: The Gambler's Vague Requests

A high-quality `Spec` is as much about avoiding ambiguity as it is about providing clarity. The following are the hallmarks of a Gambler's `Spec`, which violate the core principles of the Architect.

*   **Vagueness:** "Make a button." (Lacks context, constraints, and criteria.)
*   **Compound Objectives:** "Create the `useDebounce` hook and refactor the user profile page." (A contract must have a single, clear objective. This should be two separate contracts.)
*   **Implied Knowledge:** "Implement standard debounce logic." (Fails to specify the proof. The expected logic must be explicitly defined in the criteria.)
