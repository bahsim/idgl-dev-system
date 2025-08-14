# The Architect's Contract: `useDataFetching` Hook

This document is the formal, AI-compiled `Spec` for the `useDataFetching` hook. It is the **executable contract** that the Architect will use to command the AI. It was derived from the Architect's initial `Brief` and has been enriched with the detailed verification criteria required to ensure a robust and predictable outcome.

## 1. Objective
Create a reusable, type-safe, and well-tested React hook named `useDataFetching` that standardizes API data fetching within the application.

## 2. Rationale
**Business Rationale:** To improve developer productivity, reduce bugs, and ensure a consistent user experience by standardizing the logic for handling data fetching, loading states, and errors.

**Technical Constraints:**
- Must be a React hook, implemented as a function.
- Must be written in TypeScript.
- Must use the built-in `fetch` API for network requests.
- Must not have any external runtime dependencies (e.g., `axios`, `swr`).
- The code style must follow modern React patterns (e.g., functional components, hooks).

## 3. Verification Criteria (The "Proof")
This is the proof the AI must provide to demonstrate that the contract has been fulfilled.

### 3.1. Functional Requirements

- [ ] **FR1: Signature:** The hook must have the signature `useDataFetching<T>(url: string): State<T>`.
- [ ] **FR2: Generic Type:** The hook must accept a generic type `T` that defines the expected shape of the data.
- [ ] **FR3: State Interface:** The hook must return an object that conforms to the following `State<T>` interface:
    ```typescript
    interface State<T> {
      data: T | null;
      loading: boolean;
      error: Error | null;
      refetch: () => void;
    }
    ```
- [ ] **FR4: Initial State:** On initial render, the hook must return `{ data: null, loading: true, error: null, refetch: [function] }`.
- [ ] **FR5: Success State:** Upon a successful API response, the hook must update its state to `{ data: [response data], loading: false, error: null, ... }`.
- [ ] **FR6: Error State:** If the network request fails (e.g., 4xx or 5xx response, network error), the hook must update its state to `{ data: null, loading: false, error: [Error object], ... }`.
- [ ] **FR7: Refetch Functionality:** The returned `refetch` function, when called, must re-trigger the data fetching process, setting the state back to `loading: true`.

### 3.2. Non-Functional Requirements

- [ ] **NFR1: Cleanup:** The hook must clean up any pending `fetch` requests or timers when the component that uses it unmounts to prevent memory leaks and race conditions. (Hint: Use a `useEffect` cleanup function).
- [ ] **NFR2: Race Condition Prevention:** The hook must be robust against race conditions. If the `url` prop changes while a request is in flight, the hook should discard the result of the old request and only use the result of the request for the new `url`.

### 3.3. Testing Requirements

A suite of unit tests must be provided that validates the following scenarios:
- [ ] **TR1: Initial State:** The hook returns the correct initial state.
- [ ] **TR2: Success Case:** The hook correctly fetches data and enters the success state.
- [ ] **TR3: Error Case:** The hook correctly handles a failed request and enters the error state.
- [ ] **TR4: Loading State:** The `loading` flag is correctly managed throughout the lifecycle of the request.
- [ ] **TR5: Refetch Logic:** The `refetch` function correctly re-triggers a data fetch.
- [ ] **TR6: Unmount Cleanup:** The hook correctly cancels pending requests when the component unmounts. (This may require mocking).
