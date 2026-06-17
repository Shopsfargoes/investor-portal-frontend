# investor-portal-frontend
headless cms 

# Investor Portal — Frontend (Vercel) + Headless WordPress

## Files
- `index.html` — portfolio dashboard (protected, requires JWT)
- `login.html` — sign-in page, exchanges credentials for a JWT
- `styles.css` — shared styling
- `config.js` — **edit this first**: set `BASE_URL` to your WordPress backend
- `app.js` — fetch engine that renders ACF fields + holdings
- `functions-snippet.php` — paste into your WordPress theme's `functions.php`

## Setup

### 1. WordPress backend
- Install **Advanced Custom Fields**, register `amount_invested` and
  `current_value` as fields on the **User** object.
- Register the `investment_type` taxonomy (and a `holding` custom post
  type if you want per-asset-class breakdowns, per the comments in
  `functions-snippet.php`).
- Install a JWT plugin (e.g. "JWT Authentication for WP REST API") so
  `/wp-json/jwt-auth/v1/token` is available.
- Paste `functions-snippet.php` contents into `functions.php`, update
  the `$allowed_origins` array with your real Vercel domain.

### 2. Frontend (Vercel)
- Edit `config.js`:
  ```js
  BASE_URL: "https://your-wp-backend.up.railway.app/wp-json"
  ```
- Push to GitHub, import the repo into Vercel (no build step needed —
  static HTML/CSS/JS).

### 3. Test the pipeline
- Visit `/login.html`, sign in with a WordPress user that has
  `amount_invested` / `current_value` ACF values set.
- On success you're redirected to `/index.html`, which calls:
  - `GET /wp/v2/users/me?context=edit` → headline figures
  - `GET /custom/v1/holdings` → per-asset-class table

## Notes
- All financial values are formatted client-side; the backend should
  always return raw numbers (not pre-formatted strings).
- The JWT is stored in `localStorage` for this demo. For production,
  consider an httpOnly cookie + same-site backend proxy instead.
- CORS is locked to the origins listed in `functions-snippet.php` —
  add `http://localhost:3000` (or your dev port) for local testing.
