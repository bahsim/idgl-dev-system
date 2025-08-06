import React, { useState, useEffect } from 'react';
import { Product, ProductFilters, filterProducts } from './product.utils';

// This data would typically come from an API call in a real application.
const productData: Product[] = [
  { id: 1, name: 'Apple', category: 'Fruit', price: 1.2, inStock: true },
  { id: 2, name: 'Carrot', category: 'Vegetable', price: 0.5, inStock: true },
  { id: 3, name: 'Banana', category: 'Fruit', price: 0.8, inStock: false },
  { id: 4, name: 'Broccoli', category: 'Vegetable', price: 1.5, inStock: true },
  { id: 5, name: 'Orange', category: 'Fruit', price: 1.0, inStock: true },
];

export const ProductList = ({ filters }: { filters: ProductFilters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call and then filter data
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