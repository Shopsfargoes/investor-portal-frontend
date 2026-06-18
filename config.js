// config.js
// -----------------------------------------------------------------------
// Central place to point the frontend at your headless WordPress backend.
// All requests go through the Vercel proxy (/api/proxy) to bypass CORS
// restrictions on InfinityFree hosting.
// -----------------------------------------------------------------------

const WP_CONFIG = {
  // Root of your WordPress REST API, no trailing slash.
  // Used by the server-side proxy only — not called directly from browser.
  BASE_URL: "https://investor.free.nf/wp-json",

  // Vercel proxy endpoint — all frontend fetch() calls go here instead
  // of calling WordPress directly, bypassing InfinityFree CORS blocks.
  PROXY_URL: "/api/proxy",

  // Custom taxonomy slug used for asset classes / project names.
  TAXONOMY: "investment_type",

  // ACF field names exposed on the user object via the REST API.
  FIELDS: {
    amountInvested: "amount_invested",
    currentValue: "current_value",
    valueHistory: "value_history"
  },

  // How investor authentication is handled.
  AUTH_TOKEN_KEY: "investor_portal_token",

  // WordPress REST endpoints (passed as ?path= to the proxy).
  ENDPOINTS: {
    token: "/jwt-auth/v1/token",
    me: "/wp/v2/users/me?context=edit",
    holdings: "/custom/v1/holdings"
  }
};
