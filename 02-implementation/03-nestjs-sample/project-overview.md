# WishListShare Sample Project

This project demonstrates a complete, end-to-end generation of a NestJS backend using the **Intent-Driven Generative Lifecycle (IDGL)**.

## What this demonstrates

This project serves as an advanced example of the core IDGL workflow:

- **Concept-Driven Generation:** The `01-concept/` directory acts as the formal, human-readable **`Spec`** that defines the application's business logic, architecture, and domain models.
- **Configuration-as-Spec:** The `Spec` is translated into a machine-readable `platform-configuration.ts` file, making the intent executable.
- **Automated Lifecycle:** The process is managed by an execution script that guides an AI partner through scaffolding and implementation.
- **Human-AI Partnership:** The human provides strategic direction by authoring the `Spec` and configuration, while the AI performs the tactical work of code generation.

## Project Structure

### `01-concept/` - The Formal Spec (The "Why" and "What")
This directory contains the complete, human-authored `Spec`.
- `business-rules.md`: The core application logic.
- `domain-models.md`: Entity definitions and relationships.
- `architecture.md`: The high-level system design.
- `service-responsibilities.md`: Defines the roles of each service.

### `02-implementation/` - The Executable Plan (The "How")
This directory contains the machine-readable artifacts needed for generation.
- `platform-configuration.ts`: The single source of truth configuration, translating the `Spec` for the AI.
- `execution-commands.sh`: The script containing the sequence of prompts and commands to generate the application.

## How to Execute

**Prerequisites:** Node.js, NestJS CLI, PostgreSQL with `nest_project` database.

**Step 1: Generation**
This step uses the implementation artifacts to guide an AI in generating the source code.
```bash
# The commands in 02-implementation/execution-commands.sh would be run
# to generate the source code into a `generated-src/` directory.
sh ./02-implementation/execution-commands.sh
```

**Step 2: Validation**
Once generated, the application is run and tested against the `Spec`.
```bash
cd generated-src/
npm install
npm run start:dev
# Further validation would occur here (e.g., running e2e tests)
```

## Expected Outcome

A complete, working NestJS backend that perfectly implements the business logic from the `Spec`, including:
- JWT authentication and user management.
- Complex wish and offer management with transactional integrity.
- All data relationships, validation, and architectural patterns as defined in the conceptual documents.

This project proves that a comprehensive `Spec` can be used to systematically and reliably generate a complex software system. 