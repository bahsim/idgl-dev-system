# Introduction to the IDGL Framework

Welcome to the Intent-Driven Generative Lifecycle (IDGL) specification. This collection of documents defines a systematic and powerful methodology for developing software in partnership with artificial intelligence.

## What is IDGL?

IDGL is a **spec-driven development** framework. At its heart, it's about making human intent the primary, authoritative artifact of the entire development process. Instead of treating code as the ultimate source of truth, IDGL elevates the **specification** — the clear, written description of what we want to build and why—to that central role.

The code, documentation, and other outputs are all considered downstream translations of the rich intent captured in the spec. This ensures that both humans and AI are aligned around a single, unambiguous vision.

## The Core Lifecycle

The fundamental process of IDGL is a simple, iterative cycle:

1.  **Intent Formation:** Clearly define the desired outcome.
2.  **AI Generation:** Use an AI to generate a complete artifact based on that intent.
3.  **Validation:** Critically evaluate the generated output against the original intent.
4.  **Refinement:** If needed, create new, scoped sub-tasks to fix or improve the artifact, and repeat the cycle.

This loop applies to everything from a single function to an entire application.

## Navigating This Specification

This directory contains the detailed breakdown of the IDGL framework. Here's a recommended reading path to get started:

1.  **[The IDGL Spec](./00-the-idgl-spec.md):** Get a high-level overview of how IDGL treats everything as a "spec" and how different specs map to the project lifecycle.
2.  **[IDGL Core Concept](./01-idgl-core-concept.md):** Understand the fundamental 4-step "ai-gen" cycle that powers the entire methodology.
3.  **[The Two Lifecycles of an IDGL Project](./09-idgl-lifecycle-phases.md):** Learn how IDGL handles both the initial creation of a project and its continuous, long-term evolution through major epics and minor incremental changes.

From there, you can explore the other documents to dive deeper into specific definitions, such as the directory structure, practitioner profiles, and the various types of tasks and artifacts that make up an IDGL project. 