# The Architect's Directive
This is the first artifact the Architect creates. It is not a formal, detailed `Spec`, but a simple, high-level **`Brief`**. Its purpose is to capture the core intent in natural language, providing a clear directive for the "Spec Compiler" AI agent that we will use in the next step.

---

**Objective:** Create a reusable React hook for fetching data from an API.

**Rationale:** We need to standardize how we fetch data in our application. Right now, every component does it differently, which leads to bugs and duplicated code. This hook will solve that by providing a single, reliable way to handle data fetching, including loading states, errors, and re-fetching.

**Core Requirements:**
- It should be called `useDataFetching`.
- It needs to take a URL string.
- It should return the `data`, a `loading` boolean, and an `error` object.
- It also needs to return a function to `refetch` the data.
- It must be written in TypeScript.
- It must have good test coverage.

**Example Usage:**

```tsx
function MyComponent() {
  const { data, loading, error, refetch } = useDataFetching('https://api.example.com/data');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={refetch}>Reload Data</button>
    </div>
  );
}
```
