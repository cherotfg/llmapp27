// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Air Jordan 1 Low SE',
        description: "Men's low-top lifestyle sneaker in the classic Air Jordan 1 silhouette.",
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/52388c3f-04cc-4058-b9c9-cc8584ca28de/AIR+JORDAN+1+LOW+SE.png',
        price: 'S$189',
        category: 'Lifestyle'
    },
    {
        name: 'Nike Air Max 95 Big Bubble SE',
        description: "Men's lifestyle shoe featuring the iconic visible Air Max Big Bubble cushioning.",
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9ab80620-f2d0-4e98-89fe-3ee608773d60/NIKE+AIR+MAX+95+BIG+BUBBLE+SE.png',
        price: 'S$269',
        category: 'Lifestyle'
    },
    {
        name: 'Nike Dunk Low Retro Premium',
        description: "Men's premium Dunk Low with heritage basketball styling.",
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b010b543-7ed4-489e-bbd0-96cd4539d958/NIKE+DUNK+LOW+RETRO+PRM.png',
        price: 'S$179',
        category: 'Lifestyle'
    },
    {
        name: 'Nike SB Code 58',
        description: "Men's skate shoe built for board feel and durability.",
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/dedc3d1f-bd3e-476c-a313-1d54122a555f/NIKE+SB+CODE+58.png',
        price: 'S$129',
        category: 'Skateboarding'
    },
    {
        name: 'Nike ACG LDV',
        description: "Men's all-conditions-gear shoe designed for the trail and everyday wear.",
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/14cbcdef-49ea-4b6e-bfa7-91a011ddecb1/NIKE+ACG+LDV.png',
        price: 'S$199',
        category: 'Lifestyle'
    },
    {
        name: 'Nike 24.7',
        description: "Men's everyday sneaker built for all-day comfort.",
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a180f2cc-19a1-4083-9bcd-18e928fd3134/NIKE+24.7+SNEAKER.png',
        price: 'S$209',
        category: 'Lifestyle'
    },
    {
        name: "Nike Air Force 1 '07 LV8",
        description: "Men's take on the classic Air Force 1 with premium detailing.",
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/06769520-f154-4b37-ae0b-9dec6c6f5356/AIR+FORCE+1+%2707+LV8.png',
        price: 'S$179',
        category: 'Lifestyle'
    },
    {
        name: 'Nike Air Max 95 Older Bubble',
        description: "Men's lifestyle shoe with layered design and visible Air cushioning.",
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/399385cb-1c90-4bd6-9c17-6e688763e149/NIKE+AIR+MAX+95+BIG+BUBBLE.png',
        price: 'S$259',
        category: 'Lifestyle'
    },
    {
        name: 'Nike SB Zoom Janoski OG+',
        description: "Men's skate shoe with responsive Zoom Air cushioning.",
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0ec9d9f8-05f9-4b7e-90cc-8b580d29c66a/NIKE+SB+ZOOM+JANOSKI+OG%2B.png',
        price: 'S$155',
        category: 'Skateboarding'
    },
    {
        name: 'Nike Marina',
        description: "Men's slide for easy, casual wear.",
        image_url: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/776bcc36-978c-4fd1-ab4f-ee9199d07656/NIKE+MARINA.png',
        price: 'S$35',
        category: 'Slides'
    }
]

module.exports = async ({ name = '' }) => {
    if (!name || typeof name !== 'string' || !name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide the name of the product to retrieve details for.' }]
        }
    }

    const query = name.trim().toLowerCase()
    let item = MOCK_DATA.find((p) => p.name.toLowerCase() === query)
    if (!item) {
        item = MOCK_DATA.find((p) => p.name.toLowerCase().includes(query))
    }

    if (!item) {
        // Not found — return content only (no structuredContent) so the widget shows its empty state.
        return {
            content: [{ type: 'text', text: `No product found matching "${name}".` }]
        }
    }

    const summary = `${item.name} (${item.category}) — ${item.price}. ${item.description}`
    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
        structuredContent: {
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            image_url: item.image_url
        }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(name)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
