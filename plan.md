# Boilerplate Improvement Plan

> Addressing the 7 gaps from the architecture review to bring this from a 6.5 → 9/10.
> Work through these in order — each one builds on the previous.

---

## Point 1 — Environment Config (`.env` management)

**Why first:** Every subsequent feature (DB, API URLs, secrets) depends on this existing.

### Backend (`apps/backend`)

- [ ] Install `@nestjs/config` and `zod`
- [ ] Create `src/config/env.schema.ts` — define a Zod schema for all env vars (e.g. `PORT`, `NODE_ENV`, `DATABASE_URL`)
- [ ] Create `src/config/env.config.ts` — use `ConfigModule.forRoot()` with `validate` pointing to the Zod schema
- [ ] Import `ConfigModule` in `AppModule` with `isGlobal: true`
- [ ] Replace raw `process.env.PORT` in `main.ts` with `configService.get('PORT')`

### Frontend (`apps/frontend` + `apps/dashboard`)

- [ ] Add `VITE_API_URL` usage pattern in a `src/config.ts` file (reads from `import.meta.env.VITE_API_URL`)

### Root

- [ ] Create `.env.example` at the repo root documenting every var:

  ```
  # Backend
  PORT=3000
  NODE_ENV=development
  DATABASE_URL=postgresql://user:pass@localhost:5432/mydb

  # Frontend / Dashboard (prefix with VITE_)
  VITE_API_URL=http://localhost:3000
  ```

- [ ] Add `.env` to `.gitignore` (already there, but double check)
- [ ] Add a note in the root `README.md`: "Copy `.env.example` → `.env` before running"

---

## Point 2 — Remove Old Project Name (`garden-of-valenia`)

**Why:** A boilerplate with a hardcoded project name defeats the whole point.

### Files to update

