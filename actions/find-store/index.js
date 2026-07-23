// synthetic fixture — no sample data available from Action Planner
// TODO: Replace MOCK_DATA with a real API call. See the TODO block below the handler.
const MOCK_DATA = [
    {
        name: 'Nike Orchard Road',
        address: '391A Orchard Rd, #01-15 Takashimaya S.C., Singapore 238873',
        phone: '+65 6733 1188',
        hours: 'Mon-Sun 10:00-22:00'
    },
    {
        name: 'Nike Marina Bay Sands',
        address: '2 Bayfront Ave, #B2-05 The Shoppes, Singapore 018972',
        phone: '+65 6688 7788',
        hours: 'Mon-Sun 10:30-23:00'
    },
    {
        name: 'Nike VivoCity',
        address: '1 HarbourFront Walk, #01-84 VivoCity, Singapore 098585',
        phone: '+65 6376 9922',
        hours: 'Mon-Sun 10:00-22:00'
    }
]

module.exports = async ({ location = '' } = {}) => {
    if (!location || typeof location !== 'string' || !location.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a location (city, area, or postal code) to search for nearby Nike stores.' }],
            // structuredContent.stores — derived from action name "find_store" (bare array outputSchema rule)
            structuredContent: { stores: [] }
        }
    }

    const query = location.trim().toLowerCase()
    const matches = MOCK_DATA.filter((store) =>
        store.name.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query)
    )
    const stores = matches.length > 0 ? matches : MOCK_DATA

    const summary = stores.length > 0
        ? `Found ${stores.length} Nike store${stores.length === 1 ? '' : 's'} near "${location.trim()}".`
        : `No Nike stores found near "${location.trim()}".`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.stores — derived from action name "find_store" (bare array outputSchema rule)
        structuredContent: { stores }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/stores?location=${location}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/stores?location=${encodeURIComponent(location)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
