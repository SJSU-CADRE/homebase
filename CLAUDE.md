# Homebase — Project Context for Claude

## What this is
A prototype web app being built on a Raspberry Pi for testing, targeting final deployment to a pristine Ubuntu instance via Coolify.

## Stack
- **Frontend**: React + Vite (SPA)
- **Backend**: Node.js/Express (MVC pattern)
- **Database**: MongoDB
- **Auth**: Okta SSO (SJSU accounts)
- **Deployment**: Dockerized — 3 containers (frontend, backend, MongoDB), served by Coolify

## Architecture
MVC pattern across three Docker containers:
1. `frontend` — React/Vite dev or built static assets
2. `backend` — Express API, handles business logic and DB access
3. `mongodb` — MongoDB instance

See `docker-compose.yml` for container config.

## Auth
- Okta is used for user authentication (SJSU Okta tenant)
- Backend uses `@okta/jwt-verifier` to validate Bearer tokens (`middleware/auth.js`)
- Frontend login flow is not yet wired up — `LoginModal.jsx` has a placeholder, `App.jsx` has `isLoggedIn` hardcoded to `false`
- Backend needs `OKTA_ISSUER` and `OKTA_AUDIENCE` set in `backend/.env`
- Frontend needs client ID and issuer URL to initialize Okta SDK

## Dev environment
- Developing on Raspberry Pi (Linux/ARM)
- Target production: Ubuntu (x86) via Coolify
- Keep Docker images compatible with both ARM and amd64 where possible (use multi-platform builds or note arch-specific issues)

## Current status
- Backend auth middleware ready, pending `.env` values
- Frontend Okta login flow needs to be wired up with `@okta/okta-react`
- Docker setup exists (`docker-compose.yml`)
