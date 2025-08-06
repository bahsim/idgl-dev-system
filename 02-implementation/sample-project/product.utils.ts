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
