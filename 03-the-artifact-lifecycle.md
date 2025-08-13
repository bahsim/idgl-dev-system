# The Artifact Lifecycle: The Architect's Workflow

A `Spec` is a contract, but a contract is useless without a formal process for executing it. The Artifact Lifecycle defines the two disciplined workflows an Architect uses to translate a `Spec` into a tangible, validated result.

Every action an Architect takes on an artifact falls into one of these two processes: **Generation** or **Modification**. Understanding them is key to maintaining control and predictability throughout a project.

---

## 1. The Generation Workflow: Forging the Initial Artifact

This workflow is used exactly once per artifact: the moment of its creation. It is the ideal "happy path," where a high-quality `Spec` is used to forge a new artifact from a blank slate.

A rejection at this stage is significant. It doesn't suggest a minor bug; it signals a fundamental flaw in the `Spec` itself, requiring the Architect to return to the contract and refine their intent.

### Process Flow
```mermaid
graph TD
    subgraph "Generation:_The_Initial_Forging"
        A["Architect Authors the Spec"]
        B["AI Forges the Artifact"]
        C["Architect Validates Against the Spec"]
        F(New Artifact)

        A -- "Executes" --> B
        B -- "Produces" --> C
        C -- "Rejected<br/>(Fundamental Misalignment)" --> A

        subgraph legend [Legend]
            style legend stroke:#ccc,stroke-dasharray: 5 5
            L1(Process Step)
            L2(Validated Artifact)
            style L1 stroke:#333
            style L2 fill:#f2f2f2,stroke:#333,stroke-width:2px,color:#000
        end

        B -.-> F
        C -.-> F
        style F fill:#f2f2f2,stroke:#333,stroke-width:2px,color:#000
    end
```

---

## 2. The Modification Workflow: Controlled, Iterative Change

This is the Architect's primary workflow for all planned, iterative changes to an **existing artifact**. It is the main loop of day-to-day development and long-term maintenance. The process is always initiated with an existing artifact and a new `Spec` that defines the desired changes.

Unlike in Generation, a rejection here is expected and managed. It typically indicates a minor implementation issue that the Architect can correct via a rapid **Refinement** loop, adjusting the `Spec` to provide clearer instructions for the next generation attempt.

### Process Flow
```mermaid
graph TD
    subgraph "Modification:_The_Refinement_Loop"
        
        
        A["1 Architect Authors<br/>Modification Spec"]
        EA("Existing<br/>Artifact")
        B["2 AI Generates ChangeSet"]
        C["3 New Artifact Version is Validated"]

        D(Updated Artifact)

        A -- "Guides" --> B
        B -- "Is Applied to Produce" --> D
        D -- "Is Reviewed In" --> C
        C -- "Rejected" --> A

        EA -- "Provides Context For" --> A
        EA -- "Is an Input To" --> B


        style EA fill:#f2f2f2,stroke:#333,stroke-width:2px,color:#000
        style D fill:#f2f2f2,stroke:#333,stroke-width:2px,color:#000
    end
```
