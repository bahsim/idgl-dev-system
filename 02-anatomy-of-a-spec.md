# A Specification for Authoring Specs

## 1. Introduction: The Blueprint for Generation

This document provides the formal specification for authoring a high-quality Spec. The Spec is the blueprint that guides the entire **[Generative Task](./01-the-generative-task.md)**. Its quality is the single greatest predictor of the quality of the final Digital Product.

A professional Spec is an engineering document designed for two audiences: the human practitioner who must validate the output, and the AI that must generate it. It achieves this by providing clear, unambiguous answers to three fundamental questions.

## 2. The Objective: Defining the "What"

The Spec must begin with a clear, concise statement of the primary objective. This is the high-level summary of what the Generative Task is intended to produce.

**Example:**
> Create a reusable React hook named `useDebounce` that takes a value and a delay time, and returns the debounced value.

## 3. The Rationale: Explaining the "Why"

The Spec must provide the necessary context and constraints that inform the implementation. This section explains the "why" behind the "what," which is critical for both the AI and future human maintainers.

*   **Business Rationale:** The business rules, goals, or user value that justify the task.
*   **Technical Constraints:** Required libraries, frameworks, coding standards, or architectural patterns.

**Example:**
> The hook will be used in our application's search bar to prevent excessive API calls while the user is typing. It must be written in TypeScript, use modern functional component patterns, and must not rely on any external libraries for the debouncing logic.

## 4. The Verification Criteria: Specifying the "How"

The Spec must contain a clear, verifiable checklist of requirements that the final artifact must satisfy. This makes the Spec an executable contract and is the primary tool for the **[Validation Stage](./01-the-generative-task.md#3-the-idgl-cycle-the-execution-engine)**.

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