- [ ] `.cloudbuild/backend.yaml` — replace all occurrences of `garden-of-valenia` with a clear placeholder like `YOUR_SERVICE_NAME` and `YOUR_PROJECT_ID` with a comment explaining what to swap
- [ ] Check `.nx/workspace-data/` — these are generated/cache files, add `.nx/` to `.gitignore` (already there, verify it's working)
- [ ] Search the rest of the repo for any remaining references:
  ```bash
  grep -rn "garden-of-valenia" . --exclude-dir=node_modules --exclude-dir=.nx --exclude-dir=.git
  ```

### Also improve the cloudbuild while here

- [ ] Add a comment block at the top of `backend.yaml` explaining the substitution variables
- [ ] Consider adding `_SERVICE_NAME` and `_REGION` as Cloud Build substitution variables so you can pass them at trigger time instead of editing the file

---

## Point 3 — Fill in `packages/types` and `packages/utils`

**Why:** Placeholder folders with `.gitkeep` show intent but teach nobody how to use them. A boilerplate needs working examples.

### `packages/types`

- [ ] Add `package.json` with name `@boilerplate/types`, proper `exports` map
- [ ] Create `src/api.ts` with generic response wrapper:

  ```ts
  export type ApiResponse<T> = {
    data: T;
    message: string;
    success: boolean;
  };

  export type PaginatedResponse<T> = ApiResponse<T[]> & {
    pagination: { page: number; limit: number; total: number };
  };
  ```

- [ ] Create `src/index.ts` to re-export everything
- [ ] Add `tsconfig.json` for the package
- [ ] Reference `@boilerplate/types` as a dependency in both `apps/backend` and `apps/frontend` `package.json`

### `packages/utils`

- [ ] Add `package.json` with name `@boilerplate/utils`
- [ ] Create `src/cn.ts` — `cn()` utility for merging classNames (used in frontend/dashboard):
  ```ts
  export function cn(
    ...classes: (string | undefined | false | null)[]
  ): string {
    return classes.filter(Boolean).join(" ");
  }
  ```
- [ ] Create `src/format.ts` — `formatDate()` and `formatCurrency()` stubs
- [ ] Create `src/index.ts` to re-export
- [ ] Reference `@boilerplate/utils` in frontend and dashboard `package.json`

---

## Point 4 — `docker-compose.yml` for Local Dev

**Why:** The moment you add a real feature you need a database. Without compose, everyone sets up Postgres differently.

### Files to create

- [ ] `docker-compose.yml` at repo root with:
  - **postgres** service — port `5432`, named volume, `POSTGRES_USER/PASSWORD/DB` from env
  - **redis** service — port `6379` (even if not used yet, it's always needed eventually)
  - Health checks on both services
- [ ] `docker-compose.override.yml` (optional) — for any local-only overrides
- [ ] Update `.env.example` to include `DATABASE_URL` and `REDIS_URL` pointing to compose services
- [ ] Add a `db:up` / `db:down` script to root `package.json`:
  ```json
  "db:up": "docker compose up -d",
  "db:down": "docker compose down"
  ```
- [ ] Document in README: run `npm run db:up` before `npm run dev`

---

## Point 5 — TypeScript Strictness on Backend

**Why:** `noImplicitAny: false` sets a sloppy default for every project born from this boilerplate.

### `apps/backend/tsconfig.json`

- [ ] Set `"noImplicitAny": true`
- [ ] Set `"strictBindCallApply": true`
- [ ] Set `"noFallthroughCasesInSwitch": true`
- [ ] Fix any type errors that surface (likely minimal on the current stub codebase)
- [ ] Optionally add `"strict": true` as an umbrella flag (covers nullchecks, bind, etc.)

> **Note:** The frontend already has strict settings via `tsconfig.app.json`. This just aligns the backend to the same bar.

---

## Point 6 — Proper Nx Configuration (Tags + dependsOn)

**Why:** Right now Nx is just a fancy task runner. The real value is build caching based on the dependency graph and enforcing boundaries between apps.

### Add project tags to `project.json` in each app

```json
// apps/frontend/project.json
{ "tags": ["scope:frontend", "type:app"] }

// apps/dashboard/project.json
{ "tags": ["scope:dashboard", "type:app"] }

// apps/backend/project.json
{ "tags": ["scope:backend", "type:app"] }

// packages/*/project.json
{ "tags": ["scope:shared", "type:lib"] }
```

### Add `dependsOn` to build targets

- [ ] In `apps/frontend/project.json` and `apps/dashboard/project.json`, add:
  ```json
  "build": {
    "dependsOn": ["^build"]
  }
  ```
  This ensures shared packages are built before the apps.

### Fix `namedInputs.sharedGlobals` in `nx.json`

- [ ] Add root config files to `sharedGlobals` so cache is busted when they change:
  ```json
  "sharedGlobals": [
    "{workspaceRoot}/nx.json",
    "{workspaceRoot}/package.json",
    "{workspaceRoot}/.prettierrc.json",
    "{workspaceRoot}/eslint.config.js"
  ]
  ```

### Add `project.json` to the shared packages

- [ ] `packages/config/project.json` — add `build` and `lint` targets
- [ ] `packages/types/project.json` — add `build` and `lint` targets
- [ ] `packages/utils/project.json` — add `build` and `lint` targets

---

## Point 7 — Fix Dev Script Confusion

**Why:** `npm run dev --all` silently ignores `--all` (it's not an npm flag). The actual "run all" script is `npm run dev`. This is confusing enough to trip up every new dev.

### `package.json` (root) — clarify script names

- [ ] Rename scripts to be unambiguous:
  ```json
  "dev": "nx run-many --target=dev --projects=backend,frontend,dashboard",
  "dev:backend": "nx run backend:dev",
  "dev:frontend": "nx run frontend:dev",
  "dev:dashboard": "nx run dashboard:dev",
  ```
- [ ] Remove `"dev:all"` or keep it but make it identical to `"dev"` — avoid the `--all` flag since it runs targets on packages too (which have none)
- [ ] The "Warning: command npm run dev exited with non-zero status code" noise from Nx is because Vite/NestJS watch processes never exit with code 0 — this is cosmetic. Add `--output-style=stream` to the Nx command to get cleaner streaming logs:
  ```json
  "dev": "nx run-many --target=dev --projects=backend,frontend,dashboard --output-style=stream"
  ```

### Add a root `README.md` that actually explains the project

- [ ] Replace the placeholder `README.md` with:
  - Project structure diagram
  - Prerequisites (Node version, Docker)
  - Getting started: `cp .env.example .env` → `npm run db:up` → `npm run dev`
  - Port map: backend `:3000`, frontend `:5173`, dashboard `:5174`
  - How to add a new app
  - How to use shared packages

---

## Implementation Order

```
1 (env)  →  2 (rename)  →  4 (compose)  →  3 (packages)  →  5 (ts strict)  →  6 (nx config)  →  7 (scripts + readme)
```

Points 1 and 4 are tightly coupled (compose provides the DB that env config references).
Points 3 and 6 are tightly coupled (packages need `project.json` before Nx can graph them).
Point 7 should be last since it wraps everything with documentation.

---

## Target State After All 7 Points

```
boilerplate/
├── .cloudbuild/
│   └── backend.yaml          ← parameterized, no hardcoded names
├── apps/
│   ├── backend/              ← @nestjs/config + Zod, strict TS
│   ├── frontend/             ← VITE_API_URL config pattern
│   └── dashboard/            ← VITE_API_URL config pattern
├── packages/
│   ├── config/               ← unchanged (already good)
│   ├── types/                ← ApiResponse<T>, PaginatedResponse<T>
│   └── utils/                ← cn(), formatDate(), formatCurrency()
├── .env.example              ← NEW: all vars documented
├── docker-compose.yml        ← NEW: postgres + redis
├── nx.json                   ← sharedGlobals filled in
├── package.json              ← cleaner scripts
└── README.md                 ← actual documentation
```
