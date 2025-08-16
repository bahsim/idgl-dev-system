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

*For more advanced, multi-step scenarios, see the **[→ Specs Cookbook](./08-specs-cookbook.md)**.*

#### Key Plays from the Cookbook

*   **To get a structured comparison of options:**
    > "Before you answer, write two detailed paragraphs, one arguing for each of these solutions. Do not jump to conclusions. Then, tell me which one is better and why."

*   **To have the AI guide you on solving an error:**
    > "If you were a senior software developer working on this project, what type of context would you need to solve this error? Tell me step-by-step instructions on how I can give you that context."

*   **To set a high quality bar for code generation:**
    > "Proceed like a 10x engineer. I expect clean, efficient, and well-documented code. Anticipate edge cases and include robust error handling."

*... and many more in the **[→ Full Prompt Cookbook](./08-prompt-cookbook.md)**.*
