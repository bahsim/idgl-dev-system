# IDGL Implementation Plan: WishListShare NestJS Backend

## 1. Overview

Welcome to the Intent-Driven Generative Lifecycle (IDGL) implementation plan for the **WishListShare** backend. This document serves as the central guide for understanding the structure, strategy, and execution of the automated code generation process.

The core principle of this plan is **specification-driven development**. The entire application is defined in a formal `Spec` located in the `../01-concept/` directory. This implementation plan consumes that `Spec` to orchestrate a phased, dependency-aware generation of the final NestJS application.

**Primary Goal:** To automate the creation of a production-ready backend, minimizing manual coding and maximizing consistency, by translating a formal `Spec` into application code via a series of automated, verifiable steps.

## 2. Project Structure

The `02-implementation/` directory is organized to support a clear, phased execution model:

- **`/01-phase-scaffolding/`**: Contains scripts and configurations for the initial setup. This phase prepares the development environment by creating the NestJS project structure, installing all dependencies, and setting up the database connection.
- **`/02-phase-generation/`**: Contains the core logic for the automated code generation. This phase is broken down into a strict sequence of steps, each responsible for generating a specific architectural layer of the application.
  - **`01-step-entities/`**: Generates TypeORM entities.
  - **`02-step-dtos/`**: Generates Data Transfer Objects (DTOs) for API communication.
  - **`03-step-services/`**: Generates business logic services.
  - **`04-step-auth/`**: Generates authentication and authorization logic (guards, strategies).
  - **`05-step-controllers/`**: Generates API controllers and endpoints.
  - **`06-step-app-config/`**: Generates the main application module and final configuration.
- **Root Documents**:
  - `README.md`: This guide.
  - `implementation-plan.md`: A detailed, step-by-step technical guide for the IDGL practitioner.
  - `strategic-plan.md`: The high-level business and strategic rationale for the project.
  - `architectural-design-rationale.md`: A deep dive into the "why" behind the dependency-driven generation strategy.

## 3. The Phased Execution Model

The implementation is divided into two primary phases to ensure a robust and predictable outcome.

### Phase 1: Scaffolding

This phase is about preparation. It does not generate any application logic. Its purpose is to create a stable, fully configured foundation for the next phase.

**Key Activities:**
- Initialize a new NestJS project.
- Install all required `npm` packages (`@nestjs/core`, `typeorm`, `passport`, etc.).
- Configure `ormconfig.json` and `.env` for database connectivity.
- Create empty module directories as placeholders.

### Phase 2: Generation

This is the core of the IDGL process. It executes a six-step dependency chain to generate the application's code. Each step is a discrete, automated task that takes a configuration file and a prompt as input and produces TypeScript code as output.

The order of generation is critical and enforced by the plan:
**Entities -> DTOs -> Services -> Auth -> Controllers -> App Config**

This sequence ensures that no component is generated before its dependencies are available, eliminating circular dependencies and ensuring a clean, verifiable build at each stage.

## 4. How to Use This Plan

1.  **Start with the `strategic-plan.md`** to understand the business goals.
2.  **Review the `architectural-design-rationale.md`** to understand the technical strategy.
3.  **Execute the `implementation-plan.md`** step-by-step to run the scaffolding and generation phases.
4.  **Validate** the output of each step against the success criteria defined in the `implementation-plan.md`.

By following this structured approach, an IDGL practitioner can reliably and efficiently guide an AI to generate the complete, `Spec`-compliant WishListShare backend.
