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
└── 📁 history/
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
└── 📁 history/
    └── ...
```

### Example 3: Simple Task (No Orchestration)
This is the most common case. The task is simple enough that it doesn't need to be broken down. It has no `decomposition`, `compilation`, `research`, or `refinement` folders.

```
[name-of-generative-task]/
├── 📄 intent.md
├── 📄 validation_summary.md
├── 📁 artifact/
└── 📁 history/
    └── ...
```

### Universal Task Components

*   **`intent.md`**: The goal for this specific task.
*   **`validation_summary.md`**: The final outcome of the task.
*   **`artifact/`**: An optional directory to hold the generated output for this task.
*   **`history/`**: A log of the strategic decisions made during this task.
*   **`decomposition/`, `research/`, `compilation/`, and `refinement/`**: Folders containing sub-tasks, which are themselves complete generative tasks.

### A Closer Look at the `history` Folder

The `history` folder provides a chronological, auditable log of the strategic decisions made while working on a task. Here is a nutshell example:

```
📁 history/
│
├── 📁 1/
│   │   (First attempt at a solution)
│   ├── 📄 intent.md
│   │   "Build a search component using a simple array filter."
│   ├── 📄 validation_summary.md
│   │   "Works, but is not performant for large datasets. A new approach is needed."
│   └── 📁 artifact/
│       └── ... (The code for the simple filter component)
│
├── 📁 2/
│   │   (Second attempt, refining the strategy based on the previous validation)
│   ├── 📄 intent.md
│   │   "Rebuild the search component using a more performant library like Fuse.js."
│   ├── 📄 validation_summary.md
│   │   "Success. Performance is excellent."
│   └── 📁 artifact/
│       └── ... (The code for the Fuse.js component)
│
└── 📁 3/
    │   (An orchestration decision for a different task)
    ├── 📄 intent.md
    │   "This problem is too complex. Decompose it into sub-tasks A and B."
    └── 📁 decomposition/
        ├── 📄 (marker for 'sub-task-A')
        └── 📄 (marker for 'sub-task-B')

```
This example shows how the history logs both different solution attempts (Record 1 vs. 2) and strategic orchestration decisions (Record 3).

---

## II. Project Structure: A Sequence of Phases

A real project is a sequence of **Development Phases**, as defined in `09-idgl-development-phase.md`. The root `.idgl` directory is organized into numbered phase folders.

Each phase folder strictly follows the 5-step development process. The folder's structure directly represents the first four steps of work, with the fifth step (`Final Result`) being the artifact placed in the main source tree.

```
.idgl/
├── 📁 01-scaffolding-phase/
│   │   (This folder represents a single Development Phase)
│   │
│   ├── 📄 main_goal.md                 (Step 1: The goal for this phase)
│   ├── 📁 01_system_design/            (Step 2: A generative task for the design)
│   ├── 📁 02_comprehensive_plan/       (Step 3: A generative task that generates the plan)
│   └── 📁 03_execution/                (Step 4: A container for the work tasks)
│       └── 📁 01_execute_scaffold/     (The actual work task from the plan)
│           └── ... (A complete generative task)
├── 📁 ... (other pahses)
│
└── 📁 N-authentication-phase/
    │
    ├── 📄 main_goal.md
    ├── 📁 01_system_design/
    ├── 📁 02_comprehensive_plan/
    └── 📁 03_execution/
        ├── 📁 01_build_auth_api/           (The actual work task from the plan)
        │   └── ... (A complete generative task)
        ├── 📁 02_build_login_ui/           (The actual work task from the plan)
        │   └── ... (A complete generative task)
        └── 📁 03_integrate_components/     (The actual work task from the plan)
            └── ... (A complete generative task)
```

### Explanation of Phase Structure

This structure makes the workflow explicit and consistent for every phase:

1.  **Main Goal:** Represented by `main_goal.md`.
2.  **System Design:** The first generative task, `01_system_design/`.
3.  **Comprehensive Plan:** The second generative task, `02_comprehensive_plan/`. Its execution populates the `03_execution/` directory with the necessary task folders.
4.  **Iterative Execution:** Represented by the `03_execution/` folder. This folder contains the sequence of all generative tasks that need to be completed to achieve the phase's main goal.
5.  **Final Result:** This is not a folder. It is the final artifact produced by the last task in the `03_execution/` folder, which is then placed in its correct location in the main project source code. 

## III. The IDGL Repository Layout

## Rationale

To maintain a clean and scalable project, the process artifacts (the history, intents, and plans of the IDGL) should be physically separated from the final, deployable code artifacts. This is the highest level of organization in an IDGL-driven project.

This layout defines a root structure with two primary directories: `<project>` and `<artifact>`.

## Top-Level Repository Structure

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