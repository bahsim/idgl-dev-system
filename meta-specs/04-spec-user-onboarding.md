# Component Spec: User Onboarding

## 1. Objective
To provide a clear, persuasive, and actionable entry point for any user discovering the IDGL framework. This component answers the questions, "What is this?" and "Where do I start?".

## 2. Rationale
A user's first impression is critical. The onboarding experience must quickly communicate the core value proposition of IDGL (from chaos to control) and guide different types of users to the most relevant starting point for their specific needs.

This component serves as the "front door" and "reception desk" for the entire documentation system. It separates the high-level "why" (in the `README.md`) from the practical, persona-driven "how to begin" (in the `GETTING-STARTED.md`), providing a smooth and efficient learning path for all potential Architects.

## 3. Verification Criteria
This component is considered complete and correct if it consists of the following two artifacts, each fulfilling its specified role:

1.  **`README.md`**:
    *   **Purpose:** To serve as the main landing page for the entire `idgl-dev-system`.
    *   **Must contain:**
        *   The core value proposition ("Gambler vs. Architect," "From Chaos to Control").
        *   A high-level, structured overview of the documentation components ("The Path to Becoming an Architect").
        *   A single, clear call to action that links directly to `GETTING-STARTED.md`.

2.  **`GETTING-STARTED.md`**:
    *   **Purpose:** To provide concrete, actionable next steps for different user personas.
    *   **Must contain:**
        *   At least three distinct, persona-driven paths (e.g., for individual developers, team leads, and developers in high-pressure environments).
        *   Direct links to the most relevant starting document for each path (e.g., the tutorial, a specific pattern).
        *   A "Next Level" section that guides the user to the `AI Agent Protocol Library` as the subsequent step in their journey.
