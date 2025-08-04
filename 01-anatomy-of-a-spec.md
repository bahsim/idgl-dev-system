# The Anatomy of a Spec

## 1. Introduction: The Blueprint for Generation

This document provides the formal specification for authoring a high-quality Spec. The Spec is the engineering blueprint that guides the entire **[Generative Task](./02-the-generative-task.md)**. Its quality is the single greatest predictor of the quality of the final Digital Product.

A professional Spec is designed for two audiences: the human practitioner who must validate the output, and the AI that must generate it. It achieves this by providing clear, unambiguous answers to three fundamental questions.

## 2. The Objective: Defining the "What"

The Spec must begin with a clear, concise statement of the primary objective. This is the high-level summary of what the Generative Task is intended to produce.

**Example:**
> Create a reusable React hook named `useDebounce` that takes a value and a delay time, and returns the debounced value.

## 3. The Rationale: Explaining the "Why"

The Spec must provide the necessary context and constraints that inform the implementation. This section explains the "why" behind the "what," which is critical for both the AI and for future human maintainers.

*   **Business Rationale:** The business rules, goals, or user value that justify the task.
*   **Technical Constraints:** Required libraries, frameworks, coding standards, or architectural patterns.

**Example:**
> The hook will be used in our application's search bar to prevent excessive API calls while the user is typing. It must be written in TypeScript, use modern functional component patterns, and must not rely on any external libraries for the debouncing logic.

## 4. The Verification Criteria: Specifying the "How"

The Spec must contain a clear, verifiable checklist of requirements that the final artifact must satisfy. This makes the Spec an **executable contract** and is the primary tool for the **[Validation (Judgment) stage](./02-the-generative-task.md#3-the-idgl-cycle-the-universal-process-view)** of the IDGL Cycle.

**Example:**
> *   The hook must accept a generic `value` of type `T` and a `delay` in milliseconds.
> *   It must return a value of type `T`.
> *   The returned value must only update after the `delay` has passed without the input `value` changing.

## 5. Exemplars: Providing Concrete Guidance

Where possible, the Spec should include concrete examples of the desired usage or output. This is a powerful technique for improving the accuracy of the generative process.

**Example:**
> ### Example Usage
> ```tsx
> const App = () => {
>   const [searchTerm, setSearchTerm] = useState('');
>   const debouncedSearchTerm = useDebounce(searchTerm, 500);
>   // ...
> };
> ```

## 6. Spec Anti-Patterns: What to Avoid

A high-quality Spec is as much about avoiding ambiguity as it is about providing clarity. Practitioners should avoid the following common anti-patterns:

*   **Vagueness:** "Make a button." (Lacks context, constraints, and criteria.)
*   **Compound Objectives:** "Create the `useDebounce` hook and refactor the user profile page." (This should be two separate Generative Tasks with two separate Specs.)
*   **Implied Knowledge:** "Implement standard debounce logic." (The expected logic should be briefly described in the criteria.)
