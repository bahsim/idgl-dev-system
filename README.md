# IDGL: From Chaos to Control

Generative AI has introduced a new tension into our work: the incredible **speed** of AI versus the professional **discipline** required to build robust software. This chaos forces a choice upon every engineer:

Are we **Gamblers**, who hope for a lucky prompt and spend our days cleaning up the mess?

Or are we **Architects**, who command AI with a clear plan to guarantee the result?

This repository contains the **Intent-Driven Generative Lifecycle (IDGL)**, a lightweight, tool-agnostic discipline for becoming an Architect in the AI era.

---

### Get Started in 60 Seconds

1.  **Download the AI Boot Configuration:**
    *   **[Right-click and "Save Link As..." →](./04-ai-agent-boot-config/idgl-boot-config.yaml)**

2.  **Initialize Your AI Agent:**
    *   Start a new chat session with your chosen AI.
    *   Paste the entire contents of the downloaded file as your first prompt.

3.  **Become the Architect.**
    *   The AI is now a configured IDGL partner. Start commanding it.

---

To master the philosophy and learn the advanced plays, dive deeper:

**[→ Read The Architect's Way](./00-the-architects-way.md.md)**

---

### Your First Conversation: Example Prompts

Once the AI is configured, you can direct it using plain language. Here are some examples to get you started.

#### Activating an Agent Role: A Cheat Sheet

Use these prompts to put the AI into a specific professional persona for the task at hand.

| Goal | Example Prompt |
|---|---|
| **Decompose a large task** | `"Act as a Decomposition Specialist. This is a big feature. Help me break it down into smaller, manageable `Specs`."` |
| **Create a formal plan** | `"Act as a Spec Compiler. I need to build a user authentication endpoint. Let's create the `Spec` for it."` |
| **Generate code from a plan** | `"Act as a Code Generator. The `Spec` for the auth endpoint is approved. Please generate the code."` |
| **Analyze existing code** | `"Act as a Code Analyst. Tell me about the public methods in this file: `src/utils/api.ts`."` |
| **Onboard legacy code** | `"Act as a Legacy Spec Generator. Reverse-engineer a formal `Spec` for this file so I can refactor it safely."` |

*For more advanced, multi-step scenarios, see the **[→ Prompt Cookbook](./08-prompt-cookbook.md)**.*

#### Using the Communication Playbook

*   **To set the AI's persona for higher quality output:**
    > "Act as a senior software developer specializing in secure API design."

*   **To get a structured comparison of options:**
    > "Introduce three potential solutions for our database schema. For each, provide a paragraph of arguments for and against. Then, select the most relevant one and justify your choice."

*   **To get a specific output format:**
    > "Show me the exact code changes as a diff. Do not describe the changes in prose."

*   **To force the AI to self-diagnose an error:**
    > "That code has a bug. Analyze the error and propose three potential causes. Do not jump to conclusions."

*   **To prevent the AI from inventing answers:**
    > "If you do not know the answer with high certainty based on your training data, state that you do not know. Do not fabricate an answer."
