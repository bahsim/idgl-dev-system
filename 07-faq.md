# IDGL: Frequently Asked Questions

### Q: Where does the Business Analyst (BA) fit into the IDGL?

This is a critical question. The IDGL does not have a separate, formal role for a "Business Analyst." Instead, it **integrates the essential functions of business analysis directly into the Architect's "Author of the Contract" function.**

This ensures a direct line of accountability from business requirements to the final `Spec`. However, this does not mean a person with the title "Business Analyst" cannot exist on an IDGL project. The key is how their role is scoped.

On a large or complex project, a BA can act in a **vital supporting role to the Architect.** The BA can be responsible for preparing crucial intermediate artifacts:
*   Initial user research and interviews.
*   Drafting user stories.
*   Analyzing raw business requirements.

These artifacts then serve as a high-quality input for the Architect, who retains sole ownership and responsibility for authoring the final, canonical `Spec`. This model leverages the BA's specialized skills while preventing the "handoff" problem of traditional development.

### Q: Does "The Architect" have to be a single person?

No. **"The Architect" is a function, not necessarily a single individual.** The implementation of the role scales with project complexity:

*   **For simple projects:** A single senior engineer may indeed perform all three core functions: Author, Supervisor, and Enforcer.
*   **For complex projects:** The Architect function is more likely to be fulfilled by a small, dedicated **team** of 2-3 specialists. One person might focus on Authoring the contract, another on Supervising the execution, and a third on Enforcing the verdict.

The core principle is that these three functions must be accounted for and work in a tight, collaborative loop. Whether that loop happens inside one person's head or within a small, dedicated team is a matter of project scale and organization.

### Q: How does a Designer (UI/UX) fit into the IDGL?

Much like the Business Analyst, the IDGL integrates the Designer's functions directly into the core loop, making their contributions more powerful and binding.

Traditionally, a designer creates a mockup which is then "handed off" to be re-implemented by a developer, often with inconsistencies. The IDGL eliminates this lossy handoff.

1.  **The Design is the Contract:** A designer's work is not just a suggestion; it becomes a formal, executable part of the `Spec`. The `Verification Criteria` will contain direct links to design artifacts and non-negotiable rules.
    *   **Example:** *"The generated component must be pixel-perfect according to this Figma design [link]. It must use the color tokens and font styles from our official design system."*

2.  **The Designer is a Validator:** The designer plays a critical role in the `Validation` stage. They partner with the Architect (in their **Enforcer of the Verdict** function) to ensure the AI-generated artifact has perfect fidelity to the design `Spec`. Their expert judgment is essential for enforcing the visual contract.

3.  **The Designer's Superpower is Prototyping:** The **[Rapid Prototyping Pattern](./01-patterns/10-Pattern-Rapid-Prototyping.md)** is a designer's best tool in this framework. It allows them to move beyond static mockups and quickly generate multiple *interactive* UI variants, leading to faster, more effective usability testing and stakeholder alignment.

In this model, the designer is not an isolated role at the start of a project but a continuous, essential partner whose expertise directly shapes the `Spec` and validates the final `Result`.

### Q: What is the role of a Project Manager (PM)?

The IDGL framework is designed to automate or absorb many of the traditional functions of a Project Manager, making the role, as it's commonly understood, largely unnecessary. The focus shifts from managing a *process* to tracking verifiable *outcomes*.

1.  **The Plan is the Directory Structure:** The project plan is not a separate artifact like a Gantt chart. The plan *is* the auditable, transparent structure of the **`.idgl/`** directory. The dependency graph of tasks is explicitly defined by the **[Decomposition Pattern](./01-patterns/03-Pattern-Decomposition.md)**, and a task is "done" when it has a validated artifact.

2.  **The Scope is the `Spec`:** Scope is managed by the `Spec`. It is the formal, binding contract for the work. Any change in scope requires a change in the `Spec`.

3.  **Risk is Managed by the Core Loop:** The primary risk—building the wrong product—is mitigated by the tight `Spec -> Generate -> Validate` feedback loop and the **[Rapid Prototyping Pattern](./01-patterns/10-Pattern-Rapid-Prototyping.md)**.

While a human may still be needed for high-level budget and resource management, the day-to-day work of tracking tasks and managing scope is a native, automated feature of the IDGL process.
