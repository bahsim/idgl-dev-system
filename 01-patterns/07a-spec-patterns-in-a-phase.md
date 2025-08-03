# Spec Patterns in a Development Phase

For very large or complex projects, the IDGL system provides organizational patterns to manage complexity. These patterns introduce higher-level "contextual specs". These patterns and specs are optional tools, to be used only when the scale of a project requires them.

## The Phase-Based Spec Flow

When a project is organized into a formal **[Development Phase](./09-idgl-lifecycle-phases.md)**, the specifications follow a clear hierarchy, as shown below. This is a pattern for ensuring alignment on large-scale work.

```mermaid
graph TD
    subgraph "IDGL Project"
        A["Product Spec<br/>(main_goal.md)"] --> B{"System Design Task"}
        B --> C["Technical Spec<br/>(Artifact of System Design)"]
        C --> D{"Comprehensive Plan Task"}
        D --> E["Execution Plan<br/>(The .idgl directory structure)"]
        E --> F["Micro-Specs<br/>(intent.md for each generative task)"]
        F --> G["Code Artifacts"]
    end

    subgraph "Reusable Assets"
        S["Reusable Spec Library<br/>(e.g., /specs/security.md)"] -.-> F
    end

    classDef blue fill:#e0e7ff,stroke:#5a79e0,color:#000
    classDef green fill:#e0ffe0,stroke:#5ae05a,color:#000
    
    class A,C,E,G,S blue
    class B,D,F green
```

### Contextual Specs in a Development Phase

*   **Product Spec (`main_goal.md`):** This is the highest-level spec. It defines the goal for an entire `Development Phase`, focusing on user stories, business value, and overall success criteria.

*   **Technical / Architectural Spec:** This is the artifact produced by the `01_system_design` task within a phase. It defines interfaces, data contracts, and technology choices, providing the "how" for the "what" described in the Product Spec.

### Reusable & Composable Specs

To promote consistency and reuse across a large project, a team can maintain a central library of common specifications, for example:
*   `/specs/security-guidelines.md`
*   `/specs/ux-style-guide.md`
*   `/specs/privacy-policy.md`

The `intent.md` for any generative task can then import or reference these common specs, ensuring that all generated artifacts adhere to the same set of high-level constraints. This makes the entire process more robust, maintainable, and aligned with organizational policy.
