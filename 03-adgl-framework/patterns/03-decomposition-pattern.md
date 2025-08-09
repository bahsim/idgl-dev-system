### **Pattern: Agent-Centric Task Decomposition**

#### 1\. Context

You are operating within an **Agent-Driven Generative Lifecycle (ADGL)**. The guiding philosophy is the **Maximal Autonomy Principle**: empower the agent to achieve the largest, most complex task possible with a single intent, while a human expert focuses on high-level strategy and validation.

**Key Insight:** Decomposition is a **meta-task** executed by the agent itself. It is a dynamic, iterative process of planning and re-planning, triggered by a set of well-defined constraints and risks, not by human micromanagement. The human's role is to validate the *plan* and the *final outcome*, not the individual steps.

#### 2\. Problem

A high-level intent cannot be resolved autonomously by an AI agent (violating the Maximal Autonomy Principle) when one or more of the following conditions are met:

  - **Capability Saturation**: The task exceeds the agent's current model context window or its tool access limitations, leading to reasoning failures or hallucinated actions.
  - **Validation Risk**: The generated outcome is too large, complex, or critical for a single human expert to reliably validate within a reasonable timeframe (e.g., \>45 minutes of focused review).
  - **Domain Specialization**: The task requires validation from multiple, distinct human experts (e.g., security, compliance, UX design) before integration.
  - **Dependency Inversion**: A subsequent task is dependent on the successful completion and validation of a high-risk or high-cost component. This isolation is necessary to prevent cascading failures.
  - **Organizational Partitioning**: The work crosses organizational or architectural boundaries that are strictly decoupled (e.g., different microservices, distinct tech stacks, or separate ownership teams).
  - **Contract Ambiguity**: The integration points between components are not yet defined, and a "contract-first" approach is required to enable parallel, independent workstreams.

In these situations, the agent must be instructed to perform its own decomposition.

#### 3\. Solution

The AI agent executes **Self-Decomposition**: it generates a structured, minimal plan to break a high-level intent into a small number of substantial, independently verifiable sub-tasks. The agent presents this plan to a human for approval before proceeding.

##### Core Requirements for Each Agent-Generated Sub-Task

Each decomposed sub-task must adhere to the following principles, which the agent is trained to self-enforce:

  - **Complete Specification**: The sub-task must have its own comprehensive, generated specification (including objectives, inputs, and outputs) that can be executed and validated in isolation.
  - **Stable Contract**: Each sub-task is bounded by a clear, immutable contract or interface (e.g., a generated OpenAPI spec, data schema, or component interface).
  - **Explicit Artifacts**: All inputs and outputs are defined as concrete, versioned artifacts (e.g., `api.yaml`, `db_migration.sql`, `component.tsx`), not shared source code.
  - **Independent Verifiability**: The agent must propose a test plan and acceptance criteria that allow a human or automated system to validate the task's correctness without knowledge of other tasks in the decomposition.

##### Execution Modes

The agent is instructed to plan and execute in two primary modes:

1.  **Sequential Chain of Thought:** For tasks with direct dependencies and an inherent logical flow.

      * **Pattern**: `(Plan T1) → (Execute T1) → (Validate T1) → (Plan T2)...`
      * **When to Use**: The output of `T_n` is an essential input contract for `T_n+1`.
      * **Agent's Role**: Dynamically creates the `T_n+1` specification based on the validated output of `T_n`.

2.  **Parallel Multi-Agent Swarm:** For independent work that can be done concurrently.

      * **Pattern**: `(Plan T0) → (Execute T1, T2, T3 in parallel) → (Integrate T4)`
      * **When to Use**: All sub-tasks can conform to a single, pre-defined contract from a high-level planning task (`T0`).
      * **Agent's Role**: The initial agent `T0` generates a detailed integration contract and then "swarms" or delegates the independent implementation tasks to specialized sub-agents.

#### 4\. The Agent's Decomposition Plan

The agent presents its decomposition plan to the human expert in a structured format for a rapid "go/no-go" decision.

##### Agent-Generated Decomposition Schema

```yaml
decomposition_plan:
  intent: "Your high-level goal here."
  reasoning: |
    "Explanation of why a single-task approach is unfeasible and how this
    decomposition mitigates those risks (e.g., 'Validation exceeds 45 min for a single task')."
  execution_mode: "sequential" | "parallel"
  tasks:
    - task_id: T1
      objective: "Define the core contract for the new API."
      inputs:
        - artifact: "current_repo_state"
      outputs:
        - artifact: "api_spec.yaml"
      dependencies: []
      validation_plan: "Human review of OpenAPI spec for completeness and correctness."
      estimated_validation_time: "15 minutes"

    - task_id: T2
      objective: "Implement the API endpoints to match the contract from T1."
      inputs:
        - artifact: "api_spec.yaml"
      outputs:
        - artifact: "api_endpoints.py"
      dependencies: [T1]
      validation_plan: "Automated test suite (generated by agent) for all API endpoints."
      estimated_validation_time: "5 minutes (automated) + 10 minutes (human review)"
```

##### Decision Checklist for the Human Expert

The human's review is not about the *how*, but the *what* and the *why*.

1.  **Is the decomposition reasoning sound?** (Does the agent's explanation for splitting the task make sense?)
2.  **Are the contracts stable and well-defined?** (Do the proposed `inputs` and `outputs` create clean boundaries?)
3.  **Is the validation plan for each task clear and manageable?** (Can I, or an automated system, confidently verify each sub-task?)
4.  **Is the proposed execution mode appropriate?** (Does a sequential plan make sense for this dependency, or could it be parallelized?)

#### 5\. Guardrails and Metrics

  - **Maximal Decomposition Depth:** Decompositions are strictly limited to one or two levels deep. A deeper decomposition suggests a strategic failure or a need for a higher-level planning agent.
  - **Traceability Tax:** Every decomposition introduces a "tax" on traceability. The final artifacts must be traceable back to the initial high-level intent and the agent's reasoning.
  - **Validation Latency:** The primary metric for a successful decomposition is a human validation time of **\<45 minutes per task**. If validation time increases, the agent's decomposition strategy needs to be refined.
  - **Re-planning Frequency:** Monitor how often the agent revisits or modifies a validated plan. High frequency may indicate an overly optimistic initial plan or a volatile task environment, signaling a need for a different strategy (e.g., an exploratory first task).

This updated framework positions task decomposition as an intelligent, agent-led process that a human expert validates at key decision points, rather than a rigid set of instructions they must manually create. It empowers the agent to be a true partner in a highly automated, yet human-governed, development workflow.