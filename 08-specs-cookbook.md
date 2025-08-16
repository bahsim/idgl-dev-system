# The Architect's Prompt Cookbook

This document is a library of sophisticated, real-world prompt scenarios for the IDGL. While the main `README.md` provides basic examples, this cookbook contains comprehensive, multi-turn dialogues that demonstrate how to chain agent roles and communication plays together to solve complex engineering tasks.

An Architect does not just send a single command; they orchestrate a conversation. This cookbook is your guide to mastering that orchestration.

---

## Chapter 1: Strategic Planning & Decomposition

**Scenario:** You have been given a large, high-level requirement: "Build a notification system for our application." This is an "Epic," and it's too large to be a single `Spec`. Your goal is to use the AI as a planning partner to decompose this Epic into a manageable set of sub-`Specs`.

### Play 1: Initiating the Decomposition

First, you activate the `Decomposition Specialist` and provide the high-level Epic.

> **Architect:** "Act as a Decomposition Specialist. I have a new Epic `Spec` for us to plan.
>
> **Objective:** Build a notification system for the application.
> **Rationale:** Users need to receive real-time updates for important events (e.g., new messages, task assignments). The system must be scalable and support multiple delivery channels.
> **Verification Criteria:**
> 1. A user can receive a notification via email.
> 2. A user can receive a notification via an in-app toast message.
> 3. The system can handle 1,000 notifications per minute with less than 5 seconds of latency."
>
> Your task is to analyze this Epic and propose a high-level decomposition of the major components we will need to build. Think in terms of logical seams like API, services, and data models. Propose an initial plan and a dependency graph.

### Play 2: Refining the AI's Plan

The AI will likely return a reasonable first draft. Now, you use the **Socratic Refinement** and **Trade-off Analysis** communication plays to stress-test its plan and improve it.

> **Architect:** "That's a good start. I see you've identified a `NotificationService`, an `EmailService`, and a `RealtimeService`.
>
> Now, introduce a trade-off analysis for the `RealtimeService`. Compare two potential solutions: using WebSockets directly vs. using a third-party service like Pusher or Ably. For each, provide a paragraph of arguments for and against, focusing on scalability and maintenance overhead. Then, recommend one and justify your choice."

### Play 3: Finalizing the Dependency Graph

After a few turns of refinement, you ask the AI to produce the final, authoritative plan that will guide the rest of the development.

> **Architect:** "Excellent. We'll go with the managed Pusher service for now.
>
> Based on our entire conversation, please produce the final Decomposition Plan. The output must be a markdown document. It must include a brief overview of our chosen strategy and a Mermaid diagram showing the final dependency graph of all components we need to build. List the proposed sub-`Specs` in the order they should be built."

This multi-turn conversation uses the AI to transform a vague, high-level idea into a concrete, actionable, and architecturally sound development plan.

---

## Chapter 2: `Spec` Authoring & Refinement

**Scenario:** From the decomposition plan in Chapter 1, the first component to build is the `Notification` data model and its database schema. You have a high-level idea, but it's not yet a formal `Spec`. Your goal is to use the AI as a meticulous partner to forge this idea into a bulletproof contract.

### Play 1: Providing the Initial `Brief`

