# Project Backlog & Roadmap

This document tracks the current status of the boilerplate, planned enhancements, and missing features required to reach a "Perfect 10" production standard.

## ✅ What's Working (Current State)

- **Monorepo Management:** Nx-powered workspace with computation caching.
- **Backend Architecture:** Modular NestJS setup with TypeScript.
- **Frontend Stack:** React + Vite with shared configurations.
- **Developer Experience (DX):**
  - Shared ESLint (Flat Config) & Prettier.
  - Git Hooks (Husky) & Conventional Commits (Commitlint).
- **Infrastructure:** Docker Compose for local PostgreSQL and Cloud Build triggers for GCP.
- **Documentation:** Compelling, benefit-driven README.

---

## 🏗️ Planned Improvements (The "Path to 10/10")

Based on senior developer evaluation, these are the priority items to move the boilerplate from "High Quality" to "Industry Leading."

### 1. Authentication & Identity

- [ ] Implement a standardized Auth pattern (e.g., Auth.js or NestJS JWT strategy).
- [ ] Add protected route examples in Frontend/Dashboard.
- [ ] Add user roles/permissions logic.

### 2. Testing Excellence

- [ ] Configure **Playwright** for cross-repo E2E testing.
- [ ] Add standard Unit Testing patterns for shared `utils`.
- [ ] Integrate test reporting into Nx Cloud/CI.

### 3. Production Hardening (Observability)

- [ ] Integrate a structured logger (e.g., Pino or Winston).
- [ ] Add standardized Health Check (`/health`) endpoints.
- [ ] Add basic Prometheus/OpenTelemetry instrumentation.

### 4. Database Lifecycle

- [ ] Integrate an ORM with migrations (e.g., Prisma or TypeORM).
- [ ] Add Nx targets for running migrations across environments.
- [ ] Add database seeding scripts for local development.

---

## 💡 Future Ideas

- [ ] Tailwind CSS integration (optional/as a preset).
- [ ] Shadcn/UI component library setup in a shared package.
- [ ] API documentation (Swagger/OpenAPI) automated generation.
- [ ] Example "Internal Tool" app within the monorepo.

---

## 📈 Status Legend

- 🟢 **Ready:** Fully implemented and tested.
- 🟡 **In Progress:** Currently being developed.
- ⚪ **Backlog:** Planned but not yet started.
