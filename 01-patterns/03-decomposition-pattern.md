# Pattern: Decomposition

## What is Decomposition?

Decomposition is the act of breaking a single generative task into multiple smaller generative tasks.

## Why Decompose?

A single generative task may be too large to:
- Fit within AI context limits
- Be validated by a human in reasonable time
- Be generated reliably in one attempt
- Be debugged effectively if it fails

## When to Decompose?

Decompose when:
1. The task exceeds AI capability (context, reasoning)
2. The output exceeds human validation capacity
3. The task spans multiple domains requiring different expertise
4. Risk isolation is needed (critical components)

## How to Decompose?

### Step 1: Identify Natural Boundaries
Look for:
- Domain boundaries (frontend/backend, database/API)
- Logical separations (authentication/authorization)
- Risk boundaries (core features vs. enhancements)
- Validation boundaries (what can be tested independently)

### Step 2: Define Contracts
Each boundary needs a contract:
- API specifications
- Data schemas
- Interface definitions
- Test contracts

### Step 3: Create Task Sequence
Decide execution order:
- **Sequential**: Tasks depend on previous outputs
- **Parallel**: Tasks can run independently
- **Hybrid**: Some sequential, some parallel

## Example

**Original Task**: "Build a user authentication system"

**Decomposition**:
1. Design database schema for users and sessions
2. Create authentication service (login/logout)
3. Build login UI components
4. Add session management middleware
5. Write integration tests

**Contracts**:
- Database schema (between 1 and 2)
- Authentication API (between 2 and 3)
- Session interface (between 2 and 4)

## Anti-Patterns

- **Micro-decomposition**: Breaking into tasks too small to validate independently
- **Implicit contracts**: Assuming components will work together without explicit interfaces
- **Deep nesting**: Creating more than 2 levels of decomposition
- **Over-planning**: Spending more time planning than the tasks would take

## Success Criteria

A good decomposition:
- Each task is independently verifiable
- Contracts are explicit and stable
- Total coordination overhead is minimal
- All tasks can be completed successfully