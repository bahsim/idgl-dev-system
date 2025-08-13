# The Decomposition Play

## 1. The Play
The Architect's default approach is the **Maximal Scope Principle**: generate the largest possible unit of work that can still be rigorously validated.

However, some tasks are too large or complex for this principle. The **Decomposition Play** is the Architect's strategy for these situations. It is the deliberate and minimal split of one high-level intent into a small number of substantial, independently verifiable generative tasks.

Decomposition is the exception, not the rule. It is a strategic trade-off, accepting increased coordination overhead in exchange for manageable validation and reduced risk.

## 2. When to Run This Play
The Architect runs this play when a single generative task is not feasible. The signs are clear:

*   **Capability Limit:** The task exceeds the AI's context window.
*   **Validation Limit:** The generated output is too large or complex for a human to validate reliably (e.g., >500 lines or >30 minutes of review).
*   **Division of Labor:** The work requires different domain experts for validation (e.g., a database specialist and a UI designer).
*   **Risk Isolation:** A critical component must be generated and validated independently before dependent work can proceed.

## 3. How to Run the Play
This is a collaborative process where the Architect guides an AI agent to create the plan.

### Step 1: The Architect's Directive
The Architect prompts the AI to act as a planning partner, asking it to propose a decomposition plan based on the high-level goal.

> **Example Directive:**
> "My goal is to 'Refactor a monolithic UI component into smaller, testable sub-components.' The component is ~800 lines. Your task is to act as a senior software architect. Propose a detailed decomposition plan. For each sub-task, define its inputs, outputs, and validation criteria. Present the plan as a Mermaid diagram and a detailed task specification list."

### Step 2: The AI-Generated Plan
The AI analyzes the request and generates a candidate decomposition plan, including a diagram and task list.

### Step 3: The Architect's Judgment
This is the Architect's critical role. They review and validate the AI's proposed plan, either approving it or providing feedback for refinement. This loop continues until the Architect is satisfied.

> **Example Refinement:**
> "The overall structure is good, but the contracts between the new sub-components are not well-defined. Update the plan to include a step that outputs a formal JSON specification defining the precise props and interfaces for each new component. All subsequent tasks must use this specification as their primary input contract."

## 4. The Critical Choice: Who Executes?
Once the plan is validated, the Architect makes a strategic choice: who executes the sub-tasks?

1.  **AI as Executor:** The default path for routine tasks where speed is the primary concern.
2.  **Architect as Executor:** The superior choice for tasks where long-term ownership, deep learning, and nuanced implementation are more important than raw speed. The Architect uses the AI-generated plan as a world-class blueprint to guide their own hands-on coding.

This choice is a deliberate act of engineering judgment.

## 5. Rules of Engagement
*   **Keep it Shallow:** A good decomposition is shallow (1-2 levels maximum).
*   **Define Explicit Contracts:** Each sub-task must have its own complete `Spec` and a stable boundary (e.g., an API, a data schema, a component interface).
*   **Execute Sequentially or in Parallel:** For tasks with direct dependencies, chain them sequentially. For independent work, use a parallel fan-out/fan-in approach, but only after a stable integration contract has been defined.
*   **Avoid Micro-decomposition:** Do not split tasks into trivial chunks (<100 lines or <15 minutes of validation). It creates more overhead than it saves.

---
*This play is demonstrated in the `01-react-refactor-with-tests` and `03-nestjs-sample` example projects.*