# Project Setup (Boilerplate)

A complete guide to get the project running locally, whether you're a new contributor or setting up from scratch.

---

## Prerequisites

Make sure you have the following installed before starting:

| Tool        | Version | Check with         |
| ----------- | ------- | ------------------ |
| **Node.js** | v20+    | `node -v`          |
| **npm**     | v9+     | `npm -v`           |
| **Docker**  | Latest  | `docker --version` |
| **Git**     | Latest  | `git --version`    |

---

## Project Structure

```
boilerplate/
├── .husky/                # Git hooks (pre-commit, commit-msg)
├── apps/
│   ├── backend/          # NestJS API (deployed to Google Cloud Run)
│   ├── frontend/         # React + Vite (deployed to Cloudflare Pages)
│   └── dashboard/        # Admin dashboard
├── packages/
│   ├── types/            # Shared TypeScript types
│   ├── utils/            # Shared utility functions
│   ├── config/           # Shared configuration (ESLint presets)
│   └── ui/               # Shared UI components
├── .cloudbuild/          # Google Cloud Build YAML configs
├── docs/                 # Documentation (you are here!)
├── .prettierrc.json      # Prettier formatting rules
├── .prettierignore       # Files excluded from Prettier
├── commitlint.config.mjs # Conventional commit rules
├── nx.json               # Nx monorepo configuration
└── package.json          # Root workspace configuration
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/JayArindam/garden-of-valiena.git
cd garden-of-valiena
```

## 2. Install Dependencies

All dependencies for every app and package are installed from the root via npm workspaces. **Do NOT run `npm install` inside individual app folders.**

```bash
npm install
```

This will install everything — frontend, backend, shared packages — into a single hoisted `node_modules` at the root.

---

## Running the Project

### Start Everything (Frontend + Backend + Dashboard)

```bash
npm run dev:all
```

This uses **Nx** to spin up all servers **in parallel**:

- **Frontend** (Vite) → `http://localhost:5173`
- **Backend** (NestJS) → `http://localhost:3000`
- **Dashboard** (Vite) → `http://localhost:5174`

### Start Only the Backend

```bash
npm run dev:backend
```

### Start Only the Frontend

```bash
npm run dev:frontend
```

### Start Only the Dashboard (Admin Panel)

```bash
npm run dev:dashboard
```

### Verify the Backend is Running

Once the backend is up, hit the health check endpoint:

```bash
curl http://localhost:3000/api/v1/health
```

Expected response:

```json
{ "message": "Server is active" }
```

---

## All Available Commands

| Command                   | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `npm run dev`             | Run frontend + backend in parallel                 |
| `npm run dev:all`         | Run frontend + backend + dashboard in parallel     |
| `npm run dev:backend`     | Run only the NestJS backend (with hot-reload)      |
| `npm run dev:frontend`    | Run only the Vite frontend (with HMR)              |
| `npm run dev:dashboard`   | Run only the Vite dashboard (local-only admin)     |
| `npm run build`           | Build all projects                                 |
| `npm run build:backend`   | Build only the backend                             |
| `npm run build:frontend`  | Build only the frontend                            |
| `npm run build:dashboard` | Build only the dashboard                           |
| `npm run test`            | Run tests across all projects                      |
| `npm run lint`            | Lint all projects                                  |
| `npm run format`          | Format all files with Prettier                     |
| `npm run format:check`    | Check formatting without writing changes           |
| `npm run clean`           | Nuke all `node_modules` and Nx cache (fresh start) |

---

## Code Quality & Git Hooks

This project uses **Husky**, **lint-staged**, and **commitlint** to enforce code quality standards automatically on every commit.

### What Happens on `git commit`

1. **Pre-commit hook** → Runs `lint-staged` on all staged files:
   - **JS/TS files** → Prettier formats, then ESLint lints (with auto-fix)
   - **JSON, MD, CSS, HTML, YAML** → Prettier formats
