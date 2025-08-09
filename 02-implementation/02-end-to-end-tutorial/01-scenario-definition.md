# Tutorial Scenario: The `useDataFetching` Hook

## The Problem

In modern web applications, we frequently need to fetch data from an API. This often involves handling loading states, errors, and caching the results to avoid unnecessary network requests. Writing this logic repeatedly in many components is inefficient and error-prone.

## The Goal

Our goal for this tutorial is to solve this problem by creating a reusable, robust, and well-tested React hook called `useDataFetching`.

## High-Level Requirements

The desired hook should:
- Take a URL as an input.
- Handle the three common states of a data request: `loading`, `success` (with data), and `error`.
- Provide a way to re-fetch the data on demand.
- Be written in TypeScript to ensure type safety.
- Be accompanied by a comprehensive suite of unit tests.

This scenario is a perfect example of a **Generative Task** in the IDGL system. It is complex enough to require a detailed specification but small enough to be understood and validated in a single cycle.
