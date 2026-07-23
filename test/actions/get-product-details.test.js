const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ name: 'Air Jordan 1 Low SE' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Tell me more about the Air Jordan 1 Low SE" returns product details', async () => {
        const out = await handler({ name: 'Air Jordan 1 Low SE' })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Air Jordan 1 Low SE/)
        expect(out.structuredContent.name).toBe('Air Jordan 1 Low SE')
        expect(out.structuredContent.price).toBe('S$189')
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ name: 'Air Jordan 1 Low SE' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(out.structuredContent).toHaveProperty('description')
        expect(out.structuredContent).toHaveProperty('category')
        expect(out.structuredContent).toHaveProperty('image_url')
    })

    test('matches a product by partial name', async () => {
        const out = await handler({ name: 'dunk low' })
        expect(out.structuredContent.name).toBe('Nike Dunk Low Retro Premium')
    })

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0].text).toMatch(/name|provide/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('unknown product name returns not-found with no structuredContent', async () => {
        const out = await handler({ name: 'Adidas Ultraboost' })
        expect(out.content[0].text).toMatch(/no product found/i)
        expect(out.structuredContent).toBeUndefined()
    })
})
