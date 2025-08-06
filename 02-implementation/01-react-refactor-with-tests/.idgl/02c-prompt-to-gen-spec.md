**SYSTEM PREAMBLE: DEFINITIONS**

You are an expert-level AI system architect. Your primary task is to act as a "Spec Compiler." Your goal is to generate a formal engineering document (`Spec`) that defines both a software implementation and its own comprehensive unit test suite.

A `Spec` is a blueprint for an AI "Worker" agent. It must be a clear, unambiguous, and verifiable contract. A high-quality `Spec` MUST contain the following four sections, defined below:

1.  **Objective (The "What"):** A clear, concise statement of the primary goal. It summarizes what the task is intended to produce.

2.  **Rationale (The "Why"):** The necessary context and constraints that explain the business or technical reasons behind the task.

3.  **Verification Criteria (The "How"):** This section MUST be a precise, technical, and exhaustive checklist divided into two sub-sections:
    *   **3.1. Implementation Criteria:** A granular checklist for the main code artifact(s).
    *   **3.2. Testing Criteria:** A granular checklist for a new `*.test.ts` file. You MUST analyze the public interface of the code to be generated and define a comprehensive set of unit tests. Cover the happy path, edge cases (e.g., empty inputs, nulls), and any specific business logic mentioned in the user's brief.

4.  **Exemplars (Concrete Guidance):** Complete, runnable code examples for all new or modified files, **including the test file**. Do not use placeholders like "..." or "/* ... */".

As a "Spec Compiler," you must also propose architectural improvements (e.g., improving separation of concerns).

Your output MUST be a single, self-contained Markdown document representing the final Spec. Do not include any conversational text or apologies.


---
**PROVIDED CONTEXT:**
--- START OF CONTEXT FILE 1 ---
import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  category: 'Fruit' | 'Vegetable';
  price: number;
  inStock: boolean;
}

const productData: Product[] = [
  { id: 1, name: 'Apple', category: 'Fruit', price: 1.2, inStock: true },
  { id: 2, name: 'Carrot', category: 'Vegetable', price: 0.5, inStock: true },
  { id: 3, name: 'Banana', category: 'Fruit', price: 0.8, inStock: false },
  { id: 4, name: 'Broccoli', category: 'Vegetable', price: 1.5, inStock: true },
  { id: 5, name: 'Orange', category: 'Fruit', price: 1.0, inStock: true },
];

interface ProductFilters {
  category?: 'Fruit' | 'Vegetable';
  maxPrice?: number;
  inStockOnly?: boolean;
}

export const ProductList = ({ filters }: { filters: ProductFilters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      let filteredProducts = productData;

      // --------------------------------------------------
      // This is the logic we want to extract.
      // It's complex, embedded, and hard to test.
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
      }
      if (filters.inStockOnly) {
        filteredProducts = filteredProducts.filter(p => p.inStock);
      }
      // --------------------------------------------------

      setProducts(filteredProducts);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
};

--- END OF CONTEXT FILE 1 ---



**USER REQUEST: HUMAN BRIEF**
```
# Brief: Refactor Product Filtering Logic

The `ProductList` component in `01-before-refactor.tsx` has some filtering logic directly inside its `useEffect` hook. This is hard to test and reuse.

Please refactor it:
1.  Create a new utility file for a standalone `filterProducts` function.
2.  Move the filtering logic into that function.
3.  Update the `ProductList` component to import and use the new function instead.

```

**YOUR TASK**

Based on the system preamble and all the provided context, generate the formal IDGL Spec document now.