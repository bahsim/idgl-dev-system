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
