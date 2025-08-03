# The IDGL Conceptual Model

The Intent-Driven Generative Lifecycle (IDGL) is a system for software development that establishes a formal, auditable relationship between human intent and AI-generated output. The entire system is built upon the interaction of three core concepts, as illustrated below.

```mermaid
graph TD
    A[Spec] --> B(AI)
    B --> C(Digital Product)
    A -.-> C
```

## The Three Pillars of IDGL

1.  **The Spec:** This is the authoritative, version-controlled definition of a desired outcome. It is a formal specification, authored by a human, that describes what to build, why it's needed, and how to verify its correctness.

2.  **The AI (The Generative Engine):** The AI acts as a powerful synthesis engine. Its role is to take the formal Spec and generate a candidate digital product that fulfills the specified requirements.

3.  **The Digital Product:** This is the tangible, generated output of the cycle. The Spec provides the direct criteria for its validation. Examples of Digital Products include:
    *   A block of source code.
    *   A user story or technical documentation.
    *   A diagram or user interface mockup.
    *   A configuration file.
    *   A set of test data.

## The Spec: The Authoritative Artifact

In the IDGL system, the "Spec" is not merely a document; it is the primary, version-controlled artifact that captures all structured communication and intent.

### Core Mandate: Answering What, Why, and How

The Spec is the authoritative answer to three fundamental questions:

1.  **What** to build (functional requirements, success criteria).
2.  **Why** it should behave that way (values, business rules, safety constraints).
3.  **How** to verify success (tests, evaluation criteria, acceptance criteria).

By making the Spec the central artifact, IDGL ensures that human and machine efforts are aligned around a single, unambiguous source of truth. It becomes an executable contract: if the generated Digital Product fails the tests defined in its Spec, a bug has been found in the implementation, not the intent.

### Key Engineering Properties

A well-formed Spec exhibits several key properties:

*   **Human & Machine Alignment:** Because Specs are written in structured natural language (like Markdown), they serve as a single source of truth that both human stakeholders (engineers, product, legal) and AI models can understand, act upon, and be evaluated against.
*   **Reusability & Composability:** Like code libraries, Specs can be modular. A project can import standardized Specs for security, privacy, or user experience, ensuring consistency and saving time.

### Practical Flavors

In practice, Specs can take several flavors depending on their purpose:

*   **Product Spec:** Defines user stories, flow diagrams, and KPIs.
*   **Technical Spec:** Outlines interfaces, data contracts, and performance budgets.
*   **Safety/Governance Spec:** Contains red-team prompts, ethical boundaries, and legal constraints.
*   **Test Spec:** Provides formal input/output pairs and property-based assertions.
