# Development Phase Setup Guide

This guide provides practical steps for setting up a new Development Phase in your IDGL project.

## Step 1: Create the Phase Directory

A Development Phase is a self-contained unit of work. First, create a new numbered folder in your project's `.idgl` directory.

The folder name must follow the `NN-descriptive-name-phase` convention.

*   **`NN-`**: A two-digit chronological prefix (e.g., `01-`, `02-`).
*   **`descriptive-name`**: A short, kebab-case summary of the goal (e.g., `authentication`).
*   **`-phase`**: The mandatory suffix.

```bash
# Example for starting a new "authentication" phase
cd /path/to/your/project/.idgl
mkdir 02-authentication-phase
```

## Step 2: Scaffold the Internal Structure

Each phase requires a standard set of directories and files to prepare for the IDGL process. Using a script to scaffold this is recommended, but you can also create it manually.

```bash
# Navigate into your new phase directory
cd 02-authentication-phase

# Create the core structure
mkdir -p 01_system_design/artifact 01_system_design/history
mkdir -p 02_comprehensive_plan/artifact 02_comprehensive_plan/history
mkdir 03_execution

# Create the initial files
touch main_goal.md
touch 01_system_design/intent.md 01_system_design/validation_summary.md
touch 02_comprehensive_plan/intent.md 02_comprehensive_plan/validation_summary.md
touch 03_execution/README.md

# Add .gitkeep files to empty directories
touch 01_system_design/artifact/.gitkeep 01_system_design/history/.gitkeep
touch 02_comprehensive_plan/artifact/.gitkeep 02_comprehensive_plan/history/.gitkeep
```

Your new phase is now initialized. Your next action is to define the goal in `main_goal.md`.

---

# How to Initialize a Development Phase

This guide explains the standard workflow for initializing a new Development Phase within an IDGL project. A phase is a self-contained unit of work designed to achieve a specific `Main Goal`.

### Naming Convention

The folder name must follow the `NN-descriptive-name-phase` convention to ensure a chronological and self-documenting project history.

*   **`NN-`**: A two-digit chronological prefix (e.g., `01-`, `02-`).
*   **`descriptive-name`**: A short, kebab-case summary of the goal (e.g., `authentication`, `user-profiles`).
*   **`-phase`**: The mandatory suffix.

**Example:** `02-authentication-phase`

### Fully Scaffolded Phase Structure

A new phase is not just a single file, but a complete directory structure that prepares for the first steps of the IDGL process. Using a script to scaffold this structure is highly recommended. The complete structure for a new phase looks like this:

```
.idgl/
└── 01-scaffolding-phase/
    ├── main_goal.md
    ├── 01_system_design/
    │   ├── intent.md
    │   ├── validation_summary.md
    │   ├── artifact/
    │   │   └── .gitkeep
    │   └── history/
    │       └── .gitkeep
    ├── 02_comprehensive_plan/
    │   ├── intent.md
    │   ├── validation_summary.md
    │   ├── artifact/
    │   │   └── .gitkeep
    │   └── history/
    │       └── .gitkeep
    └── 03_execution/
        └── README.md
```

### The 5 Steps of a Phase

This initial structure directly maps to the five-step process of a Development Phase:

1.  **Main Goal Definition**: Write the purpose of the phase in `main_goal.md`. This is the high-level "why".
2.  **System Design**: The `01_system_design/` folder is a ready-to-go generative task. Its `intent.md` prompts for the creation of an architectural blueprint, which will be placed in the `artifact/` directory.
3.  **Comprehensive Planning**: The `02_comprehensive_plan/` folder is the next task. Its `intent.md` prompts for breaking down the system design into a detailed work plan. The output of this task will populate the `03_execution/` folder.
4.  **Iterative Execution**: The `03_execution/` folder is the container for all the actual work tasks identified in the planning step. The initial `README.md` is a placeholder.
5.  **Final Result**: This is the ultimate output of the entire phase. It is the artifact produced by the final task in `03_execution`, which is then moved into the main source code (e.g., `src/`).
