// config.js
// -----------------------------------------------------------------------
// Central place to point the frontend at your headless WordPress backend.
// Edit BASE_URL after deploying WordPress (Railway / Hostinger / etc).
// -----------------------------------------------------------------------

const WP_CONFIG = {
  // Root of your WordPress REST API, no trailing slash.
  // e.g. "https://your-wp-backend.up.railway.app/wp-json"
  BASE_URL: "https://your-wp-backend.example.com/wp-json",

  // Custom taxonomy slug used for asset classes / project names.
  TAXONOMY: "investment_type",

  // ACF field names exposed on the user object via the REST API.
  FIELDS: {
    amountInvested: "amount_invested",
    currentValue: "current_value",
    valueHistory: "value_history"
  },

  // How investor authentication is handled. This demo expects a JWT
  // (e.g. via the "JWT Authentication for WP REST API" plugin) stored
  // in localStorage after login, sent as "Authorization: Bearer <token>".
  AUTH_TOKEN_KEY: "investor_portal_token",

  // WordPress REST endpoint that returns the logged-in investor's
  // profile + ACF fields + holdings. Adjust to match your custom
  // endpoint (e.g. registered via register_rest_route in functions.php).
  ENDPOINTS: {
    me: "/wp/v2/users/me?context=edit",
    holdings: "/custom/v1/holdings"
  }
};
