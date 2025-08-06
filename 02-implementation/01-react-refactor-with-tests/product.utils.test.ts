import { filterProducts, productData, ProductFilters } from './product.utils';

describe('filterProducts', () => {
  it('should return all products when no filters are applied', () => {
    const filters: ProductFilters = {};
    const result = filterProducts(productData, filters);
    expect(result.length).toBe(5);
  });

  it('should filter products by category "Fruit"', () => {
    const filters: ProductFilters = { category: 'Fruit' };
    const result = filterProducts(productData, filters);
    expect(result.length).toBe(3);
    expect(result.every(p => p.category === 'Fruit')).toBe(true);
  });

  it('should filter products by a max price of 1.0', () => {
    const filters: ProductFilters = { maxPrice: 1.0 };
    const result = filterProducts(productData, filters);
    expect(result.length).toBe(3); // Carrot, Banana, Orange
    expect(result.every(p => p.price <= 1.0)).toBe(true);
  });

  it('should filter for products that are in stock', () => {
    const filters: ProductFilters = { inStockOnly: true };
    const result = filterProducts(productData, filters);
    expect(result.length).toBe(4); // Banana is out of stock
    expect(result.every(p => p.inStock)).toBe(true);
  });

  it('should combine multiple filters (in stock Fruits under $1.10)', () => {
    const filters: ProductFilters = {
      category: 'Fruit',
      maxPrice: 1.10,
      inStockOnly: true,
    };
    const result = filterProducts(productData, filters);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Orange');
  });

  it('should return an empty array if no products match the filters', () => {
    const filters: ProductFilters = { category: 'Fruit', maxPrice: 0.5 };
    const result = filterProducts(productData, filters);
    expect(result.length).toBe(0);
  });
});
