# Mission: The `useDataFetching` Hook

## 1. The Challenge
In modern web applications, we frequently need to fetch data from an API. This requires handling loading states, errors, and caching. Writing this logic repeatedly is inefficient and a source of chaos.

## 2. The Mission Objective
Our objective for this mission is to solve this problem by architecting a reusable, robust, and well-tested React hook called `useDataFetching`.

## 3. The Architect's Requirements
As the Architect, you have defined the high-level requirements for this component.

The hook must:
- Take a URL as an input.
- Handle the three common states of a data request: `loading`, `success` (with data), and `error`.
- Provide a way to re-fetch the data on demand.
- Be written in TypeScript to ensure type safety.
- Be accompanied by a comprehensive suite of unit tests.

This scenario is a perfect generative task. It is complex enough to require a detailed contract but small enough to be validated in a single cycle.
