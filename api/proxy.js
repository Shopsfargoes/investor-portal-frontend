// api/proxy.js
// -----------------------------------------------------------------------
// Vercel serverless function that proxies all requests to the WordPress
// backend, bypassing CORS restrictions on InfinityFree hosting.
//
// Usage: instead of calling WordPress directly, the frontend calls:
//   /api/proxy?path=/wp/v2/users/me?context=edit
//   /api/proxy?path=/jwt-auth/v1/token
//   /api/proxy?path=/custom/v1/holdings
//
// The proxy forwards the request to WordPress with all headers intact
// (including Authorization) and returns the response to the browser.
// -----------------------------------------------------------------------

const WP_BASE = 'https://investor.free.nf/wp-json';

export default async function handler(req, res) {
    // Allow requests from your Vercel frontend
    res.setHeader('Access-Control-Allow-Origin', 'https://investor-portal-frontend-mu.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { path } = req.query;

    if (!path) {
        return res.status(400).json({ error: 'Missing path parameter' });
    }

    const wpUrl = `${WP_BASE}${path}`;

    try {
        // Forward headers from the browser (especially Authorization)
        const forwardHeaders = {
            'Content-Type': 'application/json',
        };

        if (req.headers.authorization) {
            forwardHeaders['Authorization'] = req.headers.authorization;
        }

        const wpResponse = await fetch(wpUrl, {
            method: req.method,
            headers: forwardHeaders,
            body: req.method !== 'GET' && req.method !== 'HEAD'
                ? JSON.stringify(req.body)
                : undefined,
        });

        const data = await wpResponse.json();

        return res.status(wpResponse.status).json(data);
    } catch (err) {
        console.error('Proxy error:', err);
        return res.status(500).json({ error: 'Proxy request failed', detail: err.message });
    }
}
