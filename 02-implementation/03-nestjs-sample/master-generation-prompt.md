# Master Prompt: Generate an IDGL-Compliant Implementation Plan for the WishListShare Backend

## 1. System Terminology

Before you begin, you must understand the following core concepts of the system you are about to plan.

- **Intent-Driven Generative Lifecycle (IDGL):** This is a methodology for software development. Its core principle is that a detailed, formal specification should be used to automatically generate the application code. The primary work is defining the specification, not writing the code.
- **`Spec`:** This is the formal specification. It is the single source of truth that defines what to build, why it's needed, and how to verify it. In this project, the `Spec` is the entire collection of documents in the `01-concept/` directory.
- **`IDGL Practitioner`:** This is the human expert (an engineer, an architect) who authors the `Spec` and validates the final, AI-generated code against that `Spec`.

## 2. Role

You are an expert-level AI System Architect. Your specialty is translating high-level business and technical concepts into a complete, systematic, and automated implementation plan based on the **Intent-Driven Generative Lifecycle (IDGL)**.

## 3. Objective

Your task is to generate a comprehensive set of planning and implementation documents for the **WishListShare NestJS Backend**.

**Crucially, you are NOT to generate the final application code.** Your output will be the complete `02-implementation` directory, containing all the plans, scripts, and configuration "scaffolding" that an IDGL practitioner would use to guide a *different* AI agent in generating the final code.

## 4. Input: The Core `Spec`

The application to be planned is defined by the conceptual documents in the `01-concept/` directory.

- **Application:** A collective gift-giving platform named "WishListShare".
- **Core Entities:** `User`, `Wish`, `Wishlist`, `Offer`. The details of their fields, relationships, and validation rules are defined in `01-concept/domain-models.md`.
- **Core Business Logic:** The application has complex rules for ownership, editing, offer management, data visibility, and atomic transactions, as defined in `01-concept/business-rules.md`.
- **Target Architecture:** A modular NestJS application using TypeORM for the database layer and JWT with Passport for authentication, as defined in `01-concept/architecture.md`.

## 5. Core Instructions

### 5.1. Decompose the Generation Process
Analyze the dependencies between the required software components (Entities, DTOs, Services, Auth, Controllers, App Modules). Design a strict, sequential, multi-step generation plan that builds the application from the ground up, ensuring no component is generated before its dependencies are in place. The required order is: **Entities -> DTOs -> Services -> Auth -> Controllers -> App Config**.

### 5.2. Design a Phased Execution Model
Structure the entire plan into two primary phases:
- **Phase 1: Scaffolding:** An initial phase to create the empty NestJS project structure, all necessary modules, and install all dependencies.
- **Phase 2: Generation:** A second phase that executes the six-step dependency chain to generate the application's logic and features.

### 5.3. Produce High-Level Planning Documents
Generate the following master planning documents in the root of the `02-implementation` directory:
- `README.md`: A comprehensive guide to the implementation plan. It must explain the structure, the phased approach, and the dependency chain. **Crucially, it must be exceptionally detailed and user-friendly.** It should include:
    - A "Quick Start" section with tailored instructions for different audiences (e.g., First-Time Users, Contributors).
    - A detailed "Step-by-Step Breakdown" in a markdown table.
    - Explicit "Success Criteria" and "Quality Gates" for each phase.
    - A high-level summary of the "Business Domain Context".
- `implementation-plan.md`: A detailed, step-by-step execution guide for a developer. It must include prerequisite checks, shell commands for validation at each step, and success criteria.
- `strategic-plan.md`: A high-level document focused on the "why." It should cover the business justification, goals, and success metrics for the project.
- `architectural-design-rationale.md`: This is a critical document. It must provide a deep, expert-level analysis of **why the dependency-driven, six-step generation process is the optimal strategy**. It should explain how this approach minimizes risk, improves quality, and enables efficient AI collaboration.

### 5.4. Define Artifacts for Scaffolding Phase
For the Scaffolding Phase, create a `01-phase-scaffolding/` directory. Inside this directory, generate a `scaffolding-script.sh` file. This script must contain all the `bash` commands needed to:
1. Create a new NestJS project named `wishlist-backend`.
2. Generate the five core modules: `users`, `wishes`, `wishlists`, `offers`, and `auth`.
3. Install all necessary `npm` dependencies for TypeORM (`@nestjs/typeorm`, `typeorm`, `pg`), authentication (`@nestjs/jwt`, `passport-jwt`, `@nestjs/passport`, `bcrypt`), and validation (`class-validator`, `class-transformer`).

### 5.5. Define Artifacts for Each Generation Step
For each of the six steps in the Generation Phase, create a subdirectory (e.g., `01-step-entities/`, `02-step-dtos/`). Within each subdirectory, the plan must call for the creation of two key files:
- `[step-name]-generation-config.ts`: A TypeScript file containing the detailed, machine-readable configuration for that specific step. This is the "executable spec" for the AI.
- `[step-name]-generation-prompt.md`: A markdown file containing the complete, high-level prompt that an engineer would use to instruct the AI, telling it to use the corresponding config file and business rules reference to generate the code for that step.

### 5.6. Final Output
The final output of executing this prompt should be the complete directory structure for `02-implementation/`, populated with all the `.md` files you've generated and the subdirectories for each phase and step, ready for execution.
