# Assistant Session Rules

## Seamless Continuation Rule

- For any batch or multi-step operation (e.g., generating user stories for all epics), the assistant must:
  - Maintain a progress file (e.g., `user-story-generation-progress.json`) in the workspace, updated after each step.
  - On a new chat session, check this progress file (or infer progress from the workspace if the file is missing).
  - Resume the operation automatically from where it left off, without asking the user to repeat instructions or provide context already given.
  - Only prompt the user if a true ambiguity or error is detected.

- This rule ensures that work continues seamlessly across sessions, with no unnecessary interruptions or repeated questions. 