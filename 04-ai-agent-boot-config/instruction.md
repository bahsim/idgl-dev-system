# Instruction: How to Distill a Knowledge Corpus into a Bootstrapping Artifact

## 1. Objective

To transform a collection of source documents (a "knowledge corpus") into a single, comprehensive, machine-readable configuration file (e.g., YAML). This "bootstrapping artifact" can then be used to instantly configure a new AI agent with the distilled knowledge of the entire corpus, bypassing the need for the new agent to read all the source files.

This is the master process for creating and updating the AI's core context.

## 2. The Process

This is a four-step, human-led process where the Architect commands an AI to perform the synthesis.

### Step 1: Start a New Chat Session

Always begin with a fresh, clean AI agent instance (e.g., in Cursor). This ensures the AI has no prior context and will build its understanding based only on the documents you provide.

### Step 2: Feed the Source Knowledge

Provide the AI with the complete, canonical set of source documents that constitute the knowledge base. Use the `@` mention feature to feed the AI the contents of all relevant files and directories.

**Example (for the IDGL Corpus):**
```
@idgl-dev-system/00-core.md
@idgl-dev-system/00-idgl-philosophy.md
@idgl-dev-system/06-the-architect-profile.md
@idgl-dev-system/02-anatomy-of-a-spec.md
@idgl-dev-system/03-the-artifact-lifecycle.md
@idgl-dev-system/04-communication-principles.md
@idgl-dev-system/05-patterns.md
@idgl-dev-system/08-prompt-cookbook.md
@idgl-dev-system/01-patterns/
@idgl-dev-system/03-agent-protocols/
```

### Step 3: Command the Synthesis

Once the AI has confirmed it has read all the documents, issue a precise and formal prompt to command the synthesis of the bootstrapping artifact. The quality of this prompt is critical to the quality of the result.

**Example (The Canonical Synthesis Prompt):**
```
You have now been provided with the core documentation for the Intent-Driven Generative Lifecycle (IDGL). Your task is to act as an expert system architect and synthesize this knowledge.

**Your Objective:** Create a single, comprehensive, machine-readable YAML document that serves as a complete boot configuration for another AI agent.

**Your Verification Criteria:**
1. The YAML must be well-structured and hierarchical, showing the relationships between concepts.
2. It must distill the essential, operational knowledge, removing all narrative prose, analogies, and conversational fluff.
3. It must define the core philosophy, the full anatomy of a `Spec`, the AI partnership model with all agent protocols, and the catalog of advanced patterns.
4. The final output should be only the YAML code block, ready to be copied.

Proceed.
```

### Step 4: Validate and Save the Artifact

The AI will generate the YAML content in the chat.
1.  **Validate:** Carefully review the generated YAML. Ensure it is well-structured, accurate, and complete according to your intent.
2.  **Save:** Copy the validated YAML content and save it as the new `idgl-boot-config.yaml` file, overwriting the previous version.
