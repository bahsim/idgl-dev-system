# IDGL Directory Structure

## Guiding Principles

The IDGL directory structure is a readable representation of the execution plan for a generative task. It makes the distinction between sequential and parallel work explicit and ensures that all work remains traceable. It is kept separate from the project's source code, ideally in a root `.idgl/` folder.

---

## I. Structure of a Single Generative Task

A single generative task is the fundamental unit of work. Its directory structure reflects the execution plan required to complete it.

### Example 1: Sequential Plan (with Nesting)
This example shows a task being broken down into two sequential steps. The first step (`01-create-database-schema`) is itself a complex task that requires its own internal decomposition, demonstrating the recursive nature of the structure.

```
[name-of-generative-task]/
├── 📄 intent.md
├── 📄 validation_summary.md
├── 📁 artifact/
├── 📁 decomposition/
│   ├── 📁 01-create-database-schema/
│   │   ├── 📄 intent.md
│   │   ├── ...
│   │   └── 📁 decomposition/
│   │       └── 📁 01-define-user-entity/
│   │           └── ... (This is a nested sub-task)
│   │
│   └── 📁 02-seed-data/
│       └── ... (This sub-task depends on the one above)
└── 📁 records/
    └── ...
```

### Example 2: Parallel Plan (Fork-Join)
Independent tasks are worked on simultaneously and then integrated.

```
[name-of-generative-task]/
├── 📄 intent.md
├── 📄 validation_summary.md
├── 📁 decomposition/
│   └── 📁 parallel/
│       ├── 📁 create-auth-api/
│       │   └── ... (A complete generative task)
│       └── 📁 create-login-ui/
│           └── ... (A complete generative task)
├── 📁 compilation/
│   └── 📁 integrate-ui-and-api/
│       └── ... (A complete generative task)
├── 📁 refinement/
│   └── 📁 [name-of-refinement-task]/
│       └── ... (A complete generative task, e.g., "fix-login-bug")
└── 📁 records/
    └── ...
```

### Example 3: Simple Task (No Orchestration)
This is the most common case. The task is simple enough that it doesn't need to be broken down. It has no `decomposition`, `compilation`, `research`, or `refinement` folders.

```
[name-of-generative-task]/
├── 📄 intent.md
├── 📄 validation_summary.md
├── 📁 artifact/
└── 📁 records/
    └── ...
```

### Universal Task Components

*   **`intent.md`**: The goal for this specific task.
*   **`validation_summary.md`**: The final outcome of the task.
*   **`artifact/`**: An optional directory to hold the generated output for this.
*   **`records/`**: A directory containing the **[Generation Records](./06-Pattern-Generation-Record.md)** for this task, which log the strategic decisions made.
*   **`decomposition/`, `research/`, `compilation/`, and `refinement/`**: Folders containing sub-tasks, which are themselves complete generative tasks.

---

## II. Project-Level Structure

The `.idgl` directory is organized to reflect the two primary modes of the **[IDGL project lifecycle](./08-Pattern-Lifecycle-Phases.md)**: formal **Development Phases** for major epics, and a `sustaining/` directory for incremental work.

### Registering Major Epics (as Development Phases)

When adding a major new feature set, a new, numbered **Development Phase** folder is added to the sequence. This logs the project's major historical milestones.

```
.idgl/
│
├── 📁 01-scaffolding-phase/
├── 📁 02-authentication-phase/
└── 📁 03-product-catalog-phase/  // <-- A new phase for a major new epic
```

### Registering Incremental Changes (in the Sustaining Directory)

For smaller, ad-hoc tasks, work is registered inside a top-level `sustaining/` directory that is organized by feature. To balance ease-of-use with long-term scalability, each feature folder uses a hybrid "active workspace vs. cold archive" model.

```
.idgl/
│
└── 📁 sustaining/
    │
    └── 📁 authentication/                 // The feature-specific context
        │
        ├── 📁 fix-recent-login-bug/      // <-- New tasks are created here as a flat list
        ├── 📁 add-new-tooltip/          // <-- for a clean, active workspace
        │
        └── 📁 archive/                  // <-- A dedicated home for old, completed tasks
            │
            ├── 📁 2024/
            │   ├── 📁 fix-old-bug-from-q3/
            │   └── 📁 another-old-task/
            │
            └── 📁 2023/
                └── ...

```

#### The Workflow

*   **For the Active Developer:** The workflow is simple and low-friction. A practitioner working on a new bug fix creates a new task folder directly inside the relevant feature directory (e.g., `sustaining/authentication/`). The list of folders they see is a clean, relevant list of current and recent work.

*   **For Long-Term Curation:** To prevent the active workspace from becoming a dump, a periodic archiving process is used. At the end of a quarter or year, completed task folders are simply moved from the root of the feature directory into the appropriate `archive/[year]/` sub-directory.

This "golden mean" approach provides the best of both worlds: a simple, flat structure for day-to-day work and a scalable, organized archive for the long-term project history.

---

## III. The IDGL Repository Layout

### Rationale

To maintain a clean and scalable project, the process artifacts (the history, intents, and plans of the IDGL) should be physically separated from the final, deployable code artifacts. This is the highest level of organization in an IDGL-driven project.

This layout defines a root structure with two primary directories: `<project>` and `<artifact>`.

### Top-Level Repository Structure

```
<project-root>/
│
├── 📁 .idgl/
│   │   (Contains all IDGL methodology artifacts)
│   └── ...
│
├── 📁 src/
├── 📄 package.json
└── ... (The rest of the final, canonical source code)
```

### Key Components Explained

*   **`<project-root>/`**: The root directory of the entire project.

*   **`.idgl/`**: This directory lives at the project root and contains all the metadata related to the IDGL process.

*   **Source Code (`src/`, `package.json`, etc.)**: The actual, clean source code of the application lives at the project root alongside the `.idgl/` directory. This is the final `Result` of the development phases and represents the canonical artifact. This standard layout ensures that the history and methodology do not encumber the final product.
