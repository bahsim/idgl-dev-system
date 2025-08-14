# How to Use the AI Agent Protocols

## What These Are: AI Configuration Files

This directory contains the "software" for our AI partners. These files are not traditional documentation for you to read; they are **configuration files** or **"boot scripts"** for a generative agent.

Their purpose is to take a powerful, general-purpose AI and provide it with the specific context, rules, and identity required to act as a specialized professional. You provide these protocols to the AI at the start of a session to prepare it for the task at hand.

## The Standard Workflow: Create a Master Context

The most effective and efficient way to use these protocols is to provide the AI with its entire library of capabilities at the start of a session. This creates a single, multi-talented AI partner that can seamlessly switch roles as your task evolves.

### The Workflow

1.  **Start a New, Clean Session:** For any new project, begin with a fresh chat session.
2.  **Load the Master Context:** Manually combine the contents of all protocol files in this directory into a single block of text and paste it as your initial prompt.
3.  **Provide Your Task:** Give the AI your instructions.

### Example
Here is what your prompt would look like for a complex refactoring task, demonstrating how you can direct the AI to adopt different roles within a single session.

```text
[PASTE ENTIRE CONTENTS OF ALL *.md FILES FROM /10-agent-protocols/ HERE]

---

**My Task:**

We need to refactor a legacy component.

1.  First, please act as a **Code Analyst**. Analyze the file at `./legacy/messy-component.js` and provide a report on its public API.
2.  After I review the report, we will work together with you acting as a **Spec Compiler** to create a formal `Spec` for the refactored component.
3.  Once I approve the `Spec`, you will act as a **Code Generator** to produce the new, refactored artifact and its corresponding test file.

Let's begin with step 1.
```
