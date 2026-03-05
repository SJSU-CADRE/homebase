```
 _                         _
| |__   ___  _ __ ___  ___| |__   __ _ ___  ___
| '_ \ / _ \| '_ ` _ \/ _ \ '_ \ / _` / __|/ _ \
| | | | (_) | | | | | |  __/ |_) | (_| \__ \  __/
|_| |_|\___/|_| |_| |_|\___|_.__/ \__,_|___/\___|
```

A prototype community web app for SJSU students, built as a Dockerized MVC application and deployed via Coolify.

## Architecture

```
                        [ Browser ]
                             |
                    [ Coolify / Nginx ]
                             |
          ┌──────────────────┴──────────────────┐
          |                                     |
   [ Frontend :3000 ]                  [ Backend :4000 ]
     React + Vite                      Node.js + Express
     (static SPA)                      (REST API / MVC)
                                              |
                                    [ MongoDB :27017 ]
                                      (persistent vol)
```

Three Docker containers, orchestrated with `docker-compose.yml`:

| Container  | Tech            | Role                              |
|------------|-----------------|-----------------------------------|
| `frontend` | React + Vite    | SPA served as static assets       |
| `backend`  | Node.js/Express | REST API, business logic, auth    |
| `mongodb`  | MongoDB 7       | Database, data persisted via volume|

## Auth

User authentication is handled via **Okta SSO** using SJSU accounts. The frontend redirects users through Okta's login flow and receives a JWT access token. The backend validates that token on protected routes using `@okta/jwt-verifier`.

## Dev Setup

**Prerequisites:** Docker, Docker Compose

1. Copy the env file and fill in your Okta credentials:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. Set the following in `backend/.env`:
   ```
   OKTA_ISSUER=https://<your-sjsu-okta-domain>/oauth2/default
   OKTA_AUDIENCE=api://default
   ```

3. Start all containers:
   ```bash
   docker compose up --build
   ```

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- MongoDB: localhost:27017

## Deployment

The app is designed to deploy to a clean **Ubuntu** instance via **Coolify**. Coolify pulls the repo, builds the Docker images, and manages the containers. No manual server setup required beyond pointing Coolify at the repository.

> Currently being developed and tested on a Raspberry Pi (ARM). Docker images should be verified for amd64 compatibility before production deployment.
