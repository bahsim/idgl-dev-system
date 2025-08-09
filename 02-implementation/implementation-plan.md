# WishListShare Backend: Step-by-Step Implementation Plan

## 1. Introduction

This document provides a detailed, step-by-step technical guide for an IDGL practitioner to execute the automated generation of the WishListShare NestJS backend. Follow each step precisely.

**Prerequisites:**
- Node.js and `npm` installed.
- NestJS CLI installed (`npm i -g @nestjs/cli`).
- Access to a PostgreSQL database.
- An AI code generation agent capable of executing instructions from `.md` prompts and `.ts` configuration files.

---

## **Phase 1: Scaffolding**

**Goal:** Create a new, empty NestJS project and configure it with all necessary dependencies and connections.

### **Step 1.1: Initialize NestJS Project**
- **Action:** Create a new NestJS project named `wishlist-share-be`.
- **Command:**
  ```bash
  nest new wishlist-share-be --strict --package-manager npm
  ```
- **Validation:**
  ```bash
  cd wishlist-share-be
  npm run start:dev
  ```
- **Success Criteria:** The application starts successfully and is accessible at `http://localhost:3000`.

### **Step 1.2: Install Core Dependencies**
- **Action:** Install all required libraries for database interaction, configuration, authentication, and validation.
- **Command:**
  ```bash
  npm install @nestjs/config typeorm @nestjs/typeorm postgres class-validator class-transformer @nestjs/passport passport passport-local @nestjs/jwt passport-jwt bcrypt
  npm install -D @types/passport-local @types/passport-jwt @types/bcrypt
  ```
- **Validation:**
  ```bash
  cat package.json
  ```
- **Success Criteria:** The `dependencies` and `devDependencies` sections of `package.json` contain all the packages listed above.

### **Step 1.3: Configure Database Connection**
- **Action:** Create the `.env` file for environment variables and the TypeORM configuration file.
- **`.env` File Creation:** Create a `.env` file in the project root with the following content:
  ```env
  POSTGRES_HOST=localhost
  POSTGRES_PORT=5432
  POSTGRES_USER=student
  POSTGRES_PASSWORD=student
  POSTGRES_DB=nest_project
  JWT_SECRET=your-very-secret-key
  ```
- **`ormconfig.ts` Creation:** Create `src/config/ormconfig.ts` to load database settings from the environment.
- **Validation:**
  - Check that the `.env` file exists and has the correct content.
  - The application should still start successfully.
- **Success Criteria:** Database credentials are externalized from the codebase and can be loaded by a configuration module.

---

## **Phase 2: Generation**

**Goal:** Systematically generate the application's code layer-by-layer, following a strict dependency order. For each step, you will instruct an AI agent using the provided prompt and configuration file.

### **Step 2.1: Generate Entities**
- **Directory:** `01-step-entities/`
- **Action:** Instruct the AI to generate the TypeORM entities (`User`, `Wish`, `Wishlist`, `Offer`) based on `domain-models.md`.
- **Command:** `[AI Agent Command] --prompt 01-step-entities/entities-generation-prompt.md --config 01-step-entities/entities-generation-config.ts`
- **Validation:**
  - Check that `src/entities/user.entity.ts`, `src/entities/wish.entity.ts`, etc., have been created.
  - The generated files must compile without errors (`npm run build`).
- **Success Criteria:** All entity files are created with the correct fields, types, relationships, and validation decorators as specified in the `Spec`.

### **Step 2.2: Generate DTOs**
- **Directory:** `02-step-dtos/`
- **Action:** Generate the Data Transfer Objects for each entity.
- **Command:** `[AI Agent Command] --prompt 02-step-dtos/dtos-generation-prompt.md --config 02-step-dtos/dtos-generation-config.ts`
- **Validation:**
  - Check for new `dto` subdirectories within each module folder (e.g., `src/users/dto/`).
  - The DTO files must compile without errors.
- **Success Criteria:** DTOs for `create`, `update`, and `response` are generated for each entity, correctly inheriting or omitting fields from the base entities.

### **Step 2.3: Generate Services**
- **Directory:** `03-step-services/`
- **Action:** Generate the service classes that contain the core business logic.
- **Command:** `[AI Agent Command] --prompt 03-step-services/services-generation-prompt.md --config 03-step-services/services-generation-config.ts`
- **Validation:**
  - `*.service.ts` files should be populated with methods that implement the business rules from `business-rules.md`.
  - The project must still compile.
- **Success Criteria:** Services are generated with correct dependency injection of repositories and implement all required business logic, including authorization checks and transactional operations.

### **Step 2.4: Generate Auth Module**
- **Directory:** `04-step-auth/`
- **Action:** Generate the authentication strategies, guards, and module.
- **Command:** `[AI Agent Command] --prompt 04-step-auth/auth-generation-prompt.md --config 04-step-auth/auth-generation-config.ts`
- **Validation:**
  - Check for `src/auth/guards/`, `src/auth/strategies/`.
  - The files must implement `JwtStrategy`, `LocalStrategy`, and `JwtAuthGuard`.
- **Success Criteria:** A complete `AuthModule` is generated that handles user registration, login, and JWT-based session management.

### **Step 2.5: Generate Controllers**
- **Directory:** `05-step-controllers/`
- **Action:** Generate the API controllers to expose the service logic via RESTful endpoints.
- **Command:** `[AI Agent Command] --prompt 05-step-controllers/controllers-generation-prompt.md --config 05-step-controllers/controllers-generation-config.ts`
- **Validation:**
  - `*.controller.ts` files should be populated with `@Get`, `@Post`, `@Patch`, `@Delete` handlers.
  - Endpoints must be protected by the appropriate auth guards.
- **Success Criteria:** Controllers are generated with all endpoints defined in `controller-endpoints.md`, correctly using DTOs for validation and delegating logic to the services.

### **Step 2.6: Generate App Configuration**
- **Directory:** `06-step-app-config/`
- **Action:** Generate the final `app.module.ts` to tie all generated modules together.
- **Command:** `[AI Agent Command] --prompt 06-step-app-config/app-config-generation-prompt.md --config 06-step-app-config/app-config-generation-config.ts`
- **Validation:**
  - `npm run start:dev`
- **Success Criteria:** The final application starts without errors. All modules are correctly imported, and the API is fully functional and ready for testing.
