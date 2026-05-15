# Hackman Client — Agent Instructions

## Cursor Cloud specific instructions

### Overview
Nuxt 3 (Vue 3) SPA frontend for the Hackman word-guessing game. Uses Tailwind CSS v4, Nuxt UI v3, Pinia for state, and Axios for API communication.

### Running the dev server
```
BASE_URL=http://127.0.0.1:8000 npm run dev
```
The `BASE_URL` env var overrides the default production API URL. The backend must be running on port 8000.

### Key gotchas
- **Game endtime** in `nuxt.config.ts` (`runtimeConfig.public.endtime`) controls whether the game is active. If this date is in the past, the middleware redirects all routes to `/leaders`.
- **API client** is pre-generated in `api-client/` via Orval. Regenerate with `npm run generate:api` only if the backend OpenAPI spec changes.
- **Biome** is used for linting: `npx biome check pages/ components/ composables/ store/ api-client/ utils/`. Pre-existing lint warnings exist in the codebase.

### Lint
- `npx biome check <dirs>` — scope to source dirs to avoid `.nuxt` generated file noise.

### Tests
- No automated test suite configured.

### Standard commands
See `package.json` scripts: `npm run dev`, `npm run build`, `npm run generate:api`.
