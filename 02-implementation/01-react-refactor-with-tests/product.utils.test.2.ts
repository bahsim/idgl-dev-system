import { filterProducts, Product, ProductFilters } from './product.utils';

const mockProducts: Product[] = [
  { id: 1, name: 'Apple', category: 'Fruit', price: 1.2, inStock: true },
  { id: 2, name: 'Carrot', category: 'Vegetable', price: 0.5, inStock: true },
  { id: 3, name: 'Banana', category: 'Fruit', price: 0.8, inStock: false },
  { id: 4, name: 'Broccoli', category: 'Vegetable', price: 1.5, inStock: true },
  { id: 5, name: 'Orange', category: 'Fruit', price: 1.0, inStock: true },
  { id: 6, name: 'Cabbage', category: 'Vegetable', price: 0, inStock: true },
];

describe('filterProducts', () => {
  it('should return all products when filters are empty', () => {
    const result = filterProducts(mockProducts, {});
    expect(result).toHaveLength(6);
    expect(result).toEqual(mockProducts);
  });

  it('should return an empty array if the input product list is empty', () => {
    const result = filterProducts([], { category: 'Fruit' });
    expect(result).toHaveLength(0);
  });

  it('should filter by category "Fruit"', () => {
    const result = filterProducts(mockProducts, { category: 'Fruit' });
    expect(result).toHaveLength(3);
    expect(result.every(p => p.category === 'Fruit')).toBe(true);
  });

  it('should filter by category "Vegetable"', () => {
    const result = filterProducts(mockProducts, { category: 'Vegetable' });
    expect(result).toHaveLength(3);
    expect(result.every(p => p.category === 'Vegetable')).toBe(true);
  });

  it('should filter by maxPrice', () => {
    const result = filterProducts(mockProducts, { maxPrice: 1.0 });
    expect(result).toHaveLength(4); // Apple and Broccoli are > 1.0
    expect(result.map(p => p.name)).toEqual(['Carrot', 'Banana', 'Orange', 'Cabbage']);
  });

  it('should correctly filter by maxPrice of 0', () => {
    const result = filterProducts(mockProducts, { maxPrice: 0 });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Cabbage');
  });

  it('should filter by inStockOnly', () => {
    const result = filterProducts(mockProducts, { inStockOnly: true });
    expect(result).toHaveLength(5); // Banana is not in stock
    expect(result.every(p => p.inStock)).toBe(true);
  });

  it('should combine category and maxPrice filters', () => {
    const result = filterProducts(mockProducts, { category: 'Fruit', maxPrice: 1.0 });
    expect(result).toHaveLength(2); // Apple (1.2) is excluded
    expect(result.map(p => p.name)).toEqual(['Banana', 'Orange']);
  });

  it('should combine category and inStockOnly filters', () => {
    const result = filterProducts(mockProducts, { category: 'Fruit', inStockOnly: true });
    expect(result).toHaveLength(2); // Banana (out of stock) is excluded
    expect(result.map(p => p.name)).toEqual(['Apple', 'Orange']);
  });

  it('should combine maxPrice and inStockOnly filters', () => {
    const result = filterProducts(mockProducts, { maxPrice: 0.8, inStockOnly: true });
    expect(result).toHaveLength(2); // Banana (out of stock) and Cabbage(0) are included initially, then banana removed
    expect(result.map(p => p.name)).toEqual(['Carrot', 'Cabbage']);
  });

  it('should combine all filters', () => {
    const result = filterProducts(mockProducts, { category: 'Vegetable', maxPrice: 1.0, inStockOnly: true });
    expect(result).toHaveLength(2); // Broccoli (1.5) is excluded
    expect(result.map(p => p.name)).toEqual(['Carrot', 'Cabbage']);
  });
});