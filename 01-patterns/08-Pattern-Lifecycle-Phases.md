# The Two Lifecycles of an IDGL Project

## Rationale: From Initial Creation to Continuous Evolution

The lifecycle of a project is divided into two major stages: the **Initial Generation** to create the first version of the artifact, and a perpetual **Continuous Development** stage for all subsequent work. This model provides the flexibility to handle both large, planned feature epics and small, incremental changes after the initial release.

```mermaid
graph TD
    subgraph "Lifecycle 1: Initial Generation"
        P1["Phase 1<br/>(Scaffolding)"] --> P2["Phase 2<br/>(MVP Features)"]
    end

    subgraph "Pivotal Milestone"
        D{"MVP/PoC is Established"}
    end

    subgraph "Lifecycle 2: Continuous Dev"
        direction LR
        subgraph "Major Work"
            EP1["Epic Phase 3<br/>(New Feature Set)"] --> EPN["..."]
        end
        subgraph "Minor Work"
            RT1["Refinement Task<br/>(Bug Fix)"] --> RTN["..."]
        end
    end
    
    P2 --> D
    D --> EP1
    D --> RT1

    classDef blue fill:#e0e7ff,stroke:#5a79e0,color:#000
    classDef green fill:#e0ffe0,stroke:#5ae05a,color:#000
    
    class D blue
    class P1,P2,EP1,EPN,RT1,RTN green
```

## Lifecycle 1: Initial Generation
This is the special, one-time process of creating the first canonical artifact (e.g., the MVP or PoC) from a blank slate.

*   **Unit of Work:** The formal, multi-step **Development Phase**.
*   **Process:** This consists of a sequence of one or more `Development Phases` required to get to the first stable, releasable version of the product.

### The Five Steps of a Development Phase
Each Development Phase follows a consistent five-step process, moving from a high-level goal to a concrete, validated result.

```mermaid
graph TD
    A["1 Main Goal"] --> B["2 System Design"];
    B --> C["3 Comprehensive Plan<br/>(Decomposition & Compilation Tasks)"];
    C --> D["4 Iterative Execution<br/>(Working through the plan)"];
    D --> E["5 Final Result"];

    subgraph "Planning Steps"
        B & C
    end
    subgraph "Execution Step"
        D
    end

    classDef blue fill:#e0e7ff,stroke:#5a79e0,color:#000
    classDef green fill:#e0ffe0,stroke:#5ae05a,color:#000

    class A,E blue
    class B,C,D green
```

1.  **Main Goal Definition:** The focused objective for the phase. It defines the "why" and is the source for the top-level `intent.md`.
2.  **System Design:** A generative task to create the architectural blueprint. It defines the "what" and "how."
3.  **Comprehensive Planning:** The central orchestration step. It uses the `System Design` to create a complete dependency graph of all work.
4.  **Iterative Execution:** The "work" step where the practitioner executes the tasks laid out in the plan.
5.  **Final Result:** The tangible, validated output of the phase, which serves as the baseline for the next phase.

### Spec Hierarchy in a Development Phase
The specifications within a phase follow a clear hierarchy.

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
```

## Lifecycle 2: Continuous Development
This lifecycle begins after the initial artifact is established and covers all subsequent evolution of the product. It has two modes of operation depending on the scale of the work.

*   **Mode A: Major Epics (Building the "rest" of the product)**
    *   **Unit of Work:** The formal **Development Phase**.
    *   **Process:** When adding a significant new feature set, a new `Development Phase` is initiated. It follows the full 5-step process but uses the existing codebase as its starting baseline.
    *   **When to Use:** For large, planned feature epics that require their own design and comprehensive planning.

*   **Mode B: Incremental Changes**
    *   **Unit of Work:** The ad-hoc **Generative Task**.
    *   **Process:** For smaller changes, a single generative task is initiated. This is a more agile approach that bypasses the formal phase structure.
    *   **When to Use:** For bug fixes, performance tweaks, minor enhancements, and other small-scale, incremental work.

This two-mode model for continuous development provides the right level of structure for any task, ensuring both agility for small changes and rigor for major additions.

---

## Directory Structure Implementation

The way work is organized on the file system is a direct reflection of these lifecycle modes. For the complete, detailed specification of how to structure the `.idgl` directory for both major phases and sustaining tasks, see the authoritative pattern document:

*   **[./07-Pattern-Directory-Structure.md](./07-Pattern-Directory-Structure.md)**

---

## The Full Lifecycle: Managing Technical Debt with Re-Generation Phases

The Sustaining Lifecycle is not just a passive maintenance mode; it is an active process that produces a critical data asset: the service history of each feature, logged in the `sustaining/` directory. This history is the primary tool for managing the long-term health of the codebase.

Over time, the accumulation of bug fixes and minor changes can lead to architectural drift and technical debt. When the cost and complexity of adding to a feature become too high, the methodology provides a strategic "escape hatch": the **Re-Generation Phase**.

```mermaid
graph TD
    subgraph "Lifecycle 1: Initial Generation"
        A["Development Phases"] --> B["Canonical Artifact (v1)"]
    end

    subgraph "Lifecycle 2: Sustaining"
        B --> C["Stream of Sustaining Tasks"]
        C --> D{"Evidence of Decay Accumulates in 'sustaining/' folder"}
    end

    subgraph "Strategic Decision"
        D --> E{"Declare 'Maintenance Bankruptcy'<br/>Initiate Re-Generation"}
    end
    
    subgraph "Lifecycle 1 (Again): Re-Generation"
        E --> F["New Development Phase<br/>(Informed by sustaining history)"] --> G["Canonical Artifact (v2)"]
    end

    G --> H["Sustaining Lifecycle for v2 starts"]

    classDef blue fill:#e0ffe0,stroke:#5ae05a,color:#000
    classDef red fill:#e0e7ff,stroke:#5a79e0,color:#000
    
    class A,B,C,D,F,G,H blue
    class E red
```

### The Re-Generation Phase

A Re-Generation Phase is a formal **Development Phase** initiated with the specific `Main Goal` of rebuilding and replacing an existing, decayed feature.

*   **Trigger:** A strategic decision, informed by the evidence in the `sustaining/` folder (e.g., high frequency of bugs, increasing complexity of changes, poor performance).
*   **Process:** It follows the standard 5-step process of a Development Phase. Critically, the `01_system_design` task for this phase uses the entire maintenance history from the `sustaining/` folder as a primary input. This ensures that the design of "v2" is explicitly informed by all the documented problems and patches of "v1".
*   **Result:** A new, clean version of the feature's artifact, which replaces the old one in the codebase. The old `sustaining/` history is archived, and a new, clean log begins for the revitalized feature.

This final feedback loop ensures that the IDGL is not just a methodology for creating software, but a complete framework for managing the entire, long-term lifecycle of a project, preventing decay and ensuring its continued health and maintainability. 