# Component Spec: Agent Protocols

## 1. Objective
To define the operational "software" for AI agents participating in the IDGL. This component answers the question, "How do we configure a general-purpose AI to become a specialized professional partner for the Architect?"

## 2. Rationale
The IDGL framework requires AI agents to perform distinct, specialized roles (e.g., compiling a `Spec`, generating code, analyzing legacy artifacts). A general-purpose AI does not inherently understand these roles or their specific rules of engagement.

This component provides a library of "boot scripts" or "job descriptions" that configure an AI for a specific task. They are the concrete implementation of the **Composable Prompts** pattern, transforming a generic AI into a reliable, role-aware partner. This is the core mechanism that makes the IDGL an automatable and scalable engineering discipline.

## 3. Verification Criteria
This component is considered complete and correct if it consists of the following artifacts:

1.  **`README.md`**:
    *   **Purpose:** To serve as the user manual for the protocol library.
    *   **Must contain:** A clear explanation of what the protocols are and a practical, step-by-step guide on how to use them to configure an AI agent (the "Master Context" workflow).

2.  **A complete set of individual protocol documents**, each defining a specific AI agent role. The library must include, at a minimum, the following foundational and specialized protocols:
    *   `01-protocol-spec-compiler.md`
    *   `02-protocol-code-generator.md`
    *   `03-protocol-code-analyst.md`
    *   `04-protocol-legacy-spec-generator.md`
    *   `05-protocol-decomposition-specialist.md`
