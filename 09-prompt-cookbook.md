# The Architect's Prompt Cookbook

This document is a practical library of advanced, multi-turn prompt scenarios for an IDGL Architect. While the `Communication Principles` provide the high-level plays, this cookbook provides the specific, field-tested invocations for getting high-quality results from your AI partner.

---

## Chapter 1: Strategic Planning & Decomposition

These prompts are used at the beginning of a complex task to ensure the AI acts as a high-level planning partner.

### The "System Architect" Persona

This sets the stage for any planning session.

> **Prompt:**
> "Act as a senior software architect. Your task is to help me create a comprehensive and robust plan. Propose a detailed decomposition plan. For each sub-task, define its inputs, outputs, and validation criteria."

*   **When to use it:** At the very beginning of a large feature or epic.
*   **Why it works:** It establishes the AI's role as a strategic planner, not just a code generator, forcing it to think about structure, dependencies, and validation upfront.

### The "Necessary Steps" Filter

This prompt cuts through the noise and forces the AI to focus only on the critical path.

> **Prompt:**
> "Break this down into the required steps. Only include the truly necessary steps. Exclude all optional or 'nice-to-have' items."

*   **When to use it:** After an initial plan has been generated that feels too complex or contains non-essential items.
*   **Why it works:** It forces the AI to re-evaluate its own output through a lens of strict necessity, simplifying the plan and reducing scope.

---

## Chapter 2: High-Fidelity Code Generation

These prompts are for controlling the quality, format, and completeness of the code the AI generates.

### The "10x Engineer" Persona

This is a step above the standard "senior developer." It's a mandate for excellence and ownership.

> **Prompt:**
> "Proceed like a 10x engineer. I expect clean, efficient, and well-documented code. Anticipate edge cases and include robust error handling."

*   **When to use it:** When you are about to generate a critical piece of infrastructure or a complex algorithm.
*   **Why it works:** It primes the model to access patterns associated with high-performance engineering, often resulting in more thoughtful and resilient code.

### The "Completion Mandate"

This prevents the AI from stopping halfway through a complex task.

> **Prompt:**
> "Do not stop until this feature is fully and completely implemented according to the `Spec`. Generate all necessary files, including tests and documentation."

*   **When to use it:** For any non-trivial generation task that involves multiple files or steps.
*   **Why it works:** It overrides the AI's default tendency to provide partial answers or summaries, forcing it to see a complex task through to completion in a single, sustained effort.

### The "Diff" Output Contract

This is the most precise way to request code changes.

> **Prompt:**
> "Show me the exact code changes needed. Do not just describe what to do. I want to see the 'before' and 'after' in a diff format."

*   **When to use it:** For any refactoring or modification task.
*   **Why it works:** It removes all ambiguity. A diff is a machine-readable, precise format that leaves no room for misinterpretation, unlike a prose description.

### The "No Deletions" Constraint

This is a critical guardrail for refactoring tasks.

> **Prompt:**
> "Do not delete the existing comments. They are important for context."

*   **When to use it:** When refactoring legacy code or code with important explanatory comments.
*   **Why it works:** It adds a specific, negative constraint that overrides the AI's default behavior, which may be to remove comments during a rewrite.

---

## Chapter 3: Debugging & Analysis

These prompts are for turning the AI into a powerful debugging partner who analyzes, rather than guesses.

### The "Socratic Inquiry"

This is the core of the `Socratic Refinement` play. It forces the AI to think before it acts.

> **Prompt:**
> "That code produced an error. Start by writing three short paragraphs analyzing what the cause might be. Do not jump to conclusions. Consider the inputs, the logic, and any external dependencies."

*   **When to use it:** The moment an AI-generated artifact fails.
*   **Why it works:** It prevents the AI from "hallucinating" a fix. By forcing it to analyze potential causes first, you get a much higher quality of diagnostic reasoning and a better final solution.

### The "Context Request"

This flips the script and asks the AI to teach you how to help it.

> **Prompt:**
> "If you were a senior software developer working on this project, what type of context would you need to solve this error? Tell me step-by-step instructions on how I can give you that context."

*   **When to use it:** When an error is complex and you're not sure what information the AI is missing.
*   **Why it works:** It leverages the AI's vast knowledge of software development to create a "context checklist" for you. It's the most efficient way to understand what information is needed to solve a problem.

---

## Chapter 4: Advanced Conversational Scenarios

These prompts control the flow and style of the conversation itself.

### The "Trade-off Analysis" Mandate

This is the core of the `Trade-off Analysis` play. It forces a structured comparison.

> **Prompt:**
> "Before you answer, write two detailed paragraphs, one arguing for each of these solutions. Do not jump to conclusions. Then, tell me which one is better and why."

*   **When to use it:** When you are facing a key architectural decision (e.g., choosing a library, a database schema, or an API design).
*   **Why it works:** It forces the AI to explore multiple perspectives and justify its final recommendation, preventing it from settling on the first or most obvious answer.

### The "Confidence Gradient"

This controls the AI's tone, making its reasoning process more transparent.

> **Prompt:**
> "Start your reasoning paragraph with lots of uncertainty and slowly gain confidence as you think about the item more."

*   **When to use it:** When you want to understand *how* the AI is arriving at a conclusion.
*   **Why it works:** It gives you a window into the AI's "thought process." Seeing the confidence build can help you trust the final answer more, or spot flaws in its early assumptions.

### The "State Summary" Request

This is a crucial tool for ensuring alignment in a long conversation.

> **Prompt:**
> "Before we proceed, give me a summary of the current state. What is our objective, and what have we decided so far?"

*   **When to use it:** During a long, multi-step task, especially if you get interrupted.
*   **Why it works:** It forces the AI to "read back" its understanding of the context, allowing you to correct any misunderstandings before they lead to wasted work.

### The "Brevity" Command

The simplest form of output control.

> **Prompt:**
> "Answer in short."

*   **When to use it:** When the AI is being too verbose and you need a direct, concise answer.
*   **Why it works:** It's a direct command that overrides the AI's tendency to provide long, explanatory answers.
