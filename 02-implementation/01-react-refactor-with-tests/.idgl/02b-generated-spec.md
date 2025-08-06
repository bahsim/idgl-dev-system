# Spec: Refactor Product Filtering Logic

## 1. Objective (The "What")

Extract the product filtering logic from the `ProductList` component into a dedicated, pure utility function. Co-locate related data types (`Product`, `ProductFilters`) and mock data with this new function to create a self-contained, reusable, and testable module.

## 2. Rationale (The "Why")

The current product filtering logic is tightly coupled with the `ProductList` component's rendering lifecycle (`useEffect` hook). This implementation violates the Single Responsibility Principle, making the logic difficult to test in isolation and impossible to reuse elsewhere.

By extracting this logic into a pure utility function, we decouple business logic from the view layer. This architectural improvement enhances modularity, simplifies testing, and improves the overall maintainability and scalability of the codebase. Moving the associated type definitions and mock data into the new module further improves separation of concerns.

## 3. Verification Criteria (The "How")

### 3.1. File Creation: `src/product.utils.ts`

*   [ ] Create a new file named `product.utils.ts` in a `src` directory (or appropriate location).

### 3.2. Define Data Structures in `src/product.utils.ts`

*   [ ] Move the `Product` interface definition from `ProductList.tsx` into `src/product.utils.ts` and export it.
*   [ ] Move the `ProductFilters` interface definition from `ProductList.tsx` into `src/product.utils.ts` and export it.
*   [ ] Move the `productData` array from `ProductList.tsx` into `src/product.utils.ts` and export it.

### 3.3. Implement Utility Function in `src/product.utils.ts`

*   [ ] Create and export a new pure function `filterProducts` with the signature: `(products: Product[], filters: ProductFilters): Product[]`.
*   [ ] The `filterProducts` function must accept an array of `Product` objects and a `ProductFilters` object as arguments.
*   [ ] Implement the filtering logic inside `filterProducts` to handle `category`, `maxPrice`, and `inStockOnly` conditions correctly.
*   [ ] The function must return a new array of `Product` objects that match the applied filters.

### 3.4. Refactor `ProductList.tsx`

*   [ ] Remove the `Product`, `ProductFilters`, and `productData` definitions from `ProductList.tsx`.
*   [ ] Add an import statement to bring in `Product`, `productData`, and `filterProducts` from `./product.utils.ts`.
*   [ ] In the `useEffect` hook, replace the inline filtering logic with a single call to the `filterProducts` utility function, passing `productData` and `filters` as arguments.
*   [ ] The `useState` for `products` should now be initialized with `useState<Product[]>([])`.
*   [ ] The component's props type definition should be updated to `({ filters }: { filters: ProductFilters })`, importing `ProductFilters` from the new utility file.

## 4. Exemplars (Concrete Guidance)

### New File: `src/product.utils.ts`

```typescript
export interface Product {
  id: number;
  name: string;
  category: 'Fruit' | 'Vegetable';
  price: number;
  inStock: boolean;
}

export const productData: Product[] = [
  { id: 1, name: 'Apple', category: 'Fruit', price: 1.2, inStock: true },
  { id: 2, name: 'Carrot', category: 'Vegetable', price: 0.5, inStock: true },
  { id: 3, name: 'Banana', category: 'Fruit', price: 0.8, inStock: false },
  { id: 4, name: 'Broccoli', category: 'Vegetable', price: 1.5, inStock: true },
  { id: 5, name: 'Orange', category: 'Fruit', price: 1.0, inStock: true },
];

export interface ProductFilters {
  category?: 'Fruit' | 'Vegetable';
  maxPrice?: number;
  inStockOnly?: boolean;
}

export const filterProducts = (products: Product[], filters: ProductFilters): Product[] => {
  let filteredProducts = products;

  if (filters.category) {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }
  if (filters.maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
  }
  if (filters.inStockOnly) {
    filteredProducts = filteredProducts.filter(p => p.inStock);
  }

  return filteredProducts;
};
```

### Modified File: `ProductList.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { Product, ProductFilters, productData, filterProducts } from './product.utils';

export const ProductList = ({ filters }: { filters: ProductFilters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      const filteredProducts = filterProducts(productData, filters);
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
```
```