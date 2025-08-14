# How to Use the AI Agent Protocols

## What These Are: AI Configuration Files

This directory contains the "software" for our AI partners. These files are not traditional documentation for you to read; they are **configuration files** or **"boot scripts"** for a generative agent.

Their purpose is to take a powerful, general-purpose AI and provide it with the specific context, rules, and identity required to act as a specialized professional. You provide these protocols to the AI at the start of a session to prepare it for the task at hand.

## The Standard Workflow: The "Boot Sequence"

To ensure the AI is equipped with its full range of capabilities, you should provide it with the protocols in a specific order at the start of any new chat session. This "boot sequence" ensures the AI understands the core philosophy of IDGL, its core identity, its shared vocabulary, and all the specialized roles it can perform.

### The Workflow

1.  **Start a New, Clean Session:** For any new project, begin with a fresh chat session.
2.  **Load the IDGL Primer:** To give the AI the foundational philosophy, copy and paste the entire contents of the following files into the chat:
    *   `idgl-dev-system/00-core.md`
    *   `idgl-dev-system/00-idgl-philosophy.md`
3.  **Load the Master Protocol:** Copy the entire contents of `00-protocol-master.md` and paste it into the chat.
4.  **Load the Shared Concepts:** Copy the entire contents of `00-protocol-shared-concepts.md` and paste it into the chat immediately after the master protocol.
5.  **Load All Role Protocols:** One by one, copy and paste the entire contents of all other protocol files (`01-` through `05-`) into the chat.
6.  **Provide Your Task:** With the AI fully configured, you can now give it your instructions.

### Example

Here is what your initial prompt block would look like. This single, large prompt configures the AI and then gives it its first task.

```text
[PASTE ENTIRE CONTENTS OF idgl-dev-system/00-core.md HERE]

---
[PASTE ENTIRE CONTENTS OF idgl-dev-system/00-idgl-philosophy.md HERE]

---
[PASTE ENTIRE CONTENTS OF 00-protocol-master.md HERE]

---
[PASTE ENTIRE CONTENTS OF 00-protocol-shared-concepts.md HERE]

---
[PASTE ENTIRE CONTENTS OF 01-protocol-spec-compiler.md HERE]

---
[PASTE ENTIRE CONTENTS OF 02-protocol-code-generator.md HERE]

---
[PASTE ENTIRE CONTENTS OF 03-protocol-code-analyst.md HERE]

---
[PASTE ENTIRE CONTENTS OF 04-protocol-legacy-spec-generator.md HERE]

---
[PASTE ENTIRE CONTENTS OF 05-protocol-decomposition-specialist.md HERE]

---

**My Task:**

We need to refactor a legacy component.

1.  First, please act as a **Code Analyst**. Analyze the file at `./legacy/messy-component.js` and provide a report on its public API.
2.  After I review the report, we will work together with you acting as a **Spec Compiler** to create a formal `Spec` for the refactored component.
3.  Once I approve the `Spec`, you will act as a **Code Generator** to produce the new, refactored artifact and its corresponding test file.

Let's begin with step 1.
```
