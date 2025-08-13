# The Generation Record Play

## 1. The Play
An Architect's work must be transparent, auditable, and repeatable. The **Generation Record** is the play that ensures this. It is the official, verifiable "flight recorder" for a single, strategic approach to a generative task.

This play is the practical implementation of the core principle: **persist everything**. It transforms an ephemeral AI conversation into a durable, auditable engineering artifact.

## 2. What a Record Contains
Each record is a self-contained history of a single strategic approach:

1.  **The `Spec`:** The contract that defines the goal for this specific strategy.
2.  **The Final `Artifact`:** The final, validated version of the artifact generated under this strategy.
3.  **The Refinement History:** A detailed log of the modification cycles within this strategy, including the prompts used and the validation outcomes.
4.  **The Final Verdict:** The concluding assessment of whether this strategic approach was a success or a failure.

## 3. How Records Are Used
The Architect uses records to manage two key scenarios:

1.  **Refinement (Modifying a Record):** When a validation check reveals a minor issue, the Architect enters a refinement loop. All changes, prompts, and validation notes from this loop are appended to the **current `Generation Record`**.

2.  **New Strategy (Creating a New Record):** When an approach is fundamentally flawed, the Architect abandons it. They close out the current record with a "failed" verdict and create a **new, separate `Generation Record`** to house the new strategic approach.

This discipline ensures that every attempted strategy—both successful and failed—is documented, providing an invaluable history of the project's evolution.

## 4. Example in Action
**Generative Task:** "Create a performant image gallery."

*   **Generation Record 1 (Strategy: Lazy Loading)**
    *   **Spec:** "Build the gallery using a simple lazy-loading approach."
    *   **Refinement History (within Record 1):**
        *   Cycle 1: "Add a fade-in animation." (Success)
        *   Cycle 2: "Make the placeholder a blurred version of the original image." (Success)
    *   **Final Verdict:** "Failed. This approach is too simple and cannot handle thousands of images efficiently. A new strategy is needed."

*   **Generation Record 2 (Strategy: Virtualization)**
    *   **Spec:** "Build a new gallery from scratch using a high-performance virtualization library."
    *   **Refinement History (within Record 2):**
        *   Cycle 1: Initial artifact created.
        *   Cycle 2: A scrollbar bug is found and fixed via refinement.
    *   **Final Verdict:** "Success. This strategy is performant and correct." 