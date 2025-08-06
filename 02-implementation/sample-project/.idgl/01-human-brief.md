# Brief: Refactor Product Filtering Logic

The `ProductList` component in `01-before-refactor.tsx` has some filtering logic directly inside its `useEffect` hook. This is hard to test and reuse.

Please refactor it:
1.  Create a new utility file for a standalone `filterProducts` function.
2.  Move the filtering logic into that function.
3.  Update the `ProductList` component to import and use the new function instead.
