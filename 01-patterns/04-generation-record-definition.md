# Generation Record

## Definition

A **Generation Record** represents a distinct, high-level strategy or approach to solving a **Generative Task**. It serves as a container to be modified and refined until the strategy is either perfected or abandoned.

The IDGL framework defines two feedback loops that determine how records are handled:

1.  **Internal Refinement (`Refinement --> AI_generation`):** When a validation check reveals minor discrepancies, the user enters a refinement loop. This involves making adjustments to the artifact for the *current strategy*. These modifications happen **within the existing `Generation Record`**, updating its state.

2.  **Strategic Re-prompting (`Validation --> Intent_formation`):** When an artifact is fundamentally misaligned with the goal, the user abandons the current strategy and returns to the `Intent Formation` stage. This action **creates a new `Generation Record`** to house the new strategic approach.

## Structure of a Record

Each record contains the evolving state of a single strategic approach:

1.  **Guiding Strategy:** The core intent that defines this approach.
2.  **Active Artifact:** The final version of the artifact for this strategy, identical to the last artifact in the Refinement History.
3.  **Refinement History:** A detailed log of the internal refinement cycles. Each entry is a complete snapshot containing:
    *   **Refinement Intent:** The specific prompt used to modify the artifact.
    *   **Validation Note:** The outcome of the validation for that specific artifact version.
4.  **Final Validation Summary:** The concluding assessment of this approach once the refinement loop is complete.

## Example Scenario: Separating Modification from Re-Prompting

**Generative Task:** "Create a visually appealing and performant image gallery."

*   **Generation Record 1 (Strategy: Lazy Loading)**
    *   **Guiding Strategy:** "Build the gallery using a simple lazy-loading approach."
    *   **Refinement History (within Record 1):**
        *   **Cycle 1:**
            *   **Refinement Intent:** "Add a fade-in animation as images load."
            *   **Validation Note:** "Animation works."
        *   **Cycle 2:**
            *   **Refinement Intent:** "Make the placeholder a blurred version of the original image."
            *   **Validation Note:** "Blur effect added and validated."
    *   **Active Artifact:** The final, complete code for the lazy-loading gallery, including all refinements.
    *   **Final Validation Summary:** "This approach is too simple and cannot handle thousands of images efficiently. A new strategy is needed."

*   **Generation Record 2 (Strategy: Virtualization - New Record Created via Re-prompting)**
    *   **Guiding Strategy:** (Formed after abandoning Record 1) "Build a new gallery from scratch using a high-performance virtualization library."
    *   **Internal Refinement Loop (Modifying Record 2):**
        1.  Initial artifact is created.
        2.  A validation check finds a scrollbar bug. A refinement is made.
    *   **Active Artifact:** The code for the virtualization-based gallery with the bug fix.
    *   **Final Validation Summary:** "Success. This strategy is performant and correct." 