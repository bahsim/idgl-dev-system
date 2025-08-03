# IDGL Lite: Solo Developer Guide

A streamlined, no-frills adaptation of the Intent-Driven Generative Lifecycle (IDGL) methodology for a single developer working with an AI coding assistant.

---

## 1. Why IDGL Lite?

Modern AI tools can turbo-charge solo development, but they work best with a clear, repeatable process.  IDGL Lite keeps the essence of the full methodology—intent-driven planning, rapid AI generation, and tight validation—without heavyweight standards, multi-role coordination, or extensive documentation.

> Goal: **Ship maintainable software faster while staying focused on user value.**

---

## 2. Core Principles

1. **Intent-First Thinking** – Define the _outcome_ you want, not the tasks you’ll perform.
2. **AI as Co-Creator** – Treat the AI model as a pair-programmer: delegate generation, keep ownership of decisions.
3. **Tight Feedback Loops** – Iterate in hours, not days.  Validate early and often.
4. **Lightweight Artifacts** – Only create artifacts that save you time later (e.g., a short intent statement, quick test scripts).
5. **Continuous Learning** – After each cycle, capture lessons and update your personal playbook.

---

## 3. Solo Workflow

| Stage | What You Do | AI’s Role | Key Output |
|-------|-------------|-----------|------------|
| 1. Intent | Write a 1-3 sentence _Intent Statement_ describing the capability and success metric. | ‑ | `intent.md` (≤ 150 words) |
| 2. Brainstorm | Ask the AI for solution sketches, tech stack advice, and edge-case lists. | Generate options, pros/cons. | Design note in `scratchpad.md` |
| 3. Generate | Prompt the AI to scaffold code, config, tests, and docs. | Produce runnable code. | Commit in feature branch |
| 4. Validate | Run unit tests, lint, and manual smoke test. | Suggest fixes, improve tests. | Passing test suite |
| 5. Refine | Ask AI to optimize, tighten types, improve DX. | Code refactors, doc tweaks. | Clean, documented code |
| 6. Ship | Merge to `main`, tag release, deploy. | Generate release notes. | Deployed feature & notes |

A full cycle should take **1 – 4 hours** for a small feature.

---

## 4. Minimal Templates & Files

* **`intent.md`** – _Why_ & _What_.  Template:
  ```
  ## Intent
  Build <capability> so that <user> can <outcome>.

  ## Success Metric
  <e.g., user completes flow in ≤2 min>
  ```
* **`scratchpad.md`** – Free-form notes, AI Q&A, architecture sketches.
* **Tests** – Use your preferred framework (Jest, Vitest, PyTest, etc.).  Aim for critical paths only.
* **`README.md`** – 1-page setup + usage.

No other docs unless they save future debugging time.

---

## 5. Quality Checks (Solo Edition)

1. **Smoke Test** – Can you run the main flow end-to-end locally?
2. **Unit Tests** – Cover “can’t-fail” logic (≥1 per critical path).
3. **Lint/Format** – Run ESLint + Prettier (or equivalents) on save.
4. **Security Quick-Scan** – Use `npm audit` / `pip audit` or similar.
5. **Readability Pass** – Could _future-you_ grok this in 5 minutes?

If all five pass, you’re good to ship.

---

## 6. Example Day-in-the-Life

1. Morning: craft intent `"Add dark-mode toggle with persisted preference"`.
2. Brainstorm with AI: get React hook plan, localStorage strategy.
3. Generate code: AI writes `useTheme.ts`, toggler component, test.
4. Validate: run `npm test`, manual switch verify.
5. Refine: ask AI to extract `ThemeProvider`, add doc snippet.
6. Ship: merge, release v1.3.0, publish changelog.

Total time: **2 hours**.

---

## 7. Getting Started Checklist

- [ ] Install AI assistant extension (e.g., GitHub Copilot, Cursor, Codeium).
- [ ] Set up formatter + linter.
- [ ] Create blank `intent.md`, `scratchpad.md`.
- [ ] Commit baseline repo.
- [ ] Pick your first intent and run the cycle!

Happy building 🚀 