You begin by activating the `Spec Compiler` (the AI's default mode) and providing your initial, informal `Brief`.

> **Architect:** "Let's create the `Spec` for the `Notification` data model.
>
> **Brief:** We need a database table to store notifications. It should include fields for a recipient, the message content, a status to see if it's been read, and timestamps."

### Play 2: Engaging in the Clarification Dialogue

The AI, acting as a `Spec Compiler`, will immediately recognize the ambiguity in the `Brief` and initiate a clarifying dialogue. Your role is to answer its questions, which are designed to elicit the information needed for a complete `Spec`.

> **AI (as Spec Compiler):** "That's a clear starting point. To create a formal `Spec`, I have a few clarifying questions:
> 1.  **Recipient:** What is the data type for the 'recipient'? Should this be a user ID (e.g., a UUID), an email address, or something else?
> 2.  **Content:** What is the expected maximum length for the message content? Should we use a standard `TEXT` type?
> 3.  **Status:** What are the specific possible values for the 'status' field? For example, `['UNREAD', 'READ', 'ARCHIVED']`?
> 4.  **Verification:** This is the most critical part. How will we verify this is correct? Should we specify that the database migration must run successfully and that we can perform CRUD operations on a sample `Notification` object?"

### Play 3: Authoring the Final `Spec`

Once you have answered the AI's questions, you command it to produce the final, formal `Spec`.

> **Architect:** "Excellent questions.
> 1.  Recipient should be a `user_id` of type UUID.
> 2.  Content can be `TEXT`.
> 3.  Status should be an enum with the values `['SENT', 'DELIVERED', 'READ']`. The default should be `SENT`.
> 4.  For verification, you are correct. The migration must pass, and we must verify that a test script can successfully create, read, update (from `READ` to `UNREAD`), and delete a notification record.
>
> Now, please draft the complete, formal `Spec` based on our discussion. The output must be a markdown document with the three required sections: Objective, Rationale, and Verification Criteria."

This process uses the AI to enforce discipline, ensuring that no work begins until the intent has been clarified, formalized, and made verifiable.

---

## Chapter 3: High-Fidelity Code Generation

**Scenario:** The `Spec` for the `Notification` data model from Chapter 2 has been approved. Now, your goal is to use the AI to generate the actual database migration script. You will use the **Output Contract** play to ensure the AI produces exactly the file you need.

### Play 1: Invoking the Code Generator with Constraints

You activate the `Code Generator` and provide it with the approved `Spec`. Crucially, you add a set of explicit constraints to the prompt to guide the AI's output and ensure it adheres to your project's standards.

> **Architect:** "Act as a Code Generator. The `Spec` for the `Notification` data model is approved. Please generate the artifact.
>
> **Spec:**
> *   **Objective:** Create a database migration script for the `Notification` table.
> *   **Rationale:** To persist notification data as defined in our plan.
> *   **Verification Criteria:**
>     1.  The migration script must run successfully on a PostgreSQL 14 database.
>     2.  A test script can successfully create, read, update, and delete a notification record.
>     3.  The `status` column must have a default value of `'SENT'`.
>
> **Constraints (Output Contract):**
> *   The output must be a single SQL file.
> *   Use the `CREATE TYPE` statement for the `notification_status` enum.
> *   The table name must be `notifications` (plural).
> *   Include `created_at` and `updated_at` timestamp columns with automatic update functionality.
> *   All identifiers must be in `snake_case`.
> *   Include comments explaining the purpose of the primary key and the indexes.
>
> Please generate the SQL migration script now."

By providing not just the "what" (the `Spec`) but also the "how" (the `Constraints`), the Architect dramatically increases the probability of getting a perfect, ready-to-use artifact on the first try. This is the essence of high-fidelity generation.

---

## Chapter 4: Legacy Code Onboarding & Analysis

**Scenario:** You have inherited a critical but undocumented legacy file: `utils/auth.js`. Before you can safely refactor it, you must bring it under the control of the IDGL. Your goal is to use the AI to reverse-engineer a `Spec` and create a comprehensive understanding of the component.

### Play 1: Initial Code Analysis

You begin by using the `Code Analyst` to get a high-level overview of the file's public interface. This gives you a starting point for understanding.

> **Architect:** "Act as a Code Analyst. I have a legacy file at `utils/auth.js` that I need to understand. First, provide a report on its public API. The report should be a markdown table with columns for `Function Name`, `Parameters`, and a one-sentence `Inferred Purpose`."

### Play 2: Reverse-Engineering the `Spec`

With the public API mapped, you now invoke the `Legacy Spec Generator` to create the "missing blueprint" for the file.

> **Architect:** "Thank you. Now, act as a Legacy Spec Generator. Using your previous analysis and a deep reading of the file's implementation, reverse-engineer a formal `Spec` for `utils/auth.js`.
>
> Your output must be a complete `Spec.md` file. Pay close attention to the internal logic to infer the original `Verification Criteria`. Since there are no tests, you must acknowledge this. Add a 'Confidence Level' section at the bottom of the `Spec` and rate your confidence in the inferred verification criteria as 'Medium', explaining that the lack of tests is the primary reason."

### Play 3: Planning the Refactor

Now that you have a `Spec` that represents the *current* state of the code, you can use it as the foundation for a safe refactoring effort.

> **Architect:** "Excellent. We now have a `Spec` for the legacy component.
>
> Now, let's switch roles. Act as a `Spec Compiler`. I am providing the legacy `Spec` as our starting point. Our objective is to create a *new* `Spec` for a refactored version of this component. The new version must be converted to TypeScript and use ES modules. All functions should have explicit return types, and the `jwt.sign` callback must be converted to an `async/await` promise.
>
> Please generate a new, refactored `Spec` that reflects these changes. The `Verification Criteria` should be updated to include type-checking as a new requirement."

This workflow demonstrates how the Architect uses multiple AI roles in a structured sequence to safely and methodically bring a legacy system under the control and discipline of the IDGL.

---

## Chapter 5: Advanced Conversational Scenarios

**Scenario:** You need to build a new feature: a rate limiter for your API. This involves creating the middleware, updating the configuration, and ensuring it's all done in a way that is both secure and performant. This is a complex task that will require you to fluidly switch between multiple AI roles in a single conversation.

### The Continuous Dialogue

This is not a series of separate plays, but a single, flowing conversation.

> **Architect:** "I need to build a rate-limiting middleware for our Express.js API. Before we do anything, **act as a Decomposition Specialist**. What are the core components and tasks we need to consider for this feature? I'm thinking about the middleware itself, configuration, and how to apply it to specific routes."
>
> **AI (as Decomposition Specialist):** "Understood. For a rate-limiting feature, I propose the following components:
> 1.  **Configuration:** A file (`config/rate-limiter.js`) to define settings like window size, max requests, etc.
> 2.  **Middleware Logic:** A file (`middleware/rateLimiter.js`) containing the actual rate-limiting logic, likely using a library like `express-rate-limit`.
> 3.  **Route Application:** A strategy for applying the middleware to either all routes or specific, sensitive routes.
>
> The dependency is: `Configuration` -> `Middleware Logic` -> `Route Application`."
>
> **Architect:** "Perfect. Let's start with the configuration. **Act as a Spec Compiler.** Here's the `Brief`: The configuration should allow setting a `windowMs` (in milliseconds), a `max` number of requests, and a `message` to return when the limit is exceeded.
>
> Now, engage me in a clarification dialogue to turn this into a formal `Spec`. Focus on the verification criteria."
>
> **AI (as Spec Compiler):** "To formalize this, I need to know:
> 1.  What should the default values be for `windowMs` and `max`?
> 2.  For verification, should we confirm that the exported configuration object has the correct keys and that the default values are applied when not overridden by environment variables?"
>
> **Architect:** "Defaults: `windowMs` = 60000, `max` = 100. Verification is correct. Draft the formal `Spec`."
>
> *(The AI drafts the Spec, and the Architect approves it)*
>
> **Architect:** "The `Spec` for the configuration is approved. Now, **act as a Code Generator.** Generate the `config/rate-limiter.js` file.
>
> **Constraints:** The configuration must be loaded from environment variables (`RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX_REQUESTS`) with the defaults we specified as fallbacks. The file must export a single configuration object."
>
> *(The AI generates the configuration file)*
>
> **Architect:** "Excellent. Now for the final piece. **Act as a Code Analyst.** The main API router is in `routes/api.js`. Please analyze this file and give me a list of all the POST routes, as we only want to apply the rate limiter to them."
>
> *(The AI provides the list of POST routes)*
>
> **Architect:** "Thank you. This has been a productive session. We have successfully planned the feature, specified the configuration, generated the code for it, and identified the exact locations for its application. We are now ready for implementation."

This single, fluid conversation seamlessly moved from high-level planning to detailed `Spec` compilation, to code generation, and finally to static analysis, all orchestrated by the Architect's clear, role-based commands. This is the pinnacle of the IDGL workflow.
