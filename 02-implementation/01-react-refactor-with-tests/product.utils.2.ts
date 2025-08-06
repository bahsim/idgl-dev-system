export interface Product {
  id: number;
  name: string;
  category: 'Fruit' | 'Vegetable';
  price: number;
  inStock: boolean;
}

export interface ProductFilters {
  category?: 'Fruit' | 'Vegetable';
  maxPrice?: number;
  inStockOnly?: boolean;
}

/**
 * Filters an array of products based on the provided criteria.
 * @param products The array of products to filter.
 * @param filters An object containing the filtering criteria.
 * @returns A new array of products that match the criteria.
 */
export const filterProducts = (products: Product[], filters: ProductFilters): Product[] => {
  let filteredProducts = [...products];

  if (filters.category) {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }

  // Handle maxPrice, allowing for a value of 0.
  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
  }

  if (filters.inStockOnly) {
    filteredProducts = filteredProducts.filter(p => p.inStock);
  }

  return filteredProducts;
};