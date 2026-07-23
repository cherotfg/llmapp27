const handler = require('../../actions/search-products/index.js');

describe('search_products handler', () => {
  test('content is an array of text blocks', async () => {
    const out = await handler({});
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('"Show me some Nike lifestyle sneakers" returns products', async () => {
    const out = await handler({ query: 'Nike' });
    expect(out.content[0].text.length).toBeGreaterThan(0);
    expect(out.structuredContent.products.length).toBeGreaterThan(0);
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({});
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
    expect(Array.isArray(out.structuredContent.products)).toBe(true);
  });

  test('no args returns the full catalog', async () => {
    const out = await handler({});
    expect(out.structuredContent.products.length).toBe(10);
  });

  test('filters by category', async () => {
    const out = await handler({ category: 'Skateboarding' });
    const products = out.structuredContent.products;
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => p.category === 'Skateboarding')).toBe(true);
  });

  test('filters by max_price', async () => {
    const out = await handler({ max_price: 150 });
    const products = out.structuredContent.products;
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => parseFloat(p.price.replace(/[^0-9.]/g, '')) <= 150)).toBe(true);
  });

  test('query with no matches returns empty results', async () => {
    const out = await handler({ query: 'zzz-nonexistent-product' });
    expect(out.structuredContent.products).toEqual([]);
    expect(out.content[0].text).toMatch(/No products found/i);
  });
});
