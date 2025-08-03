# Legacy Artifact Onboarding

## Rationale

A core principle of the IDGL is that all development is guided by an explicit, version-controlled **Spec** (`intent.md`). Legacy projects, by definition, lack these artifacts. **Legacy Artifact Onboarding** is the process of generating these foundational specs for pre-existing code, making it fully compatible with the IDGL's **Sustaining Lifecycle**.

This is not a one-size-fits-all process. Depending on project needs and resources, a practitioner can choose between two primary strategies: a comprehensive "Full Onboarding" or a more agile, "Just-in-Time" approach.

```mermaid
graph TD
    subgraph "Legacy Codebase"
        LC["Legacy Code"]
    end

    subgraph "Strategy 1: Full Onboarding"
        S1["Dedicated<br/>Development Phase"]
    end
    
    subgraph "Strategy 2: Just-in-Time Onboarding"
        S2["Sustaining Task Trigger<br/>(e.g., Bug Fix)"] --> S3["First Task:<br/>Onboard Just That Module"]
    end

    subgraph "Result"
        R["IDGL-Ready Modules<br/>(in .idgl/sustaining/)"]
    end

    LC --> S1 --> R
    LC --> S2
    S3 --> R

    classDef blue fill:#e0e7ff,stroke:#5a79e0,color:#000
    classDef green fill:#e0ffe0,stroke:#5ae05a,color:#000
    
    class LC,R blue
    class S1,S2,S3 green
```

## Strategy 1: Full Onboarding (as a Development Phase)

This is a comprehensive, project-level effort to onboard an entire legacy application in one go.

*   **When to Use:** When there is a strategic commitment to modernize an entire legacy system and you have dedicated resources for a large-scale documentation and structuring effort.
*   **Process:** The onboarding is treated as a formal **Development Phase**.
    1.  **Main Goal:** "Onboard the legacy 'Monolith' project into the IDGL framework."
    2.  **System Design:** This task analyzes the monolith and produces a spec that identifies its core architectural modules.
    3.  **Comprehensive Plan:** This task creates a plan to execute an onboarding task for each identified module.
    4.  **Execution:** The practitioner works through the generated tasks (e.g., `01_onboard_auth_module/`, `02_onboard_payment_module/`). The intent for each is to reverse-engineer the spec for that part of the legacy code.
*   **Result:** The `.idgl/sustaining/` directory is fully populated with the baseline structures for all modules of the legacy application, making the entire project ready for future sustaining work.

## Strategy 2: Just-in-Time Onboarding (as a Sustaining Activity)

This is a continuous, agile approach where parts of the legacy system are onboarded as needed.

*   **When to Use:** This is the most common and practical approach. It integrates the work of creating specs into the natural flow of day-to-day maintenance and development.
*   **Process:**
    1.  A practitioner receives a task to fix a bug in a legacy module (e.g., the authentication system).
    2.  They navigate to `.idgl/sustaining/` and see that the `authentication/` folder does not yet exist.
    3.  Their **first generative task** is to onboard the module. They create a new task, `sustaining/authentication/00_onboard_module/`, with the intent: "Analyze the legacy authentication code, generate its spec, and establish it as the baseline artifact."
    4.  Once that task is complete and the baseline is established, they can then create their **second generative task** for the actual bug fix: `sustaining/authentication/fix-login-bug/`.
*   **Benefit:** This creates a virtuous cycle. The system's spec coverage increases organically as developers touch different parts of the code. It avoids a large, upfront onboarding project and makes the creation of documentation a natural part of the maintenance process. 