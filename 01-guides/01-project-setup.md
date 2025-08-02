# IDGL Quick Start Guide

This guide provides simple, practical steps for setting up a project to use the Intent-Driven Generative Lifecycle (IDGL) framework.

## Initializing IDGL in an Existing Project

If you have an existing project that you want to start managing with IDGL, the process is straightforward.

1.  Navigate to the root directory of your project.
2.  Create a new directory named `.idgl`.

```bash
# Example command for an existing project
cd /path/to/your/project
mkdir .idgl
```

This `.idgl` directory will now house all the IDGL artifacts (phases, tasks, and history), keeping them separate from your source code. You are now ready to create your first Development Phase, such as `01-initialization-phase`.

## Starting a New Project with IDGL

When starting a brand new project from scratch, you can incorporate the IDGL structure from the very beginning.

1.  Create a root folder for your new project.
2.  Inside the project folder, create the `.idgl` subfolder.
3.  You can also create a `src` folder (or similar) for your source code at the same level as `.idgl`.

```bash
# Example commands for a new project named 'my-new-app'
mkdir my-new-app
cd my-new-app
mkdir .idgl
mkdir src
```

Your initial project structure will look like this:

```
my-new-app/
├── .idgl/
└── src/
```

From here, you are ready to define the `main_goal.md` for your first Development Phase within the `.idgl` directory.