2. **Commit-msg hook** → Runs `commitlint` to validate the commit message follows [Conventional Commits](https://www.conventionalcommits.org/)

### Conventional Commit Format

All commit messages **must** follow this format:

```
type(optional-scope): description

[optional body]
[optional footer]
```

**Allowed types:**

| Type       | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| `feat`     | A new feature                                                 |
| `fix`      | A bug fix                                                     |
| `docs`     | Documentation only changes                                    |
| `style`    | Changes that do not affect code meaning (formatting, etc.)    |
| `refactor` | A code change that neither fixes a bug nor adds a feature     |
| `perf`     | A code change that improves performance                       |
| `test`     | Adding missing tests or correcting existing tests             |
| `build`    | Changes that affect the build system or external dependencies |
| `ci`       | Changes to CI configuration files and scripts                 |
| `chore`    | Other changes that don't modify src or test files             |
| `revert`   | Reverts a previous commit                                     |

**Examples:**

```bash
# ✅ Good
git commit -m "feat: add product search API endpoint"
git commit -m "fix(auth): resolve token refresh race condition"
git commit -m "docs: update project setup guide"
git commit -m "chore: upgrade dependencies"

# ❌ Bad (will be rejected)
git commit -m "updated stuff"
git commit -m "WIP"
git commit -m "fix"
```

### Prettier Configuration

Prettier is configured at the root (`.prettierrc.json`) with these rules:

- **Semicolons:** Yes
- **Trailing commas:** All
- **Single quotes:** Yes
- **Print width:** 80 characters
- **Tab width:** 2 spaces
- **Arrow parens:** Always
- **End of line:** Auto (cross-platform)

### Skipping Hooks (Emergency Only)

If you absolutely need to skip hooks (e.g., WIP commit on a branch):

```bash
git commit -m "chore: wip" --no-verify
```

> ⚠️ **Do not use `--no-verify` on `main` or for production PRs.**

---

## Docker (Backend)

Use Docker when you want to test the backend in an environment identical to production (Google Cloud Run).

### Build the Docker Image

> **Important:** Always run Docker commands from the **project root** — not from inside `apps/backend/`. The Dockerfile needs access to the root `package.json` and `nx.json`.

```bash
docker build -t boilerplate-backend -f apps/backend/Dockerfile .
```

### Run the Container

```bash
docker run -p 3000:3000 boilerplate-backend
```

The backend is now running inside a container at `http://localhost:3000`.

### Run on a Custom Port

Cloud Run injects the port via `PORT` env variable. You can simulate this:

```bash
docker run -p 8080:8080 -e PORT=8080 boilerplate-backend
```

### Test the Containerized Backend

```bash
# Health check
curl http://localhost:3000/api/v1/health

# Root endpoint
curl http://localhost:3000/
```

Expected health check response:

```json
{ "message": "Server is active" }
```

### Stop the Container

```bash
# List running containers
docker ps

# Stop by container ID
docker stop <CONTAINER_ID>
```

### Useful Docker Commands

| Command                                                            | Description                             |
| ------------------------------------------------------------------ | --------------------------------------- |
| `docker build -t boilerplate-backend -f apps/backend/Dockerfile .` | Build the backend image                 |
| `docker run -p 3000:3000 boilerplate-backend`                      | Run the container                       |
| `docker run -d -p 3000:3000 boilerplate-backend`                   | Run in detached mode (background)       |
| `docker run -p 8080:8080 -e PORT=8080 boilerplate-backend`         | Run on custom port                      |
| `docker ps`                                                        | List running containers                 |
| `docker stop <ID>`                                                 | Stop a container                        |
| `docker logs <ID>`                                                 | View container logs                     |
| `docker logs -f <ID>`                                              | Follow container logs (live tail)       |
| `docker images`                                                    | List all local images                   |
| `docker rmi boilerplate-backend`                                   | Remove the backend image                |
| `docker system prune`                                              | Clean up dangling images and containers |

---

## Cloud Deployment & Environments Story

To ship this monorepo to production, you must manage environment configurations securely and understand how they get injected at deploy time. We maintain a clear environment separation:

- **Local Development**: Configured via `.env` (derived from `.env.example`).
- **Production Reference**: Defined in `.env.production.example`.

---

### Backend → Google Cloud Run

The NestJS backend is packaged as a Docker container and deployed automatically to **Google Cloud Run** via **Cloud Build** triggers on push to the `main` branch.

- **Trigger config:** `.cloudbuild/backend.yaml`
- **Dockerfile:** `apps/backend/Dockerfile`
- **Trigger filter:** Fires when files in `apps/backend/**` or `packages/**` change.

#### 1. Runtime Environment Variables vs. Secrets

- **Non-Sensitive Variables** (e.g., `NODE_ENV`, `PORT`): These can be set directly on the Cloud Run service as simple environment variables at deploy time.
- **Sensitive Secrets** (e.g., `DATABASE_URL`, API keys): Must be stored securely in **Google Cloud Secret Manager**. Do **NOT** hardcode these or set them as plain environment variables in your repository or build configurations.

#### 2. Deploy-Time Injection via Cloud Build

During the deployment stage in `.cloudbuild/backend.yaml`, the `gcloud run deploy` command is used to configure variables and secrets.

You inject them using the `--set-env-vars` and `--set-secrets` flags:

```yaml
- "deploy"
- "${_SERVICE_NAME}"
- "--image"
- "gcr.io/$PROJECT_ID/${_SERVICE_NAME}-backend:$COMMIT_SHA"
- "--region"
- "${_REGION}"
- "--allow-unauthenticated"
# Injecting standard environment variables:
- "--set-env-vars"
- "NODE_ENV=production"
# Injecting sensitive secrets from Secret Manager:
# Format: ENV_VAR_NAME=SECRET_NAME:VERSION_OR_LATEST
- "--set-secrets"
- "DATABASE_URL=my-database-url-secret:latest"
```

#### 3. GCP IAM Permissions Checklist

For Cloud Run to fetch secrets from Secret Manager at container startup, the service account running your container must have the proper permissions.

1. Identify the service account used by your Cloud Run service (by default, it is the **Default Compute Service Account**: `PROJECT_NUMBER-compute@developer.gserviceaccount.com`).
2. Navigate to **IAM & Admin** in the GCP Console.
3. Grant that service account the **Secret Manager Secret Accessor** role (`roles/secretmanager.secretAccessor`) on either the project level or specifically on the individual secrets.

---

### Frontend & Dashboard → Cloudflare Pages (or Vercel)

The React/Vite frontend and dashboard applications are deployed as static assets to **Cloudflare Pages** (or Vercel).

#### 1. Build-Time Static Injection (Crucial)

Unlike the NestJS backend which reads variables from the process environment at runtime, **Vite injects environment variables at BUILD-TIME**.

- When `npm run build` is executed by your build runner, Vite reads environment variables prefixed with `VITE_` and hardcodes their values statically into the compiled HTML/JS client bundles.
- Changing environment variables in your hosting provider's dashboard **will not take effect** until you trigger a new build/deployment.

#### 2. Configuring Build Variables

1. Go to your **Cloudflare Pages** or **Vercel** dashboard.
2. Select your project and navigate to **Settings** → **Environment Variables** (or **Build & Deploy**).
3. Add your production environment variables (e.g. `VITE_API_URL`):
   - **Variable Name**: `VITE_API_URL`
   - **Value**: `https://api.yourproductiondomain.com`
4. Set the environment scope to **Production** (and optionally **Preview** for testing branches).
5. Trigger a new deployment for the changes to compile into the frontend assets.

---

## Troubleshooting

### `nx: command not found`

Nx is installed as a dev dependency, not globally. Always use it through npm scripts (`npm run dev`) or prefix with `npx`:

```bash
npx nx run-many --target=dev --projects=backend,frontend
```

### Port already in use

If port 3000 or 5173 is busy, kill the process:

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS / Linux
lsof -i :3000
kill -9 <PID>
```

### Dependencies seem stale

Nuke everything and reinstall:

```bash
npm run clean
npm install
```

### Docker build fails

Make sure you're running from the **project root**:

```bash
# ✅ Correct (from project root)
docker build -t boilerplate-backend -f apps/backend/Dockerfile .

# ❌ Wrong (from inside apps/backend)
cd apps/backend && docker build .
```

The Dockerfile copies the root `package.json` and `nx.json`, so the build context must be the repo root.
