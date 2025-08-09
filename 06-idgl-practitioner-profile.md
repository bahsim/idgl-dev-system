# The IDGL Practitioner Profile

## Definition

An **IDGL Practitioner** is a human expert who directs artificial intelligence through the Intent-Driven Generative Lifecycle. Unlike a traditional developer who writes code directly, or a prompt engineer who focuses on crafting individual prompts, the IDGL Practitioner's core responsibility is to maintain the authoritative **Spec** as the single source of truth.

## Core Responsibilities

1. **Intent Stewardship**
   - Translate business goals into precise, verifiable technical Specs
   - Keep the Spec self-contained and unambiguous
   - Ensure every material change has explicit acceptance criteria

2. **AI Direction**
   - Provide curated, minimal context to the AI
   - Set clear constraints and guardrails
   - Demand "tests by default" in generated artifacts

3. **Validation Authority**
   - Accept or reject artifacts based solely on the Spec
   - Require concrete evidence (tests, logs) over persuasion
   - Maintain the Spec's authority over generated code

4. **Generation Record Management**
   - Preserve key decisions and artifacts
   - Start new records for strategy changes
   - Keep history auditable and reproducible

## Key Principles

- The Spec is the source of truth; code must conform to it
- Every change needs verification artifacts
- Maximize cohesive scope while keeping validation tractable
- Never rewrite history; create new records instead

## Anti-Patterns

- Generating code without a formal Spec
- Adjusting requirements to match generated output
- Writing tests after acceptance
- Losing prompts or context used for generation

## Summary

The IDGL Practitioner succeeds not by writing code, but by rigorously defining and validating what code should be written. They are the guardian of intent, ensuring AI remains a powerful but controlled tool in service of clear human objectives.