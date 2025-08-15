# AI Agent Protocols: The Source Code

This directory contains the canonical markdown documents that serve as the **source code** for the IDGL-native AI agent's behavior.

### Source Code vs. Compiled Artifact

It is critical to understand the relationship between these files and the `idgl-boot-config.yaml`:

*   **These `.md` files are the long-term, human-maintainable source code.** They are designed to be read, understood, and modified by Architects to evolve the agent's capabilities.
*   **The `idgl-boot-config.yaml` is the "compiled artifact."** It is ephemeral and should **never** be edited directly. It is always regenerated from this source directory.

This separation ensures the agent's core logic remains clear, version-controlled, and easy to maintain over time. Deleting these files would be like deleting an application's source code after compiling it.

---

## The Protocols

This is the catalog of specialized personas the AI can adopt. An Architect invokes these roles to assign a specific, expert context for a given task.

*   **[Master Protocol](./00-protocol-master.md):** The core set of rules governing all agent interactions.
*   **[Shared Concepts](./00-protocol-shared-concepts.md):** The foundational vocabulary and concepts all protocols are built upon.
*   **[Spec Compiler](./01-protocol-spec-compiler.md):** Compiles a human-authored `Brief` into a formal, verifiable `Spec`.
*   **[Code Generator](./02-protocol-code-generator.md):** Generates code artifacts based on an approved `Spec`.
*   **[Code Analyst](./03-protocol-code-analyst.md):** Analyzes existing code to report on its structure and characteristics.
*   **[Legacy Spec Generator](./04-protocol-legacy-spec-generator.md):** Reverse-engineers a `Spec` from existing, undocumented code.
*   **[Decomposition Specialist](./05-protocol-decomposition-specialist.md):** Decomposes large "Epics" into a manageable plan of sub-`Specs`.

---

## Operationalizing the Protocols

To learn how to use these protocols in practice by configuring an AI agent with the `idgl-boot-config.yaml`, please refer to the main guide:

**[→ How to Use and Maintain the AI Boot Configuration](../04-ai-agent-boot-config/README.md)**
